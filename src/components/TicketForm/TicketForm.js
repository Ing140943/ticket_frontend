import React, { useState, useEffect } from "react";
import { createTicket, updateTicket } from "../../service/ticketService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import "./TicketForm.css"

export const TicketForm = ({
  currentTicket,
  setSortBy,
  setFilterByStatus,
  sortBy,
  filterByStatus,
  fetchTickets,
}) => {
  const statusOptions = ["Pending", "Accepted", "Resolved", "Rejected"];
  const filterOptions = ["Pending", "Accepted", "Resolved", "Rejected", "all"];
  const sortOptions = ["status", "latest_update", "all"];
  const [titleInput, setTitle] = useState("");
  const [descriptionInput, setDescription] = useState("");
  const [statusInput, setStatus] = useState("Pending");
  const [contactInput, setContact] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      setIsSubmitting(true);
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
      await fetchTickets();
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="TicketForm">
      <div className="form">
        <Box sx={{ display: "flex", gap: "10px" }}>
          <TextField
            label="Title"
            variant="outlined"
            value={titleInput}
            onChange={(e) => setTitle(e.target.value)}
            size="small"
          />
          <TextField
            label="Description"
            variant="outlined"
            value={descriptionInput}
            onChange={(e) => setDescription(e.target.value)}
            size="small"
          />
          <TextField
            label="Contact"
            variant="outlined"
            value={contactInput}
            onChange={(e) => setContact(e.target.value)}
            size="small"
          />
          <FormControl size="small" variant="outlined" sx={{ minWidth: 120 }}>
          <InputLabel htmlFor="sort-by-select">Status</InputLabel>
            <Select
              label="Status"
              value={statusInput}
              onChange={(e) => setStatus(e.target.value)}
              variant="outlined"
            >
              {statusOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl size="small" variant="outlined" sx={{ minWidth: 100 }}>
            <InputLabel htmlFor="sort-by-select">List by status:</InputLabel>
            <Select
              label="Filter By Status:"
              value={filterByStatus}
              onChange={handleFilterChange}
              variant="outlined"
            >
              {filterOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl size="small" variant="outlined" sx={{ minWidth: 95 }}>
            <InputLabel htmlFor="sort-by-select">Sort By:</InputLabel>
            <Select
              label="Sort By:"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              variant="outlined"
            >
              {sortOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleClick()}
          disabled={isSubmitting}
          sx={{ marginTop: "10px" }}
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </div>
    </div>
  );
};
