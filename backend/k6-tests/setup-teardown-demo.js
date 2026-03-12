import http from "k6/http";
import { check, sleep, fail } from "k6";

const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:5000";
const API_PATH = __ENV.API_PATH || "/api";
const USERS_PATH = __ENV.USERS_PATH || "/users";

const EMAIL = __ENV.EMAIL || "kehara@gmail.com";
const PASSWORD = __ENV.PASSWORD || "123456";

const LOGIN_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/signin`;
const ME_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/me`;

export const options = {
  vus: 2,
  duration: "10s",
};

function jsonHeaders(extra = {}) {
  return { "Content-Type": "application/json", ...extra };
}

export function setup() {
  console.log("🚀 Setup started: preparing shared test data before execution");

  const loginPayload = JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
  });

  const loginRes = http.post(LOGIN_URL, loginPayload, {
    headers: jsonHeaders(),
  });

  const setupPassed = check(loginRes, {
    "setup login status is 200": (r) => r.status === 200,
    "setup response is JSON": (r) =>
      (r.headers["Content-Type"] || "").includes("application/json"),
    "setup login returns token": (r) => !!r.json("token"),
  });

  if (!setupPassed) {
    console.log("❌ Setup failed. Response body:", loginRes.body);
    fail("Setup failed: unable to log in and prepare token.");
  }

  const token = loginRes.json("token");

  console.log("✅ Setup completed: token prepared successfully");

  return {
    token,
    email: EMAIL,
    setupTime: new Date().toISOString(),
  };
}

export default function (data) {
  const meRes = http.get(ME_URL, {
    headers: jsonHeaders({
      Authorization: `Bearer ${data.token}`,
    }),
  });

  check(meRes, {
    "me status is 200": (r) => r.status === 200,
    "response is JSON": (r) =>
      (r.headers["Content-Type"] || "").includes("application/json"),
    "response time < 2000ms": (r) => r.timings.duration < 2000,
  });

  sleep(1);
}


export function teardown() {
  console.log("🧹 Teardown: removing generated test users");

  const deleteUrl = `${BASE_URL}${API_PATH}${USERS_PATH}/test/cleanup`;

  const res = http.del(deleteUrl);

  check(res, {
    "cleanup status is 200": (r) => r.status === 200,
  });

  if (res.status !== 200) {
    console.log("❌ Cleanup failed:", res.status, res.body);
  }

  console.log("✅ Database returned to stable state");
}