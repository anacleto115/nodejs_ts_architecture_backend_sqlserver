import IToken from "lib_service_core/Core/IToken";
import ServiceData from "lib_domain_context/ServiceData";
import JsonHelper from "lib_utilities/Utilities/JsonHelper";

export default class TokenService implements IToken
{
    public CreateApis(app: any): void
    {
        var service = this;
        app.post('/Token/Authenticate', function (req, res) {
            var body = [];
            req.on('data', (x) => { body.push(x); }).on('end', async() => {
                var income = Buffer.concat(body).toString();
                res.json(await service.Authenticate(income));
            });
        });
    }

    public Authenticate(income: string): string
    {
        try
        {
            var data = JsonHelper.ConvertToObject(income);

            var inputDate = new Date();
            var day = inputDate.getDate().toString();
            var month = (inputDate.getMonth() + 1).toString();
            var year = inputDate.getFullYear();

            day = day.padStart(2, '0');
            month = month.padStart(2, '0');

            return "{" +
                "'Token': '" + ServiceData.KeyToken + "', " +
                "'Expires':'" + `${day}/${month}/${year}` + "'" +
                "}";
        }
        catch (ex)
        {
            return "{" +
                "'Error': '" + String(ex) + "', " +
                "}";
        }
    }
    
    public Validate(data: { [Key: string]: any; }): boolean
    {
        try
        {
            if (data == null || !("Bearer" in data))
                return false;
            var bearer = data["Bearer"];
            if (bearer == undefined || !ServiceData.KeyToken == bearer)
                return false;
            return true;
        }
        catch (ex)
        {
            return false;
        }
    }
}