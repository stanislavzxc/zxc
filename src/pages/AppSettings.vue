<script>
import axios from "axios";
import PaymentSettings from "./settings/PaymentSettings.vue";
import ContentSettings from "./settings/ContentSettings.vue";
import SiteSettings from "./settings/SiteSettings.vue";
import NewsSettings from "./settings/NewsSettings.vue";
import MailSettings from "./settings/MailSettings.vue";
import SmsSettings from "./settings/SmsSettings.vue";
import BusinessSettings from "./settings/BusinessSettings.vue";

export default {
  name: "AppSettings",
  components: {
    PaymentSettings,
    ContentSettings,
    SiteSettings,
    NewsSettings,
    MailSettings,
    SmsSettings,
    BusinessSettings,
  },
  data() {
    return {
      id: 25616,
      email: "zankov.vadik@yandex.ru",
      active: 5,
      windowWidth: window.innerWidth, // Для отслеживания ширины окна
    };
  },
  computed: {
    isMobile() {
      return this.windowWidth < 811; // Показывать select на мобильных и планшетах
    },
  },
  methods: {
    changeStat(n) {
      try {
        this.active = n;
      } catch (err) {
        console.log(err);
      }
    },
    checkQuery() {
      try {
        let active = this.$route.query.active;
        console.log(active);
        if (active) {
          this.active = active;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUsers() {
      const url = `/settings`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        localStorage.setItem("settings", JSON.stringify(response.data));
        console.log(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    handleResize() {
      this.windowWidth = window.innerWidth; // Обновляем ширину при изменении
    },
  },
  mounted() {
    this.fetchUsers();
    this.checkQuery();
    window.addEventListener("resize", this.handleResize); // Слушаем изменения размера окна
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Очищаем слушатель
  },
};
</script>

<template>
  <main class="wrapper">
    <h1>Настройки</h1>

    <!-- Кнопки для десктопной версии -->
    <div class="wrap-btns" v-if="!isMobile">
      <button class="btn" @click="changeStat(1)" :class="{ active: active == 1 }">
        Оплата
      </button>
      <button class="btn" @click="changeStat(2)" :class="{ active: active == 2 }">
        Управление контентом
      </button>
      <button class="btn" @click="changeStat(3)" :class="{ active: active == 3 }">
        Управление сайтом
      </button>
      <button class="btn" @click="changeStat(4)" :class="{ active: active == 4 }">
        Новости
      </button>
      <button class="btn" @click="changeStat(5)" :class="{ active: active == 5 }">
        Шаблоны писем
      </button>
      <button class="btn" @click="changeStat(6)" :class="{ active: active == 6 }">
        Шаблоны СМС
      </button>
      <button class="btn" @click="changeStat(7)" :class="{ active: active == 7 }">
        Видео
      </button>
      <button class="btn" @click="changeStat(8)" :class="{ active: active == 8 }">
        Готовый бизнес
      </button>
    </div>

    <!-- Выпадающий список для мобильной и планшетной версий -->
    <div v-else class="wrap-select">
      <select v-model.number="active" class="select-settings">
        <option :value="1">Оплата</option>
        <option :value="2">Управление контентом</option>
        <option :value="3">Управление сайтом</option>
        <option :value="4">Новости</option>
        <option :value="5">Шаблоны писем</option>
        <option :value="6">Шаблоны СМС</option>
        <option :value="7">Видео</option>
        <option :value="8">Готовый бизнес</option>
      </select>
    </div>

    <!-- Компоненты настроек -->
    <PaymentSettings v-if="active == 1" />
    <ContentSettings v-if="active == 2" />
    <SiteSettings v-if="active == 3" />
    <NewsSettings v-if="active == 4" />
    <MailSettings v-if="active == 5" />
    <SmsSettings v-if="active == 6" />
    <BusinessSettings v-if="active == 8" />
  </main>
</template>

<style scoped>
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

h1 span {
  color: #195ee6;
  text-decoration: underline;
  font-weight: 600;
  font-size: 24px;
  line-height: 32.78px;
}

.wrap-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  padding: 14.5px 24px;
  border-radius: 8px;
  color: #5b6171;
  font-weight: 600;
  transition: all 500ms ease;
}

.edit {
  color: #195ee6;
}

.active {
  background-color: rgba(25, 94, 230, 0.1);
  color: #195ee6;
}

.group-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrap-select {
  width: 100%;
  max-width: 400px;
}

.select-settings {
  width: 100%;
  padding: 12px 16px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #ccc;
  background-color: white;
  color: #5b6171;
  font-weight: 600;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.select-settings:focus {
  outline: none;
  border-color: #195ee6;
  box-shadow: 0 0 5px rgba(25, 94, 230, 0.5);
}
</style>
