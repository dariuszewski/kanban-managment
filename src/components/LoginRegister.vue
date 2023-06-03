<script setup>
  import { ref, computed } from 'vue'
  import LoginForm from '../forms/LoginForm.vue'
  import RegisterForm from '../forms/RegisterForm.vue'

  const activeTabIndex = ref(0)

  const activeTab = computed(() => {
    return activeTabIndex.value === 0 ? 'login' : 'register'
  })
</script>


<template>
  <v-card>
    <v-tabs v-model="activeTabIndex">
      <v-tab>Log In</v-tab>
      <v-tab>Register</v-tab>
    </v-tabs>

    <v-card-text>
      <login-form v-show="activeTab === 'login'" />
      <register-form v-show="activeTab === 'register'" />
    </v-card-text>
  </v-card>
</template>


<style scoped>

.login-btn:hover {
  background-color: #EDEDED;
  color: black;
}

</style>
