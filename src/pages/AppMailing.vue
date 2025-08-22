<script>
import axios from "axios";
import ModalAccept from "./ModalAccept.vue";
import LoadingSpinner from "./LoadingSpinner.vue";

export default {
  name: "AppMailing",

  components: { ModalAccept, LoadingSpinner },
  data() {
    return {
      active: 1,
      error: true,
      users_error: [],
      users_manually: "",
      is_open: false,
      isloading: false,
      template_id: null,
      // user_ids_str: "",
      mails: [],
      users: [
        {
          id: 1,
          email: "genadiu@mail.com",
          last_send: "2024-08-26 11:20",
          last_mail: "Шаблон 1",
          status: true,
        },
        {
          id: 2,
          email: "genadiu@mail.com",
          last_send: "2024-08-26 11:20",
          last_mail: "Шаблон 1",
          status: true,
        },
        {
          id: 3,
          email: "genadiu@mail.com",
          last_send: "2024-08-26 11:20",
          last_mail: "Шаблон 1",
          status: true,
        },
        {
          id: 4,
          email: "genadiu@mail.com",
          last_send: "2024-08-26 11:20",
          last_mail: "Шаблон 1",
          status: true,
        },
        {
          id: 5,
          email: "genadiu@mail.com",
          last_send: "2024-08-26 11:20",
          last_mail: "Шаблон 1",
          status: true,
        },
        {
          id: 6,
          email: "genadiu@mail.com",
          last_send: "2024-08-26 11:20",
          last_mail: "Шаблон 1",
          status: true,
        },
      ],
    };
  },
  methods: {
    changeActive(n) {
      try {
        this.active = n;
      } catch (err) {
        console.log(err);
      }
    },

    removeUser(id) {
      try {
        for (let i = 0; i < this.users.length; i++) {
          let user = this.users[i];
          if (user.id == id) {
            user.status = !user.status;
            this.user[i] = user;
          }
        }
      } catch (err) {
        console.log(err);
      }
    },
    async update() {
      this.is_open = false;
      this.isloading = true;
      const url = `/campaign/send`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const data = {
        template_id: this.template_id,
        user_ids: this.users_manually,
      };
      console.log(data);
      try {
        const response = await axios.post(url, data, { headers });
        console.log(response);
      } catch (error) {
        console.error("Error uploading data:", error);
      } finally {
        this.isloading = false;
      }
    },
    async getMails() {
      this.isloading = true;
      const url = `/mail_templates`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);

        // Фильтруем только элементы с template_type == 'mail' и преобразуем их
        this.mails = response.data
          .filter((item) => item.template_type === "mail")
          .map((item) => ({
            id: item.id,
            name: item.title,
            template: item.content,
            template_type: item.template_type,
          }));
      } catch (error) {
        console.error("Error updating settings:", error);
      } finally {
        this.isloading = false;
      }
    },
    async getSms() {
      this.isloading = true;
      const url = `/mail_templates`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);

        // Фильтруем только элементы с template_type == 'mail' и преобразуем их
        this.mails = response.data
          .filter((item) => item.template_type === "sms")
          .map((item) => ({
            id: item.id,
            name: item.title,
            template: item.content,
            template_type: item.template_type,
          }));

        this.count = this.mails.length;
      } catch (error) {
        console.error("Error updating settings:", error);
      } finally {
        this.isloading = false;
      }
    },
    mailChange(id) {
      this.template_id = id;
    },
  },
  async mounted() {
    this.getMails();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isloading" />
  <section class="wrapper">
    <ModalAccept @close="is_open = false" @update="update()" v-if="is_open" />
    <h1>Рассылки</h1>
    <div class="wrap-btns">
      <button class="btn" @click="changeActive(1)" :class="{ active: active == 1 }">
        Почта
      </button>
      <button class="btn" @click="changeActive(2)" :class="{ active: active == 2 }">
        Телефон
      </button>
    </div>
    <!-- <div class="error" v-if="error">
      <div class="text">
        Пользователи:
        <span v-for="user in users_error" :key="user">{{ user }}</span
        >Запретили рассылку
      </div>
      <img @click="error = false" src="../assets/close.svg" alt="" />
    </div> -->
    <div class="card">
      <h2>Рассылка</h2>
      <div class="group">
        <label for="mail" class="group-value">Письмо:</label>
        <select
          type="text"
          id="mail"
          name="mail"
          v-model="mail"
          class="group-item"
          placeholder="Выберите шаблон письма"
          @change="mailChange(mail)"
        >
          <option v-for="mail in mails" :key="mail.id" :value="mail.id">
            {{ mail.name }}
          </option>
        </select>
      </div>
      <div class="group">
        <label for="status" class="group-value">Указать вручную(через запятую):</label>
        <input
          type="text"
          class="group-item"
          v-model="users_manually"
          placeholder="Введите ID пользователей"
        />
      </div>
      <button class="card-btn send" @click="this.is_open = true">Отправить</button>
    </div>
    <h1>Пользователи</h1>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="search-btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Email</span>
      <span>Последняя рассылка</span>
      <span>Последний шаблон</span>
      <span class="options-field">Статус</span>
    </div>
    <div class="users">
      <div class="user" v-for="user in users" :key="user.id">
        <span class="user-item">{{ user.id }}</span>
        <span class="user-item">{{ user.email }}</span>
        <span class="user-item">{{ user.last_send }}</span>
        <span class="user-item">{{ user.last_mail }}</span>
        <div class="card-item more">
          <input type="checkbox" @click="removeUser(user.id)" v-model="user.status" />
        </div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.card {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #f0f0f5;
  transition: all 500ms ease;
  cursor: auto;
}

.card:hover,
.btn-action:hover,
.user:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.wrap-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.group-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 span {
  font-weight: 600;
  font-size: 24px;
  line-height: 32.78px;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 27.32px;
  color: #14171f;
}

.card-btn {
  padding: 14.5px 24px;
  border-radius: 8px;
  color: #5b6171;
  font-weight: 600;
  transition: all 500ms ease;
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
.send {
  background-color: #195ee6;
  font-weight: 600;
  letter-spacing: 0em;
  color: #fff;
}
.wrap-btns {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn {
  padding: 14.5px 24px;
  color: #5b6171;
  font-weight: 600;
  border-radius: 8px;
  transition: all 500ms ease;
}

.active {
  background-color: rgba(25, 94, 230, 0.1);
  color: #195ee6;
}

.open {
  color: #195ee6;
  text-decoration: underline;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  cursor: pointer;
}

.fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.fields span {
  width: 12%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(140, 147, 166, 1);
}
.miners {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.miner {
  position: relative;
  background-color: #fff;
  border: 1px solid #eff1f6;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 500ms ease;
}

.miner-item {
  width: 12%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(20, 23, 31, 1);
}

.miner:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.error {
  width: 100%;
  background-color: rgba(220, 38, 38, 0.1);
  border: 1px solid #dc2626;
  padding: 18px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 8px;
}

.error img {
  cursor: pointer;
}

.text,
.text * {
  color: #dc2626;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 5px;
}

/* users */

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

.search-btn {
  border-radius: 8px;
  padding: 14.5px 20px;
  background-color: #005eff;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #fff;
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
.users {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.user {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #eff1f6;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: all 500ms ease;
}

.user-item {
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
  width: 49px !important;
}
</style>
