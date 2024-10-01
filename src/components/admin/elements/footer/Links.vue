<template>
  <template v-for="([elmntKey, elmntVal], elmntIndx) in Object.entries(site.htmlElmnts)">
    <div v-if="elmntVal.type.includes('menu')" v-for="(item, itemIndx) in elmntVal.items">
      <input
        type="checkbox"
        @click="linkOnOff"
        :ref="elmntIndx + '_' + itemIndx"
        :name="elmntKey"
        :checked="
          JSON.stringify(site.htmlElmnts[elKey].links).includes(
            JSON.stringify([elmntKey, item, elmntVal.types[itemIndx], elmntVal.links[itemIndx]])
          )
        "
      />{{ item }}
    </div>
  </template>
</template>

<script>
export default {
  name: 'Links',
  inject: ['site'],
  props: ['elKey', 'elValue', 'elIndex', 'footKey'],
  methods: {
    linkOnOff() {
      const newLinks = [];
      Object.entries(this.$refs).forEach((ref) => {
        if (ref?.[1]?.[0]?.checked) {
          const elmntKey = ref[1][0].name;
          const itemIndx = ref[0].split('_')[1];
          newLinks.push([
            elmntKey,
            this.site.htmlElmnts[elmntKey].items[itemIndx],
            this.site.htmlElmnts[elmntKey].types[itemIndx],
            this.site.htmlElmnts[elmntKey].links[itemIndx],
          ]);
        }
      });
      this.site.htmlElmnts[this.elKey].links = newLinks;
    },
  },
};
</script>

<style>
.links {
}
</style>
