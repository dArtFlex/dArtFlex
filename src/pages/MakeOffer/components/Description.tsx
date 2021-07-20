import React from 'react'
import { Typography } from '@material-ui/core'
import { useStyles } from '../styles'

export default function Description() {
  const classes = useStyles()

  return (
    <>
      <Typography className={classes.descriptionText}>
        On your way to deliver your shipment, you see this sleeping bird blocking your way. What would you do?
      </Typography>
      <Typography className={classes.descriptionText}>
        However, reviewers tend to be distracted by comprehensible content, say, a random text copied from a newspaper
        or the internet. The are likely to focus on the text, disregarding the layout and its elements.
      </Typography>
      <Typography className={classes.descriptionText}>
        Besides, random text risks to be unintendedly humorous or offensive, an unacceptable risk in corporate
        environments. Lorem ipsum and its many variants have been employed since the early 1960ies, and quite likely
        since the sixteenth century.
      </Typography>
    </>
  )
}
