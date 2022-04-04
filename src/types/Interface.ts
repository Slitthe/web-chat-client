export enum ChatroomType {
    group = 'group',
    individual = 'individual',
}

export interface User {
    displayName: string;
    userName: string;
}

export interface Message {
    sentTime: string;
    text: string;
    sender: User;
}

export interface Chatroom {
    id: string;
    type: ChatroomType;
    groupName?: string;
    participants: User[];
    messages: Message[];
    draftMessage: string;
}