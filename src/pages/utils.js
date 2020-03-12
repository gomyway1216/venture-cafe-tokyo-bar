/**
 *  @param {string[]} currentList
 *  @param {string} filter
 *  @returns {string[]}
 */
export const filterListByValue = (currentList, filter) => {
  return currentList.filter(item => {
    const firstName = item.firstName.toLowerCase()
    const lastName = item.lastName.toLowerCase()

    return (
      item.attendeeId.includes(filter) ||
      firstName.includes(filter.toLowerCase()) ||
      lastName.includes(filter.toLowerCase())
    )
  })
}
