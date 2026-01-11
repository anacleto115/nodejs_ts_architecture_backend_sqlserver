import IApplication from "lib_domain_context/IApplication";
import IRepository from "lib_domain_context/IRepository";
import IParser from "lib_domain_context/IParser";
import FactoryRepository from "lib_data_core/Core/FactoryRepository";
import FactoryRepositoryContext from "lib_data_context/Core/FactoryRepositoryContext";

export default class App<T> implements IApplication
{
    protected parser: IParser<T> | any = undefined;
    protected IRepository: IRepository | any = undefined;
    
    public Load(data: { [Key: string]: any; }): { [Key: string]: any; }
    {
        FactoryRepository.IFactoryRepository =
            FactoryRepository.IFactoryRepository == null ? new FactoryRepositoryContext() : FactoryRepository.IFactoryRepository;
        if ("IRepository" in data)
            this.IRepository = <IRepository>data["IRepository"];
        return data;
    }

    public async Select(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            data = this.Load(data);
            response = await this.IRepository.Select(data);
            if (this.parser != null && "Entities" in response)
            {
                var list: Array<T> = response["Entities"];
                var dict: { [Key: string]: any; } = {};
                var count: number = 0;
                for (var pos in list)
                {
                    var item = list[pos];
                    dict[count] = this.parser.ToDictionary(item);
                    count++;
                }
                response["Entities"] = dict;
            }
            return response;
        }
        catch (ex: any)
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
            if (!("Entity" in data))
                return { "Error": "lbMissingInfo" };
            if (this.parser != undefined)
                data["Entity"] = this.parser.ToEntity(data["Entity"]);
            if (this.parser != undefined && !this.parser.Validate(<T>data["Entity"]))
                return { "Error": "lbMissingInfo" };
            response = await this.IRepository.Insert(data);
            if (this.parser != undefined && "Entity" in response)
                response["Entity"] = this.parser.ToDictionary(<T>response["Entity"]);
            return response;
        }
        catch (ex: any)
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
            if (!("Entity" in data))
                return { "Error": "lbMissingInfo" };
            if (this.parser != undefined)
                data["Entity"] = this.parser.ToEntity(data["Entity"]);
            if (this.parser != undefined && !this.parser.Validate(<T>data["Entity"]))
                return { "Error": "lbMissingInfo" };
            response = await this.IRepository.Update(data);
            if (this.parser != undefined && "Entity" in response)
                response["Entity"] = this.parser.ToDictionary(<T>response["Entity"]);
            return response;
        }
        catch (ex: any)
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
            if (!("Entity" in data))
                return { "Error": "lbMissingInfo" };
            if (this.parser != undefined)
                data["Entity"] = this.parser.ToEntity(data["Entity"]);
            if (this.parser != undefined && !this.parser.Validate(<T>data["Entity"]))
                return { "Error": "lbMissingInfo" };
            response = await this.IRepository.Delete(data);
            if (this.parser != undefined && "Entity" in response)
                response["Entity"] = this.parser.ToDictionary(<T>response["Entity"]);
            return response;
        }
        catch (ex: any)
        {
            response["Error"] = String(ex);
            return response;
        }
    }
}