<template>
  <div
    class="subscribe"
    :style="{
      backgroundColor:
        site.htmlElmnts[0]['top-menu'].style.backgroundColor + site.htmlElmnts[0]['top-menu'].style.opacity,
    }"
  >
    <input type="text" placeholder="Email" /><button>Subscribe</button>
  </div>
</template>

<script>
export default {
  name: 'Subscribe',

  inject: ['site'],
};
</script>

<style>
.subscribe {
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px 0px;
  text-align: center;
}
</style>
