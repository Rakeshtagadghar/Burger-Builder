import axios from "axios";

const instance = axios.create({
  baseURL: "https://burger-app-aa7c3.firebaseio.com/"
});

export default instance;
