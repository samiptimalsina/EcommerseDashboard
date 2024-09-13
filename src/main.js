import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/styles/tailwind.css"; // Import your Tailwind CSS file

const app = createApp(App);
app.use(createPinia()); // Initialize Pinia
app.use(router);
app.mount("#app");
