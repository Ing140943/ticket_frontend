import "./App.css";
import { useEffect, useState } from "react";
import { fetchAllTickets } from "./service/ticketService";
import { TicketForm } from "./components/TicketForm/TicketForm";
import { formatDate } from "./util/formatDate";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function App() {
  const [tickets, setTickets] = useState([]);
  const [currentTicket, setCurrentTicket] = useState({});

  const [sortBy, setSortBy] = useState("all"); // default sorting option
  const [filterByStatus, setFilterByStatus] = useState("all"); // default filtering option

  // console.log(currentTicket);
  useEffect(() => {
    // Fetch all tickets and apply sorting and filtering
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

    fetchTickets();
  }, [sortBy, filterByStatus]);

  // console.log(currentTicket);

  return (
    <div className="App">
      <h1>Helpdesk support ticket management</h1>
      <TicketForm
        currentTicket={currentTicket}
        setSortBy={setSortBy}
        setFilterByStatus={setFilterByStatus}
        sortBy={sortBy}
        filterByStatus={filterByStatus}
      />
      <h2>Tickets</h2>
      {tickets.map((ticket, index) => (
        <div onClick={() => setCurrentTicket(ticket)}  style={{ border: "1px solid black", borderTop: "0px", borderLeft: "0px", borderRight: "0px" }} key={index}> 
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              <Typography variant="h6" component="div">
                {ticket.id} {ticket.title}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {ticket.description}
              </Typography>
              <Typography variant="body2">
                {ticket.contact_info}
              </Typography>
              <Typography variant="body2">
                {ticket.status}
              </Typography>
              <Typography variant="body2">
                {formatDate(ticket.created_date)}
              </Typography>
              <Typography variant="body2">
                {formatDate(ticket.updated_date)}
              </Typography>
            </CardContent>
      
          </Card>
          {/* <div
            key={index}
            onClick={() => setCurrentTicket(ticket)}
            style={{ border: "1px solid black" }}
          >
            <p>{ticket.id}</p>
            <p>{ticket.title}</p>
            <p>{ticket.description}</p>
            <p>{ticket.contact_info}</p>
            <p>{ticket.status}</p>
            <p>{ticket.created_date}</p>
            <p>{formatDate(ticket.updated_date)}</p>
          </div> */}
        </div>
      ))}
    </div>
  );
}

export default App;
