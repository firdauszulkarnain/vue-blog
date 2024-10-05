import axios from "axios";
import { ref } from "vue";

const getPosts = () => {
    const posts = ref([])
    const error = ref(null)

    const loadPosts = async () => {
        try {
            let res = await axios.get("http://localhost:3000/posts")
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
    return { posts, error, loadPosts }
}

export default getPosts