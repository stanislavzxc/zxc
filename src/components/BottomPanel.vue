<script>
export default {
  name: "BottomPanel",
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
          route: "shop",
        },
        {
          img: "payments",
          img_active: "payments_active",
          name: "Оплаты",
          active: false,
          route: "payments",
        },
      ],
      routes_more: [
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
          route: "shop",
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
      active: false,
    };
  },
  methods: {
    cancel() {
      document.body.style.overflow = "auto";
      this.$emit("updateGoTry", false);
    },

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
          this.routes_more[i] = item;
          this.active = false;
        }
      } catch (err) {
        console.log(err);
      }
    },

    navClickMore(name) {
      try {
        for (let i = 0; i < this.routes_more.length; i++) {
          let item = this.routes_more[i];
          if (item.name == name) {
            item.active = true;
            this.$router.push({ name: item.route });
          } else {
            item.active = false;
          }
          this.routes_more[i] = item;
          this.active = false;
        }
      } catch (err) {
        this.$router.push({ name: "404" });
      }
    },
  },
  mounted() {},
};
</script>
<template>
  <div class="panel" v-if="!active">
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
      <li class="nav-item" @click="active = !active">
        <img src="../assets/others.png" alt="" />
        <span :class="{ red: active }">Еще</span>
      </li>
    </nav>
  </div>
  <div class="panel" v-else>
    <nav class="group-nav more">
      <li
        class="nav-item"
        @click="navClickMore(item.name)"
        v-for="item in routes_more"
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
      <li class="nav-item" @click="active = !active">
        <img src="../assets/others.png" alt="" />
        <span :class="{ red: active }">Еще</span>
      </li>
    </nav>
  </div>
</template>
<style scoped>
.panel {
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  z-index: 3;
  min-height: 70px;
  padding: 12px 16px;
}

.more {
  flex-wrap: wrap;
}

.logo {
  height: 60px;
  cursor: pointer;
}

.group-nav {
  list-style: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  margin: 0 auto;
}

.nav-item {
  cursor: pointer;
  display: flex;
  gap: 6px;
  align-items: center;
  flex-direction: column;
}

.nav-item img {
  height: 24px;
  width: 24px;
}

.nav-item span {
  font-weight: 400;
  font-size: 10px;
  line-height: 16px;
  color: #0f0f0f;
  opacity: 40%;
}

.asic {
  height: 129px;
}

.red {
  color: #005eff !important;
}

.title,
.scale,
.asic {
  z-index: 2;
}

.title {
  color: #fff;
  font-weight: 800;
  font-size: 18px;
  line-height: 18px;
  text-align: center;
}

.footer {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
