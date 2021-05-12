import React from 'react'
import DucolLayout from 'layouts/DucolLayout'
import { Box } from '@material-ui/core'
import { Aside } from './components'

export default function SellArtwork() {
  return (
    <DucolLayout aside={<Aside />} containerSize={'minmax(270px, 554px)'} asideSize={'325px'}>
      <Box>Sell Artwork</Box>
    </DucolLayout>
  )
}
