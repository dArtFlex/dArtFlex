import React from 'react'
import { useFormikContext } from 'formik'
import { Box, Typography, Card, Button, Divider, Link } from '@material-ui/core'
import { ArrowRightIcon } from 'common/icons'
import { ISellArtwork } from '../../types'
import { IAsideProps } from './types'
import { IChaintIdHexFormat, IBaseTokens } from 'types'
import { walletService } from 'services/wallet_service'
import { useStyles } from './styles'
import appConst from 'config/consts'
import { tabelTimeFormat, networkConvertor, supportedNetwork } from 'utils'
import tokensAll from 'core/tokens'

const {
  TYPES: { AUCTION },
} = appConst

export default function Aside(props: IAsideProps) {
  const { form } = props
  const classes = useStyles()
  const { values, handleSubmit } = useFormikContext<ISellArtwork>()

  const chainId: number = walletService.getChainId()
  const convertChainId: IChaintIdHexFormat | number = networkConvertor(chainId)

  const tokens: IBaseTokens[] =
    supportedNetwork(convertChainId) && typeof convertChainId !== 'number' ? tokensAll[convertChainId] : []

  const tokenName = tokens.find((token) => token.id === values.salesTokenContract)?.symbol

  return (
    <Box>
      <Typography className={classes.asideTitle}>Summary</Typography>
      <Card className={classes.card}>
        <Typography className={classes.sectionTitle}>Fees</Typography>
        <Box pb={1}>
          <Typography className={classes.mainText} color={'textSecondary'}>
            Listing is free! At the time of the sale, the following fees will be deducted.
          </Typography>
          <Link href={'#'} underline={'none'} className={classes.link}>
            Learn more
          </Link>
        </Box>
        <Box className={classes.flexColumn} pt={3}>
          <Typography className={classes.mainText}>To dArtflex</Typography>
          <Typography className={classes.mainText}>2,5%</Typography>
        </Box>
        <Box className={classes.flexColumn} pt={3}>
          <Typography className={classes.mainText}>
            <b>Total</b>
          </Typography>
          <Typography className={classes.mainText}>
            <b>2,5%</b>
          </Typography>
        </Box>

        <Divider className={classes.divider} />
        <Typography className={classes.sectionTitle}>Listing</Typography>
        {form === AUCTION ? (
          <Box pb={5}>
            <Typography className={classes.textListing}>
              Your item will be auctioned. The highest bidder will win it on{' '}
              {tabelTimeFormat(values.endDate || `${new Date()}`, true)}, as long as their bid is at least Ξ
              {`${values.minimumBid || 0}`}.
            </Typography>
          </Box>
        ) : (
          <Box pb={5}>
            {values.futureTime ? (
              <Typography className={classes.textListing}>
                {`Your item will be listed for ${
                  values.price || 0
                } ${tokenName} and is scheduled to list on ${tabelTimeFormat(
                  values.startDate || `${new Date()}`,
                  true
                )}.`}
              </Typography>
            ) : (
              <Typography className={classes.textListing}>{`Your item will be listed for ${
                values.price || 0
              } ${tokenName}`}</Typography>
            )}
          </Box>
        )}
        <Button
          onClick={() => handleSubmit()}
          variant={'contained'}
          color={'primary'}
          endIcon={<ArrowRightIcon />}
          fullWidth
        >
          Post Your Listing
        </Button>
      </Card>
    </Box>
  )
}
