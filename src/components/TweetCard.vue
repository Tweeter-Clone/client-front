<template>
	<div class="rounded p-5 border-inherit" @click="showDropdown = false">
		<div class="flex gap-5 pb-5">
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
					<p>
						<span class="font-black">{{ username }}</span>
						<span class="text-gray-400"
							>@{{ username.replace(/\s/g, '') }}{{ userId }}</span
						>
						<span class="mx-[4px]">·</span>
						<span class="text-gray-500">{{ formatTimeAgo(createdAt === updatedAt ? createdAt : updatedAt) }}</span>
					</p>
					<div class="relative">
						<button @click="toggleDropdown" class="focus:outline-none" @click.stop>
							<font-awesome-icon icon="fa-solid fa-ellipsis-h" />
						</button>
						<div v-if="showDropdown && !editMode" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20" @click.stop>
							<a v-if="currentId === userId" @click.prevent="toggleEditMode" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Edit</a>
							<a v-if="currentId === userId" @click.prevent="deleteTweet" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Delete</a>
							<a v-if="currentId !== userId"  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Follow</a>
						</div>
					</div>
				</div>
				<p v-if="!editMode">{{ content }}</p>
				<form v-if="editMode" @submit.prevent="updateTweet">
					<textarea
						v-model="tweet"
						class="w-full mt-2 p-2 border-gray-300 rounded-md resize-none block"
						placeholder="What's happening?"
						rows="3"
						cols="100"
					></textarea>
					<div class="flex justify-between items-center mt-2">
						<button
							:disabled="tweet.trim() === '' || loading"
							@click="updateTweet"
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 disabled:opacity-75"
						>
							{{ loading ? 'Loading...' : 'Save' }}
						</button>
						<span
							:class="{ 'text-red-500': tweet.length > 280 }"
							class="text-gray-500"
						>
							{{ remainingCharacters }} characters remaining
						</span>
					</div>
				</form>
			</div>
		</div>
		<div class="flex justify-between">
			<div class="flex items-center">
				<p class="text-gray-500">{{ formatCreatedAt(createdAt === updatedAt ? createdAt : updatedAt) }} </p>
				<p v-if="createdAt !== updatedAt"><span class="mx-[4px]">·</span><span class="text-gray-500">{{ createdAt === updatedAt ? '' : 'Edited' }}</span></p>
			</div>
			<div class="action flex justify-end gap-5">
				<button class="hover:text-gray-500">
					<font-awesome-icon icon="far fa-comment" /> Comment (0)</button
				>
				<button
					type="button"
					class="hover:text-gray-500"
				>
					<font-awesome-icon icon="far fa-heart" /> Love (0)
				</button>
			</div>
		</div>
	</div>
</template>

<script>
// NOTE: date-fns ini untuk menggunakan fungsi format tanggal agar seperti (10 November 2023)
import { format } from 'date-fns';

export default {
	props: {
		id: Number,
		currentId: Number,
		userId: Number,
		username: String,
		content: String,
		createdAt: String,
		updatedAt: String,
	},
	data() {
		return {
			editMode: false,
			tweet: '',
			loading: false,
			showDropdown: false, // Added state to control dropdown visibility
		};
	},
	methods: {
		toggleDropdown() {
			this.showDropdown = !this.showDropdown; // Toggle dropdown visibility
		},
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

		async deleteTweet() {
			const confirmation = confirm(
				'Are you sure you want to delete this tweet?'
			);
			if (confirmation) {
				await this.$store.dispatch('deleteTweet', this.id);
				this.$parent.getTweet();
			}
		},
		toggleEditMode() {
			this.editMode = !this.editMode;
			if (this.editMode) {
				this.tweet = this.content;
			}
		},
		async updateTweet() {
			this.loading = true; // Set loading state
			try {
				const payload = {
					id: this.id,
					content: this.tweet,
				};
				await this.$store.dispatch('updateTweet', payload);
			} finally {
				this.loading = false;
				this.toggleEditMode();
				this.$parent.getTweet();
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
