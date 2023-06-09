<script setup>
import { defineProps, defineEmits, ref, reactive, watch, computed, nextTick, onBeforeMount } from "vue";
import { useProjectStore } from "@/stores/project";
import projectsMock from '@/projectsMock.js'
import { collection, getDocs, addDoc } from 'firebase/firestore'
import { db } from '@/components/firebase/config.js'
import { useAuthStore } from '../stores/useAuthStore'


const authStore = useAuthStore()

const props = defineProps({
  isOpen: Boolean,
  formType: String,
});

const usersSelectList = ref([])

onBeforeMount(async () => {
  const response = await getDocs(collection(db, 'users'))
  usersSelectList.value = response.docs.map(ref => {
    const data = ref.data()
    return {
      id: ref.id,
      firstName: data.firstName,
      lastName: data.lastName,
      fullName: data.firstName + " " + data.lastName,
    }
  }).filter(el => el.id !== authStore.currentUser.uid)
})


const projectStore = useProjectStore();

// required data
const isOpen = ref(props.isOpen); // is v-dialog opened
const formType = ref(props.formType);
const projectTitle = ref('')
const participants = ref([])

const emit = defineEmits(["closeForm", "projectCreated"]);

function closeForm() {
  console.log('closing form')
  emit("closeForm");
  isOpen.value = false;
  projectTitle.value = ''
  participants.value = []
}

async function saveChanges() {
  // THIS NEEDS FORM VALIDATION AND AN ID!!!!!!!!!!!!!!!!!!
  // WHOLE THING CAN ACTUALLY BE MADE MORE SIMILAR TO THE LOGIN FORM

  const projectDetails = {
    lastTaskId: 0,
    owner: authStore.currentUser.uid,
    name: projectTitle.value,
    participants: [...participants.value.map(el => el.id), authStore.currentUser.uid],
    tasks: [],
  }

  console.log('creating project', projectDetails)
 
  // POST REQUEST HERE
  // projectStore.insertProject(projectDetails)
  // projectsMock.push(projectDetails)

  const docRef = await addDoc(collection(db, "projects"), projectDetails);
  console.log("Document written with ID: ", docRef.id);
  projectDetails.id = docRef.id;

  closeForm()
  emit("projectCreated", projectDetails);
}

watch(
  () => props.isOpen,
  (newValue) => {
    isOpen.value = newValue;
  }
);
</script>

<template>
  <v-dialog
    v-model="isOpen"
    max-width="728"
    scrollable
    @click:outside="closeForm"
  >
    <v-card>
      <div class="form-header">
        <span class="form-title">
          {{ formType }} Create new project
        </span>
        <v-btn
          variant="plain"
          icon="mdi-close"
          class="close-button"
          @click="closeForm"
        />
      </div>

      <v-form class="newProjectForm">
        <v-row>
          <v-col sm="12">
            <v-text-field 
              v-model="projectTitle" 
              label="Project title"
              variant="underlined"
              prepend-inner-icon="mdi-pencil"
              hide-details
            />   
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12">
            <v-combobox
              v-model="participants"
              :items="usersSelectList"
              item-title="fullName"
              label="Participants"
              variant="underlined"
              prepend-inner-icon="mdi-account-search"
              chips
              hide-details
              multiple
            />
          </v-col>
        </v-row>
        <div class="buttons">
          <v-row>
            <v-col 
              cols="12"
              md="6" 
              xs="12"
            >
              <v-btn
                class="custom-button"
                @click="closeForm"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col
              cols="12"
              md="6"
              xs="12"
            >
              <v-btn
                class="custom-button bg-success"
                prepend-icon="mdi-floppy"
                @click="saveChanges"  
              >
                <span>Create</span>
              </v-btn>
            </v-col>
          </v-row>
        </div>
      </v-form>
    </v-card>
  </v-dialog>
</template>

<style scoped>
.form-header {
  display: flex;
  align-items: center;
  margin: 0 14px 0 14px;
}

.form-title {
  margin-top: 10px;
  font-weight: 600;
  font-size: 22px;
  line-height: 22px;
  flex-grow: 0.1;
}

.close-button {
  margin-left: auto;
  color: black;
}

.newProjectForm {
  margin: 28px 14px 10px 14px;
}

.custom-button {
  width: 100%;
}

</style>
