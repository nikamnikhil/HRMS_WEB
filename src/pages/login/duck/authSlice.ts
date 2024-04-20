import { createSlice } from '@reduxjs/toolkit';
// import storage from 'redux-persist/lib/storage';

const initialState = {
    userDetails: {},
    userRole: '',
    selectedPath1: '/dashboard',
    fatherId: '1',
    motherId: '0',
    firstName: '',
    fullName: '',
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserDetails(state, action) {
            state.userDetails = JSON.parse(action.payload);
        },
    },
});

export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
