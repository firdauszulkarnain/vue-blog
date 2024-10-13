<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
        <div class="col-lg-8 mt-5">
            <div class="card">
                <form action="" @submit.prevent="handleSubmit">
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <input class="form-control" v-model="form.title">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Body</label>
                            <textarea class="form-control" rows="7" v-model="form.body"></textarea>
                        </div>
                        <button class="btn btn-success">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue';
import usePostApi from '@/composeables/usePostApi';
import useNotification from '@/composeables/useNotification';
import { useRoute, useRouter } from 'vue-router'; 

export default {
    name: 'Entry Post',
    setup(){
        const { post, error, createPost, getDetailPost, updatePost } = usePostApi()
        const { showSuccess, showError } = useNotification()
        const router = useRouter();
        const route = useRoute();

        const form = ref({
            'title' : '',
            'body' : '',
            'category' : {
                'id' : 1,
                'name' : 'Programming'
            },
            'tags': ["Programming", "Web"]
        })

        onMounted(async () => {
            if(route.params.id){
                await getDetailPost(route.params.id)
                form.value.title = post.value.title
                form.value.body = post.value.body
            }
        })

        const handleSubmit = async () => {
            let result, msg;
            if(route.params.id){
                result = await updatePost(form.value, route.params.id)
            }else{
                result = await createPost(form.value);
            }

            if(result.success){
                showSuccess(result.message).then(() => {
                    router.push({ name: 'home' });
                })
            }else{
                showError(result.message)
            }
        }

        return {form, handleSubmit, error, post}
    }
}
</script>

<style>

</style>