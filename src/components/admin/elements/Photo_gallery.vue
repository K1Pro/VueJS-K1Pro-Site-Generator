<template>
  <div class="photo-gallery">
    <div :id="'site_page_el_' + elIndex" class="el-hover"></div>
    photo gallery
  </div>
</template>

<script>
export default {
  name: 'Photo gallery',

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.photo-gallery {
  position: relative;
  min-height: 35px;
  border: none;
  outline-style: dashed;
  outline-width: 2px;
  outline-offset: -2px;
}
</style>
