import "./style.css";
import App from "./App.vue";
import { createApp } from "vue";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import router from "./router";

createApp(App).use(router).mount("#app");
