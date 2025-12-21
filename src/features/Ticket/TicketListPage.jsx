import { useNavigate } from "react-router-dom";
import colors from "../../res/colors";
import useTickets from "./hook/useTicket";

const TicketListPage = () => {
  const navigate = useNavigate();
  const { tickets, loading } = useTickets();

  if (loading) {
    return (
      <div className="min-h-screen  from-gray-50 to-white p-4">
        <h1
          style={{ color: colors.primary }}
          className="font-bold text-[2rem] mb-6"
        >
          Tiket Anda
        </h1>
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-12 w-12 rounded-full border-4 border-gray-200 border-t-blue-500 animate-spin"></div>
            <p className="mt-4 text-gray-500">Memuat tiket...</p>
          </div>
        </div>
      </div>
    );
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const getRemainingDays = (expiredAt) => {
    const now = new Date();
    const expired = new Date(expiredAt);
    const diffTime = expired - now;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getStatusColor = (expiredAt) => {
    const days = getRemainingDays(expiredAt);
    if (days === 0) return "bg-red-100 text-red-700";
    return "bg-green-100/80 text-green-700";
  };

  return (
    <div className="min-h-screen  from-gray-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1
            style={{ color: colors.primary }}
            className="font-bold text-[2rem] mb-2"
          >
            Tiket Anda
          </h1>
          <p className="text-gray-600">{tickets.length} tiket tersedia</p>
        </div>

        <div className="space-y-4">
          {tickets.length > 0 ? (
            tickets.map((ticket) => {
              const remainingDays = getRemainingDays(ticket.expired_at);
              const statusColor = getStatusColor(ticket.expired_at);
              const isActive = remainingDays > 0;

              return (
                <div
                  key={ticket.ticket_code}
                  onClick={() => {
                    if (isActive) {
                      navigate("/ticket-page", {
                        state: { ticket },
                      });
                    }
                  }}
                  className={`group  ${
                    isActive
                      ? "bg-white cursor-pointer"
                      : "bg-gray-100 cursor-not-allowed"
                  } rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-1 border border-gray-100`}
                >
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-mono text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-700">
                            {ticket.ticket_code}
                          </span>
                          <span
                            className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColor}`}
                          >
                            {isActive ? "Aktif" : "Kadaluarsa"}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-900/80 transition-colors">
                          {ticket.destination_name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">
                          {ticket.location}
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">
                          {formatCurrency(ticket.total_price)}
                        </div>
                        <div className="text-sm text-gray-500 mt-1">
                          {ticket.guest_count} orang
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-100 my-4"></div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Kendaraan</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-blue-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                              <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H10a1 1 0 001-1v-1h4v1a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0H20a1 1 0 001-1V5a1 1 0 00-1-1H3zm11 3a1 1 0 01-1-1 1 1 0 00-1-1H8a1 1 0 00-1 1 1 1 0 01-2 0 3 3 0 013-3h4a3 3 0 013 3 1 1 0 01-1 1z" />
                            </svg>
                          </div>
                          <p className="font-medium text-gray-900">
                            {ticket.vehicle_name}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Akomodasi</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-green-600"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                            </svg>
                          </div>
                          <p className="font-medium text-gray-900">
                            {ticket.accommodation_name}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Tanggal</p>
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-purple-600/80"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                fillRule="evenodd"
                                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                          <p className="font-medium text-gray-900">
                            {formatDate(ticket.expired_at)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-1">Status</p>
                        <div className="flex items-center gap-2">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              isActive ? "bg-green-500" : "bg-red-500/80"
                            }`}
                          ></div>
                          <p className="font-medium text-gray-900">
                            {isActive ? "Aktif" : "Kadaluarsa"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end mt-6">
                      <button
                        style={{ backgroundColor: colors.primary }}
                        className="px-6 py-2  text-white rounded-lg font-semibold transition-colors group-hover:shadow-md"
                      >
                        Lihat Detail
                        <svg
                          className="w-4 h-4 inline-block ml-2 -mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14 5l7 7m0 0l-7 7m7-7H3"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 text-gray-300">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path
                    fillRule="evenodd"
                    d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Belum ada tiket
              </h3>
              <p className="text-gray-500 mb-6 max-w-md mx-auto">
                Tiket yang Anda beli akan muncul di sini
              </p>
              <button
              style={{backgroundColor: colors.primary}}
                onClick={() => navigate("/destination-page")}
                className="px-6 py-3 text-white rounded-lg font-semiboldtransition-colors shadow-sm cursor-pointer"
              >
                Cari Tiket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TicketListPage;
