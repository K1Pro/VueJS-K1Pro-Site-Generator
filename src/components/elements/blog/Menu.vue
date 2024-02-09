<template>
  <div
    class="blog-menu"
    :style="{
      'padding-top': blogContentMarginTop,
    }"
  >
    <select
      :style="{
        width:
          this.windowWidth > this.respWidth.md ? '120px' : 'calc(33vw - 10px)',
      }"
      style="margin-left: 10px"
    >
      <option value="" disabled selected>Blog category:</option>
    </select>
    <input
      :style="{
        width:
          this.windowWidth > this.respWidth.md ? '120px' : 'calc(33vw - 10px)',
      }"
      style="margin-left: 10px"
      type="month"
      min="2018-03"
      max="2024-02"
      value="2024-02"
    />
    <input
      :style="{
        width:
          this.windowWidth > this.respWidth.md ? '120px' : 'calc(33vw - 20px)',
        'margin-right': this.windowWidth > this.respWidth.md ? '10px' : '0px',
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

  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'windowWidth',
      'respWidth',
      'site',
      'loggedIn',
    ]),

    blogContentMarginTop() {
      return this.site.params.htmlElements[0]['top-menu']
        ? Number(this.site.params.htmlElements[0]['top-menu'].style.height) +
            10 +
            'px'
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
</style>
