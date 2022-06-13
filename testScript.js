import http from 'k6/http';
import { sleep } from 'k6';

export let options = {
vus: 10,
duration: '30s', 

thresholds: {
  http_req_failed: ['rate<0.02'], //http errors should be less than 2%
  http_req_duration: ['p(95)<2000'], //95% requests should be below 2s
},

  ext: {
    loadimpact: {
      projectID: 3589467,
      // Test runs with the same name groups test runs together
      name: "SuperNova API"
    },
  }
}

export default function () {
  http.get('http://localhost:3001/reviews/2');
  sleep(1);
}