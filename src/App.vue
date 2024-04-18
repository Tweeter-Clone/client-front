<template>
	<div id="app">
		<LeftNavbar v-if="isNotHomeRoute" />
		<RightNavbar v-if="isNotHomeRoute" />
		<router-view />
	</div>
</template>
<script>
// @ is an alias to /src
import LeftNavbar from '@/components/LeftNavbar.vue';
import RightNavbar from '@/components/RightNavbar.vue';

export default {
	components: {
		LeftNavbar,
		RightNavbar
	},
	computed: {
		isNotHomeRoute() {
			return !(
				this.$route.path === '/' ||
				this.$route.path === '/login' ||
				this.$route.path === '/signup'
			);
		},
	},
};
</script>

<style scoped>
#app {
	font-family: 'Poppins', sans-serif;
}
</style>