const {Basket, Certificate} = require('../models/models')
const ApiError = require("../error/apiError")

class BasketController {

     //1. We are construct and posting the basket in SQL
        async postBasket (req, res, next){
            try{

            const {productsId, totalCost, typeOfDelivery, phoneNumber, email, payment, certificateUniqId, name, adress} = req.body
          

            const BasketCreate = await Basket.create({productsId, totalCost, typeOfDelivery, phoneNumber, email, payment, certificateUniqId, name, adress})
                return res.json(BasketCreate)

             
            }catch (err){
                next(ApiError.badRequest(err.massage))
          }
    }
    //2. We are getting all baskets for admin panel
        async getAllBaskets (req, res, next){
            try{    
            const baskets = await Basket.findAll()
            return res.json(baskets)
            }catch (err){
                next(ApiError.badRequest(err.massage))
          }
    }
    //3. We are deleting one basket after selling 
        async deleteBasket (req, res, next){
            try{
            const {id} = req.params
            const basket = await Basket.destroy({where :
                {id},})
                return res.json(basket)
            }catch (err){
                next(ApiError.badRequest(err.massage))
          }
        }
}

module.exports = new BasketController ()