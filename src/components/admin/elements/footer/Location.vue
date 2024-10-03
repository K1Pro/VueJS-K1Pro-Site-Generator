<template>
  <div class="location" ref="location">
    <input
      id="location-lng"
      ref="lng"
      type="number"
      step="0.0001"
      style="display: none"
      v-on:locationLngChange="updatelocation"
      :value="site.htmlElmnts[elKey][footKey].lng"
    />
    <input
      id="location-lat"
      ref="lat"
      type="number"
      step="0.0001"
      style="display: none"
      v-on:locationLatChange="updatelocation"
      :value="site.htmlElmnts[elKey][footKey].lat"
    />
    <input
      id="location-zoom"
      ref="zoom"
      type="number"
      style="display: none"
      v-on:locationZoomChange="updatelocation"
      :value="site.htmlElmnts[elKey][footKey].zoom"
    />
    <div id="map"></div>
  </div>
</template>

<script>
export default {
  name: 'Location',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],

  methods: {
    updatelocation() {
      this.site.htmlElmnts[this.elKey][this.footKey].lng = this.$refs.lng.value;
      this.site.htmlElmnts[this.elKey][this.footKey].lat = this.$refs.lat.value;
      this.site.htmlElmnts[this.elKey][this.footKey].zoom = this.$refs.zoom.value;
      markerGroup.clearLayers();
      L.marker(map.getCenter()).addTo(markerGroup);
    },
  },

  mounted() {
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
        document.getElementById('location-zoom').value = map.getZoom();
        document.getElementById('location-zoom').dispatchEvent(new CustomEvent('locationZoomChange'));
      });

      map.on('moveend', function () {
        document.getElementById('location-lat').value = map.getCenter().lat;
        document.getElementById('location-lat').dispatchEvent(new CustomEvent('locationLatChange'));
        document.getElementById('location-lng').value = map.getCenter().lng;
        document.getElementById('location-lng').dispatchEvent(new CustomEvent('locationLngChange'));
      });
      document.getElementById('map').style.border = '1px solid #000000';
    }, 1);
  },
  watch: {
    elValue() {
      markerGroup.clearLayers();
      map.setView(
        [this.site.htmlElmnts[this.elKey][this.footKey].lat, this.site.htmlElmnts[this.elKey][this.footKey].lng],
        this.site.htmlElmnts[this.elKey][this.footKey].zoom
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
.location input[type='number'] {
  padding: 5px;
}
</style>
