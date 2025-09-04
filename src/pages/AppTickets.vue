<script>
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner.vue";
export default {
  name: "AppTickets",
  data() {
    return {
      search: "",
      cards: [],
      isloading: false,
    };
  },
  components: { LoadingSpinner },
  methods: {
    open(data) {
      try {
        localStorage.setItem("firstname", data.user.firstname);
        localStorage.setItem("lastname", data.user.lastname);
        localStorage.setItem("date", data.created);
        localStorage.setItem("title", data.title);
        localStorage.setItem("is_open", data.is_open);
        localStorage.setItem("ticket_id", data.id);
        localStorage.setItem("id", data.user.id);
        this.$router.push({ name: "ticket" });
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUsers() {
      this.isloading = true;
      const url = "/tickets";
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        this.cards = response.data;

        for (let i = 0; i < this.cards.length; i++) {
          this.cards[i].is_open = this.cards[i].is_open ? "Открыт" : "Закрыт";
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
      }
    },
  },
  computed: {
    filteredCards() {
      return this.cards.filter((card) => {
        return (
          `${card.firstname} ${card.lastname}`
            .toLowerCase()
            .includes(this.search.toLowerCase()) ||
          card.title.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<template>
  <LoadingSpinner v-if="isloading" />
  <div class="wrapper" v-else>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Пользователь</span>
      <span>Название</span>
      <span>Состояние</span>
      <span>Создано</span>
      <span class="options-field"></span>
    </div>
    <div class="cards">
      <div class="card" @click="open(card)" v-for="card in filteredCards" :key="card.id">
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.user.firstname }} {{ card.user.lastname }}</span>
        <span class="card-item">{{ card.title }}</span>
        <span class="card-item">
          <div
            class="status"
            :class="{
              open: card.is_open === 'Открыт',
              close: card.is_open === 'Закрыт',
            }"
          >
            {{ card.is_open }}
          </div>
        </span>
        <span class="card-item">{{ card.created }}</span>
        <div class="card-item more">
          <img @click="card.more = !card.more" src="../assets/more.svg" alt="" />
        </div>
        <div class="options" v-if="card.more">
          <button>Посмотреть</button>
          <button>Воркеры</button>
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
  word-wrap: break-word;
  white-space: normal;
  hyphens: auto;
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
  border: 1px solid #eff1f6;
  border-radius: 10px;
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
  text-overflow: ellipsis;
  overflow: hidden;
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
  z-index: 2;
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

.status {
  width: fit-content;
  border-radius: 38.32px;
  padding: 6px 14px;
  font-weight: 600;
  letter-spacing: 0em;
}

.close {
  background-color: #f0feed;
  color: #259800;
}

.open {
  background-color: #edf5fe;
  color: #3083ff;
}
</style>
