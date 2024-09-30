<template>
  <div class="map" ref="map">
    <input
      id="map-lng"
      ref="lng"
      type="number"
      step="0.0001"
      style="display: none"
      v-on:mapLngChange="updateMap"
      :value="site.htmlElmnts[elKey][footKey].lng"
    />
    <input
      id="map-lat"
      ref="lat"
      type="number"
      step="0.0001"
      style="display: none"
      v-on:mapLatChange="updateMap"
      :value="site.htmlElmnts[elKey][footKey].lat"
    />
    <input
      id="map-zoom"
      ref="zoom"
      type="number"
      style="display: none"
      v-on:mapZoomChange="updateMap"
      :value="site.htmlElmnts[elKey][footKey].zoom"
    />
    <div id="map" :style="{ height: mapHeight + 'px', width: '100%' }"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],

  data() {
    return { mapHeight: 0, lng: -87.629799, lat: 41.878113, zoom: 11 };
  },

  methods: {
    updateMap(event) {
      this.site.htmlElmnts[this.elKey][this.footKey].lng = this.$refs.lng.value;
      this.site.htmlElmnts[this.elKey][this.footKey].lat = this.$refs.lat.value;
      this.site.htmlElmnts[this.elKey][this.footKey].zoom = this.$refs.zoom.value;
      markerGroup.clearLayers();
      L.marker(map.getCenter()).addTo(markerGroup);
      // L.marker([
      //   this.site.htmlElmnts[this.elKey][this.footKey].lat,
      //   this.site.htmlElmnts[this.elKey][this.footKey].lng,
      // ]).addTo(markerGroup);
    },
  },

  mounted() {
    setTimeout(() => {
      this.mapHeight = this.$refs.map.parentNode.getBoundingClientRect().height - 100;
    }, 1);
    setTimeout(() => {
      map = L.map('map').setView(
        [this.site.htmlElmnts[this.elKey][this.footKey].lat, this.site.htmlElmnts[this.elKey][this.footKey].lng],
        this.site.htmlElmnts[this.elKey][this.footKey].zoom
      );
      markerGroup = L.layerGroup().addTo(map);
      marker = L.marker([
        this.site.htmlElmnts[this.elKey][this.footKey].lat,
        this.site.htmlElmnts[this.elKey][this.footKey].lng,
      ]).addTo(markerGroup);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        // attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }).addTo(map);
      map.on('zoomend', function () {
        document.getElementById('map-zoom').value = map.getZoom();
        document.getElementById('map-zoom').dispatchEvent(new CustomEvent('mapZoomChange'));
      });

      map.on('moveend', function () {
        document.getElementById('map-lat').value = map.getCenter().lat;
        document.getElementById('map-lat').dispatchEvent(new CustomEvent('mapLatChange'));
        document.getElementById('map-lng').value = map.getCenter().lng;
        document.getElementById('map-lng').dispatchEvent(new CustomEvent('mapLngChange'));
      });
      document.getElementById('map').style.border = '1px solid #000000';
    }, 2);
  },
};
</script>

<style>
.map input[type='number'] {
  padding: 5px;
}
</style>
