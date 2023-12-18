import { URLSearchParams } from "url";

let payload = { name: ["John Doe", "two"], occupation: "gardener" };

const params = new URLSearchParams(payload);
console.log(`${params}`);
