<template>
  <div class="about-us">
    <h2>About</h2>
    <p v-if="site.htmlElmnts[elKey][footKey].business">
      {{ site.business }}
    </p>
    <p v-if="site.htmlElmnts[elKey][footKey].name">
      {{ site.name }}
    </p>
    <p v-if="site.htmlElmnts[elKey][footKey].author">
      {{ site.author }}
    </p>

    <span v-if="site.htmlElmnts[elKey][footKey].address"
      ><p>
        {{ site.address.street1 ? site.address.street1 : '' }} {{ site.address.street2 ? site.address.street2 : '' }}
      </p>
      <p>
        {{ site.address.city ? site.address.city + ',' : '' }} {{ site.address.state ? site.address.state : '' }}
        {{ site.address.zip ? site.address.zip : '' }}
      </p></span
    >
    <p v-if="site.htmlElmnts[elKey][footKey].phone">Phone: {{ site.phone }}</p>
    <p v-if="site.htmlElmnts[elKey][footKey].email">Email: {{ site.email }}</p>
  </div>
</template>

<script>
export default {
  name: 'About Us',

  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex', 'footKey'],
};
</script>

<style></style>
