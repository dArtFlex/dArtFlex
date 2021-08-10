import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser, selectSearch } from 'stores/selectors'
import { getUserAssetsRequest } from 'stores/reducers/user'
import { unlistingRequest } from 'stores/reducers/listing'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper, CircularProgressLoader, CardAsset } from 'common'
import { useStyles } from './styles'
import { useSearchAssets } from 'hooks'
import routes from 'routes'
import appConst from 'config/consts'

const { STATUSES } = appConst

export default function Sales() {
  const classes = useStyles()
  const history = useHistory()
  const { user, userAssets, fetching } = useSelector(selectUser())
  const { search } = useSelector(selectSearch())
  const dispatch = useDispatch()

  const searchUserAsset = useSearchAssets({ assets: userAssets, search })

  useEffect(() => {
    dispatch(getUserAssetsRequest())
  }, [])

  if (!user) {
    history.push(routes.home)
    return null
  }

  const handleUnlisted = (market_id: string) => {
    dispatch(unlistingRequest({ market_id }))
    dispatch(getUserAssetsRequest())
  }

  return (
    <PageWrapper className={classes.container}>
      <Box>
        <Typography variant={'h1'} color={'textPrimary'}>
          Sales
        </Typography>
        <Box>
          {fetching && userAssets.length === 0 ? (
            <CircularProgressLoader />
          ) : (
            <Box className={classes.grid}>
              {searchUserAsset
                ?.filter((el) => !el.sold)
                .map((userAsset, i) => (
                  <CardAsset
                    key={i}
                    asset={userAsset}
                    withLabel
                    withAction={Boolean(userAsset.status === STATUSES.LISTED)}
                    menu={{
                      onUnlisted: () => handleUnlisted(String(userAsset.id)),
                    }}
                  />
                ))}
            </Box>
          )}
        </Box>
      </Box>
    </PageWrapper>
  )
}
