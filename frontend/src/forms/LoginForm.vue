<script setup>
  import { ref, reactive, computed, watch } from 'vue'

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

  const loginForm = ref({
    email: '',
    password: '',
    formValid: false
  })

</script>
<template>
  <v-form v-model="loginForm.formValid" lazy-validation>
    <v-text-field
      label="Email"
      type="email"
      placeholder="Enter your email"
      :rules="rules.email"
      v-model="loginForm.email"
    ></v-text-field>
    <v-text-field
      label="Password"
      type="password"
      placeholder="Enter your password"
      :rules="rules.password"
      v-model="loginForm.password"
    ></v-text-field>
    <v-btn class="login-btn" type="submit" :disabled="!loginForm.formValid">
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
