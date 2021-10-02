const prepareDate = (date) => {
  const dateAsArray = date.split('.')
  const preparedDate = `${dateAsArray[2]}-${dateAsArray[1]}-${dateAsArray[0]}`
  return preparedDate
}

module.exports = prepareDate
