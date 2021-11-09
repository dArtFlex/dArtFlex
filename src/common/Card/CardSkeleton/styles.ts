import { createStyles, makeStyles } from '@material-ui/core/styles'

export const useRootStyles = makeStyles(() =>
  createStyles({
    imageEl: {
      width: '100%',
      height: 242,
    },
    sectionEl: {
      height: 83,
    },
    avatarEl: {
      width: 32,
      height: 32,
    },
    textEl: {},
  })
)
