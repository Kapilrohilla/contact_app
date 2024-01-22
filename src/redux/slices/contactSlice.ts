import {createSlice} from '@reduxjs/toolkit';
import {updateContact, type Contact, type PhoneNumber} from 'react-native-contacts';

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

    fixContact(state, action: FixContactActionType) {
      const recordid = action.payload.recordID;
      const name = action.payload.updatedContact.name;
      const phone: PhoneNumber = action.payload.updatedContact.phone;

      state.forEach((contact: Contact) => {
        if (contact.recordID === recordid) {
          let selectedContact = contact;
          selectedContact.givenName = name;
          selectedContact.displayName = name;

          const updatedPhone = selectedContact.phoneNumbers.map(phoneObj => {
            if ((phoneObj.label = phone.label)) {
              phoneObj.number = phone.number;
              return phoneObj;
            } else {
              return phoneObj;
            }
          });
          // return updatedPhone;
          // @ts-ignore
          selectedContact.phoneNumbers = updatedPhone;
          // console.log(JSON.stringify(selectedContact), '<<-- selected');
          // return selectedContact;
        } else {
        }
      });
      return state;
    },
  },
});

export default contactSlice;
export const {populateContact, getContact, insertContact, removeContact, fixContact} = contactSlice.actions;
