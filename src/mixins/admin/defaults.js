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
              position: 0,
              unique: { page: true },
            },
            src: 'https://images.pexels.com/photos/2340254/pexels-photo-2340254.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
            style: { height: 75 },
          },
          background_video: {
            type: 'background_video',
            info: {
              position: 0,
              unique: { page: true },
            },
            src: 'https://videos.pexels.com/video-files/1918465/1918465-uhd_3840_2160_24fps.mp4',
            style: { height: 75 },
          },
          footer: {
            type: 'footer',
            info: {
              components: ['image_banner', 'map', 'text_box'],
            },
            items: [],
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
              unique: { page: true },
            },
            responsive: true,
            style: {},
          },
          headline: {
            type: 'headline',
            text: 'Headline',
            style: {
              'font-size': '12px',
              'align-content': 'center',
              margin: '12px',
              'text-align': 'center',
            },
          },
          icon_slider: {
            type: 'icon_slider',
            icons: [
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
            style: {},
          },
          legal_links: {
            type: 'legal_links',
            info: {
              newPageCopy: true,
              position: -1,
              unique: { site: true },
            },
            links: {
              Copyright: false,
              'Terms-of-Use': false,
              'Privacy-Policy': false,
              Cookies: false,
              Accessibility: false,
              Parental: false,
            },
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
            mobile: true,
            logo: false,
            loggedin: [
              { title: 'Link 1', link: 'https://example.com' },
              { title: 'Link 2', link: 'https://example.com' },
            ],
            loggedout: [
              { title: 'Link 1', link: 'https://example.com' },
              { title: 'Link 2', link: 'https://example.com' },
            ],
            style: {
              'flex-direction': 'row',
              'font-size': '12px',
              height: '100px',
              'justify-content': 'flex-start',
            },
          },
          new_element: {
            type: 'new_element',
            info: {
              required: true,
            },
          },
          photo_gallery: {
            type: 'photo_gallery',
            info: {
              unique: { page: true },
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
            cards: [
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
              borderRadius: '10',
              fontSize: 2,
              titleFontSize: 2.3,
            },
          },
          spacer: { type: 'spacer', style: { height: '50px' } },
          terms_of_use: {
            type: 'terms_of_use',
            info: {
              required: true,
            },
            style: {},
          },
          text_box: {
            type: 'text_box',
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
