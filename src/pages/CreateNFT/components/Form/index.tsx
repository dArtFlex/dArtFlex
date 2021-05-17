import React from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormikContext } from 'formik'
import { Box, Card, Button, Avatar, Typography } from '@material-ui/core'
import { Grid } from 'layouts'
import { Image } from 'common'
import { EyeIcon } from 'common/icons'
import { mintingRequest } from 'stores/reducers/minting'
import MintingForm from './MintingForm'
import routes from '../../../../routes'
import { ICreateNFT } from '../../types'
import { useStyles } from './styles'

export default function Form() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { values } = useFormikContext<ICreateNFT>()

  const handleMinting = () => {
    dispatch(mintingRequest({ name: values.name, description: values.description }))
  }

  const handleList = () => history.push(routes.artworkSell)

  const handleViewArtwork = () => history.push(routes.home)

  return (
    <Grid columns={2}>
      <Box className={classes.flexBox}>
        <Card className={classes.card}>
          <Box className={classes.cardImageContainer}>
            <Image classNames={classes.cardImage} file={values.file as File} />
          </Box>

          <Box className={classes.cardContent}>
            <Box className={classes.cardInfo}>
              <Box className={classes.cardInfoUser}>
                <Avatar className={classes.avatar} alt="Avatar" src="/images/avatar/1.jpg" />
                <Typography component={'span'} variant={'h4'}>
                  @gianapress
                </Typography>
              </Box>
              {values.name.length ? (
                <Typography className={classes.cardDesc}>{values.name}</Typography>
              ) : (
                <Box className={classes.empyName}></Box>
              )}
            </Box>
            <Button variant={'outlined'} startIcon={<EyeIcon />} fullWidth>
              Preview
            </Button>
          </Box>
        </Card>
      </Box>

      <MintingForm onMinting={handleMinting} onList={handleList} onViewArtwork={handleViewArtwork} />
    </Grid>
  )
}
