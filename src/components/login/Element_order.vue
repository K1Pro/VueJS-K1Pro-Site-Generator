<template>
  <div class="element-order">
    <template v-for="(element, elementIndex) in site.params.htmlElements">
      <div
        v-if="elementIndex === site.params.htmlElements.length - 1"
        class="element-order-items"
      >
        <!-- Add new element -->
        <select name="addElement" v-model="selectedCreateElType">
          <option value="" disabled selected>Create</option>
          <template v-if="content.default">
            <option
              v-for="defaultName in Object.keys(content.default).filter((e) => {
                return !site.params.htmlElementsUniqList.includes(e);
              })"
              :value="defaultName"
            >
              {{ defaultName.charAt(0).toUpperCase()
              }}{{ defaultName.slice(1).replaceAll('-', ' ') }}
            </option>
          </template>
        </select>
        <input type="text" placeholder="Name" v-model="selectedCreateElName" />
        <div @click.prevent="createEl(elementIndex)">
          <i class="fa-solid fa-circle-plus" style="color: green"></i>
        </div>
      </div>
      <div
        v-for="elementName in Object.keys(element)"
        :name="elementName"
        class="element-order-items"
      >
        {{ elementName.charAt(0).toUpperCase()
        }}{{ elementName.slice(1).replaceAll('-', ' ') }}
        <!-- Delete Button -->
        <div
          v-if="elementName !== 'footer'"
          @click.prevent="deleteEl(elementIndex)"
        >
          <i class="fa-solid fa-circle-minus" style="color: #ff0000"></i>
        </div>
        <!-- Enable/Disable Button -->
        <div>
          <input
            v-if="site.params.htmlElements[elementIndex][elementName].enabled"
            type="checkbox"
            checked="checked"
            v-model="
              site.params.htmlElements[elementIndex][elementName].enabled
            "
          />
          <input
            v-else
            type="checkbox"
            v-model="
              site.params.htmlElements[elementIndex][elementName].enabled
            "
          />
        </div>

        <!-- Down Button -->
        <div
          v-if="
            elementName !== 'top-menu' &&
            elementName !== 'background-image' &&
            elementName !== 'footer' &&
            !site.params.htmlElements?.[elementIndex + 1]?.['footer']
          "
          @click.prevent="moveDown(elementIndex)"
        >
          <i class="fa-solid fa-circle-down" :name="elementIndex"></i>
        </div>
        <!-- Up Button -->
        <div
          v-if="
            elementName !== 'top-menu' &&
            elementName !== 'background-image' &&
            elementName !== 'footer' &&
            !site.params.htmlElements?.[elementIndex - 1]?.[
              'background-image'
            ] &&
            !site.params.htmlElements?.[elementIndex - 1]?.['top-menu'] &&
            site.params.htmlElements?.[elementIndex - 1]
          "
          @click.prevent="moveUp(elementIndex)"
        >
          <i class="fa-solid fa-circle-up" :name="elementIndex"></i>
        </div></div
    ></template>
  </div>
</template>

<script>
export default {
  name: 'Element Order',
  computed: {
    ...Pinia.mapWritableState(useSiteStore, [
      'loggedIn',
      'msg',
      'site',
      'content',
      'endPts',
    ]),
  },

  data() {
    return { selectedCreateElType: '', selectedCreateElName: '' };
  },
  methods: {
    createEl() {
      if (this.selectedCreateElType && this.selectedCreateElName) {
        const createdElement = {
          [this.selectedCreateElType]:
            this.content.default[this.selectedCreateElType],
        };
        createdElement[this.selectedCreateElType].name =
          this.selectedCreateElName;
        this.site.params.htmlElements.splice(
          this.site.params.htmlElements.length - 1,
          0,
          createdElement
        );
      } else {
        !this.selectedCreateElType
          ? (this.msg.snackBar = 'Element type required')
          : (this.msg.snackBar = 'Element name required');
      }
    },
    deleteEl(elementIndex) {
      const removeUniqEl = this.site.params.htmlElementsUniqList.filter(
        (uniqElements) => {
          return (
            uniqElements !==
            Object.keys(this.site.params.htmlElements[elementIndex])[0]
          );
        }
      );
      this.site.params.htmlElementsUniqList = removeUniqEl;
      this.site.params.htmlElements.splice(elementIndex, 1);
    },
    moveDown(elementIndex) {
      const chosenElement = this.site.params.htmlElements[elementIndex];
      this.site.params.htmlElements.splice(elementIndex, 1);
      this.site.params.htmlElements.splice(elementIndex + 1, 0, chosenElement);
    },
    moveUp(elementIndex) {
      const chosenElement = this.site.params.htmlElements[elementIndex];
      this.site.params.htmlElements.splice(elementIndex, 1);
      this.site.params.htmlElements.splice(elementIndex - 1, 0, chosenElement);
    },
  },
};
</script>

<style>
.element-order-items {
  background-color: lightgrey;
  color: black;
  padding: 2px;
  margin-top: 5px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  height: 20px;
}

.element-order-items div {
  cursor: pointer;
  float: right;
  padding-right: 2px;
  overflow: hidden;
}

.element-order select {
  width: 80px;
  padding: 0px;
}

.element-order input[type='text'] {
  margin-left: 5px;
  width: 60px;
  padding: 0px;
}
</style>
