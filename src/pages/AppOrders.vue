<script>
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner.vue';
export default {
  name: "AppOrders",
  components:{LoadingSpinner},
  data() {
    return {
      cards: [],
      search: '',
      isloading: false,
    };
  },
  computed: {
    filteredCards() {
      return this.cards.filter(card => {
        return card.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    open(cardId,card) {
      try {
        localStorage.setItem('state', card);
        this.$router.push({ name: "order", params: { id: cardId } });
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUsers() {
      this.isloading = true;
      const url = "/buy/requests"; 
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data)
        this.cards = response.data; 
        for (let i = 0; i < this.cards.length; i++) {
          if (this.cards[i].state === 'wait') {
            this.cards[i].state = 'Ожидает';
          } else if (this.cards[i].state === 'in_work') {
            this.cards[i].state = 'В процессе';
          } else if (this.cards[i].state === 'completed') {
            this.cards[i].state = 'Готово';
          } else if (this.cards[i].state === 'cancelled') {
            this.cards[i].state = 'Отменено';
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally{
      this.isloading = false;
      }
    },
    
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>

<template>
  <LoadingSpinner v-if="isloading"/>
  <div class="wrapper" v-else>
    <h1>Заказы</h1>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Название</span>
      <span>Дата</span>
      <span>Статус</span>
      <span class="options-field"></span>
    </div>
    <div class="cards">
      <div class="card" @click="open(card.id, card.state)" v-for="card in filteredCards" :key="card.id">
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.name }}</span>
        <span class="card-item">{{ card.created }}</span>
        <span class="card-item">
          <div
            class="status"
            :class="{
              progress: card.state === 'В процессе',
              done: card.state === 'Готово',
              canceled: card.state === 'Отменено',
              wait: card.state === 'Ожидает',
            }"
          >
            {{ card.state }}
          </div>
        </span>
        <div class="card-item more">
          <img
            @click="card.more = !card.more"
            src="../assets/more.svg"
            alt=""
          />
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
.canceled {
  background-color: #feeded;
  color: #dc2626;
}
.wait {
  background-color: #fef4ed;
  color: #ffc130;
}
.done {
  background-color: #f0feed;
  color: #259800;
}
.process{
  background-color: #edf5fe;
  color: #3083ff;
}

.not_done {
  background-color: #feeded;
  color: #dc2626;
}
.wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h1 {
  font-weight: 600;
  font-size: 24px;
  line-height: 32.78px;
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

.progress {
  background-color: #edf5fe;
  color: #3083ff;
}

.done {
  background-color: #f0feed;
  color: #259800;
}
.card-item-open {
  color: #195ee6;
  text-decoration: underline;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  cursor: pointer;
}
</style>
