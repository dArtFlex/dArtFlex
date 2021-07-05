import React, { useState } from 'react'
import {
  Box,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core'
import WorksRow from './WorksRow'
import { useStyles } from '../styles'
import { ArrowLeftIcon, ArrowRightIcon } from '../../../common/icons'

export default function ContentManagementWorks() {
  const classes = useStyles()

  const [page, setPage] = useState<number>(1)

  const rowsPerPage = 10

  const handleNextPage = () => setPage(page + 1)

  const handlePreviousPage = () => setPage(page - 1)

  const worksContent = [
    {
      id: 1,
      name: 'Broadleaf Lane',
      creator: '435345ff',
      owner: '435345ff',
      isActive: true,
      pictureURL:
        'https://besthqwallpapers.com/Uploads/25-4-2020/130574/thumb2-colorful-paint-splashes-artwork-abstract-art-creative-abstract-splashes.jpg',
    },
    {
      id: 2,
      name: 'Why Does Love Always Fade...',
      creator: 'johnconnor',
      owner: 'sarah1224',
      isActive: false,
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1vhpffjHc1tkN_dWCRXj2wflTLTNE1HPFyA&usqp=CAU',
    },
    {
      id: 3,
      name: 'H74 Golden Panther',
      creator: 'gff4442',
      owner: 'johndou',
      isActive: true,
      pictureURL: 'https://news.artnet.com/app/news-upload/2021/04/30nft-art-market9-superJumbo-775x1024.jpg',
    },
    {
      id: 4,
      name: 'Broadleaf Lane',
      creator: 'johnconnor',
      owner: 'sarah1224',
      isActive: true,
      pictureURL:
        'https://besthqwallpapers.com/Uploads/25-4-2020/130574/thumb2-colorful-paint-splashes-artwork-abstract-art-creative-abstract-splashes.jpg',
    },
    {
      id: 5,
      name: 'Why Does Love Always Fade...',
      creator: 'johnconnor',
      owner: 'sarah1224',
      isActive: true,
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1vhpffjHc1tkN_dWCRXj2wflTLTNE1HPFyA&usqp=CAU',
    },
    {
      id: 6,
      name: 'H74 Golden Panther',
      creator: 'johndou',
      owner: 'sarah1224',
      isActive: true,
      pictureURL: 'https://news.artnet.com/app/news-upload/2021/04/30nft-art-market9-superJumbo-775x1024.jpg',
    },
    {
      id: 7,
      name: 'Broadleaf Lane',
      creator: 'johndou',
      owner: 'sarah1224',
      isActive: true,
      pictureURL:
        'https://besthqwallpapers.com/Uploads/25-4-2020/130574/thumb2-colorful-paint-splashes-artwork-abstract-art-creative-abstract-splashes.jpg',
    },
    {
      id: 8,
      name: 'Why Does Love Always Fade...',
      creator: 'johnconnor',
      owner: 'sarah1224',
      isActive: true,
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1vhpffjHc1tkN_dWCRXj2wflTLTNE1HPFyA&usqp=CAU',
    },
    {
      id: 9,
      name: 'H74 Golden Panther',
      creator: 'johndou',
      owner: 'sarah1224',
      isActive: true,
      pictureURL: 'https://news.artnet.com/app/news-upload/2021/04/30nft-art-market9-superJumbo-775x1024.jpg',
    },
    {
      id: 10,
      name: 'Broadleaf Lane',
      creator: 'johndou',
      owner: 'sarah1224',
      isActive: true,
      pictureURL:
        'https://besthqwallpapers.com/Uploads/25-4-2020/130574/thumb2-colorful-paint-splashes-artwork-abstract-art-creative-abstract-splashes.jpg',
    },
    {
      id: 11,
      name: 'Test 11',
      creator: '435345ff',
      owner: '435345ff',
      isActive: true,
      pictureURL:
        'https://besthqwallpapers.com/Uploads/25-4-2020/130574/thumb2-colorful-paint-splashes-artwork-abstract-art-creative-abstract-splashes.jpg',
    },
    {
      id: 12,
      name: 'Test 12',
      creator: 'johnconnor',
      owner: 'sarah1224',
      isActive: false,
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1vhpffjHc1tkN_dWCRXj2wflTLTNE1HPFyA&usqp=CAU',
    },
    {
      id: 13,
      name: 'Test 13',
      creator: 'gff4442',
      owner: 'johndou',
      isActive: true,
      pictureURL: 'https://news.artnet.com/app/news-upload/2021/04/30nft-art-market9-superJumbo-775x1024.jpg',
    },
    {
      id: 14,
      name: 'Broadleaf Lane',
      creator: 'johnconnor',
      owner: 'sarah1224',
      isActive: true,
      pictureURL:
        'https://besthqwallpapers.com/Uploads/25-4-2020/130574/thumb2-colorful-paint-splashes-artwork-abstract-art-creative-abstract-splashes.jpg',
    },
    {
      id: 15,
      name: 'Why Does Love Always Fade...',
      creator: 'johnconnor',
      owner: 'sarah1224',
      isActive: true,
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1vhpffjHc1tkN_dWCRXj2wflTLTNE1HPFyA&usqp=CAU',
    },
    {
      id: 16,
      name: 'H74 Golden Panther',
      creator: 'johndou',
      owner: 'sarah1224',
      isActive: true,
      pictureURL: 'https://news.artnet.com/app/news-upload/2021/04/30nft-art-market9-superJumbo-775x1024.jpg',
    },
    {
      id: 17,
      name: 'Broadleaf Lane',
      creator: 'johndou',
      owner: 'sarah1224',
      isActive: true,
      pictureURL:
        'https://besthqwallpapers.com/Uploads/25-4-2020/130574/thumb2-colorful-paint-splashes-artwork-abstract-art-creative-abstract-splashes.jpg',
    },
    {
      id: 18,
      name: 'Why Does Love Always Fade...',
      creator: 'johnconnor',
      owner: 'sarah1224',
      isActive: true,
      pictureURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS1vhpffjHc1tkN_dWCRXj2wflTLTNE1HPFyA&usqp=CAU',
    },
    {
      id: 19,
      name: 'H74 Golden Panther',
      creator: 'johndou',
      owner: 'sarah1224',
      isActive: true,
      pictureURL: 'https://news.artnet.com/app/news-upload/2021/04/30nft-art-market9-superJumbo-775x1024.jpg',
    },
    {
      id: 20,
      name: 'Broadleaf Lane',
      creator: 'johndou',
      owner: 'sarah1224',
      isActive: true,
      pictureURL:
        'https://besthqwallpapers.com/Uploads/25-4-2020/130574/thumb2-colorful-paint-splashes-artwork-abstract-art-creative-abstract-splashes.jpg',
    },
  ]

  const worksHeaders = ['Artwork Name', 'Creator', 'Owner', 'Status', '']

  return (
    <Box mt={5}>
      <TableContainer component={Paper} elevation={3}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {worksHeaders.map((item, index) => {
                return (
                  <TableCell key={index} className={classes.tableHeadCell}>
                    {item}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {worksContent.slice((page - 1) * 10, page * 10).map((item, index) => {
              return <WorksRow row={item} key={index} />
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box className={classes.flexBox} mt={4}>
        <Paper elevation={3} className={classes.paginationWrapper}>
          <Box className={classes.flexBox}>
            <IconButton onClick={handlePreviousPage} disabled={page === 1} className={classes.disabledButton}>
              <ArrowLeftIcon />
            </IconButton>
            <span className={classes.paginationText}>
              {page} / {worksContent.length / rowsPerPage}
            </span>
            <IconButton
              onClick={handleNextPage}
              disabled={page === worksContent.length / rowsPerPage}
              className={classes.disabledButton}
            >
              <ArrowRightIcon className={classes.arrowRight} />
            </IconButton>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}
