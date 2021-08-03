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
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'}>
              In such cases, dArtFlex, in its sole discretion, may pause or cancel your Auction transactions until such
              additional information and documents are reviewed by dArtFlex and accepted as satisfying the requirements
              of applicable law. If you do not provide complete and accurate information and documents in response to
              such a request, dArtFlex may refuse to provide the Content (defined in Section 4(A) below) to you.
            </Typography>
          </li>
        </ul>
      </>
    </AuxiliaryPage>
  )
}
