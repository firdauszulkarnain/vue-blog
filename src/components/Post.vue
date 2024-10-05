<template>
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">{{ post.title }}</h5>
    <h6 class="card-subtitle mb-2 badge text-bg-success me-1" v-for="tag in post.tags" :key="tag">
        #{{ tag }}
    </h6>
    <p class="card-text">{{ snippet }}</p>
    <router-link  class="btn btn-success btn-sm px-3" :to="{ name: 'detail', params: {id : post.id} }">Detail</router-link>
  </div>
</div>
</template>

<script>
import { computed } from 'vue';

export default {
    props : ['post'],
    setup(props){
        const snippet = computed(() => {
            return props.post.body.substring(0, 200) + "..."
        })

        return { snippet }
    }
}
</script>

<style>

</style>