<script setup>
  import { reactive, computed } from 'vue'
  import { useUserStore } from "@/stores/user"
  import router from '../router'

  const userStore = useUserStore()
  const user = computed(() => userStore.user)


  const rules = {
    firstName: [
      v => !!v || 'First name is required',
      v =>
        (v &&
          /^[a-zA-Z][a-zA-Z0-9]{2,14}$/.test(v)) ||
        'First name must be 3-15 letters, start with a letter, and not contain special characters'
    ],
    lastName: [
      v => !!v || 'Last name is required',
      v =>
        (v &&
          /^[a-zA-Z][a-zA-Z0-9]{2,14}$/.test(v)) ||
        'Last name must be 3-15 letters, start with a letter, and not contain special characters'      
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
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    repeatPassword: '',
    formValid: false,
    error: false
  })

  const register = async () => {
    registerForm.error = false
    if (registerForm.formValid) {
      try {
        const registeredUser = await userStore.signUp(
          registerForm.firstName,
          registerForm.lastName,
          registerForm.email,
          registerForm.password
        );
        const response = await userStore.signIn(registerForm.email, registerForm.password);
        if (user.value) {
          router.push('/');
        } else {
          registerForm.error = 'Email or password is incorrect.';
          console.log(registerForm.error);
        }
      } catch (error) {
        console.log(error)
      }
    }
  }

  
</script>
<template>
  <v-form 
    v-model="registerForm.formValid" 
    lazy-validation
    @submit.prevent="register"
    >
    <v-text-field
      label="First Name"
      type="text"
      placeholder="Enter your first name"
      :rules="rules.firstName"
      v-model="registerForm.firstName"
    >
    </v-text-field>
    <v-text-field
      label="Last Name"
      type="text"
      placeholder="Enter your last name"
      :rules="rules.lastName"
      v-model="registerForm.lastName"
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
