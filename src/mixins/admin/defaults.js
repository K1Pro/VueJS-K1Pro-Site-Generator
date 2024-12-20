const defaultsMixin = {
  data() {
    return {
      defaults: {
        htmlUniqSiteElmnts: ['top_menu', 'footer', 'legal_links'],
        htmlUniqPageElmnts: ['background_image', 'contact'],
        htmlAllElmnts: [
          'background_image',
          'top_menu',
          'headline',
          'icon_slider',
          'product_card',
          'spacer',
          'contact',
          'footer',
          'legal_links',
        ],
        htmlElmnts: {
          background_image: {
            type: 'background_image',
            position: 1,
            url: 'https://images.pexels.com/photos/2340254/pexels-photo-2340254.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          },
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
