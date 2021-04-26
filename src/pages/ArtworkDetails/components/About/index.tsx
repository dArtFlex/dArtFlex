import React from 'react'
import clsx from 'clsx'
import {
  Card,
  CardHeader,
  CardContent,
  Avatar,
  IconButton,
  Typography,
  Box,
  Link,
  Divider,
  Button,
} from '@material-ui/core'
import { SmileyFaceIcon } from 'common/icons'
import { useStyles } from './styles'

export default function About() {
  const styles = useStyles()
  return (
    <Card className={styles.root} elevation={0}>
      <CardHeader
        classes={{
          root: styles.header,
          title: styles.title,
          subheader: styles.subheader,
        }}
        avatar={<Avatar aria-label={status} className={styles.avatar} src="https://picsum.photos/200/300" />}
        title="Giana Press"
        subheader={<Typography className={styles.subheader}>@gianapress</Typography>}
      />
      <CardContent classes={{ root: styles.footer }}>
        <Typography className={styles.footerText}>
          Tiana is the Co-founder and Creative Director at Toast. He is a 3D artist that specializes in creating
          whimsical, vibrant content.
        </Typography>
      </CardContent>
    </Card>
  )
}
