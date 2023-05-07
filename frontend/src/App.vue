<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()
</script>

<template>
  <div>
    <nav-bar v-if="route.name != 'login'" />
    <RouterView />
  </div>
</template>

<style scoped>

</style>
