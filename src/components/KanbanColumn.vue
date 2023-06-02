<script setup>
import { ref, reactive, onMounted } from "vue";
import { useProjectStore } from "@/stores/project";

const props = defineProps({
  status: String,
  tasksCount: Number,
  tasks: Array
});

const projectStore = useProjectStore()

// const tasks = ref(projectStore.currentProject.tasks.filter(task => task.status === props.status));


// defined on both - column and filters!
// let selectedParticipants = ref([]);
// let dateRange = ref();
// let searchQuery = ref("");

// function filterTasks(status = false) {
//   return tasks.filter((task) => {
//     const isWithinDateRange =
//       !dateRange.value ||
//       (new Date(task.dueDate) >= dateRange.value[0].setHours(0, 0, 0, 0) &&
//        new Date(task.dueDate) <= dateRange.value[1].setHours(0, 0, 0, 0));
//     const isParticipantSelected =
//       selectedParticipants.value.length === 0 ||
//       selectedParticipants.value.some(
//         (participant) => participant.id === task.owner
//       );
//     const isMatchingSearch =
//       task.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
//       task.title.toLowerCase().includes(searchQuery.value.toLowerCase());

//     if (status) {
//       return (
//         isWithinDateRange &&
//         isParticipantSelected &&
//         isMatchingSearch &&
//         task.status === status
//       );
//     } else {
//       return isWithinDateRange && isParticipantSelected && isMatchingSearch;
//     }
//   });
// }


</script>

<template>
  <v-col cols="12" sm="3" xs="12">
    <v-sheet class="pa-2">
      <v-card class="single-column">
        <v-card-title class="title">
          {{ props.status }}
          <span class="tasks-count">{{ props.tasksCount }}</span>
        </v-card-title>
        <v-divider :thickness="2"></v-divider>
        <div class="center-container">
          <v-btn
            variant="outlined"
            prepend-icon="mdi-plus-circle"
            density="compact"
            class="add-task-btn"
            text="ADD ITEM"
          >
          </v-btn>
        </div>
        <div class="tasks-wrapper">
          <!-- Tasks go here -->
          <slot></slot>
        </div>
      </v-card>
    </v-sheet>
  </v-col>
</template>

<style scoped>
.single-column {
  min-height: 200px;
}

.title {
  margin-top: 10px;
  color: #5f6e72;
  font-weight: 600;
  font-size: 22px;
}

.tasks-count {
  color: #8ba5ac;
  float: right;
  font-size: 26px;
}

.center-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.add-task-btn {
  margin: 20px 0 0 0;
  width: 80%;
  border: 1px dashed #5f6e72;
  color: #5f6e72;
  background-color: transparent;
}

.tasks-wrapper {
  margin: 20px 0 20px 0;
  padding: 0 10% 0 10%;
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>