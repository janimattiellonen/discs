import axios from 'axios';

export default {
	getDiscs() {
		return axios.get('http://localhost:8889/discs').then(res => res.data);
	}
}