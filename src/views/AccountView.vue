<template>
  {{ userData.email }}
</template>

<script setup>
import { reactive } from 'vue';
import { useAuthStore } from '../stores/useAuthStore';
  const authStore = useAuthStore()
  console.log(authStore)
  console.log(authStore.currentUser)
  const userData = reactive(authStore.currentUser)
</script>