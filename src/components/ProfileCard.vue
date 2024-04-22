<template>
	<div class="rounded p-5 my-2 border border-inherit" @click="showDropdown = false">
		<div class="flex gap-5 pb-5">
			<img
				v-if="currentId !== id"
				:src="`https://source.unsplash.com/random/200x200?sig=${id}`"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<img
				v-else
				:src="`http://localhost:3030/${image}`"
				alt="profile"
				class="rounded-full w-14 h-14"
			/>
			<div class="w-full">
				<div class="flex justify-between w-full">
					<p class="text-[14px]">
						<span class="font-semibold">{{ username }}</span>
						<span class="text-gray-400"
							>@{{ username.replace(/\s/g, '') }}{{ id }}</span
						>
					</p>
                        <p class="text-gray-500 text-[14px]">{{ formatCreatedAt(createdAt) }} </p>
				</div>
				<div class="flex items-center my-[4px]">
					<p class="text-gray-500 text-[14px]"><span class="font-semibold text-black">{{ followers }}</span> Followers</p>
					<button v-if="currentId !== id" @click="handleFollower" :class="`${isFollowed !== 0 ? 'bg-red-500' : 'bg-blue-500'} text-sm text-white px-[16px] py-[4px] rounded hover:opacity-[0.8] ml-2 text-[14px]`">{{ isFollowed !== 0 ? 'Unfollow' : 'Follow' }}</button>
					<button v-else-if="!editMode" @click="toggleEditMode" class="bg-blue-500 text-sm text-white px-[16px] py-[4px] rounded hover:opacity-[0.8] ml-2 text-[14px]">Edit</button>
				</div>
				<form v-if="editMode" @submit.prevent="updateUser">
                    <div class="mb-[8px]">
                    <label for="username" class="text-md font-semibold block mb-2 text-[14px]">Change Picture</label>
					<div v-if="previewImage" class="mb-2">
                        <img :src="previewImage" alt="preview image" class="rounded w-20 h-20 object-cover">
                    </div>
                    <button type="button" @click="$refs.fileInput.click()" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 text-[14px]">Upload Image</button>
                    <input type="file" ref="fileInput" @change="handleFileUpload" accept="image/*" class="hidden" />
                    </div>
                    <div>
                    <label for="username" class="text-md font-semibold mb-2 text-[14px]">Change Username</label>
                    <input id="username" v-model="usernameInput" @input="validateUsername" class="w-full mt-[4px] p-2 border border-gray-300 rounded-md resize-none block text-[14px]"/>
                    <p v-if="!isUsernameValid" class="text-red-500 mt-1 text-[14px]">Please use only letters and numbers.</p>
                    </div>
					<div class="flex justify-between items-center mt-2">
						<button
							:disabled="usernameInput.trim() === '' || !isUsernameValid || loading"
							@click="updateUser"
							class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-400 disabled:opacity-75 text-[14px]"
						>
							{{ loading ? 'Loading...' : 'Save' }}
						</button>
						<span
						:class="`${usernameInput.length > 280 ? 'text-red-500' : 'text-gray-500'} text-[14px]`"
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
// NOTE: date-fns ini untuk menggunakan fungsi format tanggal agar seperti (10 November 2023)
import { format } from 'date-fns';

export default {
	props: {
		id: Number,
		currentId: Number,
        image: String,
		username: String,
		followers: Number,
		isFollowed: Number,
		createdAt: String,
	},
	data() {
		return {
			editMode: false,
			usernameInput: '',
			loading: false,
			selectedFile: null,
			isUsernameValid: true,
			previewImage: null,
		};
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

		toggleEditMode() {
			this.editMode = !this.editMode;
			if (this.editMode) {
				this.usernameInput = this.username;
			}
		},
		async updateUser() {
			this.loading = true; // Set loading state
			try {
				const payload = {
					id: this.id,
					username: this.usernameInput,
					image: this.selectedFile,
				};
				const request = await this.$store.dispatch('updateUser', payload);
                
                if (request.request.status === 200) {
                    alert('User updated successfully');
					window.location.href = '/profile/' + request.data.data.username;
				} else if (request.response.status === 400) {
					alert(request.response.data.message);
				}
			} finally {
				this.loading = false;
				this.toggleEditMode();
				this.$parent.getTweets();
			}
		},
		async handleFollower() {
			try{
				await this.$store.dispatch('addFollower', this.id);
				this.$emit('getData');
			} catch (error) {
				await this.$store.dispatch('deleteFollower', error.response.data.id);
				this.$emit('getData');
			}
		},
		handleFileUpload(event) {
			this.selectedFile = event.target.files[0];
			this.previewImage = URL.createObjectURL(event.target.files[0]);
		},
		validateUsername() {
			const regex = /^[a-zA-Z0-9]+$/;
			this.isUsernameValid = regex.test(this.usernameInput);
		},
	},
	computed: {
		remainingCharacters() {
			const remaining = 50 - this.usernameInput.length;
			return remaining < 0 ? 0 : remaining;
		},
	},
};
</script>
