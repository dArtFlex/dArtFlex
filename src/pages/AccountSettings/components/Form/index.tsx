import React from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Button } from '@material-ui/core'
import { Field, InputAdornment } from 'common'
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
  SuccessIcon,
} from 'common/icons'
import { UploadFileSection } from '../../components'
import { IAccountSettings } from '../../types'
import { useStyles } from './styles'
import { UserDataTypes } from '../../../../types'

interface IFormAccountSettings {
  setOpenVerification: () => void
  user: UserDataTypes | null
}

export default function FormAccountSettings(props: IFormAccountSettings) {
  const classes = useStyles()
  const { setOpenVerification, user } = props
  const { values, handleSubmit } = useFormikContext<IAccountSettings>()

  return (
    <Box className={classes.form}>
      <Typography component="h1">Account Settings</Typography>
      <Box className={classes.section}>
        <Typography component="h3">Main Info</Typography>
        <UploadFileSection
          name="profile_image"
          label="User Image"
          description={`10MB max size, JPG, PNG or GIF. Recommended size: 1000x1000px.`}
          photoUrl={user?.profile_image}
        />
        <UploadFileSection
          name="cover_image"
          label="Cover Image"
          description={`10MB max size, JPG, PNG or GIF. Recommended size: 500x1500px.`}
          variant={'cover'}
        />
        <Field type="input" name="fullname" label="Name" variant="outlined" className={classes.formField} />
        <Field
          type="input"
          name="userid"
          label="User Name"
          variant="outlined"
          className={classes.formField}
          InputProps={{
            startAdornment: <InputAdornment icon={<AtIcon />} />,
          }}
          helperText={
            Boolean(values.userid.length) && (
              <Box className={classes.successTextHelper}>
                <SuccessIcon className={classes.successIcon} />
                <Typography>Username is Valid</Typography>
              </Box>
            )
          }
        />
        <Field
          type="input"
          name="email"
          label="Email"
          variant="outlined"
          description="Email is used for notifications. It will not be shown on your profile."
          placeholder="Enter your email"
          className={classes.formField}
        />
        <Field
          type="input"
          name="overview"
          label="Short Biography"
          variant="outlined"
          multiline
          rows={4}
          className={classes.formField}
        />
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
          className={classes.formField}
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
          className={classes.formField}
        />
        <Field
          type="input"
          name="instagram"
          label="Instagram"
          variant="outlined"
          placeholder={'Instagram User name'}
          InputProps={{
            startAdornment: <InputAdornment position="start" icon={<InstagramIcon />} placeholder={'Instagram.com/'} />,
          }}
          className={classes.formField}
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
          className={classes.formField}
        />
        <Field
          type="input"
          name="facebook"
          label="Facebook"
          variant="outlined"
          placeholder={'Facebook Username'}
          InputProps={{
            startAdornment: <InputAdornment position="start" icon={<FacebookIcon />} placeholder={'facebook.com/'} />,
          }}
          className={classes.formField}
        />
        <Field
          type="input"
          name="youtube"
          label="YouTube"
          variant="outlined"
          placeholder={'Channel URL'}
          InputProps={{
            startAdornment: <InputAdornment position="start" icon={<YouTubeIcon className={classes.socialsIcon} />} />,
          }}
          className={classes.formField}
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
          className={classes.formField}
        />
        <Field
          type="input"
          name="otherUrl"
          label="Other"
          variant="outlined"
          placeholder={'URL'}
          InputProps={{
            startAdornment: <InputAdornment position="start" icon={<LinkIcon className={classes.socialsIcon} />} />,
          }}
          className={classes.formField}
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
        <Button
          variant="outlined"
          className={classes.verifyBtn}
          startIcon={<TwitterIcon />}
          onClick={setOpenVerification}
        >
          Verify via Twitter
        </Button>
      </Box>
      <Button
        disabled={!Boolean(values.userid.length)}
        variant={'contained'}
        onClick={() => handleSubmit()}
        className={classes.btnSubmit}
        fullWidth
      >
        Save Changes
      </Button>
    </Box>
  )
}
