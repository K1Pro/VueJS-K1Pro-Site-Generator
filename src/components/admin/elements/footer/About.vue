<template>
  <div class="about-us">
    <p><input type="checkbox" v-model="site.htmlElmnts[elKey][footKey].business" />{{ site.business }}</p>
    <p><input type="checkbox" v-model="site.htmlElmnts[elKey][footKey].name" />{{ site.name }}</p>
    <p><input type="checkbox" v-model="site.htmlElmnts[elKey][footKey].author" />{{ site.author }}</p>
    <p>
      <input type="checkbox" v-model="site.htmlElmnts[elKey][footKey].address" />{{ site.address.street1 }}
      {{ site.address.street2 }} {{ site.address.city }}{{ site.address.city && site.address.state ? ',' : '' }}
      {{ site.address.state }}
      {{ site.address.zip }}
    </p>
    <p><input type="checkbox" v-model="site.htmlElmnts[elKey][footKey].phone" />{{ site.phone }}</p>
    <p>
      <input type="checkbox" v-model="site.htmlElmnts[elKey][footKey].email" />
      {{ site.email }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'About Us',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],
};
</script>

<style>
.about-us {
}
</style>
