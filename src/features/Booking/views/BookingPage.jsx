import useDestinationStore from "../../Destionation/state/destionationStore";
import PickMap from "../components/PickMap";
import useGeolocation from "../../Destionation/hook/useGeolocation";
import useMapStore from "../state/useMapStore";

const BookingPage = () => {
  const { selectedDestination } = useDestinationStore();
  const { originText, destinationText } = useMapStore();
  const { userLocation } = useGeolocation();

  return (
    // <div className="p-10 text-3xl font-bold">
    //   {selectedDestination || "Belum memilih destinasi"}
    // </div>
    <div className="flex flex-col w-full h-screen">
      <div className="flex-1 box-border p-5 overflow-y-auto">
        <div className="bg-amber-400 w-[65%] h-[65vh] overflow-hidden rounded-2xl">
          <PickMap userLocation={userLocation} />
        </div>
        <p>Awal: {originText}</p>
        <p>Tujuan: {destinationText}</p>
      </div>
      <div className="bg-amber-300 w-full h-20"></div>
    </div>
  );
};

export default BookingPage;
