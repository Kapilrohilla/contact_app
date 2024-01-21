import {createSlice} from '@reduxjs/toolkit';
import type {Contact, PhoneNumber} from 'react-native-contacts';

export type fixContactPayload = {
  recordID: string;
  updatedContact: {
    name: string;
    phone: PhoneNumber;
  };
};
type FixContactActionType = {
  type: string;
  payload: fixContactPayload;
};

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
    removeContact(state, action) {
      const recordId = action.payload;
      const removeContact4ById = state.filter((contact: Contact) => {
        return contact.recordID !== recordId;
      });
      return removeContact4ById;
    },
    // @ts-expect-error
    fixContact(state, action: FixContactActionType) {
      const recordid = action.payload.recordID;
      const name = action.payload.updatedContact.name;
      const phone: PhoneNumber = action.payload.updatedContact.phone;

      const updatedState = state.map((contact: Contact) => {
        if (contact.recordID === recordid) {
          let selectedContact = contact;
          selectedContact.givenName = name;

          const updatedPhone = selectedContact.phoneNumbers.map(phoneObj => {
            if ((phoneObj.label = phone.label)) {
              phoneObj.number = phone.number;
              return phoneObj;
            } else {
              phoneObj;
            }
          });
          // return updatedPhone;
          // @ts-ignore
          contact.phoneNumbers = updatedPhone;
          return contact;
        } else {
          return contact;
        }
      });
      return updatedState;
    },
  },
});

export default contactSlice;
export const {populateContact, getContact, insertContact, removeContact} = contactSlice.actions;
