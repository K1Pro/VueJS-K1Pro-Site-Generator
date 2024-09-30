<template>
  <div class="map" ref="map">
    <h2>Location</h2>
    <div id="map" :style="{ height: mapHeight + 'px', width: '100%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',

  data() {
    return { mapHeight: 0 };
  },

  mounted() {
    setTimeout(() => {
      this.mapHeight = this.$refs.map.parentNode.getBoundingClientRect().height - 100;
    }, 1);
    setTimeout(() => {
      const map = L.map('map').setView([41.80212, -88.06935], 16);
      const marker = L.marker([41.80212, -88.06935]).addTo(map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      document.getElementById('map').style.border = '1px solid #000000';
    }, 2);
  },
};
</script>

<style>
.map {
}
</style>
