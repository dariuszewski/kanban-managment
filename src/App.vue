<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()
</script>

<template>
  <v-layout>
    <nav-bar
      v-if="route.name != 'login'"
      class="navbar"
    />
    <v-main>
        <v-card class="main">
          <RouterView />
        </v-card>
    </v-main>
  </v-layout>
</template>

<style>
  @import './assets/global.css';
  .navbar {
    background-color: var(--navbar-main);
  }

.main {
  min-height: 100vh;
  margin: 0 2% 0 2%;
}

</style>
