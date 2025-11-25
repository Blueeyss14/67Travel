import { useNavigate } from "react-router-dom";
import colors from "../../res/colors";
import TicketList from "../../shared/components/TicketList";

const TicketListPage = () => {
  const navigate = useNavigate();
  return (
    <div className="box-border p-3">
      <h1
        style={{ color: colors.primary }}
        className="font-bold text-[2rem] mb-3"
      >
        Tiket Anda
      </h1>
      <div>
        <TicketList
          onClick={() => navigate("/ticket-page")}
          title="Candi"
          rating="3.4"
        />
        <TicketList
          onClick={() => navigate("/ticket-page")}
          title="Candi"
          rating="3.4"
        />
        <TicketList
          onClick={() => navigate("/ticket-page")}
          title="Candi"
          rating="3.4"
        />
        <TicketList
          onClick={() => navigate("/ticket-page")}
          title="Candi"
          rating="3.4"
        />
        <TicketList
          onClick={() => navigate("/ticket-page")}
          title="Candi"
          rating="3.4"
        />
   
      </div>
    </div>
  );
};

export default TicketListPage;
