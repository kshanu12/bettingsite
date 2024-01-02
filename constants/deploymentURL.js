let DEPLOYED_URL;

if (typeof window !== "undefined") {
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    DEPLOYED_URL = "http://localhost:3030";
  } else {
    DEPLOYED_URL = "https://royal-gaming.onrender.com";
  }
} else {
  DEPLOYED_URL = "https://royal-gaming.onrender.com";
}

export default DEPLOYED_URL;
