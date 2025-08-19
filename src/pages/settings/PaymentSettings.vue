<script>
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
  name: "PaymentSettings",
  components: { LoadingSpinner },
  data() {
    return {
      id: "",
      bank: "",
      btc: "",
      usdt: "",
      isloading: false,
    };
  },
  methods: {
    async update() {
      this.isloading = true;
      const url = `/settings/update`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      const settings = JSON.parse(localStorage.getItem("settings"));

      const data = new FormData();
      data.append("payment_bank_card", this.bank);
      data.append("payment_btc", this.btc);
      data.append("payment_usdt", this.usdt);
      data.append("invest_min", parseInt(settings.invest_min));
      data.append("invest_max", parseInt(settings.invest_max));
      data.append("electricity_cost", parseFloat(settings.electricity_cost));
      data.append(
        "hash_rate_electricity_consumption",
        parseInt(settings.hash_rate_electricity_consumption)
      );
      data.append("hash_rate_cost", parseInt(settings.hash_rate_cost));
      data.append("miner_banner", settings.miner_banner);
      data.append("home_page_youtube_link", settings.home_page_youtube_link);
      data.append("payback_min", settings.payback_min);
      data.append("payback_max", settings.payback_max);

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
  },
  mounted() {
    const data = JSON.parse(localStorage.getItem("settings"));
    this.bank = data.payment_bank_card;
    this.btc = data.payment_btc;
    this.usdt = data.payment_usdt;
  },
};
</script>
<template>
  <LoadingSpinner v-if="isloading" />

  <section class="wrapper" v-else>
    <div class="card">
      <div class="group">
        <label for="bank" class="group-value">Данные оплаты (Банковская карта)</label>
        <input
          type="text"
          id="bank"
          name="bank"
          v-model="bank"
          class="group-item"
          placeholder="0000 0000 0000 0000"
        />
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
</style>
