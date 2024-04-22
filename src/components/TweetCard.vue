<template>
	<div class="rounded p-5 border border-inherit" @click="showDropdown = false">
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
					<p class="text-[14px]">
						<span class="font-semibold">{{ username }}</span>
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
						<div v-if="showDropdown" class="absolute right-0 mt-2 py-2 w-48 bg-white rounded-md shadow-xl z-20" @click.stop>
							<a v-if="currentId === userId" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-[14px]">Edit</a>
							<a v-if="currentId === userId" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer text-[14px]">Delete</a>
                            <a v-if="currentId !== userId" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Follow</a>
						</div>
					</div>
				</div>
				<p class="whitespace-pre-line text-[14px]">{{ content }}</p>
			</div>
		</div>
		<div class="flex justify-between">
			<div class="flex items-center">
				<p class="text-gray-500 text-[14px]">{{ formatCreatedAt(createdAt === updatedAt ? createdAt : updatedAt) }} </p>
				<p v-if="createdAt !== updatedAt" class="text-[14px]"><span class="mx-[4px]">·</span><span class="text-gray-500">{{ createdAt === updatedAt ? '' : 'Edited' }}</span></p>
			</div>
			<div class="action flex justify-end gap-5">
				<button class="hover:text-gray-500 text-[14px]">
					<font-awesome-icon icon="far fa-comment" /> Comment (0)</button
				>
				<button
					type="button"
					class="hover:text-gray-500 text-[14px]"
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
			tweet: '',
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
	},
	computed: {
		remainingCharacters() {
			const remaining = 280 - this.tweet.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
