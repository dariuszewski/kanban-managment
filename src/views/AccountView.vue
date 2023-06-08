<template>
  <v-app>
    <v-main class="d-flex align-center justify-center" style="height: 100vh;">
      <v-container fluid>
        <h2 class="mb-3" style="color: #1E293C; font-size: 60px;">Settings</h2>
        <v-row>
          <v-col cols="5">
            <v-card class="pa-4">
              <v-form ref="form" v-model="valid">
                <v-text-field
                  v-model="form.firstName"
                  label="First Name"
                  disabled
                  class="mb-10"
                ></v-text-field>
                <v-text-field
                  v-model="form.lastName"
                  label="Last Name"
                  disabled
                  class="mb-10"
                ></v-text-field>
                <v-text-field
                  v-model="form.email"
                  label="E-mail"
                  disabled
                  class="mb-10"
                ></v-text-field>
                <v-text-field
                  v-model="form.color"
                  label="Color"
                  readonly
                  class="mb-10"
                  append-icon="mdi-palette"
                  @click:append="toggleColorPicker"
                ></v-text-field>
                
                <v-btn :color="'#1E293C'" block style="color: white;" @click="submit">Save</v-btn>
              </v-form>
            </v-card>
          </v-col>
          <v-col cols="3">
            <v-card class="pa-4 d-flex align-center justify-center transparent">
              <v-avatar size="250" v-bind:style="{ backgroundColor: form.color }">
                <span class="headline" style="font-size: 50px;">{{ getInitials() }}</span>
              </v-avatar>
            </v-card>
            <v-card class="pa-4 d-flex transparent">
              <v-color-picker
                  v-if="showColorPicker"
                  v-model="form.color"
                  hide-canvas
                  hide-inputs
                  hide-mode-switch
                  @input="hideColorPicker"
                ></v-color-picker>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import usersMock from "@/usersMock.js";

const showColorPicker = ref(false)


function getInitials() {
  return firstName.charAt(0).toUpperCase() + lastName.charAt(0).toUpperCase();
}


export default {
  data() {
    return {
      valid: true,
      form: {
        firstName: 'sztywny',
        lastName: 'wpis',
        email: 'z bazy',
        color: '#FF00FF',
      },
      showColorPicker: false,
    };
  },
  methods: {
    getInitials() {
      let initials =
        this.form.firstName.charAt(0).toUpperCase() +
        this.form.lastName.charAt(0).toUpperCase();
      return initials;
    },
    toggleColorPicker() {
      this.showColorPicker = !this.showColorPicker;
    },
    hideColorPicker() {
      this.showColorPicker = false;
    },
    submit() {
      // Metoda obsługująca zapis danych
    },
  },
};
</script>

<style scoped>
.v-card.transparent {
  background-color: transparent !important;
  box-shadow: none !important;
}
</style>
