<template>
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">{{ post.title }}</h5>
    <h6 class="card-subtitle mb-2 badge text-bg-success me-1" v-for="tag in post.tags" :key="tag">
        #{{ tag }}
    </h6>
    <p class="card-text">{{ snippet }}</p>
    <router-link  class="btn btn-success btn-sm px-3" :to="{ name: 'detail', params: {id : post.id} }">Detail</router-link>
	<router-link class="btn btn-sm btn-primary px-3 ms-1" :to="{ name : 'entry', params: {id: post.id}}">Update</router-link>
    <button class="btn btn-sm btn-danger px-3 ms-1" @click="handleDelete">Delete</button>
  </div>
</div>
</template>

<script>
import { computed } from 'vue';
import usePostApi from '@/composeables/usePostApi';
import useNotification from '@/composeables/useNotification';

export default {
    props : ['post'],
    setup(props, {emit}){
		const { deletePost } = usePostApi()
        const { showConfirm, showSuccess, showError } = useNotification()
        const snippet = computed(() => {
            return props.post.body.substring(0, 200) + "..."
        })


		const handleDelete = async () => {
            const confirmed = await showConfirm()
            if(confirmed){
                const result = await deletePost(props.post.id)
                if(result.success){
                    showSuccess(result.message).then(() => {
                        emit('postDeleted', props.post.id);
                    })
                }else{
                    showError(result.message)
                }
            }
		}

        return { snippet, handleDelete }
    }
}
</script>

<style>

</style>