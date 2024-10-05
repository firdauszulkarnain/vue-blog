<template>
  <div class="home">
      <div class="container mt-5">
        <div class="row">
            <div class="input-group mb-3">
                <span class="input-group-text">Search</span>
                <input class="form-control" placeholder="Search Here..." v-model="keyword">
            </div>
            <div class="col-lg-12" v-if="!posts.length">
                Loading...
            </div>
            <div class="col-lg-6 mt-2" v-else v-for="post in matchPost" :key="post.id">
                <Post :post="post"></Post>
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Post from '@/components/Post.vue';
import getPosts from '@/composeables/getPosts';
import { computed, ref, watch } from 'vue';

export default {
  name: 'Home',
  components: {Post},
  setup() {
    const { posts, errors, loadPosts } = getPosts()
    const keyword = ref('')

    loadPosts()
  
    const matchPost = computed(() => {
        return posts.value.filter((post) => post.title.toLowerCase().includes(keyword.value.toLowerCase()))
    })

    return { posts, errors, matchPost, keyword }
  }
}
</script>
