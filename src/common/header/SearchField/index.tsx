import React, { Dispatch, SetStateAction } from 'react'
import { Icon, TextField } from '@material-ui/core'
import { CloseIcon, SearchIcon } from 'common/icons'
import { useStyles } from './styles'

export default function SearchField({
  onSearch,
  isMobile,
  setSearchFieldOpen,
}: {
  onSearch: (value: string) => void
  isMobile?: boolean
  setSearchFieldOpen?: Dispatch<SetStateAction<boolean>>
}) {
  const classes = useStyles()

  return (
    <TextField
      variant={'outlined'}
      placeholder="Items, accounts, creator, k..."
      classes={{ root: classes.searchInputBox }}
      onChange={(e) => {
        onSearch(e.target.value)
      }}
      InputProps={{
        classes: {
          input: classes.searchInput,
          notchedOutline: classes.inputWrapper,
        },
        startAdornment: (
          <>
            {isMobile ? (
              <Icon className={classes.searchIcon} onClick={() => setSearchFieldOpen!(false)}>
                <CloseIcon />
              </Icon>
            ) : (
              <Icon className={classes.searchIcon}>
                <SearchIcon />
              </Icon>
            )}
          </>
        ),
      }}
    />
  )
}
