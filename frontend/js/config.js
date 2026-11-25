const LOCAL = ["localhost", "127.0.0.1"].includes(location.hostname);

export const API_URL = LOCAL
  ? "http://localhost:3000"
  : "https://p1-pedro-api.onrender.com";
