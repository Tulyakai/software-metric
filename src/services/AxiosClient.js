import axios from "axios";

const apiClient = axios.create({
  headers: {
    Authorization: '${{ secrets.API_GITHUB_TOKEN }}',
  },
});
export default apiClient;
