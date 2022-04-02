import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { User } from '../types/Interface';

// Interfaces
export interface ActionChangeChatroomId {
  key: number,
  value: string | string[],
}

export interface FormState {
  users: User[];
  activeChatroomId: string | null;
}

// Initial state
export const initialState: FormState = {
  users: [],
  activeChatroomId: null,
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
  },
});

// Actions
export const { changeSelectecChatroomId } = chatroomSlice.actions;

// Selectors
export const selectactiveChatroomId = (state: RootState) => state.chatrooms.activeChatroomId;
