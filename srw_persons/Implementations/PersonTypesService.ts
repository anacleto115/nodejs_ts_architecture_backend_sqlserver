import ServiceBase from "../Core/ServiceBase";
import IPersonTypesService from "lib_service_core/Interfaces/IPersonTypesService";
import FactoryApplication from "lib_application_core/Core/FactoryApplication";
import { Types } from "lib_domain_context/Enumerables";
import JsonHelper from "lib_utilities/Utilities/JsonHelper";

export default class PersonTypesService extends ServiceBase implements IPersonTypesService
{
    public constructor()
    {
        super();
        this.name = "/PersonTypes";
    }

    public override Load(data: { [Key: string]: any; }): { [Key: string]: any; }
    {
        data = super.Load(data);
        data["Type"] = Types.PersonTypes;
        if (!("IApplication" in data) && this.IApp == null)
            this.IApp = FactoryApplication.Get(data);
        return data;
    }

    public override CreateApis(app: any): void
    {
        var service = this;
        app.post(this.name +'/Select', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Select(JsonHelper.ConvertToObject(income)));
            });
        });
    }
}