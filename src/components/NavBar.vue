<script setup>
import { ref, computed, defineProps } from 'vue'
import router from '../router'
import { createPinia } from 'pinia'
import { useUserStore } from "@/stores/user"
import NavBar from '../components/NavBar.vue'


const pinia = createPinia()
const userStore = useUserStore(pinia)

const user = computed(() => userStore.user)
const email = user.value.email || "dev.mail@example.com"
const parts = email.split('@')[0].split('.')
const name = parts[0].charAt(0).toUpperCase() + parts[0].substring(1).toLowerCase()
const surname = parts[1].charAt(0).toUpperCase() + parts[1].substring(1).toLowerCase()

console.log(user.value)

</script>
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
        :title="name + ' ' + surname"
        :subtitle="user.email"
      />
    </v-list>

    <v-divider />

    <v-list
      nav
    >
      <v-list-item-group>
        <router-link
          to="/projects"
          style="text-decoration: none; color: inherit;"
        >
          <v-list-item
            title="Projects"   
          > 
              <template v-slot:prepend>
                <v-icon icon="mdi-folder" style="color: #FFFFF;" />
              </template>
          </v-list-item>
        </router-link>
        <v-list-item
          prepend-icon="mdi-account-multiple"
          title="Shared with me"
          value="shared"
        />
        <v-list-item
          prepend-icon="mdi-star"
          title="Starred"
          value="starred"
        />
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<style scoped>
  a.router-link-active {
    text-decoration: underline;
  }
  a {
    color: black;
    text-decoration: none;
  }
</style>