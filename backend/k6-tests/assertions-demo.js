import http from "k6/http";
import { check, sleep } from "k6";

// Environment Variables
const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:5000";
const API_PATH = __ENV.API_PATH || "/api";
const USERS_PATH = __ENV.USERS_PATH || "/users";

const EMAIL = __ENV.EMAIL || "kehara@gmail.com";
const PASSWORD = __ENV.PASSWORD || "123456";

// API Endpoints
const LOGIN_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/signin`;
const ME_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/me`;

// k6 Test Configuration
export const options = {
  vus: 5,
  duration: "10s",

  thresholds: {
    http_req_duration: ["p(95)<2000"], // 95% of requests must complete below 2s
    http_req_failed: ["rate<0.01"],    // error rate must be below 1%
  },
};

// Helper function for JSON headers
function jsonHeaders(extra = {}) {
  return {
    "Content-Type": "application/json",
    ...extra,
  };
}

export default function () {

  // Login Request Payload
  const loginPayload = JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
  });

  // Send Login Request
  const loginRes = http.post(LOGIN_URL, loginPayload, {
    headers: jsonHeaders(),
  });

  // Assertions for Login API
  check(loginRes, {
    "login status is 200": (r) => r.status === 200,

    "login response is JSON": (r) =>
      r.headers["Content-Type"] &&
      r.headers["Content-Type"].includes("application/json"),

    "login returns token": (r) => !!r.json("token"),

    "token length > 10": (r) => {
      const token = r.json("token");
      return token && token.length > 10;
    },

    "login response time < 2000ms": (r) => r.timings.duration < 2000,
  });

  // Extract Token
  const token = loginRes.json("token");

  // Call Protected Endpoint
  const meRes = http.get(ME_URL, {
    headers: jsonHeaders({
      Authorization: `Bearer ${token}`,
    }),
  });

  // Assertions for Protected API
  check(meRes, {
    "me status is 200": (r) => r.status === 200,

    "me response is JSON": (r) =>
      r.headers["Content-Type"] &&
      r.headers["Content-Type"].includes("application/json"),

    "me returns user object": (r) => r.status === 200 && !!r.json(),

    "me response time < 2000ms": (r) => r.timings.duration < 2000,
  });

  // Simulate user delay
  sleep(1);
}