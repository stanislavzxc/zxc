<script>
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.vue";

export default {
  name: "ContentSettings",
  components: { LoadingSpinner },
  data() {
    return {
      id: "1",
      isloading: false,
      miners: [],

      // calc
      min_calc: "",
      max_calc: "",
      price_energy: "",
      consumption_hash: "",
      price_hash: "",
      btc: "",
      usdt: "",

      // others
      miner_id: "1",
      youtube: "",
      bad_profit: "",
      good_profit: "",
      price_energy_others: "",

      // info
      phone: "+972 50-8981614",
      tg: "t.me/@totalminer",
      whatsApp: "whatsapp/@totalminer",
      tiktok: "@totalminer",
      instagram: "@totalminer",
      copywrite: "Totalminer 2024 All Rights Reserved",

      // banner in trend
      miner_banner: "Майнер 1",
      sale_banner: "5%",

      // faq
      que1: "",
      ans1: "",
      que2: "",
      ans2: "",
      que3: "",
      ans3: "",
    };
  },
  methods: {
    async update() {
      this.isloading = true;

      const url = `/settings/update`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const data = new FormData();
      data.append("payment_bank_card", this.bank);
      data.append("payment_btc", this.btc);
      data.append("payment_usdt", this.usdt);
      data.append("invest_min", this.min_calc);
      data.append("invest_max", this.max_calc);
      data.append("electricity_cost", this.price_energy);
      data.append("hash_rate_electricity_consumption", this.consumption_hash);
      data.append("hash_rate_cost", this.price_hash);
      data.append("miner_banner", this.miner_banner);
      data.append("home_page_youtube_link", this.youtube);
      data.append("payback_min", this.bad_profit);
      data.append("payback_max", this.good_profit);

      console.log(data);

      try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error updating settings:", error.response.data);
      } finally {
        this.isloading = false;
      }
    },
    async updateinfo() {
      this.isloading = true;

      const url = `https://totalminers.io/api/settings/info`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Указываем, что данные в формате JSON
      };

      // Создаем объект с данными
      const data = {
        number: this.phone,
        telegram: this.tg,
        whatsapp: this.whatsApp,
        tiktok: this.tiktok,
        insta: this.instagram,
        copywrite: this.copywrite,
      };

      try {
        // Отправляем данные в формате JSON
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
        console.log("asdfasdfasdfasdfasd");
      } catch (error) {
        console.error("Error updating settings:");
      } finally {
        this.isloading = false;
      }
    },
    async getinfo() {
      this.isloading = true;

      const url = `https://totalminers.io/api/settings/info`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      // Создаем объект с данными

      try {
        // Отправляем данные в формате JSON
        const response = await axios.get(url, { headers });
        console.log(response.data);
        this.phone = response.data[0].number;
        this.tg = response.data[0].telegram;
        this.whatsApp = response.data[0].whatsapp;
        this.tiktok = response.data[0].tiktok;
        this.instagram = response.data[0].insta;
        this.copywrite = response.data[0].copywrite;
      } catch (error) {
        console.error("Error updating settings:");
      } finally {
        this.isloading = false;
      }
    },
    async updatefaq() {
      this.isloading = true;
      const url = `https://totalminers.io/api/settings/faq`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json", // Указываем, что данные в формате JSON
      };

      // Создаем объект с данными
      const data = {
        vopros1: this.que1,
        otvet1: this.ans1,
        vopros2: this.que2,
        otvet2: this.ans2,
        vopros3: this.que3,
        otvet3: this.ans3,
      };

      try {
        // Отправляем данные в формате JSON
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
        console.log("asdfasdfasdfasdfasd");
      } catch (error) {
        console.error("Error updating settings:");
      } finally {
        this.isloading = false;
      }
    },
    async getfaq() {
      this.isloading = true;
      const url = `https://totalminers.io/api/settings/faq`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      // Создаем объект с данными

      try {
        // Отправляем данные в формате JSON
        const response = await axios.get(url, { headers });
        console.log(response.data);
        this.que1 = response.data[0].vopros1;
        this.ans1 = response.data[0].otvet1;
        this.que2 = response.data[0].vopros2;
        this.ans2 = response.data[0].otvet2;
        this.que3 = response.data[0].vopros3;
        this.ans3 = response.data[0].otvet3;
      } catch (error) {
        console.error("Error updating settings:");
      } finally {
        this.isloading = false;
      }
    },
    async getMiners() {
      this.isloading = true;

      const url = `/miners`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        this.miners = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching miners:", error);
      } finally {
        this.isloading = false;
      }
    },
  },
  mounted() {
    this.getinfo();
    this.getfaq();
    this.getMiners();
    setTimeout(() => {
      const data = JSON.parse(localStorage.getItem("settings"));
      this.min_calc = data.invest_min || "";
      this.max_calc = data.invest_max || "";
      this.price_energy = data.electricity_cost || "";
      this.consumption_hash = data.hash_rate_electricity_consumption || "";
      this.price_hash = data.hash_rate_cost || "";
      this.btc = data.payment_btc || "";
      this.usdt = data.payment_usdt || "";
      this.youtube = data.home_page_youtube_link || "";
      this.bad_profit = data.payback_min || "";
      this.good_profit = data.payback_max || "";
      this.miner_banner = data.miner_banner || "1";
      this.bank = data.payment_bank_card || "";
    }, 1000);
  },
};
</script>
<template>
  <LoadingSpinner v-if="isloading" />
  <section class="wrapper" v-else>
    <div class="card">
      <h2>Калькулятор</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="min_calc" class="group-value"
            >Минимальное значение интервала калькулятора</label
          >
          <input
            type="text"
            id="min_calc"
            name="min_calc"
            v-model="min_calc"
            class="group-item"
            placeholder="4700"
          />
        </div>
        <div class="group">
          <label for="max_calc" class="group-value"
            >Максимальное значение интервала калькулятора</label
          >
          <input
            type="text"
            id="max_calc"
            name="max_calc"
            v-model="max_calc"
            class="group-item"
            placeholder="300000"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="price_energy" class="group-value">Цена электричества</label>
          <input
            type="text"
            id="price_energy"
            name="price_energy"
            v-model="price_energy"
            class="group-item"
            placeholder="4700"
          />
        </div>
        <div class="group">
          <label for="consumption_hash" class="group-value">Потребление 1TH</label>
          <input
            type="text"
            id="consumption_hash"
            name="consumption_hash"
            v-model="consumption_hash"
            class="group-item"
            placeholder="300000"
          />
        </div>
        <div class="group">
          <label for="price_hash" class="group-value">Стоимость 1TH</label>
          <input
            type="text"
            id="price_hash"
            name="price_hash"
            v-model="price_hash"
            class="group-item"
            placeholder="4700"
          />
        </div>
      </div>
      <div class="group">
        <label for="btc" class="group-value">Данные оплаты (BTC)</label>
        <input
          type="text"
          id="btc"
          name="btc"
          v-model="btc"
          class="group-item"
          placeholder="656bc1q00pasdfsdfjgpgntduq4yshm6quhqgkxh"
        />
      </div>
      <div class="group">
        <label for="usdt" class="group-value">Данные оплаты (USDT)</label>
        <input
          type="text"
          id="usdt"
          name="usdt"
          v-model="usdt"
          class="group-item"
          placeholder="656bc1q00pasdfsdfjgpgntduq4yshm6quhqgkxh"
        />
      </div>
      <button class="btn save" @click="update()">Сохранить</button>
    </div>
    <!-- ОСТАЛЬНЫЕ -->
    <div class="card">
      <h2>Остальные</h2>
      <div class="group">
        <label for="miner_banner" class="group-value">Майнер для баннера (ID)</label>
        <select
          type="text"
          id="miner_banner"
          name="miner_banner"
          v-model="miner_banner"
          class="group-item"
          placeholder="Выберите майнер"
        >
          <option v-for="miner in miners" :key="miner.id" :value="miner.id">
            {{ miner.id }}
          </option>
        </select>
      </div>
      <div class="group">
        <label for="youtube" class="group-value">Ссылка на ютуб (Главная страница)</label>
        <input
          type="text"
          id="youtube"
          name="youtube"
          v-model="youtube"
          class="group-item"
          placeholder="https://www.youtube.com/watch?v=zt4ZfwM9YUU"
        />
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="bad_profit" class="group-value">Плохая окупаемость (мес)</label>
          <input
            type="text"
            id="bad_profit"
            name="bad_profit"
            v-model="bad_profit"
            class="group-item"
            placeholder="4700"
          />
        </div>
        <div class="group">
          <label for="good_profit" class="group-value">Хорошая окупаемость (мес)</label>
          <input
            type="text"
            id="good_profit"
            name="good_profit"
            v-model="good_profit"
            class="group-item"
            placeholder="300000"
          />
        </div>
      </div>
      <div class="group">
        <label for="price_energe_others" class="group-value"
          >Себестоимость электроэнергии (USD)</label
        >
        <input
          type="text"
          id="price_energe_others"
          name="price_energe_others"
          v-model="price_energe_others"
          class="group-item"
          placeholder="656bc1q00pasdfsdfjgpgntduq4yshm6quhqgkxh"
        />
      </div>
      <button class="btn save" @click="update()">Сохранить</button>
    </div>
    <!-- Основная информация -->
    <div class="card">
      <h2>Основная информация</h2>
      <div class="group">
        <label for="phone" class="group-value">Телефон</label>
        <input
          type="text"
          id="phone"
          name="phone"
          v-model="phone"
          class="group-item"
          placeholder="Введите номер телефона"
        />
      </div>
      <div class="group">
        <label for="tg" class="group-value">Telegram</label>
        <input
          type="text"
          id="tg"
          name="tg"
          v-model="tg"
          class="group-item"
          placeholder="Введите Telegram"
        />
      </div>
      <div class="group">
        <label for="whatsApp" class="group-value">WhatsApp</label>
        <input
          type="text"
          id="whatsApp"
          name="whatsApp"
          v-model="whatsApp"
          class="group-item"
          placeholder="Введите WhatsApp"
        />
      </div>
      <div class="group">
        <label for="tiktok" class="group-value">Tiktok</label>
        <input
          type="text"
          id="tiktok"
          name="tiktok"
          v-model="tiktok"
          class="group-item"
          placeholder="Введите Tiktok"
        />
      </div>
      <div class="group">
        <label for="instagram" class="group-value">Instagram</label>
        <input
          type="text"
          id="instagram"
          name="instagram"
          v-model="instagram"
          class="group-item"
          placeholder="Введите Instagram"
        />
      </div>
      <div class="group">
        <label for="copywrite" class="group-value">Copywrite (Футер)</label>
        <input
          type="text"
          id="copywrite"
          name="copywrite"
          v-model="copywrite"
          class="group-item"
          placeholder="Введите Copywrite"
        />
      </div>
      <button class="btn save" @click="updateinfo()">Сохранить</button>
    </div>
    <!-- Баннер в тренде -->
    <div class="card">
      <h2>Баннер в тренде</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="miner_banner" class="group-value">Название майнера</label>
          <select
            type="text"
            id="miner_banner"
            name="miner_banner"
            v-model="miner_banner"
            class="group-item"
          >
            <option value="Майнер 1">Майнер 1</option>
          </select>
        </div>
        <div class="group">
          <label for="sale_banner" class="group-value">Скидка</label>
          <input
            type="text"
            id="sale_banner"
            name="sale_banner"
            v-model="sale_banner"
            class="group-item"
            placeholder="Введите скидку"
          />
        </div>
      </div>
      <button class="btn save" @click="update()">Сохранить</button>
    </div>
    <!-- FAQ -->
    <div class="card">
      <h2>FAQ</h2>
      <div class="group">
        <label for="que1" class="group-value">Вопрос 1</label>
        <input
          type="text"
          id="que1"
          name="que1"
          v-model="que1"
          class="group-item"
          placeholder="Введите вопрос"
        />
      </div>
      <div class="group">
        <label for="ans1" class="group-value">Ответ 1</label>
        <input
          type="text"
          id="ans1"
          name="ans1"
          v-model="ans1"
          class="group-item"
          placeholder="Введите ответ"
        />
      </div>
      <div class="group">
        <label for="que2" class="group-value">Вопрос 2</label>
        <input
          type="text"
          id="que2"
          name="que2"
          v-model="que2"
          class="group-item"
          placeholder="Введите вопрос"
        />
      </div>
      <div class="group">
        <label for="ans2" class="group-value">Ответ 2</label>
        <input
          type="text"
          id="ans2"
          name="ans2"
          v-model="ans2"
          class="group-item"
          placeholder="Введите ответ"
        />
      </div>
      <div class="group">
        <label for="que3" class="group-value">Вопрос 3</label>
        <input
          type="text"
          id="que3"
          name="que3"
          v-model="que3"
          class="group-item"
          placeholder="Введите вопрос"
        />
      </div>
      <div class="group">
        <label for="ans3" class="group-value">Ответ 3</label>
        <input
          type="text"
          id="ans3"
          name="ans3"
          v-model="ans3"
          class="group-item"
          placeholder="Введите ответ"
        />
      </div>
      <button class="btn save" @click="updatefaq()">Сохранить</button>
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

h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 27.32px;
  color: #14171f;
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
</style>
