<template>
  <div :id="elKey" class="text-box">
    <edit_menu :elKey="elKey" :options="['align', 'grid-template-columns', 'height']"></edit_menu>

    <div class="text-box-opts" :style="textBoxStyle" style="grid-template-rows: 22px">
      <template v-for="column in site.htmlElmnts[elKey].style.gridTemplateColumns">
        <div>
          <button title="text" @click="boxTxt(column)"><i class="fa-solid fa-font"></i></button>
          <button title="image" @click="boxImg(column)"><i class="fa-regular fa-image"></i></button>
        </div>
      </template>
    </div>

    <div class="text-box-items" :style="textBoxStyle">
      <template v-for="column in site.htmlElmnts[elKey].style.gridTemplateColumns">
        <div
          v-if="site.htmlElmnts[elKey]?.['box' + column]?.hasOwnProperty('txt')"
          spellcheck="false"
          contenteditable="true"
          class="text-box-txt-item"
          v-html="site.htmlElmnts[elKey]?.['box' + column]?.txt"
          @focusin="focusinTxtBox(column)"
          @focusout="focusoutTxtBox($event, column)"
        ></div>
        <template v-else-if="site.htmlElmnts[elKey]?.['box' + column]?.hasOwnProperty('img')">
          <img
            v-if="site.htmlElmnts[elKey]?.['box' + column].img"
            class="text-box-img-item"
            :src="site.htmlElmnts[elKey]?.['box' + column].img"
            @drop.prevent="drop(column)"
            @dragover.prevent
            @dragenter.prevent
          />
          <div
            v-else
            style="background-color: white"
            @drop.prevent="drop(column)"
            @dragover.prevent
            @dragenter.prevent
          ></div>
        </template>

        <div
          v-else
          spellcheck="false"
          contenteditable="true"
          class="text-box-txt-item"
          v-html="site.htmlElmnts[elKey]?.['box' + column]?.txt"
          @focusin="focusinTxtBox(column)"
          @focusout="focusoutTxtBox($event, column)"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {
    focusinTxtBox(column) {
      if (!this.site.htmlElmnts[this.elKey]['box' + column])
        this.site.htmlElmnts[this.elKey]['box' + column] = { txt: '' };
    },
    focusoutTxtBox(event, column) {
      this.site.htmlElmnts[this.elKey]['box' + column].txt = event.target.innerHTML;
    },
    boxTxt(column) {
      if (this.site.htmlElmnts[this.elKey]['box' + column]?.img)
        delete this.site.htmlElmnts[this.elKey]['box' + column].img;
      if (!this.site.htmlElmnts[this.elKey]?.['box' + column]?.txt)
        this.site.htmlElmnts[this.elKey]['box' + column] = { txt: '' };
    },
    boxImg(column) {
      if (this.site.htmlElmnts[this.elKey]['box' + column]?.txt)
        delete this.site.htmlElmnts[this.elKey]['box' + column].txt;
      if (!this.site.htmlElmnts[this.elKey]?.['box' + column]?.img)
        this.site.htmlElmnts[this.elKey]['box' + column] = { img: '' };
    },
    drop(column) {
      this.site.htmlElmnts[this.elKey]['box' + column].img = event.dataTransfer.getData('text');
    },
  },

  computed: {
    textBoxStyle() {
      if (!this.site.htmlElmnts[this.elKey].style.gridTemplateColumns)
        this.site.htmlElmnts[this.elKey].style = { gridTemplateColumns: 2 };
      if (!this.site.htmlElmnts[this.elKey].style.alignment)
        this.site.htmlElmnts[this.elKey].style.alignment = 'center';
      if (!this.site.htmlElmnts[this.elKey].style.height) this.site.htmlElmnts[this.elKey].style.height = 10;
      const gridTemplateColumns =
        this.site.htmlElmnts[this.elKey].style.alignment == 'left'
          ? '30% repeat(' +
            (this.site.htmlElmnts[this.elKey].style.gridTemplateColumns - 1) +
            ', ' +
            70 / (this.site.htmlElmnts[this.elKey].style.gridTemplateColumns - 1) +
            '%)'
          : this.site.htmlElmnts[this.elKey].style.alignment == 'center'
          ? 'repeat(' +
            this.site.htmlElmnts[this.elKey].style.gridTemplateColumns +
            ', ' +
            100 / this.site.htmlElmnts[this.elKey].style.gridTemplateColumns +
            '%)'
          : 'repeat(' +
            (this.site.htmlElmnts[this.elKey].style.gridTemplateColumns - 1) +
            ', ' +
            70 / (this.site.htmlElmnts[this.elKey].style.gridTemplateColumns - 1) +
            '%) 30%';
      return {
        'grid-template-rows': this.site.htmlElmnts[this.elKey].style.height + 'vh',
        'grid-template-columns': gridTemplateColumns,
      };
    },
  },
};
</script>

<style>
.text-box {
  position: relative;
}
.text-box-opts {
  display: grid;
  padding: 0px 10%;
}
.text-box-items {
  display: grid;
  padding: 0px 10%;
}
.text-box-txt-item {
  overflow: auto;
  border: 1px dashed black;
  padding: 10px;
}
.text-box-img-item {
  padding: 10px;
  border: 1px dashed black;
  height: 100%;
  width: 100%;
}
</style>
