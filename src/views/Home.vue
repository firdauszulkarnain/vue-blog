<template>
  <div class="home">
      <div class="container mt-5">
        <div class="row">
			<div class="col-lg-12">
				<router-link class="btn btn-success mb-3" :to="{name: 'entry'}">Make A Post</router-link>
			</div>
            <div class="input-group mb-3">
                <span class="input-group-text">Search</span>
                <input class="form-control" placeholder="Search Here..." v-model="keyword">
            </div>
            <div class="col-lg-12" v-if="!posts.length">
                Loading...
            </div>
            <div class="col-lg-6 mt-2" v-else v-for="post in matchPost" :key="post.id">
                <Post :post="post" @postDeleted="removePost"></Post>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';
import usePostApi from '@/composeables/usePostApi';
import { computed, onMounted, ref, watch } from 'vue';

export default {
  name: 'Home',
  components: {Post},
  setup() {
    const { posts, errors, getPosts } = usePostApi()
    const keyword = ref('')

    onMounted(() => {
      getPosts()
    })
  
    const matchPost = computed(() => {
        return posts.value.filter((post) => post.title.toLowerCase().includes(keyword.value.toLowerCase()))
    })

    const removePost = (postId) => {
		posts.value = posts.value.filter(post => post.id !== postId);
    };

    return { posts, errors, matchPost, keyword, removePost }
  }
}
</script>
