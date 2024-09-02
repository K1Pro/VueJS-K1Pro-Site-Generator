<template>
  <div class="contact-us">
    <h2>About Us</h2>
    <p>
      {{ site.business ? site.business : site.author }}
    </p>
    <p>{{ site.address.street1 ? site.address.street1 : '' }}</p>
    <p>{{ site.address.street2 ? site.address.street2 : '' }}</p>
    <p>
      {{ site.address.city ? site.address.city + ',' : '' }} {{ site.address.state ? site.address.state : '' }}
      {{ site.address.zip ? site.address.zip : '' }}
    </p>
    <p>{{ site.phone ? 'Phone: ' + site.phone : '' }}</p>
  </div>
</template>

<script>
export default {
  name: 'About Us',

  inject: ['site'],
};
</script>

<style></style>
