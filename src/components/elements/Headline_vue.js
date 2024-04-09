import Element_select from './../login/Element_select_vue.js';
import Element_select_options from './../login/Element_select_options_vue.js';

export default {
  name: 'Headline',

  template: /*html*/ `
    <div
    :class="elKey"
    :style="{
      backgroundColor: elValue.style.backgroundColor,
      fontSize: loggedIn ? '18px' : elValue.style.textSize + 'px',
      height: elValue.style.height + 'px',
      'border-width': loggedIn ? '1px 1px 0px 1px' : 'none',
      'border-style': loggedIn ? 'dashed' : 'none',
      'border-color': loggedIn ? 'black' : 'none',
      'padding-bottom': elValue.style['padding-bottom'] + 'px',
    }">
      <template
        v-if="site.params.htmlElements[elIndex][elKey].style.anchor != ''"
      >
        <a
          :style="{
            'scroll-margin-top': site.params.htmlElements[0]['top-menu']?.style
              .height
              ? site.params.htmlElements[0]['top-menu'].style.height + 'px'
              : '0px',
          }"
          :id="site.params.htmlElements[elIndex][elKey].style.anchor"
          :ref="site.params.htmlElements[elIndex][elKey].style.anchor"
        ></a>
      </template>
      <div class="headline-container">
        <template v-if="loggedIn === true">
          <input
            type="text"
            placeholder="empty"
            v-model="site.params.htmlElements[elIndex]['headline']['text']"
            :style="{
              width: '100%',
              backgroundColor:
                site.params.htmlElements[elIndex]['headline']['style'][
                  'backgroundColor'
                ],
              color:
                site.params.htmlElements[elIndex]['headline']['style']['color'],
              fontSize:
                site.params.htmlElements[elIndex]['headline']['style'][
                  'textSize'
                ] + 'px',
              height: elValue.style.height + 'px',
            }"
          />
          <!-- Modify element select and options -->
          <div class="modPosition">
            <select name="menuChange" v-model="menuChange" @change="menuAction">
              <option value="" disabled selected>
                Modify {{ elKey.charAt(0).toUpperCase()
                }}{{ elKey.slice(1).toLowerCase().replaceAll('_', ' ') }}
              </option>
              <element_select
                :selectKey="elKey"
                :selectIndex="elIndex"
              ></element_select>
              <!-- Custom select options here -->
            </select>
            <div class="modChange">
              <element_select_options
                :selectKey="elKey"
                :selectIndex="elIndex"
                :selectChange="menuChange"
              ></element_select_options>
            </div>
          </div>
          <!-- Modify element select and options -->
        </template>
        <template v-else
          ><span>{{ elValue.text }}</span></template
        >
      </div>
    </div>
  `,

  components: { Element_select, Element_select_options },

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return { menuChange: '' };
  },

  computed: {
    ...Pinia.mapWritableState(useSiteStore, ['loggedIn', 'site', 'endPts']),
  },

  methods: {
    menuAction(event) {
      console.log(event.srcElement.selectedOptions[0].value);
    },
  },

  mounted() {
    if (
      this.$refs[
        this.site.params.htmlElements[this.elIndex][this.elKey].style.anchor
      ]?.id == this.endPts.urlHash
    )
      window.scrollTo(
        0,
        this.$refs[
          this.site.params.htmlElements[this.elIndex][[this.elKey]].style.anchor
        ].getBoundingClientRect().y -
          this.site.params.htmlElements[0]['top-menu'].style.height
      );

    style(
      'Headline',
      /*css*/ `
.headline {
  position: relative;
  text-align: center;
  padding: 0px;
  /* background-color: rgb(174, 46, 142); */
  /* font-size: 30px; */
}

.headline-container {
  position: relative;
  height: 100%;
}

.headline span {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
}

.headline input[type='text'] {
  border: none;
  padding: 0px;
  text-align: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.headline input[type='text']:focus {
  outline: none;
}

.modPosition {
  position: absolute;
  top: 0;
  left: 5px;
  text-align: left;
}

.modPosition input[type='color'] {
  width: 150px;
}

.modPosition select {
  width: 150px;
  padding: 3px;
  margin: 0px;
}

.modChange {
  background-color: white;
  width: 150px;
}
.modChange input[type='range'] {
  width: 75%;
}
        `
    );
  },
};
