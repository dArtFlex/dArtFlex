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
import i_11 from 'common/icons/library/forest1.jpg'
import i_12 from 'common/icons/library/forest2.jpg'
import i_13 from 'common/icons/library/forest3.jpg'
import i_14 from 'common/icons/library/glass.jpg'
import i_15 from 'common/icons/library/leaves1.jpg'
import i_16 from 'common/icons/library/leaves2.jpg'
import i_17 from 'common/icons/library/pumpkin1.jpg'
import i_18 from 'common/icons/library/pumpkin2.jpg'
import i_19 from 'common/icons/library/pumpkin3.jpg'

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
  {
    src: i_11,
    order: Math.random(),
  },
  {
    src: i_12,
    order: Math.random(),
  },
  {
    src: i_13,
    order: Math.random(),
  },
  {
    src: i_14,
    order: Math.random(),
  },
  {
    src: i_15,
    order: Math.random(),
  },
  {
    src: i_16,
    order: Math.random(),
  },
  {
    src: i_17,
    order: Math.random(),
  },
  {
    src: i_18,
    order: Math.random(),
  },
  {
    src: i_19,
    order: Math.random(),
  },
]

export function getRandomLibraryImages() {
  return LIBRARY.sort((a, b) => a.order - b.order).map((i) => i.src)
}
