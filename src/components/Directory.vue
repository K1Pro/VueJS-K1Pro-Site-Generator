<template>
  <div class="directory">
    <div class="directory-title">
      <h2>K1Pro Website Directory</h2>
    </div>
    <div class="directory-search">
      <input
        type="search"
        id="site-search"
        name="search"
        placeholder="Search for a site..."
      />
    </div>
    <div
      class="directory-grid-container"
      :style="{
        gridTemplateColumns:
          site.scannedDirs.length < respvColAmnt
            ? directoryGridDynamicCol
            : directoryGridStaticCol,
      }"
    >
      <template v-for="(value, gridIndex) in site.scannedDirs">
        <div
          class="directory-grid-item"
          v-if="gridIndex === 0 || gridIndex % respvColAmnt === 0"
        ></div>
        <div
          class="directory-grid-item"
          v-if="gridIndex % respvColAmnt === 0 && gridIndex !== 0"
        ></div>
        <div
          class="directory-grid-item"
          :style="{
            border: '1px solid rgba(0, 0, 0, 0.8)',
            borderRadius: '5px',
            backgroundColor: 'lightgrey',
          }"
        >
          <a :href="value" target="_blank">
            <div style="height: 50%">
              <img
                :src="endPts.servrURL + 'public/' + value + '/logo/logo.png'"
                :alt="value"
                height="100%"
              />
            </div>
            <div style="position: relative; height: 50%; padding: 0">
              <div style="position: absolute; bottom: 0">
                {{ value.charAt(0).toUpperCase()
                }}{{ value.slice(1).replaceAll('-', ' ') }}
              </div>
            </div>
          </a>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Directory',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'windowWidth',
      'respWidth',
      'site',
      'endPts',
      'msg',
    ]),

    directoryGridDynamicCol() {
      const side = (99 - this.site.scannedDirs.length * 10) / 2;
      const autos = '9% '.repeat(this.site.scannedDirs.length);
      return side + '% ' + autos + side + '%';
    },
  },

  data() {
    return {
      respvColAmnt: '',
      directoryGridStaticCol: '',
    };
  },

  created() {
    if (this.site.isValid === false || this.site.isValid === null) {
      this.msg.snackBar = 'Invalid site';
    }
    this.respvColAmnt = this.windowWidth > this.respWidth ? 9 : 3;
    this.directoryGridStaticCol =
      this.windowWidth > this.respWidth
        ? '4.5% 9% 9% 9% 9% 9% 9% 9% 9% 9% 4.5%'
        : '3% 30% 30% 30% 3%';
  },

  watch: {
    windowWidth(newWindowWidth, oldWindowWidth) {
      this.respvColAmnt = this.windowWidth > this.respWidth ? 9 : 3;
      this.directoryGridStaticCol =
        this.windowWidth > this.respWidth
          ? '4.5% 9% 9% 9% 9% 9% 9% 9% 9% 9% 4.5%'
          : '3% 30% 30% 30% 3%';
    },
  },
};
</script>

<style>
.directory-title {
  padding-top: 2vh;
  text-align: center;
}

.directory-search {
  text-align: center;
}

.directory-grid-container {
  display: grid;
  column-gap: 1%;
  row-gap: 2%;
  padding-top: 5vh;
  padding-bottom: 5vh;
}

.directory-grid-item {
  padding: 10px;
  overflow: hidden;
  height: 15vh;
  font-size: 12px;
  text-align: center;
}

.directory input[type='search'] {
  width: 50vh;
  padding: 15px;
  border-radius: 25px;
}

@media only screen and (min-width: 650px) {
  .directory-title {
    padding-top: 20vh;
  }
}
</style>
