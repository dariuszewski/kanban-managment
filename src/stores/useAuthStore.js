import { defineStore } from "pinia";
import { auth } from "../components/firebase/config";
import { signInWithEmailAndPassword, signOut} from "firebase/auth";
import router from "../router";

export const useAuthStore = defineStore('authStore',{
  state: () => {
    return{
      _userData: JSON.parse(localStorage.getItem('_userData'))
    }
  },
  getters: {
    currentUser: (state) => {
      return state._userData
    },
    isAuthenticated: (state) => {
      return state._userData != undefined
    }
  },
  actions: {
    async login(email, password){
      await signInWithEmailAndPassword(auth, email, password).
        then(res => {
          localStorage.setItem("_userData", JSON.stringify(res.user))
          this._userData = res.user
          router.push('/')
        })
     },
     async logout(){
        signOut(auth).then(() => {
          localStorage.removeItem("_userData")
          this._userData = {}
          router.push('/login')
        })
      } 
    }
  }
)