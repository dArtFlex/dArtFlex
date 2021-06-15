import React from 'react'
import { IPromotion } from '../types'
import { Box, Button, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper.min.css'
import 'swiper/components/pagination/pagination.min.css'
import 'swiper/components/navigation/navigation.min.css'
import SwiperCore, { Pagination, Navigation } from 'swiper/core'

export default function Promotions(props: IPromotion) {
  const classes = useStyles()
  SwiperCore.use([Pagination, Navigation])

  return (
    <React.Fragment>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={props.artworks.length > 1}
        className="mySwiper"
        autoplay={true}
      >
        {props.artworks.map((item, index) => {
          return (
            <SwiperSlide key={index}>
              <Box className={classes.promotionBox}>
                <Box position="relative" height="380px" width="550px">
                  <div style={{ backgroundImage: `url(${item.url})` }} className={classes.promotionPhoto} />
                </Box>
                <Box className={classes.promotionInfoWrapper}>
                  <Box display="flex" alignItems="center" mb={2}>
                    <div
                      style={{ backgroundImage: `url(${item.author.profilePhoto})` }}
                      className={classes.promotionAuthorAva}
                    />
                    <Typography variant={'h4'}>{item.author.name}</Typography>
                  </Box>
                  <Typography variant={'h2'}>{item.name}</Typography>
                  <Box className={classes.promotionInfo} mt={6}>
                    <Box flexDirection="row">
                      <Typography variant={'body1'} className={classes.promotionTextSecondary}>
                        Current Bid
                      </Typography>
                      <span className={classes.promotionInfoText}>{item.bid} ETH</span>
                    </Box>
                    <Box flexDirection="row">
                      <Typography variant={'body1'} className={classes.promotionTextSecondary}>
                        Auction Ends In
                      </Typography>
                      <span className={classes.promotionInfoText}>22d 10h 30m</span>
                    </Box>
                  </Box>
                  <Box className={classes.promotionButtons}>
                    <Button variant={'contained'} disableElevation classes={{ root: classes.promotionButtonContained }}>
                      Place a Bid
                    </Button>
                    <Button variant="outlined" classes={{ root: classes.promotionButtonWhite }}>
                      View Artwork
                    </Button>
                  </Box>
                </Box>
              </Box>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </React.Fragment>
  )
}
