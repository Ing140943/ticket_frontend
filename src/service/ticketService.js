import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL 

export const fetchAllTickets = async () => {
    const response =  await  axios.get(`${BASE_URL}/api/ticket`);
    return response.data
}

export const fetchTicket = async (id) => {
    const response = await axios.get(`${BASE_URL}/api/ticket/${id}`)
    return response.data
}

export const createTicket = async (titleInput, descriptionInput, statusInput, contactInput) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/ticket`, {
            title: titleInput,
            description: descriptionInput,
            status: statusInput,
            contact_info: contactInput
        });
        console.log("Create Successful!");
        return response;
    } catch (error) {
        console.log("Error:", error);
    }
}


export const updateTicket = async (tid, titleInput, descriptionInput, statusInput, contactInput) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/ticket/${tid}`, {
            title: titleInput,
            description: descriptionInput,
            status: statusInput,
            contact_info: contactInput
        })
        return response
    } catch (error) {
        console.log("Error:", error);
    }
    
}