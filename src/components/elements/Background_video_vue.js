export default {
  name: 'Background Video',

  template: /*html*/ `
    <div :class="elKey"></div>
  `,

  props: ['elKey', 'elValue', 'elIndex'],
};
