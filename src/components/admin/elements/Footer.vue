<template>
  <div :id="elKey" class="footer" :style="[style.outline.borderColor]">
    <div class="footer-cntnr" :style="[style.primaryColor.backgroundColor, style.respPadding]">
      <template v-for="(siteFooterItem, siteFooterIndex) in elValue.components">
        <div
          v-if="siteFooterItem != 'none'"
          :class="'footer-item' + Number(siteFooterIndex + 1)"
          :style="{ width: 100 / elValue.components.length + '%' }"
        >
          <select
            :value="elValue.components[siteFooterIndex]"
            @focusin="tempFootComponents = JSON.stringify(elValue.components)"
            @change="changeFootItem($event, siteFooterIndex)"
          >
            <option value="empty" selected disabled>Select</option>
            <option v-for="footItem in footComponents" :value="footItem">
              {{ footItem.charAt(0).toUpperCase() + footItem.slice(1).replaceAll('_', ' ') }}
            </option>
            <option disabled></option>
            <option
              v-if="siteFooterIndex == activeFootComponents.length - 1 && activeFootComponents.length < 5"
              value="add"
            >
              Add
            </option>
            <option v-if="activeFootComponents.length > 1" value="remove">Remove</option>
          </select>
          <component
            v-if="siteFooterItem != 'empty'"
            :is="siteFooterItem"
            :elKey="elKey"
            :elValue="elValue"
            :elIndex="elIndex"
            :footKey="siteFooterItem"
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

  data() {
    return { tempFootComponents: null, footComponents: ['about', 'contact', 'description', 'links', 'location'] };
  },

  computed: {
    activeFootComponents() {
      return this.site.htmlElmnts[this.elKey].components.filter((item) => {
        return item != 'none';
      });
    },
    gridTemplateLogOut() {
      let gridTemplateLogOutStyle;
      if (this.grid.wdth > this.respWidth.md && this.grid.wdth < this.respWidth.xl) {
        const footerComponentsNoNoneArr = this.site.htmlElmnts[this.elKey]['components'].filter((el) => el !== 'none');
        const inner = (100 / footerComponentsNoNoneArr.length).toFixed(2);
        const autos = `${inner}% `.repeat(footerComponentsNoNoneArr.length);
        gridTemplateLogOutStyle = '0% ' + autos + ' 0%';
      } else if (this.grid.wdth > this.respWidth.xl) {
        const footerComponentsNoNoneArr = this.site.htmlElmnts[this.elKey]['components'].filter((el) => el !== 'none');
        const inner = (80 / footerComponentsNoNoneArr.length).toFixed(2);
        const autos = `${inner}% `.repeat(footerComponentsNoNoneArr.length);
        gridTemplateLogOutStyle = '10% ' + autos + ' 10%';
      } else {
        gridTemplateLogOutStyle = '100%';
      }
      return gridTemplateLogOutStyle;
    },
  },

  methods: {
    changeFootItem(event, siteFooterIndex) {
      if (event.target.value == 'add') {
        this.site.htmlElmnts[this.elKey].components[siteFooterIndex + 1] = 'empty';
      } else if (event.target.value == 'remove') {
        this.site.htmlElmnts[this.elKey].components.splice(siteFooterIndex, 1);
        this.site.htmlElmnts[this.elKey].components.push('none');
      } else {
        if (JSON.parse(this.tempFootComponents).includes(event.target.value)) {
          const existingFootItemIndx = JSON.parse(this.tempFootComponents).findIndex((el) => el == event.target.value);
          this.site.htmlElmnts[this.elKey].components[existingFootItemIndx] = 'empty';
        }
        this.site.htmlElmnts[this.elKey].components[siteFooterIndex] = event.target.value;
      }
    },
  },
  created() {
    if (this.site.htmlElmnts[this.elKey].components.includes('empty')) {
      this.site.htmlElmnts[this.elKey].components.forEach((item, index) => {
        if (item == 'empty') this.site.htmlElmnts[this.elKey].components[index] = 'none';
      });
    }
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
.footer-cntnr {
  display: flex;
  justify-content: space-evenly;
}
.footer-item0,
.footer-item1,
.footer-item2,
.footer-item3,
.footer-item4,
.footer-item5,
.footer-item6 {
  padding: 10px 30px;
  text-align: left;
  /* word-wrap: break-word; */
  /* background-color: rgba(255, 255, 255, 0.8); */
  /* border: 1px solid rgba(0, 0, 0, 0.8); */
  /* font-size: 30px; */
}

.footer-item0 h2,
.footer-item1 h2,
.footer-item2 h2,
.footer-item3 h2,
.footer-item4 h2,
.footer-item5 h2,
.footer-item6 h2 {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: clip;
}

.footer select {
  width: 100%;
  padding: 5px 5px 5px 0px;
  resize: vertical;
  background-color: #00000000;
  border: none;
  font-size: 1.5em;
  font-weight: bold;
}

@media only screen and (min-width: 650px) {
  /* .footer-cntnr {
    grid-template-columns: 0% 20% 25% 35% 20% 0%;
  } */

  .footer-item0,
  .footer-item6 {
    padding: 0px;
  }
}

@media only screen and (min-width: 1200px) {
  /* .footer-cntnr {
    grid-template-columns: auto 15% 25% 25% 15% auto;
  } */
  /* 
  .footer-item0,
  .footer-item1,
  .footer-item2,
  .footer-item3,
  .footer-item4,
  .footer-item5,
  .footer-item6{
    padding: 0px;
    padding: 10px 30px;
  } */
}
</style>
