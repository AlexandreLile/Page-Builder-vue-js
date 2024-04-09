import "./assets/main.css";
import store from "./store/store.js";
import { createApp } from "vue";
import App from "./App.vue";
import MyGridStructure from "./components/MyGridStructure.vue";
import draggable from "vuedraggable";
import MyButton from "./components/MyButton.vue";
import MyItems from "./components/MyItems.vue";
import Mytext from "./components/Mytext.vue";

createApp(App)
  .component("draggable", draggable)
  .component("MyGridStructure", MyGridStructure)
  .component("MyButton", MyButton)
  .component("MyItems", MyItems)
  .component("Mytext", Mytext)
  .use(store)
  .mount("#app");
