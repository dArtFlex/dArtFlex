import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useFormikContext } from 'formik'
import { ICreateNFT } from '../../types'
import { selectMinting, selectWallet, selectHashtags } from 'stores/selectors'
import { getHashtagsAllRequest } from 'stores/reducers/assets'
import { Box, Card, Button, Typography } from '@material-ui/core'
import { CircularProgressLoader, Field, Modal, WalletConnect } from 'common'
import { ArrowLeftIcon } from 'common/icons'
import { useStyles } from './styles'

interface IMintingForm {
  onMinting: () => void
  onList: () => void
  onViewArtwork: () => void
  isTabletMobile: boolean
}

export default function MintingForm(props: IMintingForm) {
  const { onMinting, onList, onViewArtwork, isTabletMobile } = props
  const classes = useStyles()
  const dispatch = useDispatch()

  const { values, setFieldValue } = useFormikContext<ICreateNFT>()
  const [open, setOpen] = useState<boolean>(false)

  const {
    minting: { minting },
  } = useSelector(selectMinting())
  const { wallet } = useSelector(selectWallet())
  const { hashtags } = useSelector(selectHashtags())

  useEffect(() => {
    dispatch(getHashtagsAllRequest())
  }, [])

  switch (minting) {
    case 'none':
    case 'failed':
      return (
        <Box className={classes.flexBox} justifyContent={'flex-start'}>
          <Card className={classes.cardForm}>
            <Button
              variant={'text'}
              startIcon={<ArrowLeftIcon />}
              onClick={() => {
                setFieldValue('file', null)
                setFieldValue('name', '')
                setFieldValue('description', '')
              }}
            >
              Back
            </Button>
            <Box pb={4}>
              <Typography variant={'h2'}>Title and Description</Typography>
            </Box>
            <Box pb={4}>
              <Typography variant={'body1'} color={'textSecondary'}>
                Once your NFT is minted on the Ethereum blockchain, you will not be able to edit or update any of its
                information.
              </Typography>
            </Box>
            <Field type="input" name="name" variant={'outlined'} label="Title" className={classes.inputField} />
            <Field
              type="autocomplete"
              name="hashtags"
              variant={'outlined'}
              label="Hashtags"
              className={classes.inputField}
              withMultiple
              witChips
              options={hashtags ? hashtags.map((ht) => ({ title: ht.name, ...ht })) : []}
            />

            <Field
              type="slider"
              name="royalties"
              variant={'outlined'}
              label="Royalties"
              helperText={
                <>
                  <Typography component={'span'} className={classes.royaltiesAmount}>
                    {`${values.royalties}% `}
                  </Typography>
                  <Typography component={'span'} className={classes.royalties}>
                    (Suggested: 10%)
                  </Typography>
                </>
              }
              className={classes.inputField}
              defaultValue={1}
              min={1}
            />
            <Field
              type="input"
              name="description"
              variant={'outlined'}
              label="Description"
              multiline
              rows={4}
              className={classes.inputField}
            />
            <Button
              variant={'contained'}
              color={'primary'}
              fullWidth
              onClick={() => {
                if (!wallet) {
                  return setOpen(true)
                }
                onMinting()
              }}
              className={classes.btnMint}
              disabled={!Boolean(values.name.length) || !Boolean(values.description.length)}
            >
              Mint NFT
            </Button>
          </Card>

          <Modal
            open={open}
            onClose={() => setOpen(false)}
            body={<WalletConnect onClose={() => setOpen(false)} />}
            withAside
          />
        </Box>
      )
    case 'in progress':
      return (
        <Box className={classes.confirming}>
          <Box pb={4}>
            <Typography variant={'h2'}>Minting...</Typography>
          </Box>
          <Box pb={10}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Confirm this transaction with your wallet to continue. Doing this will sign your wallet as the original
              creator of the NFT.
            </Typography>
          </Box>
          <Box className={classes.loader}>
            <CircularProgressLoader />
          </Box>
        </Box>
      )
    case 'done':
      return (
        <Box className={classes.confirming}>
          <Box pb={4}>
            <Typography variant={'h2'}>Your NFT has been minted!</Typography>
          </Box>
          <Box pb={10}>
            <Typography variant={'body1'} color={'textSecondary'}>
              Congratulations! Your artwork has officially been minted as an NFT on the Blockchain
            </Typography>
          </Box>
          <Box pb={4}>
            <Button variant={'contained'} color={'primary'} onClick={onList} fullWidth={isTabletMobile}>
              List your NFT
            </Button>
          </Box>
          <Button variant={'outlined'} className={classes.btnView} onClick={onViewArtwork} fullWidth={isTabletMobile}>
            View Artwork
          </Button>
        </Box>
      )
    default:
      return null
  }
}
