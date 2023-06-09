<script setup>
import { ref, reactive, watch, onBeforeMount } from "vue";
import Draggable from "vue3-draggable";
import KanbanPageHeader from "@/components/KanbanPageHeader.vue";
import KanbanColumn from "@/components/KanbanColumn.vue";
import KanbanTask from "@/components/KanbanTask.vue";

import { useProjectStore } from "@/stores/project";
import { useAuthStore } from "@/stores/useAuthStore";


const props = defineProps({
  id: String,
});

// global project instances and possible taskStatuses
const projectStore = useProjectStore();
const authStore = useAuthStore()
const project = reactive({});
const tasksStatuses = ["To Do", "In Progress", "Review", "Done"];

// Filters - KanbanPageHeader /////////////////////////////////////////////////////
// Variables defined on both ends - parent & child!
// Emits changes are passed to below variables by update event.
let selectedParticipants = ref([]);
let dateRange = ref();
let searchQuery = ref("");

function filterTasks(status=false) {
  // This function filters tasks in all columns based on the values of above variables.
  // Moving this logic to the KanbanColumn would make it necessary to define above
  // variables in the third place. Also it would create considerations on where to 
  // put checkIfTaskIsNotFilteredOut()
  // return project.tasks.filter((task) => {
    return project.tasks.filter((task) => {
    // date range filter
    const isWithinDateRange =
      !dateRange.value ||
      (new Date(task.dueDate) >= dateRange.value[0].setHours(0, 0, 0, 0) &&
       new Date(task.dueDate) <= dateRange.value[1].setHours(0, 0, 0, 0));
    // participants filter
    const isParticipantSelected =
      selectedParticipants.value.length === 0 ||
      selectedParticipants.value.some(
        (participant) => participant.id === task.owner
      );
    // search field filter
    const isMatchingSearch =
      task.summary.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      task.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    // check status if provided
    const isMatchingStatus = status ? task.status === status : true;

    return (
      isWithinDateRange &&
      isParticipantSelected &&
      isMatchingSearch &&
      isMatchingStatus
    );
  });
}

function checkIfTaskIsNotFilteredOut(taskId) {
  // This function checks if task is not filtered out by filterTasks().
  // It it used before rendering a KanbanTask.
  const unfliteredTasks = filterTasks();
  const unfliteredTasksIds = unfliteredTasks.map(object => object.id);
  return unfliteredTasksIds.includes(taskId)
  return true
}

// TASK STATUS CHANGES HERE //////////////////////////////////////////////////////
// v-model need reactive arrays, and I encountered issues when using reactive.
// change to const??
let toDoTasks = ref([]);
let inProgressTasks = ref([]);
let reviewTasks = ref([]);
let doneTasks = ref([]);
// object created so we can iterate over it on render
let allTasks = reactive({
  'To Do': toDoTasks,
  'In Progress': inProgressTasks,
  'Review': reviewTasks,
  'Done': doneTasks
})

function assignPiniaContentToTaskArrays() {
  toDoTasks.value = projectStore.project.tasks.filter(task => task.status === 'To Do');
  inProgressTasks.value = projectStore.project.tasks.filter(task => task.status === 'In Progress');
  reviewTasks.value = projectStore.project.tasks.filter(task => task.status === 'Review');
  doneTasks.value = projectStore.project.tasks.filter(task => task.status === 'Done'); 
}
let refreshTrigger = ref(0);
function refreshColumnsContentsWithPiniaStore() {
  // This is very important function! It forces the KanbanColumn component to refresh.
  project.tasks = projectStore.project.tasks
  assignPiniaContentToTaskArrays()
  refreshTrigger.value += 1;
}

async function watchColumnStatusChanges(columnRef, columnStatus) {
  // This function is called in watchers. It's purpose is to verify which
  // task was changed, set new status and send a POST request to the back-end.
  // This could eventually be moved to the KanbanColumn.
  watch(columnRef, () => {
    let newTask = columnRef.value.filter((task) => task.status !== columnStatus);
    if (newTask.length) {
      let taskToUpdate = newTask[0]
      console.log('Send post request here... (below task to update)')
      console.log(taskToUpdate)
      taskToUpdate.status = columnStatus;
      projectStore.updateTask(taskToUpdate.id, taskToUpdate)
    }  
  }, { immediate: true })
}
// setting up watchers
watchColumnStatusChanges(toDoTasks, 'To Do');
watchColumnStatusChanges(inProgressTasks, 'In Progress');
watchColumnStatusChanges(reviewTasks, 'Review');
watchColumnStatusChanges(doneTasks, 'Done');

onBeforeMount(async () => {
  await projectStore.fetchProject(props.id)
  console.log('fetched project', projectStore.project)
  project.id = projectStore.project.id;
  project.owner = projectStore.project.owner;
  project.name = projectStore.project.name;
  project.tasks = projectStore.project.tasks;
  project.participants = projectStore.project.participants
  refreshColumnsContentsWithPiniaStore();
})
</script>


<template>
  <div class="main-wrapper">
    <KanbanPageHeader
      :project="project"
      :project-name="project.name"
      :project-participants="project.participants"
      @update:selectedParticipants="selectedParticipants = $event"
      @update:dateRange="dateRange = $event"
      @update:searchQuery="searchQuery = $event"
    /> 

    <v-divider :thickness="2" />

    <div
      v-if="project.tasks"
      class="columns"
    >
      <v-row no-gutters>
        <!-- may be solved by a watcher and v-if="renderColumn" set to true/false? -->
        <KanbanColumn
          v-for="status in tasksStatuses"
          :key="`${status}-${refreshTrigger}`"        
          :status="status"
          :tasks-count="filterTasks(status).length"
          @taskEdited="refreshColumnsContentsWithPiniaStore"
        >      
          <draggable
            v-model="allTasks[status]"
            class="drag-into"
          >
            <template #item="{ item }">
              <KanbanTask
                v-if="checkIfTaskIsNotFilteredOut(item.id)"
                :task="item"
                @taskEdited="refreshColumnsContentsWithPiniaStore"
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
  width: 100%;
  /* min-width: 200px; */
  min-height: 100px;
}

</style> 
