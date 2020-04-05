const axios = require('axios');

module.exports = {
    async index(req, res) {
        const { login } = req.body;

        const response = await axios.get(`https://api.github.com/users/${login}`);

        return res.json(response.data);
    },

    async listRepos(req, res) {
        const { id } = req.params;

        const response = await axios.get(`https://api.github.com/users/${id}/repos`);

        return res.json(response.data);
    }
};