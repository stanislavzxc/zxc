<script>
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner.vue";
import ModalEmployee from "./ModalEmployee.vue";

export default {
  name: "AppStaff",
  data() {
    return {
      cards: [],
      search: "",
      isloading: false,
      is_open: false,
    };
  },
  components: { LoadingSpinner, ModalEmployee },

  computed: {
    filteredCards() {
      return this.cards.filter((card) => {
        return card.username.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  methods: {
    open(cardId) {
      try {
        this.$router.push({ name: "employee", params: { id: cardId } });
      } catch (err) {
        console.log(err);
      }
    },
    async create(data) {
      this.isloading = true;
      const url = "/employees/new";
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        // Получаем изображение в формате Base64
        const base64Image = await this.getBase64Image(require("@/assets/deleted.jpg"));

        // Добавляем изображение в объект data
        data.image = base64Image;

        console.log(data); // Здесь будет объект с данными и изображением

        const response = await axios.post(url, data, { headers });
        console.log(response.data);
        await this.fetchUsers();
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
        this.is_open = false;
      }
    },

    // Вспомогательный метод для получения Base64 из изображения
    getBase64Image(image) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result); // вернёт Base64
        };
        reader.onerror = reject;

        // Создаём объект изображения и загружаем его
        const img = new Image();
        img.src = image;
        img.crossOrigin = "Anonymous"; // Позволяет загрузить изображение с другого домена
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          canvas.toBlob((blob) => {
            reader.readAsDataURL(blob); // Читаем как Data URL
          }, "image/png");
        };
      });
    },

    async fetchUsers() {
      this.isloading = true;
      const url = "/employees";
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);
        this.cards = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
      }
    },
  },
  create() {
    console.log("zxc");
  },
  mounted() {
    this.fetchUsers();
  },
};
</script>

<template>
  <LoadingSpinner v-if="isloading" />
  <div class="wrapper" v-else>
    <ModalEmployee @close="is_open = false" @update="create" v-if="is_open" />
    <div class="group-title">
      <h1>Сотрудники</h1>
      <button class="btn add_user" @click="is_open = true">Добавить сотрудника</button>
    </div>
    <div class="actions">
      <img src="../assets/search-support.svg" alt="" class="search-img" />
      <input type="text" class="search" v-model="search" placeholder="Поиск" />
      <button class="btn">Поиск</button>
    </div>
    <div class="fields">
      <span>ID</span>
      <span>Имя пользователя</span>
      <span>E-Mail</span>
      <span>Роль</span>
      <span class="options-field"></span>
    </div>
    <div class="cards">
      <div
        class="card"
        v-for="card in filteredCards"
        :key="card.id"
        @click="open(card.id)"
      >
        <span class="card-item">{{ card.id }}</span>
        <span class="card-item">{{ card.username }}</span>
        <span class="card-item">{{ card.email }}</span>
        <span class="card-item">{{ card.role }}</span>
        <div class="card-item more">
          <img @click="card.more = !card.more" src="../assets/more.svg" alt="" />
        </div>
        <div class="options" v-if="card.more">
          <button>Посмотреть</button>
          <button>Воркеры</button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.wrapper {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.group-title {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.actions {
  position: relative;
  display: flex;
  align-items: center;
  gap: 6px;
}

.search-img {
  position: absolute;
  left: 16px;
}

.search {
  width: 95%;
  border-radius: 8px;
  border: 1px solid #dfe3ec;
  background-color: #fff;
  padding: 12px 16px 12px 46px;
}

.search::placeholder {
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: #8c93a6;
}

.btn {
  border-radius: 8px;
  padding: 14.5px 20px;
  background-color: #005eff;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  letter-spacing: 0.01em;
  color: #fff;
}

.add_user {
  background-color: transparent;
  color: #195ee6;
  font-weight: 600;
}

.fields {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
}

.fields span {
  width: 25%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(140, 147, 166, 1);
}
.cards {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.card {
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #eff1f6;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.card-item {
  width: 25%;
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: rgba(20, 23, 31, 1);
}

.more {
  width: 30px;
  cursor: pointer;
  padding: 5px;
}

.options-field {
  width: 30px !important;
}

.options {
  position: absolute;
  right: 1%;
  bottom: -100%;
  padding: 5px 6px;
  border-radius: 8px;
  border: 1px solid rgba(223, 227, 236, 1);
  background-color: #fff;
  display: flex;
  flex-direction: column;
  z-index: 2;
}

.options button {
  width: 100%;
  padding: 10px 10px 5px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  color: rgba(20, 23, 31, 1);
  text-align: left;
}

.delete {
  color: rgba(223, 58, 68, 1) !important;
}
</style>
