export default class JsonHelper
{
    public static ConvertToString(data: { [Key: string]: any }): string
    {
        return JSON.stringify(data);
    }

    public static ConvertToObject(data: string): { [Key: string]: any }
    {
        return JSON.parse(data);
    }
}