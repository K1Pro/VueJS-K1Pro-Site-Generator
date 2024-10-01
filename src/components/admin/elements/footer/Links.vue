<template>
  <template v-for="[elmntKey, elmntVal] in Object.entries(site.htmlElmnts)">
    <div v-if="elmntVal.type.includes('menu')" v-for="(item, itemIndx) in elmntVal.items">
      <input
        type="checkbox"
        @click="linkOnOff"
        :checked="site.htmlElmnts[elKey].links?.[elmntKey + ('00000' + itemIndx).slice(-5)]?.[0] === true"
        :ref="elmntKey + ('00000' + itemIndx).slice(-5)"
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
      const newLinks = {};
      Object.entries(this.$refs).forEach((ref) => {
        if (ref[1][0].checked) {
          const elmntKey = ref[0].slice(0, -5);
          const itemIndx = Number(ref[0].slice(-5));
          newLinks[ref[0]] = [
            ref[1][0].checked,
            this.site.htmlElmnts[elmntKey].items[itemIndx],
            this.site.htmlElmnts[elmntKey].types[itemIndx],
            this.site.htmlElmnts[elmntKey].links[itemIndx],
          ];
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
