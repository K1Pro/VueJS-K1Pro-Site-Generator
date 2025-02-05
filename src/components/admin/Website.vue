<template>
  <div class="website">
    <button type="button" @click="patchSite" style="width: calc(50% - 10px)">Update</button>
    <button type="button" @click="getSite" style="width: calc(50%); margin-left: 10px">Reset</button>
    <hr />
    <element_order></element_order>
    <hr />
    <select style="width: 100%" v-model="pageStyle">
      <option disabled selected value="">Website settings</option>
      <option v-for="style in Object.keys(site.body.style).sort()" :value="style">
        {{
          style
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .toLowerCase()
            .trim()
        }}
      </option>
      <option value="external_links">external links</option>
    </select>
    <p v-if="pageStyle.toLowerCase().includes('color')">
      <input type="color" v-model="site.body.style[pageStyle]" @input="changeColor($event.target.value, pageStyle)" />
    </p>
    <p v-else-if="pageStyle.toLowerCase().includes('opacity') || pageStyle.toLowerCase().includes('margin')">
      <input type="range" v-model="site.body.style[pageStyle]" />{{ site.body.style[pageStyle] }}%
    </p>
    <p v-else-if="pageStyle == 'external_links'">
      <select
        style="width: calc(100% - 25px); height: 25px"
        ref="selectLinkTitle"
        @change="
          $event.target.nextSibling.value = $event.target.value != 'createExtrnlLink' ? $event.target.value : '';
          $event.target.nextSibling.nextSibling.nextSibling.value =
            $event.target.value != 'createExtrnlLink' ? site.links[$event.target.value] : '';
        "
      >
        <option value="createExtrnlLink">Create link</option>
        <option v-if="Object.keys(site.links).length > 0" disabled selected>Select a link</option>
        <option v-for="link in Object.keys(site.links)" :value="link">{{ link }}</option>
      </select>
      <input
        type="text"
        placeholder="Enter new link or select existing"
        style="
          padding-left: 5px;
          width: calc(100% - 50px);
          margin-left: calc(-99% + 25px);
          margin-right: 25px;
          height: 21px;
          border: none;
          outline: none;
        "
        @change="addLink"
        ref="linkTitle"
      />
      <i
        class="fa-solid fa-circle-minus"
        style="color: red; cursor: pointer"
        @click="deleteLink($event.target.previousSibling.previousSibling.value)"
      ></i>
      <input type="text" placeholder="Link URL" style="padding-left: 5px" @change="addLink" ref="linkURL" />
    </p>
    <p v-else-if="pageStyle != ''"><select v-model="site.body.style[pageStyle]"></select></p>
  </div>
</template>

<script>
export default {
  name: 'Web site',

  inject: ['getSite', 'patchSite', 'site'],

  data() {
    return { pageMedia: 'logo', pageStyle: '' };
  },
  methods: {
    changeColor(event, pageStyle) {
      const appGridItem2 = document.getElementById('app-grid-item2');
      if (pageStyle == 'textColor') {
        const allElmnts = [
          ...Array.from(appGridItem2.getElementsByTagName('input')),
          ...Array.from(appGridItem2.getElementsByTagName('select')),
          ...Array.from(appGridItem2.getElementsByTagName('i')),
          ...Array.from(appGridItem2.getElementsByTagName('textarea')),
        ];
        allElmnts.forEach((el) => {
          el.style.color = event;
        });
      }
    },
    addLink() {
      if (this.$refs.linkURL.value && this.$refs.linkTitle.value) {
        if (this.site.links === null) this.site.links = {};
        if (this.$refs.selectLinkTitle.value != 'null') {
          if (this.$refs.selectLinkTitle.value == 'createExtrnlLink') {
            this.site.links[this.$refs.linkTitle.value] = this.$refs.linkURL.value;
          } else if (this.$refs.linkTitle.value != this.$refs.selectLinkTitle.value) {
            this.site.links[this.$refs.linkTitle.value] = this.site.links[this.$refs.selectLinkTitle.value];
            delete this.site.links[this.$refs.selectLinkTitle.value];
          } else {
            this.site.links[this.$refs.selectLinkTitle.value] = this.$refs.linkURL.value;
          }
        } else {
          this.site.links[this.$refs.linkTitle.value] = this.$refs.linkURL.value;
        }
      }
    },
    deleteLink(event) {
      if (confirm('Are you sure you would like to delete this link?') == true) {
        delete this.site.links[event];
        this.$refs.selectLinkTitle.value = 'createExtrnlLink';
        this.$refs.linkTitle.value = '';
        this.$refs.linkURL.value = '';
      }
    },
  },
};
</script>

<style>
.website select {
  /* margin: 7px 8px 7px 0px; */
  /* margin-left: -5px; */
  padding: 0px;
  font-size: 16px;
}
.website select:focus {
  outline: none;
}
.website p input {
  width: 100%;
}
.website p input[type='range'] {
  width: calc(100% - 50px);
}
</style>
