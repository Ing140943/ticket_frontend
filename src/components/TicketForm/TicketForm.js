import React, { useState, useEffect } from "react";
import { createTicket, updateTicket } from "../../service/ticketService";

export const TicketForm = ({
  currentTicket,
  setSortBy,
  setFilterByStatus,
  sortBy,
  filterByStatus,
}) => {
  const [titleInput, setTitle] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [statusInput, setStatus] = useState("Pending");
  const [contactInput, setContact] = useState("");
  //   console.log("From ticket form", currentTicket);

//   console.log(titleInput, descriptionInput, contactInput, statusInput);
//   if (Object.keys(currentTicket).length === 0) {
//     console.log("Blank");
//   } else {
//     console.log(createTicket);
//     console.log("Ticket is selected");
//   }

  useEffect(() => {
    // Set the state with the data of the current ticket when the component mounts
    if (currentTicket) {
      setTitle(currentTicket.title || "");
      setDescription(currentTicket.description || "");
      setStatus(currentTicket.status || "Pending");
      setContact(currentTicket.contact_info || "");
    }
  }, [currentTicket]);

  const handleFilterChange = (e) => {
    setFilterByStatus(e.target.value);
  };

  const handleClick = async () => {
    try {
      if (Object.keys(currentTicket).length === 0) {
        console.log("New Postttt");
        await createTicket(
          titleInput,
          descriptionInput,
          statusInput,
          contactInput
        );
      }
      if (currentTicket) {
        await updateTicket(
          currentTicket.id,
          titleInput,
          descriptionInput,
          statusInput,
          contactInput
        );
      }
      setTitle("");
      setDescription("");
      setContact("");
      setStatus("Pending");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="TicketForm">
      <div className="form">
        <label>Sort By:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="latest_update">Latest Update</option>
          <option value="status">Status</option>
          <option value="all">All</option>
        </select>
        <label>Filter By Status:</label>
        <select value={filterByStatus} onChange={handleFilterChange}>
          <option value="all">All</option>
          <option value="Pending">Pending</option>
          <option value="Accepted">Accepted</option>
          <option value="Resolved">Resolved</option>
          <option value="Rejected">Rejected</option>
        </select>

        <label>Title</label>
        <input
          type="text"
          name="title"
          value={titleInput}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Description</label>
        <input
          type="text"
          name="description"
          value={descriptionInput}
          onChange={(e) => setDescription(e.target.value)}
        />

        <label>Contact</label>
        <input
          type="text"
          name="contact_info"
          value={contactInput}
          onChange={(e) => setContact(e.target.value)}
        />

        <label>Status</label>
        <select
          name="status"
          value={statusInput}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option>Pending</option>
          <option>Accepted</option>
          <option>Resolved</option>
          <option>Rejected</option>
        </select>

        <button onClick={() => handleClick()}>Submit</button>
      </div>
    </div>
  );
};
