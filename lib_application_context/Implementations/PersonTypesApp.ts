import App from "../Core/App";
import PersonTypes from "lib_domain_entities/Models/PersonTypes";
import IPersonTypesApp from "lib_application_core/Interfaces/IPersonTypesApp";
import PersonTypesParser from "lib_infrastructure/Implementations/PersonTypesParser";
import FactoryRepository from "lib_data_core/Core/FactoryRepository";
import { Architecture } from "lib_domain_context/Enumerables";

export default class PersonTypesApp extends App<PersonTypes> implements IPersonTypesApp
{
    public constructor(data: { [Key: string]: any; })
    {
        super();
    }

    public override Load(data: { [Key: string]: any; }): { [Key: string]: any; }
    {
        data = super.Load(data);
        if ("Architecture" in data &&
            data["Architecture"] == Architecture.Services)
            this.parser = new PersonTypesParser();
        if (!("IRepository" in data))
            this.IRepository = FactoryRepository.Get(data);
        return data;
    }
}