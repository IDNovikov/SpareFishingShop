const {Color} = require ("../models/models")
const ApiError = require("../error/apiError")


class ColorController {

        async create (req, res, next){
            try {
                const {name} = req.body
                const color = await Color.create({name})
                return res.json(color)
            }catch (err){
             next(ApiError.badRequest(err.massage))
          }
    }
        async getAll (req, res, next){
            try {
            const colors = await Color.findAll()
            return res.json(colors)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }
    }
    
        async delete (req, res, next){
            try{
            const {colorId} = req.body
            const type = await Color.destroy({where :{id:colorId}})
            return res.json(colorId)
             }catch (err){
             next(ApiError.badRequest(err.massage))
          }

    }
}

module.exports = new ColorController ()