import React, { useState } from 'react'
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import { ArrowDownIcon } from 'common/icons'
import { useStyles } from './styles'

export default function Instructions() {
  const classes = useStyles()
  const [expanded, setExpanded] = useState<boolean>(false)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = () => (event: React.ChangeEvent<any>, newExpanded: boolean) => {
    setExpanded(newExpanded ? true : false)
  }

  return (
    <Accordion
      square
      expanded={expanded}
      onChange={handleChange()}
      classes={{ root: classes.rootAccordion, expanded: classes.expandedAccordion }}
    >
      <AccordionSummary
        expandIcon={<ArrowDownIcon />}
        aria-label="Expand"
        aria-controls="panel1d-content"
        id="panel1d-header"
        classes={{
          root: classes.rootSummary,
          content: classes.contentSummary,
          expanded: classes.expandedSummary,
        }}
      >
        <Typography className={classes.summaryTitle}>Instructions</Typography>
      </AccordionSummary>
      <AccordionDetails
        classes={{
          root: classes.rootDetails,
        }}
      >
        <Typography className={classes.mainText} color={'textPrimary'}>
          dArtflex is decentralized, so we never escrow your items. As a result, if this is your first time selling a
          crypto collectible, you need to complete 2 free (plus gas) transactions: # To initialize your account for
          making sell orders, which only needs to be done once for your account.
        </Typography>

        <Typography className={classes.mainText} color={'textPrimary'}>
          {`To allow dArtflex to access your item (or all items in the collection, if the collection supports it) when a
            sale occurs. After that, you'll see a signature request to finalize your listing. In the future, as long as
            the item was approved in step 2 above, you won't have any transactions at all, only a signature! This is how
            we can (almost) achieve gas-free listings.`}
        </Typography>

        <Typography className={classes.mainText} color={'textPrimary'}>
          Note that you can always decrease the price of your listing for free, without making a transaction or paying
          gas. You can view all your items here.
        </Typography>
      </AccordionDetails>
    </Accordion>
  )
}
