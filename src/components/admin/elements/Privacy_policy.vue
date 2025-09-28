<template>
  <div :id="'site_page_el_' + elIndex" class="privacy-policy" v-for="legalElmnt in legalElmnts">
    <div
      v-html="
        legalElmnt
          .replaceAll('__href__', slctd.job.replaceAll('_', '.'))
          .replaceAll('__name__', name)
          .replaceAll('__email__', site.email.toLowerCase())
      "
    ></div>
  </div>
</template>

<script>
export default {
  name: 'Privacy policy',

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      site: site,
      slctd: slctd,
      legalElmnts: [
        '<h1>Privacy Policy</h1>',
        "<p>Thank you for visiting our internet website ('Site') or mobile app ('App').Your privacy is important to us, and we are providing you with this __name__ Online Privacy Policy ('Online Privacy Policy') to give you information about how we manage information gathered from this Site or App managed by __name__ and any affiliates.</p>",
        "<p>In addition to the information in this Online Privacy Policy, __name__ provides other notices describing __name__'s information use and disclosure practices related to other transactions and relationships you may have with __name__. Such other notices will be presented to you when these situations arise in your dealings with __name__. This Online Privacy Policy applies only to that information you supply to __name__ through your use and access of this Site or App.</p>",
        '<p>&nbsp;</p>',
        '<h3>How We Collect, Use and Share Information</h3>',
        '<h3>Functions</h3>',
        "<p>You may be required to provide certain information in order to use some of the functions on this Site or App ('Function(s)').Examples of Functions include the Contact Function and the Login Function. Each Function will provide guidance regarding whether and what information is necessary to utilize it. Functions may be modified from time to time, and different Functions may require different information.</p>",
        '<p>You are not obligated to provide any requested information, but it might not be possible to process your request or grant you access to certain Functions without the information requested. For instance, it is necessary for you to provide certain personal information in order to login. If you are ever asked for personal information as part of your visit to this Site or App, and you do not want to provide that information, simply do not proceed with that Function.</p>',
        '<p>&nbsp;</p>',
        '<h3>App/Online Account</h3>',
        '<p>When you download, register with, or use this App or register for an Online Account, we may ask you to provide certain personal information such as name, postal address, email address, telephone number and details of financial transactions ("personal information").</p>',
        '<p>&nbsp;</p>',
        '<h3>Information Use and Disclosure</h3>',
        '<p>We only use and disclose personal information collected through this Site or App as permitted or required by law in conjunction with our normal operations. Here are some examples:</p>',
        '<ul>',
        "<li style='text-indent: -20px; margin-left: 50px'>We may disclose information to others such as our attorneys;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>We may be required by a court of law to provide information in connection with a legal proceeding;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>We may share information with consumer reporting agencies and support organizations;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>We may share information with government agencies which conduct examinations of our procedures; and</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>We may use or share information to enable functionality or presentation of relevant information.</li>",
        '</ul>',
        '<p>We may also share information collected through the Site or App with our affiliates or companies that perform marketing services on our behalf to assist us in providing information regarding our products and services to you. These companies are required to keep such information confidential.</p>',
        '<p>&nbsp;</p>',
        '<h3>Information Security</h3>',
        '<p>While your personal information is under our control, access is limited to those who have legitimate business needs for such information. In accordance with applicable state and federal regulations we maintain physical, procedural and electronic safeguards to protect the privacy and confidentiality of information collected through this Site or App while it is under our control.</p>',
        '<p>&nbsp;</p>',
        '<h3>Usage Details, IP Addresses and Cookies</h3>',
        '<p>As you use and navigate through this Site or App, we may collect information related to your visits, including for example, traffic data, geographic data, reference website data and other communication data. We may also collect individual or aggregate data relating to the resources that you access, as well as information about your device or computer and internet connection, including your IP address, type of device, operating system, browser type and internet usage data. Some information collected may result in the identification of a particular device, computer or individual.</p>',
        '<p>One method of collecting such information is through the use of cookies. A cookie is a small file stored on your device or computer. Use of cookies helps us to improve our functionality and to deliver a better and more personalized service by enabling us to: estimate our audience size and usage patterns; store information about your preferences allowing us to customize our Site according to your individual interests; speed up your searches; and recognize you when you return to our Site or App. You may refuse to accept cookies by activating the appropriate setting on your browser. However, if you activate such a setting, you may be unable to access certain parts of our Site or App. Unless you have adjusted your browser setting so that it will refuse cookies, our system will issue cookies when you direct your browser to our Site or access web content via this App.</p>',
        '<p>Information may also be collected automatically through web beacons contained on certain pages of this Site, App or web content accessed via this App. Web beacons are small electronic files also referred to as clear gifs, pixel tags and single-pixel gifs that permit us, for example, to count users who have visited those pages and for other related website statistics (for example, recording the popularity of certain website content and verifying system and server integrity).</p>',
        '<p>If you do not want us to collect this information, do not download the App or delete it from your device.</p>',
        '<p>&nbsp;</p>',
        '<h3>Accessing and Correcting Your Personal Information</h3>',
        '<p>You can review and change your username and password and review personal information by logging into the App and visiting your account profile page.</p>',
        '<p>App users may request deletion of accounts created within the App by contacting us as indicated in the Questions section below. If you request deletion of your account created in the App, we may retain your information for legal, auditing, regulatory and/or business purposes. </p>',
        '<p>Access and use of information provided on this Site or App, is governed by our Terms of Use.</p>',
        '<p>&nbsp;</p>',
        '<h3>E-mail and Site Communications Functions</h3>',
        '<p>This Site or App uses Hypertext Transfer Protocol Secure (or HTTPS—a widely used communications protocol for secure communications) for communications functions. Unless otherwise noted, e-mail addresses that may be available on this Site or App do not provide a completely secure and confidential means of communication. It is possible that such communications may be improperly accessed or viewed by another internet user on an unauthorized basis while in transit. If you wish to keep your information completely private, you should not use e-mail.</p>',
        '<p>&nbsp;</p>',
        '<h3>Children</h3>',
        '<p>This Site or App is not directed to children, and __name__ does not request or intend to collect personally identifiable information from anyone under the age of 13.</p>',
        '<p>&nbsp;</p>',
        '<h3>Changes to This Online Privacy Policy</h3>',
        '<p>We may change this Online Privacy Policy from time to time. When changes are made, the Version Date, which is located below, will be updated. We encourage you to read this Online Privacy Policy periodically to see if there are any changes that might affect you.</p>',
        '<p>Your continued use of this Site or App after any changes are posted will be considered acceptance of those changes. We may terminate, suspend or discontinue any aspect of this Site or App, including the availability of any feature at any time. We may also impose limits on certain features and services or restrict access to all or part of this Site or App without notice or liability.</p>',
        '<p>&nbsp;</p>',
        '<h3>Questions</h3>',
        "<p>You may reach us with questions concerning our Online Privacy Policy by e-mail through the link in the 'Contact Us' box on our Home Page.</p>",
        '<p>&nbsp;</p>',
        '<p>&nbsp;</p>',
      ],
    };
  },

  computed: {
    name() {
      return this.site.business ? this.site.business : this.site.author;
    },
  },
};
</script>

<style>
.privacy-policy {
  padding: 0px 10%;
}
</style>
