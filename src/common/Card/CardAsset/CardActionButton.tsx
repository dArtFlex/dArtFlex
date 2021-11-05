import React, { useEffect, useState } from 'react'
import { CircularProgressLoader } from '../../index'
import { Box, Button } from '@material-ui/core'
import { useStyles } from './styles'
import { useSelector } from 'react-redux'
import { selectBid, selectMakeOffer } from '../../../stores/selectors'

interface ICardActionButton {
  acceptOffer?: () => void
  acceptBid?: () => void
}

export default function CardActionButton(props: ICardActionButton) {
  const { acceptOffer, acceptBid } = props
  const [fetching, setIsFetching] = useState(false)
  const classes = useStyles()

  const onAccept = () => {
    setIsFetching(true)
    acceptOffer && acceptOffer()
    acceptBid && acceptBid()
  }

  const { bid } = useSelector(selectBid())
  const { offer } = useSelector(selectMakeOffer())

  useEffect(() => {
    if (!bid.fetching && !offer.fetching) {
      setIsFetching(false)
    }
  }, [!bid.fetching && !offer.fetching])

  return (
    <>
      {fetching ? (
        <Box className={classes.loaderWrapper}>
          <CircularProgressLoader />
        </Box>
      ) : (
        <Button
          onClick={(e) => {
            e.stopPropagation()
            onAccept()
          }}
          variant={'outlined'}
          fullWidth
          className={classes.acceptBtn}
        >
          Accept {acceptOffer ? 'Offer' : 'Bid'}
        </Button>
      )}
    </>
  )
}
