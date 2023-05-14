<script setup>
import { ref, reactive, computed, defineProps } from "vue";
import { useTheme } from "vuetify";

import projectsMock from "@/projectsMock.js";

const props = defineProps({
  name: String,
  progress: Number,
});

const projects = reactive(projectsMock);
const done = ref(8);
const all = ref(10);
</script>

<template>
  <v-card class="align-center" height="200" width="200">

    <v-toolbar class="card-top">
      <v-spacer></v-spacer>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-dots-vertical" v-bind="props" flat></v-btn>
        </template>
        <v-list>
          <v-list-item class="menu-item" clickable>
            <v-list-item-title>Open</v-list-item-title>
          </v-list-item>
          <v-list-item class="menu-item" clickable>
            <v-list-item-title>Manage</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar>

    <div class="text-center">
      <v-card-text class="project-name">{{ props.name }}</v-card-text>
      <div class="progress-wrapper">
        <div class="progress-bar">
          <v-progress-linear
            :model-value="props.progress"
            class="mb-2"
            bg-color="success"
            color="success"
            height="8"
            rounded
            dense
          >
          </v-progress-linear>
          {{ props.progress }}%
        </div>
      </div>
    </div>

  </v-card>
</template>


<style scoped>
h3 {
  color: rgb(219, 219, 219);
}

.menu-item:hover {
  cursor: pointer;
  background-color: rgb(227, 227, 227)
}

.project-name {
  font-size: 20px;
}
.progress-wrapper {
  width: 80%;
  margin: auto;
}

</style>