<template>
  <div class="location">
    <h2>Location</h2>
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Location',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],

  mounted() {
    setTimeout(() => {
      map = L.map('map').setView(
        [this.site.htmlElmnts[this.elKey][this.footKey].lat, this.site.htmlElmnts[this.elKey][this.footKey].lng],
        this.site.htmlElmnts[this.elKey][this.footKey].zoom
      );
      marker = L.marker([
        this.site.htmlElmnts[this.elKey][this.footKey].lat,
        this.site.htmlElmnts[this.elKey][this.footKey].lng,
      ]).addTo(map);
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
