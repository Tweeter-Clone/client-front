<template>
	<div class="rounded px-5 py-3 mt-2 border border-inherit bg-white">
		<div class="flex gap-5">
			<img
				src="@/assets/devcode-logo.png"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<div class="w-full">
				<div class="flex justify-between w-full">
					<p class="text-[14px]">
                        <router-link :to="`/profile/${username}`" class="hover:opacity-[0.8]">
						<span class="font-semibold">{{ username }}</span>
						<span class="text-gray-400"
							>@{{ username.replace(/\s/g, '') }}{{ userId }}</span
						>
                    </router-link>
					</p>
				</div>
				<form @submit="addTweet">
					<textarea
						v-model="tweet"
						class="w-full mt-2 p-2 border border-gray-300 rounded-md resize-none block text-[14px]"
						placeholder="What's happening?"
						rows="3"
						cols="100"
					></textarea>
					<div class="flex justify-between items-center mt-2">
						<button
							type="submit"
							:disabled="tweet.length > 280 || tweet.trim() === '' || loading"
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 disabled:opacity-50 text-[14px]"
						>
							{{ loading ? 'Loading...' : 'Tweet' }}
						</button>
						<span
							:class="`${tweet.length > 280 ? 'text-red-500' : 'text-gray-500'} text-[14px]`"
						>
							{{ remainingCharacters }} characters remaining
						</span>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	props: {
		userId: Number,
		username: String,
	},
	data() {
		return {
			tweet: '',
			loading: false,
		};
	},
	methods: {
		async addTweet(event) {
			event.preventDefault();
			this.loading = true; // Set loading state
			const payload = {
				content: this.tweet,
			};
			try {
				await this.$store.dispatch('addTweet', payload);
			} finally {
				this.loading = false;
				this.tweet = '';
				this.$parent.getTweets();
			}
		},
	},
	computed: {
		remainingCharacters() {
			const remaining = 280 - this.tweet.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
