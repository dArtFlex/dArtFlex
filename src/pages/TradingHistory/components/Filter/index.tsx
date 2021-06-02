import React, { useState } from 'react'
import { Box, Button, FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core'
import { CurrentDownIcon, RefreshIcon, CloseIcon } from 'common/icons'
import { Popover } from 'common'
import { useStyles } from './styles'

export default function Filter() {
  const [open, setOpen] = useState<null | HTMLElement>(null)
  const classes = useStyles()

  return (
    <>
      <Box className={classes.flex}>
        <Button
          className={classes.btnFilter}
          classes={{ label: classes.btnFilterLabel }}
          variant={'outlined'}
          color={'primary'}
          fullWidth
          disableElevation
          onClick={(event: React.SyntheticEvent<EventTarget>) => {
            const target = event.currentTarget as HTMLElement
            setOpen(target)
          }}
          endIcon={<CurrentDownIcon />}
        >
          Filter By
        </Button>

        <Box className={classes.filtersBtnBox}>
          <Button className={classes.filtersBtn} color={'primary'} variant={'outlined'} endIcon={<CloseIcon />}>
            Minted
          </Button>
          <Button className={classes.filtersBtn} color={'primary'} variant={'outlined'} endIcon={<CloseIcon />}>
            Place a bid
          </Button>
          <Button className={classes.filtersBtn} color={'primary'} variant={'outlined'} endIcon={<CloseIcon />}>
            Sold
          </Button>
        </Box>

        <Button className={classes.btnRefreshIcon} startIcon={<RefreshIcon />}>
          Clear Filters
        </Button>
      </Box>

      <Popover anchorEl={open} onClose={() => setOpen(null)}>
        <FormGroup className={classes.formGroup}>
          <FormControlLabel
            classes={{ label: classes.formLabel }}
            control={<Checkbox name="Minted" color={'primary'} />}
            label={<Typography noWrap>Minted</Typography>}
          />
          <FormControlLabel
            classes={{ label: classes.formLabel }}
            control={<Checkbox name="Listed" color={'primary'} />}
            label={<Typography noWrap>Listed</Typography>}
          />
          <FormControlLabel
            classes={{ label: classes.formLabel }}
            control={<Checkbox name="Place a bid" color={'primary'} />}
            label={<Typography noWrap>Place a bid </Typography>}
          />
          <FormControlLabel
            classes={{ label: classes.formLabel }}
            control={<Checkbox name="Sold" color={'primary'} />}
            label={<Typography noWrap>Sold</Typography>}
          />
          <FormControlLabel
            classes={{ label: classes.formLabel }}
            control={<Checkbox name="Transferred" color={'primary'} />}
            label={<Typography noWrap>Transferred</Typography>}
          />
          <FormControlLabel
            classes={{ label: classes.formLabel }}
            control={<Checkbox name="Owned" color={'primary'} />}
            label={<Typography noWrap>Owned</Typography>}
          />
        </FormGroup>
      </Popover>
    </>
  )
}
