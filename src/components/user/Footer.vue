<template>
  <div class="footer" :style="[style.primaryColor]">
    <div class="resp-padding">
      <div class="footer-cntnr">
        <template v-for="(component, componentIndex) in elValue.components">
          <div class="footer-item" :style="[divStyle]">
            <component
              :is="site.htmlElmnts[component].type"
              :elKey="component"
              :elValue="site.htmlElmnts[component]"
              :elIndex="Number(elIndex + '.' + (componentIndex + 1))"
            ></component>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',

  inject: ['site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    divStyle() {
      return {
        padding: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        width: 100 / this.elValue.components.length + '%',
      };
    },
  },
};
</script>

<style>
.footer {
  position: relative;
  width: 100%;
}
.footer-cntnr {
  display: flex;
  justify-content: space-evenly;
}
</style>
