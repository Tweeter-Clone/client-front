<template>
	<div>
	<nav class="fixed w-[100%] bg-white">
		<div class="flex justify-center gap-20 py-2 border-b-2 border-solid">
			<span @click="isFollowing = false" :class="`${isFollowing === false ?
					'underline decoration-blue-600 underline-offset-4 decoration-4 cursor-pointer': ''
				} cursor-pointer text-[16px] uppercase`">FOR YOU</span>
			<span @click="isFollowing = true"  :class="`${isFollowing === true ?
					'underline decoration-blue-600 underline-offset-4 decoration-4 cursor-pointer': ''
				} cursor-pointer text-[16px] uppercase`">FOLLOWING</span>
		</div>
	</nav>
	<div class="flex justify-center bg-white h-screen px-5 text-[#999999] font-semibold text-[24px] items-center uppercase">
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
