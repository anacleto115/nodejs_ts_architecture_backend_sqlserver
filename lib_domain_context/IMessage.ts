import { Message } from "./Enumerables";

export interface IMessage
{
    Show(message: any, type : Message): any;
}

export default class MessagesHelper
{
    private static IMessage: IMessage;

    public static Set(iMessage: IMessage) { MessagesHelper.IMessage = iMessage; }

    public static Show(message: any, type: Message = Message.MESSAGE): any
    {
        if (MessagesHelper.IMessage == null)
            return false;
        return MessagesHelper.IMessage.Show(message, type);
    }
}