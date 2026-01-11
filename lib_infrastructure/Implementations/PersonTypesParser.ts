import IParser from "lib_domain_context/IParser";
import PersonTypes from "lib_domain_entities/Models/PersonTypes";

export default class PersonTypesParser implements IParser<PersonTypes>
{
    public CreateEntity(ItemArray: any): PersonTypes
    {
        var response = new PersonTypes();
        response.SetId(ItemArray["id"]);
        response.SetName(ItemArray["name"]);
        return response;
    }

    public ToEntity(data: { [Key: string]: any; }): PersonTypes
    {
        var response = new PersonTypes();
        response.SetId(data["Id"]);
        if ("Name" in data)
            response.SetName(data["Name"]);
        return response;
    }

    public ToDictionary(entity: PersonTypes): { [Key: string]: any; }
    {
        var response: { [Key: string]: any; } = {};
        response["Id"] = entity.GetId();
        if (entity.GetName() != undefined)
            response["Name"] = entity.GetName();
        return response;
    }

    public Validate(entity: PersonTypes): boolean
    {
        if (entity.GetName() == undefined)
            return false;
        return true;
    }
}