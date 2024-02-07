<template>
  <div
    class="blog-menu"
    :style="{
      backgroundColor:
        site.params.htmlElements[0]['top-menu'].style.backgroundColor +
        site.params.htmlElements[0]['top-menu'].style.opacity,
      'padding-top': blogContentMarginTop,
    }"
  >
    <div
      :style="{
        float:
          this.windowWidth > this.respWidth.md
            ? site.params.htmlElements[0]['top-menu'].style.alignment
            : 'left',
      }"
    >
      <select
        :style="{
          width:
            this.windowWidth > this.respWidth.md
              ? '120px'
              : 'calc(33vw - 10px)',
        }"
        style="margin-left: 10px"
      >
        <option value="" disabled selected>Blog category:</option>
      </select>
      <input
        :style="{
          width:
            this.windowWidth > this.respWidth.md
              ? '120px'
              : 'calc(33vw - 10px)',
        }"
        style="margin-left: 10px"
        type="month"
        min="2018-03"
        value="2024-02"
      />
      <input
        :style="{
          width:
            this.windowWidth > this.respWidth.md
              ? '120px'
              : 'calc(33vw - 20px)',
          'margin-right': this.windowWidth > this.respWidth.md ? '10px' : '0px',
        }"
        style="margin-left: 10px"
        type="search"
        placeholder="Search.."
        name="search"
      />
    </div>
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
  padding-bottom: 10px;
  width: 100%;
  z-index: 4;
  overflow-y: hidden;
}
</style>
