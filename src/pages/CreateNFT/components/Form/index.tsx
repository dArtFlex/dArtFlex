import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectMinting, selectListing } from 'stores/selectors'
import { useFormikContext } from 'formik'
import { Box, Card, Button, Avatar, Typography } from '@material-ui/core'
import { Grid } from 'layouts'
import { Image, ImageViewer } from 'common'
import { EyeIcon } from 'common/icons'
import { lazyMintingRequest } from 'stores/reducers/minting'
import MintingForm from './MintingForm'
import ListingForm from './ListingForm'
import routes from '../../../../routes'
import { ICreateNFT } from '../../types'
import { useStyles } from './styles'

export default function Form() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { values } = useFormikContext<ICreateNFT>()
  const {
    minting: { data },
  } = useSelector(selectMinting())
  const {
    listing: { listing },
  } = useSelector(selectListing())

  const [openViewImage, setOpenViewImage] = useState<boolean>(false)

  const handleMinting = () => {
    dispatch(lazyMintingRequest({ name: values.name, description: values.description, royalties: values.royalties }))
  }

  const handleList = () => history.push(routes.sellNFT)

  const handleViewArtwork = () => history.push(routes.home)

  return (
    <Grid columns={2}>
      <Box className={classes.flexBox}>
        <Card className={classes.card}>
          <Box className={classes.cardImageContainer}>
            {data.image ? (
              <Image className={classes.cardImage} src={data.image} />
            ) : (
              <Image className={classes.cardImage} file={values.file as File} />
            )}
          </Box>
          {data.image ? (
            <ImageViewer open={openViewImage} onClose={() => setOpenViewImage(false)} images={[data.image]} />
          ) : (
            <ImageViewer
              open={openViewImage}
              onClose={() => setOpenViewImage(false)}
              images={[values.file as File]}
              asFiles
            />
          )}

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

      {listing === 'done' ? (
        <ListingForm onViewArtwork={handleViewArtwork} />
      ) : (
        <MintingForm onMinting={handleMinting} onList={handleList} onViewArtwork={handleViewArtwork} />
      )}
    </Grid>
  )
}
