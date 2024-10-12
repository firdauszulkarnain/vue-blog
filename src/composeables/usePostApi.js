import apiClient from "@/services/apiClient";
import { ref } from "vue";

const usePostApi = () => {
    const post = ref(null)
    const posts = ref([])
    const error = ref(null)

    const getPosts = async () => {
        try {
            let res = await apiClient.get('/posts')
            if(res.status == 200){
                posts.value = res.data
            }else{
                throw Error('No Data Available')
            }
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    const getDetailPost = async (id) => {
        console.log('id',id)
        try {
            let res = await apiClient.get(`/posts/${id}`)
            if(res.status == 200){
                post.value = res.data
            }else{
                throw Error('No Detail Post Available')
            }
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }

    const createPost = async (formData) => {
        try {
            let res = await apiClient.post('/posts', formData);
            console.log('res', res)
            return res.data;
        } catch (err) {
            error.value = err.message
            console.log(error.value)
        }
    }


    return {post, posts, error, getPosts, getDetailPost, createPost }
}

export default usePostApi