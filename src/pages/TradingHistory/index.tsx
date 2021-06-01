import React, { useState } from 'react'
import { Box, Typography, FormControl, Select as MUISelect } from '@material-ui/core'
import { Select } from 'common'
import appConst from 'config/consts'
import { useStyles } from './styles'

const {
  FILTER_VALUES: { MINTED },
} = appConst

const sortItems = [
  {
    label: 'Minted',
    value: MINTED,
  },
]

export default function TradingHistory() {
  const classes = useStyles()
  const [sortValue, setSortValue] = useState(MINTED)

  return (
    <Box p={8}>
      <Typography variant={'h1'} color={'textPrimary'}>
        TradingHistory
      </Typography>
      <Box mt={6} mb={4}>
        <Box className={classes.filterContainer}>
          <FormControl variant="outlined" color={'primary'}>
            <MUISelect
              style={{ minWidth: '148px' }}
              value={sortValue}
              defaultValue={'Filter By'}
              onChange={({ target }: React.ChangeEvent<{ value: unknown }>) => {
                setSortValue(target.value as string)
              }}
            >
              <Typography variant={'body1'} color={'textSecondary'} className={classes.menuTitle}>
                Sort by:
              </Typography>
              {sortItems.map(({ label, value }) => (
                <Select key={value} value={value}>
                  {label}
                </Select>
              ))}
            </MUISelect>
          </FormControl>
          <FormControl variant="outlined" color={'primary'}>
            <MUISelect
              style={{ minWidth: '148px' }}
              value={sortValue}
              defaultValue={'Filter By'}
              onChange={({ target }: React.ChangeEvent<{ value: unknown }>) => {
                setSortValue(target.value as string)
              }}
            >
              <Typography variant={'body1'} color={'textSecondary'} className={classes.menuTitle}>
                Sort by:
              </Typography>
              {sortItems.map(({ label, value }) => (
                <Select key={value} value={value}>
                  {label}
                </Select>
              ))}
            </MUISelect>
          </FormControl>
        </Box>
      </Box>
    </Box>
  )
}
