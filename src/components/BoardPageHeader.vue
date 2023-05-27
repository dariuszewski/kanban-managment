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
const selectedParticipants = reactive(['buzz', 'fizzbuzz', 'foobar'])
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

onMounted(() => {
  fetchProject()
  const startDate = new Date();
  const endDate = new Date(new Date().setDate(startDate.getDate() + 7));
  date.value = [startDate, endDate];
})

</script>


<template>
    <div class="header">
      <v-row no-gutters>
        <v-col cols="12" md="3" sm="12" xs="12">
          <v-sheet class="pa-2 title">
            {{ project.name }}
          </v-sheet>
        </v-col>
        
        <v-col cols="12" md="3" sm="4" xs="12">
          <v-sheet class="pa-2">
              <VueDatePicker 
                v-model="date" 
                :enable-time-picker="false" 
                label="date range"
                input-class-name="dp-custom-input"
                range
              />
          </v-sheet>
        </v-col>
        <v-col cols="12" md="3" sm="4" xs="12">
          <v-sheet class="pa-2">
            <div class="custom-select">
            <v-select
              v-model="selectedParticipants"
              :items="allParticipants"
              class="custom-select"
              label="Participants"
              variant="underlined"
              prepend-inner-icon="mdi-account-search"
              multiple
              chips
              hide-details
            >
            </v-select>
            </div>
            
          </v-sheet>
        </v-col>

        <v-col cols="12" md="3" sm="4" xs="12">
          <v-sheet class="pa-2">
            <v-text-field
              class="filter-input"
              label="Search"
              prepend-inner-icon="mdi-magnify"
              variant="underlined"
              v-model="endDate"
              hide-details
            ></v-text-field>
          </v-sheet>

        </v-col>
      </v-row>
    </div>
</template>

<style scoped>

  .header {
    margin-top: 10px;
    align-items: center;
    text-align: center;
  }

  .title {
    margin-top: 10px;
    color: #5F6E72;
    font-weight: 600;
    font-size: 22px;
  }

  ::v-deep(.dp-custom-input) {
    height: 48px;
    border: 1px solid white;
    border-bottom: 1px solid #a8a8a8;
    padding-left: 20%;
    font-size: 12px;
  }

  ::v-deep(.dp-custom-input:focus) {
    border-bottom: 2px solid black;
  }

  ::v-deep(.dp-custom-input:hover) {
    border-bottom: 1px solid black;
  }

</style>
