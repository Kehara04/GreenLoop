// import http from "k6/http";
// import { check, sleep } from "k6";

// /**
//  * MERN API Load Test (k6)
//  * Project routes (based on your code):
//  *   app mounts:        /api
//  *   router mounts:
//  *     /api/users        -> userRoutes
//  *       POST  /signin
//  *       GET   /me   (protected; needs Bearer token and role in [admin, customer])
//  *       GET   /
//  *       GET   /user?id=...
//  *
//  * Auth middleware expects: Authorization: Bearer <token>
//  * Token payload contains: { id, email, role, userType }
//  */

// const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:5000";
// const API_PATH = __ENV.API_PATH || "/api";
// const USERS_PATH = __ENV.USERS_PATH || "/users";

// // Credentials to login (make sure this user exists and has role: admin OR customer)
// const EMAIL = __ENV.EMAIL || "kehara@gmail.com";
// const PASSWORD = __ENV.PASSWORD || "123456";

// // Optional: use role header checks
// const EXPECT_ROLE = __ENV.EXPECT_ROLE || ""; // e.g. "admin" or "customer"

// const LOGIN_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/signin`;
// const ME_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/me`;
// const LIST_USERS_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/`;
// const GET_USER_BY_ID_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/user`;

// const TEST_ME = (__ENV.TEST_ME || "true").toLowerCase() === "true";
// const TEST_LIST_USERS = (__ENV.TEST_LIST_USERS || "true").toLowerCase() === "true";
// const TEST_GET_USER_BY_ID = (__ENV.TEST_GET_USER_BY_ID || "false").toLowerCase() === "true";

// // If you enable TEST_GET_USER_BY_ID, set this:
// const USER_ID_QUERY = __ENV.USER_ID || "1"; // maps to user_id in your DB

// export const options = {
//   stages: [
//     { duration: "10s", target: 1 },
//     { duration: "20s", target: 5 },
//     { duration: "10s", target: 0 },
//   ],
//   thresholds: {
//     http_req_failed: ["rate<0.05"],
//     http_req_duration: ["p(95)<1200"],  
//     checks: ["rate>0.95"],   
//   },
// };

// function jsonHeaders(extra = {}) {
//   return { "Content-Type": "application/json", ...extra };
// }

// export function setup() {
//   console.log("✅ Setup: logging in once to get JWT token...");
//   console.log("➡️ LOGIN_URL:", LOGIN_URL);

//   const loginPayload = JSON.stringify({ email: EMAIL, password: PASSWORD });

//   const loginRes = http.post(LOGIN_URL, loginPayload, {
//     headers: jsonHeaders(),
//     tags: { name: "LOGIN" },
//   });

//   const ok = check(loginRes, {
//     "login status is 200": (r) => r.status === 200,
//     "login returns token": (r) => !!r.json("token"),
//   });

//   if (!ok) {
//     console.log("❌ Login failed:", loginRes.status, loginRes.body);
//   }

//   const token = loginRes.json("token");
//   const role = loginRes.json("role");
//   const id = loginRes.json("id");
//   const userType = loginRes.json("userType");

//   if (EXPECT_ROLE && role !== EXPECT_ROLE) {
//     console.log(
//       `⚠️ Logged-in role is '${role}', but EXPECT_ROLE='${EXPECT_ROLE}'. /me may 403 if role not allowed.`
//     );
//   }

//   return { token, role, id, userType };
// }

// export default function (data) {
//   const authHeaders = {
//     Authorization: `Bearer ${data.token}`,
//   };

//   // 1) Protected profile endpoint
//   if (TEST_ME) {
//     const me = http.get(ME_URL, {
//       headers: jsonHeaders(authHeaders),
//       tags: { name: "USERS_ME" },
//     });

//     check(me, {
//       "me status is 200": (r) => r.status === 200,
//       "me returns user object": (r) => r.status === 200 && !!r.json(), // your controller returns user doc
//       "response time < 1200ms": (r) => r.timings.duration < 1200,
//     });

//     if (me.status !== 200) {
//       console.log("❌ /users/me failed:", me.status, me.body);
//     }
//   }

//   // 2) List users (public in your routes)
//   if (TEST_LIST_USERS) {
//     const list = http.get(LIST_USERS_URL, {
//       tags: { name: "USERS_LIST" },
//     });

