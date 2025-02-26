<template>
  <div :id="elKey" class="text-box">
    <edit_menu :elKey="elKey" :elIndex="elIndex" :options="['height', 'align', 'anchor']"></edit_menu>

    <div class="text-box-opts" :style="textBoxStyle" style="grid-template-rows: 22px">
      <template v-for="(box, boxIndx) in elValue.boxes">
        <div>
          <button title="text" v-if="box.img" @click="boxTxt(boxIndx)"><i class="fa-solid fa-font"></i></button>
          <button title="image" v-if="box.txt || box.txt == ''" @click="boxImg(boxIndx)">
            <i class="fa-regular fa-image"></i>
          </button>
          <button title="add" @click="addBox(boxIndx)"><i class="fa-solid fa-plus"></i></button>
          <button title="delete" v-if="elValue.boxes.length > 1" @click="deleteBox(boxIndx)">
            <i class="fa-solid fa-minus"></i>
          </button>
        </div>
      </template>
    </div>
    <div class="text-box-items" :style="textBoxStyle">
      <template v-for="(box, boxIndx) in elValue.boxes">
        <template v-if="box.img || box.img == ''">
          <img
            v-if="box.img != ''"
            class="text-box-img-item"
            :style="{ height: elValue.style.height * 0.75 + 'vh' }"
            :src="box.img"
            @drop.prevent="drop(boxIndx)"
            @dragover.prevent
            @dragenter.prevent
          />
          <div
            v-else
            style="background-color: white"
            @drop.prevent="drop(boxIndx)"
            @dragover.prevent
            @dragenter.prevent
          ></div>
        </template>
        <div
          v-else
          spellcheck="false"
          contenteditable="true"
          class="text-box-txt-item"
          v-html="box.txt"
          @focusin="focusinTxtBox(boxIndx)"
          @focusout="focusoutTxtBox($event, boxIndx)"
        ></div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Text box',

  inject: ['grid', 'respWidth', 'site', 'style'],

  props: ['elKey', 'elValue', 'elIndex'],

  methods: {
    focusinTxtBox(boxIndx) {
      if (!this.elValue.boxes[boxIndx]) this.site.htmlElmnts[this.elKey].boxes[boxIndx] = { txt: '' };
    },
    focusoutTxtBox(event, boxIndx) {
      this.site.htmlElmnts[this.elKey].boxes[boxIndx].txt = event.target.innerHTML;
    },
    boxTxt(boxIndx) {
      if (!this.elValue.boxes?.[boxIndx]?.txt) this.site.htmlElmnts[this.elKey].boxes[boxIndx] = { txt: '' };
      if (this.elValue.boxes?.[boxIndx]?.img) delete this.site.htmlElmnts[this.elKey].boxes[boxIndx].img;
    },
    boxImg(boxIndx) {
      if (!this.elValue.boxes?.[boxIndx]?.img)
        this.site.htmlElmnts[this.elKey].boxes[boxIndx] = {
          img: 'https://api-site.k1pro.net/public/default/logo/missingimage.png',
        };
      if (this.elValue.boxes?.[boxIndx]?.txt) delete this.site.htmlElmnts[this.elKey].boxes[boxIndx].txt;
    },
    addBox(boxIndx) {
      this.site.htmlElmnts[this.elKey].boxes.splice(boxIndx + 1, 0, { txt: '' });
    },
    deleteBox(boxIndx) {
      this.site.htmlElmnts[this.elKey].boxes.splice(boxIndx, 1);
    },
    drop(boxIndx) {
      this.elValue.boxes[boxIndx].img = event.dataTransfer.getData('text');
    },
  },

  computed: {
    textBoxStyle() {
      if (!this.elValue.style.align) this.site.htmlElmnts[this.elKey].style.align = 'center';
      if (!this.elValue.style.height) this.site.htmlElmnts[this.elKey].style.height = 10;
      const gridTemplateColumns =
        this.elValue.style.align == 'left'
          ? '30% repeat(' + (this.elValue.boxes.length - 1) + ', ' + 70 / (this.elValue.boxes.length - 1) + '%)'
          : this.elValue.style.align == 'center'
          ? 'repeat(' + this.elValue.boxes.length + ', ' + 100 / this.elValue.boxes.length + '%)'
          : 'repeat(' + (this.elValue.boxes.length - 1) + ', ' + 70 / (this.elValue.boxes.length - 1) + '%) 30%';
      return {
        'grid-template-rows': this.elValue.style.height * 0.75 + 'vh',
        'grid-template-columns': gridTemplateColumns,
        padding: this.grid.wdth > this.respWidth.md ? '0px 10%' : '0px',
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
}
.text-box-items {
  display: grid;
}
.text-box-txt-item {
  overflow-x: hidden;
  overflow-y: auto;
  border: 1px dashed black;
  padding: 10px;
}
.text-box-img-item {
  padding: 10px;
  border: 1px dashed black;
  object-fit: cover;
  width: 100%;
}
</style>
