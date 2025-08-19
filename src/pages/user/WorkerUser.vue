<script>
  import axios from 'axios'
export default {
  name: "WorkerUser",
  components: {},
  data() {
    return {

      worker_id: this.$route.params.id,
      status: "",
      headFrameID: "",
      user: '',
      dateConnect: "2024-08-26 11:20",
      fan1: "60",
      fan2: "20",
      fan3: "10",
      fan4: "80",
      temp: "70",
      hash: "150",
      energy_consumption: "150",
      mode: "HEM",
      dohod_btc: "1500",
      dohod_usd: "4852200",
      rashod_btc: "500",
      rashod_usd: "852 200",
      profit_btc: "1000",
      profit_usd: "4852200",
      name: "",
      type: "",
      miner: "",
      invisible: true,
    };
  },
  methods: {
    async fetchUsers() {
      const url = `/workers/${this.worker_id}`; 
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      try {
        const response = await axios.get(url, { headers });
        this.user = `ID ${response.data.user.id} (${response.data.user.email})`;
        this.status = response.data.worker.status || 'Нет данных';
        this.headFrameID = response.data.worker.headFrameID || 'Нет данных';
        this.name = response.data.worker.name || 'Нет данных'
        this.type = response.data.worker.behavior || 'Нет данных'
        this.miner = response.data.miners_items.name || 'Нет данных'
        this.dateConnect = response.data.worker.created || 'Нет данных';
        console.log(this.user_id)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    async update(){
     const url = `/workers/${this.worker_id}`; 
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json" 
      };
      const data = {
        id_str: String(this.worker_id),
        name:this.name,
        behavior:this.type,
        miner_item_id:'None',
        hidden:this.invisible,
      }
      try {
        const response = await axios.put(url, data, { headers });
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<template>
  <section class="wrapper">
    <div class="group-title">
      <h1>Воркер #{{ worker_id }}</h1>
      <button class="btn edit">Редактиовать</button>
    </div>
    <div class="card">
      <div class="info-item">
        <span class="info-title">Статус:</span>
        <span class="status" :class="{ lowHash: status == 'Low Hash' }">{{
          status
        }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">Headframe worker ID:</span>
        <span class="info-value">{{ headFrameID }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">Пользователь:</span>
        <span class="info-value user">{{ user }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">Дата подключения:</span>
        <span class="info-value">{{ dateConnect }}</span>
      </div>
      <button class="btn edit enable">Включить</button>
    </div>
    <div class="card">
      <h2>Технические данные</h2>
      <div class="wrap-fans">
        <div class="fan">
          <img src="../../assets/fan.svg" alt="" />
          <span class="info-title">FAN 1:</span>
          <span class="info-value">{{ fan1 }}%</span>
        </div>
        <div class="fan">
          <img src="../../assets/fan.svg" alt="" />
          <span class="info-title">FAN 2:</span>
          <span class="info-value">{{ fan2 }}%</span>
        </div>
        <div class="fan">
          <img src="../../assets/fan.svg" alt="" />
          <span class="info-title">FAN 3:</span>
          <span class="info-value">{{ fan3 }}%</span>
        </div>
        <div class="fan">
          <img src="../../assets/fan.svg" alt="" />
          <span class="info-title">FAN 4:</span>
          <span class="info-value">{{ fan4 }}%</span>
        </div>
      </div>
      <div class="info-item">
        <img src="../../assets/temp.svg" alt="" />
        <span class="info-title">Температура:</span>
        <span class="info-value">{{ temp }}°C</span>
      </div>
      <div class="info-item">
        <span class="info-title">Хешрейт:</span>
        <span class="info-value">{{ hash }} TH’s</span>
      </div>
      <div class="info-item">
        <span class="info-title">Потребление:</span>
        <span class="info-value">{{ energy_consumption }} KW/час</span>
      </div>
      <div class="info-item">
        <span class="info-title">Режим работы:</span>
        <span class="info-value">{{ mode }}</span>
      </div>
    </div>
    <div class="card">
      <h2>Финансовые данные</h2>
      <div class="info-item">
        <span class="info-title">Доход:</span>
        <span class="info-value">{{ dohod_btc }} BTC ({{ dohod_usd }} $)</span>
      </div>
      <div class="info-item">
        <span class="info-title">Расход:</span>
        <span class="info-value"
          >{{ rashod_btc }} BTC ({{ rashod_usd }} $)</span
        >
      </div>
      <div class="info-item">
        <span class="info-title">Прибыль:</span>
        <span class="info-value"
          >{{ profit_btc }} BTC ({{ profit_usd }} $)</span
        >
      </div>
    </div>
    <div class="card">
      <h2>Основная информация</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="name" class="group-value">Название</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            class="group-item"
            placeholder="Введите название"
          />
        </div>
        <div class="group">
          <label for="type" class="group-value">Тип</label>
          <select
            type="text"
            id="type"
            name="type"
            v-model="type"
            class="group-item"
            placeholder="Введите тип воркера"
          >
            <option value="boundary">Boundary</option>
          </select>
        </div>
      </div>
      <div class="group">
        <label for="miner" class="group-value">Товар</label>
        <select
          type="text"
          id="miner"
          name="miner"
          v-model="miner"
          class="group-item"
          placeholder="Выберите асик"
        ></select>
      </div>
      <div class="wrap-check">
        <input
          type="checkbox"
          v-model="invisible"
          id="invisible"
          class="checkbox"
        />
        <label for="invisible" class="group-value"
          >Скрыть (Видимость аппарата)</label
        >
      </div>
      <button class="btn save" @click="update()">Сохранить</button>
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

.user {
  color: #195ee6;
  text-decoration: underline;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
}

.enable {
  width: fit-content;
  padding: 0;
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
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  color: #262d40;
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

.status {
  width: fit-content;
  padding: 6px 14px;
  border-radius: 38.32px;
  font-weight: 600;
}

.lowHash {
  background-color: #edf5fe;
  color: #3083ff;
}

.wrap-fans {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.fan {
  width: 24%;
  display: flex;
  align-items: center;
  gap: 10px;
}

.save {
  width: 100%;
  background-color: rgba(91, 97, 113, 0.1);
  color: rgba(91, 97, 113, 0.7);
}
</style>
