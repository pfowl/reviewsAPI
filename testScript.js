import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
 vus: 105,
duration: '30s',

/* stages: [
  { duration: '20s', target: 50 },
  { duration: '30s', target: 100 },
  { duration: '10s', target: 20 },
], */

thresholds: {
  http_req_failed: ['rate<0.02'], //http errors should be less than 2%
  http_req_duration: ['p(95)<50'], //95% requests should be below .50s
},

  ext: {
    loadimpact: {
      projectID: 3589467,
      // Test runs with the same name groups test runs together
      name: "SuperNova API"
    },
  }
}


let getId = () => {
  return Math.floor(Math.random() * (989012- 750169 + 1)) + 750169;
}

let pId = 21002;
export default function () {
  pId= getId();
  http.get(`http://localhost:3001/reviews/${pId}`);
  http.get(`http://localhost:3001/reviews/${pId}/meta`);
  sleep(0.15);
}