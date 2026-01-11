export default class Parameters
{
    public Name: string;
    public Type: any;
    public Value: any;
    public Direction: boolean = false;

    public constructor(name: string, type: any, value: any, direction: boolean)
    {
        this.Name = name;
        this.Type = type;
        this.Value = value;
        this.Direction = direction;
    }
}