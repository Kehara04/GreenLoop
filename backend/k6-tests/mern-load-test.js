import http from "k6/http";
import { check, sleep } from "k6";

/**
 * MERN API Load Test (k6)
 * Project routes (based on your code):
 *   app mounts:        /api
 *   router mounts:
 *     /api/users        -> userRoutes
 *       POST  /signin
 *       GET   /me   (protected; needs Bearer token and role in [admin, customer])
 *       GET   /
 *       GET   /user?id=...
 *
 * Auth middleware expects: Authorization: Bearer <token>
 * Token payload contains: { id, email, role, userType }
 */

const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:5000";
const API_PATH = __ENV.API_PATH || "/api";
const USERS_PATH = __ENV.USERS_PATH || "/users";

// Credentials to login (make sure this user exists and has role: admin OR customer)
const EMAIL = __ENV.EMAIL || "kehara@gmail.com";
const PASSWORD = __ENV.PASSWORD || "123456";

// Optional: use role header checks
const EXPECT_ROLE = __ENV.EXPECT_ROLE || ""; // e.g. "admin" or "customer"

const LOGIN_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/signin`;
const ME_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/me`;
const LIST_USERS_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/`;
const GET_USER_BY_ID_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/user`;

const TEST_ME = (__ENV.TEST_ME || "true").toLowerCase() === "true";
const TEST_LIST_USERS = (__ENV.TEST_LIST_USERS || "true").toLowerCase() === "true";
const TEST_GET_USER_BY_ID = (__ENV.TEST_GET_USER_BY_ID || "false").toLowerCase() === "true";

// If you enable TEST_GET_USER_BY_ID, set this:
const USER_ID_QUERY = __ENV.USER_ID || "1"; // maps to user_id in your DB

export const options = {
  stages: [
    { duration: "10s", target: 1 },
    { duration: "20s", target: 5 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<900"],  //change duration to 900
    checks: ["rate>0.95"],
  },
};

function jsonHeaders(extra = {}) {
  return { "Content-Type": "application/json", ...extra };
}

export function setup() {
  console.log("✅ Setup: logging in once to get JWT token...");
  console.log("➡️ LOGIN_URL:", LOGIN_URL);

  const loginPayload = JSON.stringify({ email: EMAIL, password: PASSWORD });

  const loginRes = http.post(LOGIN_URL, loginPayload, {
    headers: jsonHeaders(),
    tags: { name: "LOGIN" },
  });

  const ok = check(loginRes, {
    "login status is 200": (r) => r.status === 200,
    "login returns token": (r) => !!r.json("token"),
  });

  if (!ok) {
    console.log("❌ Login failed:", loginRes.status, loginRes.body);
  }

  const token = loginRes.json("token");
  const role = loginRes.json("role");
  const id = loginRes.json("id");
  const userType = loginRes.json("userType");

  if (EXPECT_ROLE && role !== EXPECT_ROLE) {
    console.log(
      `⚠️ Logged-in role is '${role}', but EXPECT_ROLE='${EXPECT_ROLE}'. /me may 403 if role not allowed.`
    );
  }

  return { token, role, id, userType };
}

export default function (data) {
  const authHeaders = {
    Authorization: `Bearer ${data.token}`,
  };

  // 1) Protected profile endpoint
  if (TEST_ME) {
    const me = http.get(ME_URL, {
      headers: jsonHeaders(authHeaders),
      tags: { name: "USERS_ME" },
    });

    check(me, {
      "me status is 200": (r) => r.status === 200,
      "me returns user object": (r) => r.status === 200 && !!r.json(), // your controller returns user doc
      "response time < 800ms": (r) => r.timings.duration < 800,
    });

    if (me.status !== 200) {
      console.log("❌ /users/me failed:", me.status, me.body);
    }
  }

  // 2) List users (public in your routes)
  if (TEST_LIST_USERS) {
    const list = http.get(LIST_USERS_URL, {
      tags: { name: "USERS_LIST" },
    });

    check(list, {
      "list users is 200": (r) => r.status === 200,
      "list users returns array": (r) => Array.isArray(r.json()),
      "response time < 800ms (list)": (r) => r.timings.duration < 800,
    });

    if (list.status !== 200) {
      console.log("❌ /users list failed:", list.status, list.body);
    }
  }

  // 3) Get user by ID (public, via query param ?id=)
  if (TEST_GET_USER_BY_ID) {
    const url = `${GET_USER_BY_ID_URL}?id=${encodeURIComponent(USER_ID_QUERY)}`;

    const byId = http.get(url, {
      tags: { name: "USERS_GET_BY_ID" },
    });

    check(byId, {
      "get user by id is 200 or 404": (r) => r.status === 200 || r.status === 404,
      "if 200 returns user object": (r) => (r.status !== 200 ? true : !!r.json()),
      "response time < 800ms (by id)": (r) => r.timings.duration < 800,
    });

    if (byId.status !== 200 && byId.status !== 404) {
      console.log("❌ /users/user?id=... failed:", byId.status, byId.body);
    }
  }

  sleep(1);
}

export function teardown() {
  console.log("✅ Teardown: test finished.");
}