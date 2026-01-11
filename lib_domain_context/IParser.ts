export default interface IParser<T>
{
    CreateEntity(ItemArray: any): T;
    ToEntity(data: { [Key: string]: any }): T;
    ToDictionary(entity: T): { [Key: string]: any };
    Validate(entity: T): boolean;
}