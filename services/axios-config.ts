import Axios from "axios";

const BASE_URL = "https://jsonplaceholder.typicode.com";

const axios = Axios.create({
  baseURL: BASE_URL,
});

export { axios };
