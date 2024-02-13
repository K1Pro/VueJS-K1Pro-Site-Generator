<template>
  <template v-if="selectChange.toLowerCase().includes('color')">
    <input
      type="color"
      :name="selectKey + '_' + selectChange"
      v-model="
        site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
      "
  /></template>
  <template v-if="selectChange == 'anchor'">
    <select
      :name="selectKey + '_' + selectChange"
      v-model="
        site.params.htmlElements[selectIndex][selectKey]['style']['anchor']
      "
      @change="updateAnchor"
    >
      <option
        :value="
          site.params.htmlElements[selectIndex][selectKey]['style']['anchor']
            ? site.params.htmlElements[selectIndex][selectKey]['style'][
                'anchor'
              ]
            : ''
        "
        disabled
        selected
      >
        {{
          site.params.htmlElements[selectIndex][selectKey]['style']['anchor']
            ? site.params.htmlElements[selectIndex][selectKey]['style'][
                'anchor'
              ]
            : 'Choose'
        }}
      </option>
      <option v-if="chosenAnchor" value="">None</option>
      <template
        v-for="(topMenuItem, topMenuIndex) in site.params.htmlElements[0][
          'top-menu'
        ]['menu-items']"
      >
        <option
          v-if="
            !site.params.anchors.includes(topMenuItem) &&
            !site.params.htmlElements[0]?.['top-menu']?.style.links[
              topMenuIndex
            ] != '' &&
            topMenuItem != 'Blog' &&
            topMenuItem != 'blog' &&
            topMenuItem != 'Admin' &&
            topMenuItem != 'admin' &&
            topMenuItem != 'Home' &&
            topMenuItem != 'home'
          "
        >
          {{ topMenuItem }}
        </option>
      </template>
    </select></template
  >
  <template v-if="selectChange == 'height'">
    <input
      type="range"
      min="50"
      max="150"
      :name="selectKey + '_' + selectChange"
      v-model="
        site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
      "
    />{{
      site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
    }}
  </template>
  <template v-if="selectChange.toLowerCase().includes('size')">
    <input
      type="range"
      min="10"
      max="50"
      :name="selectKey + '_' + selectChange"
      v-model="
        site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
      "
    />{{
      site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
    }}
  </template>
  <template v-if="selectChange == 'borderRadius'">
    <input
      type="range"
      min="0"
      max="50"
      :name="selectKey + '_' + selectChange"
      v-model="
        site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
      "
    />{{
      site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
    }}
  </template>
  <template v-if="selectChange == 'opacity'">
    <input
      type="range"
      min="0"
      max="100"
      :name="selectKey + '_' + selectChange"
      :value="
        site.params.htmlElements[selectIndex][selectKey]['style']['opacity'] ==
        ''
          ? 100
          : site.params.htmlElements[selectIndex][selectKey]['style']['opacity']
      "
      @input="changeMenuOpacity"
    />{{
      site.params.htmlElements[selectIndex][selectKey]['style']['opacity'] == ''
        ? 100
        : site.params.htmlElements[selectIndex][selectKey]['style']['opacity']
    }}
  </template>
  <template v-if="selectChange == 'padding-bottom'">
    <input
      type="range"
      min="0"
      max="100"
      :name="selectKey + '_' + selectChange"
      v-model="
        site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
      "
    />{{
      site.params.htmlElements[selectIndex][selectKey]['style'][selectChange]
    }}
  </template>
  <template v-if="selectChange == 'alignment'">
    <template
      v-if="
        site.params.htmlElements[selectIndex][selectKey]['style'][
          'alignment'
        ] == 'left'
      "
    >
      <input
        type="radio"
        name="menu-alignment"
        value="left"
        checked
        @click="changeMenuAlignment"
      /><label for="left">Left</label>
      <input
        type="radio"
        name="menu-alignment"
        value="right"
        @click="changeMenuAlignment"
      /><label for="right">Right</label>
    </template>
    <template v-else>
      <input
        type="radio"
        name="menu-alignment"
        value="left"
        @click="changeMenuAlignment"
      /><label for="left">Left</label>
      <input
        type="radio"
        name="menu-alignment"
        value="right"
        checked
        @click="changeMenuAlignment"
      /><label for="right">Right</label></template
    >
  </template>
</template>

<script>
export default {
  name: 'Element Select Options',

  props: ['selectKey', 'selectIndex', 'selectChange'],

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['site']),
  },

  data() {
    return {
      chosenAnchor: '',
    };
  },

  methods: {
    changeMenuOpacity(event) {
      event.target.value == 100
        ? (this.site.params.htmlElements[this.selectIndex][this.selectKey][
            'style'
          ]['opacity'] = '')
        : (this.site.params.htmlElements[this.selectIndex][this.selectKey][
            'style'
          ]['opacity'] = event.target.value);
    },
    changeMenuAlignment(event) {
      this.site.params.htmlElements[this.selectIndex][this.selectKey]['style'][
        'alignment'
      ] = event.target.value;
    },
    updateAnchor(event) {
      this.chosenAnchor = event.srcElement.selectedOptions[0].value;
      this.site.params.htmlElements[this.selectIndex][this.selectKey]['style'][
        'anchor'
      ] = event.srcElement.selectedOptions[0].value;
      if (event.srcElement.selectedOptions[0].value) {
        this.site.params.anchors.push(
          event.srcElement.selectedOptions[0].value
        );
      }
    },
  },
  created() {
    if (
      this.site.params.htmlElements[this.selectIndex][this.selectKey]['style'][
        'anchor'
      ]
    ) {
      this.chosenAnchor =
        this.site.params.htmlElements[this.selectIndex][this.selectKey][
          'style'
        ]['anchor'];
      console.log(
        this.site.params.htmlElements[this.selectIndex][this.selectKey][
          'style'
        ]['anchor']
      );
    }
  },
  watch: {
    chosenAnchor(newAnchor, oldAnchor) {
      console.log(oldAnchor);
      if (oldAnchor) {
        const newAnchorUsed = this.site.params.anchors.filter(
          (el) => el !== oldAnchor
        );
        this.site.params.anchors = newAnchorUsed;
      }
    },
  },
};
</script>

<style></style>
