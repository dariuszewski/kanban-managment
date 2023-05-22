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
      <div class="main">
        <RouterView />
      </div>
    </v-main>
  </v-layout>
</template>

<style>
  @import './assets/global.css';
  .navbar {
    background-color: var(--navbar-main);
  }

@media (min-width: 1024px) {
  .main {
    min-height: 100vh;
    margin-left: 5%;
    align-items: center;
  }
}
</style>
