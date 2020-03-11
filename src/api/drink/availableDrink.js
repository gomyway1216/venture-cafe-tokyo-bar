import moment from 'moment'
import { doFetch } from '../doFetch'

export const existAvailableDrink = id => {
  const requestBody = {
    query: `
      query ExistAvailableDrink($id: String!) {
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
      query GetAvailableDrink($id: String!) {
        getAvailableDrink(id: $id) {
          id: _id
          drinkID
          name
          drinkType {
              name
          }
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
        }
      }
      `,
  }
  return doFetch(requestBody)
}

export const addAvailableDrink = id => {
  const requestBody = {
    query: `
      mutation AddAvailableDrink($id: String!) {
        addAvailableDrink(id: $id) {
          id: _id
          drinkID
          name
          drinkType {
            name
          }
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
      mutation updateAvailableDrinkCount($id: String!, $date: String!) {
        updateAvailableDrinkCount(id: $id, date: $date) {
          id: _id
          drinkID
          name
          drinkType {
            name
          }
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
      mutation DeleteAvailableDrink($id: String!) {
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
      mutation DeleteAvailableDrinks($id: String!) {
        deleteAvailableDrinks(id: $id)
      }
    `,
  }
  return doFetch(requestBody)
}
