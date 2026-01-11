export default interface IToken
{
    Validate(data: { [Key: string]: any }): boolean;
    Authenticate(data: string): string;
}