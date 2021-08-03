import React, { useState } from 'react'
import clsx from 'clsx'
import { Box, Button, IconButton } from '@material-ui/core'
import { MoreHorizontalIcon } from 'common/icons'
import { useStyles } from './styles'

interface IHashTagsFilter {
  tags: string[]
  withAction?: boolean
}

export default function HashTagsFilter(props: IHashTagsFilter) {
  const { tags, withAction = false } = props
  const classes = useStyles()
  const [activeHashTags, setActiveHashTags] = useState<string[]>([])

  return (
    <Box className={classes.hashtagsWrapper}>
      {tags.map((tag) => {
        const isActive = Boolean(activeHashTags.find((h) => h === tag))
        return (
          <Button
            key={tag}
            variant={'outlined'}
            className={clsx(classes.hashTagBtn, isActive && classes.hashTagBtnActive)}
            onClick={() =>
              setActiveHashTags(isActive ? activeHashTags.filter((a) => a !== tag) : [...activeHashTags, tag])
            }
          >
            {tag}
          </Button>
        )
      })}
      {withAction && (
        <IconButton className={classes.btnAction}>
          <MoreHorizontalIcon />
        </IconButton>
      )}
    </Box>
  )
}
