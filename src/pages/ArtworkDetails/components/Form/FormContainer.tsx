//@ts-nocheck
import React from 'react'
import clsx from 'clsx'
import { Box, IconButton } from '@material-ui/core'
import { CardAsset } from 'common'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import { ArrowExpandIcon } from 'common/icons'
import { FormAuction, FormBuy } from '../../components'
import { ApprovedFormState, IFormContainer } from '../../types'
import { selectAssetDetails } from 'stores/selectors'
import { useStyles } from '../../styles'
import appConst from 'config/consts'

const {
  TYPES: { AUCTION, INSTANT_BY },
  FILTER_VALUES: { LISTED, LIVE_AUCTION, MINTED },
} = appConst

export default function FormContainer() {
  const classes = useStyles()
  const { assetDetails } = useSelector(selectAssetDetails())

  const { values } = useFormikContext<ApprovedFormState>()

  const asset = {
    ...assetDetails.marketData,
    status: assetDetails.status,
    assetDetails: assetDetails.imageData,
    userData: assetDetails.ownerData,
    imageData: assetDetails.imageData,
  }

  return (
    <Box className={classes.root}>
      <Box className={classes.outerContainer}>
        {values.formProgress === 'details' ? (
          <Box className={classes.previewContainer}>
            <img src={assetDetails.imageData?.image} />
            <IconButton className={clsx(classes.expandBtb, classes.borderdIconButton)}>
              <ArrowExpandIcon />
            </IconButton>
          </Box>
        ) : (
          <Box className={classes.previewContainer}>
            <CardAsset asset={asset} useCardStatus={useCardStatus} />
          </Box>
        )}
      </Box>
      {assetDetails.marketData?.type === AUCTION ? <FormAuction /> : null}
      {assetDetails.marketData?.type === INSTANT_BY ? <FormBuy /> : null}
    </Box>
  )
}

function useCardStatus({ status, type, endPrice, startPrice, sold, endTime }: IUseCardStatus) {
  switch (status) {
    case LISTED:
      return LIVE_AUCTION
    default:
      return MINTED
  }
}
