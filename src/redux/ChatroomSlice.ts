import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Chatroom, ChatroomType, Message, User } from '../types/Interface';
import { generateMockMessages } from '../utils/mockGenerators';

const owner =  {displayName: "Sandor Clegane", userName: "burnt.flesh"};

// Interfaces
export interface ActionAddChatMessage {
  chatroomId: string;
  message: Message;
}

export interface ActionChangeDraftMessage {
  chatroomId: string;
  message: string;
}

export interface FormState {
  users: User[];
  activeChatroomId: string | null;
  chatrooms: Chatroom[];
  ownerUser: User;
}

// Initial state
export const initialState: FormState = {
  users: [
    {displayName: "Jon Snow", userName: "j.snow"},
    {displayName: "Arya Stark", userName: "arya.needle"},
    {displayName: "Jaimie Lannister", userName: "j.kingslayer"},
    {displayName: "Rob Stark", userName: "dies.at.wedding"},
    {displayName: "The Mountain", userName: "explosive.head"},
  ],
  ownerUser: owner,
  activeChatroomId: null,
  chatrooms: [],
}

// Reducer
export const chatroomSlice = createSlice({
  name: 'chatrooms',
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeSelectecChatroomId: (state, action: PayloadAction<string>) => {
      state.activeChatroomId = action.payload;
    },
    addChatroom: (state, action: PayloadAction<Chatroom>) => {
      state.chatrooms = [...state.chatrooms, action.payload];
    },
    addMessage: (state, action: PayloadAction<ActionAddChatMessage>) => {
      const currentChatroom = state.chatrooms.find(chatroom => chatroom.id === action.payload.chatroomId);
      if(currentChatroom) {
        currentChatroom.messages = [...currentChatroom.messages, action.payload.message, ...generateMockMessages(currentChatroom.participants, action.payload.message.text)];
      }
    },
    changeDraftMessage: (state, action: PayloadAction<ActionChangeDraftMessage>) => {
      const currentChatroom = state.chatrooms.find(chatroom => chatroom.id === action.payload.chatroomId);
      if(currentChatroom) {
        currentChatroom.draftMessage = action.payload.message;
      }
    },
    clearDraftMessage: (state, action: PayloadAction<string>) => {
      const currentChatroom = state.chatrooms.find(chatroom => chatroom.id === action.payload);
      if(currentChatroom) {
        currentChatroom.draftMessage = '';
      }
    },
  },
});

// Actions
export const { changeSelectecChatroomId, addChatroom, addMessage, changeDraftMessage, clearDraftMessage } = chatroomSlice.actions;

// Selectors
export const selectActiveChatroomId = (state: RootState) => state.chatrooms.activeChatroomId;
export const selectUsers = (state: RootState) => state.chatrooms.users;
export const selectChatrooms = (state: RootState) => state.chatrooms.chatrooms;
export const selectOwner = (state: RootState) => state.chatrooms.ownerUser;

export const selectChatroomTitleById = (chatroomId: string | null) => {
  return (state: RootState) => {
    if(chatroomId === null) {
      return '';
    }
    const chatroom = state.chatrooms.chatrooms.find(chatroom => chatroom.id === chatroomId);
    if(chatroom) {
      return chatroom.type === ChatroomType.group ? chatroom.groupName : chatroom.participants[0].displayName
    } else {
      return '';
    }
  };
}

export const selectActiveChatroom = (state: RootState) => {
  const selectedChatroomId = state.chatrooms.activeChatroomId;

  return state.chatrooms.chatrooms.find(chatroom => chatroom.id === selectedChatroomId);
};



