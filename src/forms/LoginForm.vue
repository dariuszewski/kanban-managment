<script setup>
  import { ref, reactive, computed, watch } from 'vue'
import { useAuthStore } from '../stores/useAuthStore';
import TheWelcome from '../components/TheWelcome.vue';
import { auth } from '../components/firebase/config';

  const authStore = useAuthStore()
  // form validation
  const rules = {
    email: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be at least 8 characters long'
    ]
  }

  const loginForm = reactive({
    email: '',
    password: '',
    formValid: false,
    error: false
  })

  const login = async () => {
    loginForm.error = false
    if (loginForm.formValid) {
      try {
        await authStore.login(loginForm.email, loginForm.password)
      } catch (err) {
        console.log(err)
        loginForm.error = "Incorrect email or password"
      }
    }
  }

</script>
<template>
  <v-form 
    v-model="loginForm.formValid" 
    lazy-validation
    @submit.prevent="login"
  >
    <!-- alert modal -->
    <v-alert
      v-if="loginForm.error"
      color="red"
      class="mt-2 mb-5"
      :dismissible="true"
    >
      {{ loginForm.error }}
      <template #close>
        <v-icon @click="loginForm.error = false">
          mdi-close
        </v-icon>
      </template>
    </v-alert>
    <!-- end of alert modal -->

    <v-text-field
      v-model="loginForm.email"
      label="Email"
      type="email"
      placeholder="Enter your email"
      :rules="rules.email"
    />
    <v-text-field
      v-model="loginForm.password"
      label="Password"
      type="password"
      placeholder="Enter your password"
      :rules="rules.password"
    />
    <v-btn
      class="login-btn"
      type="submit"
      :disabled="!loginForm.formValid"
    >
      Submit
    </v-btn>
  </v-form>
</template>


<style scoped>
  .login-btn:hover {
    background-color: #EDEDED;
    color: black;
  }
</style>
