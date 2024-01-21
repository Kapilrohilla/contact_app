import {createSlice} from '@reduxjs/toolkit';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: [],
  reducers: {
    populateContact(_state, action) {
      return action.payload;
    },
    getContact(state, _action) {
      return state;
    },
    insertContact(state, action) {
      const newState = state.concat(action.payload);
      return newState;
    },
  },
});

export default contactSlice;
export const {populateContact, getContact, insertContact} = contactSlice.actions;
