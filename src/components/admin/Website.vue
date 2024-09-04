<template>
  <div class="website">
    <button type="button" @click="patchSite" style="width: calc(50% - 10px)">Update</button>
    <button type="button" @click="getSite" style="width: calc(50%); margin-left: 10px">Reset</button>
    <hr />
    <element_order></element_order>
    <hr />
    <select style="width: 100%" v-model="pageStyle">
      <option disabled selected value="">Website settings</option>
      <option v-for="style in Object.keys(site.body.style).sort()" :value="style">
        {{
          style
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()
            .trim()
        }}
      </option>
    </select>
    <p v-if="pageStyle.toLowerCase().includes('color')">
      <input type="color" v-model="site.body.style[pageStyle]" @input="changeColor($event.target.value, pageStyle)" />
    </p>
    <p v-else-if="pageStyle.toLowerCase().includes('opacity') || pageStyle.toLowerCase().includes('margin')">
      <input type="range" v-model="site.body.style[pageStyle]" />{{ site.body.style[pageStyle] }}%
    </p>
    <p v-else-if="pageStyle != ''"><select v-model="site.body.style[pageStyle]"></select></p>
  </div>
</template>

<script>
export default {
  name: 'Web site',

  inject: ['getSite', 'patchSite', 'site'],

  data() {
    return { pageMedia: 'logo', pageStyle: '' };
  },
  methods: {
    changeColor(event, pageStyle) {
      const appGridItem2 = document.getElementById('app-grid-item2');
      if (pageStyle == 'textColor') {
        const allElmnts = [
          ...Array.from(appGridItem2.getElementsByTagName('input')),
          ...Array.from(appGridItem2.getElementsByTagName('select')),
          ...Array.from(appGridItem2.getElementsByTagName('i')),
          ...Array.from(appGridItem2.getElementsByTagName('textarea')),
        ];
        allElmnts.forEach((el) => {
          el.style.color = event;
        });
      } else if (pageStyle == 'primaryColor') {
        const primaryColorElmnts = [...Array.from(appGridItem2.getElementsByClassName('primary-color'))];
        primaryColorElmnts.forEach((el) => {
          el.style.backgroundColor = event;
        });
      }
    },
  },
};
</script>

<style>
.website select {
  /* margin: 7px 8px 7px 0px; */
  /* margin-left: -5px; */
  padding: 0px;
  font-size: 16px;
}
.website select:focus {
  outline: none;
}
.website p input {
  width: 100%;
}
.website p input[type='range'] {
  width: calc(100% - 50px);
}
</style>
