import axios from "axios";
import { ref } from "vue";

const getDetailPost = (id) => {
    const post = ref(null)
    const error = ref(null)

    const loadDetailPost = async () => {
        try {
            let res = await axios.get(`http://localhost:3000/posts/${id}`)
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

    return { post, error, loadDetailPost }
}

export default getDetailPost