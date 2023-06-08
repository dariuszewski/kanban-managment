<script setup>
import { defineProps, defineEmits, ref, reactive, watch, computed, nextTick } from "vue";
import { useProjectStore } from "@/stores/project";
import projectsMock from '@/projectsMock.js'

const props = defineProps({
  isOpen: Boolean,
  formType: String,
});


const projectStore = useProjectStore();

// required data
const isOpen = ref(props.isOpen); // is v-dialog opened
const formType = ref(props.formType)
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
    id: 123,
    owner: 1,  //currentOwner.value.id,
    name: projectTitle.value,
    participants: participants.value.map((el) => el.id),
    tasks: [],
  }

  console.log('creating project', projectDetails)
 
  // POST REQUEST HERE
  // projectStore.insertProject(projectDetails)
  // projectsMock.push(projectDetails)
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
    @click:outside="closeForm"
    max-width="728"
    scrollable
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
        >
        </v-btn>
      </div>

      <v-form class="newProjectForm">
        <v-row>
          <v-col sm="12">
            <v-text-field 
              label="Project title" 
              variant="underlined"
              prepend-inner-icon="mdi-pencil"
              hide-details
              v-model="projectTitle"
            ></v-text-field>   
          </v-col>
        </v-row>
        <v-row>
          <v-col xs="12">
            <v-combobox
              :items="projectStore.getProjectParticipantsArray"
              item-title="fullName"
              item-value="id"
              v-model="participants"
              label="Participants"
              variant="underlined"
              prepend-inner-icon="mdi-account-search"
              chips
              hide-details
              multiple
            ></v-combobox>
          </v-col>
        </v-row>
        <div class="buttons">
          <v-row>
            <v-col cols="12" md="6" xs="12">
              <v-btn
                class="custom-button"
                @click="closeForm"
              >
                Cancel
              </v-btn>
            </v-col>
            <v-col cols="12" md="6" xs="12">
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
