<script>
import LoadingSpinner from './LoadingSpinner.vue';
import axios from 'axios';

export default {
  components: { LoadingSpinner },
  data() {
    return {
      user: {},
      isLoading: true,
      miner: '',
      worker: '',
      minersList: [],
      workersList: [],
      isload: false,
      cards: [],
    };
  },
  async mounted() {
    const { data } = this.$route.query;
    if (data) {
      try {
        this.user = JSON.parse(data);
        this.miner = this.user.miner || '';
        this.worker = this.user.worker || '';
      } catch {
        this.user = {};
      }
    }
    await Promise.all([this.loadMiners(), this.loadWorkers()]);
    this.isLoading = false;
  },
  methods: {
    getAuthHeaders() {
      return {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json"
      };
    },
    async loadMiners() {
      try {
        const res = await axios.get('/miners', { headers: this.getAuthHeaders() });
        this.minersList = res.data;
      } catch (e) {
        console.error('Ошибка загрузки майнеров', e);
      }
    },
    async loadWorkers() {
      try {
        const res = await axios.get('/workers', { headers: this.getAuthHeaders() });
        this.workersList = res.data;
      } catch (e) {
        console.error('Ошибка загрузки воркеров', e);
      }
    },
    async fetchUsers(state) {
      this.isload = true;
      const url = `https://totalminers.io/api/users/testmode/${this.user.id}`;
      const headers = this.getAuthHeaders();
      const data = {
        state: state,
        testmodetype: 'testmode',
        cost: this.user.cost,
        hashrate: this.user.hashrate,
        hosting: this.user.hosting,
        profit: this.user.profit,
        worker: this.worker,
        miner: this.miner,
      };
      try {
        const response = await axios.put(url, data, { headers });
        this.cards = response.data.tickets || [];
        this.cards.forEach(card => {
          if (card.state === 'wait') card.state = 'Ожидает';
          else if (card.state === 'stop') card.state = 'Остановлено';
          else if (card.state === 'open') card.state = 'Запущено';
          if (card.testmodetype === 'testmode') card.testmodetype = 'Тест Режим';
          if (card.time_left === '0ч 0м') card.state = 'Завершено';
        });
      } catch (e) {
        console.error('Ошибка обновления пользователя', e);
      } finally {
        this.isload = false;
      }
    },
  }
};
</script>


