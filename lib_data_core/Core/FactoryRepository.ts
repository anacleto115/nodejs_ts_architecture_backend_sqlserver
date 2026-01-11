import IRepository from "lib_domain_context/IRepository";
import IFactory from "lib_domain_context/IFactory";

export default class FactoryRepository
{
    public static IFactoryRepository: IFactory<IRepository>;

    public static Get(data: { [Key: string]: any }): IRepository | null
    {
        if (this.IFactoryRepository == null)
            return null;

        return this.IFactoryRepository.Get(data);
    }
}