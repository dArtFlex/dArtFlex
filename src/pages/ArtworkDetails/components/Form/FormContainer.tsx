import React from 'react'
import clsx from 'clsx'
import { Box, IconButton } from '@material-ui/core'
import { CardAsset } from 'common'
import { useSelector } from 'react-redux'
import { useFormikContext } from 'formik'
import { ArrowExpandIcon } from 'common/icons'
import { FormAuction, FormBuy } from '../../components'
import { ApprovedFormState } from '../../types'
import { AssetDataTypesWithStatus } from 'types'
import { selectAssetDetails } from 'stores/selectors'
import { useStyles } from './styles'
import appConst from 'config/consts'

const {
  TYPES: { AUCTION, INSTANT_BY },
} = appConst

export default function FormContainer() {
  const classes = useStyles()
  const { assetDetails } = useSelector(selectAssetDetails())

  const { values } = useFormikContext<ApprovedFormState>()

  const composeData: AssetDataTypesWithStatus | null = assetDetails.marketData
    ? {
        ...assetDetails.marketData,
        status: assetDetails.status as string,
        userData: assetDetails.ownerData as AssetDataTypesWithStatus['userData'],
        imageData: assetDetails.imageData as AssetDataTypesWithStatus['imageData'],
      }
    : null

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
            {composeData !== null ? <CardAsset asset={composeData} /> : null}
          </Box>
        )}
      </Box>
      {assetDetails.marketData?.type === AUCTION ? <FormAuction /> : null}
      {assetDetails.marketData?.type === INSTANT_BY ? <FormBuy /> : null}
    </Box>
  )
}
