<template>
	<div class="flex justify-center bg-blue-600 h-screen pt-10">
		<div class="w-96 p-6 shadow-lg bg-white rounded h-fit">
			<img
				src="../assets/twitter.png"
				class="mx-auto"
				alt="Vite logo"
				width="80"
			/>
			<hr class="mt-3" />
			<h1 class="text-[28px] font-semibold">Sign in to TweeTopia</h1>
			<div v-if="loginFailed" class="bg-red-500 text-white p-2 rounded my-3">
				{{ loginErrorMessage }}
			</div>
			<form @submit="login">
				<div class="relative my-3 border border-solid rounded" >
					<input
						type="text"
						class="peer block min-h-[auto] w-full rounded border-0 focus:outline-none focus:ring-2 focus:border-blue-600 px-3 py-2"
						id="username"
						v-model="username"
						/>
					<label
						for="password"
						:class="`${username ? '-translate-y-[1.15rem] scale-[0.8] mt-[0.65rem] leading-[1]' : 'leading-[2.15] inline'} peer-focus:inline pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate peer-focus:mt-[0.60rem] bg-white text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:leading-[1] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 us:dark:peer-foctext-primary`"
						>Username
					</label>
				</div>
				<div class="relative my-3 border border-solid rounded" >
					<input
						type="password"
						class="peer block min-h-[auto] w-full rounded border-0 focus:outline-none focus:ring-2 focus:border-blue-600 px-3 py-2"
						id="password"
						v-model="password"
						/>
					<label
						for="password"
						:class="`${password ? '-translate-y-[1.15rem] scale-[0.8] mt-[0.65rem] leading-[1]' : 'leading-[2.15] inline'} peer-focus:inline pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate peer-focus:mt-[0.60rem] bg-white text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[1.15rem] peer-focus:leading-[1] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[1.15rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 us:dark:peer-foctext-primary`"
						>Password
					</label>
				</div>
				<button
					type="submit"
					class="bg-black text-white w-full rounded my-3 py-3 disabled:opacity-50"
					:disabled="username.length < 3 || password.length < 3 || loading"
				>
					{{ loading ? 'Loading...' : 'Sign in' }}
				</button>
			</form>
			<p class="read-the-docs">
				Don't have an account?
				<router-link to="/signup" class="text-blue-600 hover:underline"
					>Sign up</router-link
				>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	data() {
		return {
			username: '',
			password: '',
			loginFailed: false,
			loginErrorMessage: '',
			loading: false,
		};
	},
	methods: {
		async login(event) {
			event.preventDefault();
			this.loading = true;
			const payload = {
				username: this.username,
				password: this.password,
			};
			try {
				const request = await this.$store.dispatch('login', payload);
				await this.$store.dispatch('authenticated');

				if (request.status === 200) {
					window.location.href = '/tweet';
				} else if (request.response.status === 400) {
					this.loginFailed = true;
					this.loginErrorMessage = request.response.data.message;
				}
			} catch (error) {
				console.log(error);
			} finally {
				this.loading = false;
			}
		},
	},
};
</script>
