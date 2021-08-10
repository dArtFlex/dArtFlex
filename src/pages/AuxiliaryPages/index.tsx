import React from 'react'
import { PageWrapper } from 'common'
import { useStyles } from './styles'
import { Box, Typography } from '@material-ui/core'

interface IAuxiliaryPage {
  children: JSX.Element
  title: string
}

export default function AuxiliaryPage(props: IAuxiliaryPage) {
  const { children, title } = props
  const classes = useStyles()
  return (
    <PageWrapper className={classes.auxiliaryWrapper}>
      <>
        <Typography variant={'h1'}>{title}</Typography>
        <Box className={classes.textBlock}>{children}</Box>
      </>
    </PageWrapper>
  )
}
