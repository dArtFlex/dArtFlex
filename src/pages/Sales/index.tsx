import React from 'react'
import { useSelector } from 'react-redux'
import { selectAssets } from 'stores/selectors'
import { Box, Typography } from '@material-ui/core'
import { PageWrapper, CircularProgressLoader, CardAsset } from 'common'
import appConst from 'config/consts'
import { useStyles } from './styles'

const {
  FILTER_VALUES: { IN_AUCTION, BUY_NOW },
} = appConst

export default function Sales() {
  const classes = useStyles()
  const { assets, fetching } = useSelector(selectAssets())

  return (
    <PageWrapper className={classes.container}>
      <Box>
        <Typography variant={'h1'} color={'textPrimary'}>
          Sales
        </Typography>
        <Box className={classes.grid} mt={6} mb={4}>
          {fetching ? (
            <CircularProgressLoader />
          ) : (
            <>
              {assets
                ?.filter((el) => {
                  return el.sold
                })
                .map((asset, i) => (
                  <CardAsset key={i} asset={asset} withLabel withAction />
                ))}
            </>
          )}
        </Box>
      </Box>
    </PageWrapper>
  )
}
