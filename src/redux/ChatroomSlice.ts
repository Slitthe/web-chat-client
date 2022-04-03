import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { Chatroom, User } from '../types/Interface';

// Interfaces
export interface ActionChangeChatroomId {
  key: number,
  value: string | string[],
}

export interface FormState {
  users: User[];
  activeChatroomId: string | null;
  chatrooms: Chatroom[];
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
  },
});

// Actions
export const { changeSelectecChatroomId, addChatroom } = chatroomSlice.actions;

// Selectors
export const selectActiveChatroomId = (state: RootState) => state.chatrooms.activeChatroomId;
export const selectUsers = (state: RootState) => state.chatrooms.users;
export const selectChatrooms = (state: RootState) => state.chatrooms.chatrooms;

