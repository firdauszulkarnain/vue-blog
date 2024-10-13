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
            if(res.status === 201){
                return { success: true, message: 'Post created successfully!' };
            }else{
                throw new Error(`Unexpected response status: ${res.status}`);
            }
        } catch (err) {
            const errMsg = err.message || 'An error occurred while creating the post';
            return { success: false, message: errMsg };
        }
    }

    const updatePost = async (formData, id) => {
        try {
            let res = await apiClient.put(`/posts/${id}`, formData)
            if(res.status === 200){
                return { success: true, message: 'Post updated successfully!' };
            }else{
                throw new Error(`Unexpected response status: ${res.status}`);
            }
        } catch (error) {
            const errMsg = err.message || 'An error occurred while updating the post';
            return { success: false, message: errMsg };
        }
    }

    const deletePost = async(id) => {
        try {
            let res = await apiClient.delete(`/posts/${id}`)
            if(res.status === 200){
                return { success: true, message: 'Post deleted successfully!' };
            }else{
                throw new Error(`Unexpected response status: ${res.status}`);
            }
        } catch (err) {
            const errMsg = err.message || 'An error occurred while deleted the post';
            return { success: false, message: errMsg };
        }
    }


    return {post, posts, error, getPosts, getDetailPost, createPost, deletePost, updatePost }
}

export default usePostApi