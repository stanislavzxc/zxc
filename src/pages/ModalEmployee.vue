<template>
  <div class="overlay">
    <div class="modal">
      <h1>Создать сотрудника</h1>
      <div class="wrap-group">
        <div class="group">
          <label for="name" class="group-value">Имя</label>
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
          <label for="name" class="group-value">email</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="email"
            class="group-item"
            placeholder="Введите название"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="name" class="group-value">телефон</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="phone"
            class="group-item"
            placeholder="Введите название"
          />
        </div>
        <div class="group">
          <label for="name" class="group-value">telegram</label>
          <input
            type="text"
            id="name"
            name="name"
            v-model="telegram"
            class="group-item"
            placeholder="Введите название"
          />
        </div>
      </div>
      <div class="wrap-group">
        <div class="group">
          <label for="status" class="group-value">роль:</label>
          <select type="text" id="role" name="role" v-model="role" class="group-item">
            <option value="admin">Админ</option>
            <option value="operator">Оператор</option>
          </select>
        </div>
        <div class="group">
          <label for="name" class="group-value">пароль</label>
          <input
            type="text"
            id="password"
            name="password"
            v-model="password"
            class="group-item"
          />
        </div>
      </div>

      <div class="btns">
        <button class="btn delete" @click="cancel()">Отмена</button>
        <button class="btn save" @click="update()">Создать</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      phone: "",
      telegram: "",
      role: "",
      password: "",
      email: "",
    };
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    update() {
        this.$emit("update", {
            name: this.name,
            email: this.email,
            phone: this.phone,
            telegram: this.telegram,
            role: this.role,
            password: this.password,
        });
    },
  },
  mounted() {
    document.body.style.overflow = "hidden";
  },
  unmounted() {
    document.body.style.overflow = "scroll";
  },
};
</script>

<style scoped>
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
.btns {
  display: flex;
  justify-content: space-around;
}
.btn {
  padding: 14.5px 24px;
  border-radius: 8px;
  color: #5b6171;
  font-weight: 600;
  transition: all 500ms ease;
  width: 45%;
}
.save {
  background-color: #195ee6;
  color: #fff;
  font-weight: 600;
}

.delete {
  border: 1px solid #dc2626;

  color: #dc2626;
  font-weight: 600;
}
.overlay {
  position: fixed;
  width: 100%; /* Измените на 100% для полного покрытия */
  height: 100vh;
  backdrop-filter: blur(10px); /* Убедитесь, что значение подходит */
  top: 0; /* Добавьте это, чтобы позиционировать overlay */
  left: 0; /* Добавьте это, чтобы позиционировать overlay */
  z-index: 9998; /* Убедитесь, что z-index выше, чем у других элементов */
}

.modal {
  width: 500px;
  height: auto;
  margin: auto;
  margin-top: 10%;
  padding: 15px;
  display: flex;
  text-align: center;
  flex-direction: column;
  gap: 15px;
  background-color: rgba(255, 255, 255, 0.9); /* Добавьте непрозрачность */
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1); /* Убедитесь, что тень видна */
  position: relative;
  z-index: 9999; /* Убедитесь, что z-index выше, чем у overlay */
}
.group {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: start;
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
</style>
