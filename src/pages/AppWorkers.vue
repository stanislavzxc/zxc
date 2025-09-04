<script>
import axios from "axios";
import ModalWorkers from "./ModalWorkers.vue";
export default {
  name: "AppWorkers",
  components: { ModalWorkers },
  data() {
    return {
      active: "",
      offline: "",
      totalHash: "",
      search: "",
      cards: [],
      is_open: false,
    };
  },
  methods: {
    open(userId) {
      try {
        this.$router.push({ name: "worker", params: { id: userId } });
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUsers() {
      const url = "/workers";
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        this.cards = response.data.all;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async create(workerData) {
      const id = workerData.userid;
      const url = `/workers/${id}/create`; // Убедитесь, что URL правильный
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      const data = {
        name: workerData.name,
        donor_miner_id: workerData.donor_miner_id,
        hash_rate: workerData.hash_rate,
        hash_type: workerData.hash_type,
        miner_item_id: workerData.miner_item_id,
      };
      console.log(data);
      try {
        const response = await axios.post(url, data, { headers });
        console.log(data);
        console.log(response.data);
        // Здесь вы можете добавить логику, чтобы обновить список работников или закрыть модальное окно
        this.fetchUsers(); // Обновление списка работников после создания
        this.is_open = false; // Закрыть модальное окно
      } catch (error) {
        console.error("Error creating worker:", error);
        alert("Ошибка");
      }
    },
    async mainData() {
      let url = "/main";

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });

        this.active = response.data.offline_workers;
        this.offline = response.data.online_workers;
        this.totalHash = response.data.total_hashrate;
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
  },
  computed: {
    filteredCards() {
      return this.cards.filter((card) => {
        return (
          card.name.toLowerCase().includes(this.search.toLowerCase()) ||
          card.behavior.toLowerCase().includes(this.search.toLowerCase()) //||
          // card.mode.toLowerCase().includes(this.search.toLowerCase())
        );
      });
    },
  },
  mounted() {
    this.mainData();
    this.fetchUsers();
    // this.create();
  },
};
</script>

<template>
  <div class="wrapper">
    <ModalWorkers @close="is_open = false" @update="create" v-if="is_open" />
    <div class="wrap-title">
      <h1>Воркеры</h1>
      <div class="stat">
        <div class="online"></div>
        <span>{{ active }}</span>
      </div>
      <div class="stat">
        <div class="offline"></div>
        <span>{{ offline }}</span>
      </div>
      <span class="totalHash">{{ totalHash }}</span>
      <button class="btn add_user" @click="is_open = true">Создать воркер</button>
    </div>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Название</span>
      <span>Тип</span>
      <span>Режим</span>
      <span>Хешрейт</span>
      <span>Товар</span>
      <span>Статус</span>
      <span class="options-field"></span>
    </div>
    <div class="cards">
      <div
        class="card"
        @click="open(card.id)"
        v-for="card in filteredCards"
        :key="card.id"
      >
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.name }}</span>
        <span class="card-item">{{ card.behavior }}</span>
        <span class="card-item">{{ card.is_active }}</span>
        <span class="card-item">{{ card.hash || "Нет данных" }}</span>
        <span class="card-item">{{ card.miner || "Нет данных" }}</span>
        <span class="card-item">
          <div
            class="status"
            :class="{
              stable: card.is_active == true,
              off: card.is_active == false,
              unavailable: card.is_active == 'Unavailable',
            }"
          >
            {{ card.is_active }}
          </div>
        </span>
        <div class="card-item more">
          <img @click.stop="card.more = !card.more" src="../assets/more.svg" alt="" />
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

.stable {
  background-color: #f0feed;
  color: #259800;
}

.off {
  background-color: #feeded;
  color: #dc2626;
}

.unavailable {
  background-color: #fef4ed;
  color: #ffc130;
}

.wrap-title {
  display: flex;
  align-items: center;
  gap: 20px;
}

.stat {
  display: flex;
  align-items: center;
  gap: 10px;
}

.totalHash {
  font-weight: 600;
  font-size: 16px;
  color: #262d40;
  line-height: 21.86px;
}
</style>
