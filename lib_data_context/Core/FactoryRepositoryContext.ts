import IRepository from "lib_domain_context/IRepository";
import { Types } from "lib_domain_context/Enumerables";
import IFactory from "lib_domain_context/IFactory";
import PersonTypesRepository from "../Implementations/PersonTypesRepository";

export default class FactoryRepositoryContext implements IFactory<IRepository>
{
	public Get(data: { [Key: string]: any }): IRepository | null
	{
		var value: Types = data["Type"];
		switch (value)
		{
			case Types.PersonTypes: return new PersonTypesRepository(data);
			default: return null;
		}
    }
}