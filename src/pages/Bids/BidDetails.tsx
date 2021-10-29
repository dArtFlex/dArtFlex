import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAssetDetails } from 'stores/selectors'
import { Box } from '@material-ui/core'
import { PageWrapper, CardAsset } from 'common'
import { InfoBid } from './components'
import { AssetDataTypesWithStatus } from 'types'
import { useStyles } from './styles'
import routes from '../../routes'
import { getTokenSymbolByContracts } from 'utils'

export default function BidDetails() {
  const classes = useStyles()
  const history = useHistory()
  const { assetDetails, fetching } = useSelector(selectAssetDetails())

  if (assetDetails.imageData === null && fetching === false) {
    history.push(routes.artworks)
    return null
  }

  const tokenSymbol = getTokenSymbolByContracts(
    assetDetails.tokenData?.contract || '',
    assetDetails.marketData?.sales_token_contract || ''
  )

  const composeData: AssetDataTypesWithStatus | null = assetDetails.marketData
    ? {
        ...assetDetails.marketData,
        status: assetDetails.status as string,
        userData: assetDetails.ownerData as AssetDataTypesWithStatus['userData'],
        imageData: assetDetails.imageData as AssetDataTypesWithStatus['imageData'],
        tokenSymbol,
      }
    : null

  return (
    <PageWrapper>
      <Box className={classes.bidContainer}>
        <Box className={classes.outerContainer}>
          <Box className={classes.previewContainer}>
            {composeData !== null ? <CardAsset asset={composeData} /> : null}
          </Box>
        </Box>
        <Box className={classes.bidInfoBox}>
          <InfoBid />
        </Box>
      </Box>
    </PageWrapper>
  )
}
