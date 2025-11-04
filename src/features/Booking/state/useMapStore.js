import { create } from "zustand";

const useMapStore = create((set) => ({
  origin: null,
  destination: null,
  originText: "",
  destinationText: "",
  isPickingOrigin: true,

  async fetchLocationName(lat, lng) {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await res.json();
      const address = data.address || {};

      const road = address.road || address.neighbourhood || "";
      const city = address.city || address.town || address.village || "";
      const state = address.state || "";
      const shortName = [road, city || state].filter(Boolean).join(", ");

      return shortName || data.display_name || "Tidak diketahui";
    } catch {
      return "Tidak diketahui";
    }
  },

  async handleMapClick(latlng) {
    const name = await useMapStore.getState().fetchLocationName(latlng.lat, latlng.lng);
    const { isPickingOrigin, setOrigin, setDestination } = useMapStore.getState();
    if (isPickingOrigin) setOrigin(latlng, name);
    else setDestination(latlng, name);
  },

  setOrigin: (latlng, text = "") =>
    set({
      origin: latlng,
      originText: text,
      destination: null,
      destinationText: "",
      isPickingOrigin: false,
    }),

  setDestination: (latlng, text = "") =>
    set({
      destination: latlng,
      destinationText: text,
      isPickingOrigin: true,
    }),

  resetMap: () =>
    set({
      origin: null,
      destination: null,
      originText: "",
      destinationText: "",
      isPickingOrigin: true,
    }),
}));

export default useMapStore;
