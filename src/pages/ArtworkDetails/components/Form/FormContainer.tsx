import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { Box, IconButton } from '@material-ui/core'
import { CardAsset, Field } from 'common'
import { useSelector, useDispatch } from 'react-redux'
import { useFormikContext } from 'formik'
import { ArrowExpandIcon } from 'common/icons'
import { FormAuction, FormBuy } from '../../components'
import { ApprovedFormState } from '../../types'
import { AssetDataTypesWithStatus, IPromotionId } from 'types'
import { selectAssetDetails, selectUserRole, selectPromotion } from 'stores/selectors'
import { addPromotionRequest, deletePromotionRequest } from 'stores/reducers/user'
import { useStyles } from './styles'
import appConst from 'config/consts'
import ImageViewer from 'common/ImageViewer'
import { getTokenSymbolByContracts } from 'utils'

const {
  TYPES: { AUCTION, INSTANT_BY },
} = appConst

export default function FormContainer() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { assetDetails } = useSelector(selectAssetDetails())
  const { promotionIds, fetchingPromo } = useSelector(selectPromotion())
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()

  const tokenSymbol = getTokenSymbolByContracts(
    assetDetails.tokenData?.contract || '',
    assetDetails.marketData?.sales_token_contract || ''
  )

  const composeData: AssetDataTypesWithStatus = assetDetails.marketData
    ? {
        ...assetDetails.marketData,
        status: assetDetails.status as string,
        userData: assetDetails.ownerData as AssetDataTypesWithStatus['userData'],
        imageData: assetDetails.imageData as AssetDataTypesWithStatus['imageData'],
        tokenSymbol,
      }
    : {
        current_price: '',
        created_at: '',
        updated_at: '',
        id: assetDetails.imageData?.id as AssetDataTypesWithStatus['imageData']['id'],
        end_price: '',
        end_time: '',
        status: 'minted',
        item_id: `${assetDetails.tokenData?.id}`,
        type: 'instant_buy',
        platform_fee: '2.5',
        sales_token_contract: `${assetDetails.ownerData?.wallet}`,
        contract: `${assetDetails.tokenData?.contract}`,
        sold: false,
        start_time: '',
        start_price: '',
        userData: assetDetails.ownerData as AssetDataTypesWithStatus['userData'],
        imageData: assetDetails.imageData as AssetDataTypesWithStatus['imageData'],
        tokenSymbol,
      }

  const { role } = useSelector(selectUserRole())
  const isUserSuperAdmin = Boolean(role && role === appConst.USER.ROLES.ROLE_SUPER_ADMIN)

  // eslint-disable-next-line
  const handlePromotion = (e: React.ChangeEvent<any>) => {
    if (e.target.checked) {
      dispatch(addPromotionRequest({ promotionId: assetDetails.marketData?.item_id }))
    } else {
      const promotionId: IPromotionId | undefined = promotionIds.find(
        (promo) => assetDetails.marketData && Number(promo.item_id) === Number(assetDetails.marketData.item_id)
      )
      dispatch(
        deletePromotionRequest({
          promotionItemId: assetDetails.marketData?.item_id,
          promotionId,
        })
      )
    }
    setFieldValue('promotion', e.target.checked)
  }

  const ckeckPromotion = () => {
    const isPromoted = promotionIds.findIndex(
      (promo) => assetDetails.marketData && Number(promo.item_id) === Number(assetDetails.marketData.item_id)
    )
    if (isPromoted !== -1) {
      setFieldValue('promotion', true)
    } else {
      setFieldValue('promotion', false)
    }
  }

  useEffect(() => {
    if (fetchingPromo) {
      return
    }
    ckeckPromotion()
    return () => {
      ckeckPromotion()
    }
  }, [promotionIds, fetchingPromo])

  return (
    <Box className={classes.root}>
      <Box className={classes.outerContainer}>
        {values.formProgress === 'details' ? (
          <Box className={classes.previewContainer}>
            <img src={assetDetails.imageData?.image} />
            {isUserSuperAdmin && (
              <Field
                type="switch"
                name="promotion"
                label={'Promotion'}
                fullWidth={false}
                className={classes.switcher}
                onChange={handlePromotion}
                checked={Boolean(values.promotion)}
              />
            )}
            <IconButton
              className={clsx(classes.expandBtb, classes.borderdIconButton)}
              onClick={() => setIsZoomOpen(true)}
            >
              <ArrowExpandIcon />
            </IconButton>
          </Box>
        ) : (
          <Box className={classes.previewContainer}>
            <CardAsset
              asset={composeData}
              withLabel={!assetDetails.marketData || values.formProgress === 'make offer'}
              emptyBottom
            />
          </Box>
        )}
      </Box>
      {assetDetails.marketData?.type === AUCTION ? <FormAuction /> : null}
      {assetDetails.marketData?.type === INSTANT_BY || !assetDetails.marketData ? <FormBuy /> : null}
      {isZoomOpen && (
        <ImageViewer
          open={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          images={[`${assetDetails.imageData?.image}`]}
        />
      )}
    </Box>
  )
}
