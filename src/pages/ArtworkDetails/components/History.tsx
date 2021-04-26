//@ts-nocheck
import React, { useState } from 'react'
import { Box, Button, makeStyles, createStyles } from '@material-ui/core'
import { CardHistory } from 'common'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'

const history = [
  {
    user: 'you',
    status: 'logged',
    title: '13 Apr 2021 at 14:34',
    expDate: 'in 5 days',
    src: 'https://picsum.photos/200/300',
  },
  {
    user: '@john.k',
    status: 'logged',
    title: '13 Apr 2021 at 14:34',
    expDate: 'in 5 days',
    src: 'https://picsum.photos/200/300',
    action: () => console.log('action'),
  },
  {
    user: undefined,
    status: 'listed',
    title: '13 Apr 2021 at 14:34',
    expDate: undefined,
    src: 'https://picsum.photos/200/300',
    action: undefined,
  },
  {
    user: undefined,
    status: 'minted',
    title: '13 Apr 2021 at 14:34',
    expDate: undefined,
    src: 'https://picsum.photos/200/300',
    action: undefined,
  },
  {
    user: undefined,
    status: 'canceled',
    title: '13 Apr 2021 at 14:34',
    expDate: undefined,
    src: 'https://picsum.photos/200/300',
    action: undefined,
  },
]

const useStyles = makeStyles((theme: Theme) =>
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

  if (history.length > 4 && !showMore) {
    return (
      <Box mt={3} mb={3}>
        {history.slice(0, 4).map(({ status, ...rest }, i) => (
          <CardHistory key={i} {...rest} status={status} />
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
      {history.map(({ status, ...rest }, i) => (
        <CardHistory key={i} {...rest} status={status} />
      ))}
    </Box>
  )
}
