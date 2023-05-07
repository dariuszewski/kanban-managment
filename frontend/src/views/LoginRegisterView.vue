<script setup>
  import { ref } from 'vue'
  import LoginRegisterForms from '../components/LoginRegister.vue'

  const showLoginForm = ref(false)

</script>

<template>
  <v-app >
  <v-container class="text-center">
    <v-row class="mt-5 text-center">

      <!-- LEFT LANDING -->
      <v-col sm="6" xs="12">
        <v-container class="text-center">
          <h1>Kanban Managment</h1>
          <v-img
            alt="Vue logo"
            src="./src/assets/Dunder-Mifflin-Symbol.png"
            width="250"
            height="250"
            class="mx-auto"
          />
          <p>Fly through your workflow with <br> our kanban management system.</p>
        </v-container>
      </v-col>
      <!-- END OF LEFT LANDING -->
      <v-divider vertical :thickness="2" color="black"></v-divider>
      <!-- RIGHT LOGIN -->
      <v-col sm="5" xs="12">
        <v-row>
          <v-container class="text-center mt-5 mb-2">
            <v-col xs="12">
                <h2 class="mb-5">GET STARTED</h2>
            </v-col>
            <v-col md-12 class="mt-2">
              <v-btn 
                prepend-icon="mdi-email-outline" 
                variant="outlined"
                rounded="xl" 
                class="login-btn"
                @click="showLoginForm = !showLoginForm"
                >Email</v-btn>
            </v-col>
            <v-col sm-12 class="mt-1">
              <v-btn 
                prepend-icon="mdi-google" 
                variant="outlined"
                rounded="xl" 
                class="login-btn"
                disabled
                >Google</v-btn>
            </v-col>
            <v-col sm-12 class="mt-1">
              <v-btn 
                prepend-icon="mdi-microsoft" 
                variant="outlined"
                rounded="xl" 
                class="login-btn"
                disabled
                >Microsoft</v-btn>
            </v-col>
          </v-container>
        </v-row>
      </v-col>
      <!-- END OF RIGHT LOGIN -->
      
    </v-row>

    <v-dialog 
      v-model="showLoginForm" 
      max-width="500"
      max-height="600"
      >
      <login-register-forms />
    </v-dialog>

    </v-container>
  </v-app>
</template>


<style scoped>
h2, p {
  font-family: 'Montserrat', sans-serif;
}
.login-btn {
  width: 70%;
}
.login-btn:hover {
  background-color: #EDEDED;
  color: black;
}
</style>
