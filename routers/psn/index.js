//PSN 的相关接口 API，base url: /psn

import express from "express";
import SendJson from "../../helpers/resJson";
const router = express.Router();


router.get("/",function(req,res,next){
    res.status(200).json(SendJson(200,1,"welcome to azimiao's psn server(node)",null));
});


export default router;