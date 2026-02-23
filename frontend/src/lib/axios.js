// import axios from "axios";


// const BASE_URL = import.meta.env ==="development" ? "http://localhost:5001/api" : "/api";
// const api = axios.create({
//     baseURL : BASE_URL,

// });

// export default api

import axios from "axios";

const BASE_URL = import.meta.env.MODE === "development" 
  ? "http://localhost:5001/api" 
  : "https://note-taking-app-5hse.onrender.com/api";

const api = axios.create({
    baseURL: BASE_URL,
});

export default api;