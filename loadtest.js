import http from 'k6/http';
import { check, sleep } from 'k6';

// k6 options
export let options = {
  vus: 500,           // number of virtual users (start smaller than 1000)
  duration: '30s',    // total test duration
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],   // <1% request failure
  },
};

export default function () {
  const baseUrl = 'http://localhost:3000';

  // Test root endpoint
  let res1 = http.get(`${baseUrl}/`);
  check(res1, { 'GET / status is 200': (r) => r.status === 200 });

  // Test health endpoint
  let res2 = http.get(`${baseUrl}/healthz`);
  check(res2, { 'GET /healthz status is 200': (r) => r.status === 200 });

  // Short pause so requests aren’t too bursty
  sleep(0.1);
}

