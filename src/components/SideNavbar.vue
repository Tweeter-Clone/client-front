<template>
  <div>
    <div v-if="showCreateTweet" class="fixed z-50 w-screen h-screen">
      <div @click="showCreateTweet = false" class="fixed z-40 w-screen h-screen bg-black opacity-[0.5]"></div>
      <div class="fixed z-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <TweetForm :userId="currentId" :username="currentUsername" @click.stop/>
      </div>
    </div>
    <div class="fixed z-40 h-screen w-1/5 bg-white border-r-2 border-solid">
      <div class="flex flex-col items-center justify-between h-full">
        <div class="p-4">
          <h1 class="text-[24px] mb-[28px]">TweeTopia</h1>
          <div class="flex flex-col gap-8">
            <a href="/tweet" class="text-[18px] text-blue-600 hover:opacity-[0.8]"> <font-awesome-icon icon="fa-solid fa-house" class="mr-[12px]" /> Home</a>
            <button class="text-[18px] bg-blue-600 hover:opacity-[0.8] text-white px-[40px] py-[8px] rounded-[20px]" @click="showCreateTweet = true">New Tweet</button>
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
    </div>
  </div>
</template>

<script>
import TweetForm from '@/components/TweetForm.vue';

export default {
  components: {
    TweetForm,
  },
  name: 'SideNavbar',
  data() {
    return {
      currentId: parseInt(localStorage.getItem('currentId')),
      currentUsername: localStorage.getItem('currentUsername'),
      isFollowing: false,
      showDropdown: false,
      showCreateTweet: false, // Added showCreatePost data property
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
    async getTweets() {
      location.reload();
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

