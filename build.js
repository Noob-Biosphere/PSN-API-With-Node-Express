import * as fs from "fs";


let rawData = fs.readFileSync("./node_modules/psn-api/package.json","utf8");
let obj = JSON.parse(rawData);

obj.type = "module";

fs.writeFileSync("./node_modules/psn-api/package.json",JSON.stringify(obj,null,4));
