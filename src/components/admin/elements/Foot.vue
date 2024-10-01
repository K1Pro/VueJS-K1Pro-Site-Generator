<template>
  <div :id="elKey" class="footer" :style="[style.outline.borderColor]">
    <div
      class="footer-container"
      :style="[
        {
          gridTemplateColumns: gridTemplateLogOut,
        },
        style.primaryColor.backgroundColor,
      ]"
    >
      <div class="footer-item0"></div>
      <template v-for="(siteFooterItem, siteFooterIndex) in site.htmlElmnts[elKey].items">
        <div v-if="siteFooterItem != 'none'" :class="'footer-item' + Number(siteFooterIndex + 1)">
          <select
            :value="site.htmlElmnts[elKey].items[siteFooterIndex]"
            @focusin="tempFootItems = JSON.stringify(site.htmlElmnts[elKey].items)"
            @change="changeFootItem($event, siteFooterIndex)"
          >
            <option value="empty" selected disabled>Select</option>
            <option v-for="footItem in footItems" :value="footItem">
              {{ footItem.charAt(0).toUpperCase() + footItem.slice(1).replaceAll('_', ' ') }}
            </option>
            <option disabled></option>
            <option v-if="siteFooterIndex == activeFootItems.length - 1 && activeFootItems.length < 5" value="add">
              Add
            </option>
            <option v-if="activeFootItems.length > 1" value="remove">Remove</option>
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
      <div :class="'footer-item' + Number(site.htmlElmnts[elKey]['items'].length + 1)"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Footer',

  inject: ['content', 'endPts', 'grid', 'page', 'respWidth', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { tempFootItems: null, footItems: ['about', 'contact', 'description', 'links', 'map'] };
  },

  computed: {
    activeFootItems() {
      return this.site.htmlElmnts[this.elKey].items.filter((item) => {
        return item != 'none';
      });
    },
    gridTemplateLogOut() {
      let gridTemplateLogOutStyle;
      if (this.grid.wdth > this.respWidth.md && this.grid.wdth < this.respWidth.xl) {
        const footerItemsNoNoneArr = this.site.htmlElmnts[this.elKey]['items'].filter((el) => el !== 'none');
        const inner = (100 / footerItemsNoNoneArr.length).toFixed(2);
        const autos = `${inner}% `.repeat(footerItemsNoNoneArr.length);
        gridTemplateLogOutStyle = '0% ' + autos + ' 0%';
      } else if (this.grid.wdth > this.respWidth.xl) {
        const footerItemsNoNoneArr = this.site.htmlElmnts[this.elKey]['items'].filter((el) => el !== 'none');
        const inner = (80 / footerItemsNoNoneArr.length).toFixed(2);
        const autos = `${inner}% `.repeat(footerItemsNoNoneArr.length);
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
        this.site.htmlElmnts[this.elKey].items[siteFooterIndex + 1] = 'empty';
      } else if (event.target.value == 'remove') {
        this.site.htmlElmnts[this.elKey].items.splice(siteFooterIndex, 1);
        this.site.htmlElmnts[this.elKey].items.push('none');
      } else {
        if (JSON.parse(this.tempFootItems).includes(event.target.value)) {
          const existingFootItemIndx = JSON.parse(this.tempFootItems).findIndex((el) => el == event.target.value);
          this.site.htmlElmnts[this.elKey].items[existingFootItemIndx] = 'empty';
        }
        this.site.htmlElmnts[this.elKey].items[siteFooterIndex] = event.target.value;
      }
    },
  },
  created() {
    if (this.site.htmlElmnts[this.elKey].items.includes('empty')) {
      this.site.htmlElmnts[this.elKey].items.forEach((item, index) => {
        if (item == 'empty') this.site.htmlElmnts[this.elKey].items[index] = 'none';
      });
    }
  },
};
</script>

<style>
.footer {
  /* border-top: 1px solid rgba(0, 0, 0, 0.8); */
  position: relative;
  width: 100%;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
  /* text-align: left;
    padding: 0vw 3vw;
    background-color: grey;
    color: white; */
}

.footer-container {
  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: auto;
  /* background-color: grey; */
  /* padding: 10px; */
}

.footer-item0,
.footer-item1,
.footer-item2,
.footer-item3,
.footer-item4,
.footer-item5,
.footer-item6,
.footer-item7 {
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
.footer-item6 h2,
.footer-item7 h2 {
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
  /* .footer-container {
    grid-template-columns: 0% 20% 25% 35% 20% 0%;
  } */

  .footer-item0,
  .footer-item7 {
    padding: 0px;
  }
}

@media only screen and (min-width: 1200px) {
  /* .footer-container {
    grid-template-columns: auto 15% 25% 25% 15% auto;
  } */
  /* 
  .footer-item0,
  .footer-item1,
  .footer-item2,
  .footer-item3,
  .footer-item4,
  .footer-item5,
  .footer-item6,
  .footer-item7 {
    padding: 0px;
    padding: 10px 30px;
  } */
}
</style>
