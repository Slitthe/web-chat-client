import moment from "moment";
import { Message, User } from "../types/Interface";

export const generateMockMessages = (users: User[], messagesToEcho: string) => {
    const messages: Message[] = [];
    users.forEach(user => {
        messages.push({
            sentTime: moment(),
            text: `${messagesToEcho} 🙂`,
            sender: user
        });
    });

    return messages;
}

/* 
export interface Message {
  sentTime: Moment;
  text: string;
  sender: User;
}
*/