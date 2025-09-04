<script>
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
  name: "PersonalData",
  data() {
    return {
      isloading: false,
      id: "Загрузка...",
      email: "Загрузка...",
      dataReg: "Загрузка...",
      ip: "Загрузка...",
      country: "Загрузка...",
      fa2: "Загрузка...",
      balance_btc: "Загрузка...",
      balance_usd: "Загрузка...",
      name: "Загрузка...",
      surname: "Загрузка...",
      phone: "Загрузка...",
      address: "Загрузка...",
      telegram: "Загрузка...",
      inn: "Загрузка...",
      profiletype: "Загрузка...",
      address_watcher: "Загрузка...",
      name_miner: "Загрузка...",
      id_miner: "Загрузка...",
      wallet: "Загрузка...",
      lang: "Загрузка...",
      check: "Загрузка...",
      test: "Загрузка...",
      date: "",
      miners: [],
      miner_id: [],
      shops: [
        {
          id: "2326",
          date: "15.06.2024",
          id_payment: "65554",
          price: "8880",
          miners: [
            {
              id: "1",
              name: "ANTMINER S19K PRO 120TH",
              count: 1,
              price: "4 880",
            },
            {
              id: "2",
              name: "ANTMINER S19K PRO 120TH",
              count: 1,
              price: "4 000",
            },
          ],
        },
        {
          id: "2326",
          date: "15.06.2024",
          id_payment: "65554",
          price: "8880",
          miners: [
            {
              id: "1",
              name: "ANTMINER S19K PRO 120TH",
              count: 1,
              price: "4 880",
            },
            {
              id: "2",
              name: "ANTMINER S19K PRO 120TH",
              count: 1,
              price: "4 000",
            },
          ],
        },
        {
          id: "2326",
          date: "15.06.2024",
          id_payment: "65554",
          price: "8880",
          miners: [
            {
              id: "1",
              name: "ANTMINER S19K PRO 120TH",
              count: 1,
              price: "4 880",
            },
            {
              id: "2",
              name: "ANTMINER S19K PRO 120TH",
              count: 1,
              price: "4 000",
            },
          ],
        },
      ],
      paymentsHost: [
        {
          id: "1",
          date: "15.06.2024",
          done: true,
          type: "Payment",
          price: "8880",
        },
        {
          id: "2",
          date: "15.06.2024",
          done: true,
          type: "Payment",
          price: "8880",
        },
        {
          id: "3",
          date: "15.06.2024",
          done: true,
          type: "Payment",
          price: "8880",
        },
      ],
      payoutsHost: [
        {
          id: "1",
          date: "15.06.2024",
          done: true,
          type: "Payment",
          price: "480",
          hash: "131165156",
        },
        {
          id: "2",
          date: "15.06.2024",
          done: true,
          type: "Payment",
          price: "480",
          hash: "131165156",
        },
        {
          id: "3",
          date: "15.06.2024",
          done: true,
          type: "Payment",
          price: "480",
          hash: "131165156",
        },
        {
          id: "4",
          date: "15.06.2024",
          done: true,
          type: "Payment",
          price: "480",
          hash: "131165156",
        },
        {
          id: "5",
          date: "15.06.2024",
          done: true,
          type: "Payment",
          price: "480",
          hash: "131165156",
        },
      ],
      discounts: [],
      price_energy: "",
      percent_sell: "",
      zxc: "",
      qwe: "",
      billingminers: [],
      buy_request: [],
      mails: [],
      template_id: "",
    };
  },
  components: { LoadingSpinner },
  methods: {
    change_cost(value) {
      this.qwe = value;
      console.log(this.qwe);
    },
    change_sell(value) {
      this.zxc = value;
      console.log(this.zxc);
    },
    changeStat(n) {
      try {
        this.active = n;
      } catch (err) {
        console.log(err);
      }
    },

    updateData(user) {
      this.id = user.id || "Нет данных";
      localStorage.setItem("userid", user.id);
      this.email = user.email || "Нет данных";
      this.dataReg = user.created || "Нет данных";
      this.ip = user.address || "Нет данных";
      this.country = user.country || "Нет данных";
      this.fa2 = (user.mfa_enabled === true ? "есть" : "нет") || "Нет данных";
      this.balance_btc = "480" || "Нет данных";
      this.balance_usd = "9488000" || "Нет данных";
      this.name = user.firstname || "Нет данных";
      this.surname = user.lastname || "Нет данных";
      this.phone = user.phone || "Нет данных";
      this.address = user.address || "Нет данных";
      this.telegram = user.telegram || "Нет данных";
      this.inn = user.inn || "Нет данных";
      this.profiletype = user.profile_type || "Нет данных";
      this.address_watcher = user.address || "Нет данных";
      this.name_miner = user.miner_name || "Нет данных";
      this.id_miner = user.miner_id || "Нет данных";
      this.wallet = user.wallet || "Нет данных";
      this.lang = user.lang || "Нет данных";
      this.test = user.testmode || "Нет данных";
      this.check = (user.access_allowed === true ? "есть" : "нет") || "Нет данных";
      // alert(this.profiletype)
    },
    async getMiners() {
      const url = `/miners`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        this.miners = response.data;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    },
    selectImage() {
      this.$refs.fileInput.click(); // Программно вызываем клик на скрытом input
    },
    async updateUser() {
      const url = `users/${this.id}/update`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const data = {
        firstname: this.name,
        lastname: this.surname,
        phone: this.phone,
        email: this.email,
        adress: this.address,
        telegram: this.telegram,
        inn: this.inn,
        profile_type: this.profiletype,
      };

      try {
        const response = await axios.post(url, data, { headers });
        console.log(response);
        console.log(data);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async discount_new() {
      const url = `discounts/new`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };
      this.date = this.date.concat("T00:00");

      const data = {
        user_id: this.id,
        miner_id: this.miner_id,
        electricity_cost: this.qwe,
        applies_to_electricity: true,
        discount_percentage: this.zxc,
        is_active: true,
        expiration_date: this.date,
      };
      console.log(data);
      console.log(this.percent_sell, this.price_energy);
      try {
        const response = await axios.post(url, data, { headers });
        console.log(response);
        console.log(data);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async discount_delete() {
      const url = `discounts/9/delete`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.post(url, {}, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async discount_getall() {
      const url = `/discounts`;

      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      try {
        await this.getMiners();
        const response = await axios.get(url, { headers });
        console.log(response.data);
        this.discounts = response.data.discounts;
        for (let i = 0; i < this.discounts.length; i++) {
          this.discounts[i].expiration_date = this.discounts[i].expiration_date.slice(
            0,
            10
          );
        }
      } catch (error) {
        console.error("Error updating user:", error);
      }
    },
    async discount_update(id) {
      try {
        this.isloading = true;
        await this.discount_delete(id);
        await this.discount_new();
      } catch (e) {
        console.log(e);
      } finally {
        this.isloading = false;
      }
    },
    async user_delete() {
      this.isloading = true;
      const url = `users/${this.id}/delete`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        this.isloading = false;
        this.$router.push({ name: "users" });
      }
    },
    async user_block() {
      this.isloading = true;
      const url = `users/${this.id}/block`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        this.isloading = false;
      }
    },
    async user_unblock() {
      this.isloading = true;
      const url = `users/${this.id}/unblock`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error updating user:", error);
      } finally {
        this.isloading = false;
      }
    },
    async billings() {
      this.isloading = true;

      const url = `buy/requests/${this.id}`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
        this.buy_request = response.data.buy_requests_miners_items;

        this.billingminers = response.data.buy_requests_miners_items.map((item) => ({
          id: item.miner_item.id,
          name: item.miner_item.name,
          count: item.count,
          price: item.miner_item.price,
          created: item.miner_item.created,
          user: this.buy_request.user,
        }));
        console.log(this.buy_request, this.billingminers);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
      }
    },
    async fetchJui() {
      this.isloading = true;

      const url = `/payments`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data, "zxczxczxc");
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
      }
    },
    async getMails() {
      this.isloading = true;
      const url = `/mail_templates`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);

        // Фильтруем только элементы с template_type == 'mail' и преобразуем их
        this.mails = response.data
          .filter((item) => item.template_type === "mail")
          .map((item) => ({
            id: item.id,
            name: item.title,
            template: item.content,
            template_type: item.template_type,
          }));
      } catch (error) {
        console.error("Error updating settings:", error);
      } finally {
        this.isloading = false;
      }
    },
    async updateMail() {
      this.is_open = false;
      this.isloading = true;
      const url = `/campaign/send`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const data = {
        template_id: this.template_id,
        user_ids: this.id.toString(),
      };
      console.log(data);
      try {
        const response = await axios.post(url, data, { headers });
        console.log(response);
      } catch (error) {
        console.error("Error uploading data:", error);
      } finally {
        this.isloading = false;
      }
    },
  },

  mounted() {
    setTimeout(() => {
      const userData = localStorage.getItem("userdata");

      const user = userData ? JSON.parse(userData) : {};
      this.updateData(user);
      this.discount_getall();
      this.billings();
      this.getMails();
      // this.fetchJui();
    }, 1000);
  },
};
</script>
<template>
  <LoadingSpinner v-if="isloading" />
  <div class="parent" v-else>
    <div class="card">
      <div class="group-title">
        <h2>Основная информация</h2>
        <!-- <button class="btn edit">Открыть аккаунт</button> -->
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="name" class="group-value">Имя</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="name"
            class="group-item"
            placeholder="Введите свое имя"
          />
        </div>
        <div class="group">
          <label for="surname" class="group-value">Фамилия</label>
          <input
            type="text"
            id="surname"
            name="surname"
            v-model="surname"
            class="group-item"
            placeholder="Введите свою фамилию"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="phone" class="group-value">Телефон</label>
          <input
            type="text"
            id="phone"
            name="phone"
            v-model="phone"
            class="group-item"
            placeholder="Введите свой телефон"
          />
        </div>
        <div class="group">
          <label for="email" class="group-value">Почта</label>
          <input
            type="email"
            id="email"
            name="email"
            v-model="email"
            class="group-item"
            placeholder="Введите свою почту"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="address" class="group-value">Адрес</label>
          <input
            type="text"
            id="address"
            name="address"
            v-model="address"
            class="group-item"
            placeholder="Введите свой адрес"
          />
        </div>
        <div class="group">
          <label for="telegram" class="group-value">Telegram</label>
          <input
            type="text"
            id="telegram"
            name="telegram"
            v-model="telegram"
            class="group-item"
            placeholder="Введите свой телеграмм аккаунт"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="inn" class="group-value">ИНН</label>
          <input
            type="text"
            id="inn"
            name="inn"
            v-model="inn"
            class="group-item"
            placeholder="Введите свой ИНН"
          />
        </div>
        <div class="group">
          <label for="surname" class="group-value">Тип</label>
          <select v-model="profiletype" id="" class="group-item">
            <option value="id">Индивидуальный</option>
            <option value="business">Бизнес</option>
          </select>
        </div>
      </div>
      <button class="btn save" @click="updateUser()">Сохранить</button>
    </div>
    <div class="card more-info">
      <h2>Доп. информация</h2>
      <div class="info">
        <div class="info-item">
          <span class="info-title">Дата регистрации:</span>
          <span class="info-value">{{ dataReg }}</span>
        </div>
        <div class="info-item">
          <span class="info-title">IP:</span>
          <span class="info-value">{{ ip }}</span>
        </div>
        <div class="info-item">
          <span class="info-title">Страна:</span>
          <span class="info-value">{{ country }}</span>
        </div>
        <div class="info-item">
          <span class="info-title">2FA:</span>
          <span class="info-value">{{ fa2 }}</span>
        </div>
        <div class="info-item">
          <span class="info-title">Тест режим:</span>
          <span class="info-value completed" v-if="test">Пройден</span>
          <span class="info-value nocomp" v-else>Не пройден</span>
        </div>
        <div class="info-item">
          <span class="info-title">Баланс клиента:</span>
        </div>
        <div class="info-item">
          <span class="info-title">Минимальная выплата:</span>
          <span class="info-value"
            >{{ min_payment }} BTC <img src="../../assets/btc.svg" alt=""
          /></span>
        </div>
        <div class="info-item">
          <span class="info-title">Задолжность:</span>

          <a href="" class="edit">Запросить выплату</a>
        </div>
        <div class="info-item">
          <span class="info-title">Пометка невыплат:</span>
          <span class="info-value">Задерживает</span>
        </div>
        <div class="info-item">
          <span class="info-title">Потребление с момента уплаты:</span>
          <span class="info-value">{{ energy_consumption }} Киловатт</span>
        </div>
        <div class="info-item">
          <span class="info-title">Общий хешрейт:</span>
          <span class="info-value">{{ total_hash }} TH</span>
        </div>
      </div>
      <div class="info-edit">
        <div class="wrap-group">
          <div class="group">
            <label for="address_watcher" class="group-value">Адрес вотчера</label>
            <input
              type="text"
              id="address_watcher"
              name="address_watcher"
              v-model="address_watcher"
              class="group-item"
              placeholder="Введите адрес вотчера"
            />
          </div>
          <div class="group">
            <label for="name_miner" class="group-value">Имя майнера</label>
            <input
              type="text"
              id="name_miner"
              name="name_miner"
              v-model="name_miner"
              class="group-item"
              placeholder="Введите имя майнера"
            />
          </div>
        </div>
        <div class="wrap-group">
          <div class="group">
            <label for="id_miner" class="group-value">ID майнера</label>
            <input
              type="text"
              id="id_miner"
              name="id_miner"
              v-model="id_miner"
              class="group-item"
              placeholder="Введите ID майнера"
            />
          </div>
          <div class="group">
            <label for="wallet" class="group-value">Кошёлек</label>
            <input
              type="text"
              id="wallet"
              name="wallet"
              v-model="wallet"
              class="group-item"
              placeholder="Введите адрес кошелька"
            />
          </div>
        </div>
        <div class="wrap-group">
          <div class="group">
            <label for="lang" class="group-value">Язык</label>
            <input
              type="text"
              id="lang"
              name="lang"
              v-model="lang"
              class="group-item"
              placeholder="Выберите язык"
            />
          </div>
          <div class="group">
            <label for="check" class="group-value">Доступ</label>
            <input
              type="text"
              id="check"
              name="check"
              v-model="check"
              class="group-item"
              placeholder="Предоставьте доступ"
            />
          </div>
        </div>
      </div>
      <button class="btn save">Сохранить</button>
    </div>
    <div class="card settings-price" v-if="discounts.length === 0">
      <h2>Индивидуальные настройки цены</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="category" class="group-value">Товар</label>
          <select class="group-item" name="category" id="category" v-model="miner_id">
            <option v-for="miner in miners" :key="miner.id" :value="miner.id">
              {{ miner.name }}
            </option>
          </select>
        </div>
        <div class="group">
          <label for="percent_sell" class="group-value">Процент скидки</label>
          <input
            type="text"
            id="percent_sell"
            name="percent_sell"
            v-model="zxc"
            class="group-item"
            placeholder="Введите процент скидки"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="price_energy" class="group-value"
            >Цена электроэнергии за KW/час</label
          >
          <input
            type="text"
            id="price_energy"
            name="price_energy"
            v-model="qwe"
            class="group-item"
            placeholder="Введите цену электроэнергии"
          />
        </div>
        <div class="group">
          <label for="date" class="group-value">До</label>
          <input
            type="date"
            id="date"
            name="date"
            v-model="date"
            class="group-item"
            placeholder="Действительно до"
          />
        </div>
      </div>
      <button class="btn save" @click="discount_new()">Сохранить</button>
    </div>

    <div class="card settings-price" v-else>
      <h2>Индивидуальные настройки цены</h2>
      <div class="par" v-for="discount in discounts" :key="discount.id">
        <div class="wrap-group">
          <div class="group">
            <label for="category" class="group-value">Товар</label>
            <select
              class="group-item"
              name="category"
              id="category"
              v-model="discount.miner_id"
            >
              <option v-for="miner in miners" :key="miner.id" :value="miner.id">
                {{ miner.name }}
              </option>
            </select>
          </div>
          <div class="group">
            <label for="percent_sell" class="group-value">Процент скидки</label>
            <input
              type="text"
              id="percent_sell"
              name="percent_sell"
              v-model="discount.discount_percentage"
              @change="change_sell(discount.discount_percentage)"
              class="group-item"
              placeholder="Введите процент скидки"
            />
          </div>
        </div>
        <div class="wrap-group">
          <div class="group">
            <label for="price_energy" class="group-value"
              >Цена электроэнергии за KW/час</label
            >
            <input
              type="text"
              id="price_energy"
              name="price_energy"
              v-model="discount.electricity_cost"
              @change="change_cost(discount.electricity_cost)"
              class="group-item"
              placeholder="Введите цену электроэнергии"
            />
          </div>
          <div class="group">
            <label for="date" class="group-value">До</label>
            <input
              type="date"
              id="date"
              name="date"
              v-model="discount.expiration_date"
              class="group-item"
              placeholder="Действительно до"
            />
          </div>
        </div>
        <button class="btn save" @click="discount_update(discount.id)">Сохранить</button>
      </div>
    </div>

    <div class="card">
      <h2>Сменить пароль</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="newPass" class="group-value">Новый пароль</label>
          <input
            type="password"
            id="newPass"
            name="newPass"
            v-model="newPass"
            class="group-item"
            placeholder="Введите новый пароль"
          />
        </div>
        <div class="group">
          <label for="newPass2" class="group-value">Повторите пароль</label>
          <input
            type="password"
            id="newPass2"
            name="newPass2"
            v-model="newPass2"
            class="group-item"
            placeholder="Повторите пароль"
          />
        </div>
      </div>
      <button class="btn save">Сохранить</button>
    </div>
    <div class="card history">
      <h2>История покупок</h2>
      <div class="payments">
        <div class="payment" v-for="item in buy_request" :key="item.id">
          <div class="wrap-info">
            <div class="detail-info">
              <span class="id">ID {{ item.buy_request.user.id }}</span>
              <span class="date">{{ item.buy_request.created }}</span>
              <span class="id-payment"
                >ID транзакции <a class="edit">{{ item.id }}</a>
              </span>
            </div>
            <span class="price">{{ item.miner_item.price }} $</span>
          </div>
          <div class="miner" v-for="miner in buy_request" :key="miner.id">
            <span class="miner-name">{{ miner.miner_item.name }}</span>
            <div class="info-title">
              Количество:
              <span class="miner-count">{{ miner.count }}</span>
            </div>
            <span class="price">{{ item.miner_item.price }} $</span>
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <h2>История оплат за хостинг</h2>
      <div class="payments-host">
        <div class="payment-host" v-for="payment in paymentsHost" :key="payment.id">
          <span class="date">{{ payment.date }}</span>
          <img src="../../assets/payment-success.svg" alt="" />
          <span class="type">{{ payment.type }}</span>
          <span class="payment-price">{{ payment.price }} $</span>
          <a class="edit">Открыть квитанцию</a>
        </div>
      </div>
    </div>
    <div class="card">
      <h2>История выплат с пула</h2>
      <div class="payments-host">
        <div class="payment-host" v-for="item in payoutsHost" :key="item.id">
          <span class="date">{{ item.date }}</span>
          <img src="../../assets/payment-success.svg" alt="" />
          <span class="type">{{ item.type }}</span>
          <span class="payment-price">{{ item.price }} BTC</span>
          <span class="hash"
            >Hash: <a class="edit">{{ item.hash }}</a></span
          >
        </div>
      </div>
    </div>
    <div class="card">
      <h2>Рассылка</h2>
      <div class="group">
        <label for="mailing" class="group-value">Письмо</label>
        <select id="mailing" class="group-item" v-model="template_id">
          <option v-for="mail in mails" :key="mail.id" :value="mail.id">
            {{ mail.name }}
          </option>
        </select>
      </div>
      <!-- <div class="wrap-check">
        <input type="checkbox" id="mailingCheck" class="checkbox" />
         <label for="mailingCheck">Включен в рассылку</label> 
      </div> -->
      <button class="btn send" @click="updateMail()">Отправить</button>
    </div>
    <div class="card">
      <h2>Действия</h2>
      <div class="wrap-btns">
        <button class="btn-action delete" @click="user_delete()">Удалить</button>
        <button class="btn-action block" @click="user_block()">Заблокировать</button>
        <button class="btn-action unblock" @click="user_unblock()">Разблокировать</button>
      </div>
      <div class="group">
        <label for="status_mining" class="group-value">Состояние майнинга</label>
        <select id="status_mining" class="group-item" v-model="status_mining">
          <option value="">Включен</option>
        </select>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
