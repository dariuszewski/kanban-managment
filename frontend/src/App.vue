<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()
</script>

<template>
  <v-layout>
    <nav-bar v-if="route.name != 'login'" />
    <v-main>
      <RouterView />
    </v-main>
  </v-layout>
</template>

<style scoped>

</style>
