import React, { useState } from 'react'
import { CardAsset, PageWrapper } from '../../common'
import { Box, IconButton } from '@material-ui/core'
import clsx from 'clsx'
import { ArrowExpandIcon } from '../../common/icons'
import { FormContainer } from '../ArtworkDetails/components'
import { useStyles } from './styles'
import FormOfferContainer from './components/Form/FormOfferContainer'

export default function MakeOffer() {
  const classes = useStyles()

  const [formId, setFormId] = useState<number>(1)

  return (
    <PageWrapper>
      <Box className={classes.root}>
        <Box>
          {formId > 1 ? (
            <Box className={classes.previewContainer}>
              <CardAsset
                asset={
                  'https://images.theconversation.com/files/393071/original/file-20210401-13-1lf7qzh.jpg?ixlib=rb-1.1.0&rect=0%2C95%2C4000%2C3275&q=45&auto=format&w=496&fit=clip'
                }
              />
            </Box>
          ) : (
            <Box className={classes.previewContainer}>
              <img
                src={
                  'https://images.theconversation.com/files/393071/original/file-20210401-13-1lf7qzh.jpg?ixlib=rb-1.1.0&rect=0%2C95%2C4000%2C3275&q=45&auto=format&w=496&fit=clip'
                }
              />
              <IconButton className={clsx(classes.expandBtb, classes.borderdIconButton)}>
                <ArrowExpandIcon />
              </IconButton>
            </Box>
          )}
        </Box>
        <FormOfferContainer tokenId={'1001'} formId={formId} setFormId={setFormId} />
      </Box>
    </PageWrapper>
  )
}
