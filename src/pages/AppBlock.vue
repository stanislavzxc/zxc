<template>
  <div class="overlay">
    <div class="message">
      <h1>У вас нет доступа к этому разделу</h1>
    </div>
  </div>
</template>

<style scoped>
.overlay {
  position: relative; /* Используем fixed для полного покрытия экрана */
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh; /* Исправлено на 100vh для правильного заполнения экрана */
  background: rgba(255, 255, 255, 0.8); /* Бело-серый фон с прозрачностью */
  backdrop-filter: blur(10px); /* Эффект размытия фона */
  display: flex; /* Используем flexbox для центрирования */
  justify-content: center; /* Центрирование по горизонтали */
  align-items: center; /* Центрирование по вертикали */
}

.message {
  text-align: center; /* Центрируем текст внутри сообщения */
  padding: 20px; /* Добавляем отступы */
  border-radius: 10px; /* Закругляем углы */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2); /* Добавляем тень для глубины */
}

h1 {
  margin: 0; /* Убираем отступы */
  font-size: 24px; /* Размер шрифта */
  color: #333; /* Цвет текста */
}
</style>
