import React from 'react'
import { Image } from 'common'
import { makeStyles, createStyles } from '@material-ui/core'

const useStyles = makeStyles(() =>
  createStyles({
    image: {
      width: 24,
      height: 24,
      borderRadius: '50%',
    },
  })
)

interface IImageChain {
  chainId: number
}

const icon_eth = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png'
const icon_bsc = 'https://s2.coinmarketcap.com/static/img/coins/64x64/1839.png'
const icon_polygon = 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png'

export default function ImageChain(props: IImageChain) {
  const classes = useStyles()
  switch (props.chainId) {
    case 1:
    case 4:
      return <Image src={icon_eth} className={classes.image} />
    case 56:
    case 97:
      return <Image src={icon_bsc} className={classes.image} />
    case 137:
      return <Image src={icon_polygon} className={classes.image} />
    default:
      return null
  }
}
