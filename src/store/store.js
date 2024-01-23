import { configureStore } from "@reduxjs/toolkit";
import netflixReducer from "./netflixSlice";

const store = configureStore({
  reducer: { netflix: netflixReducer },
});

export default store;
