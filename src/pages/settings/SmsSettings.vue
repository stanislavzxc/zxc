<script>
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner.vue";
export default {
  name: "MailSettings",
  components: { LoadingSpinner },
  data() {
    return {
      count: 1,
      isloading: false,
      mails: [
        {
          name: "",
          template: "",
          template_type: "",
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
      this.isloading = true;
      if (!item.id) {
        console.error("ID новости не определен");
        return;
      }

      const url = `/mail_templates/${item.id}/update`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const data = {
        title: item.name,
        content: item.template,
        template_type: "sms",
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

      const url = `/mail_templates/${id}/delete`;
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
      const url = `/mail_templates/${lastItem.id}/delete`;
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

      const url = `/mail_templates/new`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      };

      const data = {
        title: "Шаблон",
        content: "Описание",
        template_type: "sms",
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

      const url = `/mail_templates`;
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      try {
        const response = await axios.get(url, { headers });
        console.log(response.data);

        // Фильтруем только элементы с template_type == 'mail' и преобразуем их
        this.mails = response.data
          .filter((item) => item.template_type === "sms")
          .map((item) => ({
            id: item.id,
            name: item.title,
            template: item.content,
            template_type: item.template_type,
          }));

        this.count = this.mails.length;
      } catch (error) {
        console.error("Error updating settings:", error);
      } finally {
        this.isloading = false;
      }
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
        <h2>Шаблоны писем</h2>
        <div class="wrap-actions">
          <img @click="minus" src="../../assets/minus.png" alt="" />
          <span>{{ count }}</span>
          <img @click="plus" src="../../assets/plus.png" alt="" />
        </div>
      </div>
      <div class="mail" v-for="(item, i) in mails" :key="i">
        <div class="group">
          <label for="mail" class="group-value">Название шаблона {{ i + 1 }}</label>
          <input
            type="text"
            id="mail"
            name="mail"
            v-model="item.name"
            class="group-item"
            placeholder="Название"
          />
        </div>
        <div class="group">
          <label for="template" class="group-value">Шаблон {{ i + 1 }}</label>
          <input
            type="text"
            id="template"
            name="template"
            v-model="item.template"
            class="group-item"
            placeholder="Введите Текст"
          />
        </div>
        <div class="btn-cont">
          <button @click="updatefaq(item)">Обновить</button>
          <button @click="deleteNew(item.id)">Удалить</button>
        </div>
        <div class="hr"></div>
      </div>
    </div>
  </section>
</template>
<style scoped>
.btn-cont {
  width: 100%;
  display: flex;
  justify-content: space-between;
}
.btn-cont button {
  padding: 14.5px 24px;
  border-radius: 8px;
  background-color: #195ee6;
  color: white;
  width: 45%;
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

.mail {
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
