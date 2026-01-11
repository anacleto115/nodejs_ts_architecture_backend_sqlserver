export default interface IConnection
{
    Execute(data: { [Key: string]: any; }): any;
    ExecuteNonQuery(data: { [Key: string]: any; }): any;
}