<template>
  <div class="footer">
    <div
      class="footer-container"
      :style="[
        {
          gridTemplateColumns: gridTemplateLogOut,
        },
        style.primaryColor,
      ]"
    >
      <div class="footer-item0"></div>
      <template v-for="(siteFooterItem, siteFooterIndex) in site.htmlElmnts[elKey]['items']">
        <div
          v-if="siteFooterItem != 'none' && siteFooterItem != 'empty'"
          :class="'footer-item' + Number(siteFooterIndex + 1)"
        >
          <component
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

  inject: ['respWidth', 'site', 'style', 'wndw'],

  props: ['elKey', 'elValue', 'elIndex'],

  // data() {
  //   return { atBottom: null };
  // },

  computed: {
    gridTemplateLogOut() {
      let gridTemplateLogOutStyle;
      if (this.wndw.wdth > this.respWidth.md && this.wndw.wdth < this.respWidth.xl) {
        const footerItemsNoNoneArr = this.site.htmlElmnts[this.elKey]['items'].filter(
          (el) => el !== 'none' && el !== 'empty'
        );
        const inner = (100 / footerItemsNoNoneArr.length).toFixed(2);
        const autos = `${inner}% `.repeat(footerItemsNoNoneArr.length);
        gridTemplateLogOutStyle = '0% ' + autos + ' 0%';
      } else if (this.wndw.wdth > this.respWidth.xl) {
        const footerItemsNoNoneArr = this.site.htmlElmnts[this.elKey]['items'].filter(
          (el) => el !== 'none' && el !== 'empty'
        );
        const inner = (80 / footerItemsNoNoneArr.length).toFixed(2);
        const autos = `${inner}% `.repeat(footerItemsNoNoneArr.length);
        gridTemplateLogOutStyle = '10% ' + autos + ' 10%';
      } else {
        gridTemplateLogOutStyle = '100%';
      }
      return gridTemplateLogOutStyle;
    },
    // footer() {
    //   return this.atBottom !== null
    //     ? { position: this.atBottom ? 'relative' : 'fixed', bottom: this.atBottom ? false : '0' }
    //     : {};
    // },
  },
  // updated() {
  //   if (this.atBottom === null)
  //     this.atBottom = this.$refs.footer.getBoundingClientRect().bottom > this.wndw.hght ? true : false;
  // },
};
</script>

<style>
.footer {
  /* border-top: 1px solid rgba(0, 0, 0, 0.8); */
  position: relative;
  width: 100%;
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
  padding: 5px;
  margin-bottom: 10px;
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
  .footer-item6 {
    padding: 0px;
  }
}

@media only screen and (min-width: 1200px) {
  /* .footer-container {
    grid-template-columns: auto 15% 25% 25% 15% auto;
  } */

  .footer-item0,
  .footer-item1,
  .footer-item2,
  .footer-item3,
  .footer-item4,
  .footer-item5,
  .footer-item6 {
    padding: 10px 30px;
  }
}
</style>
