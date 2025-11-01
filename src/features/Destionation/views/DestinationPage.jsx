import useDestinationStore from "../state/destionationStore";

const DestinationPage = () => {
  const { checkInDate, checkOutDate, searchResults } = useDestinationStore();

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-4">Destination Page</h1>
      <p>Check In: {checkInDate ? checkInDate.toDateString() : "Belum ada"}</p>
      <p>Check Out: {checkOutDate ? checkOutDate.toDateString() : "Belum ada"}</p>

      <div className="mt-6 grid grid-cols-2 gap-5">
        {searchResults.length > 0 ? (
          searchResults.map((item, i) => (
            <div
              key={i}
              className="bg-white/10 p-4 rounded-xl border border-white/20 "
            >
              <img
                src={item.bg}
                alt={item.label}
                className="rounded-lg mb-3 w-full h-40 object-cover"
              />
              <h2 className="font-bold">{item.label}</h2>
              <p className="text-sm opacity-80">{item.owner}</p>
              <p className="text-sm mt-1">{item.location}</p>
              <p className="text-xs mt-2">{item.description}</p>
            </div>
          ))
        ) : (
          <p>Tidak ada hasil ditemukan.</p>
        )}
      </div>
    </div>
  );
};

export default DestinationPage;
