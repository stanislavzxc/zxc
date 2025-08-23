import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/login" // Перенаправляем на страницу входа
    },
    {
      path: "/login",
      component: () => import("../components/AppLogin.vue"),
      name: "login",
      // beforeEnter: (to, from, next) => {
      //   const token = localStorage.getItem("token");
      //   if (token) {
      //     next({ name: "main" });
      //   } else {
      //     next();
      //   }
      // }
    },
    {
      path: "/main",
      component: () => import("../pages/AppMain.vue"),
      name: "main"
    },
    {
      path: "/block",
      component: () => import("../pages/AppBlock.vue"),
      name: "block",
    },
    {
      path: "/users",
      component: () => import("../pages/AppUsers.vue"),
      name: "users",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.users) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/user/:id",
      component: () => import("../pages/AppUser.vue"),
      name: "user",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.users) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/worker/:id",
      component: () => import("../pages/user/WorkerUser.vue"),
      name: "worker",
    },
    {
      path: "/staff",
      component: () => import("../pages/AppStaff.vue"),
      name: "staff",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.employees) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/employee/:id",
      component: () => import("../pages/AppEmployee.vue"),
      name: "employee",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.employees) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/tickets",
      component: () => import("../pages/AppTickets.vue"),
      name: "tickets",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.tickets) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/ticket",
      component: () => import("../pages/AppTicket.vue"),
      name: "ticket",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.tickets) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/feedback",
      component: () => import("../pages/FeedBack.vue"),
      name: "feedback",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.feedbacks) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/feedbackuser/:id",
      component: () => import("../pages/FeedBackUser.vue"),
      name: "feedbackuser",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.feedbacks) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/categories",
      component: () => import("../pages/AppCategories.vue"),
      name: "categories",
    },
    {
      path: "/category/:id",
      component: () => import("../pages/AppCategory.vue"),
      name: "category",
    },
    {
      path: "/miners",
      component: () => import("../pages/AppMiners.vue"),
      name: "miners",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.miners) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/miner/:id",
      component: () => import("../pages/AppMiner.vue"),
      name: "miner",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.miners) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/non-payments",
      component: () => import("../pages/NonPayments.vue"),
      name: "nonpayments",
    },
    {
      path: "/payments",
      component: () => import("../pages/AppPayments.vue"),
      name: "payments",
    },
    {
      path: "/payment/:id/:userid",
      component: () => import("../pages/AppPayment.vue"),
      name: "payment",
    },
    {
      path: "/orders",
      component: () => import("../pages/AppOrders.vue"),
      name: "orders",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.orders) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/order/:id",
      component: () => import("../pages/AppOrder.vue"),
      name: "order",
      beforeEnter: (to, from, next) => {
        const employee = JSON.parse(localStorage.getItem("employee"));
        if (employee && employee.orders) {
          next();
        } else {
          next({ name: "block" });
        }
      },
    },
    {
      path: "/workers",
      component: () => import("../pages/AppWorkers.vue"),
      name: "workers",
    },
    {
      path: "/mailing",
      component: () => import("../pages/AppMailing.vue"),
      name: "mailing",
    },
    {
      path: "/settings",
      component: () => import("../pages/AppSettings.vue"),
      name: "settings",
    },
    {
      path: "/test",
      component: () => import("../pages/AppTestMode.vue"),
      name: "test",
    },
    {
      path: "/test/:id",
      component: () => import("../pages/BlockTestMode.vue"),
      name: "blocktest",
    },
  ],
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  // Разрешаем доступ к login только если нет токена
  if (to.name === 'login') {
    if (token) {
      next({ name: 'main' }); // Если уже авторизован, перенаправляем на главную
    } else {
      next(); // Разрешаем доступ к login
    }
  } 
  // Для всех остальных маршрутов проверяем авторизацию
  else if (!token) {
    next({ name: 'login' }); // Нет токена - на login
  } else {
    next(); // Есть токен - разрешаем доступ
  }
});
export default router;
