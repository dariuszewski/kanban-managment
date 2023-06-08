<template>
  <v-app>
    <v-main class="d-flex align-center justify-center">
      <v-card color="#1E293C" dark class="pa-6 text-center" style="width: 800px; max-width: 90vw;">
        <v-card-text>
          <v-row justify="center" class="mb-10">
            <v-img :src="logo" aspect-ratio="1.7"></v-img>
          </v-row>
          <h1 class="display-2 mt-10" style="color: white; font-size: 5rem;">404</h1>
          <h3 class="headline mt-5" style="color: white;">Page not found</h3>
          <p class="body-2 mt-5" style="color: white;">We're sorry, but the page you are looking for doesn't exist or has been moved.</p>
          <v-btn color="white" class="mt-5 rounded-pill elevation-3" router to="/projects">Take me back</v-btn>
        </v-card-text>
      </v-card>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'NotFoundView',
  data() {
    return {
      logo: 'dunder.png'
    }
  }
}
</script>

<style scoped>
.v-main {
  min-height: 100vh;
  justify-content: center;
  align-items: center;
}
</style>
