import Element_order from './Element_order_vue.js';

export default {
  name: 'Background Settings',

  template: /*html*/ `
    <div class="body-background">
      <select name="page-media" style="border: none" v-model="pageMedia">
        <option value="logo">Logo:</option>
        <option value="icon">Icon:</option>
      </select>
      <input type="file" />
      <hr />
      <select name="page-style" style="border: none" v-model="pageStyle">
        <option value="backgroundColor">Background Color:</option>
        <option value="textColor">Text Color:</option>
      </select>
      <input type="color" v-model="site.params.body.style[pageStyle]" />
      <hr />
      Font:
      <select name="Font" style="border: none">
        <option value="Arial">Arial</option>
        <option value="Courier">Courier</option>
        <option value="Times New Roman">Times New Roman</option>
      </select>
      <hr />
      <div>Order:</div>
      <element_order></element_order>
    </div>
  `,

  components: { Element_order },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['isValid', 'site']),
  },

  data() {
    return { pageMedia: 'logo', pageStyle: 'backgroundColor' };
  },

  methods: {},

  created() {
    this.isValid = 'true';
  },

  mounted() {
    style(
      'Background-Settings',
      /*css*/ `
      .body-background select {
        /* margin: 7px 8px 7px 0px; */
        padding: 0px;
        font-size: 16px;
      }
      .body-background select:focus {
        outline: none;
      }
      `
    );
  },
};
