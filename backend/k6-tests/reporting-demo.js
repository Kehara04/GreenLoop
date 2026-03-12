import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Rate, Counter } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:5000";
const API_PATH = __ENV.API_PATH || "/api";
const USERS_PATH = __ENV.USERS_PATH || "/users";

const EMAIL = __ENV.EMAIL || "kehara@gmail.com";
const PASSWORD = __ENV.PASSWORD || "123456";
const EXPORT_SUMMARY = (__ENV.EXPORT_SUMMARY || "false").toLowerCase() === "true";

const LOGIN_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/signin`;
const ME_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/me`;

// Custom reporting metrics
const loginDuration = new Trend("login_duration_ms");
const meDuration = new Trend("me_duration_ms");
const loginSuccessRate = new Rate("login_ok_rate");
const meSuccessRate = new Rate("me_ok_rate");
const loginCount = new Counter("login_requests");
const meCount = new Counter("me_requests");

export const options = {
  vus: 2,
  duration: "10s",
  thresholds: {
    http_req_failed: ["rate<0.05"],
    checks: ["rate>0.95"],
    login_duration_ms: ["p(95)<5000"],
    me_duration_ms: ["p(95)<5000"],
  },
};

function jsonHeaders(extra = {}) {
  return { "Content-Type": "application/json", ...extra };
}

export function setup() {
  const loginPayload = JSON.stringify({
    email: EMAIL,
    password: PASSWORD,
  });

  const loginRes = http.post(LOGIN_URL, loginPayload, {
    headers: jsonHeaders(),
  });

  loginCount.add(1);
  loginDuration.add(loginRes.timings.duration);

  const ok = check(loginRes, {
    "login status is 200": (r) => r.status === 200,
    "login returns token": (r) => !!r.json("token"),
  });

  loginSuccessRate.add(ok);

  return { token: loginRes.json("token") };
}

export default function (data) {
  const meRes = http.get(ME_URL, {
    headers: jsonHeaders({
      Authorization: `Bearer ${data.token}`,
    }),
  });

  meCount.add(1);
  meDuration.add(meRes.timings.duration);

  const ok = check(meRes, {
    "me status is 200": (r) => r.status === 200,
    "me returns user object": (r) => r.status === 200 && !!r.json(),
  });

  meSuccessRate.add(ok);

  sleep(1);
}

export function teardown() {
  console.log("✅ Reporting demo finished.");
}

export function handleSummary(data) {
  const outputs = {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };

  if (EXPORT_SUMMARY) {
    outputs["/scripts/summary.json"] = JSON.stringify(data, null, 2);
  }

  return outputs;
}