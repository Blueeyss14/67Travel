import { create } from "zustand";
import toast, { Toaster } from "react-hot-toast";

export const useBookingStore = create((set) => ({
  currentDay: 1,
  days: {
    1: {
      selectedCar: { id: null, name: "Pilih Kendaraan" },
      selectedLocation: { id: null, name: "Pilih Lokasi" },
      selectedDestination: {
        from: { id: null, name: "Pilih Wisata Asal" },
        to: { id: null, name: "Pilih Wisata Tujuan" },
      },
    },
  },

  nextDay: () =>
    set((store) => {
      const current = store.days[store.currentDay];
      const { selectedCar, selectedLocation, selectedDestination } = current;

      if (
        !selectedCar?.id ||
        !selectedLocation?.id ||
        !selectedDestination?.from?.id ||
        !selectedDestination?.to?.id
      ) {
        toast.error(`Selesaikan Day ${store.currentDay} dulu`, {
          position: "top-center",
          style: {
            borderRadius: "12px",
            background: "#333",
            color: "#fff",
            padding: "12px 16px",
            fontSize: "14px",
          },
        });
        return store;
      }

      const next = store.currentDay + 1;
      if (!store.days[next]) {
        return {
          ...store,
          currentDay: next,
          days: {
            ...store.days,
            [next]: {
              selectedCar: { id: null, name: "Pilih Kendaraan" },
              selectedLocation: { ...selectedLocation },
              selectedDestination: {
                from: { id: null, name: "Pilih Wisata Asal" },
                to: { id: null, name: "Pilih Wisata Tujuan" },
              },
            },
          },
        };
      }

      return { ...store, currentDay: next };
    }),

  prevDay: () =>
    set((store) => ({
      currentDay: store.currentDay > 1 ? store.currentDay - 1 : 1,
    })),

  setSelectedCar: (day, car) =>
    set((store) => ({
      days: {
        ...store.days,
        [day]: { ...store.days[day], selectedCar: car },
      },
    })),

  setSelectedLocation: (day, location) =>
    set((store) => ({
      days: {
        ...store.days,
        [day]: { ...store.days[day], selectedLocation: location },
      },
    })),

  setSelectedDestination: (day, destination) =>
    set((store) => ({
      days: {
        ...store.days,
        [day]: { ...store.days[day], selectedDestination: destination },
      },
    })),

  deleteDay: (day) =>
    set((store) => {
      if (day === 1) return store;

      const newDays = { ...store.days };
      delete newDays[day];

      const dayKeys = Object.keys(newDays)
        .map(Number)
        .sort((a, b) => a - b);

      const reIndexedDays = {};
      dayKeys.forEach((key, idx) => {
        reIndexedDays[idx + 1] = newDays[key];
      });

      let newCurrentDay = store.currentDay;
      if (store.currentDay === day) newCurrentDay = day - 1;
      else if (store.currentDay > day) newCurrentDay = store.currentDay - 1;

      return { ...store, days: reIndexedDays, currentDay: newCurrentDay };
    }),
  resetBooking: () =>
    set({
      currentDay: 1,
      days: {
        1: {
          selectedCar: { id: null, name: "Pilih Kendaraan" },
          selectedLocation: { id: null, name: "Pilih Lokasi" },
          selectedDestination: {
            from: { id: null, name: "Pilih Wisata Asal" },
            to: { id: null, name: "Pilih Wisata Tujuan" },
          },
        },
      },
    }),
}));
