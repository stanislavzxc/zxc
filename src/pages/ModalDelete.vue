<template>
  <div class="overlay">
    <div class="modal">
      <h1>Удалить</h1>
      <h6>Вы действительно хотите внести изменения?</h6>
      <div class="btns">
        <button class="btn delete" @click="cancel()">Отмена</button>
        <button class="btn save" @click="update()">Да, удалить</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    cancel() {
      this.$emit("close");
    },
    update() {
      this.$emit("update");
    },
  },
  mounted() {
    document.body.style.overflow = "hidden";
  },
};
</script>

<style scoped>
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
  margin-top: 15%;
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
</style>
