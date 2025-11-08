import { create } from "zustand";
import { carouselImageData } from "../../home/data/carouselImageData";

const useDestinationStore = create((set, get) => ({
  // checkInDate: null,
  // setCheckInDate: (date) => set({ checkInDate: date }),

  // checkOutDate: null,
  // setCheckOutDate: (date) => set({ checkOutDate: date }),

  searchQuery: "",
  setSearchQuery: (query) => set({ searchQuery: query }),

  searchResults: [],
  searchDestinations: () => {
    const { searchQuery, checkInDate, checkOutDate } = get();
    const q = searchQuery?.toLowerCase().trim();

    if (!q && !checkInDate && !checkOutDate) {
      set({ searchResults: [] });
      return;
    }

    const filtered = carouselImageData.filter((item) => {
      let matchLocation = false;
      // let matchCheckIn = false;
      // let matchCheckOut = false;

      if (q) {
        matchLocation =
          item.location.toLowerCase().includes(q) ||
          item.label.toLowerCase().includes(q) ||
          item.owner.toLowerCase().includes(q);
      }

      // if (checkInDate) {
      //   const itemCheckIn = new Date(
      //     item.checkIn.split("/").reverse().join("-")
      //   ).getTime();
      //   const selectedCheckIn = new Date(checkInDate).getTime();
      //   matchCheckIn = itemCheckIn >= selectedCheckIn;
      // }

      // if (checkOutDate) {
      //   const itemCheckOut = new Date(
      //     item.checkOut.split("/").reverse().join("-")
      //   ).getTime();
      //   const selectedCheckOut = new Date(checkOutDate).getTime();
      //   matchCheckOut = itemCheckOut <= selectedCheckOut;
      // }

      return matchLocation;
      // return matchLocation || matchCheckIn || matchCheckOut;
    });

    set({ searchResults: filtered });
  },

  selectedDestination: null,
  setSelectedDestination: (destination) => set({ selectedDestination: destination }),
}));

export default useDestinationStore;
