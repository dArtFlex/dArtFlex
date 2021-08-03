import React from 'react'
import AuxiliaryPage from '../../index'
import { Box, Link, Typography } from '@material-ui/core'
import { useStyles } from '../../styles'
import { NavLink } from 'react-router-dom'
import routes from '../../../../routes'

export default function CommunityGuidelines() {
  const classes = useStyles()
  const mintAndSellRules = [
    'You maintain all legal rights, including copyrights and trademarks of your original work.',
    'You can reproduce, distribute, exhibit, and make derivative work of your piece. ',
    'You can reproduce, distribute, exhibit, and make derivative work of your piece. ',
    'What you can’t do as a creator: ',
  ]
  const collectRestrictions = [
    'You can’t claim legal ownership, copyrights, trademarks, or other intellectual property rights.',
    'You can’t use the artwork in a commercial context.',
    'You can’t make any changes to the artwork.',
    'You can’t share the work in a hateful, cruel, or intolerant context.',
    'You can’t create additional NFTs that represent the same artwork.',
  ]
  const collectRules = [
    'You own the NFT that represents the artwork on the blockchain.',
    'You can display and share the piece.',
    'You can exhibit the piece on any platform or in any virtual space. ',
    'You can resell or trade it on a secondary market.',
  ]
  return (
    <AuxiliaryPage title="Community Guidelines">
      <>
        <Typography variant={'body2'}>MAY 2, 2021</Typography>
        <Typography variant={'body2'}>
          Creating a new system of support for digital art requires mutual respect between creators, collectors, and
          curators. So while we provide an unprecedentedly open cultural community, we also want everyone to agree on a
          few key rules and expectations to start. We hope you can embody these ideals and help us work towards building
          a welcoming community that empowers creators and collectors alike.
        </Typography>
        <Typography className={classes.sectionTitle}>For the Community</Typography>
        <Typography variant={'body2'}>
          To break from the old and start something truly new, we must be led by values of kindness and inclusivity.
          Showing respect and care towards one another is of utmost importance to all of us as we build a community that
          is welcoming to all.
        </Typography>
        <Typography variant={'body2'}>
          Anyone who is interested in joining our community on a deeper level is welcome to become a member of the
          dArtFlex{' '}
          <Link href={'#'} className={classes.navLink} target="_blank">
            Discord
          </Link>
          . There you’ll find creators and collectors engaging in meaningful conversations about creative work and
          process. We also support and learn from each other in shared online spaces like{' '}
          <Link href={'https://twitter.com/dartflexart'} className={classes.navLink} target="_blank">
            Twitter
          </Link>
          .
        </Typography>
        <Typography variant={'body2'}>
          These spaces are also crucial to our belief in community-led curation. Our curatorial team selected the first
          artists to join the site, and now our creator community is leading the way. This approach sets the stage for a
          more vibrant and supportive network of creatives to emerge over time.
        </Typography>
        <Typography className={classes.sectionTitle}>For Creators</Typography>
        <Typography variant={'body2'}>
          We always want to center artists and their perspectives in all that we do, which includes ensuring the work
          uploaded to dArtFlex is authentic to the creator. We take this seriously because building trust is essential
          to sustaining a healthy community.
        </Typography>
        <Typography className={classes.sectionTitle}>When you mint and sell an NFT on dArtFlex:</Typography>
        <ul className={classes.unorderedListInitial}>
          {mintAndSellRules.map((item, index) => {
            return (
              <li className={classes.unorderedListItem} key={index}>
                <Typography variant={'body2'} component={'span'}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ul>
        <ul className={classes.dashedList}>
          <li>
            <Box display="flex">
              <Box mr={2}>-</Box>
              <Typography variant={'body2'} component={'span'}>
                You can’t upload anyone else’s copyrighted or otherwise proprietary work.
              </Typography>
            </Box>
          </li>
          <li className={classes.unorderedListItem}>
            <Box display="flex">
              <Box mr={2}>-</Box>
              <Typography variant={'body2'} component={'span'}>
                You can’t create additional NFTs that represent the same piece. However, related works in a series are
                acceptable.
              </Typography>
            </Box>
          </li>
        </ul>
        <Typography className={classes.sectionTitle}>For Collectors</Typography>
        <Typography variant={'body2'}>
          Collectors in the NFT space are ushering in new cultural paradigms and models for arts patronage through their
          forward-thinking approaches. When collectors win an auction, they receive a unique NFT from an artist they
          want to support and champion.
        </Typography>
        <Typography className={classes.sectionTitle}>When you collect an NFT on dArtFlex:</Typography>
        <ul className={classes.unorderedListInitial}>
          {collectRules.map((item, index) => {
            return (
              <li className={classes.unorderedListItem} key={index}>
                <Typography variant={'body2'} component={'span'}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ul>
        <Typography className={classes.sectionTitle}>What you can’t do as a collector:</Typography>
        <ul className={classes.unorderedListInitial}>
          {collectRestrictions.map((item, index) => {
            return (
              <li className={classes.unorderedListItem} key={index}>
                <Typography variant={'body2'} component={'span'}>
                  {item}
                </Typography>
              </li>
            )
          })}
        </ul>
        <Typography className={classes.sectionTitle}>
          We all have a responsibility to create a positive environment.
        </Typography>
        <Typography variant={'body2'} component={'div'} className={classes.textBlockTight}>
          The short version is: Don’t lie, spam, steal, cause harm, or be hateful. If you see any of these behaviors on
          dArtFlex, let us know via Intercom or{' '}
          <Link href={'mailto:mail@dartflex.art'} className={classes.navLink}>
            mail@dartflex.art
          </Link>
          .
        </Typography>
        <Typography variant={'body2'} component={'div'} className={classes.textBlockTight}>
          If we determine a creator is doing any of these things, we will mediate the situation which may include
          account suspension. Full details are in our{' '}
          <NavLink to={routes.termsOfService} className={classes.navLink}>
            Terms of Service
          </NavLink>
          .
        </Typography>
      </>
    </AuxiliaryPage>
  )
}
