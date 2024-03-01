import { configureStore } from "@reduxjs/toolkit";
import product from "../feature/userDetailSlice";



export const store = configureStore({
    reducer: {
        app: product
    }
})