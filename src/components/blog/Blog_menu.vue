<template>
  <div
    class="blog-menu"
    :style="{
      'padding-top': blogContentMarginTop,
    }"
  >
    <select>
      <option value="" disabled selected>Blog category:</option>
    </select>
    <input style="margin-left: 10px" type="month" min="2018-03" max="2024-02" value="2024-02" />
    <input
      :style="{
        'margin-right': wndw.wdth > respWidth.md ? '10px' : '0px',
      }"
      style="margin-left: 10px"
      type="search"
      placeholder="Search blog..."
      name="search"
    />
  </div>
</template>

<script>
export default {
  name: 'Blog Menu',

  inject: ['respWidth', 'wndw', 'site'],

  computed: {
    blogContentMarginTop() {
      return this.site.htmlElmnts[0]['top-menu']
        ? Number(this.site.htmlElmnts[0]['top-menu'].style.height) + 10 + 'px'
        : '10px';
    },
  },
};
</script>

<style>
.blog-menu {
  background-color: #ffffff00;
  padding-bottom: 10px;
  width: 100%;
  z-index: 4;
  overflow-y: hidden;
  text-align: center;
}
.blog-menu select,
.blog-menu input[type='month'] {
  width: calc(33vw - 10px);
}
.blog-menu input[type='search'] {
  width: calc(33vw - 20px);
}
@media only screen and (min-width: 650px) {
  .blog-menu select,
  .blog-menu input[type='month'],
  .blog-menu input[type='search'] {
    width: 120px;
  }
}
</style>
