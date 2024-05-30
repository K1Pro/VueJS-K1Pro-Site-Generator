<template>
  <div class="element-order">
    <template v-for="(element, elementIndex) in site.params.htmlElements">
      <div
        v-for="elementName in Object.keys(element)"
        :name="elementName"
        class="element-order-items"
      >
        {{ elementName.charAt(0).toUpperCase()
        }}{{ elementName.slice(1).replaceAll('-', ' ') }}
        <!-- Delete Button -->
        <div @click.prevent="deleteEl(elementIndex)">
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
            !content.htmlStaticElements.includes(elementName) &&
            !site.params.htmlElements?.[elementIndex + 1]?.['footer'] &&
            site.params.htmlElements?.[elementIndex + 1]
          "
          @click.prevent="moveDown(elementIndex)"
        >
          <i class="fa-solid fa-circle-down" :name="elementIndex"></i>
        </div>
        <!-- Up Button -->
        <div
          v-if="
            !content.htmlStaticElements.includes(elementName) &&
            !site.params.htmlElements?.[elementIndex - 1]?.[
              'background-image'
            ] &&
            !site.params.htmlElements?.[elementIndex - 1]?.['top-menu'] &&
            site.params.htmlElements?.[elementIndex - 1]
          "
          @click.prevent="moveUp(elementIndex)"
        >
          <i class="fa-solid fa-circle-up" :name="elementIndex"></i>
        </div>
      </div>
      <div
        v-if="elementIndex === site.params.htmlElements.length - 1"
        class="element-order-items"
      >
        <!-- Add new element // return !content.htmlUniqElements.includes(e); -->
        <select name="addElement" v-model="selectedCreateElType">
          <option value="" disabled selected>Create</option>
          <template
            v-if="
              content.htmlElements &&
              content.htmlAllElements &&
              content.htmlUniqElements
            "
          >
            <option
              v-for="siteHtmlUniqElements in siteHtmlUniqElementsArr"
              :value="siteHtmlUniqElements"
            >
              {{ siteHtmlUniqElements.charAt(0).toUpperCase()
              }}{{ siteHtmlUniqElements.slice(1).replaceAll('-', ' ') }}
            </option>
          </template>
        </select>
        <div @click.prevent="createEl(elementIndex)">
          <i class="fa-solid fa-circle-plus" style="color: green"></i>
        </div>
      </div>
    </template>
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
    siteHtmlAllElementsArr() {
      let siteHtmlAllElementsArray = [];
      this.site.params.htmlElements.forEach((el) =>
        siteHtmlAllElementsArray.push(Object.keys(el)[0])
      );
      return siteHtmlAllElementsArray;
    },
    siteHtmlUniqElementsArr() {
      let siteHtmlUniqElementsArray = [];
      this.content.htmlAllElements.forEach((el) => {
        if (
          !this.content.htmlUniqElements.includes(el) ||
          !this.siteHtmlAllElementsArr.includes(el)
        ) {
          siteHtmlUniqElementsArray.push(el);
        }
      });
      return siteHtmlUniqElementsArray;
    },
  },

  data() {
    return {
      selectedCreateElType: '',
    };
  },

  methods: {
    createEl() {
      if (this.selectedCreateElType) {
        const createdElement = {
          [this.selectedCreateElType]:
            this.content.htmlElements[this.selectedCreateElType],
        };
        const htmlElPostion =
          this.content.htmlElements[this.selectedCreateElType].position;
        let createdElPosition = this.site.params.htmlElements.length;
        if (
          htmlElPostion === undefined &&
          this.siteHtmlAllElementsArr.includes('footer')
        ) {
          createdElPosition--;
        } else if (htmlElPostion >= 0) {
          if (
            !this.siteHtmlAllElementsArr.includes('top-menu') &&
            this.selectedCreateElType != 'top-menu'
          ) {
            createdElPosition = htmlElPostion - 1;
          } else {
            createdElPosition = htmlElPostion;
          }
        } else if (htmlElPostion < 0) {
          createdElPosition = createdElPosition + htmlElPostion + 1;
        }

        this.site.params.htmlElements.splice(
          createdElPosition,
          0,
          createdElement
        );
      } else {
        this.msg.snackBar = 'Element type required';
      }
    },
    deleteEl(elementIndex) {
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
