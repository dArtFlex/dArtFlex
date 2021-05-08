import React, { useState } from 'react'
import { Box, Typography, Button } from '@material-ui/core'
import { Modal, ButtonStartIcon, Field } from 'common'
import { TwitterIcon, VerifiedShadIcon } from 'common/icons'
import { useStyles } from './styles'

interface IVerificationTwitterProps {
  open: boolean
  setOpen: () => void
}

export default function VerificationTwitter(props: IVerificationTwitterProps) {
  const { open, setOpen } = props
  const classes = useStyles()
  const [verified, setVerified] = useState<boolean>(false)

  return (
    <Modal
      open={open}
      onClose={() => {
        setOpen()
      }}
      body={
        verified ? (
          <Box className={classes.container}>
            <VerifiedShadIcon />
            <Box className={classes.verifiedBox}>
              <Typography className={classes.verifiedHead}>Account verified!</Typography>
              <Button variant="contained" color="primary" className={classes.verifyBtn}>
                Close
              </Button>
            </Box>
          </Box>
        ) : (
          <Box className={classes.container}>
            <Box mb={6}>
              <Typography variant={'h2'}>Verification</Typography>
            </Box>
            <Box className={classes.section}>
              <Typography className={classes.sectionHead}>Step 1</Typography>
              <Typography className={classes.sectionDesc}>
                Post a public tweet that contains your wallet address
              </Typography>
              <ButtonStartIcon
                variant={'outlined'}
                classNames={classes.postTweetBtn}
                fullWidth
                icon={<TwitterIcon className={classes.icon} />}
              >
                Post Tweet
              </ButtonStartIcon>
            </Box>
            <Box>
              <Typography className={classes.sectionHead}>Step 2</Typography>
              <Typography className={classes.sectionDesc}>
                Paste the URL of the tweet to verify your profile.
              </Typography>
              <Field type="input" name="tweetURL" variant="outlined" placeholder="Tweet URL" />
            </Box>
            <Button variant="contained" color="primary" className={classes.verifyBtn} onClick={() => setVerified(true)}>
              Verify Account
            </Button>
          </Box>
        )
      }
    />
  )
}
