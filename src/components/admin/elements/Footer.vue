<template>
  <div class="footer" :style="[style.primaryColor.backgroundColor, style.outline.borderColor]">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="['padding']"></edit_menu>
    <span class="dim" :style="[style.primaryColor.outline.color]">{{ grid.wdth }} px * {{ grid.hght }} px</span>
    <div class="footer-cntnr" :style="[style.respPadding]">
      <template v-for="(component, componentIndex) in tempComponents">
        <div class="footer-item" :style="[style.outline.borderColor, divStyle]">
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
          <div class="footer-new-element" v-if="component == 'new_element'" :style="[style.outline.borderColor]"></div>
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

  inject: ['defaults', 'grid', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      slctdComponentIndex: null,
      slctdComponent: '',
      slctdTmpComponentType: {},
      tempComponents: JSON.parse(JSON.stringify(this.elValue.components)),
    };
  },

  computed: {
    divStyle() {
      return {
        padding: this.elValue.style.padding ? this.elValue.style.padding : '0px',
        width: 100 / this.elValue.components.length + '%',
      };
    },
  },

  methods: {
    addItem(componentIndex) {
      this.tempComponents.splice(componentIndex + 1, 0, 'new_element');
    },
    removeItem(componentIndex) {
      this.tempComponents.splice(componentIndex, 1);
      this.site.htmlElmnts[this.elKey].components = this.tempComponents;
    },
    slctComponentType(event, componentIndex) {
      this.slctdTmpComponentType[componentIndex] = event;
    },
    changeComponent(event, componentIndex) {
      let newElName;
      if (event.srcElement.selectedIndex === 0) {
        const compTp = this.slctdTmpComponentType[componentIndex];
        const CompNm = this.elKey + '_' + compTp + '_';
        let existingEls = [];
        Object.entries(this.site.htmlElmnts).forEach(([elKey, elVal], htmlElIndx) => {
          const existCompNm = elKey.slice(0, CompNm.length);
          if (elVal.type == compTp && existCompNm == CompNm && !elKey.slice(CompNm.length).replace(/[0-9]/g, ''))
            existingEls.push(Number(elKey.slice(CompNm.length)));
        });
        newElName =
          existingEls.length > 0
            ? this.elKey + '_' + compTp + '_' + (Math.max(...existingEls) + 1)
            : this.elKey + '_' + compTp + '_1';
        this.site.htmlElmnts[newElName] = JSON.parse(JSON.stringify(this.defaults.htmlElmnts[compTp]));
      } else {
        newElName = event.target.value;
      }
      this.slctdTmpComponentType[componentIndex] = null;
      this.tempComponents.splice(componentIndex, 1, newElName);
      this.site.htmlElmnts[this.elKey].components = this.tempComponents;
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
  height: 100%;
}
.footer-cntnr {
  display: flex;
  justify-content: space-evenly;
}
.footer-item {
  position: relative;
  overflow: hidden;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
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
  width: 50%;
  border-style: none;
  background: transparent;
}
.footer-select:focus {
  outline: none;
}
</style>
