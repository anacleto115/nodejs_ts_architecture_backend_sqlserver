export default interface IFactory<T>
{
    Get(data: { [Key: string]: any }): T | null;
}