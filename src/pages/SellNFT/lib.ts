import * as yup from 'yup'

export function useValidationSchema() {
  return yup.object().shape({
    startDate: yup.date().min(new Date(), 'Incorrect date'),
    endDate: yup.date().min(new Date(), 'Incorrect date'),
    reservePrice: yup
      .number()
      .moreThan(0, 'Reserve price should be more then 0')
      .moreThan(yup.ref('minimumBid'), 'Reserve price should be more then minimum bid'),
    minimumBid: yup.number().moreThan(0, 'Minimin bid should be more then 0'),
    price: yup.number().moreThan(0, 'Price bid should be more then 0'),
  })
}
