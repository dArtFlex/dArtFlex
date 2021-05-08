import React from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { PageWrapper, Form, Field, InputAdornment } from 'common'
import { IAccountSettingsProps } from './types'
import {
  AtIcon,
  WorldIcon,
  TwitterIcon,
  InstagramIcon,
  CodeIcon,
  FacebookIcon,
  YouTubeIcon,
  TikTokIcon,
  LinkIcon,
  VerificationIcon,
} from 'common/icons'
import { useStyles } from './styles'

const data = {
  userImage: null,
  coverImage: null,
  name: '',
  userName: '',
  email: '',
  biography: '',
  socials: {
    website: '',
    twitter: '',
    instagram: '',
    discord: '',
    facebook: '',
    youtube: '',
    tiktok: '',
    other: '',
  },
}

export default function AccountSettings(props: IAccountSettingsProps) {
  const classes = useStyles()
  return (
    <PageWrapper className={classes.container}>
      <Form data={data} onCancel={() => console.log('x')} onSubmit={() => console.log('y')}>
        <Box className={classes.form}>
          <Typography component="h1">Account Settings</Typography>
          <Box className={classes.section}>
            <Typography component="h3">Main Info</Typography>
            <Field
              type="upload"
              name="userName"
              label="User Image"
              description={`10MB max size, JPG, PNG or GIF. Recommended size: 1000x1000px.`}
              cover
            />
            <Field
              type="upload"
              name="coverImage"
              label="Cover Image"
              description={`10MB max size, JPG, PNG or GIF. Recommended size: 500x1500px.`}
            />
            <Field type="input" name="name" label="Name" variant="outlined" />
            <Field
              type="input"
              name="userName"
              label="User Name"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment icon={<AtIcon />} />,
              }}
            />
            <Field
              type="input"
              name="email"
              label="Email"
              variant="outlined"
              description="Email is used for notifications. It will not be shown on your profile."
              placeholder="Enter your email"
            />
            <Field type="input" name="biography" label="Short Biography" variant="outlined" multiline rows={4} />
          </Box>
          <Box className={classes.section}>
            <Typography component="h3">Socials</Typography>
            <Field
              type="input"
              name="website"
              label="Website"
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start" icon={<WorldIcon />} placeholder={'https://'} />,
              }}
            />
            <Field
              type="input"
              name="twitter"
              label="Twitter"
              variant="outlined"
              placeholder={'Twitter Username'}
              InputProps={{
                startAdornment: (
                  <InputAdornment
                    position="start"
                    icon={<TwitterIcon className={classes.socialsIcon} />}
                    placeholder={'twitter.com/'}
                  />
                ),
              }}
            />
            <Field
              type="input"
              name="instagram"
              label="Instagram"
              variant="outlined"
              placeholder={'Instagram User name'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" icon={<InstagramIcon />} placeholder={'Instagram.com/'} />
                ),
              }}
            />
            <Field
              type="input"
              name="discord"
              label="Discord"
              variant="outlined"
              placeholder={'Code #'}
              InputProps={{
                startAdornment: <InputAdornment position="start" icon={<CodeIcon />} />,
              }}
            />
            <Field
              type="input"
              name="facebook"
              label="Facebook"
              variant="outlined"
              placeholder={'Facebook Username'}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" icon={<FacebookIcon />} placeholder={'facebook.com/'} />
                ),
              }}
            />
            <Field
              type="input"
              name="youtube"
              label="YouTube"
              variant="outlined"
              placeholder={'Channel URL'}
              InputProps={{
                startAdornment: <InputAdornment position="start" icon={<YouTubeIcon />} />,
              }}
            />
            <Field
              type="input"
              name="tiktok"
              label="TikTok"
              variant="outlined"
              placeholder={'Tik Tok Username'}
              InputProps={{
                startAdornment: <InputAdornment position="start" icon={<TikTokIcon />} placeholder={'tiktok.com/'} />,
              }}
            />
            <Field
              type="input"
              name="other"
              label="Other"
              variant="outlined"
              placeholder={'URL'}
              InputProps={{
                startAdornment: <InputAdornment position="start" icon={<LinkIcon />} />,
              }}
            />
          </Box>
          <Box className={classes.section}>
            <Box className={classes.verification}>
              <Typography component="h3">Verification</Typography>
              <VerificationIcon />
            </Box>
            <Typography color="textSecondary">
              Procceed with verification proccess to get more visibility and gain trust on dArtflex Marketplace. Please
              allow up to several weeks for the process.
            </Typography>
            <Button variant="outlined" className={classes.verifyBtn} startIcon={<TwitterIcon />}>
              Verify via Twitter
            </Button>
          </Box>
          <Button variant={'contained'} color={'primary'} fullWidth>
            Save Changes
          </Button>
        </Box>
      </Form>
    </PageWrapper>
  )
}
