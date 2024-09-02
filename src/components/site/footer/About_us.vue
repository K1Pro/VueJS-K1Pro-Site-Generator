<template>
  <div class="contact-us">
    <h2>About Us</h2>
    <p>
      {{ site.author }}<br />
      {{ site.phone }}<br />
      <a :href="'mailto:' + site.email">{{ site.email }}</a>
    </p>
  </div>
</template>

<script>
export default {
  name: 'About Us',

  inject: ['site'],
};
</script>

<style></style>
