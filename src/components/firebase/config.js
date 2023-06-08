// move it
import  {initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBx5wjoEa9kX8kZ9vtuNftc-kjKjlCOliQ",
  projectId: "kanban-app-8e75f"
}
const app = initializeApp(firebaseConfig)
const db = getFirestore(app);
const auth = getAuth(app)
export { auth, db }