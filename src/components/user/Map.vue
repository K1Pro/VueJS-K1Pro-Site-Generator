<template>
  <div class="map">
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex'],

  mounted() {
    setTimeout(() => {
      map = L.map('map').setView(
        [this.site.htmlElmnts[this.elKey].lat, this.site.htmlElmnts[this.elKey].lng],
        this.site.htmlElmnts[this.elKey].zoom
      );
      marker = L.marker([this.site.htmlElmnts[this.elKey].lat, this.site.htmlElmnts[this.elKey].lng]).addTo(map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      document.getElementById('map').style.border = '1px solid #000000';
    }, 1);
  },
};
</script>

<style>
#map {
  position: relative;
  z-index: 1;
  height: 300px;
  width: 100%;
}
</style>
