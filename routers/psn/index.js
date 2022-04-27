//PSN 的相关接口 API，base url: /psn

import express from "express";
import GetSendJson from "../../helpers/resJson";

const router = express.Router();

import * as psnApi from 'psn-api';
import { getUserTitles } from "psn-api";

// const psnApi = require("psn-api");
const { exchangeCodeForAccessToken, exchangeNpssoForCode } = psnApi;

/**
 * 
 * 
 * import { exchangeCodeForAccessToken, exchangeNpssoForCode } from "psn-api";
         ^^^^^^^^^^^^^^^^^^^^^^^^^^
    SyntaxError: Named export 'exchangeCodeForAccessToken' not found. The requested module 'psn-api' is a CommonJS module, which may not 
    support all module.exports as named exports.
    CommonJS modules can always be imported via the default export, for example using:

    import pkg from 'psn-api';
    const { exchangeCodeForAccessToken, exchangeNpssoForCode } = pkg;
 * 
*/

router.get("/",function(req,res,next){
    res.status(200).json(GetSendJson(200,1,"welcome to azimiao's psn server(node)",null));
});

router.get("/token",function(req,res,next){
    if(req.query.hasOwnProperty("npsso")){
        // console.log(req.query);
    }else{
        let k = new Error("must have a npsso query params");
        next(k);
        return;
    };



    /* return */ exchangeNpssoForCode(req.query.npsso).then((accessCode)=>{
        // console.log(accessCode);
        exchangeCodeForAccessToken(accessCode).then((authentication)=>{
            // console.log(authentication);
            res.status(200).json(
                GetSendJson(200,1,"",
                    {
                        "access_token": authentication.accessToken,
                        "expires": authentication.expiresIn,
                    }
                )
            );
            return;
        }).catch((err)=>{
            throw err;
        })
    }).catch((err)=>{
        next(err);
    })
});

router.post("/trophy",function(req,res,next){

    
    if(req.body != null)
    {
        if(!req.body.hasOwnProperty("access_token")){
            k = new Error("access_token is needed!");
            next(k);
            return;
        }


        let access_token = req.body.access_token.toString();
        let offset = 0;
        let limit = 0;

        if(req.query.hasOwnProperty("offset")){
            try{
            offset =  parseInt(req.query.offset);
            }catch(err){
                next(err);
                return;
            }
        }

        if(req.query.hasOwnProperty("limit")){
            try{
                limit =  parseInt(req.query.limit);
                // console.log(limit);
            }catch(err){
                next(err);
                return;
            }
        }

        getUserTitles(
            {accessToken: access_token},
            "me", 
            {
                offset: offset >= 0 ? offset:0,
                limit: limit > 0 ? limit:1,
                headerOverrides:{ "Accept-Language":"zh-Hant"}
            }
        ).then((data)=>{

            res.status(200).json(
                GetSendJson(200,1,"",{
                    "previousOffset": data.previousOffset ?? -1,
                    "nextOffset":data.nextOffset ?? -1,
                    "totalItemCount": data.totalItemCount,
                    "trophyTitles":data.trophyTitles
                })
            );

        }).catch(err=>{next(err);});


    }else{
        k = new Error("body is needed!");
        next(k);
    }

    

    // res.status(200).json(
    //     GetSendJson(200,1,"",{
    //         "trophyTitles": [
    //             {
    //               "npServiceName": "trophy",
    //               "npCommunicationId": "NPWR07942_00",
    //               "trophySetVersion": "01.01",
    //               "trophyTitleName": "Ratchet & Clank™",
    //               "trophyTitleDetail": "Trophy set for Ratchet & Clank™.",
    //               "trophyTitleIconUrl": "https://image.api.playstation.com/trophy/np/NPWR07942_00_006F781DB9EE3B1A96EB9472B006DA21899A916D8F/0A529D9F4EA9446B6946C0CDC64C5DD853DC79D8.PNG",
    //               "trophyTitlePlatform": "PS4",
    //               "hasTrophyGroups": false,
    //               "definedTrophies": {
    //                 "bronze": 30,
    //                 "silver": 14,
    //                 "gold": 2,
    //                 "platinum": 1
    //               },
    //               "progress": 12,
    //               "earnedTrophies": {
    //                 "bronze": 9,
    //                 "silver": 0,
    //                 "gold": 0,
    //                 "platinum": 0
    //               },
    //               "hiddenFlag": false,
    //               "lastUpdatedDateTime": "2020-11-16T12:06:19Z"
    //             }
    //           ],
    //           "nextOffset": 11,
    //           "previousOffset": 9,
    //           "totalItemCount": 47
    //     })
    // );
});

export default router;