import IFactory from "./IFactory"; 

export interface ICaller
{
    Execute(data: { [Key: string]: any }): { [Key: string]: any };
}

export default class FactoryCaller
{
    public static IFactoryCaller: IFactory<ICaller>;

    public static Get(data: { [Key: string]: any }): ICaller | null
    {
        if (this.IFactoryCaller == null)
            return null;

        return this.IFactoryCaller.Get(data);
    }
}