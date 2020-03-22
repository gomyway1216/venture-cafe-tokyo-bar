import moment from 'moment'
import { doFetch } from '../doFetch'

export const existAvailableDrink = id => {
  const requestBody = {
    query: `
      query ExistAvailableDrink($id: ID!) {
        existAvailableDrink(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getAvailableDrink = id => {
  const requestBody = {
    query: `
      query GetAvailableDrink($id: ID!) {
        getAvailableDrink(id: $id) {
          id: _id
          drinkID
          name
          event {
            id: _id
            name
          }
          drinkType {
            name
          }
          consumedDateList
        }
      }
      `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getAvailableDrinkList = eventID => {
  const requestBody = {
    query: `
      query GetAvailableDrinkList($eventID: ID!){
        getAvailableDrinkList(eventID: $eventID) {
          id: _id
          drinkID
          name
          event {
            id: _id
            name
          }
          drinkType {
            name
          }
          consumedDateList
        }
      }
      `,
    variables: {
      eventID: eventID,
    },
  }
  return doFetch(requestBody)
}

export const addAvailableDrink = ({ id, eventID }) => {
  const requestBody = {
    query: `
      mutation AddAvailableDrink($id: ID!, $eventID: ID!) {
        addAvailableDrink(addAvailableDrinkInput: {
          id: $id
          eventID: $eventID
        }) {
          id: _id
          drinkID
          name
          event {
            id: _id
            name
          }
          drinkType {
            name
          }
          consumedDateList
        }
      }
      `,
    variables: {
      id: id,
      eventID: eventID,
    },
  }
  return doFetch(requestBody)
}

export const updateAvailableDrinkCount = id => {
  const requestBody = {
    query: `
      mutation updateAvailableDrinkCount($id: ID!, $date: String!) {
        updateAvailableDrinkCount(id: $id, date: $date) {
          id: _id
          drinkID
          name
          event {
            id: _id
            name
          }
          drinkType {
            name
          }
          consumedDateList
        }
      }
      `,
    variables: {
      id: id,
      date: moment().format(),
    },
  }
  return doFetch(requestBody)
}

export const updateAvailableDrinkList = ({ compositeDrinkList, eventID }) => {
  const requestBody = {
    query: `
      mutation UpdateAvailableDrinkList($compositeDrinkList: [CompositeDrink!]!, $eventID: ID!) {
        updateAvailableDrinkList(updateAvailableDrinkListInput: {
          compositeDrinkList: $compositeDrinkList,
          eventID: $eventID
        })
      }
    `,
    variables: {
      compositeDrinkList: compositeDrinkList,
      eventID: eventID,
    },
  }
  return doFetch(requestBody)
}

export const deleteAvailableDrink = id => {
  const requestBody = {
    query: `
      mutation DeleteAvailableDrink($id: ID!) {
        deleteAvailableDrink(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const deleteAvailableDrinks = eventID => {
  const requestBody = {
    query: `
      mutation DeleteAvailableDrinks($eventID: ID!) {
        deleteAvailableDrinks(eventID: $eventID)
      }
    `,
    variables: {
      eventID: eventID,
    },
  }
  return doFetch(requestBody)
}
