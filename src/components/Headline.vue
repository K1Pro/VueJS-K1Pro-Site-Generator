<template>
  <div
    :name="elValue.name"
    :class="elKey"
    :style="{
      backgroundColor: elValue.style.backgroundColor,
      fontSize: loggedIn ? '18px' : elValue.style.fontSize + 'px',
      height: elValue.style.height + 'px',
    }"
  >
    <template v-if="loggedIn === true">
      <input
        type="text"
        v-model="site.params.htmlElements[elIndex]['headline']['text']"
        :style="{
          width: '50%',
          backgroundColor: site.params.htmlElements[elIndex]['headline']['style']['backgroundColor'],
          color: site.params.htmlElements[elIndex]['headline']['style']['color'],
          fontSize: site.params.htmlElements[elIndex]['headline']['style']['fontSize'] + 'px',
          'margin-top': site.params.htmlElements[elIndex]['headline']['style']['height'] / 4 + 'px',
        }"
        style="border-style: dashed"
      />
      <!-- Modify element select and options -->
      &nbsp;
      <select name="menuChange" v-model="menuChange" @change="menuAction">
        <option value="" disabled selected>
          Modify {{ elKey.charAt(0).toUpperCase() }}{{ elKey.slice(1).toLowerCase().replaceAll('_', ' ') }}
        </option>
        <element_select :selectKey="elKey" :selectIndex="elIndex"></element_select>
        <!-- Custom select options here -->
      </select>
      &nbsp;
      <element_select_options
        :selectKey="elKey"
        :selectIndex="elIndex"
        :selectChange="menuChange"
      ></element_select_options>
      <!-- Modify element select and options -->
    </template>
    <template v-else
      ><span>{{ elValue.text }}</span></template
    >
  </div>
</template>

<script>
import Element_select from './login/Login_element_select.vue';
import Element_select_options from './login/Login_element_select_options.vue';

export default {
  name: 'Headline',

  components: { Element_select, Element_select_options },

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { menuChange: '' };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'site']),
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

  created() {},
};
</script>

<style>
.headline {
  position: relative;
  text-align: center;
  padding: 10px;
  /* background-color: rgb(174, 46, 142); */
  /* font-size: 30px; */
}
.headline span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.headline input[type='text'] {
  padding: 5px;
  text-align: center;
}

.headline select {
  padding: 5px;
}
</style>
