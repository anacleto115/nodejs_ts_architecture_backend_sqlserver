import IEntities from "lib_domain_context/IEntities";

export default class PersonTypes implements IEntities
{
    private Id: number = 0;
    private Name: string = "";

    public constructor() { }

    public SetId(v: number) { this.Id = v; }
    public GetId(): number { return this.Id; }

    public SetName(v: string) { this.Name = v; }
    public GetName(): string { return this.Name; }
    
    public Get_Id(): number { return this.Id; }
    public GetClone(): any
    {
        return Object.assign(Object.create(Object.getPrototypeOf(this)), this);
    }
}