import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const config = {
  // apiKey: "AIzaSyATKNjTKCJCAk92r7NHjDOJ7DLVf3P4UeE",
  // authDomain: "xplory-1bae3.firebaseapp.com",
  // databaseURL: "https://xplory-1bae3.firebaseio.com",
  // projectId: "xplory-1bae3",
  // storageBucket: "xplory-1bae3.appspot.com",
  // messagingSenderId: "948088549309",
  // appId: "1:948088549309:web:f789d904e3e5a733b1acd4",
  // measurementId: "G-K3VD2L4PNH",

//   apiKey: "AIzaSyCz78emhUKN79HtQypT9GFvbQY_NvntxeY",
//   authDomain: "shilpakala-b001d.firebaseapp.com",
//   databaseURL: "https://shilpakala-b001d-default-rtdb.firebaseio.com",
//   projectId: "shilpakala-b001d",
//   storageBucket: "shilpakala-b001d.appspot.com",
//   messagingSenderId: "247427822110",
//   appId: "1:247427822110:web:b0980d1065688ea8be740f",
//   measurementId: "G-VVM8YJZNSN",

  apiKey: "AIzaSyBaOxtFUgcoRT7NUDrPq7zmuGLhy1DfvUg",
  authDomain: "buyananswer-eth.firebaseapp.com",
  projectId: "buyananswer-eth",
  storageBucket: "buyananswer-eth.appspot.com",
  messagingSenderId: "88613249211",
  appId: "1:88613249211:web:f25e4ffea5a5e04d7f099e",
  measurementId: "G-6C0NM4NF0B"
};

firebase.initializeApp(config);

const FirebaseAuth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { FirebaseAuth, db, storage };
