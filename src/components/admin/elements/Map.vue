<template>
  <div class="map" ref="map">
    <input
      id="map-lng"
      ref="lng"
      type="number"
      step="0.0001"
      style="display: none"
      v-on:mapLngChange="updatemap"
      :value="site.htmlElmnts[elKey].lng"
    />
    <input
      id="map-lat"
      ref="lat"
      type="number"
      step="0.0001"
      style="display: none"
      v-on:mapLatChange="updatemap"
      :value="site.htmlElmnts[elKey].lat"
    />
    <input
      id="map-zoom"
      ref="zoom"
      type="number"
      style="display: none"
      v-on:mapZoomChange="updatemap"
      :value="site.htmlElmnts[elKey].zoom"
    />
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Map',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {
    updatemap() {
      this.site.htmlElmnts[this.elKey].lng = this.$refs.lng.value;
      this.site.htmlElmnts[this.elKey].lat = this.$refs.lat.value;
      this.site.htmlElmnts[this.elKey].zoom = this.$refs.zoom.value;
      markerGroup.clearLayers();
      L.marker(map.getCenter()).addTo(markerGroup);
    },
  },

  mounted() {
    setTimeout(() => {
      map = L.map('map').setView(
        [this.site.htmlElmnts[this.elKey].lat, this.site.htmlElmnts[this.elKey].lng],
        this.site.htmlElmnts[this.elKey].zoom
      );
      markerGroup = L.layerGroup().addTo(map);
      marker = L.marker([this.site.htmlElmnts[this.elKey].lat, this.site.htmlElmnts[this.elKey].lng]).addTo(
        markerGroup
      );
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
    }, 1);
  },
  watch: {
    elValue() {
      markerGroup.clearLayers();
      map.setView(
        [this.site.htmlElmnts[this.elKey].lat, this.site.htmlElmnts[this.elKey].lng],
        this.site.htmlElmnts[this.elKey].zoom
      );
      markerGroup.clearLayers();
      L.marker(map.getCenter()).addTo(markerGroup);
    },
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
.map input[type='number'] {
  padding: 5px;
}
</style>
