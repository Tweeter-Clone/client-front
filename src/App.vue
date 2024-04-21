<template>
	<div id="app">
		<SideNavbar v-if="isNotHomeRoute" />
		<router-view />
	</div>
</template>
<script>
// @ is an alias to /src
import SideNavbar from '@/components/SideNavbar.vue';

export default {
	components: {
		SideNavbar
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