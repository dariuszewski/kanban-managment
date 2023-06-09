<script setup>
import { ref, watch } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

////////////////////////////////////////////////////////
// const projectStore = useProjectStore();
// This values will be passed on render by a parent component.
const props = defineProps({
  projectName: String,
  projectParticipants: Array
});

// set variables for filters.
let dateRange = ref();
let selectedParticipants = ref([]);
let searchQuery = ref("");

// watch changes of the variables and emit them to a parent.
const emit = defineEmits([
  "update:selectedParticipants",
  "update:dateRange",
  "update:searchQuery",
]);

watch(dateRange, (newValue) => {
  emit("update:dateRange", newValue);
});
watch(selectedParticipants, (newValue) => {
  emit("update:selectedParticipants", newValue);
});
watch(searchQuery, (newValue) => {
  emit("update:searchQuery", newValue);
});
</script>


<template>
  <!-- Header -->
  <div class="header bg-bgcolor">
    <v-row no-gutters>
      <v-col
        cols="12"
        md="3"
        sm="12"
        xs="12"
      >
        <v-sheet class="pa-2 title bg-bgcolor">
          {{ props.projectName }}
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        md="3"
        sm="4"
        xs="12"
      >
        <v-sheet class="pa-2">
          <VueDatePicker
            v-model="dateRange"
            :enable-time-picker="false"
            :placeholder="'Date Range'"
            input-class-name="dp-custom-input"
            range
          />
        </v-sheet>
      </v-col>
      <v-col
        cols="12"
        md="3"
        sm="4"
        xs="12"
      >
        <v-sheet class="pa-2">
          <div>
            <v-select
              v-model="selectedParticipants"
              :items="props.projectParticipants"
              item-title="fullName"
              item-value="id"
              label="Participants"
              class="pl-3"
              variant="underlined"
              prepend-inner-icon="mdi-account-search"
              return-object
              multiple
              chips
              hide-details
            />
          </div>
        </v-sheet>
      </v-col>

      <v-col
        cols="12"
        md="3"
        sm="4"
        xs="12"
      >
        <v-sheet class="pa-2">
          <v-text-field
            v-model="searchQuery"
            label="Search"
            class="pl-3"
            prepend-inner-icon="mdi-magnify"
            variant="underlined"
            hide-details
          />
        </v-sheet>
      </v-col>
    </v-row>
  </div>
  <!-- End Of Header -->
</template>

<style scoped>
.header {
  margin-top: 10px;
  align-items: center;
  text-align: center;
}

.title {
  margin-top: 10px;
  color: var(--color-font-grey);
  font-weight: 600;
  font-size: 1.5em;
}

.columns {
  margin-top: 20px;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

::v-deep(.dp-custom-input) {
  height: 48px;
  /* border: 1px solid white; */
  border-bottom: 1px solid #a8a8a8;
  padding-left: 10%;
  font-size: 16px;
  background-color: inherit;
}

::v-deep(.dp-custom-input:focus) {
  border-bottom: 2px solid black;
}

::v-deep(.dp-custom-input:hover) {
  border-bottom: 1px solid black;
}

::deep(.dp__input) {
  background-color: inherit;
  border: none !important
}

.v-sheet {
  background: inherit;
}

</style>
