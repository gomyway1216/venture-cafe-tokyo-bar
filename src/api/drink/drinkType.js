import moment from 'moment'
import { doFetch } from './doFetch'

export const existDrinkType = id => {
  const requestBody = {
    query: `
      query ExistDrinkType($id: String!) {
        existDrinkType(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getDrinkType = id => {
  const requestBody = {
    query: `
      query GetDrinkType($id: String!) {
        getDrinkType(id: $id) {
          id: _id
          name
        }
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getDrinkTypeList = () => {
  const requestBody = {
    query: `
      query {
        getDrinkTypeList {
          id: _id
          name
        }
      }
      `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const addDrinkType = name => {
  const requestBody = {
    query: `
      mutation AddDrinkType($name: String!) {
        addDrinkType(name: $name) {
          id: _id
          name
        }
      }
      `,
    variables: {
      name: name,
    },
  }
  return doFetch(requestBody)
}

export const deleteDrinkType = id => {
  const requestBody = {
    query: `
      mutation DeleteDrinkType($id: String!) {
        deleteDrinkType(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}