<template>
  <div>
    <loading-spinner v-if="isLoading" />
    <div v-else class="card more-info">
      <h1>Пользователь <span>ID {{ user.user?.id }} ({{ user.user?.email }})</span></h1>
      <h2>Доп. информация</h2>
      <div class="info">
        <div><b>Дата запуска:</b> {{ user.created }}</div>
        <div><b>Телефон:</b> {{ user.user?.phone }}</div>
        <div>
          <b>Статус:</b>
          <span :class="user.state?.toLowerCase()">{{ user.state }}</span>
        </div>
        <div><b>Цена:</b> {{ user.cost }} $</div>
        <div><b>Хешрейт:</b> {{ user.hashrate }} TH</div>
        <div><b>Хостинг:</b> {{ user.hosting }} $</div>
        <div><b>Добыто:</b> {{ user.profit }} BTC</div>
        <div class="clock">
          <img src="../assets/clock.png" />
          <span>{{ user.time_left }}</span>
        </div>
      </div>

      <div class="info-edit">
        <label for="worker">Воркеры</label>
        <select id="worker" v-model="worker">
          <option disabled value="">Выберите воркера</option>
          <option v-for="w in workersList" :key="w.id" :value="w.id">{{ w.name }}</option>
        </select>

        <label for="miner">Майнер</label>
        <select id="miner" v-model="miner">
          <option disabled value="">Выберите майнер</option>
          <option v-for="m in minersList" :key="m.id" :value="m.id">{{ m.name }}</option>
        </select>
      </div>

      <button class="btn save" @click="fetchUsers(user.state)">Сохранить</button>

      <div class="container">
        <div class="left-buttons">
          <button class="btn save red" @click="fetchUsers('complete')">Отключить</button>
          <button class="btn save yellow" @click="fetchUsers('stop')">Пауза</button>
        </div>
        <button class="btn save" @click="fetchUsers('open')">Запустить</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 10px;
}
.left-buttons {
  display: flex;
  width: 50%;
  gap: 10px;
}
.left-buttons .btn {
  flex: 1;
}
.container > button.btn {
  width: 50%;
}
.btn {
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  border: none;
  color: #fff;
  background-color: #005eff;
  transition: background-color 0.3s ease;
}
.btn.save.red {
  background-color: #f03434;
}
.btn.save.yellow {
  background-color: #949484;
}
.btn:hover {
  opacity: 0.9;
}
.info-edit {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 20px 0;
}
select {
  padding: 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
.clock {
  display: flex;
  align-items: center;
  gap: 5px;
  background: #195ee6;
  padding: 8px 12px;
  border-radius: 10px;
  width: 100px;
  color: #fff;
}
</style>




<style scoped>
.yellow{
  background-color: rgb(148, 148, 132) !important;
}
.red{
  background-color: rgb(240, 52, 52) !important;
}
.container {
  display: flex;
  width: 100%;
  gap: 10px;
}

.left-buttons {
  display: flex;
  width: 50%;
  gap: 10px;
}

.left-buttons .btn {
  flex: 1;
}

.container > button.btn {
  width: 50%;
}

.wrap-group{
  width:100% !important;
  justify-content: space-between;
  justify-content: space-around;
  /* gap: 50px; */
}
.clock{
  background-color:#195EE6;
  display:flex;
  justify-content: space-around;
  gap: 5px;
  border-radius:10px;
  padding: 10px;
  width:100px;
}
.clock span{
  color:white;
}
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
.card {
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  border-radius: 20px;
  border: 1px solid #f0f0f5;
  transition: all 500ms ease;
  cursor: auto;
}

.card:hover,
.btn-action:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

.wrap-title {
  display: flex;
  align-items: center;
  gap: 8px;
}

.group-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

h1 span {
  font-weight: 600;
  font-size: 24px;
  line-height: 32.78px;
}

h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 27.32px;
  color: #14171f;
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

.btn {
  padding: 14.5px 24px;
  border-radius: 8px;
  color: #5b6171;
  font-weight: 600;
  transition: all 500ms ease;
}
.edit {
  color: #195ee6;
}

.group {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.group-value,
.hash {
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
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
  background-color: #005eff;
  color: #fff;
}

.more-info,
.history {
  gap: 30px;
}

.info {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  color: #5b6171;
}

.info-value {
  font-weight: 500;
  color: #262d40;
}

.info-edit {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.payments {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.payment {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 0 0 20px 0;
  border-bottom: 1px solid #eff1f6;
}

.payment:last-child {
  border: none;
}

.wrap-info {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.detail-info {
  display: flex;
  align-items: center;
  gap: 20px;
}

.id {
  font-weight: 600;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  color: #14171f;
}

.date,
.type,
.payment-price {
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  color: #262d40;
}

.id-payment {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
  letter-spacing: 0em;
  color: #5b6171;
}

.id-payment a,
.hash a,
.payment-host a {
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  text-decoration: underline;
  color: #195ee6;
  cursor: pointer;
}

.price {
  font-weight: 600;
  font-size: 16px;
  line-height: 16px;
  letter-spacing: 0em;
  color: #259800;
}

.miner {
  width: 98%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.miner-name {
  font-weight: 600;
  font-size: 18px;
  line-height: 18px;
  letter-spacing: 0em;
}

.payments-host {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.payment-host {
  display: flex;
  align-items: center;
  gap: 10px;
}

.wrap-check {
  display: flex;
  align-items: center;
  gap: 10px;
}

.send {
  background-color: #195ee6;
  font-weight: 600;
  letter-spacing: 0em;
  color: #fff;
}

.wrap-btns {
  display: flex;
  align-items: center;
  gap: 10px;
}

.btn-action {
  width: 33%;
  padding: 14.5px 24px;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0em;
  color: #fff;
  transition: all 500ms ease;
}

.delete {
  color: #dc2626;
  border: 1px solid #dc2626;
}

.block {
  background-color: #dc2626;
  border: 1px solid #dc2626;
}

.unblock {
  background-color: #195ee6;
  border: 1px solid #195ee6;
}
</style>