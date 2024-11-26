const {Size} = require ("../models/models")
const ApiError = require("../error/apiError")


class SizeController {

        async create (req, res, next){
            try {
            const {name} = req.body
            const size = await Size.create({name})
            return res.json(size)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }
        
    }
        async getAll (req, res, next){
            try{
            const sizes = await Size.findAll()
            return res.json(sizes)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }
    }
    
        async delete (req, res, next){
            try{
            const {sizeId} = req.body
            const size = await Size.destroy({where :{id:sizeId}})
            return res.json(sizeId)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }

    }
}

module.exports = new SizeController ()