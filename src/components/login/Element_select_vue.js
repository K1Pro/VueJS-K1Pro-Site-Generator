export default {
  name: 'Element Select',

  template: /*html*/ `
    <option
      v-for="menuOptions in Object.keys(site.params.htmlElements[selectIndex][selectKey]['style'])"
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
    </option>
  `,

  props: ['selectKey', 'selectIndex'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },
};
