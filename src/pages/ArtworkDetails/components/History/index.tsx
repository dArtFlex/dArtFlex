import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { selectBid } from 'stores/selectors'
import { Box, Button, makeStyles, createStyles } from '@material-ui/core'
import { CardHistory } from 'common'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'

const useStyles = makeStyles(() =>
  createStyles({
    showMoreBtn: {
      fontSize: 16,
      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
  })
)

export default function History() {
  const [showMore, setShowMore] = useState<boolean>(false)
  const classes = useStyles()
  const {
    bid: { bidHistory },
  } = useSelector(selectBid())

  if (bidHistory.length > 4 && !showMore) {
    return (
      <Box mt={3} mb={3}>
        {bidHistory.slice(0, 4).map((props, i) => (
          <CardHistory key={i} {...props} />
        ))}
        <Button
          classes={{ root: classes.showMoreBtn }}
          disableRipple
          fullWidth
          onClick={() => setShowMore(true)}
          endIcon={<ArrowDropDownIcon />}
        >
          Show More
        </Button>
      </Box>
    )
  }

  return (
    <Box mt={3} mb={3}>
      {bidHistory.map((props, i) => (
        <CardHistory key={i} {...props} />
      ))}
    </Box>
  )
}
