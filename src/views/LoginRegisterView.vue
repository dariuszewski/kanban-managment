<script setup>
  import { ref } from 'vue'
  import LoginForm from '../forms/LoginForm.vue'

</script>

<template>
  <div class="container-wrapper">
    <v-container class="centered-container text-center">
      <v-row class="mt-5 text-center">
        <!-- LEFT LANDING -->
        <v-col
          sm="6"
          xs="12"
        >
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

        <v-divider
          vertical
          :thickness="2"
          color="black"
        />
      
        <!-- RIGHT LOGIN -->
        <v-col
          sm="5"
          xs="12"
        >
          <v-row>
            <v-container class="text-center mt-5 mb-2">
              <v-col xs="12">
                <h2 class="mb-5">
                  SIGN IN
                </h2>
                <login-form />
              </v-col>
            </v-container>
          </v-row>
        </v-col>
      <!-- END OF RIGHT LOGIN -->
      </v-row>
    </v-container>
  </div>
</template>


<style scoped>
* {
  font-family: 'Montserrat', sans-serif;
}

.container-wrapper {
  display: flex;
  justify-content: center; /* Horizontally center the container */
  align-items: center; /* Vertically center the container */
  height: 100vh; /* Adjust the height as needed */
}

.login-btn {
  width: 70%;
}
.login-btn:hover {
  background-color: #EDEDED;
  color: black;
}
</style>
