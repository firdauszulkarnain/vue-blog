<template>
  <div class="container">
    <div class="row d-flex justify-content-center mt-5">
        <div class="col-lg-10" v-if="!post">
            Loading...
        </div>
        <div class="col-lg-10" v-else>
            <h1>{{ post.title }}</h1>
            <hr>
            <p>{{ post.body }}</p>
            <div>
                <p class="badge text-bg-success me-1" v-for="tag in post.tags" :key="tag">
                    #{{ tag }}
                </p>
            </div>
            <router-link class="btn btn-sm btn-danger px-3" :to="{name: 'home'}">Kembali</router-link>
        </div>
    </div>
  </div>
</template>

<script>
import usePostApi from '@/composeables/usePostApi';
import { onMounted } from 'vue';
export default {
    props : ['id'],
    setup(props){
        const {post, error, getDetailPost} = usePostApi()

        onMounted(() => {
            getDetailPost(props.id)
        });

        return {post, error}
    }
}
</script>

<style>

</style>