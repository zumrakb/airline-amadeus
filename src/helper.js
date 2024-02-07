import axios from "axios";

export async function getOAuthToken() {
  const url = "https://test.api.amadeus.com/v1/security/oauth2/token";
  const data = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: "jb8W5HxO4WKXl9sjp8AoldCG3DBESRGl",
    client_secret: "oKGMUlv5CfGqJh5K",
  });

  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  try {
    const resp = await axios.post(url, data, config);
    return resp.data.access_token;
  } catch (error) {
    console.error("Error fetching the OAuth token:", error);
  }
}

export function formatISODuration(duration) {
  const regex = /PT(\d+H)?(\d+M)?/;
  const matches = duration.match(regex);

  let hours = 0;
  let minutes = 0;

  if (matches[1]) {
    hours = parseInt(matches[1].slice(0, -1), 10);
  }

  if (matches[2]) {
    minutes = parseInt(matches[2].slice(0, -1), 10);
  }

  const formattedDuration = `${hours}h ${minutes}m`;

  return formattedDuration;
}

export function formatDate(date) {
  const d = new Date(date);
  return {
    time: `${d.getHours()}:${d.getMinutes() === 0 ? "00" : d.getMinutes()}`,
    date: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
  };
}

export function parseDurationToMinutes(duration) {
  const regex = /PT(\d+H)?(\d+M)?/;
  const matches = duration.match(regex);

  let hours = 0;
  let minutes = 0;

  if (matches[1]) {
    hours = parseInt(matches[1].slice(0, -1), 10);
  }

  if (matches[2]) {
    minutes = parseInt(matches[2].slice(0, -1), 10);
  }

  return hours * 60 + minutes;
}

export function timeToMinutes(time) {
  const [hours, minutes] = time.split(":").map(Number); // Split the time into hours and minutes and convert to numbers
  return hours * 60 + minutes; // Convert hours to minutes and add to minutes
}
