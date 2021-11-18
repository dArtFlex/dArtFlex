import React from 'react'
import { useSelector } from 'react-redux'
import { selectUser } from 'stores/selectors'
import { useHistory } from 'react-router-dom'
import { Box, Avatar, Typography, makeStyles, createStyles, Theme } from '@material-ui/core'
import routes from 'routes'
import { shortCutName } from 'utils'

interface IUserBox {
  wallet: string
  userImage: string
  userId: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      display: 'inline-flex',
      marginRight: theme.spacing(2),
    },
    avatarBox: {
      display: 'flex',
      alignItems: 'center',
    },
    hoverText: {
      '&:hover': {
        textDecoration: 'underline',
        cursor: 'pointer',
      },
    },
  })
)

export default function UserBox(props: IUserBox) {
  const classes = useStyles()
  const history = useHistory()
  const { userImage, wallet, userId } = props
  const { user } = useSelector(selectUser())

  const onOpenProfile = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (wallet === user?.wallet) {
      history.push(routes.dashboard)
    } else {
      history.push(routes.profile.replace(':id', wallet))
    }
  }

  return (
    <Box display={'flex'} mb={4} alignItems={'center'}>
      <Avatar className={classes.avatar} alt="Avatar" src={userImage} />
      <Typography variant={'h4'} onClick={onOpenProfile} className={classes.hoverText}>
        @{shortCutName(userId)}
      </Typography>
    </Box>
  )
}
