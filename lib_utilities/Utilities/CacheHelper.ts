export interface ICacheHelper
{
    Add(key: string, value: any): void;
    Instance(): void;
    Contains(key: string): boolean;
    Get(key: string): any;
    Remove(key: string): void;
}

export class CacheDictionary implements ICacheHelper
{
    private data: { [Key: string]: any; } = {};

    public Add(key: string, value: any): void
    {
        this.Instance();
        this.data[key] = value;
    }

    public Instance(): void
    {
        if (this.data != null)
            return;
        this.data = { };
    }

    public Contains(key: string): boolean
    {
        this.Instance();
        return key in this.data;
    }

    public Get(key: string): any
    {
        this.Instance();
        if (!this.Contains(key))
            return null;
        return this.data[key];
    }

    public Remove(key: string): void
    {
        this.Instance();
        if (!this.Contains(key))
            return;
        delete this.data[key];
    }
}

export default class CacheHelper
{
    private static ICacheHelper: ICacheHelper;

    public static Add(key: string, value: any): void
    {
        CacheHelper.CreateInstance();
        CacheHelper.ICacheHelper.Add(key, value);
    }

    public static CreateInstance(iCacheHelper: ICacheHelper | any = null): void
    {
        if (CacheHelper.ICacheHelper != null)
            return;
        if (iCacheHelper != null)
            CacheHelper.ICacheHelper = iCacheHelper;
        else if (CacheHelper.ICacheHelper == null)
            CacheHelper.ICacheHelper = new CacheDictionary();
    }

    public static Contains(key: string): boolean
    {
        CacheHelper.CreateInstance();
        return CacheHelper.ICacheHelper.Contains(key);
    }

    public static Get(key: string): any
    {
        CacheHelper.CreateInstance();
        return CacheHelper.ICacheHelper.Get(key);
    }

    public static Remove(key: string): void
    {
        CacheHelper.CreateInstance();
        CacheHelper.ICacheHelper.Get(key);
    }
}