import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import { StylesConfig } from './index'

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'grid',
      alignItems: 'baseline',
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
