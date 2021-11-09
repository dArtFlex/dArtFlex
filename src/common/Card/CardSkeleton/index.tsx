import React from 'react'
import { Card, Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import { useStyles } from '../CardAsset/styles'
import { useRootStyles } from './styles'

export default function CardSkeleton() {
  const classes = useStyles()
  const classesRoot = useRootStyles()
  return (
    <Card elevation={1} className={classes.root}>
      <Box className={classes.artContainer}>
        <Skeleton variant="rect" className={classesRoot.imageEl} />
      </Box>
      <Box className={classes.artInfoContainer}>
        <Skeleton variant="circle" className={classesRoot.avatarEl} />
        <Skeleton variant="text" className={classesRoot.textEl} />
      </Box>
      <Skeleton variant="rect" className={classesRoot.sectionEl} />
    </Card>
  )
}
