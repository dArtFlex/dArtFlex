import React from 'react'
import { TextField } from '@material-ui/core'
import { SearchIcon } from 'common/icons'
import { useStyles } from './styles'

export default function SearchField() {
  const classes = useStyles()

  return (
    <TextField
      variant={'outlined'}
      placeholder="Items, accounts, creator, k..."
      InputProps={{
        classes: {
          root: classes.searchInputBox,
          input: classes.searchInput,
        },
        startAdornment: <SearchIcon />,
      }}
    />
  )
}
