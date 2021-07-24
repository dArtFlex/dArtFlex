import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUserRole } from 'stores/selectors'
import { Box, FormControl, InputAdornment, OutlinedInput, Select as MUISelect, Typography } from '@material-ui/core'
import { useStyles } from '../styles'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import ContentManagementWorks from './ContentManagementWorks'
import { Select } from 'common'
import { SearchIcon } from 'common/icons'
import ContentManagementUsers from './ContentManagementUsers'
import { getAllUsersRequest } from 'stores/reducers/user'

export default function ContentManagementTab() {
  const [selectTable, setSelectTable] = useState('works')
  const classes = useStyles()
  const { role } = useSelector(selectUserRole())
  const dispatch = useDispatch()

  const fetchAllUser = () => {
    dispatch(getAllUsersRequest())
  }

  const fetchAllAssets = () => {
    console.log('fetchAllAssets')
  }

  useEffect(() => {
    if (role === 'ROLE_SUPER_ADMIN' && selectTable === 'works') {
      fetchAllAssets()
    } else if (role === 'ROLE_SUPER_ADMIN' && selectTable === 'users') {
      fetchAllUser()
    }
  }, [role, selectTable])

  const sortItems = [
    {
      label: 'Status: A-Z',
      value: 'statusASC',
    },
    {
      label: 'Status: Z-A',
      value: 'statusDESC',
    },
    {
      label: 'Join by Date: DESC',
      value: 'dateDESC',
    },
    {
      label: 'Join by Date: ASC',
      value: 'dateASC',
    },
  ]

  const [sortValue, setSortValue] = useState('statusASC')

  const handleChange = (event: React.MouseEvent<HTMLElement, MouseEvent>, newValue: string) => {
    setSelectTable(newValue)
  }

  return (
    <Box className={classes.managementWrapperSmall}>
      <Box className={classes.flexBox}>
        <ToggleButtonGroup exclusive onChange={handleChange} value={selectTable} className={classes.toggleButtons}>
          <ToggleButton value="works" classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected }}>
            Works
          </ToggleButton>
          <ToggleButton value="users" classes={{ root: classes.toggleButton, selected: classes.toggleButtonSelected }}>
            Users
          </ToggleButton>
        </ToggleButtonGroup>
        <FormControl variant="outlined" color={'primary'} classes={{ root: classes.sortDropDown }}>
          <MUISelect
            style={{ minWidth: '148px' }}
            value={sortValue}
            defaultValue={'Filter By'}
            onChange={({ target }: React.ChangeEvent<{ value: unknown }>) => {
              setSortValue(target.value as string)
            }}
            classes={{ select: classes.sortStatusMenu }}
            className={classes.sortStatusMenu}
          >
            <Typography variant={'body1'} color={'textSecondary'} className={classes.dropDownLabel}>
              Sort by:
            </Typography>
            {sortItems.map(({ label, value }) => (
              <Select key={value} value={value} className={classes.sortItem}>
                {label}
              </Select>
            ))}
          </MUISelect>
        </FormControl>
        <FormControl variant="outlined" className={classes.searchInput}>
          <OutlinedInput
            id="outlined-adornment-weight"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            aria-describedby="outlined-weight-helper-text"
            labelWidth={0}
            placeholder="Search"
          />
        </FormControl>
      </Box>
      {Boolean(selectTable === 'works') && <ContentManagementWorks />}
      {Boolean(selectTable === 'users') && <ContentManagementUsers />}
    </Box>
  )
}
