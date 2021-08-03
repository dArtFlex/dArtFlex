import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { selectUser } from 'stores/selectors'
import { getUserAssetsRequest } from 'stores/reducers/user'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper, CircularProgressLoader, CardAsset } from 'common'
import { useStyles } from './styles'
import routes from 'routes'

export default function Sales() {
  const classes = useStyles()
  const history = useHistory()
  const { user, userAssets, fetching } = useSelector(selectUser())
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUserAssetsRequest())
  }, [])

  if (!user) {
    history.push(routes.home)
    return null
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
              {userAssets
                ?.filter((el) => !el.sold)
                .map((userAsset, i) => (
                  <CardAsset key={i} asset={userAsset} withLabel withAction />
                ))}
            </Box>
          )}
        </Box>
      </Box>
    </PageWrapper>
  )
}
