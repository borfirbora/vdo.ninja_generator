import { configureStore } from "@reduxjs/toolkit";
import linkSlicer from './linkReducer'

const store = configureStore({
reducer: {
links: linkSlicer,
},
});

export default store;