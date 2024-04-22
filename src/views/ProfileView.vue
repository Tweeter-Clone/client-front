<template>
	<div class="mx-auto w-[60%] py-[34px]">
	<nav class="fixed z-20 top-0 left-0 w-full bg-white">
		<a href="/tweet" class="w-[60%] flex items-center mx-auto p-2 border-b-2 border-solid gap-2 text-[18px] hover:opacity-[0.8] uppercase">
            <font-awesome-icon icon="fa fa-arrow-left" /> 
			Profile
        </a>
	</nav>
	<div class="flex flex-col justify-center">
		<ProfileCard
				v-if="userData"
				:id="userData.id"
				:currentId="currentId"
				:image="userData.image"
				:username="userData.username"
				:followers="userData.followers"
				:isFollowed="userData.is_followed"
				:createdAt="userData.created_at"
				@getData="getUsers"
			/>
		<h2 class="text-[18px] font-semibold px-[24px] py-[18px]">
                Tweets ({{ sortedTweets.length }})
        </h2>
		<div v-if="sortedTweets.length > 0">
			<TweetCard
				v-for="tweet in sortedTweets"
				:key="tweet.id"
				:id="tweet.id"
				:currentId="currentId"
				:userId="tweet.user_id"
				:username="tweet.username"
				:content="tweet.content"
				:comments="tweet.comments"
				:likes="tweet.likes"
				:isLiked="tweet.is_liked"
				:isFollowed="tweet.is_followed"
				:createdAt="tweet.created_at"
				:updatedAt="tweet.updated_at"
				@getData="getTweets"
			/>
		</div>
		<div v-else class="flex justify-center bg-white px-5 py-[24px] text-[#999999] font-semibold text-[24px] items-center uppercase">
		NO COMMENT
	</div>
	</div>
</div>
</template>

<script>
import ProfileCard from '@/components/ProfileCard.vue';
import TweetCard from '@/components/TweetCard.vue';

export default {
	components: {
		ProfileCard,
		TweetCard,
	},
	data() {
		return {
			currentId: parseInt(localStorage.getItem('currentId')),
			currentUsername: localStorage.getItem('currentUsername'),
			userData: [],
			tweetsData: [],
		};
	},
	async mounted() {
		await this.getUsers();
		await this.getTweets();
	},

	methods: {
        async getUsers() {
				if (this.currentId) {
				const response = await this.$store.dispatch('getUsers');

                this.userData = response.data.data.filter(
                    (user) => user.username === this.$route.params.username
                )[0];
			}
		},
		async getTweets() {
				if (this.currentId) {
				const response = await this.$store.dispatch('getTweets');

					this.tweetsData = response.data.data.filter(
						(tweet) => tweet.user_id === this.userData.id
					);
			}
		},
	},
	computed: {
		sortedTweets() {
			return this.tweetsData
				.slice()
				.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		},
		remainingCharacters() {
			const remaining = 280 - this.tweet.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
