import React from 'react'
import { Box } from '@material-ui/core'
import { CardHistory } from 'common'

const icon = 'https://picsum.photos/200/300'

export default function History() {
  return (
    <Box mt={3} mb={3}>
      <CardHistory status="logged" user="you" title="13 Apr 2021 at 14:34" expDate="in 5 days" src={icon} />
      <CardHistory
        status="logged"
        user="@john.k"
        cancelBid={() => console.log('action')}
        title="13 Apr 2021 at 14:34"
        expDate="in 5 days"
        src={icon}
      />
      <CardHistory status="listed" title="13 Apr 2021 at 14:34" src={icon} />
      <CardHistory status="minted" title="13 Apr 2021 at 14:34" src={icon} />
      <CardHistory status="canceled" title="13 Apr 2021 at 14:34" src={icon} />
    </Box>
  )
}
