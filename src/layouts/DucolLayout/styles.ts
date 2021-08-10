import { createStyles, makeStyles } from '@material-ui/core/styles'
import { StylesConfig } from './index'
import { Theme } from '@material-ui/core'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      alignItems: 'flex-start',
      gridTemplateColumns: ({ containerSize, asideSize }: StylesConfig) => {
        return containerSize ? `${containerSize} ${asideSize}` : `1fr ${asideSize}`
      },
      justifyContent: 'center',
      wordBreak: 'break-word',
      gap: ({ gap }: StylesConfig) => {
        return gap ? gap : 0
      },
      [theme.breakpoints.down(1025)]: {
        gridTemplateColumns: '1fr !important',
        gridTemplateRows: '1fr',
      },
    },
    aside: {},
  })
)
