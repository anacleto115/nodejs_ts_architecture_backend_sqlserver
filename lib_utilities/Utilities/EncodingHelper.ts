export default class EncodingHelper
{
    public static ToString(data: Uint8Array): string
    {
        return Buffer.from(data).toString('hex');
    }

    public static ToBytes(data: string): Uint8Array
    {
        return Uint8Array.from(Buffer.from(data, 'hex'));
    }
}