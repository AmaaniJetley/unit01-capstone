// src/utils/api.ts
import axios from "axios";
import tokenService from "./tokenService";

// This function will be used to make authenticated requests
async function getProtectedData() {
    // Get the token from localStorage
    const token = tokenService.getToken();

    try {
        // Make a request to a protected route, including the token in the Authorization header
        const res = await axios.get("/api/protected-route", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    } catch (err) {
        console.error(err);
        throw new Error("Failed to fetch protected data");
    }
}

export default {
    getProtectedData,
};