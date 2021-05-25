import { createStyles, makeStyles } from '@material-ui/core/styles'
import { StylesConfig } from './index'

export const useStyles = makeStyles(() =>
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
    },
    aside: {},
  })
)