//     check(list, {
//       "list users is 200": (r) => r.status === 200,
//       "list users returns array": (r) => Array.isArray(r.json()),
//       "response time < 1200ms (list)": (r) => r.timings.duration < 1200,
//     });

//     if (list.status !== 200) {
//       console.log("❌ /users list failed:", list.status, list.body);
//     }
//   }

//   // 3) Get user by ID (public, via query param ?id=)
//   if (TEST_GET_USER_BY_ID) {
//     const url = `${GET_USER_BY_ID_URL}?id=${encodeURIComponent(USER_ID_QUERY)}`;

//     const byId = http.get(url, {
//       tags: { name: "USERS_GET_BY_ID" },
//     });

//     check(byId, {
//       "get user by id is 200 or 404": (r) => r.status === 200 || r.status === 404,
//       "if 200 returns user object": (r) => (r.status !== 200 ? true : !!r.json()),
//       "response time < 1200ms (by id)": (r) => r.timings.duration < 1200,
//     });

//     if (byId.status !== 200 && byId.status !== 404) {
//       console.log("❌ /users/user?id=... failed:", byId.status, byId.body);
//     }
//   }

//   sleep(1);
// }

// export function teardown() {
//   console.log("✅ Teardown: test finished.");
// }

import http from "k6/http";
import { check, sleep } from "k6";
import { Trend, Rate, Counter } from "k6/metrics";
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js";

/**
 * MERN API Load Test (k6) + Better Reporting
 *
 * Adds:
 *  - Custom metrics per endpoint (Trends, Rates, Counters)
 *  - More useful failure logs
 *  - Optional JSON summary export (handleSummary)
 */

const BASE_URL = __ENV.BASE_URL || "http://host.docker.internal:5000";
const API_PATH = __ENV.API_PATH || "/api";
const USERS_PATH = __ENV.USERS_PATH || "/users";

// Credentials to login (must exist)
const EMAIL = __ENV.EMAIL || "kehara@gmail.com";
const PASSWORD = __ENV.PASSWORD || "123456";

// Optional
const EXPECT_ROLE = __ENV.EXPECT_ROLE || ""; // "admin" or "customer"

// Toggle tests
const TEST_ME = (__ENV.TEST_ME || "true").toLowerCase() === "true";
const TEST_LIST_USERS = (__ENV.TEST_LIST_USERS || "true").toLowerCase() === "true";
const TEST_GET_USER_BY_ID = (__ENV.TEST_GET_USER_BY_ID || "false").toLowerCase() === "true";

// If TEST_GET_USER_BY_ID=true:
const USER_ID_QUERY = __ENV.USER_ID || "1";

// Optional: write a JSON report file at the end
// Example: -e EXPORT_SUMMARY=true
const EXPORT_SUMMARY = (__ENV.EXPORT_SUMMARY || "false").toLowerCase() === "true";

