import React, { useEffect } from 'react'
import clsx from 'clsx'
import { Box, IconButton } from '@material-ui/core'
import { CardAsset, Field } from 'common'
import { useSelector, useDispatch } from 'react-redux'
import { useFormikContext } from 'formik'
import { ArrowExpandIcon } from 'common/icons'
import { FormAuction, FormBuy } from '../../components'
import { ApprovedFormState } from '../../types'
import { AssetDataTypesWithStatus } from 'types'
import { selectAssetDetails, selectUserRole, selectPromotion } from 'stores/selectors'
import { addPromotionRequest, deletePromotionRequest } from 'stores/reducers/user'
import { useStyles } from './styles'
import appConst from 'config/consts'

const {
  TYPES: { AUCTION, INSTANT_BY },
} = appConst

export default function FormContainer() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { assetDetails } = useSelector(selectAssetDetails())
  const { promotionIds } = useSelector(selectPromotion())

  const { values, setFieldValue } = useFormikContext<ApprovedFormState>()

  const composeData: AssetDataTypesWithStatus | null = assetDetails.marketData
    ? {
        ...assetDetails.marketData,
        status: assetDetails.status as string,
        userData: assetDetails.ownerData as AssetDataTypesWithStatus['userData'],
        imageData: assetDetails.imageData as AssetDataTypesWithStatus['imageData'],
      }
    : null

  const { role } = useSelector(selectUserRole())
  const isUserSuperAdmin = Boolean(role && role === appConst.USER.ROLES.ROLE_SUPER_ADMIN)

  // eslint-disable-next-line
  const handleAddPromotion = (e: any) => {
    if (e.target.checked) {
      dispatch(addPromotionRequest({ promotionId: assetDetails.marketData?.item_id }))
    } else {
      const excludePromotion = promotionIds.filter(
        (pId) => assetDetails.marketData && Number(pId) !== Number(assetDetails.marketData.item_id)
      )
      dispatch(deletePromotionRequest({ promotionId: excludePromotion }))
    }
    setFieldValue('promotion', e.target.checked)
  }

  const ckeckPromotion = () => {
    const isPromoted = promotionIds.findIndex(
      (pId) => assetDetails.marketData && Number(pId) === Number(assetDetails.marketData.item_id)
    )

    if (isPromoted !== -1) {
      setFieldValue('promotion', true)
    } else {
      setFieldValue('promotion', false)
    }
  }

  useEffect(() => {
    ckeckPromotion()
    return () => {
      ckeckPromotion()
    }
  }, [promotionIds, assetDetails])

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
                onChange={handleAddPromotion}
                checked={Boolean(values.promotion)}
              />
            )}
            <IconButton className={clsx(classes.expandBtb, classes.borderdIconButton)}>
              <ArrowExpandIcon />
            </IconButton>
          </Box>
        ) : (
          <Box className={classes.previewContainer}>
            {composeData !== null ? <CardAsset asset={composeData} /> : null}
          </Box>
        )}
      </Box>
      {assetDetails.marketData?.type === AUCTION ? <FormAuction /> : null}
      {assetDetails.marketData?.type === INSTANT_BY ? <FormBuy /> : null}
    </Box>
  )
}
