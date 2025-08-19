<script>
import AppLogo from "./AppLogo.vue";
export default {
  name: "LeftPanel",
  components: { AppLogo },
  data() {
    return {
      routes: [
        {
          img: "main",
          img_active: "main_active",
          name: "Главная",
          active: false,
          route: "main",
        },
        {
          img: "users",
          img_active: "users_active",
          name: "Пользователи",
          active: false,
          route: "users",
        },
        {
          img: "staff",
          img_active: "staff_active",
          name: "Сотрудники",
          active: false,
          route: "staff",
        },
        {
          img: "shop",
          img_active: "shop_active",
          name: "Заказы",
          active: false,
          route: "orders",
        },
        {
          img: "payments",
          img_active: "payments_active",
          name: "Оплаты",
          active: false,
          route: "payments",
        },
        {
          img: "tickets",
          img_active: "tickets_active",
          name: "Тикеты",
          active: false,
          route: "tickets",
        },
        {
          img: "feedback",
          img_active: "feedback_active",
          name: "Обратная связь",
          active: false,
          route: "feedback",
        },
        {
          img: "categories_miners",
          img_active: "categories_miners_active",
          name: "Категории майнеров",
          active: false,
          route: "categories",
        },
        {
          img: "miners",
          img_active: "miners_active",
          name: "Майнеры",
          active: false,
          route: "miners",
        },
        {
          img: "workers",
          img_active: "workers_active",
          name: "Воркеры",
          active: false,
          route: "workers",
        },
        {
          img: "nonpayment",
          img_active: "nonpayment_active",
          name: "Неуплата",
          active: false,
          route: "nonpayments",
        },
        {
          img: "mailing",
          img_active: "mailing_active",
          name: "Рассылки",
          active: false,
          route: "mailing",
        },
        {
          img: "settings",
          img_active: "settings_active",
          name: "Настройки",
          active: false,
          route: "settings",
        },
        {
          img: "test",
          img_active: "test_active",
          name: "Тест режим",
          active: false,
          route: "test",
        },
      ],
      name: [
        "Главная",
        "Пользователи",
        "Сотрудники",
        "Заказы",
        "Оплаты",
        "Тикеты",
        "Обратная связь",
        "Категории майнеров",
        "Майнеры",
        "Воркеры",
        "Неуплата",
        "Рассылки",
        "Настройки",
        "Тест режим",
      ],
    };
  },
  methods: {
    navClick(name) {
      try {
        for (let i = 0; i < this.routes.length; i++) {
          let item = this.routes[i];
          if (item.name == name) {
            item.active = true;
            this.$router.push({ name: item.route });
          } else {
            item.active = false;
          }
          this.routes[i] = item;
        }
      } catch (err) {
        console.log(err);
      }
    },

    async checkRoute() {
      let name = this.$route.name;
      for (let i = 0; i < this.routes.length; i++) {
        let card = this.routes[i];
        if (card.route == name) {
          card.active = true;
          this.routes[i] = card;
        }
      }
    },
  },
  async mounted() {
    setTimeout(() => {
      this.checkRoute();
    }, 100);
  },
};
</script>
<template>
  <div class="panel">
    <AppLogo />
    <div class="hr"></div>
    <nav class="group-nav">
      <li
        class="nav-item"
        @click="navClick(item.name)"
        v-for="item in routes"
        :key="item"
        :class="{ active: item.active }"
      >
        <img
          v-if="item.active"
          :src="`./assets/${item.img_active}.svg`"
          alt=""
        />
        <img v-if="!item.active" :src="`./assets/${item.img}.svg`" alt="" />
        <span>{{ item.name }}</span>
      </li>
    </nav>
    <div class="footer"></div>
  </div>
</template>
<style scoped>
.panel {
  width: 25%;
  max-width: 310px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.logo {
  margin-top: 20px;
  height: 32px;
}

.group-nav {
  list-style: none;
  display: flex;
  flex-direction: column;
  padding: 0 20px 20px;
}

.nav-item {
  width: 100%;
  cursor: pointer;
  display: flex;
  gap: 10px;
  align-items: center;
  border-radius: 99px;
  padding: 12px 16px;
  transition: all 500ms ease;
}

.nav-item span {
  font-weight: 600;
  line-height: 20px;
  color: #5b6171;
}

.active {
  background-color: rgba(25, 94, 230, 0.1);
  color: #195ee6;
}
</style>
