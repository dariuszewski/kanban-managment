<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    permanent
    color="#1E293C"
  >
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
      />
    </v-list>
    <v-divider />
    <v-list
      nav
      class="d-flex flex-column"
      height="90vh"
    >
      <nav-bar-item
        path="projects"
        title="Projects"
        icon="mdi-view-dashboard"
      />
      <nav-bar-item
        path="account"
        title="Account"
        icon="mdi-account"
      />
      <v-list-item
        title="Logout"
        prepend-icon="mdi-logout"
        class="mt-auto"
        style="color: white;"
        @click="logout"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
  import { useAuthStore } from '../stores/useAuthStore';
  import NavBarItem from './NavBarItem.vue';
  const authStore = useAuthStore()
  const logout = () => authStore.logout()
</script>

<style scoped>
  a.router-link-active {
    text-decoration: underline;
  }
  a {
    color: black;
    text-decoration: none;
  }
  .v-list-item {
    flex: 0;
  }
</style>