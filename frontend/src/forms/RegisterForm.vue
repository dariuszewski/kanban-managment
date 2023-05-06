<script setup>
  import { reactive } from 'vue'

  const rules = {
    login: [
      v => !!v || 'Login is required',
      v =>
        (v &&
          /^[a-zA-Z][a-zA-Z0-9]{2,14}$/.test(v)) ||
        'Login must be 3-15 letters, start with a letter, and not contain special characters'
    ],
    email: [
      v => !!v || 'E-mail is required',
      v => /.+@.+/.test(v) || 'E-mail must be valid'
    ],
    password: [
      v => !!v || 'Password is required',
      v => (v && v.length >= 8) || 'Password must be at least 8 characters long'
    ],
    repeatPassword: [
      v => !!v || 'Repeat Password is required',
      v =>
        (v && v === registerForm.password) ||
        'Passwords must match'
    ]
  }

  const registerForm = reactive({
    login: '',
    email: '',
    password: '',
    repeatPassword: '',
    formValid: false
  })

  
</script>
<template>
  <v-form v-model="registerForm.formValid" lazy-validation>
    <v-text-field
      label="Login"
      type="text"
      placeholder="Enter your login"
      :rules="rules.login"
      v-model="registerForm.login"
    >
    </v-text-field>
    <v-text-field
      label="Email"
      type="email"
      placeholder="Enter your email"
      :rules="rules.email"
      v-model="registerForm.email"
    >
    </v-text-field>
    <v-text-field
      label="Password"
      type="password"
      placeholder="Enter your password"
      :rules="rules.password"
      v-model="registerForm.password"
    >
    </v-text-field>
    <v-text-field
      label="Repeat Password"
      type="password"
      placeholder="Repeat your password"
      :rules="rules.repeatPassword"
      v-model="registerForm.repeatPassword"
    >
    </v-text-field>
    <v-btn
      class="login-btn"
      type="submit"
      :disabled="!registerForm.formValid"
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
