<script>
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
  name: "NewsSettings",
  components: { LoadingSpinner },
  data() {
    return {
      count: 1,
      isloading: false,

      news: [
        {
          new: "",
          img: "",
          title: "",
          desc: "",
        },
      ],
    };
  },
  methods: {
    async plus() {
      try {
        await this.new();
        await this.getfaq();
      } catch (err) {
        console.log(err);
      }
    },

    async minus() {
      try {
        await this.deleteLast();
        await this.getfaq();
      } catch (err) {
        console.log(err);
      }
    },

    async updatefaq(item) {
      if (!item.id) {
        console.error("ID новости не определен");
        return;
      }
      this.isloading = true;

      const url = `/news/${item.id}/update`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const data = {
        title: item.title,
        description: item.desc,
        url: item.new,
        image: item.image,
      };

      try {
        const response = await axios.put(url, data, { headers });
        console.log("Новость обновлена:", response.data);
      } catch (error) {
        console.error("Ошибка обновления новости:", error);
      } finally {
        this.isloading = false;
      }
    },

    async deleteNew(id) {
      this.isloading = true;

      const url = `/news/${id}/delete`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.post(url, {}, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Ошибка обновления настроек:", error);
      } finally {
        this.isloading = false;
        this.getfaq();
      }
    },
    async deleteLast() {
      if (this.news.length === 0) return; // Check if array is empty
      this.isloading = true;

      const lastItem = this.news[this.news.length - 1]; // Get the last item properly
      if (!lastItem?.id) {
        console.error("No valid news item to delete");
        return;
      }
      const url = `/news/${lastItem.id}/delete`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.post(url, {}, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Ошибка обновления настроек:", error);
      } finally {
        this.isloading = false;
        this.getfaq();
      }
    },

    async new() {
      this.isloading = true;

      const url = `/news/new`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const data = {
        title: "Новость",
        description: "Описание",
        url: "www.exemple.com",
        image: "void",
      };

      try {
        const response = await axios.post(url, data, { headers });
        console.log(response.data);
      } catch (error) {
        console.error("Error updating settings:", error);
      } finally {
        this.isloading = false;
      }
    },

    async getfaq() {
      this.isloading = true;
      const url = `/news`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        this.news = response.data.map((item) => ({
          id: item.id,
          new: item.url || "",
          image: item.image || "",
          title: item.title || "",
          desc: item.description || "",
        }));
        this.count = this.news.length;
      } catch (error) {
        console.error("Error updating settings:", error);
      } finally {
        this.isloading = false;
      }
    },

    async selectImage(item) {
      const input = document.createElement("input");
      input.type = "file";
      input.accept = "image/*";

      input.onchange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            item.image = reader.result; // Сохраняем Base64 строку в item.img
          };
          reader.readAsDataURL(file); // Читаем файл как Data URL
        }
      };

      input.click(); // Открываем диалог выбора файла
    },
  },
  mounted() {
    this.getfaq();
  },
};
</script>

<template>
  <LoadingSpinner v-if="isloading" />
  <section class="wrapper" v-else>
    <div class="card">
      <div class="group-title">
        <h2>Новости</h2>
        <div class="wrap-actions">
          <img @click="minus" src="../../assets/minus.png" alt="" />
          <span>{{ count }}</span>
          <img @click="plus" src="../../assets/plus.png" alt="" />
        </div>
      </div>
      <div class="new" v-for="(item, i) in news" :key="i">
        <div class="group">
          <label for="new" class="group-value">Новость {{ i + 1 }}</label>
          <input
            type="text"
            id="new"
            name="new"
            v-model="item.new"
            class="group-item"
            placeholder="Link"
          />
        </div>
        <div class="wrap-group">
          <div class="group">
            <label for="title" class="group-value">Заголовок</label>
            <input
              type="text"
              id="title"
              name="title"
              v-model="item.title"
              class="group-item"
              placeholder="Заголовок"
            />
          </div>
          <div class="group">
            <label for="desc" class="group-value">Описание</label>
            <input
              type="text"
              id="desc"
              name="desc"
              v-model="item.desc"
              class="group-item"
              placeholder="Описание"
            />
          </div>
        </div>
        <div class="wrap-avatar">
          <div class="container-img" @click="selectImage(item)">
            <img v-if="item.image != 'void'" :src="item.image" alt="News image" />
            <img src="../../assets/image.png" alt="" v-else />
          </div>
          <div class="actions-avatar">
            <a class="edit-img" @click="updatefaq(item)">Изменить</a>
            <a class="delete-img" @click="deleteNew(item.id)">Удалить</a>
          </div>
        </div>
      </div>
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

h2 {
  font-size: 20px;
  font-weight: 600;
  line-height: 27.32px;
  color: #14171f;
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

.group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.wrap-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.new {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.wrap-actions img {
  height: 28px;
  width: 28px;
  cursor: pointer;
}

.wrap-actions span {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
}
</style>
