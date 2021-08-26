import React from 'react'
import { Card, CardHeader, CardContent, Avatar, Typography } from '@material-ui/core'
import { IAssetDetails } from 'stores/reducers/assets/types'
import { useStyles } from './styles'
import { shortCutName } from '../../../../utils'

interface IAbout {
  creator: IAssetDetails['creatorData']
}

export default function About(props: IAbout) {
  const { creator } = props
  const styles = useStyles()
  return (
    <Card className={styles.root} elevation={0}>
      <CardHeader
        classes={{
          root: styles.header,
          title: styles.title,
          subheader: styles.subheader,
        }}
        avatar={<Avatar aria-label={status} className={styles.avatar} src={creator?.profile_image} />}
        title={creator?.fullname}
        subheader={<Typography className={styles.subheader}>@{shortCutName(creator?.userid)}</Typography>}
      />
      <CardContent classes={{ root: styles.footer }}>
        <Typography className={styles.footerText}>{creator?.overview}</Typography>
      </CardContent>
    </Card>
  )
}
