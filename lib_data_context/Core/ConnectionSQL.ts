import IConnection from "lib_data_core/Core/IConnection";

export default class ConnectionSQL implements IConnection
{
    public stringConnection = {};

    public async Execute(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            var sql = require('mssql');
            this.stringConnection = data["stringConnection"];
            var connection = await sql.connect(this.stringConnection);

            var request = connection.request();
            var parameters = data["Parameters"];
            for (var pos in parameters)
            {
                var item = parameters[pos];
                if (!item.Direction)
                    request.input(item.Name, this.GetType(item.Type, sql), item.Value);
                else
                    request.output(item.Name, this.GetType(item.Type, sql));
            }
            request.input('create_by', sql.NVarChar, "Services");
            request.input('ip', sql.NVarChar, "127.0.0.1");
            request.output('result', sql.Int);

            var result = await request.execute(data["Procedure"]);
            response["Table"] = result["recordsets"];
            return response;
        }
        catch (ex: any)
        {
            response["Error"] = String(ex);
            return response;
        }
    }

    public async ExecuteNonQuery(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            var sql = require('mssql');
            this.stringConnection = data["stringConnection"];
            var connection = await sql.connect(this.stringConnection);

            var request = connection.request();
            var parameters = data["Parameters"];
            for (var pos in parameters)
            {
                var item = parameters[pos];
                if (!item.Direction)
                    request.input(item.Name, this.GetType(item.Type, sql), item.Value);
                else
                    request.output(item.Name, this.GetType(item.Type, sql));
            }
            request.input('create_by', sql.NVarChar, "Services");
            request.input('ip', sql.NVarChar, "127.0.0.1");
            request.output('result', sql.Int);

            var result = await request.execute(data["Procedure"]);
            response["Result"] = result["output"].result;
            return response;
        }
        catch (ex: any)
        {
            response["Error"] = String(ex);
            return response;
        }
    }

    public GetType(type: string, sql: any): any
    {
        switch (type)
        {
            case "NVARCHAR": return sql.NVarChar;
            case "INT": return sql.Int;
            case "BIT": return sql.Bit;
            case "NUMERIC": return sql.Numeric;
            case "DECIMAL": return sql.Decimal;
            case "DATETIME": return sql.DateTime;
            case "TIME": return sql.Time;
            case "VARBINARY": return sql.VarBinary;
            default: return sql.NVarChar;
        }
    }
}