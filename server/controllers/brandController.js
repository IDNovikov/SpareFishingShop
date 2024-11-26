const {Brand} = require ("../models/models")
const ApiError = require("../error/apiError")


class BrandController {

        async create (req, res, next){
            try {
            const {name} = req.body
            const brand = await Brand.create({name})
            return res.json(brand)
            }catch (err){
             next(ApiError.badRequest(err.massage))
          }
        
    }
        async getAll (req, res, next){
            try{
            const brands = await Brand.findAll()
            return res.json(brands)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }
    }
    
        async delete (req, res, next){
            try{
            const {brandId} = req.body
            const brand = await Brand.destroy({where :{id:brandId}})
            return res.json(brandId)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }

    }
}

module.exports = new BrandController ()