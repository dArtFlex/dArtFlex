//@ts-nocheck
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import clsx from 'clsx'
import { Box, IconButton } from '@material-ui/core'
import { PageWrapper, CardAsset } from 'common'
import { DetailsForm, ApprovedForm, ApprovedSubForm } from './components'
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
        <Form tokenId={id} formId={formId} setFormId={setFormId} />
      </Box>
    </PageWrapper>
  )
}

const Form = (props) => {
  const { tokenId, formId, setFormId }: { tokenId: number; formId: number; seFormId: (formId: number) => void } = props

  switch (formId) {
    case 1:
      return <DetailsForm tokenId={tokenId} onSubmit={() => setFormId(formId + 1)} />
    case 2:
      return <ApprovedForm tokenId={tokenId} onSubmit={() => setFormId(formId + 1)} />
    case 3:
      return <ApprovedSubForm tokenId={tokenId} />
    default:
      return null
  }
}
