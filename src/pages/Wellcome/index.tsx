import React, { useState, useEffect } from 'react'
import { Container, Box, Typography, Button, FormGroup, FormControlLabel, Checkbox, Link } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import { Modal } from 'common'
import { VectorIcon } from 'common/icons'
import { useStyles } from './styles'
import routes from 'routes'
import APP_CONSTS from 'config/consts'
import { parseJS } from 'utils'

export default function Wellcome() {
  const classes = useStyles()
  const [open, setOpen] = useState<boolean>(true)
  return (
    <Container className={classes.container}>
      <Modal open={open} onClose={() => setOpen(false)} body={<WellcomeForm />} withoutCloseBtn />
    </Container>
  )
}

function WellcomeForm() {
  const classes = useStyles()
  const history = useHistory()
  const [accept, setAccept] = React.useState(false)
  const redirect = () => history.push(routes.artworks)

  useEffect(() => {
    const isAccepted = parseJS(localStorage.getItem(APP_CONSTS.ACCEPT_COMMUNITY_GUIDELINES))
    if (isAccepted) {
      redirect()
    }
  }, [])

  return (
    <Box className={classes.wellcome}>
      <Typography variant={'h2'}>
        Welcome to{' '}
        <Box className={classes.inlineBox}>
          <Typography component={'span'} variant={'h2'} className={classes.title}>
            dArtflex!
          </Typography>
          <VectorIcon className={classes.vector} />
        </Box>
      </Typography>

      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              color="primary"
              checked={accept}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const value = event.target.checked
                setAccept(value)
                localStorage.setItem(APP_CONSTS.ACCEPT_COMMUNITY_GUIDELINES, JSON.stringify(value))
              }}
            />
          }
          label={
            <Box>
              I accept
              <Link href={routes.communityGuidelines} underline={'none'} className={classes.navLink} target="_blank">
                Community Guidelines
              </Link>
            </Box>
          }
        />
      </FormGroup>
      <Button
        onClick={redirect}
        variant={'contained'}
        fullWidth
        disableElevation
        className={classes.btn}
        disabled={!accept}
      >
        Go to artworks
      </Button>
    </Box>
  )
}
