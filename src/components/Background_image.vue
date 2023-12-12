<template>
  <div v-if="elKey == 'background-image'" :class="elKey">
    <div class="hero-image">
      <div class="hero-text">
        <h1 style="font-size: 50px">Bartosz Kwasniewski</h1>
        <p>Programista</p>
        <button>Zatrudnij mnie</button>
      </div>
    </div>

    <p>Reszte..</p>
  </div>
</template>

<script>
export default {
  name: 'Background_Image',

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.background-image {
  position: absolute;
  top: 0;
  height: 150vh;
  width: 100%;
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  z-index: -100;
}
.hero-image {
  background-image: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('background_image.jpg');
  height: 50%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  position: relative;
}

.hero-text {
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
}

.hero-text button {
  border: none;
  outline: 0;
  display: inline-block;
  padding: 10px 25px;
  color: black;
  background-color: #ddd;
  text-align: center;
  cursor: pointer;
}

.hero-text button:hover {
  background-color: #555;
  color: white;
}
</style>
