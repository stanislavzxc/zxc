<script>
import LoadingSpinner from "./LoadingSpinner.vue";
import axios from "axios";
export default {
  name: "AppMain",
  components: { LoadingSpinner },
  data() {
    return {
      total_hashrate: "",
      electricity_cost: "",
      online_workers: "",
      offline_workers: "",
      kw: "",
      statActive: 4,
      income_host: "",
      total_sell: "",
      new_ticket: "",
      req_ticket: "",
      dohod_client: "",
      rashod_client: "",
      profit_client: "",
      isloading: false,
    };
  },
  methods: {
    changeStat(n) {
      try {
        this.statActive = n;
      } catch (err) {
        console.log(err);
      }
    },
    async fetchUsers(type) {
      this.isloading = true;
      let url;
      if (type == "main") {
        url = `/main`;
      } else {
        url = `/main/${type}`;
      }
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
        this.electricity_cost = response.data.electricity_cost;
        this.kw = response.data.kw;
        this.income_host = response.data.hosting_profit;
        this.offline_workers = response.data.offline_workers;
        this.online_workers = response.data.online_workers;
        this.total_hashrate = response.data.total_hashrate;
        this.req_ticket = response.data.feedbacks;
        this.new_ticket = response.data.tickets;
        this.total_sell = response.data.sales_total;
        this.dohod_client = response.data.client_income;
        this.rashod_client = response.data.client_expense;
        this.profit_client = response.data.client_profit;
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
      }
    },
  },
  mounted() {
    this.fetchUsers("main");
  },
};
</script>
<template>
  <LoadingSpinner v-if="isloading" />
  <main class="wrapper" v-else>
    <div class="cards">
      <div class="card total-card">
        <div class="wrap-title">
          <div class="online"></div>
          <span class="title">Online воркеры </span>
        </div>
        <span class="card-value">{{ online_workers }}</span>
      </div>
      <div class="card total-card">
        <div class="wrap-title">
          <div class="offline"></div>
          <span class="title">Offline воркеры </span>
        </div>
        <span class="card-value">{{ offline_workers }}</span>
      </div>
      <div class="card total-card">
        <div class="card-title">TH/s</div>
        <span class="card-value">{{ total_hashrate }}</span>
      </div>
    </div>
    <div class="group-title">
      <h1>Статистика</h1>
      <div class="wrap-btns">
        <button
          class="btn"
          @click="changeStat(1), fetchUsers('daily')"
          :class="{ active: statActive == 1 }"
        >
          День
        </button>
        <button
          class="btn"
          @click="changeStat(2), fetchUsers('weekly')"
          :class="{ active: statActive == 2 }"
        >
          Неделя
        </button>
        <button
          class="btn"
          @click="changeStat(3), fetchUsers('monthly')"
          :class="{ active: statActive == 3 }"
        >
          Месяц
        </button>
        <button
          class="btn"
          @click="changeStat(4), fetchUsers('main')"
          :class="{ active: statActive == 4 }"
        >
          Всё время
        </button>
      </div>
    </div>
    <div class="cards">
      <div class="card stat">
        <span class="card-title">KW</span>
        <span class="card-value">{{ kw }}</span>
      </div>
      <div class="card stat">
        <span class="card-title">Стоимость электроэнергии</span>
        <span class="card-value">{{ electricity_cost }} $</span>
      </div>
      <div class="card stat">
        <span class="card-title">Прибыль (Хостинг)</span>
        <span
          class="card-value"
          :class="{ negative: income_host < 0, positive: income_host >= 0 }"
          >{{ income_host }} $</span
        >
      </div>
      <div class="card stat">
        <span class="card-title">Сумма продаж</span>
        <span
          class="card-value"
          :class="{ negative: total_sell < 0, positive: total_sell >= 0 }"
          >{{ total_sell }} $</span
        >
      </div>
    </div>
    <div class="cards">
      <div class="card card-support">
        <span class="card-title"> Новые тикеты </span>
        <span class="card-value">{{ new_ticket }}</span>
      </div>
      <div class="card card-support">
        <span class="card-title">Запросы на обратную связь</span>
        <span class="card-value">{{ req_ticket }}</span>
      </div>
    </div>
    <div class="cards">
      <div class="card card-client">
        <span class="card-title"> Доход клиентов </span>
        <span
          class="card-value"
          :class="{ negative: dohod_client < 0, positive: dohod_client >= 0 }"
          >{{ dohod_client }} $</span
        >
      </div>
      <div class="card card-client">
        <span class="card-title"> Расход клиентов </span>
        <span
          class="card-value"
          :class="{ negative: rashod_client < 0, positive: rashod_client >= 0 }"
          >{{ rashod_client }} $</span
        >
      </div>
      <div class="card card-client">
        <span class="card-title"> Прибыль клиентов </span>
        <span
          class="card-value"
          :class="{ negative: profit_client < 0, positive: profit_client >= 0 }"
          >{{ profit_client }} $</span
        >
      </div>
    </div>
  </main>
</template>
<style scoped>
@media (max-width: 450px) {
  .group-title {
    display: flex;
    flex-direction: column;
  }
}
.wrapper {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
}

.cards {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.card {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #f0f0f5;
  transition: all 500ms ease;
}

.card:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.total-card,
.card-client {
  width: 33%;
}

.stat {
  width: 25%;
}

.card-support {
  width: 50%;
}

.wrap-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title {
  font-weight: 600;
  font-size: 14px;
  line-height: 14px;
  text-decoration: underline;
  color: #195ee6;
}

.card-title {
  font-weight: 500;
  font-size: 14px;
  line-height: 14px;
  color: #5b6171;
  opacity: 50%;
}

.card-value {
  font-weight: 600;
  font-size: 20px;
  line-height: 20px;
  color: #14171f;
}

.group-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 {
  font-size: 20px;
  font-weight: 600;
  line-height: 27.32px;
  color: #14171f;
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

.negative {
  color: #dc2626;
}

.positive {
  color: #259800;
}
</style>
