<script>
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner.vue";
import ModalAccept from "./ModalAccept.vue";

export default {
  name: "AppMiner",
  components: { LoadingSpinner, ModalAccept },
  data() {
    return {
      isloading: false,
      id: this.$route.params.id,
      name: "",
      rang: "",
      show: null,
      desc: "",
      category: "",
      category_id: "",
      hash: "",
      energy_consumption: "",
      price: "",
      image: "",
      count_sale: "",
      sale: "",
      id_client: "",
      count_client: "",
      sale_client: "",
      selectedFile: require("../assets/deleted.jpg"),
      closed: null,
      is_open: false,
    };
  },
  methods: {
    async getMiners() {
      this.isloading = true;

      const url = `/miners/${this.id}/`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });

        const miner = response.data.miner_item;

        // const image = response.data.miner_item.image || 'Нет данных';

        this.name = miner.name || "Нет данных";
        this.rang = miner.priority || "Нет данных";
        this.show = miner.is_hidden || "Нет данных";
        this.desc = miner.description || "Нет данных";
        this.categories = response.data.categories || [];
        const currentCategory = miner.category || {};
        this.category = currentCategory.name;
        this.hash = miner.hash_rate || "Нет данных";
        this.energy_consumption = miner.energy_consumption || "Нет данных";
        this.price = miner.price || "Нет данных";
        this.image = (miner.image.url || "Нет данных").replace(
          "https://209.46.123.31:9000",
          "https://totalminers.io"
        );
        this.closed = miner.is_hidden;
        (this.category_id = miner.category.id || 1),
          // this.image_id = image.url || 'Нет данных';

          (this.count_sale = miner.discount_count || 0);
        this.sale = miner.discount_value || 0;
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
      }
    },
    selectImage() {
      this.$refs.fileInput.click(); // Программно вызываем клик на скрытом input
    },

    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.image = URL.createObjectURL(file); // Отображаем выбранное изображение
        this.selectedFile = file; // Сохраняем файл для отправки на сервер
        this.update();
      }
    },
    async deleteImage() {
      console.log("deleteImage called"); // Проверка вызова метода
      // Создаем объект файла из изображения по умолчанию
      const defaultImagePath = require("../assets/deleted.jpg"); // Путь к изображению
      const response = await fetch(defaultImagePath);
      const blob = await response.blob(); // Получаем Blob из изображения
      // Создаем объект File
      const file = new File([blob], "deleted.jpg", { type: "image/png" }); // Укажите правильный тип
      // Устанавливаем изображение по умолчанию для отображения
      this.image = defaultImagePath;
      // Сбрасываем selectedFile и добавляем новый файл в FormData
      this.selectedFile = file; // Сохраняем файл для отправки на сервер
      await this.update(); // Вызываем метод обновления
    },

    async update() {
      this.is_open = false;
      this.isloading = true;
      const url = `/miners/${this.id}/`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const data = new FormData();
      data.append("name", this.name);
      data.append("description", this.desc);
      data.append("category", this.category_id);
      data.append("hash_rate", this.hash);
      data.append("energy_consumption", this.energy_consumption);
      data.append("price", this.price);
      data.append("priority", this.rang);
      data.append("ishidden", this.closed ? "on" : "off");

      data.append("discount_value", this.sale);
      data.append("discount_count", this.count_sale);

      if (this.selectedFile) {
        data.append("image", this.selectedFile);
      }

      try {
        const response = await axios.post(url, data, { headers });
        console.log(response);
      } catch (error) {
        console.error("Error uploading data:", error);
      } finally {
        this.isloading = false;
      }
    },

    async Cart() {
      this.isloading = true;
      const url = "https://totalminers.io/api/market/cart/set";
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      const data = {
        user_id: parseInt(this.id_client),
        miner_item_id: parseInt(this.id),
        count: parseInt(this.count_client),
        discount: parseInt(this.sale_client),
      };
      try {
        const response = await axios.put(url, data, { headers });
        console.log(response);
        if (response.status === 200) {
          alert("Успешно!");
        }
      } catch (error) {
        if (error.response) {
          // Сервер вернул статус код, отличный от 2xx
          alert(`Ошибка ${error.response.status}`);
        } else {
          // Ошибка при настройке запроса
          alert("Ошибка при отправке запроса");
        }
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
      }
    },
    async deleteMiners() {
      this.isloading = true;
      const url = `/miners/${this.id}/delete`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };
      try {
        const response = await axios.post(url, {}, { headers });
        console.log(response);
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isloading = false;
        this.$router.push({ name: "miners" });
      }
    },
    onCategoryChange(event) {
      const selectedName = event.target.value;
      const selectedCat = this.categories.find((cat) => cat.name === selectedName);
      if (selectedCat) {
        this.changeCategoryId(selectedCat.id);
      }
    },
    changeCategoryId(id) {
      this.category_id = id;
      console.log("Selected category id:", id);
    },
    open() {
      this.is_open = true;
      console.log(this.is_open);
    },
  },
  mounted() {
    this.getMiners();
  },
};
</script>
<template>
  <ModalAccept @close="is_open = false" @update="update()" v-if="is_open" />
  <LoadingSpinner v-if="isloading" />
  <section class="wrapper" v-else>
    <div class="group-title">
      <h1>Майнер #{{ id }}</h1>
    </div>
    <div class="card">
      <h2>Общая информация</h2>
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
          <label for="rang" class="group-value">Приоритет</label>
          <input
            type="text"
            id="rang"
            name="rang"
            v-model="rang"
            class="group-item"
            placeholder="Введите приоритет"
          />
        </div>
      </div>
      <div class="group">
        <label for="desc" class="group-value">Описание</label>
        <input
          type="text"
          id="desc"
          name="desc"
          v-model="desc"
          class="group-item"
          placeholder="Введите описание"
        />
      </div>
      <div class="wrap-check">
        <input type="checkbox" v-model="closed" id="closed" class="checkbox" />
        <label for="closed" class="group-value">Скрыть</label>
      </div>
      <div class="group">
        <label for="category" class="group-value">Категория</label>
        <select
          class="group-item"
          name="category"
          id="category"
          v-model="category"
          @change="onCategoryChange"
        >
          <option v-for="cat in categories" :key="cat.id" :value="cat.name">
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="hash" class="group-value">Хешрейт (TH/s)</label>
          <input
            type="text"
            id="hash"
            name="hash"
            v-model="hash"
            class="group-item"
            placeholder="Введите хешрейт"
          />
        </div>
        <div class="group">
          <label for="energy_consumption" class="group-value"
            >Энергопотребление (W)</label
          >
          <input
            type="text"
            id="energy_consumption"
            name="energy_consumption"
            v-model="energy_consumption"
            class="group-item"
            placeholder="Введите энергопотребление"
          />
        </div>
      </div>
      <div class="group">
        <label for="price" class="group-value">Цена (USD)</label>
        <input
          type="text"
          id="price"
          name="price"
          v-model="price"
          class="group-item"
          placeholder="Введите цену"
        />
      </div>
      <div class="wrap-avatar">
        <div class="container-img">
          <img :src="image ? image : '../assets/image.png'" alt="Майнер" />
        </div>
        <div class="actions-avatar">
          <a class="edit-img" @click="selectImage">
            Изменить
            <input
              type="file"
              ref="fileInput"
              @change="onFileChange"
              style="display: none"
            />
          </a>
          <a class="delete-img" @click="deleteImage">Удалить</a>
        </div>
      </div>
    </div>
    <div class="card">
      <h2>Скидки</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="count_sale" class="group-value">Количество для скидки</label>
          <input
            type="text"
            id="count_sale"
            name="count_sale"
            v-model="count_sale"
            class="group-item"
            placeholder="Введите хешрейт"
          />
        </div>
        <div class="group">
          <label for="sale" class="group-value">Процент скидки</label>
          <input
            type="text"
            id="sale"
            name="sale"
            v-model="sale"
            class="group-item"
            placeholder="Введите энергопотребление"
          />
        </div>

        <!-- <button class="delete-img">Удалить</button> -->
      </div>

      <!-- <button class="edit-img">Добавить</button> -->
    </div>
    <div class="card">
      <h2>Добавить в корзину клиента</h2>
      <div class="wrap-group">
        <div class="group">
          <label for="id_client" class="group-value">ID Клиента</label>
          <input
            type="text"
            id="id_client"
            name="id_client"
            v-model="id_client"
            class="group-item"
            placeholder="Введите ID клиента"
          />
        </div>
        <div class="group">
          <label for="count_client" class="group-value">Количество</label>
          <input
            type="text"
            id="count_client"
            name="count_client"
            v-model="count_client"
            class="group-item"
            placeholder="Введите количество"
          />
        </div>
        <div class="group">
          <label for="sale_client" class="group-value">Скидки</label>
          <input
            type="text"
            id="sale_client"
            name="sale_client"
            v-model="sale_client"
            class="group-item"
            placeholder="Введите скидки"
          />
        </div>
      </div>
      <button class="btn send" @click="Cart()">Отправить</button>
    </div>
    <div class="wrap-btns">
      <button class="btn delete" @click="open()">Удалить</button>
      <button class="btn save" @click="open()">Сохранить</button>
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
  background-color: #fff;
  gap: 20px;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #f0f0f5;
  transition: all 500ms ease;
  cursor: auto;
}

.save {
  width: 100%;
  background-color: #195ee6;
  color: #fff;
  font-weight: 600;
}

.delete {
  width: 100%;
  background-color: #dc2626;
  color: #fff;
  font-weight: 600;
}
.wrap-avatar {
  display: flex;
  align-items: center;
  gap: 20px;
}

.container-img {
  width: 120px;
  height: 120px;
}

.container-img img {
  border-radius: 10px;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.actions-avatar {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.edit-img,
.delete-img {
  width: fit-content;
  color: #195ee6;
  text-decoration: underline;
  font-weight: 500;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
  cursor: pointer;
}

.delete-img {
  color: #dc2626;
}
</style>
