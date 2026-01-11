import Repository from "../Core/Repository";
import PersonTypes from "lib_domain_entities/Models/PersonTypes";
import IPersonTypesRepository from "lib_data_core/Interfaces/IPersonTypesRepository";
import PersonTypesParser from "lib_infrastructure/Implementations/PersonTypesParser";
import Parameters from "lib_data_core/Core/Parameters";

export default class PersonTypesRepository extends Repository<PersonTypes> implements IPersonTypesRepository
{
    public constructor(data: { [Key: string]: any; })
    {
        super();
        this.parser = new PersonTypesParser();
    }

    public async Select(data: { [Key: string]: any; })
    {
        var response: { [Key: string]: any; } = {};
        try
        {
            var parameters = new Array<Parameters>();
            data["Parameters"] = parameters;
            data["Procedure"] = "sp_select_per_types";
            response = await super.Execute(data);
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
        throw "Not Implemented";
    }

    public async Update(data: { [Key: string]: any; })
    {
        throw "Not Implemented";
    }

    public async Delete(data: { [Key: string]: any; })
    {
        throw "Not Implemented";
    }
}