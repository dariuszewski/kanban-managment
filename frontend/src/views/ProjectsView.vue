<script setup>
import { ref, computed, defineProps } from 'vue'
import { createPinia } from 'pinia'
import { useUserStore } from "@/stores/user"

import NavBar from '../components/NavBar.vue'

const props = defineProps({
  secondaryColor: {
    type: String,
    default: '#FF0000' // replace with your own default color
  }
})

const pinia = createPinia()
const userStore = useUserStore(pinia)

const user = computed(() => userStore.user)
console.log(user.value)
</script>


<template>
  <v-container>
  <nav-bar /> 
    <v-row class="mt-5">
      <h1>Hello, {{ user.firstName }}</h1>
    </v-row>
    <v-row class="mt-12 ml-3">
      <h3><i>Select a project...</i></h3>
    </v-row>
    <v-row class="mt-12">
      <v-card 
        class="d-flex align-center" 
        height="200" 
        width="200"
      >
        <div class="text-center">
          <v-card-text class="project-name">Scranton Branch General</v-card-text>
          
        </div>
      </v-card>
    </v-row>
  </v-container>
</template>


<style scoped>
  h3 {
    color:rgb(219, 219, 219)
  }
  .project-name {
    font-size: 20px;
  }
</style>