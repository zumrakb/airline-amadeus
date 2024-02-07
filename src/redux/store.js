import { configureStore } from "@reduxjs/toolkit";
import flightOfferReducer from "./flightSlice";

export default configureStore({
  reducer: {
    flightOffer: flightOfferReducer,
  },
});
