<template>
  <div class="legal">
    <div>{{ endPts.frstURLSgmnt }}</div>
  </div>
</template>

<script>
export default {
  name: 'App copyright',

  data() {
    return {
      respWidth: {
        sm: 576,
        md: 650,
        lg: 992,
        xl: 1140,
      },
      site: params,
      endPts: {
        url: url,
        href: href,
        frstURLSgmnt: first_url_segment,
        siteURL: site_url,
        captchaURL: captcha_url,
        messages: 'messages',
      },
    };
  },
  mounted() {
    console.log(this.endPts.frstURLSgmnt);
  },
};
</script>

<style>
.legal {
}
</style>
