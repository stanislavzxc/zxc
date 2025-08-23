import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import router from "./router/router";
import vue3GoogleLogin from "vue3-google-login";

axios.defaults.baseURL = "https://totalminers.io/admin-api/";

// getToken();
// getTokenApi();
// router.push({name: 'main'})
createApp(App)
  .use(vue3GoogleLogin, {
    clientId:
      "881173154347-brk80ndvnjq1rti79kqo2k19b9g5m0pj.apps.googleusercontent.com",
  })
  .use(router)
  .mount("#app");
 