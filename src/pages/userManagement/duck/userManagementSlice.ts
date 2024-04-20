import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userId: '',
};

const userManagementSlice = createSlice({
    name: 'userManagementSlice',
    initialState,
    reducers: {
        setUserId(state, action) {
            state.userId = action.payload;
        },
    },
});

export const { setUserId } = userManagementSlice.actions;
export default userManagementSlice.reducer;
