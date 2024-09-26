<template>
  <div class="messages">
    Messages:
    <div class="messages-container">
      <template v-for="(message, messageIndex) in content.messages">
        <div>
          <h4>{{ messageIndex + 1 }}</h4>
          <button @click="deleteMessage(messageIndex)"><i class="fa-solid fa-trash"></i></button>
        </div>

        <div>
          {{ message.Date.slice(4, 6) }}/{{ message.Date.slice(6, 8) }}/{{ message.Date.slice(0, 4) }}
          {{ message.Date.slice(8, 10) }}:{{ message.Date.slice(10, 12) }}
        </div>
        <div>{{ message.Name }}</div>
        <div>{{ message.Email }}</div>
        <div>{{ message.Message }}</div>
      </template>
      <div v-if="content.messages.length === 0">0 messages</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',

  inject: ['content', 'showMsg'],

  methods: {
    async deleteMessage(messageIndex) {
      if (confirm('Are you sure you would like to delete this message?') == true) {
        console.log('you want to delete message ' + messageIndex);
        this.content.messages.splice(messageIndex, 1);
        try {
          const response = await fetch(site_url + 'messages', {
            method: 'DELETE',
            headers: {
              Authorization: access_token,
              'Content-Type': 'application/json',
              'Cache-Control': 'no-store',
            },
            body: JSON.stringify({
              Referer: add_auth,
              EmailIndex: messageIndex,
            }),
          });
          const deleteMessageResJSON = await response.json();
          console.log(deleteMessageResJSON);
          if (!deleteMessageResJSON.success) {
            this.showMsg('Message delete error');
          }
        } catch (error) {
          console.log(error.toString());
          this.showMsg('Message delete error');
        }
      }
    },
  },
};
</script>

<style>
.messages {
  position: relative;
}
.messages h4 {
  width: calc(100% - 30px);
  background-color: #eee;
  float: left;
  margin: 0;
  padding: 5px;
}
.messages button {
  float: right;
  width: 30px;
  height: 30px;
  padding: 5px;
  border: none;
  background-color: #eee;
  cursor: pointer;
}
.messages-container {
  margin-top: 10px;
  height: calc(100vh - 55px);
  padding: 0px;
  overflow-y: auto;
}
</style>
