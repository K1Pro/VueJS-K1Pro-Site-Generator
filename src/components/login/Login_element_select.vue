<template>
  <span class="element-change">
    &nbsp;
    <select name="menuChange" v-model="menuChange" @change="menuAction">
      <option value="" disabled selected>Modify</option>
      <option
        v-for="menuOptions in Object.keys(site.params.htmlElements[selectIndex]['headline']['style'])"
        :value="menuOptions"
      >
        {{ menuOptions.charAt(0).toUpperCase()
        }}{{
          menuOptions
            .slice(1)
            .replaceAll('-', ' ')
            .replace(/([A-Z])/g, ' $1')
            .trim()
        }}
      </option></select
    >&nbsp;
    <template v-if="menuChange.toLowerCase().includes('color')">
      <input
        type="color"
        :name="'top_menu' + menuChange"
        v-model="site.params.htmlElements[selectIndex][selectKey]['style'][menuChange]"
    /></template>
    <template v-if="menuChange == 'height'">
      <input
        type="range"
        min="50"
        max="150"
        :name="'top_menu' + menuChange"
        v-model="site.params.htmlElements[selectIndex][selectKey]['style'][menuChange]"
      />{{ site.params.htmlElements[selectIndex][selectKey]['style'][menuChange] }}
    </template>
    <template v-if="menuChange == 'opacity'">
      <input
        type="range"
        min="0"
        max="100"
        :name="'top_menu' + menuChange"
        :value="
          site.params.htmlElements[selectIndex][selectKey]['style']['opacity'] == ''
            ? 100
            : site.params.htmlElements[selectIndex][selectKey]['style']['opacity']
        "
        @input="changeMenuOpacity"
      />{{ site.params.htmlElements[selectIndex][selectKey]['style'][menuChange] }}
    </template>
    <template v-if="menuChange == 'alignment'">
      <input type="radio" name="menu-alignment" value="left" checked @click="changeMenuAlignment" /><label for="left"
        >Left</label
      >
      <input type="radio" name="menu-alignment" value="right" @click="changeMenuAlignment" /><label for="right"
        >Right</label
      >
    </template>
  </span>
</template>

<script>
export default {
  name: 'Element Select',

  props: ['selectKey', 'selectIndex'],

  data() {
    return { menuChange: '' };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['message', 'site']),
  },

  methods: {
    menuAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
      //     if (event.srcElement.selectedOptions[0].value == 'addItem') {
      //     if (this.site.params.htmlElements[this.selectIndex]['top-menu']['menu-items'].length < 10) {
      //       this.site.params.htmlElements[this.selectIndex]['top-menu']['menu-items'].push('');
      //       this.menuChange = '';
      //     } else {
      //       this.menuChange = '';
      //       this.message = 'Maximum 10 menu items';
      //     }
      //   }
    },
  },

  created() {
    console.log('we are in: ' + this.selectKey);
    // console.log(this.selectIndex);
    // console.log(this.site.params.htmlElements[this.selectIndex]['headline']['style']);
    // Object.keys(this.site.params.htmlElements[this.selectIndex]['headline']['style']).forEach((key) => {
    //   console.log(key);
    // });
  },
};
</script>

<style>
.element-change select {
  padding: 5px;
}
</style>
