<script>
import axios from 'axios'
export default {
  name: "FeedBack",
  data() {
    return {
      search: '', // Поле для хранения текста поиска
      cards: [],
    };
  },
  methods: {
    async fetchUsers() {
      const url = "/feedbacks"; 
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response)
        this.cards = response.data.feedbacks; 

        for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].state === 'wait') {
            this.cards[i].state = 'Ожидает';
          } else if (this.cards[i].state === 'done') {
            this.cards[i].state = 'Обработанные';
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    open(cardId, userid) {
      try {
        this.$router.push({ name: "FeedBackuser", params: {id: cardId, userid: userid} });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    filteredCards() {
      // Фильтрация карточек по имени пользователя и номеру телефона
      return this.cards.filter(card => {
        return (
          card.name.toLowerCase().includes(this.search.toLowerCase()) ||
          card.phone.includes(this.search) // Учитываем, что номер телефона может быть числом
        );
      });
    },
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<template>
  <div class="wrapper">
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Пользователь</span>
      <span>Номер телефона</span>
      <span>Тип</span>
      <span>Состояние</span>
      <span>Создано</span>
      <span class="options-field"></span>
    </div>
    <div class="cards" >
      <div class="card" v-for="card in filteredCards" :key="card.id" @click="go(card.id, card.user.id)"> <!-- Используется filteredCards -->
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.name }}</span>
        <span class="card-item">{{ card.phone }}</span>
        <span class="card-item">{{ card.state }}</span>
        <span class="card-item">
          <div
            class="status"
            :class="{
              wait: card.state === 'Ожидает',
              done: card.state === 'Обработанные',
            }"
          >
            {{ card.state }}
          </div>
        </span>
        <span class="card-item">{{ card.created }}</span>
        <div class="card-item more">
          <img
            @click="card.more = !card.more"
            src="../assets/more.svg"
            alt=""
          />
        
      </div>
        <div class="options" v-if="card.more">
          <button @click="$router.push({ name: 'users' })">Посмотреть</button>
          <button @click="$router.push({ name: 'users' })">Воркеры</button>
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
  width: 12%;
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
  border: 1px solid #eff1f6;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-item {
  width: 12%;
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

.done {
  background-color: #edf5fe;
  color: #3083ff;
}

.wait {
  background-color: #fef4ed;
  color: #ffc130;
}
</style>
