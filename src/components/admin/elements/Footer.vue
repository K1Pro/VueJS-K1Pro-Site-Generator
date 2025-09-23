<template>
  <div class="footer" :style="[style.outline.borderColor]">
    <div class="footer-cntnr" :style="[style.primaryColor.backgroundColor, style.respPadding]">
      <template v-for="(component, componentIndex) in elValue.components">
        <div class="footer-item" :style="{ width: 100 / elValue.components.length + '%' }">
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
</template>

<script>
export default {
  name: 'Footer',

  inject: ['endPts', 'grid', 'slctd', 'respWidth', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.footer {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
.footer-cntnr {
  display: flex;
  justify-content: space-evenly;
}
.footer-item {
}
</style>
