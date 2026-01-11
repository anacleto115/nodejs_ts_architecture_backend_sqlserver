import { Loading } from "./Enumerables";

export default interface IScreen
{
    Loading(action: Loading): any;
    MoveFocus(): any;
    Change(data: { [Key: string]: any }): any;
}