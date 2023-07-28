import "./App.css";
import { useEffect, useState } from "react";
import { fetchAllTickets } from "./service/ticketService";
import { TicketForm } from "./components/TicketForm/TicketForm";
import { formatDate } from "./util/formatDate";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

function App() {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});

  const [sortBy, setSortBy] = useState("all"); // default sorting option
  const [filterByStatus, setFilterByStatus] = useState("all"); // default filtering option


  const fetchTickets = async () => {
    const allTickets = await fetchAllTickets();
    // Sort tickets based on sortBy option
    let sortedTickets = allTickets;
    if (sortBy === "status") {
      sortedTickets = allTickets.sort((a, b) =>
        a.status.localeCompare(b.status)
      );
    } else if (sortBy === "latest_update") {
      sortedTickets = allTickets.sort(
        (a, b) => new Date(b.updated_date) - new Date(a.updated_date)
      );
    }

    // Filter tickets based on filterByStatus option
    let filteredTickets = sortedTickets;
    if (filterByStatus !== "all") {
      filteredTickets = sortedTickets.filter(
        (ticket) => ticket.status === filterByStatus
      );
    }

    setTickets(filteredTickets);
  };

  useEffect(() => {
    // Fetch all tickets and apply sorting and filtering
    fetchTickets();
  }, [sortBy, filterByStatus]);


  return (
    <div className="App">
      <h1>Helpdesk support ticket management</h1>
      <TicketForm
        currentTicket={currentTicket}
        setSortBy={setSortBy}
        setFilterByStatus={setFilterByStatus}
        sortBy={sortBy}
        filterByStatus={filterByStatus}
        fetchTickets={fetchTickets}
      />
      <h2>Tickets</h2>
      <div className="TicketList">
        {tickets.map((ticket, index) => (
          <div
            onClick={() => setCurrentTicket(ticket)}
            key={index}
            className="ticket"
          >
            <Card sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h6" component="div">
                  {ticket.id} {ticket.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {ticket.description}
                </Typography>
                <Typography variant="body2">{ticket.contact_info}</Typography>
                <Typography variant="body2">{ticket.status}</Typography>
                <Typography variant="body2">
                  {formatDate(ticket.created_date)}
                </Typography>
                <Typography variant="body2">
                  {formatDate(ticket.updated_date)}
                </Typography>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
