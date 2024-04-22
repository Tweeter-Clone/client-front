<template>
    <div class="mx-auto w-[60%] py-[34px]">
	<nav class="fixed z-20 top-0 left-0 w-full bg-white">
		<a href="/tweet" class="w-[60%] flex items-center mx-auto p-2 border-b-2 border-solid gap-2 text-[16px] hover:opacity-[0.8] uppercase">
            <font-awesome-icon icon="fa fa-arrow-left" /> 
			Comment
        </a>
	</nav>
	<div class="flex flex-col justify-center">
		<CommentForm 		
        v-if="Object.keys(tweet).length !== 0"
        :id="tweet.id"
        :currentId="currentId"
        :userId="tweet.user_id"
        :username="tweet.username"
        :content="tweet.content"
        :comments="tweet.comments"
        :likes="tweet.likes"
        :isLiked="tweet.is_liked"
        :createdAt="tweet.created_at"
        @getData="getCommentss"
             />
         <h2 class="text-xl font-bold p-[24px]">
                All Comments ({{ sortedComment.length }})
        </h2>
		<div v-if="sortedComment.length > 0">
		<CommentCard
        v-for="comment in sortedComment"
        :key="comment.id"
        :id="comment.id"
        :tweetId="tweet.id "
        :isUserTweet="currentId === tweet.user_id "
        :currentId="currentId"
        :userId="comment.user_id"
        :username="comment.username"
        :content="comment.content"
        :createdAt="comment.created_at"
        @getData="getComments"
			/>
		</div>
		<div v-else class="flex justify-center bg-white px-5 py-[24px] text-[#999999] font-semibold text-[24px] items-center uppercase">
		NO COMMENT
	</div>
	</div>
</div>
</template>

<script>
import CommentForm from '@/components/CommentForm.vue';
import CommentCard from '@/components/CommentCard.vue';

export default {
	components: {
		CommentForm,
		CommentCard,
	},
	data() {
		return {
			currentId: parseInt(localStorage.getItem('currentId')) || 0,
			tweet: {},
			commentsData: {},
		};
	},
	mounted() {
		this.getComments();
	},
	methods: {
		async getComments() {
			const tweetId = this.$route.params.id;
			const response = await this.$store.dispatch('getComments', tweetId);
			this.tweet = response.data.data.tweet;
			this.commentsData = response.data.data.comments;
		},
	},
	computed: {
		sortedComment() {
			return this.commentsData
				.slice()
				.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
		},
	},
};
</script>
