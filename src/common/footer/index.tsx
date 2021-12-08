import React from 'react'
import { Link, Box } from '@material-ui/core'
import { LogoIcon } from 'common/icons'
import { useStyles } from './styles'
import routes from '../../routes'
import { NavLink } from 'react-router-dom'
import APP_CONFIG from 'config'

const social = [
  {
    title: 'Twitter',
    href: APP_CONFIG.link_twitter,
  },
  {
    title: 'Github',
    href: APP_CONFIG.link_github,
  },
  {
    title: 'Medium',
    href: APP_CONFIG.link_medium,
  },
  {
    title: 'FatMen',
    href: APP_CONFIG.link_fatmen,
  },
]

const links = [
  // {
  //   title: 'FAQ',
  //   href: '#',
  // },
  {
    title: 'DAF',
    href: routes.aboutDAF,
  },
  {
    title: 'Help',
    href: '#',
  },
  {
    title: 'Terms of Service',
    href: routes.termsOfService,
  },
  // {
  //   title: 'Cookie Policy',
  //   href: '#',
  // },
  {
    title: 'Community Guidelines',
    href: routes.communityGuidelines,
  },
  {
    title: 'Privacy Policy',
    href: routes.privacyPolicy,
  },
]

export default function Footer() {
  const classes = useStyles()

  return (
    <footer className={classes.footer}>
      <Box className={classes.social} display={'flex'} alignItems={'center'}>
        <LogoIcon className={classes.logo} />
        <Box className={classes.socialWrapper}>
          {social.map((s) => (
            <Link key={s.title} color={'inherit'} underline={'hover'} href={s.href} target="_blank" rel="noopener">
              {s.title}
            </Link>
          ))}
        </Box>
      </Box>
      <Box className={classes.linksWrapper}>
        {links.map((s) => (
          <NavLink key={s.title} to={s.href}>
            {s.title}
          </NavLink>
        ))}
      </Box>
    </footer>
  )
}
