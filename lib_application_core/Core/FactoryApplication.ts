import IApplication from "lib_domain_context/IApplication";
import IFactory from "lib_domain_context/IFactory";

export default class FactoryApplication
{
    public static IFactoryApplication: IFactory<IApplication>;

    public static Get(data: { [Key: string]: any }): IApplication | null
    {
        if (this.IFactoryApplication == null)
            return null;

        return this.IFactoryApplication.Get(data);
    }
}