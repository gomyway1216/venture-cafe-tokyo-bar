import moment from 'moment'
import { doFetch } from './doFetch'

export const existEventType = id => {
  const requestBody = {
    query: `
      query ExistEventType($id: String!) {
        existEventType(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getEventType = id => {
  const requestBody = {
    query: `
      query GetEventType($id: String!) {
        getEventType(id: $id) {
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

export const getEventTypeList = () => {
  const requestBody = {
    query: `
      query {
        getEventTypeList {
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

export const addEventType = name => {
  const requestBody = {
    query: `
      mutation AddEventType($name: String!) {
        addEventType(name: $name) {
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

export const deleteEventType = id => {
  const requestBody = {
    query: `
      mutation DeleteEventType($id: String!) {
        deleteEventType(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}
