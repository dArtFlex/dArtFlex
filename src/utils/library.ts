import i_1 from 'common/icons/library/64-900x900.jpg'
import i_2 from 'common/icons/library/111-900x900.jpg'
import i_3 from 'common/icons/library/275-900x900.jpg'
import i_4 from 'common/icons/library/293-900x900.jpg'
import i_5 from 'common/icons/library/904-900x900.jpg'
import i_6 from 'common/icons/library/935-900x900.jpg'
import i_7 from 'common/icons/library/950-900x900.jpg'
import i_8 from 'common/icons/library/1014-900x900.jpg'
import i_9 from 'common/icons/library/1048-900x900.jpg'
import i_10 from 'common/icons/library/1074-900x900.jpg'

const LIBRARY = [
  {
    src: i_1,
    order: Math.random(),
  },
  {
    src: i_2,
    order: Math.random(),
  },
  {
    src: i_3,
    order: Math.random(),
  },
  {
    src: i_4,
    order: Math.random(),
  },
  {
    src: i_5,
    order: Math.random(),
  },
  {
    src: i_6,
    order: Math.random(),
  },
  {
    src: i_7,
    order: Math.random(),
  },
  {
    src: i_8,
    order: Math.random(),
  },
  {
    src: i_9,
    order: Math.random(),
  },
  {
    src: i_10,
    order: Math.random(),
  },
]

export function getRandomLibraryImages() {
  return LIBRARY.sort((a, b) => a.order - b.order).map((i) => i.src)
}
