<template>
  <div class="container" :style="[style.primaryColor]">
    <div class="resp-padding">
      <div class="container-cntnr" :style="[div1Style]">
        <template v-for="(component, componentIndex) in elValue.components">
          <div class="container-item" :style="[div2Style]">
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
  name: 'Container',

  inject: ['respWidth', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  computed: {
    div1Style() {
      return {
        flexDirection: this.wndw.wdth < this.respWidth.md && this.elValue.mobile ? 'column' : 'row',
      };
    },
    div2Style() {
      return {
        padding: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        width:
          this.wndw.wdth < this.respWidth.md && this.elValue.mobile
            ? '100%'
            : 100 / this.elValue.components.length + '%',
      };
    },
  },
};
</script>

<style>
.container {
  position: relative;
  width: 100%;
}
.container-cntnr {
  display: flex;
  justify-content: space-evenly;
}
</style>
