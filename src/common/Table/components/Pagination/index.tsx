import React, { useState } from 'react'

import { Box, Typography, useTheme, IconButton } from '@material-ui/core'
import {
  FirstPage as FirstPageIcon,
  KeyboardArrowLeft,
  KeyboardArrowRight,
  LastPage as LastPageIcon,
} from '@material-ui/icons'
import { IPagination } from './types'
import { useStyles } from './styles'

export default function PaginationActions(props: IPagination) {
  const { count, rowsPerPage, page, onChangePage = () => {} } = props // eslint-disable-line @typescript-eslint/no-empty-function
  const classes = useStyles()
  const theme = useTheme()
  const [inputVal, setInputVal] = useState<string | number>('')
  const pagecount = Math.ceil(count / rowsPerPage)

  const preventGoLess = page === 0
  const preventGoFurther = page + 1 >= pagecount

  const handleFirstPageButtonClick = (e: React.MouseEvent<HTMLButtonElement> | null) => onChangePage(e, 0)
  const handleBackButtonClick = (e: React.MouseEvent<HTMLButtonElement> | null) => onChangePage(e, page - 1)
  const handleNextButtonClick = (e: React.MouseEvent<HTMLButtonElement> | null) => onChangePage(e, page + 1)
  const handleLastPageButtonClick = (e: React.MouseEvent<HTMLButtonElement> | null) => onChangePage(e, pagecount - 1)

  const handlePageNumber = (num: string) => {
    if (num === '') return setInputVal(num)
    const regex = /\d+$/
    if (!regex.test(num) && num !== '') return
    if (+num > pagecount) {
      setInputVal(pagecount)
    } else if (typeof num === 'number' && num < 1) {
      setInputVal(1)
    } else {
      setInputVal(num)
    }
  }

  // eslint-disable-next-line
  const submitPageNumber = (e: any) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault()
      const _page = e.target.value
      if (_page === '') return
      if (_page > pagecount) {
        onChangePage(e, pagecount)
      } else {
        onChangePage(e, _page - 1)
      }
    }
  }

  const handleBlur = () => setInputVal('')

  return (
    <Box className={classes.root}>
      <input
        className={classes.input}
        placeholder="Page"
        value={inputVal}
        onChange={(e) => handlePageNumber(e.target.value)}
        onKeyDown={(e) => submitPageNumber(e)}
        onBlur={handleBlur}
      />

      <IconButton onClick={handleFirstPageButtonClick} disabled={preventGoLess} aria-label="first page">
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>

      <IconButton onClick={handleBackButtonClick} disabled={preventGoLess} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>

      <Typography component="span" className={classes.currentPage}>
        {page + 1}
      </Typography>

      <IconButton onClick={handleNextButtonClick} disabled={preventGoFurther} aria-label="next page">
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>

      <IconButton onClick={handleLastPageButtonClick} disabled={preventGoFurther} aria-label="last page">
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  )
}
