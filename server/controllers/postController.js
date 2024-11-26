const uuid = require("uuid");
const path = require("path");
const { Post } = require("../models/models");
const ApiError = require("../error/apiError");
const fs = require("fs");

class PostController {
  async create(req, res, next) {
    try {
      let { tittle, discription } = req.body;

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

      const post = await Post.create({ tittle, discription, img: dataString });

      return res.json(post);
    } catch (err) {
      next(ApiError.badRequest(err.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { page, limit } = req.query;
      page = page || 1;
      limit = limit || 4;
      let offset = page * limit - limit;
      const posts = await Post.findAndCountAll({ limit, offset });
      return res.json(posts);
    } catch (err) {
      next(ApiError.badRequest(err.massage));
    }
  }

  async getOne(req, res) {
    const { id } = req.params;
    const post = await Post.findOne({ where: { id } });
    return res.json(post);
  }

  async delete(req, res, next) {
    try {
      const { postID } = req.body;
      const post = await Post.findOne({ where: { id: postID } });
      let images = JSON.parse(post.img);
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
        const POST = await Post.destroy({ where: { id: postID } });
        return res.json("Files succesfully deleted");
      }
    } catch (err) {
      next(ApiError.badRequest(err.massage));
    }
  }
}

module.exports = new PostController();
