import PersonTypesService from "./Implementations/PersonTypesService";
import TokenService from "./Implementations/TokenService";

try
{
    var express = require('express');
    var app = express();
    app.use(express.json());

    var service = null;
    service = new PersonTypesService();
    service.CreateApis(app);

    service = new TokenService();
    service.CreateApis(app);

    app.listen(3000);
}
catch (error)
{
    console.error(error);
}
console.log("End");