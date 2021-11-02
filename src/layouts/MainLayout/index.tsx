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
  selectUserSuccessMessage,
  selectAlbum,
  selectConstructor,
} from 'stores/selectors'
import { Footer, Header, Modal, WalletError } from 'common'
import { useStyles } from './styles'
import { Box } from '@material-ui/core'
import { clearMintError } from '../../stores/reducers/minting'
import { clearUserError, clearUserSuccessMessage } from '../../stores/reducers/user'
import { clearListingError } from '../../stores/reducers/listing'
import { clearBuyNowError } from '../../stores/reducers/buyNow'
import { clearBidError, clearBidSuccessMessage } from '../../stores/reducers/placeBid'
import { clearMakeOfferError, clearMakeOfferSuccessMessage } from '../../stores/reducers/makeOffer'
import { clearManagementError } from '../../stores/reducers/management'
import { walletError } from '../../stores/reducers/wallet'
import { clearAlbumSuccessMessage } from 'stores/reducers/album'
import { cancelledStyleTransfer } from 'stores/reducers/constructor'
import Snack from '../../common/Snack'

interface IMainLayoutProps {
  children: JSX.Element
  toggleTheme: () => void
}

export default function MainLayout({ toggleTheme, children }: IMainLayoutProps): JSX.Element {
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
    offer: { error: errorOffer, success: successMessage },
  } = useSelector(selectMakeOffer())
  const { error: errorManagement } = useSelector(selectManagement())
  const { success: successUserMessage } = useSelector(selectUserSuccessMessage())
  const {
    bid: { bidSuccess },
  } = useSelector(selectBid())
  const { success: successAlbumMessage } = useSelector(selectAlbum())
  const { error: errorConstructor } = useSelector(selectConstructor())

  const dispatch = useDispatch()

  const [open, setOpen] = useState<boolean>(false)
  const [snackbarOpen, setSnackBarOpen] = useState<boolean>(false)

  useEffect(() => {
    typeof errorWallet === 'string' && setOpen(Boolean(errorWallet.length))
  }, [errorWallet])

  const errorMessage =
    errorMinting ||
    errorUser ||
    errorListing ||
    errorBuy ||
    errorBid ||
    errorOffer ||
    errorManagement ||
    errorWallet ||
    errorConstructor

  useEffect(() => {
    typeof errorMessage === 'object' &&
      // We need to show notificaton only when
      // 4001 code is reject transaction in metamask
      errorMessage?.code === 4001 &&
      errorMessage?.message &&
      setSnackBarOpen(Boolean(errorMessage.message.length))
  }, [errorMessage])

  const successGlobalMessage = successMessage || successUserMessage || bidSuccess || successAlbumMessage

  useEffect(() => {
    successGlobalMessage && setSnackBarOpen(Boolean(successGlobalMessage.length))
  }, [successGlobalMessage])

  function onCloseSnackbar() {
    setSnackBarOpen(false)
    dispatch(clearMintError())
    dispatch(clearUserError())
    dispatch(clearListingError())
    dispatch(clearBuyNowError())
    dispatch(clearMakeOfferError())
    dispatch(clearBidError())
    dispatch(clearManagementError())
    dispatch(clearMakeOfferSuccessMessage())
    dispatch(clearUserSuccessMessage())
    dispatch(walletError({ error: '' }))
    dispatch(clearBidSuccessMessage())
    dispatch(clearAlbumSuccessMessage())
    dispatch(cancelledStyleTransfer())
  }

  return (
    <div className={classes.root}>
      <Header toggleTheme={toggleTheme} />
      <Box className={classes.wrapper}>
        {children}
        <Footer />
      </Box>
      <Snack
        errorMessage={typeof errorMessage === 'object' && errorMessage?.message ? errorMessage.message : ''}
        open={snackbarOpen}
        onClose={onCloseSnackbar}
        successMessage={successGlobalMessage}
      />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        disableBackdropClick
        disableEscapeKeyDown
        withoutCloseBtn
        body={<WalletError />}
        withAside
      />
    </div>
  )
}
