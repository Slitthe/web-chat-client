import { Chatroom, ChatroomType, User } from "../types/Interface";

export const generateIndividualChatroom = (users: User[], selectedUsername: string): Chatroom => {

    const userToAdd = users.find(user => user.userName === selectedUsername);
    return {
        type: ChatroomType.individual,
        participants: userToAdd ? [userToAdd] : [],
        id: `${Math.random()}`,
        messages: [],
        draftMessage: '',
    }

}

export const generateGroupChatroom = (selectedUsers: {label: string, value: string}[], groupName: string): Chatroom => {
    const mappedUsers: User[] = selectedUsers.map(selectUser => ({userName: selectUser.value, displayName: selectUser.label}));

    return {
        type: ChatroomType.group,
        groupName: groupName,
        participants: mappedUsers,
        id: `${Math.random()}`,
        messages: [],
        draftMessage: '',
    }

}
