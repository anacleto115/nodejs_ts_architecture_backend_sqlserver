export default interface IService
{
    Select(data: { [Key: string]: any }): { [Key: string]: any };
    Insert(data: { [Key: string]: any }): { [Key: string]: any };
    Update(data: { [Key: string]: any }): { [Key: string]: any };
    Delete(data: { [Key: string]: any }): { [Key: string]: any };
}