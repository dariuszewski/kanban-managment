<script setup>
  import { ref, reactive, computed, watch } from 'vue'
  import { useUserStore } from "@/stores/user"
  import router from '../router'

  const userStore = useUserStore()
  const isLoggedIn = computed(() => userStore.isLoggedIn)
  const user = computed(() => userStore.user)

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
        const response = await userStore.signIn(loginForm.email, loginForm.password); // this will define global user
        if (user.value) {
          router.push('/');
        } else {
          loginForm.error = 'Email or password is incorrect.';
          console.log(loginForm.error);
        }
      } catch (error) {
        console.log(error)
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
