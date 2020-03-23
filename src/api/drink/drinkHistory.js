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

export const getDrinkHistoryList = () => {
  const requestBody = {
    query: `
      query {
        getDrinkHistoryList {
          id: _id
          date
          registeredDrink {
            id: _id
            name
          }
          event {
            id: _id
            name
          }
        }
      }
    `,
  }
  return doFetch(requestBody)
}
