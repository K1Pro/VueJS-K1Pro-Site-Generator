<template>
  <div class="description">
    <h2>Description</h2>
    <span spellcheck="false" contenteditable="plaintext-only" v-on:blur="updateFooterDesc($event.target.innerHTML)">{{
      site.description
    }}</span>
  </div>
</template>

<script>
export default {
  name: 'Description',

  inject: ['site'],

  methods: {
    updateFooterDesc(event) {
      this.site.description = event;
    },
  },
};
</script>

<style>
.description span[contenteditable] {
  min-height: 32px;
  display: block; /* not sure if this is needed */
}
.description span[contenteditable]:focus {
  outline: none;
}
.description span[contenteditable]:empty::before {
  min-height: 32px;
  content: 'Enter description';
  display: inline-block;
  color: grey;
}
.description span[contenteditable]:empty:focus::before {
  content: 'Start typing';
  color: grey;
}
</style>
