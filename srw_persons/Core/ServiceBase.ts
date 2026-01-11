import IService from "lib_domain_context/IService";
import IConfiguration from "lib_domain_context/IConfiguration";
import IApplication from "lib_domain_context/IApplication";
import IToken from "lib_service_core/Core/IToken";
import TokenService from "../Implementations/TokenService";
import Configuration from "../Configuration";
import FactoryApplication from "lib_application_core/Core/FactoryApplication";
import FactoryApplicationContext from "lib_application_context/Core/FactoryApplicationContext";
import { Architecture } from "lib_domain_context/Enumerables";
import JsonHelper from "lib_utilities/Utilities/JsonHelper";

export default class ServiceBase implements IService
{
    protected name: string;
    protected IApp: IApplication;
    protected iToken: IToken;
    protected iConfiguration: IConfiguration;
    
    public constructor() { }

    public Load(data: { [Key: string]: any; }): { [Key: string]: any; }
    {
        this.iConfiguration = this.iConfiguration == null ? new Configuration() : this.iConfiguration;
        FactoryApplication.IFactoryApplication =
            FactoryApplication.IFactoryApplication == null ? new FactoryApplicationContext() : FactoryApplication.IFactoryApplication;
        if ("IApplication" in data)
            this.IApp = <IApplication>data["IApplication"];
        this.iToken = this.iToken == null ? new TokenService() : this.iToken;
        data["stringConnection"] = this.iConfiguration.Get("Default");
        data["Architecture"] = Architecture.Services;
        return data;
    }

    public async Select(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            data = this.Load(data);

            data = this.FuncValidate(data);
            if ("Error" in data)
                return data;

            response = await this.IApp.Select(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }

    public async Insert(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            data = this.Load(data);

            data = this.FuncValidate(data);
            if ("Error" in data)
                return data;

            response = await this.IApp.Insert(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }

    public async Update(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            data = this.Load(data);

            data = this.FuncValidate(data);
            if ("Error" in data)
                return data;

            response = await this.IApp.Update(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }

    public async Delete(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            data = this.Load(data);

            data = this.FuncValidate(data);
            if ("Error" in data)
                return data;

            response = await this.IApp.Delete(data);
            return response;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
    
    protected FuncValidate(data: { [Key: string]: any; }): { [Key: string]: any; }
    {
        var response: { [Key: string]: any; } = { };
        try
        {
            if (!this.iToken.Validate(data))
            {
                response["Error"] = "NoAuthenticate";
                return response;
            }
            return data;
        }
        catch (ex)
        {
            response["Error"] = String(ex);
            return response;
        }
    }

    public CreateApis(app: any): void
    {
        var service = this;
        app.post(this.name +'/Select', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Select(JsonHelper.ConvertToObject(income)));
            });
        });
        app.post(this.name +'/Insert', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Insert(JsonHelper.ConvertToObject(income)));
            });
        });
        app.post(this.name +'/Update', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Update(JsonHelper.ConvertToObject(income)));
            });
        });
        app.post(this.name +'/Delete', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Delete(JsonHelper.ConvertToObject(income)));
            });
        });
    }
}