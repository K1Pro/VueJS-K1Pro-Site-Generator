const defaultsMixin = {
  data() {
    return {
      defaults: {
        htmlElmnts: {
          account_info: {
            type: 'account_info',
            info: {
              required: true,
            },
          },
          background_image: {
            type: 'background_image',
            info: {
              opts: ['height'],
              position: 0,
              unique: { page: true },
            },
            src: 'https://images.pexels.com/photos/2340254/pexels-photo-2340254.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            style: { height: '100vh' },
          },
          background_video: {
            type: 'background_video',
            info: {
              opts: ['height'],
              position: 0,
              unique: { page: true },
            },
            src: 'https://videos.pexels.com/video-files/1918465/1918465-uhd_3840_2160_24fps.mp4',
            style: { height: '100vh' },
          },
          container: {
            type: 'container',
            info: {
              components: ['image_banner', 'map', 'text_box'],
              opts: ['padding', 'mobile'],
            },
            mobile: true,
            style: {
              align: 'right',
              'background-color': '#FFFFFF',
              'border-color': '#FFFFFF',
              color: '#000000',
            },
          },
          form: {
            type: 'form',
            info: {
              opts: ['mobile'],
              unique: { page: true },
            },
            button: 'Request a quote',
            mobile: true,
            style: {},
          },
          headline: {
            type: 'headline',
            text: 'Headline',
            info: {
              opts: [
                'align-content',
                'anchor',
                'background',
                'background-color',
                'color',
                'font-size',
                'height',
                'margin',
                'padding',
                'text-align',
                'url',
                'width',
                'paste',
              ],
            },
            style: {
              'align-content': 'center',
              'font-size': '12px',
              margin: '12px',
              'text-align': 'center',
            },
          },
          icon_slider: {
            type: 'icon_slider',
            info: {
              opts: [
                'anchor',
                'background',
                'background-color',
                'border-color',
                'border-radius',
                'border-width',
                'color',
                'font-size',
                'height',
                'icon-size',
                'justify-content',
                'links',
                'margin',
                'padding',
                'text-align',
                'titles',
                'width',
                'paste',
              ],
            },
            items: [
              { title: '', icon: 'fa-solid fa-question' },
              { title: '', icon: 'fa-solid fa-question' },
              { title: '', icon: 'fa-solid fa-question' },
            ],
            style: {
              'border-width': '0px',
              color: '#000000',
              'font-size': '12px',
              height: '150px',
              'icon-size': '30px',
              'justify-content': 'space-evenly',
              margin: '30px',
              padding: '5px',
              'text-align': 'center',
              width: '120px',
            },
            titles: true,
          },
          image_banner: {
            type: 'image_banner',
            src: null,
            info: { opts: ['caption', 'color', 'font-size', 'height', 'object-fit', 'text-align', 'width', 'paste'] },
            style: {},
          },
          login: {
            type: 'login',
            info: {
              unique: { page: true },
            },
            style: {},
          },
          map: {
            type: 'map',
            info: {
              unique: { page: true },
            },
            lng: -87.6298,
            lat: 41.87811,
            zoom: 9,
          },
          nav_bar: {
            type: 'nav_bar',
            info: {
              opts: [
                'border-top',
                'border-bottom',
                'border-width',
                'color',
                'flex-direction',
                'font-size',
                'height',
                'hover',
                'justify-content',
                'links',
                'logo',
                'mobile',
                'paste',
                'width',
              ],
            },
            mobile: true,
            logo: false,
            mod: 'pages',
            items: [
              { title: 'Link 1', link: 'https://example.com' },
              { title: 'Link 2', link: 'https://example.com' },
            ],
            style: {
              color: '#000000',
              'flex-direction': 'row',
              'font-size': '12px',
              height: '100px',
              hover: 'background-color',
              'justify-content': 'flex-start',
            },
          },
          new_element: {
            type: 'new_element',
            info: {
              required: true,
            },
          },
          privacy_policy: {
            type: 'privacy_policy',
            info: {
              required: true,
            },
            style: {},
          },
          product_card: {
            type: 'product_card',
            info: {
              opts: [
                'anchor',
                'background',
                'background-color',
                'border-color',
                'border-radius',
                'border-width',
                'color',
                'font-size',
                'height',
                'image-height',
                'justify-content',
                'links',
                'margin',
                'padding',
                'mobile',
                'text-align',
                'title-font-size',
                'width',
              ],
            },
            mobile: true,
            items: [
              {
                img: 'https://api-site.k1pro.net/public/default/logo/missingimage.png',
                title: 'Products',
                txt: 'This is a short description about our products.',
              },
              {
                img: 'https://api-site.k1pro.net/public/default/logo/missingimage.png',
                title: 'Services',
                txt: 'This is a short description about our services.',
              },
              {
                img: 'https://api-site.k1pro.net/public/default/logo/missingimage.png',
                title: 'Merchandise',
                txt: 'This is a short description about our merchandise.',
              },
            ],
            style: {
              'font-size': '12px',
              'title-font-size': '18px',
            },
          },
          spacer: { type: 'spacer', info: { opts: ['height'] }, style: { height: '50px' } },
          terms_of_use: {
            type: 'terms_of_use',
            info: {
              required: true,
            },
            style: {},
          },
          text_box: {
            type: 'text_box',
            info: { opts: ['text-editor', 'color', 'font-size', 'text-align', 'paste'] },
            style: { color: 'black', 'font-size': '12px', 'text-align': 'left' },
            text: '',
          },
          video_gallery: {
            type: 'video_gallery',
            info: {
              unique: { page: true },
            },
          },
        },
      },
    };
  },

  provide() {
    return {
      // static
      defaults: this.defaults,
    };
  },
};
