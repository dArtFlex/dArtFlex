import React from 'react'
import AuxiliaryPage from '../../index'
import { Box, Link, Typography } from '@material-ui/core'
import { useStyles } from '../../styles'
import routes from '../../../../routes'
import { NavLink } from 'react-router-dom'

export default function TermsOfService() {
  const registrationCommunicationPrefs = [
    {
      mainInfo:
        'If you wish to participate in an Auction for Crypto Assets, you will need to register for an account on the Service (“Account”). By creating an Account, you agree to (a) provide accurate, current and complete Account information about yourself, (b) maintain and promptly update from time to time as necessary your Account information, (c) and accept all risks of unauthorized access to your Account and the information you provide to us, and (d) immediately notify us if you discover or otherwise suspect any security breaches related to the Service, or your Account. dArtFlex will block multiple accounts of the same user. Also, you agree that you will not:',
    },
  ]
  const classes = useStyles()
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
      </>
    </AuxiliaryPage>
  )
}
