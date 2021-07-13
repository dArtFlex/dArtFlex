import React from 'react'
import { Icon, TextField } from '@material-ui/core'
import { SearchIcon } from 'common/icons'
import { useStyles } from './styles'

export default function SearchField() {
  const classes = useStyles()

  return (
    <TextField
      variant={'outlined'}
      placeholder="Items, accounts, creator, k..."
      classes={{ root: classes.searchInputBox }}
      InputProps={{
        classes: {
          input: classes.searchInput,
          notchedOutline: classes.inputWrapper,
        },
        startAdornment: (
          <Icon className={classes.searchIcon}>
            <SearchIcon />
          </Icon>
        ),
      }}
    />
  )
}
