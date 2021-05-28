import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useFormikContext } from 'formik'
import { Box, Card, Button, Avatar, Typography } from '@material-ui/core'
import { Grid } from 'layouts'
import { Image, ImageViewer } from 'common'
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
  const [openViewImage, setOpenViewImage] = useState<boolean>(false)

  const handleMinting = () => {
    dispatch(mintingRequest({ name: values.name, description: values.description }))
  }

  const handleList = () => history.push(routes.sellNFT)

  const handleViewArtwork = () => history.push(routes.home)

  return (
    <Grid columns={2}>
      <Box className={classes.flexBox}>
        <Card className={classes.card}>
          <Box className={classes.cardImageContainer}>
            <Image className={classes.cardImage} file={values.file as File} />
          </Box>
          <ImageViewer
            open={openViewImage}
            onClose={() => setOpenViewImage(false)}
            images={[values.file as File]}
            asFiles
          />

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
            <Button variant={'outlined'} startIcon={<EyeIcon />} fullWidth onClick={() => setOpenViewImage(true)}>
              Preview
            </Button>
          </Box>
        </Card>
      </Box>

      <MintingForm onMinting={handleMinting} onList={handleList} onViewArtwork={handleViewArtwork} />
    </Grid>
  )
}
