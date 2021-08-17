import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  selectMinting,
  selectWalletError,
  selectUser,
  selectListing,
  selectBuy,
  selectBid,
  selectMakeOffer,
  selectManagement,
} from 'stores/selectors'
import { Footer, Header, Modal, WalletError } from 'common'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'
import { clearMintError } from '../../stores/reducers/minting'
import { clearUserError } from '../../stores/reducers/user'
import { clearListingError } from '../../stores/reducers/listing'
import { clearBuyNowError } from '../../stores/reducers/buyNow'
import { clearBidError } from '../../stores/reducers/placeBid'
import { clearMakeOfferError } from '../../stores/reducers/makeOffer'
import { clearManagementError } from '../../stores/reducers/management'
import Snack from '../../common/Snack'

interface IMainLayoutProps {
  children: JSX.Element
  toggleTheme: () => void
  hiddenFooter?: boolean
}

export default function MainLayout({ toggleTheme, hiddenFooter, children }: IMainLayoutProps): JSX.Element {
  const classes = useStyles()
  const { error: errorWallet } = useSelector(selectWalletError())
  const {
    minting: { error: errorMinting },
  } = useSelector(selectMinting())
  const { error: errorUser } = useSelector(selectUser())
  const {
    listing: { error: errorListing },
  } = useSelector(selectListing())
  const {
    buy: { error: errorBuy },
  } = useSelector(selectBuy())
  const {
    bid: { error: errorBid },
  } = useSelector(selectBid())
  const {
    offer: { error: errorOffer },
  } = useSelector(selectMakeOffer())
  const { error: errorManagement } = useSelector(selectManagement())

  const dispatch = useDispatch()

  const [open, setOpen] = useState<boolean>(false)
  const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false)

  useEffect(() => {
    typeof errorWallet === 'string' && setOpen(Boolean(errorWallet.length))
  }, [errorWallet])

  const errorMessage =
    errorMinting || errorUser || errorListing || errorBuy || errorBid || errorOffer || errorManagement
  useEffect(() => {
    typeof errorMessage === 'object' &&
      // We need to show notificaton only when
      // 4001 code is reject transaction in metamask
      errorMessage?.code === 4001 &&
      errorMessage?.message &&
      setSnackBarOpen(Boolean(errorMessage.message.length))
  }, [errorMessage])

  function onCloseSnackbar() {
    setSnackBarOpen(false)
    dispatch(clearMintError())
    dispatch(clearUserError())
    dispatch(clearListingError())
    dispatch(clearBuyNowError())
    dispatch(clearMakeOfferError())
    dispatch(clearBidError())
    dispatch(clearManagementError())
  }

  return (
    <div className={classes.root}>
      <Header toggleTheme={toggleTheme} />
      <Box className={classes.wrapper}>
        {children}
        {!hiddenFooter && <Footer />}
      </Box>
      <Snack
        message={typeof errorMessage === 'object' && errorMessage?.message ? errorMessage.message : ''}
        open={snackbarOpen}
        onClose={onCloseSnackbar}
      />
      <Modal open={open} onClose={() => setOpen(false)} body={<WalletError />} withAside />
    </div>
  )
}
