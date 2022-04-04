import moment from "moment";
import { Message, User } from "../types/Interface";

export const generateMockMessages = (users: User[], messagesToEcho: string) => {
    const messages: Message[] = [];
    users.forEach(user => {
        messages.push({
            sentTime: moment().toISOString(),
            text: `${messagesToEcho} 🙂`,
            sender: user
        });
    });

    return messages;
}
