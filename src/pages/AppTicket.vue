<template>
  <section class="wrapper">
    <h1>Тикет №{{ ticket_id }}</h1>
    <div class="card">
      <h2>Основная информация</h2>
      <div class="group">
        <label for="status" class="group-value">Статус</label>
        <select
          type="text"
          id="status"
          name="status"
          v-model="status"
          class="group-item"
          placeholder="Выберите статус"
          @change="zxc()"
        >
          <option value="Открыт">Открыт</option>
          <option value="Закрыт">Закрыт</option>
        </select>
      </div>
      <div class="fields">
        <div class="field">
          <span class="field-item">Тема:</span>
          <span class="field-value">{{ theme }}</span>
        </div>
        <div class="field">
          <span class="field-item">Клиент</span>
          <span class="field-value">{{ client }} {{ client2 }}</span>
        </div>
        <div class="field">
          <span class="field-item">Создано</span>
          <span class="field-value">{{ createdAt }}</span>
        </div>
      </div>
    </div>
    <div class="chat">
      <div class="messages">
        <div
          class="wrap-message"
          v-for="message in messages"
          :key="message.id"
          :class="{
            user: message.sender === 'user',
            admin: message.sender === 'admin',
          }"
        >
          <div
            class="group-message"
            :class="{
              userGroupMessage: message.sender === 'user',
              adminGroupMessage: message.sender === 'admin',
            }"
          >
            <div class="avatar" v-if="message.sender === 'admin'">
              <img src="../assets/image.png" alt="Admin avatar" />
            </div>

            <div
              class="message"
              :class="{
                userMessage: message.sender === 'user',
                adminMessage: message.sender === 'admin',
              }"
            >
              <template v-if="message.type === 'text'">
                {{ message.content }}
              </template>

              <template v-else-if="message.type === 'file'">
                <template v-if="message.url && message.url.startsWith('data:image/')">
                  <img
                    :src="message.url"
                    alt="Uploaded Image"
                    style="max-width: 100%; height: auto"
                    @click="downloadFile(message.url, message.name)"
                  />
                </template>
                <template v-else>
                  <div class="doc" @click="downloadFile(message.url, message.name)">
                    <img src="../assets/message-file.svg" alt="File Icon" />
                    <div class="info">
                      <span class="name">{{ message.name }}</span>
                      <span class="size">{{ message.size }} bytes</span>
                    </div>
                  </div>
                </template>
              </template>
            </div>

            <div class="avatar" v-if="message.sender === 'user'">
              <img src="../assets/image.png" />
            </div>
          </div>
        </div>
      </div>
      <div class="group-send">
        <div class="group-file">
          <input type="file" id="file" ref="fileInput" @change="handleFileChange" />
          <label class="select-img" for="file">
            <img class="photo" src="../assets/folder-add.svg" alt="" />
          </label>
        </div>
        <input
          type="text"
          class="group-item-chat"
          placeholder="начните писать"
          v-model="newMessage"
          @keyup.enter="sendMessage"
        />
        <img class="send" src="../assets/send.svg" alt="" @click="sendMessage" />
      </div>
    </div>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "AppTicket",
  data() {
    return {
      ticket_id: "Загрузка...",
      status: "Загрузка...",
      theme: "Загрузка...",
      client: "Загрузка...",
      client2: "",
      createdAt: "Загрузка...",
      messages: [],
      newMessage: "",
      selectedFile: null,
      userid: null,
      isLoading: false,
    };
  },
  methods: {
    async closeTicket() {
      try {
        this.isLoading = true;
        const response = await axios.put(
          `https://totalminers.io/api/tickets/close`,
          {
            id: this.ticket_id,
            userId: this.userid,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    async openTicket() {
      try {
        this.isLoading = true;
        const response = await axios.get(`https://totalminers.io/api/tickets/close`, {
          params: {
            id: this.ticket_id,
            userId: this.userid,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        console.log(response);
      } catch (err) {
        console.error(err);
      } finally {
        this.isLoading = false;
      }
    },

    zxc() {
      if (this.status === "Открыт") {
        this.openTicket();
      } else if (this.status === "Закрыт") {
        this.closeTicket();
      }
    },

    update_data() {
      this.ticket_id = localStorage.getItem("ticket_id") || this.ticket_id;
      this.status = localStorage.getItem("is_open") || this.status;
      this.theme = localStorage.getItem("title") || this.theme;
      this.client = localStorage.getItem("firstname") || this.client;
      this.client2 = localStorage.getItem("lastname") || this.client2;
      this.createdAt = localStorage.getItem("date") || this.createdAt;
      this.userid = localStorage.getItem("id") || this.userid;
    },

    readFileAsBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    },

    async handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        await this.sendFile();
      }
    },

    async sendFile() {
      if (!this.selectedFile) {
        alert("Выберите файл для отправки!");
        return;
      }

      try {
        const base64 = await this.readFileAsBase64(this.selectedFile);
        const formData = new FormData();
        formData.append("msg", `[file:${this.selectedFile.name}]${base64}`);

        const response = await axios.post(`/tickets/${this.ticket_id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Файл успешно отправлен:", response.data.message);

        // Добавляем файл локально для мгновенного отображения
        this.messages.push({
          id: Date.now(),
          sender: "admin",
          content: "",
          type: "file",
          name: this.selectedFile.name,
          size: this.selectedFile.size,
          url: base64, // Полный data: URL для отображения и скачивания
        });

        this.selectedFile = null;
        if (this.$refs.fileInput) this.$refs.fileInput.value = "";
      } catch (error) {
        if (error.response) {
          console.error("Ошибка:", error.response.data.error);
        } else {
          console.error("Ошибка при отправке файла:", error);
        }
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim()) {
        alert("Введите сообщение!");
        return;
      }

      const formData = new FormData();
      formData.append("msg", this.newMessage.trim());

      try {
        const response = await axios.post(`/tickets/${this.ticket_id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        });

        console.log("Сообщение успешно отправлено:", response.data.message);

        // Добавляем сообщение локально
        this.messages.push({
          id: Date.now(),
          sender: "admin",
          content: this.newMessage.trim(),
          type: "text",
          name: "",
          size: "",
        });

        this.newMessage = "";
      } catch (error) {
        if (error.response) {
          console.error("Ошибка:", error.response.data.error);
        } else {
          console.error("Ошибка при отправке сообщения:", error);
        }
      }
    },

    async load_messages() {
      try {
        this.update_data();

        const response = await axios.put(
          `https://totalminers.io/api/tickets/messages/get/all`,
          {
            ticket_id: this.ticket_id,
            user_id: this.userid,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);

        this.messages = (response.data.messages || [])
          .map((msg) => {
            const content = msg.content || "";
            if (content.startsWith("[file:")) {
              const match = content.match(/^\[file:(.+?)\](.+)$/);
              if (match) {
                return {
                  id: msg.id,
                  sender: msg.sender,
                  content: "",
                  type: "file",
                  name: match[1],
                  size: "",
                  url: match[2], // Теперь это полный data: URL
                };
              }
            }
            return {
              id: msg.id,
              sender: msg.sender,
              content,
              type: "text",
              name: "",
              size: "",
            };
          })
          .reverse();
      } catch (err) {
        console.error(err);
      }
    },

    downloadFile(url, fileName) {
      const link = document.createElement("a");
      link.href = url; // Прямой data: URL или замененный, если внешний
      link.download = fileName || "";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  },

  mounted() {
    setTimeout(() => {
      this.update_data();
      this.load_messages();
    }, 1000);
  },
};
</script>

<style scoped>
/* Стили из вашего оригинального кода с добавлениями из примера для сообщений */

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
.btn-action:hover,
.chat:hover {
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
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

.group-item-chat {
  width: 100%;
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #5b6171;
}

.group-item-chat::placeholder {
  color: #8c93a6;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
}

.fields {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.field {
  display: flex;
  align-items: center;
  gap: 10px;
}

.field-item {
  font-weight: 500;
  font-size: 14px;
  line-height: 19.12px;
  color: #5b6171;
}

.field-value {
  color: #262d40;
  font-size: 16px;
  line-height: 21.86px;
  letter-spacing: 0em;
}

h1 {
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

/* chat */

.chat {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  border-radius: 20px;
  border: 1px solid #f0f0f5;
  transition: all 500ms ease;
  cursor: auto;
}

input[type="file"] {
  border: none;
  display: none;
}

.group-file {
  display: flex;
  align-items: center;
  justify-content: center;
}

.messages {
  width: 100%;
  height: 80vh;
  padding: 20px;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  overflow-x: hidden;
  overflow-y: scroll;
}

.messages::-webkit-scrollbar {
  width: 0;
}

.wrap-message {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}

.user {
  justify-content: flex-end;
}

.admin {
  justify-content: flex-start;
}

.group-message {
  width: 100%;
  display: flex;
  align-items: start;
  justify-content: start;
  gap: 10px;
  flex-direction: row-reverse;
  padding-right: 38px;
  padding-left: 0;
}

.userGroupMessage {
  flex-direction: row;
  padding-left: 38px;
  padding-right: 0;
  justify-content: end;
}

.adminGroupMessage {
  flex-direction: row;
  padding-left: 0;
  padding-right: 38px;
  justify-content: flex-start;
}

.message {
  max-width: 600px;
  width: fit-content;
  background-color: #e6eefe;
  padding: 20px;
  border-radius: 4px 12px 12px 12px;
  border: 1px solid #f1f2f4;
}

.userMessage {
  background-color: #fff;
  border-radius: 12px 4px 12px 12px;
}

.adminMessage {
  background-color: #e6eefe;
  border-radius: 12px 12px 12px 4px;
}

.group-send {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 13px 16px;
  border-radius: 8px;
  border: 1px solid #dfe3ec;
  background-color: #fff;
}

.send {
  cursor: pointer;
  transition: all 500ms ease;
  width: 30px;
}

.send:hover {
  transform: translateY(-3px);
}

.avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0;
  box-sizing: border-box;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: block;
  border: none;
  padding: 0;
  margin: 0;
}

.doc {
  display: flex;
  gap: 10px;
  cursor: pointer;
}

.info {
  display: flex;
  flex-direction: column;
}

.name {
  font-weight: 500;
  font-size: 12px;
  line-height: 16.8px;
}

.size {
  color: #a7adbe;
  font-size: 10px;
  line-height: 14px;
  font-weight: 500;
}
</style>
