import { create } from "zustand";

export const useBookingStore = create((set) => ({
  currentDay: 1,
  days: {
    1: { selectedCar: { id: null, name: "Pilih Kendaraan" } },
  },

  nextDay: () =>
    set((store) => {
      const current = store.days[store.currentDay];

      if (!current.selectedCar || !current.selectedCar.id) {
        alert(`Selesaikan Day ${store.currentDay} dulu`);
        return store;
      }

      const next = store.currentDay + 1;
      if (!store.days[next]) {
        return {
          ...store,
          currentDay: next,
          days: {
            ...store.days,
            [next]: { selectedCar: { id: null, name: "Pilih Kendaraan" } },
          },
        };
      }
      return { ...store, currentDay: next };
    }),

  prevDay: () =>
    set((store) => ({
      currentDay: store.currentDay > 1 ? store.currentDay - 1 : 1,
    })),

  goToDay: (day) =>
    set({ currentDay: day }),

  setSelectedCar: (day, car) =>
    set((store) => ({
      days: { ...store.days, [day]: { ...store.days[day], selectedCar: car } },
    })),

  deleteDay: (day) =>
    set((store) => {
      if (day === 1) return store;
      const newDays = { ...store.days };
      delete newDays[day];

      const newCurrentDay = store.currentDay === day ? day - 1 : store.currentDay;
      return { ...store, days: newDays, currentDay: newCurrentDay };
    }),
}));
