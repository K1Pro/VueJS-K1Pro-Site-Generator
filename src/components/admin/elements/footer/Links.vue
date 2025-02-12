<template>
  <div class="links">
    <p v-for="(item, itemIndex) in site.htmlElmnts[elKey][footKey].items">{{ item }}</p>
  </div>
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
