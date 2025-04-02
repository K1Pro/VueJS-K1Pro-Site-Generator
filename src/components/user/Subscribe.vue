<template>
  <div class="subscribe">
    <p><input type="text" placeholder="Full name" ref="fullname" v-model="name" /></p>
    <p><input type="number" placeholder="Phone number" ref="phonenumber" v-model="number" /></p>
    <p>
      <input type="radio" name="agree" ref="subscribeyes" checked /> I agree to receive promotional text/SMS messages
    </p>
    <p><input type="radio" name="agree" ref="subscribeno" /> Remove me from all promotional phone lists</p>
    <p><input type="submit" v-model="submitText" @click.prevent="subcribeSubmit" /></p>
  </div>
</template>

<script>
export default {
  name: 'Subscribe',

  data() {
    return {
      name: '',
      number: null,
      submitText: 'Submit',
    };
  },

  methods: {
    subcribeSubmit() {
      if (this.name.length < 2) {
        this.$refs.fullname.classList.add('subscribe-red');
        this.submitText = 'Submit';
      } else {
        this.$refs.fullname.classList.remove('subscribe-red');
        this.submitText = 'Submit';
      }
      if (this.$refs.phonenumber.value.length < 3) {
        this.$refs.phonenumber.classList.add('subscribe-red');
        this.submitText = 'Submit';
      } else {
        this.$refs.phonenumber.classList.remove('subscribe-red');
        this.submitText = 'Submit';
      }

      if (this.name.length >= 2 && this.$refs.phonenumber.value.length >= 3 && this.$refs.subscribeyes.checked) {
        this.$refs.subscribeyes.checked = false;
        this.submitText = 'Thank you for subscribing';
        this.name = '';
        this.number = null;
      }
      if (this.name.length >= 2 && this.$refs.phonenumber.value.length >= 3 && this.$refs.subscribeno.checked) {
        this.$refs.subscribeno.checked = false;
        this.submitText = 'Thank you for unsubscribing';
        this.name = '';
        this.number = null;
      }
    },
  },
};
</script>

<style>
.subscribe {
  position: relative;
  padding: 0px 0px;
}
.subscribe input[type='text'],
.subscribe input[type='number'] {
  padding: 5px;
  margin: 5px;
  width: 350px;
}
.subscribe input[type='submit'] {
  padding: 5px;
  margin: 5px;
}
.subscribe-red {
  outline-color: red;
  outline-style: solid;
}
@media only screen and (min-width: 650px) {
  .subscribe {
    position: relative;
    padding: 0px 10%;
  }
}
</style>
