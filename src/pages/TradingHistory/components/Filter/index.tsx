import React, { useState } from 'react'
import { Box, Button, FormGroup, FormControlLabel, Checkbox, Typography } from '@material-ui/core'
import { CurrentDownIcon, RefreshIcon, CloseIcon } from 'common/icons'
import { Popover } from 'common'
import { useStyles } from './styles'
import { ITradingHistoryFilter } from '../../types'
import { IFilterProps } from './types'

const FILTERS: ITradingHistoryFilter[] = [
  {
    label: 'Minted',
    name: 'minted',
    checked: false,
  },
  {
    label: 'Listed',
    name: 'listed',
    checked: false,
  },
  {
    label: 'Place a bid',
    name: 'bidded',
    checked: false,
  },
  {
    label: 'Sold',
    name: 'sold',
    checked: false,
  },
  {
    label: 'Owned',
    name: 'purchased',
    checked: false,
  },
]

export default function Filter(props: IFilterProps) {
  const { onFilter } = props
  const [open, setOpen] = useState<null | HTMLElement>(null)
  const classes = useStyles()

  const [filters, setFilters] = useState<ITradingHistoryFilter[]>(FILTERS)

  const handleFilter = (filters: ITradingHistoryFilter[]) => {
    onFilter(filters.filter((f) => f.checked).map((f) => f.name))
  }

  const onSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const _filters = filters.map((f) => (f.name === event.target.name ? { ...f, checked: event.target.checked } : f))
    setFilters(_filters)
    handleFilter(_filters)
  }

  const onClear = () => {
    const _filters = filters.map((f) => ({ ...f, checked: false }))
    setFilters(_filters)
    handleFilter(_filters)
  }

  const handleRemoveSortValue = (value: ITradingHistoryFilter) => {
    const selectedFilters = filters.map((f) => (f.name === value.name ? { ...f, checked: false } : f))
    setFilters(selectedFilters)
    handleFilter(selectedFilters)
  }

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

        {/*<Box className={classes.filtersBtnBox}>*/}
        {filters
          .filter((f) => f.checked)
          .map((el) => (
            <Button
              key={el.name}
              className={classes.filtersBtn}
              color={'primary'}
              variant={'outlined'}
              endIcon={<CloseIcon />}
              onClick={() => handleRemoveSortValue(el)}
            >
              {el.label}
            </Button>
          ))}
        {/*</Box>*/}

        <Button onClick={onClear} className={classes.btnRefreshIcon} startIcon={<RefreshIcon />}>
          Clear Filters
        </Button>
      </Box>

      <Popover anchorEl={open} onClose={() => setOpen(null)}>
        <FormGroup onChange={onSelect} className={classes.formGroup}>
          {filters.map((item) => (
            <FormControlLabel
              key={item.name}
              classes={{ label: classes.formLabel }}
              control={<Checkbox name={item.name} color={'primary'} />}
              label={<Typography noWrap>{item.label}</Typography>}
              checked={item.checked}
            />
          ))}
        </FormGroup>
      </Popover>
    </>
  )
}
