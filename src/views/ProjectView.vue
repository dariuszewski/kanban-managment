<script setup>
import { ref, computed, reactive, onMounted, watch, toRaw } from "vue";
import KanbanPageHeader from "@/components/KanbanPageHeader.vue";
import KanbanColumn from "@/components/KanbanColumn.vue";
import KanbanTask from "@/components/KanbanTask.vue";

import projectsMock from "@/projectsMock.js";
import usersMock from "@/usersMock.js";

const props = defineProps({
  id: String,
});

const project = reactive({});
const tasksStatuses = ["To Do", "In Progress", "Review", "Done"];

// defined on both - parent & child!
let selectedParticipants = ref([]);
let dateRange = ref();
let searchQuery = ref("");


function dateToString(date) {
  return date.toISOString().slice(0, 10);
} 

function filterTasks(status = false) {
  return project.tasks.filter((task) => {
    const isWithinDateRange =
      !dateRange.value ||
      (new Date(task.dueDate) >= dateRange.value[0].setHours(0, 0, 0, 0) &&
       new Date(task.dueDate) <= dateRange.value[1].setHours(0, 0, 0, 0));
    const isParticipantSelected =
      selectedParticipants.value.length === 0 ||
      selectedParticipants.value.some(
        (participant) => participant.id === task.owner
      );
    const isMatchingSearch =
      task.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase());

    if (status) {
      return (
        isWithinDateRange &&
        isParticipantSelected &&
        isMatchingSearch &&
        task.status === status
      );
    } else {
      return isWithinDateRange && isParticipantSelected && isMatchingSearch;
    }
  });
}

// filtered tasks
const filteredTodoTasks = computed(() => {
  return filterTasks(tasksStatuses[0]);
});
const filteredInProgressTasks = computed(() => {
  return filterTasks(tasksStatuses[1]);
});
const filteredInReviewTasks = computed(() => {
  return filterTasks(tasksStatuses[2]);
});
const filteredDoneTasks = computed(() => {
  return filterTasks(tasksStatuses[3]);
});

function filterTasksByStatus(tasksStatus) {
  return filterTasks(tasksStatus);
}

// FETCH THE DATA AND MOUNT HERE
const fetchProject = () => {
  // Simulate an asynchronous API request with a delay
  setTimeout(() => {
    const p = projectsMock.find((p) => p.id === Number(props.id));
    project.id = p.id;
    project.name = p.name;
    project.tasks = p.tasks;
    project.participants = usersMock.filter((user) =>
      p.participants.includes(user.id)
    );
  }, 500);
};

onMounted(() => {
  fetchProject();
});
</script>


<template>
  <div class="main-wrapper">
    <KanbanPageHeader
      :project="project"
      @update:selectedParticipants="selectedParticipants = $event"
      @update:dateRange="dateRange = $event"
      @update:searchQuery="searchQuery = $event"
    />

    <v-divider :thickness="2"></v-divider>

    <div class="columns" v-if="project.tasks">
      <v-row no-gutters>
        <KanbanColumn
          v-for="status in tasksStatuses"
          :key="status"
          :status="status"
          :tasksCount="filterTasksByStatus(status).length"
        >
          <KanbanTask
            v-for="task in filterTasksByStatus(status)"
            :key="task.id"
            :task="task"
          />
        </KanbanColumn>
      </v-row>
    </div>
  </div>
</template>

<style scoped>

.columns {
  margin-top: 20px;
}

</style>
