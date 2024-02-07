import { createSlice } from "@reduxjs/toolkit";
import {
  formatISODuration,
  formatDate,
  parseDurationToMinutes,
  timeToMinutes,
} from "../helper";
const initialState = {
  flightOffers: [],
  loading: false,
  isDataSearched: false,
};
export const flightOfferSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setOfferFlight: (state, action) => {
      const newFlightOffer = action.payload.map((item) => {
        const newitineraries = item.itineraries.map((it) => {
          it.numberOfStops = it.segments.length - 1; //adding the number of stops to the data.
          it.formattedDuration = formatISODuration(it.duration); // adding duration to the data. formatISODuration is an helper function from helper.js file.
          const firstSegment = it.segments[0]; //this data indicated the departure point
          const lastSegment = it.segments[it.segments.length - 1]; //this data indicated the arrival point after all the stops.

          it.mainDepartureAirportCode = firstSegment.departure.iataCode;
          it.mainDepartureTime = formatDate(firstSegment.departure.at).time;
          it.mainDepartureDate = formatDate(firstSegment.departure.at).date;

          it.mainArrivalAirportCode = lastSegment.arrival.iataCode;
          it.mainArrivalTime = formatDate(lastSegment.arrival.at).time;
          it.mainArrivalDate = formatDate(lastSegment.arrival.at).date;
          return it;
        });
        item.itineraries = newitineraries; //itineraries is anymore with the data which i've added above.
        return item;
      });

      state.isDataSearched = true;
      state.flightOffers = newFlightOffer; //adding flight offers with details like date, time, iatacode.. to the array flightOffers in initial state.
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    //sorting the data according to the selected sort (price,duration,arrival or departure time):
    sortOfferFlight: (state, action) => {
      switch (action.payload) {
        case "Price":
          state.flightOffers.sort((a, b) => a.price.total - b.price.total);
          break;
        case "Duration":
          state.flightOffers.sort(
            (a, b) =>
              parseDurationToMinutes(a.itineraries[0].duration) -
              parseDurationToMinutes(b.itineraries[0].duration)
          );
          break;
        case "Departure Time":
          state.flightOffers.sort(
            (a, b) =>
              timeToMinutes(a.itineraries[0].mainDepartureTime) -
              timeToMinutes(b.itineraries[0].mainDepartureTime)
          );
          break;
        case "Arrival Time":
          state.flightOffers.sort(
            (a, b) =>
              timeToMinutes(a.itineraries[0].mainArrivalTime) -
              timeToMinutes(b.itineraries[0].mainArrivalTime)
          );
          break;
        default:
          break;
      }
    },
  },
});

export const { setOfferFlight, setLoading, sortOfferFlight } =
  flightOfferSlice.actions;

export default flightOfferSlice.reducer;
