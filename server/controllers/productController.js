const uuid = require("uuid");
const path = require("path");
const { Product, ProductInfo } = require("../models/models");
const ApiError = require("../error/apiError");
const fs = require("fs");
const { Op } = require("sequelize");

class ProductController {
  async create(req, res, next) {
    try {
      let { name, sizeId, colorId, info } = req.body;
      let price = Number(req.body.price);
      let brandId = Number(req.body.brandId);
      let typeId = Number(req.body.typeId);
      const images = req.files;
      const data = [];

      function fileName() {
        return uuid.v4() + ".jpg";
      }

      for (const key in images) {
        const img = images[key];
        const name = fileName();
        img.mv(path.resolve(__dirname, "..", "static", name));
        data.push(name);
      }
      let dataString = JSON.stringify(data);

      const product = await Product.create({
        name,
        price,
        brandId,
        typeId,
        sizeId,
        colorId,
        img: dataString,
      });

      if (info) {
        info = JSON.parse(info);
        info.forEach((i) => {
          ProductInfo.create({
            tittle: i.tittle,
            discription: i.discription,
            productId: product.id,
          });
        });
      }
      return res.json(product);
    } catch (err) {
      next(ApiError.badRequest("Error"));
    }
  }

  async getAll(req, res, next) {
    try {
      let {
        brandId,
        typeId,
        colorId,
        sizeId,
        prices,
        search,
        page = 1,
        limit = 10,
      } = req.query;
      page = page - 1;
      limit = parseInt(limit, 10);
      let offset = page * limit;

      let whereConditions = {};
      if (brandId) whereConditions.brandId = brandId;
      if (typeId) whereConditions.typeId = typeId;
      if (colorId) whereConditions.colorId = colorId;
      if (sizeId) whereConditions.sizeId = sizeId;

      if (Array.isArray(prices) && prices.length === 2) {
        const [minPrice, maxPrice] = prices.map(Number);
        whereConditions.price = {
          [Op.between]: [minPrice, maxPrice],
        };
      }
      if (search) {
        whereConditions.name = {
          [Op.iLike]: `%${search}%`,
        };
      }
      const products = await Product.findAndCountAll({
        where: whereConditions,
        limit,
        offset,
      });

      res.json(products);
    } catch (err) {
      next(ApiError.badRequest(err.massage));
    }
  }
  async getOne(req, res) {
    const { id } = req.params;
    const product = await Product.findOne({
      where: { id },
      include: [{ model: ProductInfo, as: "info" }],
    });
    return res.json(product);
  }

  async delete(req, res, next) {
    try {
      const { productID } = req.body;
      const product = await Product.findOne({ where: { id: productID } });
      let images = JSON.parse(product.img);
      for (let item of images) {
        await deletingImages(item);
      }
      async function deletingImages(item) {
        const filePath = path.join(__dirname, "..", "static", item);
        fs.unlink(filePath, (err) => {
          if (err) {
            return res.status(500).send("Error files is note deleted");
          }
        });
        const PROD = await Product.destroy({ where: { id: productID } });
        const PROD_INFO = await ProductInfo.destroy({
          where: { productId: productID },
        });
        return res.json("Files succesfully deleted");
      }
    } catch (err) {
      next(ApiError.badRequest(err.massage));
    }
  }
}

module.exports = new ProductController();
