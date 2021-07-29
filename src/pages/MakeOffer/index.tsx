import React, { useState } from 'react'
import { Box, IconButton } from '@material-ui/core'
import { CardAsset, PageWrapper } from 'common'
import clsx from 'clsx'
import { ArrowExpandIcon } from 'common/icons'
import { useStyles } from './styles'
import MakeOfferForm from './components/MakeOfferForm'
import ImageViewer from '../../common/ImageViewer'

export default function MakeOffer() {
  const [formId, setFormId] = useState<number>(2)
  const [isZoomOpen, setZoomOpen] = useState<boolean>(false)

  const asset = {
    status: 'sold',
    imageData: {
      image: 'https://ik.imagekit.io/theartling/p/original_images/fb348158589d4d89bb97988c295d52ca.jpg?tr=w-1650',
      description: 'description',
      name: 'great artwork',
      created_at: '11 July 2021',
      updated_at: '12 July 2021',
      image_data: '',
      id: 22,
      attribute: '3333',
    },
    item_id: 'great artwork',
    type: 'text',
    platform_fee: '1%',
    id: 12,
    created_at: '11 July 2021',
    updated_at: '11 July 2021',
    start_time: '10:00',
    end_time: '20:00',
    start_price: '1',
    end_price: '100',
    current_price: '0',
    sold: true,
    sales_token_contract: 'ether',
    userData: {
      id: 555,
      created_at: '11 July 2021',
      updated_at: '11 July 2021',
      fullname: 'John Smith',
      userid: 'johnsmith',
      email: 'email@email.com',
      wallet: '0x12132o3o2k21012po12',
      overview: '',
      profile_image: 'https://secure.gravatar.com/avatar/ea4a232b2a8c2b116ef27574d8c0abb7?s=400&d=mm&r=g',
      cover_image: 'https://secure.gravatar.com/avatar/ea4a232b2a8c2b116ef27574d8c0abb7?s=400&d=mm&r=g',
      ban: false,
      role: null,
      website: 'google.com',
      twitter: 'twitter.com',
      discord: '',
      instagram: '',
      tiktok: '',
      facebook: '',
      youtube: '',
      other_url: '',
    },
  }

  const classes = useStyles()
  return (
    <PageWrapper>
      <Box className={classes.root}>
        <Box>
          <Box className={classes.previewContainer}>
            {formId > 1 ? (
              <CardAsset asset={asset} />
            ) : (
              <>
                <img
                  src={
                    'https://ik.imagekit.io/theartling/p/original_images/fb348158589d4d89bb97988c295d52ca.jpg?tr=w-1650'
                  }
                  className={classes.offerPhoto}
                  alt="make-offer-image"
                />
                <IconButton
                  className={clsx(classes.expandBtb, classes.borderdIconButton)}
                  onClick={() => setZoomOpen(true)}
                >
                  <ArrowExpandIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Box>
        <MakeOfferForm formId={formId} setFormId={setFormId} />
        {isZoomOpen && (
          <ImageViewer
            open={isZoomOpen}
            onClose={() => setZoomOpen(false)}
            images={[
              'https://ik.imagekit.io/theartling/p/original_images/fb348158589d4d89bb97988c295d52ca.jpg?tr=w-1650',
            ]}
          />
        )}
      </Box>
    </PageWrapper>
  )
}
