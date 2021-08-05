import React from 'react'
import { useStyles } from '../../styles'
import { Link, Typography } from '@material-ui/core'
import AuxiliaryPage from '../../index'

export default function PrivacyPolicy() {
  const informationCollectedParagraph = [
    'Information Collected by Our Servers. To make our Service more useful to you, our servers (which may be hosted by a third-party service provider) collect information from you, including your browser type, operating system, Internet Protocol (“IP”) address (a number that is automatically assigned to your computer when you use the Internet, which may vary from session to session), domain name, Ethereum address, wallet type, and/or a date/time stamp for your visit.',
    'Log Files. As is true of most websites, we gather certain information automatically and store it in log files. This information includes IP addresses, browser type, Internet service provider (“ISP”), referring/exit pages, operating system, date/time stamp, and clickstream data. We use this information to analyze trends, administer the Service, track users’ movements around the Service, gather demographic information about our user base as a whole, and better tailor our Services to our users’ needs. For example, some of the information may be collected so that when you visit the Service, it will recognize you and the information could then be used to serve advertisements and other information appropriate to your interests.',
    'Cookies. Like many online services, we use cookies to collect information. “Cookies” are small pieces of information that a website sends to your computer’s hard drive while you are viewing the website. We may use both session Cookies (which expire once you close your web browser) and persistent Cookies (which stay on your computer until you delete them) to provide you with a more personal and interactive experience on our Service. This type of information is collected to make the Service more useful to you and to tailor the experience with us to meet your special interests and needs.',
    'Pixel Tags are tiny graphic images with a unique identifier, similar in function to Сookies, that are used to track the online movements of Web users. In contrast to Cookies, which are stored on a user’s computer hard drive, Pixel Tags are embedded invisibly in Web pages. Pixel Tags also allow us to send e-mail messages in a format, users can read, and they tell us whether emails have been opened to ensure that we are sending only messages that are of interest to our users. We may use this information to reduce or eliminate messages sent to a user. We do not tie the information gathered by Pixel Tags to our users’ Personal Data.',
    'How We Respond to Do Not Track Signals. We do not currently respond to “do not track” signals or other mechanisms that might enable Users to opt-out of tracking on our site.',
  ]

  const personalDataParagraph = [
    'Third-Party Service Providers. We may share your Personal Data with third-party service providers to provide you with the Services that we offer you through our Service; to conduct quality assurance testing; to facilitate the creation of accounts; to provide technical support; and/or to provide other services to the dArtFlex.',
    'Affiliates. We may share some or all of your Personal Data with our subsidiaries, joint ventures, or other companies under common control (“Affiliates”), in which case we will require our Affiliates to honor this Privacy Policy.',
    'Corporate Restructuring. We may share some or all of your Personal Data in connection with or during negotiation of any merger, financing, acquisition, or dissolution transaction or proceeding involving sale, transfer, divestiture, or disclosure of all or a portion of our business or assets. In the event of an insolvency, bankruptcy, or receivership, Personal Data may also be transferred as a business asset. If another company acquires our company, business, or assets, that company will possess the Personal Data collected by us and will assume the rights and obligations regarding your Personal Data as described in this Privacy Policy.',
    'As Legally Required. Regardless of any choices you make regarding your Personal Data (as described below), dArtFlex may disclose Personal Data if it believes in good faith that such disclosure is necessary (a) in connection with any legal investigation; (b) to comply with relevant laws or to respond to subpoenas or warrants served on dArtFlex; (c) to protect or defend the rights or property of dArtFlex or users of the Service; and/or (d) to investigate or assist in preventing any violation or potential violation of the law, this Privacy Policy, or our Terms of Use.',
    'Other Disclosures. We may also disclose your Personal Data, to fulfill the purpose for which you provide it; for any other purpose disclosed by us when you provide it; or with your consent. We do not sell your Personal Data.',
  ]
  const regardingInfoParagraph = [
    'Data Access. You can access your Personal Data on your account settings page.',
    'Data Portability. You can request a copy of your Personal Data by contacting us here and including "Please send me my Personal Data" in the subject line. dArtFlex will verify your ability to access that email, then sends you a digital export of the data we hold that is associated with your email address. We will use reasonable efforts to respond to your request within 7 days, but in all events within 28 days of our receipt of the request.',
    'Data Erasure. You can delete your Personal Data on your account settings page. Alternatively, you may request that dArtFlex delete your personal data by contacting us here and including "Please delete my Personal Data" in the subject line. dArtFlex will verify your ability to access that email, then delete the Personal Data associated with your email address. We will use reasonable efforts to respond to your request within 7 days, but in all events within 28 days of our receipt of the request.',
    'Data Correction. You can modify your Personal Data on your account settings page.',
  ]

  const classes = useStyles()
  return (
    <AuxiliaryPage title="Privacy Policy">
      <>
        <Typography variant={'body2'} className={classes.textBlock}>
          APRIL 20, 2021
        </Typography>
        <Typography variant={'body2'}>
          dArtFlex (“we” or “us”) is committed to protecting your privacy. We have prepared this Privacy Policy to
          describe to you our practices regarding the Personal Data (as defined below) we collect from users of our
          website, located at{' '}
          <Link href={'https://dartflex.art/'} className={classes.navLink}>
            https://dartflex.art/
          </Link>{' '}
          (the “Site”) and online services (collectively, the “Service”).
        </Typography>
        <Typography variant={'body2'}>
          Please review this Policy carefully. By accessing or using the Services (or by clicking on “accept” or “agree”
          to this Policy when prompted), you agree to the terms of this Policy on behalf of yourself or the entity or
          organization that you represent. If you do not agree to any term in this Policy, you should refrain from
          further use of our Services.
        </Typography>
        <Typography className={classes.sectionTitle}>Types of Data We Collect.</Typography>
        <Typography variant={'body2'}>
          “Personal Data” means data that allows someone to identify or contact you, including, for example, your name,
          e-mail address, as well as any other non-public information about you that is associated with or linked to any
          of the foregoing data. “Anonymous Data” means data, including aggregated and de-identified data, that is not
          associated with or linked to your Personal Data; Anonymous Data does not, by itself, permit the identification
          of individual persons. We collect Personal Data and Anonymous Data, as described below.
        </Typography>
        <Typography className={classes.sectionTitle}>1. Information You Provide Us.</Typography>
        <ol className={classes.sectionList}>
          <li>
            <Typography variant={'body2'} component={'span'}>
              We may collect Personal Data from you, such as name, e-mail, Ethereum address.
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              Our Service lets you store preferences like how your content is displayed, safe search settings,
              notification settings. We may associate these choices with your ID, browser, and you can edit these
              preferences at any time.
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              If you contact us via the{' '}
              <Link href={'#'} className={classes.navLink}>
                ”Contact us” form
              </Link>{' '}
              on the website, we will collect your email address (required field) and name (not required field) in order
              to send you a reply.
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              We also collect other types of Personal Data that you provide to us voluntarily, such as your operating
              system and version, product registration number, Ethereum address.
            </Typography>
          </li>
          <li>
            <Typography variant={'body2'} component={'span'}>
              We may also collect Personal Data at other points in our Service that state that Personal Data is being
              collected.
            </Typography>
          </li>
        </ol>
        <Typography className={classes.sectionTitle}>2. Information Collected via Technology.</Typography>
        <Typography variant={'body2'} component={'span'}>
          As you navigate through and interact with our Service, we may use automatic data collection technologies to
          collect certain information about your equipment, browsing actions, and patterns, including:
        </Typography>
        <ol className={classes.sectionList}>
          {informationCollectedParagraph.map((item, index) => {
            return (
              <li key={index}>
                <Typography variant={'body2'} component={'span'}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ol>
        <Typography className={classes.sectionTitle}>3. Information Collected from Third Party Companies.</Typography>
        <Typography variant={'body2'}>
          We may receive Personal and/or Anonymous Data about you from companies that provide our Services by way of a
          co-branded or private-labeled website or companies that offer their products and/or services on our Service.
          In particular, MetaMask and other wallets provide us with your Ethereum address and certain other information
          you choose to share with MetaMask and other wallets. These third-party companies may supply us with Personal
          Data. We may add this to the information we have already collected from you via our Service to improve it. We
          do not collect Personal Data automatically, but we may tie the information that we collect automatically to
          Personal Data about you that we collect from other sources or that you provide to us.
        </Typography>
        <Typography className={classes.sectionTitle}>4. Use of Your Personal Data</Typography>
        <ol className={classes.sectionList}>
          <li>
            <Typography variant={'body2'} component={'span'}>
              General Use. In general, Personal Data you submit to us is used either to respond to requests that you
              make or to aid us in serving you better. We use your Personal Data in the following ways:
            </Typography>
          </li>
          <ul className={classes.unorderedList}>
            <li className={classes.unorderedListItem}>
              <Typography variant={'body2'} component={'span'}>
                facilitate the creation of and secure your Account on our network;
              </Typography>
            </li>
            <li className={classes.unorderedListItem}>
              <Typography variant={'body2'} component={'span'}>
                provide improved administration of our Service;
              </Typography>
            </li>
            <li className={classes.unorderedListItem}>
              <Typography variant={'body2'} component={'span'}>
                provide the Services you request, including but not limited to facilitating your cryptocurrency
                transactions through MetaMask (
                <Link href={'https://metamask.io'} className={classes.navLink}>
                  https://metamask.io
                </Link>
                ) or other wallets;
              </Typography>
            </li>
            <li className={classes.unorderedListItem}>
              <Typography variant={'body2'} component={'span'}>
                improve the quality of experience when you interact with our Service;
              </Typography>
            </li>
            <li className={classes.unorderedListItem}>
              <Typography variant={'body2'} component={'span'}>
                protect you and other users from any conduct that violates the Terms of Use or to prevent abuse or
                harassment of any user;
              </Typography>
            </li>
            <li className={classes.unorderedListItem}>
              <Typography variant={'body2'} component={'span'}>
                display your username next to the digital assets you wish to sell on the Website;
              </Typography>
            </li>
            <li className={classes.unorderedListItem}>
              <Typography variant={'body2'} component={'span'}>
                respond to your inquiries related to employment opportunities or other requests;
              </Typography>
            </li>
          </ul>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'} component={'span'}>
              We may use your Personal Data to contact you about our own and third parties’ goods and services that may
              be of interest to you.
            </Typography>
          </li>
          <li className={classes.unorderedListItem}>
            <Typography variant={'body2'} component={'span'}>
              Anonymous Data. We may create Anonymous Data records from Personal Data by excluding information (such as
              your name) that makes the data personally identifiable to you. We use this Anonymous Data to analyze
              request and usage patterns so that we may enhance the content of our Services and improve Service
              navigation. We reserve the right to use Anonymous Data for any purpose and to disclose Anonymous Data to
              third parties without restriction.
            </Typography>
          </li>
        </ol>
        <Typography className={classes.sectionTitle}>5. Disclosure of Your Personal Data.</Typography>
        <Typography variant={'body2'}>
          We disclose your Personal Data as described below and as described elsewhere in this Privacy Policy.
        </Typography>
        <ol className={classes.sectionList}>
          {personalDataParagraph.map((item, index) => {
            return (
              <li key={index}>
                <Typography variant={'body2'} component={'span'}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ol>
        <Typography className={classes.sectionTitle}>6. Third-Party Websites.</Typography>
        <Typography variant={'body2'}>
          Our Service may contain links to third-party websites. When you click on a link to any other website or
          location, you will leave our Service and go to another site, and another entity may collect Personal Data or
          Anonymous Data from you. You may also find marketplaces powered by the Service on other websites. We have no
          control over, do not review, and cannot be responsible for, these outside websites or their content. Please be
          aware that the terms of this Privacy Policy do not apply to these outside websites or content, or to any
          collection of your Personal Data after you click on links to such outside websites. We encourage you to read
          the privacy policies of every website you visit. The links to third-party websites or locations are for your
          convenience and do not signify our endorsement of such third parties or their products, content, or websites.
        </Typography>
        <Typography className={classes.sectionTitle}>7. Third-Party Wallet Extensions.</Typography>
        <Typography variant={'body2'}>
          For conducting cryptocurrency transactions we use third-party electronic wallet extensions such as (but not
          limited to) MetaMask; your interactions with MetaMask and/or any third-party electronic wallet extensions are
          governed by the applicable privacy policies. In the case of MetaMask, its privacy policy is available here.
        </Typography>
        <Typography className={classes.sectionTitle}>8. Your Choices Regarding Information.</Typography>
        <Typography variant={'body2'}>
          You have several choices regarding the use of information on our Services:
        </Typography>
        <Typography variant={'body2'}>
          If you decide at any time that you no longer wish to accept Cookies from our Service for any of the purposes
          described above, then you can instruct your browser, by changing its settings, to stop accepting Cookies or to
          prompt you before accepting a Cookie from the websites you visit. Consult your browser’s technical
          information. If you do not accept Cookies, however, you may not be able to use all portions of the Service or
          all functionality of the Service. If you have any questions about how to disable or modify Cookies, please let
          us know at the address given in paragraph (1).
        </Typography>
        <Typography className={classes.sectionTitle}>9. Your Choices Regarding Information.</Typography>
        <Typography variant={'body2'}>
          You can view, access, edit, or delete your personal data for many aspects of the Service via your account
          settings page. You can also make choices about dArtFlex&apos;s use of your data. We may retain an archived
          copy of your records as required by law or for legitimate business purposes.
        </Typography>
        <ol className={classes.sectionList}>
          {regardingInfoParagraph.map((item, index) => {
            return (
              <li key={index}>
                <Typography variant={'body2'} component={'span'}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ol>
        <Typography className={classes.sectionTitle}>10. Data Retention.</Typography>
        <Typography variant={'body2'}>
          We may retain your Personal Data as long as you continue to use the Service, have an account with us, or for
          as long as is necessary to fulfill the purposes outlined in this Privacy Policy. You can ask to close your
          account by contacting us as described above, and we will delete your Personal Data on request. We may,
          however, retain Personal Data for an additional period as is permitted or required under applicable laws, for
          legal, tax, or regulatory reasons, or for legitimate and lawful business purposes.
        </Typography>
        <Typography className={classes.sectionTitle}>11. Data Protection.</Typography>
        <Typography variant={'body2'}>
          We care about the security of your information and use physical, administrative, and technological safeguards
          to preserve the integrity and security of all information collected through our website. However, no security
          system is impenetrable and we cannot guarantee the security of our systems 100%. In the event that any
          information under our control is compromised as a result of a breach of security, we will take steps to
          investigate the situation and, where appropriate, notify those individuals whose information may have been
          compromised and take other steps, in accordance with any applicable laws and regulations.
        </Typography>
        <Typography className={classes.sectionTitle}>12. A Note About Children.</Typography>
        <Typography variant={'body2'}>
          We do not intentionally gather Personal Data from visitors who are under the age of 13. If a child under 13
          submits Personal Data to dArtFlex and we learn that the Personal Data is the information of a child under 13,
          we will attempt to delete the information as soon as possible. If you believe that we might have any Personal
          Data from a child under 13, please contact us via{' '}
          <Link href={'#'} className={classes.navLink}>
            ”Contact us” form
          </Link>{' '}
          form with a subject line “Violation Report / Concerns / Complaints ”.
        </Typography>
        <Typography className={classes.sectionTitle}>13. A Note to Users Outside of the United States.</Typography>
        <Typography variant={'body2'}>
          If you are a non-U.S. user of the Service, by visiting the Service and providing us with data, you acknowledge
          and agree that your Personal Data may be processed for the purposes identified in the Privacy Policy. In
          addition, your Personal Data may be processed in the country in which it was collected and in other countries,
          including the United States, where laws regarding the processing of Personal Data may be less stringent than
          the laws in your country. By providing your data, you consent to such a transfer.
        </Typography>
        <Typography className={classes.sectionTitle}>14. Changes to This Privacy Policy.</Typography>
        <Typography variant={'body2'}>
          This Privacy Policy may be updated from time to time for any reason. We will notify you of any changes to our
          Privacy Policy by posting the new Privacy Policy at{' '}
          <Link href={'#'} className={classes.navLink}>
            (Link)
          </Link>
          . The date the Privacy Policy was last revised is identified at the beginning of this Privacy Policy. You are
          responsible for ensuring we have an up-to-date active and deliverable email address for you, and for
          periodically visiting our Service and this Privacy Policy to check for any changes.
        </Typography>
        <Typography className={classes.sectionTitle}>
          15. Questions; Contacting dArtFlex; Reporting Violations.
        </Typography>
        <Typography variant={'body2'}>
          If you have any questions or concerns or complaints about our Privacy Policy or our data collection or
          processing practices, or if you want to report any security violations to us, please contact us via “Contact
          us” form with a subject line “Violation Report / Concerns / Complaints ”
        </Typography>
      </>
    </AuxiliaryPage>
  )
}
