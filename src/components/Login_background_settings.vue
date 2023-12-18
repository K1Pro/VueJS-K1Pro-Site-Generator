<template>
  <div class="body-background">
    <div>Logo:</div>
    <input type="file" />
    <hr />
    <div>Icon:</div>
    <input type="file" />
    <hr />
    <div>Background:</div>
    <input type="color" v-model="site.params.body.style.backgroundColor" />
    <hr />
    <div>Text Color:</div>
    <input type="color" />
    <hr />
    <div>Font:</div>
    <select name="Font">
      <option value="Arial">Arial</option>
      <option value="Courier">Courier</option>
      <option value="Times New Roman">Times New Roman</option>
    </select>
    <hr />
    <button type="button">Apply</button>&nbsp; <button type="button" @click.prevent="patchParams">Update</button>&nbsp;
    <button type="button" @click.prevent="getSite">Reset</button>&nbsp;
    <hr />
    <button type="button">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'Background Settings',

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['accessToken', 'message', 'pathname', 'site', 'endPts']),
  },

  methods: {
    async patchParams() {
      try {
        const response = await fetch(this.endPts.servrURL + this.endPts.params, {
          method: 'PATCH',
          headers: {
            Authorization: this.accessToken,
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            site: this.site.site,
            params: this.site.params,
          }),
        });
        const patchParamsJSON = await response.json();
        if (patchParamsJSON.success) {
          console.log(patchParamsJSON);
          this.message = patchParamsJSON.messages[0];
        }
      } catch (error) {
        console.log(error.toString());
        this.message = error.toString();
      }
    },

    async getSite() {
      // refactor this
      try {
        console.log(this.endPts.servrURL + this.pathname);
        const response = await fetch(this.endPts.servrURL + this.pathname, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'no-store',
          },
          body: JSON.stringify({
            hostname: window.location.hostname.toLowerCase(),
          }),
        });
        const getSiteResJSON = await response.json();
        if (getSiteResJSON.success) {
          this.site = getSiteResJSON.data;
          Object.keys(getSiteResJSON.data?.params.body.style).forEach((key) => {
            document.body.style[key] = getSiteResJSON.data.params.body.style[key];
          });

          const setFavicon = document.createElement('link');
          setFavicon.setAttribute('rel', 'shortcut icon');
          setFavicon.setAttribute('href', this.endPts.servrURL + this.site.params.icon);
          document.head.appendChild(setFavicon);
        }
        console.log(getSiteResJSON);
        // this.message = getSiteResJSON.messages[0];
      } catch (error) {
        console.log(error.toString());
        this.message = error.toString();
      }
    },
  },
};
</script>

<style>
.body-background select {
  /* margin: 7px 8px 7px 0px; */
  padding: 5px;
}
</style>
