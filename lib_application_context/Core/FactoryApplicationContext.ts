import IApplication from "lib_domain_context/IApplication";
import { Types } from "lib_domain_context/Enumerables";
import IFactory from "lib_domain_context/IFactory";
import PersonTypesApp from "../Implementations/PersonTypesApp";

export default class FactoryApplicationContext implements IFactory<IApplication>
{
	public Get(data: { [Key: string]: any }): IApplication | null
	{
		var value: Types = data["Type"];
		switch (value)
		{
			case Types.PersonTypes: return new PersonTypesApp(data);
			default: return null;
		}
    }
}