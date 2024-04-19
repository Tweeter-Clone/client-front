import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const BASE_URL = 'http://localhost:3030';

export default new Vuex.Store({
	state: {},
	mutations: {
	},
	actions: {
		async signup(context, payload) {
			try {
				const response = await axios.post(`${BASE_URL}/signup`, payload);
				return response;
			} catch (error) {
				console.error('Error signing up:', error);
				throw error;
			}
		},		
		async login(context, payload) {
			try {
				const response = await axios.post(
					`${BASE_URL}/login`,
					payload
				);
		
				// Store the JWT token received from the server in local storage
				localStorage.setItem('token', response.data.data.token);
		
				// Decode the JWT token to extract user information
				localStorage.getItem('token');
		
				return response;
			} catch (error) {
				return error;
			}
		},		
		async authenticated() {
			try {
				const payload = {token: localStorage.getItem('token')};
				const response = await axios.post(
					`${BASE_URL}/authentication`,
					payload
				);

				localStorage.setItem('currentId', response.data.data.user_id);
				localStorage.setItem('currentUsername', response.data.data.username);

				return response;
			} catch (error) {
				// Menangani kesalahan saat memeriksa token
				localStorage.clear();
				console.error('Error while checking authentication:', error);
				return false;
			}
		},
		async addTweet(context, payload) {
			try {
				const response = await axios.post(`${BASE_URL}/tweets`, payload, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
						'Content-Type': 'application/json',
					},
				});
				return response;
			} catch (error) {
				return error;
			}
		},
		async getTweets() {
			try {
				const response = await axios.get(`${BASE_URL}/tweets`, {
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				});
				return response;
			} catch (error) {
				return error;
			}
		},
	},
	modules: {},
});
