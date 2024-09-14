import { createSlice, configureStore } from '@reduxjs/toolkit';

const contactsSlice = createSlice({
    name: 'contacts',
    initialState: {
        contacts: [],
        loading: false,
        error: false,
    },
    reducers: {
        fetchContactsLoading: (state) => {
            state.loading = true;
        },
        fetchContactsSuccess: (state, action) => {
            state.contacts = action.payload;
            state.loading = false;
        },
        fetchContactsError: (state) => {
            state.loading = false;
            state.error = true;
        },
        deleteContact: (state, action) => {
            state.contacts = state.contacts.filter(contact => contact.phone !== action.payload);
        },
        editContact: (state, action) => {
            const { phone, updatedContact } = action.payload;
            const index = state.contacts.findIndex(contact => contact.phone === phone);
            if (index !== -1) {
                state.contacts[index] = { ...state.contacts[index], ...updatedContact };
            }
        },
    },
});

export const {
    fetchContactsLoading,
    fetchContactsSuccess,
    fetchContactsError,
    deleteContact,
    editContact
} = contactsSlice.actions;

const Store = configureStore({
    reducer: contactsSlice.reducer,
});

export default Store;
