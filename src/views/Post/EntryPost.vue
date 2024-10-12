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
import { ref } from 'vue';
import usePostApi from '@/composeables/usePostApi';
import { useRouter } from 'vue-router'; 

export default {
    name: 'Entry Post',
    setup(){
        const {error, createPost} = usePostApi()
        const router = useRouter();
        const form = ref({
            'title' : '',
            'body' : '',
            'category' : {
                'id' : 1,
                'name' : 'Programming'
            },
            'tags': ["Programming", "Web"]
        })

        const handleSubmit = async () => {
            const result = await createPost(form.value);
            if(result){
                router.push({name: 'home'})
            }
        }

        return {form, handleSubmit, error}
    }
}
</script>

<style>

</style>