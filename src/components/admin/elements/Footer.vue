<template>
  <div
    :id="'site_page_el_' + elIndex"
    class="footer"
    :style="[style.primaryColor.backgroundColor, style.outline.borderColor]"
  >
    <div class="footer-cntnr" :style="[style.respPadding]">
      <template v-for="(component, componentIndex) in elValue.components">
        <div class="footer-item" :style="{ width: 100 / elValue.components.length + '%' }">
          <button class="footer-add-rem" style="right: 0px; z-index: 0">
            <i class="fa-solid fa-chevron-down"></i>
          </button>
          <select
            v-if="slctdTmpComponentType[componentIndex] === null"
            class="footer-select"
            :value="slctdComponentIndex === componentIndex ? slctdComponent : ''"
            :style="{ height: slctdComponentIndex === componentIndex ? '1px' : '15px' }"
            @change="slctComponentType($event.target.value, componentIndex)"
          >
            <option disabled selected>Add element</option>
            <option v-for="footerComponent in defaults.htmlElmnts[elKey].info.components" :value="footerComponent">
              {{ footerComponent.replaceAll('_', ' ') }}
            </option>
          </select>
          <select
            v-else
            class="footer-select"
            :value="slctdComponentIndex === componentIndex ? slctdComponent : ''"
            :style="{ height: slctdComponentIndex === componentIndex ? '1px' : '15px' }"
            @change="changeComponent($event, componentIndex)"
            @focusout="slctdTmpComponentType[componentIndex] = null"
          >
            <option>new {{ slctdTmpComponentType[componentIndex] }}</option>
            <option
              v-for="[htmlElmntKey, htmlElmntVal] in Object.entries(site.htmlElmnts)
                .filter(([elKey, elVal]) => {
                  return elVal.type == slctdTmpComponentType[componentIndex];
                })
                .sort()"
              :value="htmlElmntKey"
            >
              {{ htmlElmntKey.replaceAll('_', ' ') }}
            </option>
          </select>
          <button
            class="footer-add-rem"
            :style="{ right: elValue.components.length > 1 ? '30px' : '15px' }"
            @click="addItem(componentIndex)"
          >
            <i class="fa-solid fa-plus"></i>
          </button>
          <button
            class="footer-add-rem"
            v-if="elValue.components.length > 1"
            style="right: 15px"
            @click="removeItem(componentIndex)"
          >
            <i class="fa-solid fa-minus"></i>
          </button>
          <div class="footer-new-element" v-if="component == 'new_element'" :style="[style.outline.borderColor]">
            test
          </div>
          <component
            v-else
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

  inject: ['defaults', 'endPts', 'grid', 'pageElTypes', 'respWidth', 'slctd', 'site', 'siteElmnts', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      slctdComponentIndex: null,
      slctdComponent: '',
      slctdTmpComponentType: {},
    };
  },

  methods: {
    addItem(componentIndex) {
      this.site.htmlElmnts[this.elKey].components.splice(componentIndex + 1, 0, 'new_element');
    },
    removeItem(componentIndex) {
      this.site.htmlElmnts[this.elKey].components.splice(componentIndex, 1);
    },
    slctComponentType(event, componentIndex) {
      this.slctdTmpComponentType[componentIndex] = event;
    },
    changeComponent(event, componentIndex) {
      let newElName;
      if (event.srcElement.selectedIndex === 0) {
        newElName = this.slctdTmpComponentType[componentIndex] + '_' + new Date().getTime();
        this.site.htmlElmnts[newElName] = JSON.parse(
          JSON.stringify(this.defaults.htmlElmnts[this.slctdTmpComponentType[componentIndex]])
        );
      } else {
        newElName = event.target.value;
      }
      this.slctdTmpComponentType[componentIndex] = null;
      this.site.htmlElmnts[this.elKey].components.splice(componentIndex, 1, newElName);
    },
  },
  mounted() {
    this.elValue.components.forEach((component, componentIndex) => {
      this.slctdTmpComponentType[componentIndex] = null;
    });
  },
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
.footer-new-element {
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
  height: 100%;
}
.footer-cntnr {
  display: flex;
  justify-content: space-evenly;
}
.footer-item {
  position: relative;
  overflow: hidden;
}
.footer-add-rem {
  position: absolute;
  z-index: 8;
  top: 0;
  width: 15px;
  height: 15px;
}
.footer-add-rem i {
  position: absolute;
  top: 2px;
  left: 3px;
  font-size: 8px;
}
.footer-select {
  position: absolute;
  z-index: 7;
  top: 0;
  appearance: none;
  right: 0px;
  width: 100%;
  border-style: none;
  background: transparent;
}
.footer-select:focus {
  outline: none;
}
</style>
