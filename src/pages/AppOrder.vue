<script>
import axios from 'axios'
import LoadingSpinner from './LoadingSpinner.vue';
export default {
  name: "AppOrder",
  components: {LoadingSpinner},
  data() {
    return {
      isloading:false,
      id: this.$route.params.id,
      status: "",
      status_order: "",
      name: "",
      surname: "",
      id_client: "",
      email: "",
      tg: "",
      phone: "",
      headFrame: "",
      miners: [
        {
          id: 3,
          name: "Antminer S21 XP 2з70T",
          count: 25,
          price: "40000",
        },
        {
          id: 32,
          name: "Antminer S21 XP 2з70T",
          count: 25,
          price: "40000",
        },
        {
          id: 35,
          name: "Antminer S21 XP 2з70T",
          count: 25,
          price: "40000",
        },
        {
          id: 3,
          name: "Antminer S21 XP 2з70T",
          count: 25,
          price: "40000",
        },
      ],
    };
  },
  methods: {
    async fetchUsers() {
    const url = `buy/requests/${this.id}`;
    const headers = {
      "Authorization": `Bearer ${localStorage.getItem('token')}`
    };

    try {
      const response = await axios.get(url, { headers });
      console.log(response.data)
          if (response.data.buy_request.state === 'wait') {
            response.data.buy_request.state = 'Ожидает';
          } else if (response.data.buy_request.state === 'in_work') {
            response.data.buy_request.state = 'В процессе';
          } else if (response.data.buy_request.state === 'completed') {
            response.data.buy_request.state = 'Готово';
          } else if (response.data.buy_request.state === 'cancelled') {
            response.data.buy_request.state = 'Отменено';
          }
      const userdata = response.data.buy_request.user; 
      // const states = response.data.states || 'Нет данных'; 
      this.name = userdata.firstname || 'Нет данных';
      this.surname = userdata.lastname || 'Нет данных';
      this.status = response.data.buy_request.state || 'Нет данных';
      // this.status_order = states.in_work || 'Нет данных';
      this.id_client = userdata.id || 'Нет данных';
      this.email = userdata.email || 'Нет данных';
      this.tg = userdata.telegram || 'Нет данных';
      this.phone = userdata.phone || 'Нет данных';
      this.headFrame = userdata.headframe || 'Нет данных';


      this.miners = response.data.buy_requests_miners_items.map(item => ({
        id: item.miner_item.id,
        name: item.miner_item.name,
        count: item.count,
        price: item.miner_item.price,
      }));

    } catch (error) {
      console.error("Error fetching users:", error);
    }
  },
  async changeStatus() {
      this.isloading = true;
      
      const data = {
        state: this.status
      };
      console.log(data)
      
      const url = `/buy/requests/${this.id}`;
      const headers = {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
      };

      try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching users:", error);
      }finally{
        this.isloading = false;
        this.$router.push({name: 'orders'})
      }
    },
    
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>
<template>
  <LoadingSpinner v-if="isloading"/>
  <section class="wrapper" v-else>
    <h1>Заявка #{{ id }}</h1>
    <div class="card">
      <h2>Основная информация</h2>
      <div class="info-item">
        <span class="info-title">Статус оплаты:</span>
        <span
          class="status"
          :class="{
              progress: status === 'В процессе',
              done: status === 'Готово',
              canceled: status === 'Отменено',
              wait: status === 'Ожидает',
          }"
          >{{ status }}</span
        >
      </div>
      <div class="info-item">
        <span class="info-title">Имя:</span>
        <span class="info-value">{{ name }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">Фамилия:</span>
        <span class="info-value">{{ surname }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">ID клиента:</span>
        <span class="info-value open">{{ id_client }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">E-mail:</span>
        <span class="info-value">{{ email }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">Telegram:</span>
        <span class="info-value">{{ tg }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">Телефон:</span>
        <span class="info-value">{{ phone }}</span>
      </div>
      <div class="info-item">
        <span class="info-title">Headframe-аккаунт:</span>
        <span class="info-value open">{{ headFrame }}</span>
      </div>
    </div>
    <div class="card">
      <h2>
        Заказ <span class="open">ID {{ id }}</span>
      </h2>
      <div class="fields">
        <span>ID</span>
        <span>Название</span>
        <span>Количество</span>
        <span>Цена</span>
      </div>
      <div class="miners">
        <div
          class="miner"
          @click="open"
          v-for="miner in miners"
          :key="miner.id"
        >
          <span class="miner-item">{{ miner.id }}</span>
          <span class="miner-item">{{ miner.name }}</span>
          <span class="miner-item">{{ miner.count }}</span>
          <span class="miner-item">{{ miner.price }} $</span>
        </div>
      </div>
    </div>
    <div class="card">
      <h2>Действия</h2>
      <div class="group">
        <label for="status" class="group-value">Статус заказа:</label>
        <select
          type="text"
          id="status"
          name="status"
          v-model="status"
          class="group-item"
          placeholder="Выберите состояние"
          @change="changeStatus()"
        >
          <option value="wait">Ожидает</option>
          <option value="in_work">В процессе</option>
          <option value="completed">Готово</option>
          <option value="cancelled">Отменено</option>
        </select>
      </div>
      
    </div>
  </section>
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

.done {
  background-color: #f0feed;
  color: #259800;
}

.not_done {
  background-color: #feeded;
  color: #dc2626;
}

.open {
  color: #195ee6;
  text-decoration: underline;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  cursor: pointer;
}

.card-file {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.file {
  display: flex;
  gap: 10px;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 500;
  font-size: 12px;
  line-height: 16.8px;
}

.size {
  color: #a7adbe;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
}

.edit-btn,
.delete {
  width: fit-content;
  color: #195ee6;
  text-decoration: underline;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  cursor: pointer;
}

.delete {
  color: #dc2626;
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
.miners {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.miner {
  position: relative;
  background-color: #fff;
  border: 1px solid #eff1f6;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  transition: all 500ms ease;
}

.miner-item {
  width: 12%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(20, 23, 31, 1);
}

.miner:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}
</style>
