import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    directorLink: {
        meetName: null,
        meetSlug: null,
        meetLink: null
    },
    guestLinks: []
}

const linkReducer = createSlice({
    name: 'link',
    initialState,
    reducers: {
        setLink: (state, action) => {
            state.directorLink.meetName = action.payload.meetName;
            state.directorLink.meetLink = action.payload.meetLink;
            state.directorLink.meetSlug = action.payload.meetSlug;
        },
        resetLink: (state) => {
            state.directorLink.meetLink = '';
            state.directorLink.meetName = '';
            state.directorLink.meetSlug='';
            state.guestLinks = [];
        },
        addGuest: (state, action) => {
state.guestLinks.push(action.payload);
        },
        deleteGuest: (state, action) => {
            state.guestLinks = state.guestLinks.filter((g) => g.guestId !== action.payload)
        },
    }
});

export const { setLink, resetLink, addGuest, deleteGuest } = linkReducer.actions;
export default linkReducer.reducer;