import axios from 'axios';

export default {
    getLoc(owner, repo){
        return axios.get(`https://api.codetabs.com/v1/loc/?github=${owner}/${repo}`);
    }
}