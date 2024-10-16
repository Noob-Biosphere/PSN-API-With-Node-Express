import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import errorHandler from "./helpers/error-handler.js";
import cors from "cors";

import ResJsonCreator from "./helpers/resJson.js";
import PsnApiRouter from "./routers/psn/index.js";
import XboxApiRouter from "./routers/xbox/index.js";
const app = express();

app.use(bodyParser.urlencoded({ extended:false}));
//解析json，之后 req.json 均为解析好的信息
app.use(bodyParser.json());
//跨域，allow origin *
app.use(cors());

app.get("/",function(req,res,next){
    res.json(ResJsonCreator(200,1,"welcome to azimiao's api server(node)",null));
});

app.use("/psn",PsnApiRouter);

app.use("/xbox",XboxApiRouter);

//访问其他未监听的目录，暂时 404 处理
app.get("*",function(req,res,next){
    let notFoundError = new Error("not found:" + (req.path.toString()));
    notFoundError.name = "NotFoundError";
    next(notFoundError);
})

app.use(errorHandler);


app.listen(4000,function(){
    console.log("StartListen At http://127.0.0.1:4000");
})

/*

{
    code:500,
    result:success,
    data:{

    }
}

*/