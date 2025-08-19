<script>
import axios from 'axios'
export default {
  name: "SiteSettings",
  data() {
    return {
      top20: true,
      market: true,
      center_info: true,
      tech: true,
      business: true,
      stat: true,
      dashboard: true,
      payments: true,
      miners: true,
      accuruals: true,
      test: true,
      reg: false,
      close: false,
      state: [],
    };
  },
  methods: {
    async getinfo() {
      const url = `https://totalminers.io/api/settings/content`;
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };
      try {
        const response = await axios.get(url, { headers });
        this.state = response.data[0];
        console.log(response)
        this.updateDataFromState();
      } catch (error) {
        console.error("Error updating settings:");
      }
    },
    updateDataFromState() {
      this.top20 = this.state.top20;
      this.market = this.state.market;
      this.center_info = this.state.center_info;
      this.tech = this.state.tech;
      this.stat = this.state.stat;
      this.dashboard = this.state.dashboard;
      this.payments = this.state.payments;
      this.miners = this.state.miners;
      this.accuruals = this.state.accuruals;
      this.test = this.state.test;
      this.reg = this.state.reg;
      this.close = this.state.close;
      this.business = this.state.business;
    },
    async updateinfo() {
      const url = `https://totalminers.io/api/settings/content`;
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json"
      };
      const data = {
        accuruals: this.accuruals,
        top20: this.top20,
        market: this.market,
        center_info: this.center_info,
        tech: this.tech,
        business: this.business,
        stat: this.stat,
        dashboard: this.dashboard,
        payments: this.payments,
        miners: this.miners,
        test: this.test,
        reg: this.reg,
        close: this.close,
      };
      try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error updating settings:");
      }
    }
  },
  mounted() {
    this.getinfo();
  }
};
</script>

<template>
  <section class="wrapper">
    <div class="card">
      <h2>Управление разделами</h2>
      <div class="wrap-check">
        <input type="checkbox" v-model="top20" id="top20" class="checkbox" />
        <label for="top20" class="group-value">ТОП 20</label>
      </div>
      <div class="wrap-check">
        <input type="checkbox" v-model="market" id="market" class="checkbox" />
        <label for="market" class="group-value">Маркетплейс</label>
      </div>
      <div class="wrap-check">
        <input
          type="checkbox"
          v-model="center_info"
          id="center_info"
          class="checkbox"
        />
        <label for="center_info" class="group-value">Справочный центр</label>
      </div>
      <div class="wrap-check">
        <input
          type="checkbox"
          v-model="tech"
          id="tech"
          class="checkbox"
        />
        <label for="tech" class="group-value">Тех поддержка</label>
      </div>
      <div class="wrap-check">
        <input
          type="checkbox"
          v-model="business"
          id="business"
          class="checkbox"
        />
        <label for="business" class="group-value">Готовый бизнес</label>
      </div>
      <div class="wrap-check">
        <input type="checkbox" v-model="stat" id="stat" class="checkbox" />
        <label for="stat" class="group-value">Моя статистика</label>
      </div>
      <div class="wrap-check">
        <input type="checkbox" v-model="dashboard" id="dashboard" class="checkbox" />
        <label for="dashboard" class="group-value">Дашбоард</label>
      </div>
      <div class="wrap-check">
        <input
          type="checkbox"
          v-model="payments"
          id="payments"
          class="checkbox"
        />
        <label for="payments" class="group-value">Мои платежи</label>
      </div>
      <div class="wrap-check">
        <input type="checkbox" v-model="miners" id="miners" class="checkbox" />
        <label for="miners" class="group-value">Мои майнеры</label>
      </div>
      <div class="wrap-check">
        <input
          type="checkbox"
          v-model="accuruals"
          id="accuruals"
          class="checkbox"
        />
        <label for="accuruals" class="group-value">Начисление списание</label>
      </div>
      <div class="wrap-check">
        <input type="checkbox" v-model="test" id="test" class="checkbox" />
        <label for="test" class="group-value">Тест режим</label>
      </div>
    </div>
    <div class="card">
      <h2>Управление сайтом</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="test_mode" class="group-value">Тест Режим</label>
          <select
            type="text"
            id="test_mode"
            name="test"
            v-model="test"
            class="group-item"
          >
            <option :value="true">Включен</option>
            <option :value="false">Выключен</option>
          </select>
        </div>
        <div class="group">
          <label for="close" class="group-value"
            >Закрыть сайт на тех. работу</label
          >
          <select
            type="text"
            id="close"
            name="close"
            v-model="close"
            class="group-item"
          >
          <option :value="false">Да</option>
          <option :value="true">Нет</option>
          </select>
        </div>
      </div>
      <div class="group">
        <label for="register" class="group-value">Закрыть регистрацию</label>
        <select
          type="text"
          id="reg"
          name="reg"
          v-model="reg"
          class="group-item"
        >
          <option :value="false">Да</option>
          <option :value="true">Нет</option>
        </select>
      </div>
      <button class="btn save" @click="updateinfo()">Сохранить</button>
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
.wrap-check {
  display: flex;
  align-items: center;
  gap: 10px;
}
</style>
