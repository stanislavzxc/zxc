<template>
  <div class="overlay">
    <div class="modal" id="Acceptmodal" :style="modalStyle">
      <h1>Сохранить Изменения</h1>
      <h6>Вы действительно хотите внести изменения?</h6>
      <div class="btns">
        <button class="btn delete" @click="cancel()">Отмена</button>
        <button class="btn save" @click="update()">Да, внести</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      windowWidth: window.innerWidth, // Реактивная ширина окна
    };
  },
  computed: {
    modalStyle() {
      // Динамический стиль: width: auto если <450px, иначе по умолчанию (500px из CSS)
      return this.windowWidth < 450 ? { width: "auto !important" } : {};
    },
  },
  methods: {
    cancel() {
      this.$emit("close");
    },
    update() {
      this.$emit("update");
    },
    handleResize() {
      this.windowWidth = window.innerWidth; // Обновляем при изменении размера
    },
  },
  mounted() {
    document.body.style.overflow = "hidden";
    window.addEventListener("resize", this.handleResize); // Слушаем изменения размера
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.handleResize); // Убираем слушатель при размонтировании
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
  width: 100vw; /* Полное покрытие экрана */
  height: 100vh;
  backdrop-filter: blur(10px);
  top: 0;
  left: 0;
  z-index: 9998;
}

.modal {
  width: 500px; /* По умолчанию */
  height: auto;
  margin: auto;
  margin-top: 15%;
  padding: 15px;
  display: flex;
  text-align: center;
  flex-direction: column;
  gap: 15px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 15px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 9999;
}

/* Убрали медиа-запрос, чтобы не конфликтовать с Vue-стилями */
</style>
