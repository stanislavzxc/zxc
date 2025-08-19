<script>
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
  name: "BusinessSettings",
  components: { LoadingSpinner },
  data() {
    return {
      junior: {
        miner: "1",
        count: "1",
        discount: "1",
        cost: "1",
      },
      middle: {
        miner: "1",
        count: "1",
        discount: "1",
        cost: "1",
      },
      senior: {
        miner: "1",
        count: "1",
        discount: "1",
        cost: "1",
      },
      state: [],
      minersList: [],
      isloading: false,
    };
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
    },
    async getinfo() {
      this.isloading = true;
      await this.loadMiners();
      const url = `https://totalminers.io/api/miners/business`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {
        const response = await axios.get(url, { headers });
        this.state = response.data[0];
        console.log(response);
        this.updateDataFromState();
      } catch (error) {
        console.error("Error updating settings:");
      } finally {
        this.isloading = false;
      }
    },
    async loadMiners() {
      try {
        const res = await axios.get("/miners", { headers: this.getAuthHeaders() });
        this.minersList = res.data;
        console.log(this.minersList);
      } catch (e) {
        console.error("Ошибка загрузки майнеров", e);
      }
    },
    updateDataFromState() {
      this.junior.miner = this.state.miner1;
      this.junior.count = this.state.count1;
      this.junior.discount = this.state.hosting_discount1; // Исправлено
      this.junior.cost = this.state.cost1;

      this.middle.miner = this.state.miner2;
      this.middle.count = this.state.count2;
      this.middle.discount = this.state.hosting_discount2; // Исправлено
      this.middle.cost = this.state.cost2; // Исправлено: было this.middle.count = this.state.cost2

      this.senior.miner = this.state.miner3;
      this.senior.count = this.state.count3;
      this.senior.discount = this.state.hosting_discount3; // Исправлено
      this.senior.cost = this.state.cost3;
    },

    async updateinfo() {
      this.isloading = true;
      const url = `https://totalminers.io/api/miners/business`;

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      const data = {
        miner1: this.junior.miner,
        count1: this.junior.count, // Исправлено: было cost
        hosting_discount1: this.junior.discount, // Исправлено: было discount1
        cost1: this.junior.cost,

        miner2: this.middle.miner,
        count2: this.middle.count, // Исправлено: было cost
        hosting_discount2: this.middle.discount, // Исправлено: было discount2
        cost2: this.middle.cost,

        miner3: this.senior.miner,
        count3: this.senior.count, // Исправлено: было cost
        hosting_discount3: this.senior.discount, // Исправлено: было discount3
        cost3: this.senior.cost,
      };
      try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error updating settings:");
      } finally {
        this.isloading = false;
      }
    },
  },
  mounted() {
    this.getinfo();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isloading" />
  <section class="wrapper" v-else>
    <div class="card">
      <h2>Начинающий</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="junior.miner" class="group-value">Тип аппарата</label>
          <select
            type="text"
            id="junior.miner"
            name="junior.miner"
            v-model="junior.miner"
            class="group-item"
            placeholder="Выберите роль"
          >
            <option v-for="m in minersList" :key="m.id" :value="m.name">
              {{ m.name }}
            </option>
          </select>
        </div>
        <div class="group">
          <label for="junior.count" class="group-value">Количество</label>
          <input
            type="text"
            id="junior.count"
            name="junior.count"
            v-model="junior.count"
            class="group-item"
            placeholder="10"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="junior.sale" class="group-value">Скидка на хостинг</label>
          <input
            type="text"
            id="junior.discount"
            name="junior.discount"
            v-model="junior.discount"
            class="group-item"
            placeholder="5%"
          />
        </div>
        <div class="group">
          <label for="junior.price" class="group-value">Цена</label>
          <input
            type="text"
            id="junior.cost"
            name="junior.cost"
            v-model="junior.cost"
            class="group-item"
            placeholder="5000 $"
          />
        </div>
      </div>
      <button class="btn save" @click="this.updateinfo()">Сохранить</button>
    </div>
    <div class="card">
      <h2>Продвинутый</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="middle.miner" class="group-value" @click="this.updateinfo()"
            >Тип аппарата</label
          >
          <select
            type="text"
            id="middle.miner"
            name="middle.miner"
            v-model="middle.miner"
            class="group-item"
            placeholder="Выберите роль"
          >
            <option v-for="m in minersList" :key="m.id" :value="m.name">
              {{ m.name }}
            </option>
          </select>
        </div>
        <div class="group">
          <label for="middle.count" class="group-value">Количество</label>
          <input
            type="text"
            id="middle.count"
            name="middle.count"
            v-model="middle.count"
            class="group-item"
            placeholder="10"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="middle.sale" class="group-value">Скидка на хостинг</label>
          <input
            type="text"
            id="middle.discount"
            name="middle.discount"
            v-model="middle.discount"
            class="group-item"
            placeholder="5%"
          />
        </div>
        <div class="group">
          <label for="middle.price" class="group-value">Цена</label>
          <input
            type="text"
            id="middle.cost"
            name="middle.cost"
            v-model="middle.cost"
            class="group-item"
            placeholder="5000 $"
          />
        </div>
      </div>
      <button class="btn save">Сохранить</button>
    </div>
    <div class="card">
      <h2>Инвестор</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="senior.miner" class="group-value">Тип аппарата</label>
          <select
            type="text"
            id="senior.miner"
            name="senior.miner"
            v-model="senior.miner"
            class="group-item"
            placeholder="Выберите роль"
          >
            <option v-for="m in minersList" :key="m.id" :value="m.name">
              {{ m.name }}
            </option>
          </select>
        </div>
        <div class="group">
          <label for="senior.count" class="group-value">Количество</label>
          <input
            type="text"
            id="senior.count"
            name="senior.count"
            v-model="senior.count"
            class="group-item"
            placeholder="10"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="senior.sale" class="group-value">Скидка на хостинг</label>
          <input
            type="text"
            id="senior.discount"
            name="senior.discount"
            v-model="senior.discount"
            class="group-item"
            placeholder="5%"
          />
        </div>
        <div class="group">
          <label for="senior.price" class="group-value">Цена</label>
          <input
            type="text"
            id="senior.cost"
            name="senior.cost"
            v-model="senior.cost"
            class="group-item"
            placeholder="5000 $"
          />
        </div>
      </div>
      <button class="btn save" @click="this.updateinfo()">Сохранить</button>
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
.btn-action:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

h2 {
  font-weight: 600;
  color: #5b6171;
}

.btn {
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
  cursor: pointer;
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

.save {
  width: 100%;
  background-color: #195ee6;
  color: #fff;
  font-weight: 600;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 27.32px;
  color: #14171f;
}

.wrap-avatar {
  display: flex;
  align-items: center;
  gap: 20px;
}

.container-img {
  width: 120px;
  height: 120px;
}

.container-img img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actions-avatar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.edit-img,
.delete-img {
  width: fit-content;
  color: #195ee6;
  text-decoration: underline;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  cursor: pointer;
}

.delete-img {
  color: #dc2626;
}

.group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrap-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.new {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wrap-actions img {
  height: 28px;
  width: 28px;
  cursor: pointer;
}

.wrap-actions span {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}
</style>
