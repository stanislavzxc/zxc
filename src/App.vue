<script>
import LeftPanel from "./components/LeftPanel.vue";
import AppHeader from "./components/AppHeader.vue";
import BottomPanel from "./components/BottomPanel.vue";
export default {
  name: "App",
  components: { LeftPanel, AppHeader, BottomPanel },
  data() {
    return {};
  },
  methods: {},
  mounted() {
    // this.$router.push({ name: "main" });
  },
};
</script>
<template>
  <div class="main">
    <LeftPanel class="leftPanel" />
    <BottomPanel class="bottomPanel" />
    <div class="wrap">
      <AppHeader />
      <router-view class="router"></router-view>
    </div>
  </div>
  <!-- <router-view></router-view> -->
</template>
<style>
@import url("https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
#app {
  font-family: "Manrope", serif;
  width: 100%;
}
* {
  padding: 0px;
  margin: 0px;
  border: none;
  font-weight: 400;
  font-size: 14px;
  line-height: 19.12px;
  color: #262d40;
  font-style: normal;
  font-family: "Manrope", serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

body,
#app {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: #f8f9fc;
}

/* Links */

a,
a:link,
a:visited {
  text-decoration: none;
}

a:hover {
  text-decoration: none;
}

/* Common */

aside,
nav,
footer,
header,
section,
main {
  display: block;
}

ul,
ul li {
  list-style: none;
}

img {
  vertical-align: top;
}

img,
svg {
  max-width: 100%;
  height: auto;
}

address {
  font-style: normal;
}

h1 {
  font-weight: 600;
  font-size: 24px;
  line-height: 32.78px;
  color: #14171f;
}

/* Form */

input,
textarea,
button,
select {
  font-family: inherit;
  font-size: inherit;
  color: inherit;
  background-color: transparent;
}

input::-ms-clear {
  display: none;
}

button,
input[type="submit"] {
  display: inline-block;
  box-shadow: none;
  background-color: transparent;
  background: none;
  cursor: pointer;
}

input:focus,
input:active,
button:focus,
button:active {
  outline: none;
  box-shadow: none;
}

button::-moz-focus-inner {
  padding: 0;
  border: 0;
}

.card {
  transition: all 500ms ease;
  cursor: pointer;
}
.hr {
  width: 100%;
  height: 1px;
  background-color: #737a8c;
  opacity: 10%;
  border-radius: 100%;
}
.miniHR {
  margin: 0 auto;
  width: 85%;
  height: 1px;
  background-color: #737a8c;
  opacity: 10%;
  border-radius: 100%;
}

.hrV {
  width: 1px;
  height: 19px;
  background-color: #737a8c;
  opacity: 10%;
  border-radius: 100%;
}

.main {
  display: flex;
}

.wrap {
  width: 100%;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  padding-bottom: 100px;
}

.router {
  width: 100%;
  background-color: #f8f9fc;
}
.online {
  width: 8px;
  height: 8px;
  border-radius: 13px;
  background-color: #259800;
}

.offline {
  width: 8px;
  height: 8px;
  border-radius: 13px;
  background-color: #dc2626;
}

.bottomPanel {
  display: none;
}
.wrap-group {
  display: flex;
  align-items: center;
  gap: 20px;
}

@media (max-width: 768px) {
  .leftPanel {
    display: none !important;
  }

  .bottomPanel {
    display: flex;
  }
}
</style>
