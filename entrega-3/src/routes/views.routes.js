import { Router } from 'express';
import { __dirname } from "../utils.js"

const viewRouter = Router()

viewRouter.get("/",async(req,res)=>{
    //const listadeproductos=await pm.getProductsView()
    //res.render("home",{listadeproductos})
})

viewRouter.get("/realtimeproducts",(req,res)=>{
    //res.render("realtimeproducts")
})

export default viewRouter;