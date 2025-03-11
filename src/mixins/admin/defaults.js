const defaultsMixin = {
  data() {
    return {
      defaults: {
        htmlUniqSiteElmnts: ['footer', 'legal_links', 'top_menu'],
        htmlUniqPageElmnts: [
          'background_image',
          'background_video',
          'contact',
          'feedback',
          'forms',
          'login',
          'photo_gallery',
          'video_gallery',
        ],
        htmlReqrdPageElmnts: ['terms_of_use', 'privacy_policy'],
        htmlAllElmnts: [
          'background_image',
          'background_video',
          'contact',
          'feedback',
          'footer',
          'forms',
          'headline',
          'icon_slider',
          'login',
          'legal_links',
          'photo_gallery',
          'photo_slider',
          'privacy_policy',
          'product_card',
          'spacer',
          'terms_of_use',
          'test',
          'text_box',
          'top_menu',
          'video_gallery',
        ],
        reqrdPages: ['Terms-of-use', 'Privacy-policy'],
        htmlElmnts: {
          background_image: {
            type: 'background_image',
            position: 1,
            url: 'https://images.pexels.com/photos/2340254/pexels-photo-2340254.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          },
          background_video: {
            type: 'background_video',
            position: 1,
            src: 'https://video.pexels.com/videos/text.mp4',
          },
          contact: { type: 'contact', style: {} },
          feedback: { type: 'feedback' },
          footer: {
            type: 'footer',
            position: -2,
            items: ['about', 'description', 'contact', 'location', 'links'],
            about: { name: false, author: false, business: false, address: false, email: false, phone: false },
            location: { lng: '-87.629799', lat: '41.878113', zoom: '11' },
            links: [],
            style: {
              align: 'right',
              backgroundColor: '#FFFFFF',
              borderColor: '#FFFFFF',
              color: '#000000',
            },
          },
          forms: {
            type: 'forms',
          },
          headline: {
            type: 'headline',
            text: 'Headline',
            style: {
              align: 'center',
              fontSize: 4,
              padding: 4,
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
              borderRadius: '10',
              iconSize: '30',
              textSize: '30',
            },
          },
          legal_links: {
            type: 'legal_links',
            position: -1,
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
            style: {},
          },
          photo_gallery: { type: 'photo_gallery' },
          photo_slider: {
            type: 'photo_slider',
            photos: [
              { src: 'https://api-site.k1pro.net/public/default/logo/missingimage.png' },
              { src: 'https://api-site.k1pro.net/public/default/logo/missingimage.png' },
              { src: 'https://api-site.k1pro.net/public/default/logo/missingimage.png' },
            ],
            style: { height: 35, width: 200, columnGap: 50 },
          },
          privacy_policy: { type: 'privacy_policy', style: {} },
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
          spacer: { type: 'spacer', style: { height: 50 } },

          terms_of_use: { type: 'terms_of_use', style: {} },
          test: { type: 'test' },
          text_box: {
            type: 'text_box',
            style: {
              align: 'center',
              height: 40,
            },
            img: {
              src: 'https://api-site.k1pro.net/public/default/logo/missingimage.png',
              align: 'left',
              width: [200, 250, 300],
              height: [200, 250, 300],
              scale: true,
              scales: [100, 50, 45],
            },
            txt: '',
          },
          top_menu: {
            type: 'top_menu',
            position: 2,
            loggedin: [
              { title: 'Menu Item 1', link: 'https://example.com' },
              { title: 'Menu Item 2', link: 'https://example.com' },
            ],
            loggedout: [
              { title: 'Menu Item 1', link: 'https://example.com' },
              { title: 'Menu Item 2', link: 'https://example.com' },
            ],
            style: {
              align: 'right',
              height: 14,
            },
          },
          video_gallery: {
            type: 'video_gallery',
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
