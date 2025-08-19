<script>
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner.vue'; 

export default {
  name: "AppCompanies",
  data() {
    return {
      cards: [],
      search: '',
      isloading:false,
    };
  },
  componetnts:{LoadingSpinner},
  computed: {
    filteredCards() {
      return this.cards.filter(card => {
        const fullName = `${card.firstname} ${card.lastname}`.toLowerCase();
        return fullName.includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    open(cardId,active) {
      try {
        this.$router.push({ name: "user", query: { active }, params: { id: cardId } });
      } catch (err) {
        console.log(err);
      }
    },
    async user_create() {
      this.isloading = true;
      const url = "/users/create";
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };
      const data = {
    firstname: "Имя",           // Замените на реальное имя
    lastname: "Фамилия",        // Замените на реальную фамилию
    phone: "+1234567890",       // Замените на реальный номер телефона
    email: "user@example.com",   // Замените на реальный email
    password: "securepassword",  // Замените на реальный пароль
    image_id: null,             // Укажите id изображения или null
    telegram: "@username",       // Замените на реальный Telegram
    country: "Страна",           // Замените на реальную страну
    address: "Адрес",            // Замените на реальный адрес
    inn: "1234567890",           // Замените на реальный ИНН
    profile_type: "Тип профиля", // Замените на реальный тип профиля
    last_totp: null,            // Укажите последнее значение TOTP или null
    totp_sent: null,            // Укажите дату и время отправки TOTP или null
    wallet: "Кошелек",          // Замените на реальный кошелек
    mfa_key: null,              // Укажите ключ MFA или null
    mfa_enabled: false,         // Укажите, включен ли MFA
    miner_name: "Имя майнера",   // Замените на реальное имя майнера
    miner_id: "ID майнера",      // Замените на реальный ID майнера
    wallet_id: "ID кошелька",    // Замените на реальный ID кошелька
    access_allowed: true,       // Укажите, разрешен ли доступ
    lang: "ru",                 // Укажите язык (например, "ru" для русского)
    created: new Date().toISOString(), // Дата создания в формате ISO
    testmode: false              // Укажите, включен ли тестовый режим
};
      try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally{
        this.isloading = false;
        await this.fetchUsers();
      }
    },
    async fetchUsers() {
      this.isloading = true;
      const url = "/users";
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      try {
        const response = await axios.get(url, { headers });
        this.cards = response.data; 
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally{
        this.isloading = false;
      }
    },
  },
  mounted() {
    this.fetchUsers(); 
  },
};
</script>

<template>
  <LoadingSpinner v-if="isloading"/>
  <div class="wrapper" v-else>
    <div class="group-title">
      <h1>Пользователи</h1>
      <button class="btn add_user" @click="user_create()">Добавить пользователя</button>
    </div>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Ф.И.О.</span>
      <span>E-Mail</span>
      <span>Телефон</span>
      <span class="options-field"></span>
    </div>
    <div class="cards">
      <div class="card" v-for="card in filteredCards" :key="card.id" @click="open(card.id)">
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.firstname }} {{ card.lastname }}</span>
        <span class="card-item">{{ card.email }}</span>
        <span class="card-item">{{ card.phone }}</span>
        <div class="card-item more">
          <img
            @click.stop="card.more = !card.more"
            src="../assets/more.svg"
            alt=""
          />
        </div>
        <div class="options" v-if="card.more">
          <button @click.stop="open">Посмотреть</button>
          <button @click.stop="open(event, 2)">Воркеры</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.group-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.actions {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-img {
  position: absolute;
  left: 16px;
}

.search {
  width: 95%;
  border-radius: 8px;
  border: 1px solid #dfe3ec;
  background-color: #fff;
  padding: 12px 16px 12px 46px;
}

.search::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8c93a6;
}

.btn {
  border-radius: 8px;
  padding: 14.5px 20px;
  background-color: #005eff;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #fff;
}

.add_user {
  background-color: transparent;
  color: #195ee6;
  font-weight: 600;
}

.fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.fields span {
  width: 25%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(140, 147, 166, 1);
}
.cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #eff1f6;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-item {
  width: 25%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(20, 23, 31, 1);
}

.more {
  width: 30px;
  cursor: pointer;
  padding: 5px;
}

.options-field {
  width: 30px !important;
}

.options {
  position: absolute;
  right: 1%;
  bottom: -100%;
  padding: 5px 6px;
  border-radius: 8px;
  border: 1px solid rgba(223, 227, 236, 1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 10;
}

.options button {
  width: 100%;
  padding: 10px 10px 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(20, 23, 31, 1);
  text-align: left;
}

.delete {
  color: rgba(223, 58, 68, 1) !important;
}
</style>
