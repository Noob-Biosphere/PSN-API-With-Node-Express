import express from "express";
import GetSendJson from "../../helpers/resJson.js";
import fetch from "node-fetch";
import * as fs from "fs";
import path from "path";
import {fileURLToPath} from 'url';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get("/",function(req,res,next){
    res.status(200).json(GetSendJson(200,1,"welcom to azimiao's xbox server(node)",null));
});

const gameJsonPath = __dirname + "/xboxjson/";
const gamr13Origin = "https://raw.githubusercontent.com/Gamr13/AppStore/main/gamr13.json";
const copyright = "data from gamr13(https://www.patreon.com/gamr13)";
router.get("/gamr13list",function(req,res,next){
    
    if(!fs.existsSync(gameJsonPath)){
        fs.mkdirSync(gameJsonPath);
    }

    let todayDate = new Date();
    let todayStr = todayDate.getFullYear() + "_" + (todayDate.getMonth() + 1) + "_" + todayDate.getDate();
    let todayJson = gameJsonPath + "gamr13_" + todayStr;

    let result = fs.existsSync(todayJson);

    if(result){
        let str = fs.readFileSync(todayJson,"utf-8");
        res.status(200).json(GetSendJson(200,1,copyright,str));
    }else{
        let hasOldData = fs.readdirSync(gameJsonPath);
        if(hasOldData != null && hasOldData.length > 0){
            hasOldData.forEach(element => {
                console.log("remove old xboxData data:" + element);
                fs.unlinkSync(path.join(gameJsonPath,element));
            });
        }
       
        fetch(gamr13Origin).then(resTxt=>resTxt.json()).then(jsonData=>{

            try{
                let str = JSON.stringify(jsonData);
                fs.writeFileSync(todayJson,str);
                res.status(200).json(GetSendJson(200,1,copyright,str));
            }catch(e){
                throw e;
            }
        })
        .catch((err)=>{
            next(err);
        });
    }
});

export default router;