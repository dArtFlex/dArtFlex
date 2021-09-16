import React, { useState } from 'react'
import clsx from 'clsx'
import { Box, Typography, Button } from '@material-ui/core'
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons'
import { Popover } from 'common'
import { IBaseTokens } from 'types'
import { useStyles } from './styles'

interface ISelectPaymentTokenProps {
  salesTokenContract: string
  setSalesTokenContract: (contract: string) => void
  tokens: IBaseTokens[]
  availableTokens?: string[]
  unavailableTokens?: string[]
}

export default function SelectPaymentToken(props: ISelectPaymentTokenProps) {
  const classes = useStyles()
  const { salesTokenContract, setSalesTokenContract, tokens, availableTokens = [], unavailableTokens = [] } = props
  const [anchor, setAnchor] = useState<null | HTMLElement>(null)

  if (!tokens) {
    return null
  }

  return (
    <>
      <Button
        onClick={(event: React.SyntheticEvent<EventTarget>) => {
          const target = event.currentTarget as HTMLElement
          setAnchor(target)
        }}
        className={classes.flexBox}
      >
        <Box className={classes.flexBox}>
          <Typography component={'span'} className={classes.textInput} color={'textSecondary'}>
            {tokens.find((token) => token.id === salesTokenContract)?.symbol}
          </Typography>
          <ArrowDropDownIcon className={classes.btn} />
        </Box>
      </Button>

      <Popover anchorEl={anchor} onClose={() => setAnchor(null)}>
        <Box className={classes.listTokens}>
          {tokens.map((token: IBaseTokens) => (
            <Button
              key={token.id}
              onClick={() => {
                setSalesTokenContract(token.id)
                setAnchor(null)
              }}
              className={clsx(classes.flexBox, token.id === salesTokenContract && classes.activeToken)}
              variant={'text'}
              disabled={
                availableTokens.some((id) => id !== token.id) || unavailableTokens.some((id) => id === token.id)
              }
            >
              <Typography component={'span'} className={classes.textInput}>
                {token.symbol}
              </Typography>
            </Button>
          ))}
        </Box>
      </Popover>
    </>
  )
}
