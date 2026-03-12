// import http from "k6/http";
// import { check, sleep } from "k6";

// const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:5000";
// const API_PATH = __ENV.API_PATH || "/api";
// const USERS_PATH = __ENV.USERS_PATH || "/users";

// const EMAIL = __ENV.EMAIL || "kehara@gmail.com";
// const PASSWORD = __ENV.PASSWORD || "123456";

// const LOGIN_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/signin`;

// export const options = {
//   vus: 1,
//   duration: "5s",
//   thresholds: {
//     http_req_failed: ["rate<0.05"],
//     checks: ["rate>0.95"],
//   },
// };

// function jsonHeaders(extra = {}) {
//   return { "Content-Type": "application/json", ...extra };
// }

// export default function () {
//   const loginPayload = JSON.stringify({
//     email: EMAIL,
//     password: PASSWORD,
//   });

//   const loginRes = http.post(LOGIN_URL, loginPayload, {
//     headers: jsonHeaders(),
//   });

//   check(loginRes, {
//     "login status is 200": (r) => r.status === 200,
//     "login returns token": (r) => !!r.json("token"),
//   });

//   sleep(1);
// }

import http from "k6/http";
import { check, sleep, fail } from "k6";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:5000";
const API_PATH = __ENV.API_PATH || "/api";
const USERS_PATH = __ENV.USERS_PATH || "/users";

const EMAIL = __ENV.EMAIL || "kehara@gmail.com";
const PASSWORD = __ENV.PASSWORD || "123456";

const LOGIN_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/signin`;

export const options = {
  vus: 1,
  duration: "5s",
  thresholds: {
    http_req_failed: ["rate<0.05"],
    checks: ["rate>0.95"],
    http_req_duration: ["p(95)<5000"],
  },
};

function jsonHeaders(extra = {}) {
  return { "Content-Type": "application/json", ...extra };
}

export function setup() {
  console.log("🚀 CI/CD Setup: starting automated login validation");
  console.log(`➡️ Testing endpoint: ${LOGIN_URL}`);

  return {
    startedAt: new Date().toISOString(),
  };
}

export default function (data) {
  const loginPayload = JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
  });

  const loginRes = http.post(LOGIN_URL, loginPayload, {
    headers: jsonHeaders(),
    tags: { name: "CI_LOGIN" },
  });

  const passed = check(loginRes, {
    "login status is 200": (r) => r.status === 200,
    "login returns token": (r) => !!r.json("token"),
    "login response is JSON": (r) =>
      (r.headers["Content-Type"] || "").includes("application/json"),
    "login response time < 5000ms": (r) => r.timings.duration < 5000,
  });

  if (!passed) {
    console.log("❌ CI/CD demo login failed:", loginRes.status, loginRes.body);
    fail("CI/CD demo failed because login validation did not pass.");
  }

  sleep(1);
}

export function teardown(data) {
  console.log("🧹 CI/CD Teardown: automated pipeline test completed");
  console.log(`⏰ Pipeline test started at: ${data.startedAt}`);
  console.log("✅ CI/CD demo finished successfully");
}

export function handleSummary(data) {
  return {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
    "/scripts/ci-cd-summary.json": JSON.stringify(data, null, 2),
  };
}

