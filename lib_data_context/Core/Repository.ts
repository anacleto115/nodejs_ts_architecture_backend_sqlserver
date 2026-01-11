import ConnectionSQL from "./ConnectionSQL";
import IConnection from "lib_data_core/Core/IConnection";
import IParser from "lib_domain_context/IParser";

export default class Repository<T>
{
    protected parser: IParser<T> | any = null;
    protected connection: IConnection | any = null;

    protected async Execute(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            this.connection = new ConnectionSQL();
            var list = new Array<T>();
            var set = await this.connection.Execute(data);

            if ("Error" in set)
                return set;

            var temp = set["Table"][0];
            for (var pos in temp)
            {
                var item = temp[pos];
                list.push(this.parser.CreateEntity(item));
            }

            response["Entities"] = list;
            response["Response"] = "OK";
            return response;
        }
        catch (ex: any)
        {
            throw ex;
        }
    }

    protected async ExecuteNonQuery(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            this.connection = new ConnectionSQL();
            response = await this.connection.ExecuteNonQuery(data);

            if ("Error" in response)
                return response;
            response["Response"] = "OK";
            return response;
        }
        catch (ex: any)
        {
            throw ex;
        }
    }
}