//Production  
// export const BASE_URL = "/api";

// Development 
export const BASE_URL = location.hostname === "localhost" ? "http://localhost:7777": "/api";
