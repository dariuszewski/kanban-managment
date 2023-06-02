<script setup>
import { ref, computed, reactive, onMounted, watch, toRaw } from "vue";
import Draggable from "vue3-draggable";
import KanbanPageHeader from "@/components/KanbanPageHeader.vue";
import KanbanColumn from "@/components/KanbanColumn.vue";
import KanbanTask from "@/components/KanbanTask.vue";

import { useProjectStore } from "@/stores/project";
import projectsMock from "@/projectsMock.js";
import usersMock from "@/usersMock.js";



const props = defineProps({
  id: String,
});

const projectStore = useProjectStore()
const currentProejct = computed(() => projectStore.project)


const project = reactive({});
const tasksStatuses = ["To Do", "In Progress", "Review", "Done"];
// const tasksStatuses = ["To Do", "In Progress"];
// defined on both - parent & child!
let selectedParticipants = ref([]);
let dateRange = ref();
let searchQuery = ref("");

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

let toDoTasks = ref([]);
let inProgressTasks = ref([]);
let reviewTasks = ref([]);
let doneTasks = ref([]);

let allTasks = reactive({
  'To Do': toDoTasks,
  'In Progress': inProgressTasks,
  'Review': reviewTasks,
  'Done': doneTasks
})



watch(toDoTasks, () => {
  const columnStatus = 'To Do';
  let newTask = toDoTasks.value.filter((task) => task.status !== columnStatus);
  console.log('new task is ', newTask)
  if (newTask.length) {
    let taskToUpdate = newTask[0]
    console.log('Send post request here...')
    taskToUpdate.status = columnStatus;
    console.log(taskToUpdate)
  }
  console.log(project.tasks)

}, { immediate: true });


watch(inProgressTasks, () => {
  const columnStatus = 'In Progress';
  let newTask = inProgressTasks.value.filter((task) => task.status !== columnStatus);
  console.log('new task is ', newTask)
  if (newTask.length) {
    let taskToUpdate = newTask[0]
    console.log('Send post request here...')
    taskToUpdate.status = columnStatus;
    console.log(taskToUpdate)
  }
  console.log(project.tasks)

}, { immediate: true });

watch(reviewTasks, () => {
  const columnStatus = 'Review';
  let newTask = reviewTasks.value.filter((task) => task.status !== columnStatus);
  console.log('new task is ', newTask)
  if (newTask.length) {
    let taskToUpdate = newTask[0]
    console.log('Send post request here...')
    taskToUpdate.status = columnStatus;
    console.log(taskToUpdate)
  }
  console.log(project.tasks)

}, { immediate: true });

watch(doneTasks, () => {
  const columnStatus = 'Done';
  let newTask = doneTasks.value.filter((task) => task.status !== columnStatus);
  console.log('new task is ', newTask)
  if (newTask.length) {
    let taskToUpdate = newTask[0]
    console.log('Send post request here...')
    taskToUpdate.status = columnStatus;
    console.log(taskToUpdate)
  }
  console.log(project.tasks)

}, { immediate: true });

function filterTasksByStatus(tasksStatus) {
  return filterTasks(tasksStatus);
}

function checkIfTaskIsNotFilteredOut(taskId) {
  const unfliteredTasks = filterTasks();
  const unfliteredTasksIds = unfliteredTasks.map(object => object.id);
  return unfliteredTasksIds.includes(taskId)
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
    toDoTasks.value = project.tasks.filter(task => task.status === 'To Do');
    inProgressTasks.value = project.tasks.filter(task => task.status === 'In Progress');
    reviewTasks.value = project.tasks.filter(task => task.status === 'Review');
    doneTasks.value = project.tasks.filter(task => task.status === 'Done');
  }, 500);
};

onMounted(() => {
  projectStore.fetchProject(props.id);
  console.log(projectStore.project)
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
          :tasks="filterTasksByStatus(status)"
          :tasksCount="filterTasksByStatus(status).length"
        >      
        <draggable
        class="drag-into"
         v-model="allTasks[status]"
        >
        <template #item="{ item }">
          <KanbanTask
            v-if="checkIfTaskIsNotFilteredOut(item.id)"
            :task="item"
          />
          </template>
        </draggable>
        </KanbanColumn>
      </v-row>
    </div>
  </div>

</template>

<style scoped>

.columns {
  margin-top: 20px;
}

.drag-into {
  min-width: 200px;
  min-height: 100px;
}

</style>
