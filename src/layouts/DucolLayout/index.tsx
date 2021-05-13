import React from 'react'
import { Box } from '@material-ui/core'
import { useStyles } from './styles'

interface IDucolLayoutProps {
  aside: React.ReactElement
  children: React.ReactNode
  asideSize: string
  containerSize?: string
  gap?: number
}

export type StylesConfig = {
  asideSize: Pick<IDucolLayoutProps, 'asideSize'>['asideSize']
  containerSize: Pick<IDucolLayoutProps, 'containerSize'>['containerSize']
  gap: Pick<IDucolLayoutProps, 'gap'>['gap']
}

export default function DucolLayout(props: IDucolLayoutProps) {
  const { children, aside, containerSize, gap, asideSize } = props
  const classes = useStyles({ containerSize, asideSize, gap })

  return (
    <Box className={classes.root}>
      {children}
      <aside className={classes.aside}>{aside}</aside>
    </Box>
  )
}
