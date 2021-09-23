import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectListing } from 'stores/selectors'
import { getSalesDataByOwnerRequest, getUserAssetsRequest } from 'stores/reducers/user'
import { unlistingRequest } from 'stores/reducers/listing'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper, CircularProgressLoader, CardAsset, ConfirmationModal } from 'common'
import { useStyles } from './styles'
import routes from 'routes'
import appConst from 'config/consts'
import { useComposeAssetsData } from './lib'
import { acceptBidRequest } from '../../stores/reducers/placeBid'
import { acceptOfferRequest } from '../../stores/reducers/makeOffer'

const { STATUSES, INTERVALS } = appConst

export default function Sales() {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { user, userAssets, fetching, biddedOfferedAssets } = useSelector(selectUser())
  const {
    listing: { fetchingUnlist, artworkUnlisted },
  } = useSelector(selectListing())

  const [openUnlistModal, setOpenUnlistModal] = useState(false)
  const [selectedAssetId, setSelectedAssetId] = useState('')

  useEffect(() => {
    dispatch(getUserAssetsRequest())
    dispatch(getSalesDataByOwnerRequest())
    const iId = setInterval(() => {
      dispatch(getUserAssetsRequest())
      dispatch(getSalesDataByOwnerRequest())
    }, INTERVALS.UPDATE_BIDS_HISTORY)
    return () => {
      clearInterval(iId)
    }
  }, [])

  const composeData = useComposeAssetsData(biddedOfferedAssets, userAssets)

  if (!user) {
    history.push(routes.home)
    return null
  }

  const handleUnlisted = (market_id: string) => {
    dispatch(unlistingRequest({ market_id }))
  }

  const handleAcceptBid = (bid_id: number, market_id: string) => {
    dispatch(
      acceptBidRequest({
        bid_id: `${bid_id}`,
        market_id: market_id,
        assetOwnerId: user.id,
      })
    )
  }

  const handleAcceptOffer = (offer_id: number, buyerId: string) => {
    dispatch(
      acceptOfferRequest({
        buyerId: buyerId,
        bid_id: offer_id,
        assetOwnerId: `${user.id}`,
      })
    )
  }

  return (
    <>
      <PageWrapper className={classes.container}>
        <Box>
          <Typography variant={'h1'} color={'textPrimary'}>
            Sales
          </Typography>
          <Box>
            {fetching && userAssets.length === 0 ? (
              <CircularProgressLoader />
            ) : (
              <Box className={classes.grid}>
                {composeData
                  .filter((item) => item.highest_bid?.length || item.highest_offer?.length)
                  .map((userAsset, i) => {
                    return (
                      <CardAsset
                        key={i}
                        asset={userAsset}
                        withLabel
                        button={{
                          acceptOffer: () => {
                            userAsset.highest_offer?.length &&
                              handleAcceptOffer(userAsset.highest_offer[0].id, userAsset.highest_offer[0].order_id)
                          },
                          acceptBid: () =>
                            userAsset.highest_bid?.length &&
                            handleAcceptBid(userAsset.highest_bid[0].id, userAsset.highest_bid[0].market_id),
                        }}
                        withAction={Boolean(userAsset.status === STATUSES.LISTED)}
                        menu={{
                          onUnlisted: () => {
                            setSelectedAssetId(String(userAsset.id))
                            setOpenUnlistModal(true)
                          },
                        }}
                      />
                    )
                  })}
              </Box>
            )}
          </Box>
        </Box>
      </PageWrapper>

      <ConfirmationModal
        open={openUnlistModal && !artworkUnlisted}
        onCancel={() => setOpenUnlistModal(false)}
        onSubmit={() => {
          handleUnlisted(selectedAssetId)
        }}
        title={'Do you want to cancel artwork?'}
        fetching={fetchingUnlist}
        btnCancelText={'Nevermind'}
        btnSubmitText={'Yes, I cancel'}
      />
    </>
  )
}
