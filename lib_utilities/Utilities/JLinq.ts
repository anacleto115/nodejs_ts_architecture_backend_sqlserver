import JLinqList from "./JLinqList";

export default class JLinq<T>
{
    public static From<T>(list: T[]): JLinqList<T> { return new JLinqList<T>(list); }
}