// move it
import  {initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBx5wjoEa9kX8kZ9vtuNftc-kjKjlCOliQ"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
export { auth }