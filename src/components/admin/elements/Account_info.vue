<template>
  <div class="account-info">Account info</div>
</template>

<script>
export default {
  name: 'Account info',
  inject: ['site'],

  props: ['elKey', 'elValue', 'elIndex'],
};
</script>

<style>
.account-info {
}
</style>
