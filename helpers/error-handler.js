import GetResJson from "./resJson";
function errorHandler(err, req, res, next) {


    if (typeof (err) === 'string') {
        // custom application error
        return res.status(200).json(GetResJson(400,0,err,null));
    }
    
    if (err.name === 'ValidationError') {
        // mongoose validation error
        return res.status(200).json(GetResJson(400,0,err.message,null));
    }

    if(err.name === "NotFoundError"){
        return res.status(200).json(GetResJson(404,0,err.message,null));
    }

    if (err.name === 'UnauthorizedError') {
        // jwt authentication error
        return res.status(200).json(GetResJson(401,0,err.message,null));
    }
    // default to 500 server error
    return res.status(200).json(GetResJson(500,0,err.message,null));
}

export default errorHandler;

/*
{
    code:500,
    result:success,
    data:{

    }
}
*/