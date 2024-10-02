<template>
  <div class="map" ref="map">
    <h2>Location</h2>
    <div id="map" :style="{ position: 'relative', zIndex: 1, height: mapHeight + 'px', width: '100%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',

  inject: ['respWidth', 'site', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],

  data() {
    return { mapHeight: 0 };
  },

  // computed: {
  //   mapHeight() {
  //     return this.wndw.wdth > this.respWidth.md ? this.$refs.map.parentNode.getBoundingClientRect().height - 100 : 300;
  //   },
  // },

  mounted() {
    setTimeout(() => {
      this.mapHeight =
        this.wndw.wdth > this.respWidth.md ? this.$refs.map.parentNode.getBoundingClientRect().height - 100 : 300;
    }, 1);
    setTimeout(() => {
      const map = L.map('map').setView(
        [this.site.htmlElmnts[this.elKey][this.footKey].lat, this.site.htmlElmnts[this.elKey][this.footKey].lng],
        this.site.htmlElmnts[this.elKey][this.footKey].zoom
      );
      const marker = L.marker([
        this.site.htmlElmnts[this.elKey][this.footKey].lat,
        this.site.htmlElmnts[this.elKey][this.footKey].lng,
      ]).addTo(map);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      document.getElementById('map').style.border = '1px solid #000000';
    }, 2);
  },

  watch: {
    'wndw.wdth'(newWindowWidth, oldWindowWidth) {
      if (newWindowWidth > this.respWidth.md && oldWindowWidth < this.respWidth.md) {
        this.mapHeight = this.$refs.map.parentNode.getBoundingClientRect().height - 100;
      } else if (newWindowWidth < this.respWidth.md && oldWindowWidth > this.respWidth.md) {
        this.mapHeight = 300;
      } else if (newWindowWidth > this.respWidth.md) {
        const newWidth = JSON.stringify(this.$refs.map.parentNode.getBoundingClientRect().height - 100);
        this.mapHeight = 0;
        this.mapHeight = newWidth;
      }
    },
  },
};
</script>

<style>
.map {
}
</style>
