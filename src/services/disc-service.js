import axios from 'axios';

import config from '../config.client';

export default {
	getDiscs() {
		return axios.get(`${config.server.base_url}/api/discs`).then(res => res.data);
	}
}