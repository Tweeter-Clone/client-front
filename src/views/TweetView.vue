<template>
	<div class="mx-auto w-[60%] py-[34px]">
	<nav class="fixed z-20 top-0 left-0 w-full bg-white">
		<div class="flex justify-center gap-20 py-2 border border-b-2 border-solid">
			<span @click="isFollowing = false" :class="`${isFollowing === false ?
					'underline decoration-blue-600 underline-offset-4 decoration-4 cursor-pointer': ''
				} cursor-pointer text-[16px] uppercase`">FOR YOU</span>
			<span @click="isFollowing = true"  :class="`${isFollowing === true ?
					'underline decoration-blue-600 underline-offset-4 decoration-4 cursor-pointer': ''
				} cursor-pointer text-[16px] uppercase`">FOLLOWING</span>
		</div>
	</nav>
	<div class="flex flex-col justify-center">
		<TweetForm :userId="currentId" :username="currentUsername" />
		<div v-if="sortedTweets.length > 0">
		<TweetCard
				v-for="tweet in sortedTweets"
				:key="tweet.id"
				:id="tweet.id"
				:currentId="currentId"
				:userId="tweet.user_id"
				:username="tweet.username"
				:content="tweet.content"
				:createdAt="tweet.created_at"
				:updatedAt="tweet.updated_at"
				@getData="getTweet"
			/>
		</div>
		<div v-else class="flex justify-center bg-white px-5 py-[24px] text-[#999999] font-semibold text-[24px] items-center uppercase">
		NO TWEET
	</div>
	</div>
</div>
</template>

<script>
import TweetForm from '@/components/TweetForm.vue';
import TweetCard from '@/components/TweetCard.vue';

export default {
	components: {
		TweetForm,
		TweetCard
	},
	data() {
		return {
			currentId: parseInt(localStorage.getItem('currentId')),
			currentUsername: localStorage.getItem('currentUsername'),
			isFollowing: false,
			tweetsData: [],
		};
	},
	async mounted(){
		await this.getTweets();
	},
	methods: {
		async getTweets() {
			await this.$store.dispatch('getTweets');
				if (this.currentId) {
				const response = await this.$store.dispatch('getTweets');
				if(this.isFollowing === false){
					this.tweetsData = response.data.data;
				}else{
					this.tweetsData = response.data.data.filter(
						(tweet) => tweet.user_id === this.currentId
					);
				}
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
	watch: {
		isFollowing() {
			this.getTweets();
		}
	},
};
</script>
