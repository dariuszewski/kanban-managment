<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()
</script>

<template>
  <div>
    <v-container>
    <v-row>
      <v-col class="sm-1">
      <nav-bar v-if="route.name != 'login'" />
      </v-col>
      <v-col class="sm-11">
      <RouterView />
      </v-col>
    </v-row>
    </v-container>
    test
    
  </div>
</template>

<style scoped>

</style>
