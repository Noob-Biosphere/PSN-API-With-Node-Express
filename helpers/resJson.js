function GetResJson(code,result,msg,data){
    return {
        code: code,
        result: result > 0 ? "successful":"failed",
        msg:msg,
        data:data
    };
}

export default GetResJson;