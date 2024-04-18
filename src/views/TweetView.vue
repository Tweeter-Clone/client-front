<template>
	<div>
	<nav class="fixed w-[100%] bg-white">
		<div class="flex justify-center gap-20 py-2 border border-b-2 border-solid">
			<router-link
				to="/tweet"
				><span @click="isFollowing = false" :class="{
					'underline decoration-blue-600 underline-offset-4 decoration-4':
					isFollowing === false,
				}">FOR YOU</span></router-link
			>
			<router-link
				to="/tweet"
				><span @click="isFollowing = true"  :class="{
					'underline decoration-blue-600 underline-offset-4 decoration-4':
						isFollowing === true,
				}">FOLLOWING </span></router-link
			>
		</div>
	</nav>
	<div class="flex justify-center bg-white h-screen px-5 text-[#999999] font-semibold text-[24px] items-center">
		NO TWEET
	</div>
</div>
</template>

<script>
export default {
	data() {
		return {
			isFollowing: false,
		};
	},
	async mounted(){
		await this.authenticated();
	},
	methods: {
		logout() {
			localStorage.clear();
			this.$router.push('/login');
		},
		async authenticated() {
			try{
				await this.$store.dispatch('authenticated');
			}catch (error) {
				console.log(error);
			} 
		},
	},
};
</script>
