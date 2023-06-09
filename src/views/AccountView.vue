<template>
  <v-app>
    <v-main
      class="d-flex align-center justify-center"
    >
      <v-container fluid>
        <h2
          class="mb-3"
          style="color: #1E293C; font-size: 60px;"
        >
          Profile 
        </h2>
        <v-row>
          <v-col
            cols="12"
            sm="5"
            md="5"
          >
            <v-card class="pa-4">
              <v-form class="flex-sm-column">
                <v-alert
                  v-if="form.success"
                  class="mt-2 mb-5 bg-success"
                  :dismissible="true"
                >
                  {{ form.successText }}
                </v-alert>
                <v-text-field
                  v-model="form.firstName"
                  label="First Name"
                  :hint="hintText"
                  readonly 
                  class="mb-10"
                />
                <v-text-field
                  v-model="form.lastName"
                  label="Last Name"
                  :hint="hintText"
                  readonly 
                  class="mb-10"
                /> 
                <v-text-field
                  v-model="form.email"
                  label="E-mail"
                  :hint="hintText"
                  readonly 
                  class="mb-10"
                />
                <v-text-field
                  v-model="form.color"
                  label="Color"
                  readonly
                  class="mb-10"
                  append-icon="mdi-palette"
                  @click:append="toggleColorPicker"
                />
                
                <v-btn
                  :color="'#1E293C'"
                  block
                  style="color: white;"
                  @click="submit"
                >
                  Save
                </v-btn>
              </v-form>
            </v-card>
          </v-col>
          <v-col class="d-flex-column">
            <v-card class="pa-4 d-flex justify-center transparent">
              <v-avatar
                v-show="showAvatar"
                size="250"
                :style="{ backgroundColor: form.color }"
              >
                <span
                  class="headline"
                  style="font-size: 50px;"
                >{{ getInitials() }}</span>
              </v-avatar>
            </v-card>
            <v-card class="pa-4 d-flex transparent justify-center">
              <v-color-picker
                v-if="showColorPicker"
                v-model="form.color"
                hide-canvas
                hide-inputs
                hide-mode-switch
                @input="hideColorPicker"
              />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
  import { computed, onMounted, reactive, ref } from 'vue'
  import { db } from '../components/firebase/config'
  import { updateDoc, getDoc, doc} from "firebase/firestore"
  import { useAuthStore } from '../stores/useAuthStore';
  import { useDisplay } from 'vuetify/lib/framework.mjs';

  const showColorPicker = ref(false)
  const form = reactive({
    firstName: '',
    lastName: '',
    color: '',
    email: '',
    success: false,
    successText: 'Profile updated successfully', 
  })
  const hintText = "Contact your manager if you need to update this data"

  const getInitials = () => form.firstName.charAt(0).toUpperCase() + form.lastName.charAt(0).toUpperCase();
  const toggleColorPicker = () => showColorPicker.value = !showColorPicker.value;
  const hideColorPicker = () =>  showColorPicker.value = false;

  const authStore = useAuthStore()
  onMounted(async () => {
    try {
      const resp = await getDoc(doc(db, "users", authStore.currentUser.uid))
      const data = resp.data()
      form.firstName = data.firstName
      form.lastName = data.lastName
      form.color = data.color
      form.email = data.email
    } catch(err) {
      console.log(err)
    }
  })
  const submit = () => {
    updateDoc(doc(db,"users", authStore.currentUser.uid), {
      color: form.color
    }).then(res => {
      form.success = true
      setTimeout(()=>form.success = false, 1000)
  })
  }
  const display = useDisplay()
  const showAvatar = computed(() => {
    return !display.xs.value
  })
</script>

<style scoped>
.v-card.transparent {
  box-shadow: none !important;
  background-color: transparent;
}

.v-main {
  background: var(--color-background);
}
</style>
