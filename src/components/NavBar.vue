<template>
  <v-navigation-drawer
    expand-on-hover
    rail
    permanent
    color="#1E293C"
    style="position: fixed;"
  >
    <v-list
      nav
    >
      <v-list-item>
        <template #prepend>
          <v-avatar
            :color="componentData.color"
            style="font-size: 80%;"
          >
            {{ componentData.initials }}
          </v-avatar>
        </template>
        <v-list-item-title style="color: white ">
          {{ componentData.fullName }}
        </v-list-item-title>
      </v-list-item>
    </v-list>
    <v-divider />
    <v-list
      nav
      height="90%"
      class="d-flex flex-column"
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
  import { onMounted, reactive} from 'vue';
  import { db } from '../components/firebase/config'
  import {getDoc, doc} from 'firebase/firestore'
  import NavBarItem from './NavBarItem.vue';
  const authStore = useAuthStore()

  const componentData = reactive({
    color: '',
    initials: '',
    fullName: '',
  })

  onMounted(async ()=>{
    const resp = await getDoc(doc(db, "users", authStore.currentUser.uid))
    const data = resp.data()
    componentData.initials = data.firstName.charAt(0).toUpperCase() + data.lastName.charAt(0).toUpperCase()
    componentData.color = data.color
    componentData.fullName = data.firstName + " " + data.lastName
  })

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