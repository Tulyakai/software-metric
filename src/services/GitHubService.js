import axios from 'axios';

export default {
    getRepositories: (owner, repo) => {
        return axios.get(`https://api.github.com/repos/${owner}/${repo}`);
    }
}