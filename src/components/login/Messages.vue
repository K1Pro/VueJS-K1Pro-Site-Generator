<template>
  <div class="messages">
    Messages:
    <template v-for="(message, messageIndex) in content.messages">
      <h4>{{ messageIndex + 1 }}</h4>
      <div>
        {{ message.Date.slice(4, 6) }}/{{ message.Date.slice(6, 8) }}/{{
          message.Date.slice(0, 4)
        }}
        {{ message.Date.slice(8, 10) }}:{{ message.Date.slice(10, 12) }}
      </div>
      <div>{{ message.Name }}</div>
      <div>{{ message.Email }}</div>
      <div>{{ message.Message }}</div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'Messages',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['content']),
  },
};
</script>

<style>
.messages {
  padding: 10px;
}
.messages h4 {
  background-color: lightgoldenrodyellow;
}
</style>
