import { doFetch } from '../doFetch'

export const existEvent = id => {
  const requestBody = {
    query: `
      query ExistEvent($id: ID!) {
        existEvent(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getEvent = id => {
  const requestBody = {
    query: `
      query GetEvent($id: ID!) {
        getEvent(id: $id) {
          id: _id
          name
          eventType {
            name
          }
          date
          location
        }
      }
      `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getEventList = () => {
  const requestBody = {
    query: `
      query {
        getEventList {
          id: _id
          name
          eventType {
            name
          }
          date
          location
        }
      }
      `,
  }
  return doFetch(requestBody)
}

export const addEvent = ({ name, eventTypeID, location, date }) => {
  const requestBody = {
    query: `
      mutation AddEvent($name: String!, $eventTypeID: ID!, 
        $date: String!, $location: String!) {
        addEvent(addEventInput: {
          name: $name, eventTypeID: $eventTypeID, 
            date: $date, location: $location
        }) {
          id: _id
          name
          eventType {
            name
          }
          date
          location
        }
      }
      `,
    variables: {
      name: name,
      eventTypeID: eventTypeID,
      date: date,
      location: location,
    },
  }
  return doFetch(requestBody)
}

export const deleteEvent = id => {
  const requestBody = {
    query: `
      mutation DeleteEvent($id: ID!) {
        deleteEvent(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}