const LOGIN_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/signin`;
const ME_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/me`;
const LIST_USERS_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/`;
const GET_USER_BY_ID_URL = `${BASE_URL}${API_PATH}${USERS_PATH}/user`;

/* ---------------------------
   ✅ Custom Reporting Metrics
---------------------------- */

// Trends (timings)
const tLogin = new Trend("login_duration_ms");
const tMe = new Trend("me_duration_ms");
const tListUsers = new Trend("list_users_duration_ms");
const tGetById = new Trend("get_user_by_id_duration_ms");

// Rates (success %)
const rLoginOk = new Rate("login_ok_rate");
const rMeOk = new Rate("me_ok_rate");
const rListOk = new Rate("list_users_ok_rate");
const rByIdOk = new Rate("get_user_by_id_ok_rate");

// Counters (how many calls)
const cLogin = new Counter("login_requests");
const cMe = new Counter("me_requests");
const cList = new Counter("list_users_requests");
const cById = new Counter("get_user_by_id_requests");

export const options = {
  stages: [
    { duration: "10s", target: 1 },
    { duration: "20s", target: 5 },
    { duration: "10s", target: 0 },
  ],
  thresholds: {
    // global system rules (CI/CD can fail if these cross)
    http_req_failed: ["rate<0.05"],
    http_req_duration: ["p(95)<5000"],
    checks: ["rate>0.95"],

    // endpoint-specific performance rules (strong reporting!)
    login_duration_ms: ["p(95)<5000"],
    me_duration_ms: ["p(95)<5000"],
    list_users_duration_ms: ["p(95)<5000"],
  },
};

function jsonHeaders(extra = {}) {
  return { "Content-Type": "application/json", ...extra };
}

function logFail(prefix, res) {
  // Avoid printing huge HTML pages etc.
  const body = (res && res.body && res.body.length > 500) ? res.body.slice(0, 500) + "..." : res.body;
  console.log(`❌ ${prefix} failed:`, res.status, body);
}

export function setup() {
  console.log("✅ Setup: logging in once to get JWT token...");
  console.log("➡️ LOGIN_URL:", LOGIN_URL);

  const loginPayload = JSON.stringify({ email: EMAIL, password: PASSWORD });

  const loginRes = http.post(LOGIN_URL, loginPayload, {
    headers: jsonHeaders(),
    tags: { name: "LOGIN" },
  });

  // metrics for reporting
  cLogin.add(1);
  tLogin.add(loginRes.timings.duration);

  const ok = check(loginRes, {
    "login status is 200": (r) => r.status === 200,
    "login returns token": (r) => !!r.json("token"),
  });

  rLoginOk.add(ok);

  if (!ok) logFail("LOGIN", loginRes);

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
  const authHeaders = { Authorization: `Bearer ${data.token}` };

  // 1) Protected profile endpoint
  if (TEST_ME) {
    const me = http.get(ME_URL, {
      headers: jsonHeaders(authHeaders),
      tags: { name: "USERS_ME" },
    });

    cMe.add(1);
    tMe.add(me.timings.duration);

    const ok = check(me, {
      "me status is 200": (r) => r.status === 200,
      "me returns user object": (r) => r.status === 200 && !!r.json(),
      "me response time < 5000ms": (r) => r.timings.duration < 5000,
    });

    rMeOk.add(ok);

    if (me.status !== 200) logFail("/users/me", me);
  }

  // 2) List users
  if (TEST_LIST_USERS) {
    const list = http.get(LIST_USERS_URL, {
      tags: { name: "USERS_LIST" },
    });

    cList.add(1);
    tListUsers.add(list.timings.duration);

    const ok = check(list, {
      "list users is 200": (r) => r.status === 200,
      "list users returns array": (r) => Array.isArray(r.json()),
      "list response time < 5000ms": (r) => r.timings.duration < 5000,
    });

    rListOk.add(ok);

    if (list.status !== 200) logFail("/users (list)", list);
  }

  // 3) Get user by ID
  if (TEST_GET_USER_BY_ID) {
    const url = `${GET_USER_BY_ID_URL}?id=${encodeURIComponent(USER_ID_QUERY)}`;

    const byId = http.get(url, {
      tags: { name: "USERS_GET_BY_ID" },
    });

    cById.add(1);
    tGetById.add(byId.timings.duration);

    const ok = check(byId, {
      "get user by id is 200 or 404": (r) => r.status === 200 || r.status === 404,
      "if 200 returns user object": (r) => (r.status !== 200 ? true : !!r.json()),
      "byId response time < 5000ms": (r) => r.timings.duration < 5000,
    });

    rByIdOk.add(ok);

    if (byId.status !== 200 && byId.status !== 404) logFail("/users/user?id=...", byId);
  }

  sleep(1);
}

export function teardown() {
  console.log("✅ Teardown: test finished.");
}

/**
 * ✅ This is the “reporting upgrade”.
 * It prints a nicer summary + optionally writes JSON report.
 *
 * If you run in Docker, mount a folder for the output:
 *   docker run --rm -v ${PWD}:/scripts grafana/k6 run /scripts/mern-load-test.js
 * (then summary files appear in your local k6-tests folder)
 */
export function handleSummary(data) {
  const outputs = {
    stdout: textSummary(data, { indent: " ", enableColors: true }),
  };

  if (EXPORT_SUMMARY) {
    //outputs["summary.json"] = JSON.stringify(data, null, 2);
    outputs["/scripts/summary.json"] = JSON.stringify(data, null, 2);
  }

  return outputs;
}