<script>
/* eslint-disable */
import AppLogo from "./AppLogo.vue";
import AppTerms from "./AppTerms.vue";
export default {
  name: "AppLogin",
  components: { AppLogo, AppTerms },
  data() {
    return {
      email: "",
      password: "",
      passOpen: false,
      message: "",
      emailInvalid: false,
      passInvalid: false,
    };
  },
  methods: {
    goNext() {
      try {
        if (this.email && this.password) {
          this.$router.push({ name: "enterCode" });
        }
      } catch (err) {
        console.log(err);
      }
    },

    goBack() {
      try {
        if (this.step > 1) {
          this.step--;
        }
      } catch (err) {
        console.log(err);
      }
    },

    openPass() {
      try {
        let passNode = document.querySelector(`#password`);
        passNode.type = "text";
        this.passOpen = true;
      } catch (err) {
        console.log(err);
      }
    },

    closePass() {
      try {
        let passNode = document.querySelector(`#password`);
        passNode.type = "password";
        this.passOpen = false;
      } catch (err) {
        console.log(err);
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="wrapper">
    <AppLogo />
    <div class="card">
      <h2 class="title">Вход в систему</h2>
      <div class="group">
        <label for="email" class="group-value">Почта</label>
        <input
          type="text"
          id="email"
          name="email"
          v-model="email"
          class="group-item"
          placeholder="john@gmail.com"
          @blur="saveEmail"
        />
      </div>
      <div class="group">
        <label for="password" class="group-value">Пароль</label>
        <input
          type="password"
          id="password"
          name="password"
          v-model="password"
          class="group-item"
          :class="{ invalid: passInvalid }"
          placeholder="Введите пароль"
        />
        <img
          src="../assets/password-closed.png"
          class="password-img"
          alt=""
          v-if="!passOpen"
          @click="openPass()"
        />
        <img
          src="../assets/password-open.png"
          class="password-img"
          alt=""
          v-if="passOpen"
          @click="closePass()"
        />
      </div>
      <button class="btn continue" type="button" @click="goNext()">
        Войти
      </button>
    </div>
    <div class=""></div>
  </div>
</template>
<style scoped>
.wrapper {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
}

h1 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.04em;
}

h1 span {
  color: #005eff;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0.04em;
}
.card {
  width: 480px;
  margin: 0 auto;
  border-radius: 20px;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  cursor: default;
  background-color: #fff;
}

.wrap-title {
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: center;
}

.title {
  font-weight: 400;
  font-size: 24px;
  line-height: 30px;
  color: #14171f;
}

.subtitle {
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  color: #14171f;
}

.group {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-value {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item {
  border-radius: 8px;
  padding: 12px 16px;
  border: 1px solid #dfe3ec;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item::placeholder {
  color: #8c93a6;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}

.wrap-btns {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.btn {
  width: 100%;
  padding: 14.5px 20px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}

.continue {
  background-color: #005eff;
  color: #fff;
}

.back {
  background-color: #f8f9fc;
  color: #14171f;
}

.sign {
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #14171f;
  opacity: 40%;
}

.wrap-sign a {
  color: #005eff;
  font-size: 14px;
  font-weight: 400;
  line-height: 19px;
  letter-spacing: 0.01em;
  text-decoration: underline;
  opacity: 100%;
}

.wrap-hr {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 20px;
}

.wrap-hr span {
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
  color: #14171f;
  opacity: 40%;
}

.google {
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: center;
  border: 1px solid #dfe3ec;
}

.google span {
  color: #1e293b;
  font-weight: 500;
  font-size: 14px;
  line-height: 19px;
}

.password-img {
  position: absolute;
  height: 16px;
  width: 16px;
  cursor: pointer;
  right: 3%;
  top: 55%;
}

.wrap-forgot {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: end;
}

.forgot {
  color: #005eff;
  font-weight: 400;
  font-size: 14px;
  line-height: 19px;
  letter-spacing: 0.01em;
}

.invalid {
  border: 1px solid #df3a44;
  color: #df3a44;
}

.g-signin2 {
  height: 100px;
  width: 100%;
}
</style>
