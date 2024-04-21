<template>
  <div class="fixed z-40 h-screen w-1/5 bg-white border-r-2 border-solid">
    <div class="flex flex-col items-center justify-between h-full">
      <div class="p-4">
        <h1 class="text-[24px] mb-[28px]">TweeTopia</h1>
        <div class="flex flex-col gap-8">
            <a href="/tweet" class="text-[18px] text-blue-600 hover:opacity-[0.8]"> <font-awesome-icon icon="fa-solid fa-house" class="mr-[12px]" /> Home</a>
            <a href="#" class="text-[18px] bg-blue-600 hover:opacity-[0.8] text-white px-[40px] py-[8px] rounded-[20px]">New Post</a>
         </div>
      </div>
      <div class="flex items-center justify-between w-full px-[20px] py-[10px]">
        <div class="flex items-center">
        <img
					src="@/assets/devcode-logo.png"
					class="mx-auto rounded-full mr-[8px]"
					alt="Vite logo"
					width="50"
					height="50"
				/>
        <h1>{{ currentUsername }}</h1>
      </div>
      <div class="relative">
						<button @click="toggleDropdown" class="focus:outline-none" @click.stop>
							<font-awesome-icon icon="fa-solid fa-ellipsis-h" />
						</button>
						<div v-if="showDropdown" class="absolute top-[-20px] left-[20px] py-2 w-48 bg-white rounded-md shadow-xl z-20" @click.stop>
							<a class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer" @click="logout">Logout</a>
						</div>
					</div>
      </div>
    </div>
    <div class="fixed z-40 h-screen w-1/5 bg-white border-l-2 border-solid top-0 right-0"></div>
  </div>
</template>

<script>
export default {
  name: 'SideNavbar',
};
</script>

<script>
export default {
	data() {
		return {
      currentId: parseInt(localStorage.getItem('currentId')),
			currentUsername: localStorage.getItem('currentUsername'),
			isFollowing: false,
      showDropdown: false,
		};
	},
	async mounted(){
		await this.authenticated();
	},
	methods: {
    toggleDropdown() {
			this.showDropdown = !this.showDropdown; // Toggle dropdown visibility
		},
		logout() {
			localStorage.clear();
			this.$router.push('/login');
		},
		async authenticated() {
			try{
				await this.$store.dispatch('authenticated');
			}catch (error) {
				console.log(error);
			} 
		},
	},
};
</script>
