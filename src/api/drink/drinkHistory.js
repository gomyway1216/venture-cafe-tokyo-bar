import { doFetch } from '../doFetch'

export const addDrinkHistoryList = eventID => {
  const requestBody = {
    query: `
      mutation AddDrinkHistoryList($eventID: ID!) {
        addDrinkHistoryList(eventID: $eventID)
      }     
    `,
    variables: {
      eventID: eventID,
    },
  }
  return doFetch(requestBody)
}
