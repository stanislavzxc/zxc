<script>
import axios from 'axios'
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
      newMessage: "", // Новое текстовое сообщение
      selectedFile: null, // Выбранный файл
      userid: null,
      isLoading: false,
    };
  },
  methods: {
    async closeTicket() {
      try {
        this.isLoading = true;
        let response = await axios.put(
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
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    async openTicket() {
      try {
        this.isLoading = true;
        let response = await axios.get(
          `https://totalminers.io/api/tickets/close`,
          {
            params: {
              id: this.ticket_id,
              userId: this.userid,
            },
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        console.log(response);
      } catch (err) {
        console.log(err);
      } finally {
        this.isLoading = false;
      }
    },

    zxc() {
      if (this.status === 'Открыт') {
        this.openTicket();
      } else {
        this.closeTicket();
      }
    },

    update_data() {
      this.ticket_id = localStorage.getItem('ticket_id');
      this.status = localStorage.getItem('is_open');
      this.theme = localStorage.getItem('title');
      this.client = localStorage.getItem('firstname');
      this.client2 = localStorage.getItem('lastname');
      this.createdAt = localStorage.getItem('date');
      this.userid = localStorage.getItem('id');
    },

    handleFileChange(event) {
      this.selectedFile = event.target.files[0];
      if (this.selectedFile) {
        this.sendFile(); // Отправляем файл сразу после выбора
      }
    },

    async sendFile() {
      if (!this.selectedFile) {
        alert("Выберите файл для отправки!");
        return;
      }

      const formData = new FormData();
      formData.append('file', this.selectedFile);

      try {
        const response = await axios.post(`/tickets/${this.ticket_id}`, formData, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Файл успешно отправлен:', response.data.message);

        // Добавляем файл в массив сообщений
        this.messages.push({
          id: Date.now(),
          sender: 'admin',
          content: '', // Пустое текстовое сообщение, так как отправлен файл
          type: 'file',
          name: this.selectedFile.name,
          size: this.selectedFile.size,
          url: URL.createObjectURL(this.selectedFile), // Создаем URL для отображения файла
        });

        // Очищаем выбранный файл
        this.selectedFile = null;
        this.$refs.fileInput.value = ''; // Сбрасываем выбранный файл
      } catch (error) {
        if (error.response) {
          console.error('Ошибка:', error.response.data.error);
        } else {
          console.error('Ошибка при отправке файла:', error);
        }
      }
    },

    async sendMessage() {
      if (!this.newMessage.trim()) {
        alert("Введите сообщение!");
        return;
      }

      const formData = new FormData();
      formData.append('msg', this.newMessage);

      try {
        const response = await axios.post(`/tickets/${this.ticket_id}`, formData, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'multipart/form-data',
          },
        });

        console.log('Сообщение успешно отправлено:', response.data.message);

        // Добавляем текстовое сообщение в массив сообщений
        this.messages.push({
          id: Date.now(),
          sender: 'admin',
          content: this.newMessage,
          type: 'text',
          name: '',
          size: '',
        });

        this.newMessage = '';
      } catch (error) {
        if (error.response) {
          console.error('Ошибка:', error.response.data.error);
        } else {
          console.error('Ошибка при отправке сообщения:', error);
        }
      }
    },

    async load_messages() {
      try {
        // Обновим данные из localStorage, чтобы ticket_id и userid были актуальны
        this.update_data();

        let response = await axios.put(
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

        // Обработка сообщений
        this.messages = response.data.messages.map(msg => {
          let url = null;
          let name = null;

          // Проверяем, что msg.content не null
          const content = msg.content || ''; // Если null, используем пустую строку

          if (content.startsWith('[file:')) {
            // Парсим имя файла и base64
            const match = content.match(/^\[file:(.+?)\](.+)$/);
            if (match) {
              name = match[1];
              url = match[2];
            }
            return {
              id: msg.id,
              sender: msg.sender,
              content: '', // Пустое текстовое сообщение, так как это файл
              type: 'file',
              name,
              size: '', // Можно добавить размер, если он доступен
              url,
            };
          } else {
            // Если это текстовое сообщение
            return {
              id: msg.id,
              sender: msg.sender,
              content: content, // Сохраняем текст сообщения
              type: 'text',
              name: '',
              size: '',
            };
          }
        }).reverse();

      } catch (err) {
        console.log(err);
      }
    },

    downloadFile(base64String, fileName) {
      const link = document.createElement('a');
      link.href = base64String;
      link.download = fileName;
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
          :class="{ user: message.sender == 'user' }"
        >
          <div
            class="group-message"
            :class="{ userGroupMessage: message.sender == 'user' }"
          >
            <div
              class="message"
              v-if="message.type == 'text'"
              :class="{ userMessage: message.sender == 'user' }"
            >
              {{ message.content }}
            </div>
            <div
              class="message doc"
              v-if="message.type == 'file'"
              :key="message.id"
              :class="{ userMessage: message.sender == 'user' }"
              @click="downloadFile('data:application/octet-stream;base64,' + message.url, message.name)"
            >
              <template v-if="message.name.endsWith('.jpg') || message.name.endsWith('.jpeg') || message.name.endsWith('.png') || message.name.endsWith('.gif')">
                <img :src="message.url" alt="Uploaded Image" style="max-width: 100%; height: auto;" />
              </template>
              <template v-else>
                <img src="../assets/message-file.svg" alt="File Icon" />
                <div class="info">
                  <span class="name">{{ message.name }}</span>
                  <span class="size">{{ message.size }} bytes</span>
                </div>
              </template>
            </div>

            <div class="avatar">
              <img
                src="../assets/image.png"
                alt=""
                v-if="message.sender == 'user'"
              />
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
        />
        <img class="send" src="../assets/send.svg" alt="" @click="sendMessage" />
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
.btn-action:hover,
.chat:hover {
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

.group-item {
  line-height: 22px;
  font-size: 14px;
  width: 100%;
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
  width: 30px;
}

.send:hover {
  transform: translateY(-3px);
}
.avatar {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  overflow: hidden; /* Обрезает изображение, если оно выходит за пределы блока */
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f0f0f0; /* Фон на случай, если изображение не загрузится */
  box-sizing: border-box;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  display: block; /* Убирает лишние пробелы */
  border: none; /* Убирает возможные границы */
  padding: 0; /* Убирает возможные отступы */
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
