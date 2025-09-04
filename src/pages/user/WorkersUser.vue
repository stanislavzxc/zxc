<script>
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
  fio: "WorkersUser",
  components: { LoadingSpinner },
  data() {
    return {
      id: "",
      isloading: false,
      cards: [
        // {
        //   id: 1,
        //   name: "test",
        //   type: "boundary",
        //   mode: "HEM",
        //   hash: "150",
        //   miner: "1 - Antminer T21",
        //   status: "Stable",
        //   more: false,
        // },
        // {
        //   id: 2,
        //   name: "test",
        //   type: "boundary",
        //   mode: "HEM",
        //   hash: "150",
        //   miner: "1 - Antminer T21",
        //   status: "Off",
        //   more: false,
        // },
        // {
        //   id: 3,
        //   name: "test",
        //   type: "boundary",
        //   mode: "HEM",
        //   hash: "150",
        //   miner: "1 - Antminer T21",
        //   status: "Unavailable",
        //   more: false,
        // },
        // {
        //   id: 4,
        //   name: "test",
        //   type: "boundary",
        //   mode: "HEM",
        //   hash: "150",
        //   miner: "1 - Antminer T21",
        //   status: "Stable",
        //   more: false,
        // },
        // {
        //   id: 5,
        //   name: "test",
        //   type: "boundary",
        //   mode: "HEM",
        //   hash: "150",
        //   miner: "1 - Antminer T21",
        //   status: "Stable",
        //   more: false,
        // },
        // {
        //   id: 6,
        //   name: "test",
        //   type: "boundary",
        //   mode: "HEM",
        //   hash: "150",
        //   miner: "1 - Antminer T21",
        //   status: "Stable",
        //   more: false,
        // },
        // {
        //   id: 7,
        //   name: "test",
        //   type: "boundary",
        //   mode: "HEM",
        //   hash: "150",
        //   miner: "1 - Antminer T21",
        //   status: "Stable",
        //   more: false,
        // },
        // {
        //   id: 8,
        //   name: "test",
        //   type: "boundary",
        //   mode: "HEM",
        //   hash: "150",
        //   miner: "1 - Antminer T21",
        //   status: "Stable",
        //   more: false,
        // },
      ],
    };
  },
  methods: {
    async getworkers() {
      this.isloading = true;
      const url = `/workers`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {
        const response = await axios.get(url, { headers });
        this.cards = response.data.all.find((w) => w.user_id === this.id);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
      }
    },
  },

  mounted() {
    this.id = localStorage.getItem("userid");
    this.getworkers();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isloading" />
  <div class="wrapper" v-else>
    <div class="actions">
      <img src="../../assets/search-support.svg" alt="" class="search-img" />
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
      <div class="card" v-for="card in cards" :key="card.id">
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.name }}</span>
        <span class="card-item">{{ card.type }}</span>
        <span class="card-item">{{ card.mode }}</span>
        <span class="card-item">{{ card.hash }}</span>
        <span class="card-item">{{ card.miner }}</span>
        <span class="card-item"
          ><div
            class="status"
            :class="{
              stable: card.status == 'Stable',
              off: card.status == 'Off',
              unavailable: card.status == 'Unavailable',
            }"
          >
            {{ card.status }}
          </div></span
        >
        <div class="card-item more">
          <img @click="card.more = !card.more" src="../../assets/more.svg" alt="" />
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
@media (max-width: 450px) {
  .fields span {
    width: 25%;
    font-weight: 500;
    font-size: 14px;
    line-height: 19.12px;
    color: rgba(140, 147, 166, 1);
    word-wrap: break-word;
    white-space: normal;
    hyphens: auto;
    margin: 4px !important;
  }
}
@media (max-width: 400px) {
  .fields span {
    width: 17%;
    font-weight: 500;
    font-size: 14px;
    line-height: 19.12px;
    color: rgba(140, 147, 166, 1);
    word-wrap: break-word;
    white-space: normal;
    hyphens: auto;
    margin: 4px !important;
  }
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
</style>
