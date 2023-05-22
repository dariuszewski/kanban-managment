<script setup>
import { ref, computed, reactive, onMounted } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import projectsMock from '@/projectsMock.js';

const props = defineProps({
  id: String
});

const project = reactive({});

// Filters
const startDate = ref(null);
const endDate = ref(null);
const allParticipants = reactive(['foo', 'bar', 'fizz', 'buzz', 'fizzbuzz', 'foobar'])
const selectedParticipants = reactive([])
// End of filters

const fetchProject = () => {
  // Simulate an asynchronous API request with a delay
  setTimeout(() => {
    const p = projectsMock.find((p) => p.id === Number(props.id));
    project.id = p.id;
    project.name = p.name;
    // Update other project properties accordingly
  }, 500);
};

const date = ref();

// onMounted(() => fetchProject());

onMounted(() => {
  fetchProject()
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})

</script>


<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="3">
        <v-sheet class="pa-2 ">
          {{ project.name }}
        </v-sheet>
      </v-col>

      <v-col 
        cols="3"

      >
        <v-sheet class="pa-2">
            <VueDatePicker 
              v-model="date" 
              :enable-time-picker="false" 
              label="date range"
              range
            />
        </v-sheet>
      </v-col>

      <v-col cols="3">
        <v-sheet class="pa-2">

          <datalist id="participants">
            <option value="Participant 1" />
            <option value="Participant 2" />
            <option value="Participant 3" />
            <option value="Participant 4" />
          </datalist>
          <!-- <v-select
            v-model="selectedParticipants"
            :items="allParticipants"
            label="Participants"
            prepend-inner-icon="mdi-account-search"
            multiple
          >
            <template v-slot:selection="{ item, index }">
              <v-chip v-if="index < 1">
                <span>{{ item.title }}</span>
              </v-chip>
              <span
                v-if="index === 1"
                class="text-grey text-caption align-self-center"
              >
                (+{{ selectedParticipants.length - 2 }} others)
              </span>
            </template>
          </v-select> -->
        </v-sheet>
      </v-col>

      <v-col cols="3">
        <v-sheet class="pa-2">
          <v-text-field
            class="filter-input"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            type="text"
            v-model="endDate"
          ></v-text-field>
        </v-sheet>
      </v-col>

    </v-row>
  </v-container>
</template>

<style>
  .project-name {
    color: #5F6E72;
    font-weight: 600;
  }
</style>
