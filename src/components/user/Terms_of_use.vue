<template>
  <div class="terms-of-use" v-for="legalElmnt in legalElmnts">
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
  name: 'Terms of use',

  props: ['elKey', 'elValue', 'elIndex'],

  data() {
    return {
      site: site,
      slctd: slctd,
      legalElmnts: [
        '<h1>Terms of Use</h1>',
        '<p>These Terms of Use, which include the Online Privacy Policy, govern your access to and use of the "__href__" website and __name__\'s mobile application (together or either individually, the Site). For purposes of these Terms of Use, __name__ refers to __name__ and any of its constituent entities or groups. Your use of the Site is expressly conditioned on your acceptance of these Terms of Use. If you do not agree with any part of the Terms of Use, you must not use the Site.</p>',
        '<p>__name__ reserves the right to modify these Terms of Use at any time, and will post the changes on this page. Continued use of the Site by you will constitute your acceptance of any revisions to the Terms of Use. Please check this page regularly.</p>',
        '<p>&nbsp;</p>',
        '<h3>Permitted Uses</h3>',
        '<p>__name__ makes the Site available to you, subject to your acceptance of these Terms of Use, without charge for the purpose of providing you with information about __name__, its services and insurance services in general. The Site may be used for that purpose only and not for any other purpose, including any commercial purposes.</p>',
        '<p>&nbsp;</p>',
        '<h3>Agreement to be Legally Bound by These Terms</h3>',
        '<p>Please read these Terms of Use carefully before using the Site as they govern your access to and use of the Site, as more fully explained below.</p>',
        '<p>By using the Site, including by navigating through pages within the Site or downloading any Content (defined below) from the Site, you agree to abide and be legally bound by these Terms of Use, including any changes or updates that may be posted on the Site from time to time. The Terms of Use as posted on any given date that you use the Site shall govern such use. If you do not agree to abide and be legally bound by these Terms of Use, the Online Privacy Policy, or any other terms published on the Site, do not use the Site or download Content from the Site.</p>',
        '<p>&nbsp;</p>',
        '<h3>Limited License</h3>',
        '<p>The content on the Site, including without limitation, the materials, information, text, software, code, scripts, graphics, photos, sounds, music, videos, interactive features and the like, as well as the trademarks, service marks, and logos (collectively, the "Content"), are owned by or licensed to __name__ unless expressly disclaimed and are subject to copyright, trademark and other intellectual property rights under the law.</p>',
        '<p>Subject to these Terms of Use, __name__ grants you a limited right to view, access, and display the Content within the Site for personal use only. Your limited license is not transferable, nor is it exclusive to you. __name__ may terminate your license, in whole or in part, for any reason and at any time with or without notice. Your license is also dependent on your agreement not to interrupt or attempt to interrupt the operation of the Site.</p>',
        '<p>You may download the Content only for the purposes stated above. This license is not a transfer of title in the Content or any copies of the Content and is subject to the following restrictions:</p>',
        "<p style='text-indent: -20px; margin-left: 50px'>1. You may not modify the Content in any way (including the removal of any copyright or other proprietary notice contained in the Content), or reproduce or publicly display, perform, or distribute or otherwise use the Content for any public or commercial purpose.</p>",
        "<p style='text-indent: -20px; margin-left: 50px'>2. You agree to abide by all additional restrictions as may be displayed on the Site from time to time. The Site, including all Content, is protected by worldwide copyright laws and treaty provisions. You agree to comply with all copyright laws in your use of the Site and to prevent any unauthorized copying of the Content. Except as expressly provided herein, __name__ does not grant any express or implied right to you in or to any Content.</p>",
        '<p>&nbsp;</p>',
        '<h3>Permissions and Restrictions</h3>',
        '<p>__name__ hereby grants you permission to access and use the Site as set forth in these Terms of Use, provided that:</p>',
        '<p><b>A.</b> You agree not to distribute any part of the Site, in any medium, without the prior written consent of __name__ other than through functions and features provided through the Site (such as a downloadable image).</p>',
        '<p><b>B.</b> You agree not to alter or modify any part of the Site.</p>',
        "<p><b>C.</b> You agree not to use any part of the Site for any commercial purpose without the prior written authorization of __name__. Prohibited commercial uses include without limitation any of the following actions taken without __name__'s express written approval: 1) sale or transfer of access to the Site on another website or mobile application; 2) use of the Site or any information on the Site for the purpose of gaining advertising or subscription revenue; or, 3) the sale of advertising on the Site or any third-party website targeted to any information on the Site.</p>",
        '<p><b>D.</b> Prohibited commercial uses do not include uploading of original material to the Site approved in advance or expressly authorized by __name__ in writing.</p>',
        '<p><b>E.</b> You agree not to use or launch any automated system, process or method, including without limitation, "robots," "spiders," "offline readers," or similar devices, to access the Site in a disruptive manner, send more request messages to the Site\'s servers in a given period of time than a human can reasonably produce in the same period of time using a conventional online web browser, or comb the Site for the purpose of displaying the Site contents at any other location. Notwithstanding the foregoing, __name__ grants the operators of public search engines permission to use spiders to reference or link to materials on the Site for the sole purpose of creating publicly available searchable indices of the materials. As with all provisions of these Terms of Use, __name__ reserves the right to revoke these exceptions either generally or in specific cases. You agree not to collect or harvest any personally identifiable information, including usernames, from the Site, nor to use the communication systems provided by the Site (e.g. comments, email) for any unlawful purpose. You agree not to solicit, for commercial purposes, any users of the Site.</p>',
        '<p><b>F.</b> In your use of the Site, you will otherwise comply with these Terms of Use and all applicable local, national, and international laws and regulations.</p>',
        '<p><b>G.</b> __name__ reserves the right to discontinue any aspect of the Site at any time.</p>',
        '<p>&nbsp;</p>',
        "<h3>__name__'s Mobile App</h3>",
        "<p>__name__'s mobile app (the 'Mobile App') is licensed to you according to these Terms of Use and the terms of the service for the platform from which you downloaded it; either Apple's App Store or Google's Google Play store. This means that you may download the Mobile App to a compatible device and use it according to the applicable terms, but you do not own it. You may not copy, reverse-engineer, disassemble, attempt to derive the source code of, modify, or create derivative works of the Mobile App, any parts thereof or any updates thereto, and you may not distribute or make the Mobile App available over a network where it could be used by multiple devices at the same time. You may not transfer, redistribute or sublicense the Mobile App and, if you give or sell the device on which the Mobile App is installed to a third party, you must remove the Mobile App from the device before doing so.</p>",
        "<p>The Mobile App may provide you with access to Content and certain features and functionality hosted on __name__'s website located at www.__name__insurance.com. Your access to and use of such Content, features and functionality may require you to acknowledge your acceptance of these Terms of Use and create an online account for __name__'s website, and your failure to do so may restrict you from accessing or using certain of the Mobile App's features and functionality.</p>",
        '<p>The Content and Site are based in the Commonwealth of Pennsylvania in the United States and provided for access and use only by persons located in the United States. You acknowledge that you may not be able to access all or some of the Content and Site outside of the United States and that access thereto may not be legal by certain persons or in certain countries. If you access the Content and Site from outside the United States, you are responsible for compliance with local laws.</p>',
        '<p>__name__ may from time to time in its sole discretion develop and provide updates to the Mobile App, which may add or delete features or functionality (collectively, including related documentation, "Updates"). You agree that __name__ has no obligation to provide any Updates or to continue to provide or enable any particular features or functionality. Based on your mobile device settings, when your mobile device is connected to the internet either: (a) the Mobile App will automatically download and install all available Updates; or (b) you may receive notice of or be prompted to download and install available Updates. You must promptly download and install all Updates in order to continue using the Mobile App, and you acknowledge and agree that the Mobile App or portions thereof may not properly operate should you fail to do so. You further agree that all Updates will be deemed part of the Mobile App and be subject to these Terms of Use. </p>',
        '<p>If you access and use the Mobile App on a mobile phone, you acknowledge that the provider of your telephone service may charge fees for usage of data or sending or receiving messages and you are solely responsible for payment of any such fees. You agree that __name__ is not responsible for any such fees and you will indemnify and hold __name__ harmless from any such fees. </p>',
        "<p>Your right to access and use the Mobile App will continue until terminated in one of the following ways: (a) you may terminate your license to use the Mobile App by deleting the Mobile App and all copies thereof from any devices on which it has been installed by you or at your direction; (b) __name__ may terminate your license to use the Mobile App at any time without notice, including but not limited to if __name__ ceases to support the Mobile App, which __name__ may do in its sole discretion; or (c) your license to use the Mobile App will terminate immediately and without any notice if you violate any of these Terms of Use. Upon one of these events, all rights granted to you with respect to the Mobile App will terminate, and you must cease all use of the Mobile App and delete all copies of the Mobile App from any devices on which it has been installed by you or at your direction. Termination will not limit any of __name__'s rights or remedies at law or in equity. </p>",
        '<p>&nbsp;</p>',
        '<h3>Digital Millennium Copyright Act</h3>',
        '<p>A. If you are a copyright owner or an agent thereof and believe that any Content infringes upon your copyrights, you may submit a notification pursuant to the Digital Millennium Copyright Act ("DMCA") by providing our Copyright Agent with the following information in writing (see 17 U.S.C 512(c)(3) for further detail):</p>',
        '<p>A physical or electronic signature of a person authorized to act on behalf of the owner of the exclusive right that is allegedly infringed;</p>',
        '<ul>',
        "<li style='text-indent: -20px; margin-left: 50px'>A physical or electronic signature of a person authorized to act on behalf of the owner of the exclusive right that is allegedly infringed;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at the Site are covered by a single notification, a representative list of such works at the Site;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>Identification of the Content that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled and information reasonably sufficient to permit __name__ to locate the material;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>Information reasonably sufficient to permit __name__ to contact you, such as an address, telephone number and, if available, an email address;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law; and</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>A statement that the information in the notification is accurate, and under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>",
        '</ul>',
        "<p>You may contact __name__'s designated Copyright Agent with notifications of claimed infringement by email: __email__. You acknowledge that if you fail to comply with all of the requirements of this section, your DMCA notice may not be valid.</p>",
        "<p>B. Counter-Notice. If you believe that Content you submitted to the Site that was removed (or to which access was disabled) pursuant to this section is not infringing, or that you have the authorization from the copyright owner, the copyright owner's agent, or pursuant to the law, to post and use the Content, you may send a counter-notice containing the following information to the Copyright Agent:</p>",
        '<ul>',
        "<li style='text-indent: -20px; margin-left: 50px'>Your physical or electronic signature;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>Identification of the Content that has been removed or to which access has been disabled and the location on the Site at which the content appeared before it was removed or disabled;</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>A statement that you have a good faith belief that the Content was removed or disabled as a result of mistake or a misidentification of the Content; and</li>",
        "<li style='text-indent: -20px; margin-left: 50px'>Your name, address, telephone number and email address, a statement that you consent to the jurisdiction of the federal court in the state that __name__ is registered, and a statement that you will accept service of process from the person who provided notification of the alleged infringement.</li>",
        '</ul>',
        '<p>If a counter-notice is received by the Copyright Agent, __name__ may send a copy of the counter-notice to the original complaining party informing that person that __name__ may restore the removed Content or cease disabling it. __name__, at its sole discretion, may replace the removed Content.</p>',
        '<p>&nbsp;</p>',
        '<h3>Disclaimer</h3>',
        '<p>CONTENT PROVIDED THROUGH THE SITE MAY CONTAIN INACCURACIES AND TYPOGRAPHICAL ERRORS. __name__ DOES NOT WARRANT THE ACCURACY OR COMPLETENESS OF THE CONTENT OR THE RELIABILITY OF ANY ADVICE, OPINION, STATEMENT OR OTHER CONTENT DISPLAYED OR DISTRIBUTED THROUGH THE SITE.</p>',
        '<p><b>FOR COMPLETE DETAILS ABOUT ANY SERVICE OFFERED BY __name__, YOU SHOULD CONTACT __name__ DIRECTLY. SERVICES ARE OFTEN PROVIDED ON AN INDIVIDUAL BASIS AND WILL VARY DEPENDING ON YOUR SPECIFIC SITUATION. YOU ACKNOWLEDGE THAT ANY RELIANCE ON ANY SUCH OPINION, ADVICE, STATEMENT, MEMORANDUM, OR CONTENT WILL BE AT YOUR SOLE RISK.</b></p>',
        '<p>__name__ RESERVES THE RIGHT, IN ITS SOLE DISCRETION, TO MAKE CHANGES TO THESE TERMS OF USE, THE SITE AND THE CONTENT, AND THE PRODUCTS, PROGRAMS, SERVICES AND PRICES (IF ANY) DESCRIBED IN THE SITE AT ANY TIME WITHOUT NOTICE. THE SITE, AND CONTENT ON THE SITE, ARE PROVIDED "AS IS" WITHOUT ANY REPRESENTATION OR WARRANTY, EXPRESS OR IMPLIED, OF ANY KIND, INCLUDING, BUT NOT LIMITED TO, WARRANTIES OF MERCHANTABILITY, NONINFRINGEMENT, OR FITNESS FOR ANY PARTICULAR PURPOSE.</p>',
        '<p>&nbsp;</p>',
        '<h3>Third Party Sites</h3>',
        '<p>As a convenience to you, __name__ may provide, on the Site, links to websites operated by other entities. If you link to and use any such websites, you will leave the Site, and you may be subject to the terms and conditions governing the use of such third-party websites. Clicking on any link within the Site to a third party website is done solely at your own risk, and it is your responsibility to take all protective measures to guard against viruses or other destructive elements that may arise or result from the use of any third party website.</p>',
        '<p>__name__ makes no warranty or representation regarding, and does not endorse, any linked websites or the information appearing thereon or any of the products or services described thereon. Links to third party websites do not imply that __name__ sponsors, endorses, is affiliated or associated with such third parties, or that __name__ is legally authorized to use any trademark, trade name, logo or copyright symbol displayed in or accessible through such websites, or that any linked website is authorized to use any trademark, trade name, logo or copyright symbol of __name__.</p>',
        '<p>&nbsp;</p>',
        '<h3>Information Provided By You</h3>',
        "<p>__name__ does not want you to, and you should not, send any confidential or proprietary information to __name__ via the Site except as expressly or implicitly indicated by the Site functionality. See __name__'s Online Privacy Policy for additional information.</p>",
        "<p>Do not send business proposals, inventions or ideas to __name__ through the Site. You agree that any materials or information that you or individuals acting on your behalf provide to __name__ will not be considered confidential or proprietary to you, except to the extent it is nonpublic personal information covered by __name__'s Privacy Notice.</p>",
        '<p>To the extent you provide any materials or information to __name__ other than nonpublic personal information, you grant to __name__ an unrestricted, perpetual, irrevocable, worldwide, royalty-free license to use, reproduce, display, publicly perform, sublicense, transmit and distribute such materials and information, in any medium and in any form, and you further agree that __name__ is free to use any ideas, concepts or know-how that you or individuals acting on your behalf provide to __name__ through or by means of the Site.</p>',
        '<p>You further recognize that __name__ does not want you to, and you warrant that you will not, provide to __name__, or post or transmit through the Site, any information that is defamatory, threatening, obscene, harassing, or otherwise unlawful, that infringes the intellectual property rights of another, or incorporates the proprietary material of another except as authorized.</p>',
        '<p>&nbsp;</p>',
        '<h3>Username Accounts</h3>',
        "<p>In order to access some features of the Site, including Online Account and/or Mobile App, you may have to create a username account. The information you provide at that time will constitute the basis for your username account. You may never use another's username account without permission.</p>",
        '<p>When creating your username account, you must provide accurate and complete information. You agree that you will not provide a false or fraudulent email address. If you create any username account that contains false information or omits any material information, you may not access or use the Site, and waive any rights to do so, including those described in these Terms of Use. </p>',
        "<p>You are solely responsible for the activity that occurs on your username account. Should you establish a username and password on the Site, you must keep your username account password secure. __name__ is not responsible for any other Site user or third party's use or theft of your username and password. You must notify __name__ immediately of any breach of security or unauthorized use of your username account. Although __name__ will not be liable for your losses caused by any unauthorized use of your username account, you will be liable for the losses of __name__ or others due to such unauthorized use.</p>",
        '<p>__name__ reserves the right to take appropriate action against any person who misrepresents his or her identity or improperly or fraudulently accesses policy information on the Site. This action may include, but is not limited to, legal action against any person accessing policy information in violation of any state or federal law or regulation.</p>',
        '<p>__name__ may use the information you provide on the Site and any other website operated by __name__, including your username account information, for any purpose, commercial or non-commercial, including without limitation for marketing purposes and for distribution of electronic mail messages to any email address provided.</p>',
        '<p>&nbsp;</p>',
        '<h3>Account Termination</h3>',
        '<p>__name__ may terminate your username account and, to the extent possible, your access to the Site if __name__ determines that you have taken any action in violation of these Terms of Use. Further, __name__ may terminate, block or otherwise inhibit access to any Site visitor __name__ deems to have violated any of these Terms of Use, including by blocking any IP address or other indication of the source of behavior, content or usage of the Site that violates these Terms of Use.</p>',
        '<p>&nbsp;</p>',
        '<h3>Limitations of Damages</h3>',
        '<p>IN NO EVENT WILL __name__, OR ITS EMPLOYEES, OFFICERS, DIRECTORS OR ANY OF ITS SUBSIDIARIES, BE LIABLE TO ANY PERSON OR ENTITY FOR ANY DIRECT, INDIRECT, SPECIAL, CONSEQUENTIAL OR OTHER DAMAGES (INCLUDING, WITHOUT LIMITATION, ANY LOST PROFITS, BUSINESS INTERRUPTION, LOSS OF INFORMATION OR PROGRAMS OR OTHER DATA ON ANY INFORMATION HANDLING SYSTEM) THAT ARE RELATED TO THE USE OF, OR THE INABILITY TO USE, ANY ASPECT OF THE SITE INCLUDING WITHOUT LIMITATION THE CONTENT AND FUNCTIONS OF THE SITE OR ANY LINKED WEBSITE, EVEN IF __name__ IS EXPRESSLY ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</p>',
        '<p>&nbsp;</p>',
        '<h3>Changes to These Terms of Use</h3>',
        '<p>__name__ reserves the right, at its sole discretion, to modify, add or remove all or any portion of these Terms of Use at any time. Changes will be effective when they are posted. Your continued use of the Site, Online Account and/or Mobile App after any changes are posted will be considered acceptance of those changes. If you do not agree to any changes, you may not continue to access or use the Site. __name__ may terminate, change, suspend or discontinue any aspect of the Site, including the availability of any features of the Site, at any time and without notice or liability. __name__ may also impose limits on certain features and services or restrict your access to all or part of the Site without notice or liability.</p>',
        '<p>&nbsp;</p>',
        '<h3>Relation to Other Agreements or Policies</h3>',
        "<p>These Terms of Use, and __name__'s Online Privacy Policy, which is hereby incorporated into and made part of these Terms of Use, constitute the entire agreement between __name__ and you with respect to your access to and use of the Site and any Content.</p>",
        '<p>&nbsp;</p>',
        '<h3>Severability</h3>',
        '<p>If for any reason any provision of these Terms of Use is ruled to be unenforceable, that provision will be enforced to the maximum extent permissible so as to affect the intent of the Terms of Use, and the remainder of the Terms of Use will continue in full force and effect.</p>',
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
.terms-of-use {
  padding: 0px 10%;
}
</style>
