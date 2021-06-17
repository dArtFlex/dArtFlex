import React from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectAsset } from 'stores/selectors'
import { Box } from '@material-ui/core'
import { PageWrapper, CardAsset } from 'common'
import { InfoBid } from './components'
import { useStyles } from './styles'
import routes from '../../routes'

export default function BidDetails() {
  const classes = useStyles()
  const history = useHistory()
  const { assetDetails, fetching } = useSelector(selectAsset())

  if (assetDetails.imageData === null && fetching === false) {
    history.push(routes.artworks)
    return null
  }

  return (
    <PageWrapper>
      <Box className={classes.bidContainer}>
        <Box className={classes.outerContainer}>
          <Box className={classes.previewContainer}>
            <CardAsset asset={assetDetails.imageData?.image} />
          </Box>
        </Box>
        <Box className={classes.bidInfoBox}>
          <InfoBid />
        </Box>
      </Box>
    </PageWrapper>
  )
}
