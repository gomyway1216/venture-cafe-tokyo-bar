import moment from 'moment'
import { doFetch } from '../doFetch'

export const existRegisteredDrink = id => {
  const requestBody = {
    query: `
      query ExistRegisteredDrink($id: String!) {
        existRegisteredDrink(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getRegisteredDrink = id => {
  const requestBody = {
    query: `
      query GetRegisteredDrink($id: String!) {
        getRegisteredDrink(id: $id) {
          id: _id
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

export const getRegisteredDrinkList = () => {
  const requestBody = {
    query: `
      query {
        getRegisteredDrinkList {
          id: _id
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

export const addRegisteredDrink = ({ name, drinkTypeID }) => {
  const requestBody = {
    query: `
      mutation AddRegisteredDrink($name: String!, $drinkTypeID: String!) {
        addRegisteredDrink(name: $name, drinkTypeID: $drinkTypeID) {
          id: _id
          name
          drinkType {
            name
          }
        }
      }
      `,
    variables: {
      name: name,
      drinkTypeID: drinkTypeID,
    },
  }
  return doFetch(requestBody)
}

export const deleteRegisteredDrink = id => {
  const requestBody = {
    query: `
      mutation DeleteRegisteredDrink($id: String!) {
        deleteRegisteredDrink(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}
