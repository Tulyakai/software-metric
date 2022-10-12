import AxiosClient from "./AxiosClient";

export default {
  getRepositories: (owner, repo) => {
    return AxiosClient.get(`https://api.github.com/repos/${owner}/${repo}`);
  },
  getCommits: (owner, repo) => {
    return AxiosClient.get(
      `https://api.github.com/repos/${owner}/${repo}/commits`
    );
  },
};
