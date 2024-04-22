import Vue from 'vue';
import VueRouter from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import SignupView from '../views/SignupView.vue';
import TweetView from '../views/TweetView.vue';
import CommentView from '../views/CommentView.vue';
import ProfileView from '../views/ProfileView.vue';

Vue.use(VueRouter);

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/login',
		name: 'login',
		component: LoginView,
		meta: { requiresGuest: true },
	},
	{
		path: '/signup',
		name: 'signup',
		component: SignupView,
		meta: { requiresGuest: true },
	},
	{
		path: '/tweet',
		name: 'tweet',
		component: TweetView,
		meta: { requiresAuth: true },
	},
	{
		path: '/tweet/:id',
		name: 'comment',
		component: CommentView,
		props: true,
		meta: { requiresAuth: true },
	},
	{
		path: '/profile/:username',
		name: 'profile',
		component: ProfileView,
		props: true,
		meta: { requiresAuth: true },
	},
];

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes,
});

router.beforeEach((to, from, next) => {
	const isAuthenticated = localStorage.getItem('token');

	if (to.matched.some((route) => route.meta.requiresAuth)) {
		if (!isAuthenticated) {
			next({ path: '/login' });
		} else {
			next();
		}
	} else if (to.matched.some((route) => route.meta.requiresGuest)) {
		if (isAuthenticated) {
			next({ path: '/tweet' });
		} else {
			next();
		}
	} else {
		next();
	}
});

export default router;
