<template>
    <div class="category">
        <div class="container mt-5">
          <div class="row">
              <div class="input-group mb-3">
                  <span class="input-group-text">Search</span>
                  <input class="form-control" placeholder="Search Here..." v-model="keyword">
              </div>
              <div v-if="!categories.length">Loading...</div>
              <div class="row d-flex justify-content-center" v-else>
                <div class="col-lg-6" v-for="category in matchCategories" :key="category.id">
                    <div class="card">
                        <div class="card-body">
                            {{ category.name }}
                        </div>
                    </div>
                </div>
              </div>
          </div>
        </div>
    </div>
</template>
  
<script>
import useCategoriesApi from '@/composeables/useCategoriesApi';
import { computed, ref } from 'vue';
export default {
    name: 'Categories',
    setup() {
        const {categories, errors, getCategories} = useCategoriesApi()
        const keyword = ref('')
        getCategories()

        const matchCategories = computed(() => {
            return categories.value.filter((category) => category.name.toLowerCase().includes(keyword.value));
        })

        return { categories, errors, keyword, matchCategories }
    }
}
</script>
  