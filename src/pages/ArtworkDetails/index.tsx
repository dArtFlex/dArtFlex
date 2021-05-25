//@ts-nocheck
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Box, IconButton } from '@material-ui/core'
import { PageWrapper, CardAsset } from 'common'
import { FormContainer } from './components'
import { ArrowExpandIcon } from 'common/icons'
import { selectAsset } from 'stores/selectors'
import { useStyles } from './styles'

export default function ArtworkDetails() {
  const classes = useStyles()
  const { id } = useParams<{ id: string }>()
  const { asset } = useSelector(selectAsset(id))
  const [formId, setFormId] = useState<number>(1)

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
              <img src={asset?.image} />
              <IconButton className={clsx(classes.expandBtb, classes.borderdIconButton)}>
                <ArrowExpandIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <FormContainer tokenId={id} formId={formId} setFormId={setFormId} />
      </Box>
    </PageWrapper>
  )
}
