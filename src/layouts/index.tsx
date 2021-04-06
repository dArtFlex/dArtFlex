import React from 'react'
import Box from '@material-ui/core/Box'
// import { SideBar } from 'common'
import { useStyles } from './styles'
import { createSelector } from 'reselect'
import { stateType } from 'stores/reducers'
import { useDispatch, useSelector } from 'react-redux'
import { toogleSideBar } from 'stores/reducers/user'

const selectData = () =>
  createSelector(
    (store: stateType) => store,
    ({ user: { isOpenSideBar } }: stateType) => ({ isOpenSideBar })
  )

interface IMainLayoutProps {
  children: JSX.Element
}

export const MainLayout = ({ children }: IMainLayoutProps): JSX.Element => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const { isOpenSideBar } = useSelector(selectData())
  const handleSideBarToggle = () => {
    dispatch(toogleSideBar())
  }

  return (
    <div className={classes.root}>
      <Box className={classes.mainContainer}>
        {/*<SideBar isOpenSideBar={isOpenSideBar} handleSideBarToggle={handleSideBarToggle} />*/}
        <Box className={classes.main}>{children}</Box>
      </Box>
    </div>
  )
}
