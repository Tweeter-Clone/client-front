<template>
	<div class="rounded px-5 py-3 mt-2 border border-inherit bg-white">
		<div class="flex gap-5">
			<img
				v-if="currentId !== userId"
				:src="`https://source.unsplash.com/random/200x200?sig=${userId}`"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<img
				v-else
				src="@/assets/devcode-logo.png"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<div class="w-full">
				<div class="flex justify-between w-full">
					<div>
						<p class="text-[14px]">
							<span class="font-semibold">{{ username }}</span>
							<span class="text-gray-400"
								>@{{ username.replace(/\s/g, '') }}{{ userId }}</span
							>
						</p>
					</div>
					<span class="text-gray-500 text-[14px]">{{ formatTimeAgo(createdAt) }}</span>
				</div>
				<p class="whitespace-pre-line text-[14px]">{{ content }}</p>
			</div>
		</div>
		<div class="flex justify-between mt-2">
			<p class="text-gray-500 text-[14px]">{{ formatCreatedAt(createdAt) }}</p>
			<div class="action flex justify-end gap-5">
				<button
					type="button"
					@click="handleLike"
					class="hover:text-gray-500 text-[14px]"
				>
					<font-awesome-icon :icon="isLiked === 0 ? 'far fa-heart' : 'fa-solid fa-heart'" /> Love ({{
						likes
					}})
				</button>
			</div>
		</div>
		<form @submit.prevent="addComment">
			<textarea
				v-model="newComment"
				class="w-full p-2 border border-gray-300 rounded-md resize-none block mb-2 mt-4 text-[14px]"
				placeholder="Write your comment..."
				rows="2"
			></textarea>
			<div class="flex justify-between items-center">
				<button
					:disabled="
						newComment.length > 280 || newComment.trim() === '' || loading
					"
					class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 disabled:opacity-75 text-[14px]"
				>
					{{ loading ? 'Loading...' : 'Reply' }}
				</button>
				<span
					:class="`${newComment.length > 280 ? 'text-red-500' : 'text-gray-500'} text-[14px]`"
					>
							{{ remainingCharacters }} characters remaining
				</span>
			</div>
		</form>
	</div>
</template>

<script>
import { format } from 'date-fns';

export default {
	props: {
		id: Number,
		currentId: Number,
		userId: Number,
		username: String,
		content: String,
		comments: Number,
		likes: Number,
		isLiked: Boolean,
		createdAt: String,
	},
	data() {
		return {
			newComment: '',
			loading: false,
			currentLikeId: null,
		};
	},
	mounted() {
		this.getLike();
	},
	methods: {
		formatTimeAgo(dateTime) {
			const createdDate = new Date(dateTime);
			const currentDate = new Date();
			const timeDifference = currentDate - createdDate;
			const hoursAgo = Math.floor(timeDifference / (1000 * 60 * 60));

			if (hoursAgo === 0) {
				return 'Just now';
			} else if (hoursAgo === 1) {
				return '1h ago';
			} else if (hoursAgo < 24) {
				return hoursAgo + 'h ago';
			} else {
				const daysAgo = Math.floor(hoursAgo / 24);
				return daysAgo + 'd ago';
			}
		},

		formatCreatedAt(dateTime) {
			return format(new Date(dateTime), 'dd MMMM yyyy');
		},

		async addComment() {
			const payload = {
				content: this.newComment,
			};

			this.loading = true;
			try {
				await this.$store.dispatch('addComment', { payload, id: this.id });
				this.newComment = '';
			} finally {
				this.loading = false;
				this.mewComment = '';
				this.$parent.getComments();
			}
		},
		async handleLike() {
			try{
				await this.$store.dispatch('addLike', this.id);
				this.$emit('getData');
			} catch (error) {
				await this.$store.dispatch('deleteLike', error.response.data.id);
				this.$emit('getData');
			}
		},
	},
	computed: {
		remainingCharacters() {
			const remaining = 280 - this.newComment.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
