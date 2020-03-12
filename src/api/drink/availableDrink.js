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

export const getAvailableDrinkList = () => {
  const requestBody = {
    query: `
      query {
        getAvailableDrinkList {
          id: _id
          drinkID
          name
          drinkType {
            name
          }
          consumedDateList
        }
      }
      `,
  }
  return doFetch(requestBody)
}

export const addAvailableDrink = id => {
  const requestBody = {
    query: `
      mutation AddAvailableDrink($id: ID!) {
        addAvailableDrink(id: $id) {
          id: _id
          drinkID
          name
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

export const updateAvailableDrinkCount = id => {
  const requestBody = {
    query: `
      mutation updateAvailableDrinkCount($id: ID!, $date: String!) {
        updateAvailableDrinkCount(id: $id, date: $date) {
          id: _id
          drinkID
          name
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

export const deleteAvailableDrinks = () => {
  const requestBody = {
    query: `
      mutation DeleteAvailableDrinks($id: ID!) {
        deleteAvailableDrinks(id: $id)
      }
    `,
  }
  return doFetch(requestBody)
}
