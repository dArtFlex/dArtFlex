//@ts-nocheck
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import { Box, IconButton } from '@material-ui/core'
import { PageWrapper, CardAsset } from 'common'
import { FormContainer } from './components'
import { ArrowExpandIcon } from 'common/icons'
import { selectAsset } from 'stores/selectors'
import { getAssetByIdRequest, clearAssetDetails } from 'stores/reducers/assets'
import { placeBidRequest } from 'stores/reducers/placeBid'
import { useStyles } from './styles'

export default function ArtworkDetails() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { id } = useParams<{ id: string }>()
  const { assetDetails } = useSelector(selectAsset())
  const [formId, setFormId] = useState<number>(1)

  useEffect(() => {
    dispatch(getAssetByIdRequest(id))
    return () => {
      dispatch(clearAssetDetails())
    }
  }, [])

  useEffect(() => {
    if (assetDetails.marketData) {
      dispatch(placeBidRequest())
    }
  }, [assetDetails])

  if (assetDetails.tokenData === null) {
    return null
  }

  return (
    <PageWrapper>
      <Box className={classes.root}>
        <Box className={classes.outerContainer}>
          {formId > 1 ? (
            <Box className={classes.previewContainer}>
              <CardAsset asset={asset} />
            </Box>
          ) : (
            <Box className={classes.previewContainer}>
              <img src={assetDetails.imageData?.image} />
              <IconButton className={clsx(classes.expandBtb, classes.borderdIconButton)}>
                <ArrowExpandIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <FormContainer formId={formId} setFormId={setFormId} />
      </Box>
    </PageWrapper>
  )
}
