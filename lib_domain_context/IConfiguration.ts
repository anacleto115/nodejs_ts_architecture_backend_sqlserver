export default interface IConfiguration
{
    Get(key: string): { [Key: string]: any; };
}