import apiClient from "@/services/apiClient";
import { ref } from "vue";

const useCategoriesApi = () => {
    const categories = ref([])
    const errors = ref(null)

    const getCategories = async () => {
        try {
            let res = await apiClient('/categories')
            if(res.status == 200){
                categories.value = res.data
            }else{
                throw Error('No Data Categories')
            }
        } catch (err) {
            errors.value = err.message
            console.log(errors.value)
        }
    }

    return {categories, errors, getCategories}
}

export default useCategoriesApi