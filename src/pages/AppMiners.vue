<script>
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner.vue';
export default {
  name: "AppMiners",
  data() {
    return {
      search: '', 
      cards: [],
      isloading:false,
    };
  },
  components:{LoadingSpinner},
  methods: {
    open(cardId) {
      try {
        this.$router.push({ name: "miner", params: {id: cardId}});
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUsers() {
      this.isloading = true;
      const url = "/miners"; 
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      try {
        const response = await axios.get(url, { headers });
        this.cards = response.data;
        for (let i = 0; i < this.cards.length; i++) {
          this.cards[i].is_hidden = this.cards[i].is_hidden ? 'Скрыт' : 'Открыт';
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally{
        this.isloading = false;
      }
    },
    async createMiner() {
      this.isloading = true;
        const url = '/miners/new';
        const imagePath = require('../assets/deleted.jpg') // Update with your actual image file name
        try {
        // Fetch the image file
        const response = await fetch(imagePath);
        if (!response.ok) {
        throw new Error('Failed to fetch image');
        }
        const blob = await response.blob();
        // Convert the blob to base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onload = async () => {
          const base64Image = reader.result.split(',')[1]; // Get base64 string
          const data = {
            name: 'miner',
            description: 'Powerful miner',
            category: '5',
            hash_rate: '225',
            energy_consumption: '3712',
            price: '4014.00',
            income: '18.43',
            hosting: '12.47',
            profit: '5.95',
            discount_value: '0.0',
            discount_count: '0',
            priority: '1',
            image: base64Image // Add the base64 image here
          };
          const token = localStorage.getItem('token');
          const response = await axios.post(url, data, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
          console.log('Miner created:', response.data);
          await this.fetchUsers();
        };
        reader.onerror = (error) => {
          console.error('Error reading file:', error);
        };
        } catch (error) {
        console.error('Error creating miner:', error);
        }finally{
      this.isloading = false;
        }
 }
  },
  computed: {
    filteredCards() {
      return this.cards.filter(card => {
        return (
          card.name.toLowerCase().includes(this.search.toLowerCase()) ||
          card.category.name.toLowerCase().includes(this.search.toLowerCase())
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
  <LoadingSpinner v-if="isloading"/>
  <div class="wrapper" v-else>
  <div class="par">
    <h1>Майнеры</h1>
    <button class="btn edit" @click="createMiner">Добывить</button>
  </div>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Название</span>
      <span>Хэшрейт</span>
      <span>Цена (USD)</span>
      <span>Категория</span>
      <span>Состояние</span>
      <span>Приоритет</span>
      <span class="options-field"></span>
    </div>
    <div class="cards">
      <div class="card" @click="open(card.id)" v-for="card in filteredCards" :key="card.id">
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.name }}</span>
        <span class="card-item">{{ card.hash_rate }} TH</span>
        <span class="card-item">{{ card.price }}</span>
        <span class="card-item">{{ card.category.name || 'Нет категории' }}</span>
        <span class="card-item">
          <div
            class="status"
            :class="{
              closed: card.is_hidden === 'Скрыт',
              opened: card.is_hidden === 'Открыт',
            }"
          >
            {{ card.is_hidden }}
          </div>
        </span>
        <span class="card-item">{{ card.priority }}</span>
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
.par{
  display: flex;
  justify-content: space-between;
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
  /* padding: 14.5px 20px; */
  background-color: none;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #005eff;
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

.opened {
  background-color: #edf5fe;
  color: #3083ff;
}

.closed {
  background-color: #feeded;
  color: #dc2626;
}
</style>
