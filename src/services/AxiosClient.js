import axios from "axios";

const apiClient = axios.create({
  headers: {
    Authorization: `Bearer ${process.env.VUE_APP_GITHUB_AUTH}`,
  },
});
export default apiClient;
