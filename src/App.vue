<script setup>
import { RouterLink, RouterView, useRoute } from 'vue-router'
import NavBar from './components/NavBar.vue'

const route = useRoute()
</script>

<template>
  <v-app :style="{background: $vuetify.theme.themes['light'].bgcolor}">
    <v-layout>
      <nav-bar
        v-if="route.name != 'login'"
        class="navbar"
      />
      <v-main>
        <div class="main">
          <!-- <v-app> -->
          <RouterView />
          <!-- </v-app> -->
        </div>
      </v-main>
    </v-layout>
  </v-app>
</template>

<style>
  .navbar {
    background-color: var(--navbar-main);
  }

.main {
  /* min-height: 100vh; */
  height: 100%;
  margin: 0 2% 0 2%;
  padding: 0;
}

.dp__theme_light {
  --dp-border-color: var(--color-background);
  --dp-border-color-hover: var(--color-background);
  --dp-border-radius: 0;
}

</style>
