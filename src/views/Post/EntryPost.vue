<template>
  <div class="container">
    <div class="row d-flex justify-content-center">
        <div class="col-lg-8 mt-5">
            <div class="card">
                <form action="" @submit.prevent="handleSubmit" @keydown.enter.prevent>
                    <div class="card-body">
                        <div class="mb-3">
                            <label class="form-label">Title</label>
                            <input class="form-control" v-model="form.title" >
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Category</label>
                            <select class="form-select" v-model="form.category" >
                                <option v-for="category in categories" :key="category.id" :value="category.name">{{ category.name }}</option>
                            </select>
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Tags</label>
                            <input class="form-control text-capitalize" v-model="form.tag" @keydown.enter.prevent="addTags" >
                            <div class="d-flex flex-wrap mt-3">
                                <div v-for="tag in form.tags" :key="tag" class="me-2">
                                    <button type="button" class="btn btn-sm px-3 btn-secondary text-capitalize" @click="removeTag(tag)">{{ tag }}</button>
                                </div>
                            </div>
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
import useCategoriesApi from '@/composeables/useCategoriesApi';
import useNotification from '@/composeables/useNotification';
import { useRoute, useRouter } from 'vue-router'; 

export default {
    name: 'Entry Post',
    setup(){
        const { post, error, createPost, getDetailPost, updatePost } = usePostApi()
        const { categories, getCategories } = useCategoriesApi()
        const { showSuccess, showError } = useNotification()
        const router = useRouter();
        const route = useRoute();

        const form = ref({
            'title' : '',
            'body' : '',
            'category' : '',
            'tag': '',
            'tags': []
        })

        onMounted(async () => {
            if(route.params.id){
                await getDetailPost(route.params.id)
                Object.assign(form.value, {
                    title: post.value.title,
                    body: post.value.body,
                    category: post.value.category,
                    tags : post.value.tags
                });
            }
            getCategories()
        })

        const handleSubmit = async () => {
            let result;
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

        const addTags = () => {
            if(form.value.tag && !form.value.tags.includes(form.value.tag)){
                form.value.tags.push(form.value.tag)
                form.value.tag = '';
            }
        }

        const removeTag = (selectedTag) => {
            form.value.tags = form.value.tags.filter((tag) => {
                return selectedTag !== tag
            })
        }

        return {form, handleSubmit, error, post, categories, addTags, removeTag}
    }
}
</script>

<style>

</style>