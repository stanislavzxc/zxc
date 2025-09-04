<script>
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner.vue';
export default {
  name: "FeedBack",
  data() {
    return {
      search: '', // Поле для хранения текста поиска
      cards: [],
      isload:false,
    };
  },
  compontents:{
    LoadingSpinner
  },
  methods: {
    async fetchUsers() {
      this.isload = true; 
      const url = `https://totalminers.io/api/users/testmode`;

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      };

    
      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
        this.cards = response.data.tickets;
        for (let i = 0; i < this.cards.length; i++) {
          switch (this.cards[i].state) {
            case 'wait':
            this.cards[i].state = "Ожидает"
              break;
            case 'stop':
            this.cards[i].state = "Остановлено"
              break;
            case 'open':
            this.cards[i].state = "Запущено"
              break;
            case 'complete':
            this.cards[i].state = "Завершено"
              break;
          
            default:
              break;
          }
          switch (this.cards[i].testmodetype) {
            case 'testmode':
            this.cards[i].testmodetype = "Тест Режим"
              break;
            // case 'stop':
            // this.cards[i].state = "Остановлено"
            //   break;
            // case 'open':
            // this.cards[i].state = "Запущено"
            //   break;
          
            default:
              break;
          }
          if(this.cards[i].time_left == '0ч 0м'){
            this.cards[i].state = 'Завершено';
          }
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally{
      this.isload = false; 
      }
    },
    go(userid, user){
      this.$router.push({ 
        name: "blocktest",  
        params: { id: userid },
        query: { data: JSON.stringify(user) }
      });
    }
  },
  computed: {
    filteredCards() {
      // Фильтрация карточек по имени пользователя и номеру телефона
      return this.cards.filter(card => {
        return (
        card.user.firstname.toLowerCase().includes(this.search.toLowerCase()) ||
        (card.user.phone && card.user.phone.includes(this.search))
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
  <LoadingSpinner v-if="isload" /> 
  <div class="wrapper" v-else>
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
      <span>Осталось</span>
      <span class="options-field"></span>
    </div>
    <div class="cards">
      <div class="card" v-for="card in filteredCards" :key="card.id" @click="go(card.user.id, card)"> <!-- Используется filteredCards -->
        <span class="card-item">{{ card.user.id }}</span>
        <span class="card-item">{{ card.user.firstname }} {{ card.user.lastname }}</span>
        <span class="card-item">{{ card.user.phone }}</span>
        <span class="card-item">{{ card.testmodetype }}</span>
        <span class="card-item">
          <div
            class="status"
            :class="{
              wait: card.state === 'Ожидает',
              open: card.state === 'Запущено',
              stop: card.state === 'Остановлено',
              complete: card.state === 'Завершено',
            }"
          >
            {{ card.state }}
          </div>
        </span>
        <span class="card-item">{{ card.created }}</span>
        <span class="card-item">{{ card.time_left }}</span>
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
.wait{
  border-radius: 38.32px;
  padding: 6px 14px;
  background-color: #FEF4ED;
  color: #FFC130;
}
.complete{
  border-radius: 38.32px;
  padding: 6px 14px;
  background-color: #F0FEED;
  color: rgb(64, 207, 64);
}
.open{
  border-radius: 38.32px;
  padding: 6px 14px;
  background-color: #edf5fe;
  color: #3083ff;
}
.stop{
  border-radius: 38.32px;
  padding: 6px 14px;
  background-color: #5B61711A;
  color: #5B6171;
}
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

.done {
  background-color: #edf5fe;
  color: #3083ff;
}

.wait {
  background-color: #fef4ed;
  color: #ffc130;
}
</style>
