export interface ILogHelper
{
    Log(exception: Error): void;
}

export default class LogHelper
{
    private static ILogHelper: ILogHelper;

    public static Set(iLogHelper: ILogHelper) { this.ILogHelper = iLogHelper; }

    public static Log(exception: Error)
    {
        if (LogHelper.ILogHelper == null)
            return;
        LogHelper.ILogHelper.Log(exception);
    }
}