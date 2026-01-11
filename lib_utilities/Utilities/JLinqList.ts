export default class JLinqList<T>
{
    private listGeneric: T[] = [];

    public constructor(list: T[])
    {
        this.listGeneric = list;
    }

    public ToList(): Array<T> { return this.listGeneric; }
    public AsEnumerable(): Array<T> { return this.listGeneric; }
    public OfType<X>(): Array<X> { return <X[]><any[]>this.listGeneric; }
    public Cast<X>(): Array<X> { return this.OfType(); }
    public ToArray(): T[] { return this.listGeneric; }
    public ToDictionary(expresion: (value: T) => any, thisArg?: any): {}
    {
        return this.listGeneric.map(x => [expresion(x), x]);
    }

    public Where(expresion: (value: T) => any, thisArg?: any): JLinqList<T>
    {
        if (expresion == null)
            return this;

        var temp = this.listGeneric.filter(expresion);
        return new JLinqList<T>(temp);
    }

    public Select(expresion: (value: T) => any): boolean[]
    {
        var response = [];
        var temp = this.listGeneric.filter(expresion);
        for (var pos in this.listGeneric)
        {
            var item = this.listGeneric[pos];
            response.push(temp.some(x => x == item));
        }
        return response;
    }

    public SelectMany(expresion: (value: T) => any): any[]
    {
        return this.listGeneric.map(expresion);
    }

    public OrderBy(expresion: (value1: T, value2: T) => any, thisArg?: any): Array<T>
    {
        var temp = [...this.listGeneric];
        return temp.sort((x1, x2) => expresion(x1, x2) ? 1 : (expresion(x2, x1) ? -1 : 0));
    }

    public OrderByDescending(expresion: (value1: T, value2: T) => any, thisArg?: any): Array<T>
    {
        return this.OrderBy(expresion).reverse();
    }

    public Join(list: Array<T>): Array<T>
    {
        var response = [...this.listGeneric];
        for (var pos in list)
        {
            var item = list[pos];
            response.push(item);
        }
        return response;
    }

    public Any(expresion: (value: T) => any, thisArg?: any): boolean
    {
        return this.listGeneric.some(expresion);
    }

    public All(expresion: (value: T) => any, thisArg?: any): boolean
    {
        var temp = this.listGeneric.filter(expresion);
        return this.listGeneric.length == temp.length;
    }

    public Contains(entity: T): boolean
    {
        return this.listGeneric.some(x => x == entity);
    }

    public GroupBy(expresion: (value: any) => number): any[]
    {
        return this.ToLookup(expresion);
    }

    public ToLookup(expresion: (value: any) => number): any[]
    {
        var response = [];
        var temp = this.listGeneric.map(expresion);
        // v: value, i: index, a: array
        for (var pos in temp.filter((v, i, a) => a.indexOf(v) === i))
        {
            var item = temp[pos];
            var data: { [Key: number]: number; } = {};
            data[item] = temp.filter(x => x == item).length;
            response.push(data);
        }
        return response;
    }
    
    public Take(size: number): JLinqList<T>
    {
        var response = new Array<T>();
        var count: number = 0;
        for (var pos in this.listGeneric)
        {
            count++;
            response.push(this.listGeneric[pos]);
            if (count >= size)
                break;
        }
        return new JLinqList<T>(response);
    }
    
    public Skip(size: number): JLinqList<T>
    {
        var response = new Array<T>();
        var count: number = 0;
        for (var pos in this.listGeneric)
        {
            count++;
            if (count <= size)
                continue;
            response.push(this.listGeneric[pos]);
        }
        return new JLinqList<T>(response);
    }
    
    public TakeWhile(expresion: (value: T) => any, thisArg?: any): JLinqList<T>
    {
        return this.Where(expresion);
    }
    
    public SkipWhile(expresion: (value: T) => any, thisArg?: any): JLinqList<T>
    {
        if (expresion == null)
            return this;

        var temp = this.listGeneric.filter(x => !expresion(x));
        return new JLinqList<T>(temp);
    }

    public Union(list: Array<T>): JLinqList<T>
    {
        return new JLinqList<T>(this.Join(list));
    }

    public Distinct(): JLinqList<T>
    {
        return new JLinqList<T>(this.listGeneric.filter((v, i, a) => a.indexOf(v) === i));
    }

    public Intersect(expresion: (value: T) => any, thisArg?: any): JLinqList<T>
    {
        return new JLinqList<T>(this.listGeneric.filter(expresion));
    }

    public Except(list: Array<T>): JLinqList<T>
    {
        return new JLinqList<T>(this.listGeneric.filter(x => list.some(y => x != y)));
    }
    
    public First(expresion: (value: T) => any): T | any
    {
        return this.FirstOrDefault(expresion);
    }

    public FirstOrDefault(expresion: (value: T) => any): T
    {
        if (expresion == null)
        {
            if (this.listGeneric.length == 0)
                return <T>null;
            return this.listGeneric[0];
        }
        var temp = this.listGeneric.filter(expresion);
        if (temp.length == 0)
            return <T>null;
        return temp[0];
    }

    public Last(expresion: (value: T) => any): T | any
    {
        return this.LastOrDefault(expresion);
    }

    public LastOrDefault(expresion: (value: T) => any): T
    {
        if (expresion == null)
        {
            if (this.listGeneric.length == 0)
                return <T>null;
            return this.listGeneric[this.listGeneric.length - 1];
        }
        var temp = this.listGeneric.filter(expresion);
        if (temp.length == 0)
            return <T>null;
        return temp[temp.length - 1];
    }

    public ElementAt(position: number): T
    {
        return this.ElementAtOrDefault(position);
    }

    public ElementAtOrDefault(position: number): T
    {
        if (position > this.listGeneric.length)
            return <T>null;
        return this.listGeneric[position];
    }
    
    public Single(expresion: (value: T) => any): T
    {
        return this.SingleOrDefault(expresion);
    }

    public SingleOrDefault(expresion: (value: T) => any): T
    {
        var temp = this.Where(expresion).ToList();
        if (temp.length > 1)
            throw "The list has more than one item";
        return temp[0];
    }

    public Count(expresion: (value: T) => any, thisArg?: any): number
    {
        if (expresion == null)
            return this.listGeneric.length;

        var temp = this.listGeneric.filter(expresion);
        return temp.length;
    }

    public Sum(expresion: (value: T) => any, thisArg?: any): number
    {
        var temp = this.listGeneric.map(expresion);
        var response: number = 0;
        for (var pos in temp)
            response = response + temp[pos];
        return response;
    }

    public Min(expresion: (value: T) => any, thisArg?: any): number
    {
        var temp = this.listGeneric.map(expresion);
        if (temp.length == 0)
            return 0;
        var response: number = temp[0];
        for (var pos in temp)
        {
            if (response <= temp[pos])
                continue;
            response = temp[pos];
        }
        return response;
    }

    public Max(expresion: (value: T) => any, thisArg?: any): number
    {
        var temp = this.listGeneric.map(expresion);
        if (temp.length == 0)
            return 0;
        var response: number = temp[0];
        for (var pos in temp)
        {
            if (response >= temp[pos])
                continue;
            response = temp[pos];
        }
        return response;
    }

    public Average(expresion: (value: T) => any, thisArg?: any): number
    {
        var temp = this.listGeneric.map(expresion);
        var sum = this.Sum(expresion);
        return sum / temp.length;
    }

    public Index(expresion: (value: T) => any, thisArg?: any): number
    {
        var count = 0;
        var index = -1; 
        if (expresion == null)
            return index;
        
        for (var pos in this.listGeneric)
        {
            var item = this.listGeneric[pos];
            if (expresion(item))
            {
                index = count;
                break;
            }
            count++
        }
	    return index;
    }
}