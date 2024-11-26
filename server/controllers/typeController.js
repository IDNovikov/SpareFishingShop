const {Type} = require ("../models/models")
const ApiError = require("../error/apiError")


class TypeController {

        async create (req, res, next){
            try {
            const {name} = req.body
            const type = await Type.create({name})
            return res.json(type)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }
        
    }
        async getAll (req, res, next){
            try{
            const types = await Type.findAll()
            return res.json(types)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }
    }
    
        async delete (req, res, next){
            try{
            const {typeId} = req.body
            const type = await Type.destroy({where :{id:typeId}})
            return res.json(typeId)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }

    }
}

module.exports = new TypeController ()