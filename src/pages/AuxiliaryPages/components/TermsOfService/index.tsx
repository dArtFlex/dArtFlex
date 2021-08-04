import React from 'react'
import AuxiliaryPage from '../../index'
import { Box, Link, Typography } from '@material-ui/core'
import { useStyles } from '../../styles'
import routes from '../../../../routes'
import { NavLink } from 'react-router-dom'

export default function TermsOfService() {
  const classes = useStyles()
  const ownership = [
    'Unless otherwise indicated in writing by us, the Service and all content and other materials contained therein, including, without limitation, the dArtFlex logo and all designs, text, graphics, pictures, information, data, software, sound files, other files and the selection and arrangement thereof (collectively, “Content”) are the proprietary property of dArtFlex, licensors or users, as applicable.',
    'Notwithstanding anything to the contrary in these Terms, the Service and Content may include software components provided by dArtFlex or its affiliates or a third party that are subject to separate license terms, in which case those license terms will govern such software components.',
    'The dArtFlex logo and any dArtFlex product or service names, logos or slogans that may appear on the Service or Service are trademarks of dArtFlex or our affiliates and may not be copied, imitated or used, in whole or in part, without our prior written permission. You may not use any metatags or other “hidden text” utilizing “dArtFlex” or any other name, trademark or product or service name of dArtFlex or our affiliates without our prior written permission. In addition, the look and feel of the Service and Content, including, without limitation, all page headers, custom graphics, button icons and scripts, constitute the service mark, trademark or trade dress of dArtFlex and may not be copied, imitated or used, in whole or in part, without our prior written permission. All other trademarks, registered trademarks, product names and dArtFlex names or logos mentioned on the Service are the property of their respective owners and may not be copied, imitated or used, in whole or in part, without the permission of the applicable trademark holder. Reference to any products, services, processes or other information by name, trademark, manufacturer, supplier or otherwise does not constitute or imply endorsement, sponsorship or recommendation by dArtFlex.',
  ]
  const userConduct = [
    'Provide false or misleading information to dArtFlex;',
    'Use or attempt to use another user’s Account without authorization from such user and dArtFlex;',
    'Create or list counterfeit items;',
    'Pose as another person or create a misleading username;',
    'Use the Service in any manner that could interfere with, disrupt, negatively affect or inhibit other users from fully enjoying the Service, or that could damage, disable, overburden or impair the functioning of the Service in any manner;',
    'Develop, utilize, or disseminate any software, or interact with any API in any manner, that could damage, harm, or impair the Service;',
    'Reverse engineer any aspect of the Service, or do anything that might discover source code or bypass or circumvent measures employed to prevent or limit access to any Service, area or code of the Service;',
    'Attempt to circumvent any content-filtering techniques we employ, or attempt to access any feature or area of the Service that you are not authorized to access;',
    'Use any robot, spider, crawler, scraper, script, browser extension, offline reader or other automated means or interface not authorized by us to access the Service, extract data or otherwise interfere with or modify the rendering of Service pages or functionality;',
    'Use data collected from our Service to contact individuals, companies, or other persons or entities;',
    'Use data collected from our Service for any direct marketing activity (including without limitation, email marketing, SMS marketing, telemarketing, and direct marketing);',
    'Use the Service for any illegal or unauthorized purpose, or engage in, encourage or promote any activity that violates these Terms;',
    'Use the Ethereum Platform to carry out any illegal activities, including but not limited to money laundering, terrorist financing or deliberately engaging in activities designed to adversely affect the performance of the Ethereum Platform, or the Service;',
    'Engage in wash trading or other deceptive or manipulative trading activities;',
    'Place misleading bids or offers;',
    'Use the Service to carry out any financial activities subject to registration or licensing, including but not limited to creating, listing, or buying securities, commodities, options, real estate, or debt instruments; or',
    'Use the Service to participate in fundraising for a business, protocol, or platform, including but not limited to creating, listing, or buying assets that are redeemable for financial instruments, assets that give owners rights to participate in an ICO or any securities offering, or assets that entitle owners to financial rewards, including but not limited to, DeFi yield bonuses, stacking bonuses, and burn discounts.',
  ]
  const userConductSecondSection = [
    'An electronic communication delivered via the contact form above;',
    'An electronic signature of someone authorized to act on behalf of the copyright owner;',
    'Identification of the copyrighted work(s) allegedly infringed;',
    'Identification of material claimed to be infringing, reasonably sufficient to permit Company to locate the material;',
    'Information reasonably sufficient to permit Company to contact the complaining party. This can be an address, phone number, email address, or other suitable method of contact;',
    'A statement that the “complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent or the law; and”',
    'A statement that the information in the notice is accurate and, under penalty of perjury, that the complaining party is authorized to act on behalf of the copyright owner.',
  ]
  const risks = [
    'The prices of blockchain assets are extremely volatile. Fluctuations in the price of other digital assets could materially and adversely affect the Crypto Assets, which may also be subject to significant price volatility. We cannot guarantee that any purchasers of Crypto Assets will not lose money.',
    'You are solely responsible for determining what, if any, taxes apply to your Crypto Assets transactions. Neither dArtFlex nor any other dArtFlex Party is responsible for determining the taxes that apply to Crypto Assets transactions.',
    'Our Service does not store, send, or receive Crypto Assets. This is because Crypto Assets exist only by virtue of the ownership record maintained on its supporting blockchain. Any transfer of Crypto Assets occurs within the supporting blockchain and not on this Service.',
    'There are risks associated with using an Internet based currency, including but not limited to, the risk of hardware, software and Internet connections, the risk of malicious software introduction, and the risk that third parties may obtain unauthorized access to information stored within your wallet. You accept and acknowledge that dArtFlex will not be responsible for any communication failures, disruptions, errors, distortions or delays you may experience when using the Crypto Assets, however caused.',
    'A lack of use or public interest in the creation and development of distributed ecosystems could negatively impact the development of those ecosystems and related applications, and could therefore also negatively impact the potential utility or value of Crypto Assets.',
    'The regulatory regime governing blockchain technologies, cryptocurrencies, and tokens is uncertain, and new regulations or policies may materially adversely affect the development of the Auction and/or Service and the utility of Crypto Assets.',
    'The Service will rely on third-party platforms such as MetaMask to perform the transactions for the Auction of Crypto Assets. If we are unable to maintain a good relationship with such platform providers; if the terms and conditions or pricing of such platform providers change; if we violate or cannot comply with the terms and conditions of such platforms; or if any of such platforms loses market share or falls out of favor or is unavailable for a prolonged period of time, access to and use of the Service will suffer.',
    'There are risks associated with purchasing user generated content, including but not limited to, the risk of purchasing counterfeit assets, mislabeled assets, assets that are vulnerable to metadata decay, assets on smart contracts with bugs, and assets that may become untransferable. dArtFlex reserves the right to hide collections, contracts, and assets affected by any of these issues or by other issues. Assets you purchase may become inaccessible on dArtFlex. Under no circumstances shall the inability to view your assets on dArtFlex serve as grounds for a claim against dArtFlex.',
  ]
  return (
    <AuxiliaryPage title="Terms of Service">
      <>
        <Typography variant={'body2'} component={'div'}>
          April 27, 2021
        </Typography>
        <Typography variant={'body2'} component={'div'}>
          Last Updated: 27, 2021
        </Typography>
        <Typography className={classes.sectionTitle}>1. Introduction</Typography>
        <Typography variant={'body2'}>
          Welcome to the dArtFlex website. dArtFlex Inc. (“dArtFlex,” “we,” “us” or “our”). These Terms of Use (these
          “Terms”) govern your access to and use of the dArtFlex website; including without limitation the creation,
          purchase, sale, exchange, or modification of certain digital assets; purchase, sale of platform tokens (Please
          read DAF documentation{' '}
          <NavLink to={routes.aboutDAF} className={classes.navLink}>
            here
          </NavLink>
          ); our online services, and software provided on or in connection with those services (collectively, the
          “Service”).
          <br /> This Service also allows you to sell and purchase Crypto Assets (as defined below) via auction
          (“Auction”). You may only participate in the Auction by linking your digital wallets on supported bridge
          extensions such as MetaMask (
          <Link href={'https://metamask.io/'} className={classes.navLink}>
            https://metamask.io/
          </Link>
          ). MetaMask is an electronic wallet, which allows you to purchase, store, and engage in transactions using
          Ethereum cryptocurrency. Before putting up your unique digital asset for Auction or putting in an offer to
          purchase a unique digital asset from another user, we will ask you to download a supported electronic wallet
          extension, and connect and unlock your digital wallets with that extension. Once you submit an order to sell
          or purchase a unique digital asset, your order is passed on to the applicable extension, which completes the
          transaction on your behalf.
          <br /> “Crypto Assets” refers to unique non-fungible tokens, implemented on the Ethereum blockchain (the
          “Ethereum Platform”) using smart contracts.
          <br /> ALL TRANSACTIONS INITIATED THROUGH OUR SERVICE ARE FACILITATED AND RUN BY THIRD-PARTY ELECTRONIC WALLET
          EXTENSIONS, AND BY USING OUR SERVICES YOU AGREE THAT YOU ARE GOVERNED BY THE TERMS OF SERVICE AND PRIVACY
          POLICY FOR THE APPLICABLE EXTENSIONS. FOR METAMASK, THOSE TERMS ARE AVAILABLE AT (
          <Link href={'https://metamask.io/terms.html'} className={classes.navLink}>
            https://metamask.io/terms.html
          </Link>
          ) AND (
          <Link href={'https://metamask.io/privacy.html'} className={classes.navLink}>
            https://metamask.io/privacy.html
          </Link>
          ).
          <br /> dArtFlex IS A PLATFORM. WE ARE NOT A BROKER, FINANCIAL INSTITUTION, OR CREDITOR. THE SERVICES ARE AN
          ADMINISTRATIVE PLATFORM ONLY. dArtFlex FACILITATES TRANSACTIONS BETWEEN THE BUYER AND SELLER IN THE AUCTION
          BUT IS NOT A PARTY TO ANY AGREEMENT BETWEEN THE BUYER AND SELLER OF CRYPTO ASSETS OR BETWEEN ANY USERS.
          <br /> YOU BEAR FULL RESPONSIBILITY FOR VERIFYING THE IDENTITY, LEGITIMACY, AND AUTHENTICITY OF ASSETS YOU
          PURCHASE ON dArtFlex. NOTWITHSTANDING INDICATORS AND MESSAGES THAT SUGGEST VERIFICATION, dArtFlex MAKES NO
          CLAIMS ABOUT THE IDENTITY, LEGITIMACY, OR AUTHENTICITY OF ASSETS ON THE PLATFORM.
          <br /> Because we have a growing number of services, we sometimes need to describe additional terms for
          specific services. Those additional terms and conditions, which are available with the relevant services, then
          become part of your agreement with us if you use those services.
          <br /> THESE TERMS OF USE ARE IMPORTANT AND AFFECT YOUR LEGAL RIGHTS, SO PLEASE READ THEM CAREFULLY. WE WANT
          TO LET YOU KNOW THAT THE TERMS INCLUDE AN ARBITRATION AGREEMENT WHICH WILL, WITH LIMITED EXCEPTIONS, REQUIRE
          DISPUTES BETWEEN US TO BE SUBMITTED TO BINDING AND FINAL ARBITRATION. UNLESS YOU OPT OUT OF THE ARBITRATION
          AGREEMENT: (1) YOU WILL ONLY BE PERMITTED TO PURSUE CLAIMS AND SEEK RELIEF AGAINST US ON AN INDIVIDUAL BASIS,
          NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR REPRESENTATIVE ACTION OR PROCEEDING; AND (2) YOU ARE
          AGREEING TO MANDATORY INDIVIDUAL ARBITRATION FOR THE RESOLUTION OF DISPUTES AND WAIVING YOUR RIGHT TO A JURY
          TRIAL ON YOUR CLAIMS. PLEASE READ SECTION 15 CAREFULLY.
          <br /> BY CLICKING ON THE “I ACCEPT” BUTTON, COMPLETING THE ACCOUNT REGISTRATION PROCESS, USING OUR SERVICES
          AND/OR PURCHASING CRYPTO ASSETS, YOU AGREE TO BE BOUND BY THESE TERMS AND ALL OF THE TERMS INCORPORATED HEREIN
          BY REFERENCE. If you do not agree to these Terms, you may not access or use the Service or purchase the Crypto
          Assets.
          <br /> dArtFlex reserves the right to change or modify these Terms at any time and at our sole discretion. If
          we make changes to these Terms, we will provide notice of such changes, such as by sending an email
          notification, providing notice through the Service or updating the “Last Updated” date at the beginning of
          these Terms. By continuing to access or use the Service, you confirm your acceptance of the revised Terms and
          all of the terms incorporated therein by reference. We encourage you to review the Terms frequently to ensure
          that you understand the terms and conditions that apply when you access or use the Service. If you do not
          agree to the revised Terms, you may not access or use the Service.
        </Typography>
        <Typography className={classes.sectionTitle}>2. Privacy Policy</Typography>
        <Typography variant={'body2'}>
          Please refer to our{' '}
          <NavLink to={routes.privacyPolicy} className={classes.navLink}>
            Privacy Policy
          </NavLink>{' '}
          for information about how we collect, use and share personal information about you.
        </Typography>
        <Typography className={classes.sectionTitle}>3. Account Registration and Communication Preferences</Typography>
        <ul className={classes.unorderedListInitial}>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              If you wish to participate in an Auction for Crypto Assets, you will need to register for an account on
              the Service (“Account”). By creating an Account, you agree to (a) provide accurate, current and complete
              Account information about yourself, (b) maintain and promptly update from time to time as necessary your
              Account information, (c) and accept all risks of unauthorized access to your Account and the information
              you provide to us, and (d) immediately notify us if you discover or otherwise suspect any security
              breaches related to the Service, or your Account. dArtFlex will block multiple accounts of the same user.
              Also, you agree that you will not:
            </Typography>
          </li>
        </ul>
        <ol className={classes.sectionList}>
          <li>
            <Typography variant={'body2'} component={'span'}>
              create another account if we’ve disabled one you had unless you have our written permission first;
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              buy, sell, rent or lease access to your Account or username unless you have our written permission first;
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              share your Account password with anyone; or
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              log in or try to log in to access the Service through unauthorized third party applications or clients.
            </Typography>
          </li>
        </ol>
        <ul className={classes.unorderedListInitial}>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              dArtFlex may require you to provide additional information and documents at the request of any competent
              authority or in case of application of any applicable law or regulation, including laws related to
              anti-laundering (legalization) of incomes obtained by criminal means, or for counteracting financing of
              terrorism. dArtFlex may also require you to provide additional information and documents in cases where it
              has reasons to believe that:
            </Typography>
          </li>
        </ul>
        <ol className={classes.sectionList}>
          <li>
            <Typography variant={'body2'} component={'span'}>
              Your Account is being used for money laundering or for any other illegal activity;
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              You have concealed or reported false identification information and other details; or
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              Transactions effected via your Account were affected in breach of these Terms.
            </Typography>
          </li>
        </ol>
        <ul className={classes.unorderedListInitial}>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              In such cases, dArtFlex, in its sole discretion, may pause or cancel your Auction transactions until such
              additional information and documents are reviewed by dArtFlex and accepted as satisfying the requirements
              of applicable law. If you do not provide complete and accurate information and documents in response to
              such a request, dArtFlex may refuse to provide the Content (defined in Section 4(A) below) to you.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              By creating an Account, you consent to receive electronic communications from dArtFlex (e.g., via email or
              by posting notices to the Service). These communications may include notices about your Account (e.g.,
              transactional information) and are part of your relationship with us. You agree that any notices,
              agreements, disclosures or other communications that we send to you electronically will satisfy any legal
              communication requirements, including, but not limited to, that such communications be in writing. You
              should maintain copies of electronic communications from us by printing a paper copy or saving an
              electronic copy. We may also send you promotional communications via email, including, but not limited to,
              newsletters, special offers, surveys and other news and information we think will be of interest to you.
              You may opt out of receiving these promotional emails at any time by following the unsubscribe
              instructions provided therein.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              By submitting personal data through our Site or Services, you agree to the terms of our{' '}
              <NavLink to={routes.privacyPolicy} className={classes.navLink}>
                Privacy Policy
              </NavLink>{' '}
              and you expressly consent to the collection, use and disclosure of your personal data in accordance with
              the{' '}
              <NavLink to={routes.privacyPolicy} className={classes.navLink}>
                Privacy Policy
              </NavLink>
              .
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              You must provide all equipment and software necessary to connect to the Service and services, including
              but not limited to, a mobile device that is suitable to connect with and use Service and services, in
              cases where the Service offers a mobile component. You are solely responsible for any fees, including
              Internet connection or mobile fees, that you incur when accessing the Service or services.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              4(b) Notwithstanding anything to the contrary in these Terms, the Service and Content may include software
              components provided by dArtFlex or a third party that are subject to separate license terms, in which case
              those license terms will govern such software components. For example, when you click to get more details
              about any of the Crypto Assets sold through our marketplace, you will notice a third party link to the
              website from which such Crypto Asset originated. Such websites may include license terms governing the use
              of such Crypto Asset. In the event you purchase such Crypto Asset through our marketplace, you are
              required to comply with such terms.
            </Typography>
          </li>
        </ul>
        <Typography className={classes.sectionTitle}>4. Ownership</Typography>
        <ul className={classes.unorderedListInitial}>
          {ownership.map((item, index) => {
            return (
              <li className={classes.unorderedListItem} key={index}>
                <Typography variant={'body2'}>{item}</Typography>
              </li>
            )
          })}
        </ul>
        <Typography className={classes.sectionTitle}>5. License to Access and Use Our Service and Content</Typography>
        <Typography variant={'body2'}>
          You are hereby granted a limited, nonexclusive, non transferable, non sublicensable, and personal license to
          access and use the Service and Content; provided, however, that such license is subject to these Terms and
          does not include any right to (a) sell, resell or use commercially the Service or Content, (b) distribute,
          publicly perform or publicly display any Content, (c) modify or otherwise make any derivative uses of the
          Service or Content, or any portion thereof, (d) use any data mining, robots or similar data gathering or
          extraction methods, (e) download (other than page caching) any portion of the Service or Content, except as
          expressly permitted by us, and (f) use the Service or Content other than for their intended purposes.
        </Typography>
        <Typography className={classes.sectionTitle}>6. Hyperlinks</Typography>
        <Typography variant={'body2'}>
          You are granted a limited, nonexclusive, nontransferable right to create a text hyperlink to the Service for
          noncommercial purposes, provided that such link does not portray dArtFlex or our affiliates or any of our
          products or services in a false, misleading, derogatory or otherwise defamatory manner, and provided further
          that the linking site does not contain any adult or illegal material or any material that is offensive,
          harassing or otherwise objectionable. This limited right may be revoked at any time. You may not use a logo or
          other proprietary graphic of dArtFlex to link to the Service or Content without our express written
          permission. Further, you may not use, frame or utilize framing techniques to enclose any dArtFlex trademark,
          logo or other proprietary information, including the images found on the Service, the content of any text or
          the layout or design of any page, or form contained on a page, on the Service without our express written
          consent.
        </Typography>
        <Typography className={classes.sectionTitle}>7. Third Party Services</Typography>
        <Typography variant={'body2'}>
          The Service may contain links to third-party websites (“Third-Party Websites”) and applications (“Third-Party
          Applications”). When you click on a link to a Third-Party Website or Third-Party Application, we will not warn
          you that you have left our Service and are subject to the Terms and conditions (including privacy policies) of
          another website or destination. Such Third-Party Websites and Third-Party Applications are not under the
          control of dArtFlex. dArtFlex is not responsible for any Third-Party Websites or Third-Party Applications.
          dArtFlex provides these Third-Party Websites and Third-Party Applications only as a convenience and does not
          review, approve, monitor, endorse, warrant, or make any representations with respect to Third-Party Websites
          or Third-Party Applications, or their products or services. You use all links in Third-Party Websites, and
          Third-Party Applications at your own risk. When you leave our Service, our Terms and policies no longer
          govern. You should review all applicable agreements and policies, including privacy and data gathering
          practices, of any Third-Party Websites or Third-Party Applications, and should make whatever investigation you
          feel necessary or appropriate before proceeding with any transaction with any third party.
        </Typography>
        <Typography className={classes.sectionTitle}>8. User Conduct</Typography>
        <Typography variant={'body2'}>
          You agree that you will not violate any law, contract, intellectual property or other third party right, and
          that you are solely responsible for your conduct, while accessing or using the Service or participating in the
          Auction. You agree that you will abide by these Terms and will not:
        </Typography>
        <ul className={classes.unorderedListInitial}>
          {userConduct.map((item, index) => {
            return (
              <li className={classes.unorderedListItem} key={index}>
                <Typography variant={'body2'}>{item}</Typography>
              </li>
            )
          })}
        </ul>
        <Typography variant={'body2'}>
          dArtFlex facilitates trade among a diverse community of buyers and sellers. Openness is one of our most prized
          values, and we&apos;re committed to providing a platform for the exchange of a wide range of content,
          including controversial content. These policies ensure that our marketplace offers the widest selection of
          assets possible while promoting trust and respect, as well as adherence to the law. <br /> dArtFlex has always
          exercised judgment in allowing or disallowing certain assets, listings, smart contracts, and collections
          consistent with the spirit of openness in a worldwide community of users of a radical new technology. We
          carefully consider the complete situation and all its details in light of our policies before deciding to
          remove inappropriate assets, listings, smart contracts, and collections when we discover them or they&apos;re
          brought to our attention. <br /> Assets, listings, smart contracts, and collections that dArtFlex deems
          inappropriate, disruptive, or illegal are prohibited on dArtFlex. dArtFlex reserves the rights to determine
          the appropriateness of listings on its site and remove any listing at any time. If you create or offer an
          asset, listing, smart contract, or collection in violation of these policies, we will take corrective actions,
          as appropriate, including but not limited to removing the asset, listing, smart contract, or collection,
          deleting your dArtFlex account, and permanently withholding referral payments and developer revenue sharing
          fees. dArtFlex cannot destroy or impound your assets or smart contracts, but we reserve the right to destroy
          inappropriate metadata stored on our servers. <br /> Assets, listings, smart contracts, and collections that
          include metadata that violates international or United States intellectual property laws, promotes suicide or
          self-harm, incites hate or violence against others, degrades or doxes another individual, depicts minors in
          sexually suggestive situations, or is otherwise illegal in the United States are prohibited on dArtFlex and
          will be removed. <br /> Assets, listings, smart contracts, and collections with a primary or substantial
          purpose in a game or application that violates international or United States intellectual property laws,
          promotes suicide or self-harm, incites hate or violence against others, degrades or doxes another individual,
          depicts minors in sexually suggestive situations, or is otherwise illegal in the United States are prohibited
          on dArtFlex and will be removed. <br /> Assets, listings, smart contracts, and collections created or used
          primarily or substantially for the purpose of raising funds for the known terrorist organizations listed on{' '}
          <Link href={'https://www.state.gov/foreign-terrorist-organizations/'} className={classes.navLink}>
            https://www.state.gov/foreign-terrorist-organizations/
          </Link>{' '}
          are prohibited on dArtFlex and will be removed. <br /> The sale of stolen assets, assets taken without
          authorization, and otherwise illegally obtained assets on dArtFlex is prohibited. If you have reason to
          believe that an asset listed on dArtFlex was illegally obtained, please contact us immediately. Listing
          illegally obtained assets may result in your listings being cancelled, your assets being hidden, or your
          account being suspended. We require all users to be 18 years old or older. If you are under 18, you may use a
          parent or guardian&apos;s dArtFlex account, but only with involvement of the account holder. However, the
          account holder is responsible for everything done with that account. NSFW content is meant for people who are
          18 years and older. We allow the sale of this content, but it is subject to being marked NSFW and handled
          differently than non-NSFW content in navigation menus and search results. Asset names, listings and their
          descriptions, smart contract names, and collections including profanity or overtly sexual content are
          prohibited on dArtFlex and will be removed. A smart contract that contains NSFW content is subject to being
          marked NSFW, even if the NSFW content only represents a portion of the content on the smart contract.
          <br />
          Do not create or list illegal or offensive content, such as products that depict graphic sexual acts and
          images that depict children under the age of 18 in a sexually suggestive manner. Do not use profanity or
          graphic language in any content you list or create on dArtFlex.
          <br /> Bottom line about NSFW content: it&apos;s permitted on dArtFlex, but we&apos;re going to do our best to
          keep it out of the high traffic areas and if it&apos;s extreme in any way, we&apos;ll probably remove it.
          <br /> If you become aware of the creation, listing, or buying of assets in violation of any of the terms
          specified in this section, you shall contact us{' '}
          <NavLink to={'#'} className={classes.navLink}>
            here
          </NavLink>{' '}
          to report it. Creators bear special responsibility for informing dArtFlex of the existence of their
          collections, contracts, and assets that violate these terms.
        </Typography>
        <Typography className={classes.sectionTitle}>9. User Information and Copyright</Typography>
        <Typography variant={'body2'}>
          You are solely responsible for your use of the Services and for any User Information you provide, including
          compliance with applicable laws, rules, and regulations. We take no responsibility for the User Information
          posted or listed via the Services. You retain your rights to any User Information you submit, post, or display
          using the Services. <br /> By submitting, posting or displaying User Information on or through the Services,
          you grant us a worldwide, non-exclusive, sublicensable, royalty-free license to use, copy, modify, and display
          any text, content, files, communications, comments, feedback, suggestions, ideas, concepts, questions, data or
          other content that you submit or post on or through the Services or through tools or applications we provide
          for posting or sharing such content (collectively “User Information”) for our lawful business purposes,
          including to provide, promote, and improve the Services.
          <br /> dArtFlex does not claim that submitting, posting or displaying User Information on or through the
          Services gives dArtFlex any ownership or resale rights in your User Information. We&apos;re not saying we own
          it or will resell it. We&apos;re just saying we might show it off a bit.
          <br /> You represent and warrant that you have, or have obtained, all rights, licenses, consents, permissions,
          power and/or authority necessary to grant the rights granted herein for any User Information that you submit,
          post or display on or through the Services.
          <br /> You agree that such User Information will not contain material subject to copyright or other
          proprietary rights, unless you have necessary permission or are otherwise legally entitled to post the
          material and to grant dArtFlex the license described above.
          <br /> dArtFlex reserves the right to remove content without prior notice. dArtFlex will take down works in
          response to formal infringement claims and will terminate a user&apos;s access to the Services if the user is
          determined to be a repeat infringe.
          <br /> If you believe that your content has been copied in a way that constitutes copyright infringement,
          please report this by contacting us here with the subject line “Violation Report / Concerns / Complaints”.
          <br />
          Formal infringement claims regarding content on the Services must include:
        </Typography>
        <ul className={classes.unorderedListInitial}>
          {userConductSecondSection.map((item, index) => {
            return (
              <li className={classes.unorderedListItem} key={index}>
                <Typography variant={'body2'}>{item}</Typography>
              </li>
            )
          })}
        </ul>
        <Typography className={classes.sectionTitle}>10. Indemnification</Typography>
        <Typography variant={'body2'}>
          To the fullest extent permitted by applicable law, you agree to indemnify, defend and hold harmless dArtFlex,
          and our respective past, present and future employees, officers, directors, contractors, consultants, equity
          holders, suppliers, vendors, service providers, parent companies, subsidiaries, affiliates, agents,
          representatives, predecessors, successors and assigns (individually and collectively, the “dArtFlex Parties”),
          from and against all actual or alleged third party claims, damages, awards, judgments, losses, liabilities,
          obligations, penalties, interest, fees, expenses (including, without limitation, attorneys’ fees and expenses)
          and costs (including, without limitation, court costs, costs of settlement and costs of pursuing
          indemnification and insurance), of every kind and nature whatsoever, whether known or unknown, foreseen or
          unforeseen, matured or unmatured, or suspected or unsuspected, in law or equity, whether in tort, contract or
          otherwise (collectively, “Claims”), including, but not limited to, damages to property or personal injury,
          that are caused by, arise out of or are related to (a) your use or misuse of the Service, User Information or
          Crypto Assets, (b) any feedback you provide, (c) your violation of these Terms, and (d) your violation of the
          rights of a third party, including another user or MetaMask. You agree to promptly notify dArtFlex of any
          third party Claims and cooperate with the dArtFlex Parties in defending such Claims. You further agree that
          the dArtFlex Parties shall have control of the defense or settlement of any third party Claims. THIS INDEMNITY
          IS IN ADDITION TO, AND NOT IN LIEU OF, ANY OTHER INDEMNITIES SET FORTH IN A WRITTEN AGREEMENT BETWEEN YOU AND
          dArtFlex.
        </Typography>
        <Typography className={classes.sectionTitle}>11. Disclaimers</Typography>
        <Typography variant={'body2'}>
          EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN A WRITING BY dArtFlex, THE SERVICE, CONTENT CONTAINED THEREIN,
          AND CRYPTO ASSETS LISTED THEREIN ARE PROVIDED ON AN “AS IS” AND “AS AVAILABLE” BASIS WITHOUT WARRANTIES OR
          CONDITIONS OF ANY KIND, EITHER EXPRESS OR IMPLIED. dArtFlex (AND ITS SUPPLIERS) MAKE NO WARRANTY THAT THE
          SERVICE: (A) WILL MEET YOUR REQUIREMENTS; (B) WILL BE AVAILABLE ON AN UNINTERRUPTED, TIMELY, SECURE, OR
          ERROR-FREE BASIS; OR (C) WILL BE ACCURATE, RELIABLE, COMPLETE, LEGAL, OR SAFE. dArtFlex DISCLAIMS ALL OTHER
          WARRANTIES OR CONDITIONS, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION, IMPLIED WARRANTIES OR CONDITIONS
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE AND NON-INFRINGEMENT AS TO THE SERVICE, CONTENT
          CONTAINED THEREIN. dArtFlex DOES NOT REPRESENT OR WARRANT THAT CONTENT ON THE SERVICE IS ACCURATE, COMPLETE,
          RELIABLE, CURRENT OR ERROR-FREE. WE WILL NOT BE LIABLE FOR ANY LOSS OF ANY KIND FROM ANY ACTION TAKEN OR TAKEN
          IN RELIANCE ON MATERIAL OR INFORMATION, CONTAINED ON THE SERVICE. WHILE dArtFlex ATTEMPTS TO MAKE YOUR ACCESS
          TO AND USE OF THE SERVICE AND CONTENT SAFE, dArtFlex CANNOT AND DOES NOT REPRESENT OR WARRANT THAT THE
          SERVICE, CONTENT, ANY CRYPTO ASSETS LISTED ON OUR SERVICE OR OUR SERVERS ARE FREE OF VIRUSES OR OTHER HARMFUL
          COMPONENTS. WE CANNOT GUARANTEE THE SECURITY OF ANY DATA THAT YOU DISCLOSE ONLINE. YOU ACCEPT THE INHERENT
          SECURITY RISKS OF PROVIDING INFORMATION AND DEALING ONLINE OVER THE INTERNET AND WILL NOT HOLD US RESPONSIBLE
          FOR ANY BREACH OF SECURITY UNLESS IT IS DUE TO OUR GROSS NEGLIGENCE.
          <br /> WE WILL NOT BE RESPONSIBLE OR LIABLE TO YOU FOR ANY LOSS AND TAKE NO RESPONSIBILITY FOR, AND WILL NOT
          BE LIABLE TO YOU FOR, ANY USE OF CRYPTO ASSETS, INCLUDING BUT NOT LIMITED TO ANY LOSSES, DAMAGES OR CLAIMS
          ARISING FROM: (A) USER ERROR SUCH AS FORGOTTEN PASSWORDS, INCORRECTLY CONSTRUCTED TRANSACTIONS, OR MISTYPED
          ADDRESSES; (B) SERVER FAILURE OR DATA LOSS; (C) CORRUPTED WALLET FILES; (D) UNAUTHORIZED ACCESS TO
          APPLICATIONS; (E) ANY UNAUTHORIZED THIRD PARTY ACTIVITIES, INCLUDING WITHOUT LIMITATION THE USE OF VIRUSES,
          PHISHING, BRUTEFORCING OR OTHER MEANS OF ATTACK AGAINST THE SERVICE OR CRYPTO ASSETS.
          <br /> CRYPTO ASSETS ARE INTANGIBLE DIGITAL ASSETS. THEY EXIST ONLY BY VIRTUE OF THE OWNERSHIP RECORD
          MAINTAINED IN THE ETHEREUM NETWORK. ANY TRANSFER OF TITLE THAT MIGHT OCCUR IN ANY UNIQUE DIGITAL ASSET OCCURS
          ON THE DECENTRALIZED LEDGER WITHIN THE ETHEREUM PLATFORM. WE DO NOT GUARANTEE THAT dArtFlex OR ANY dArtFlex
          PARTY CAN EFFECT THE TRANSFER OF TITLE OR RIGHT IN ANY CRYPTO ASSETS.
          <br /> dArtFlex is not responsible for sustained casualties due to vulnerability or any kind of failure,
          abnormal behavior of software (e.g., wallet, smart contract), blockchains or any other features of the Crypto
          Assets. dArtFlex is not responsible for casualties due to late reports by developers or representatives (or no
          report at all) of any issues with the blockchain supporting Crypto Assets including forks, technical node
          issues or any other issues having fund losses as a result.
          <br /> Nothing in these Terms shall exclude or limit liability of either party for fraud, death or bodily
          injury caused by negligence, violation of laws, or any other activity that cannot be limited or excluded by
          legitimate means.
          <br /> SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES IN CONTRACTS WITH CONSUMERS, SO THE
          ABOVE EXCLUSION MAY NOT APPLY TO YOU.
        </Typography>
        <Typography className={classes.sectionTitle}>12. Assumption of Risk</Typography>
        <Typography variant={'body2'}>You accept and acknowledge:</Typography>
        <ul className={classes.unorderedListInitial}>
          {risks.map((item, index) => {
            return (
              <li className={classes.unorderedListItem} key={index}>
                <Typography variant={'body2'}>{item}</Typography>
              </li>
            )
          })}
        </ul>
        <Typography className={classes.sectionTitle}>13. Limitation of Liability</Typography>
        <Typography variant={'body2'}>
          TO THE FULLEST EXTENT PERMITTED BY LAW, IN NO EVENT WILL dArtFlex BE LIABLE TO YOU OR ANY THIRD PARTY FOR ANY
          LOST PROFIT OR ANY INDIRECT, CONSEQUENTIAL, EXEMPLARY, INCIDENTAL, SPECIAL OR PUNITIVE DAMAGES ARISING FROM
          THESE TERMS, THE SERVICE, PRODUCTS OR THIRD PARTY SITES AND PRODUCTS, OR FOR ANY DAMAGES RELATED TO LOSS OF
          REVENUE, LOSS OF PROFITS, LOSS OF BUSINESS OR ANTICIPATED SAVINGS, LOSS OF USE, LOSS OF GOODWILL, OR LOSS OF
          DATA, AND WHETHER CAUSED BY TORT (INCLUDING NEGLIGENCE), BREACH OF CONTRACT, OR OTHERWISE, EVEN IF FORESEEABLE
          AND EVEN IF dArtFlex HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. ACCESS TO, AND USE OF, THE SERVICES,
          PRODUCTS OR THIRD PARTY SITES AND PRODUCTS ARE AT YOUR OWN DISCRETION AND RISK, AND YOU WILL BE SOLELY
          RESPONSIBLE FOR ANY DAMAGE TO YOUR COMPUTER SYSTEM OR MOBILE DEVICE OR LOSS OF DATA RESULTING THEREFROM.
          <br />
          NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO EVENT SHALL THE MAXIMUM AGGREGATE LIABILITY
          OF dArtFlex ARISING OUT OF OR IN ANY WAY RELATED TO THESE TERMS, THE ACCESS TO AND USE OF THE SERVICE,
          CONTENT, CRYPTO ASSETS, OR ANY PRODUCTS OR SERVICES PURCHASED ON THE SERVICE EXCEED THE GREATER OF (A) $100 OR
          (B) THE AMOUNT RECEIVED BY dArtFlex FROM THE SALE OF CRYPTO ASSETS THAT ARE THE SUBJECT OF THE CLAIM.
          <br /> THE FOREGOING LIMITATIONS OF LIABILITY SHALL NOT APPLY TO LIABILITY OF dArtFlex FOR (A) DEATH OR
          PERSONAL INJURY CAUSED BY A MEMBER OF dArtFlex’S NEGLIGENCE; OR FOR (B) ANY INJURY CAUSED BY A MEMBER OF
          dArtFlex’S FRAUD OR FRAUDULENT MISREPRESENTATION.
          <br /> Some jurisdictions do not allow the exclusion or limitation of incidental or consequential damages, so
          the above limitation or exclusion may not apply to you. Some jurisdictions also limit disclaimers or
          limitations of liability for personal injury from consumer products, so this limitation may not apply to
          personal injury claims.
        </Typography>
        <Typography className={classes.sectionTitle}>14. Modifications to the Service</Typography>
        <Typography variant={'body2'}>
          We reserve the right in our sole discretion to modify, suspend or discontinue, temporarily or permanently, the
          Services (or any features or parts thereof) or suspend or discontinue the Auction at any time and without
          liability therefore.
        </Typography>
        <Typography className={classes.sectionTitle}>15. Dispute Resolution; Arbitration.</Typography>
        <ul className={classes.unorderedListInitial}>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Dispute Resolution. Please read the following arbitration agreement in this Section (“Arbitration
              Agreement”) carefully. It requires you to arbitrate disputes with dArtFlex and limits the manner in which
              you can seek relief from us.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Applicability of Arbitration Agreement. You agree that any dispute or claim relating in any way to your
              access or use of the Service, to any products sold or distributed through the Service, or to any aspect of
              your relationship with dArtFlex, will be resolved by binding arbitration, rather than in court, except
              that (1) you may assert claims in small claims court if your claims qualify; and (2) you or dArtFlex may
              seek equitable relief in court for infringement or other misuse of intellectual property rights (such as
              trademarks, trade dress, domain names, trade secrets, copyrights, and patents).
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Arbitration Rules and Forum. The Federal Arbitration Act governs the interpretation and enforcement of
              this Arbitration Agreement. To begin an arbitration proceeding, you must send a letter requesting
              arbitration and describing your claim by contacting us{' '}
              <NavLink to={'#'} className={classes.navLink}>
                here
              </NavLink>{' '}
              with the subject line &quot;Violation Report / Concerns / Complaints&quot;. The arbitration will be
              conducted by JAMS, an established alternative dispute resolution provider. Disputes involving claims and
              counterclaims under $250,000, not inclusive of attorneys’ fees and interest, shall be subject to JAMS’s
              most current version of the Streamlined Arbitration Rules and procedures available at
              http://www.jamsadr.com/rules-streamlined-arbitration/; all other claims shall be subject to JAMS’s most
              current version of the Comprehensive Arbitration Rules and Procedures, available at
              http://www.jamsadr.com/rules-comprehensive-arbitration/. JAMS’s rules are also available at jamsadr.com or
              by calling JAMS at 800-352- 5267. If JAMS is not available to arbitrate, the parties will select an
              alternative arbitral forum. If the arbitrator finds that you cannot afford to pay JAMS’s filing,
              administrative, hearing and/or other fees and cannot obtain a waiver from JAMS, dArtFlex will pay them for
              you. In addition, dArtFlex will reimburse all such JAMS’s filing, administrative, hearing and/or other
              fees for claims totaling less than $10,000 unless the arbitrator determines the claims are frivolous. You
              may choose to have the arbitration conducted by telephone, based on written submissions, or in person in
              the country where you live or at another mutually agreed location. Any judgment on the award rendered by
              the arbitrator may be entered in any court of competent jurisdiction.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Authority of Arbitrator. The arbitrator shall have exclusive authority to (a) determine the scope and
              enforceability of this Arbitration Agreement and (b) resolve any dispute related to the interpretation,
              applicability, enforceability or formation of this Arbitration Agreement including, but not limited to any
              claim that all or any part of this Arbitration Agreement is void or voidable. The arbitration will decide
              the rights and liabilities, if any, of you and dArtFlex. The arbitration proceeding will not be
              consolidated with any other matters or joined with any other cases or parties. The arbitrator shall have
              the authority to grant motions dispositive of all or part of any claim. The arbitrator shall have the
              authority to award monetary damages and to grant any non- monetary remedy or relief available to an
              individual under applicable law, the arbitral forum’s rules, and the Terms (including the Arbitration
              Agreement). The arbitrator shall issue a written award and statement of decision describing the essential
              findings and conclusions on which the award is based, including the calculation of any damages awarded.
              The arbitrator has the same authority to award relief on an individual basis that a judge in a court of
              law would have. The award of the arbitrator is final and binding upon you and us.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Waiver of Jury Trial. YOU AND dArtFlex HEREBY WAIVE ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN
              COURT AND HAVE A TRIAL IN FRONT OF A JUDGE OR A JURY. You and dArtFlex are instead electing that all
              claims and disputes shall be resolved by arbitration under this Arbitration Agreement, except as specified
              in Section 14(B) above. An arbitrator can award on an individual basis the same damages and relief as a
              court and must follow these Terms as a court would. However, there is no judge or jury in arbitration, and
              court review of an arbitration award is subject to very limited review.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Waiver of Class or Other Non-Individualized Relief. ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS
              ARBITRATION AGREEMENT MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A OR COLLECTIVE CLASS BASIS,
              ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND CLAIMS OF MORE THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR
              CONSOLIDATED WITH THOSE OF ANY OTHER CUSTOMER OR USER. If a decision is issued stating that applicable law
              precludes enforcement of any part of this subsection’s limitations as to a given claim for relief, then
              that claim must be severed from the arbitration and brought in the state or federal courts located in the
              State of Delaware. All other claims shall be arbitrated.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              30-Day Right to Opt Out. You have the right to opt out of the provisions of this Arbitration Agreement by
              sending written notice of your decision to opt out via the{' '}
              <NavLink to={'#'} className={classes.navLink}>
                following form
              </NavLink>{' '}
              with the subject line “Violation Report / Concerns / Complaints”, within 30 days after first becoming
              subject to this Arbitration Agreement. Your notice must include your name and address, the email address
              you used to set up your account (if you have one), and an unequivocal statement that you want to opt out
              of this Arbitration Agreement. If you opt out of this Arbitration Agreement, all other parts of these
              Terms will continue to apply to you. Opting out of this Arbitration Agreement has no effect on any other
              arbitration agreements that you may currently have, or may enter in the future, with us.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Severability. Except as provided in Section 15(E), if any part or parts of this Arbitration Agreement are
              found under the law to be invalid or unenforceable, then such specific part or parts shall be of no force
              and effect and shall be severed and the remainder of the Arbitration Agreement shall continue in full
              force and effect.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Survival of Agreement. This Arbitration Agreement will survive the termination of your relationship with
              dArtFlex.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              Modification. Notwithstanding any provision in these Terms to the contrary, we agree that if dArtFlex
              makes any future material change to this Arbitration Agreement, you may reject that change within thirty
              (30) days of such change becoming effective by writing to dArtFlex via the{' '}
              <NavLink to={'#'} className={classes.navLink}>
                following form
              </NavLink>{' '}
              with the subject line “Violation Report / Concerns / Complaints”.
            </Typography>
          </li>
        </ul>
        <Typography className={classes.sectionTitle}>16. Governing Law and Venue</Typography>
        <Typography variant={'body2'}>
          These Terms, your access to and use of the Service and Content, and your participation in the Auction shall be
          governed by and construed and enforced in accordance with the laws of the State of California, without regard
          to conflict of law rules or principles of the State of California, or any other jurisdiction) that would cause
          the application of the laws of any other jurisdiction that would cause the application of the laws of any
          other jurisdiction. Any dispute between the parties that is not subject to arbitration or cannot be heard in
          small claims court, shall be resolved in the state or federal courts of San Francisco County in the State of
          California, and the United States, respectively, sitting in the State of California.
        </Typography>
        <Typography className={classes.sectionTitle}>17. Termination</Typography>
        <Typography variant={'body2'}>
          Notwithstanding anything contained in these Terms, we reserve the right, without notice and in our sole
          discretion, to terminate your right to access or use the Service at any time and for any or no reason, and you
          acknowledge and agree that we shall have no liability or obligation to you in such event and that you will not
          be entitled to a refund of any amounts that you have already paid to us, to the fullest extent permitted by
          applicable law.
        </Typography>
        <Typography className={classes.sectionTitle}>18. Severability</Typography>
        <Typography variant={'body2'}>
          If any term, clause or provision of these Terms is held invalid or unenforceable, then that term, clause or
          provision will be severable from these Terms and will not affect the validity or enforceability of any
          remaining part of that term, clause or provision, or any other term, clause or provision of these Terms.
        </Typography>
        <Typography className={classes.sectionTitle}>19. Survival</Typography>
        <Typography variant={'body2'}>
          The following sections will survive the expiration or termination of these Terms and the termination of your
          Account: all defined terms and Sections 1-4 and 7-19.
        </Typography>
        <Typography className={classes.sectionTitle}>18. Severability</Typography>
        <Typography variant={'body2'}>
          These Terms constitute the entire agreement between you and dArtFlex relating to your access to and use of the
          Services and Content, and your participation in the Auction. These Terms, and any rights and licenses granted
          hereunder, may not be transferred or assigned by you without the prior written consent of dArtFlex prior,
          concurrent or subsequent circumstance, and dArtFlex’s failure to assert any right or provision under these
          Terms shall not constitute a waiver of such right or provision. Except as otherwise provided herein, these
          Terms are intended solely for the benefit of the parties and are not intended to confer third party
          beneficiary rights upon any other person or entity.
        </Typography>
        <Typography variant={'body2'}>END OF AGREEMENT</Typography>
      </>
    </AuxiliaryPage>
  )
}
