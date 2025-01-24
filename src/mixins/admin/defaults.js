const defaultsMixin = {
  data() {
    return {
      defaults: {
        htmlUniqSiteElmnts: ['footer', 'legal_links', 'top_menu'],
        htmlUniqPageElmnts: ['background_image', 'contact', 'login'],
        htmlPrtctdPageElmnts: ['terms_of_use', 'privacy_policy'],
        htmlAllElmnts: [
          'background_image',
          'contact',
          'footer',
          'headline',
          'icon_slider',
          'login',
          'legal_links',
          'privacy_policy',
          'product_card',
          'spacer',
          'terms_of_use',
          'top_menu',
        ],
        prtctdPages: ['Terms-of-use', 'Privacy-policy'],
        prtctdPagesElmnts: ['footer', 'legal_links', 'top_menu'],
        htmlElmnts: {
          background_image: {
            type: 'background_image',
            position: 1,
            url: 'https://images.pexels.com/photos/2340254/pexels-photo-2340254.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          },
          contact: { type: 'contact', style: {} },
          footer: {
            type: 'footer',
            position: -2,
            items: ['about', 'description', 'contact', 'location', 'links'],
            about: { name: false, author: false, business: false, address: false, email: false, phone: false },
            location: { lng: '-87.629799', lat: '41.878113', zoom: '11' },
            links: [],
            style: {
              alignment: 'right',
              backgroundColor: '#FFFFFF',
              borderColor: '#FFFFFF',
              color: '#000000',
            },
          },
          headline: {
            type: 'headline',
            text: 'Headline',
            style: {
              backgroundColor: '#ffffff',
              color: '#000000',
              fontFamily: '',
              height: '75',
              'padding-bottom': '0',
              textSize: 30,
            },
          },
          icon_slider: {
            type: 'icon_slider',
            items: [['Slide 1', 'fa-solid fa-house']],
            style: {
              alignment: 'right',
              backgroundColor: '#ffffff',
              borderRadius: '10',
              borderColor: '#000000',
              iconColor: '#000000',
              iconSize: '30',
              'padding-bottom': '0',
              slideColor: '#ffffff',
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
          privacy_policy: { type: 'privacy_policy', style: {} },
          product_card: {
            type: 'product_card',
            items: [
              [
                'https://api-site.k1pro.net/public/default/logo/logo.png',
                'Products',
                'This is a short description about our products.',
              ],
              [
                'https://api-site.k1pro.net/public/default/logo/logo.png',
                'Services',
                'This is a short description about our services.',
              ],
              [
                'https://api-site.k1pro.net/public/default/logo/logo.png',
                'Merchandise',
                'This is a short description about our merchandise.',
              ],
            ],
            style: {
              alignment: 'center',
              backgroundColor: '#ffffff',
              borderRadius: '10',
              borderColor: '#000000',
              cardColor: '#f0f0f0',
              'padding-bottom': '0',
            },
          },
          spacer: { type: 'spacer', style: { height: 50 } },
          terms_of_use: { type: 'terms_of_use', style: {} },
          top_menu: {
            type: 'top_menu',
            position: 2,
            items: ['Menu Item 1', 'Menu Item 2'],
            types: ['Link', 'Link'],
            links: ['', ''],
            style: {
              alignment: 'right',
              height: 6,
              fontSize: 2,
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
