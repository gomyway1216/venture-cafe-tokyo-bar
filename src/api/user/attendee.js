import moment from 'moment'
import { doFetch } from '../doFetch'

export const existAttendee = id => {
  const requestBody = {
    query: `
      query ExistAttendee($id: String!) {
        existAttendee(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getAttendee = id => {
  const requestBody = {
    query: `
      query GetAttendee($id: ID!) {
        getAttendee(id: $id) {
          id: _id
          userID
          firstName
          lastName
          drinkList {
            id: _id
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

export const getAttendeeList = () => {
  const requestBody = {
    query: `
      query {
        getAttendeeList {
            id: _id
            userID
            firstName
            lastName
            drinkList {
              id: _id
              name
            }
        }
      }
    `,
  }
  return doFetch(requestBody)
}

/**
 * API call
 *
 * @param {string} id userID included in the QR code.
 * @return {Attendee} returns updated Attendee object
 */
export const checkInUser = id => {
  const requestBody = {
    query: `
        mutation CheckInUser($id: ID!, $date: String!) {
          checkInUser(checkInUserInput: {
            id: $id, date: $date
          }) {
            id: _id
            userID
            firstName
            lastName
            drinkList {
              id: _id
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

export const resetAttendeeDrinkList = id => {
  const requestBody = {
    query: `
      query ResetAttendeeDrinkList($id: ID!) {
        resetAttendeeDrinkList(id: $id) {
          id: _id
          userID
          firstName
          lastName
          drinkList {
            id: _id
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

/**
 * API call
 *
 * @param {string} id userID included in the QR code.
 * @param {string} id userID included in the QR code.
 * @return {Attendee} returns updated Attendee object
 */
export const updateAttendeeDrinkList = ({ id, availableDrinkID }) => {
  const requestBody = {
    query: `
        mutation UpdateAttendeeDrinkList($id: ID!, $availableDrinkID: ID!, $date: String!) {
          updateAttendeeDrinkList(updateAttendeeDrinkListInput: {
            id: $id, availableDrinkID: $availableDrinkID, date: $date
          }) {
            id: _id
            userID
            firstName
            lastName
            drinkList {
              id: _id
              name
            }
          }
        }
      `,
    variables: {
      id: id,
      availableDrinkID: availableDrinkID,
      date: moment().format(),
    },
  }
  return doFetch(requestBody)
}

export const deleteAttendee = id => {
  const requestBody = {
    query: `
      mutation DeleteAttendee($id: ID!) {
        deleteAttendee(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const deleteAttendees = () => {
  const requestBody = {
    query: `
      mutation {
        deleteAttendees
      }
    `,
  }
  return doFetch(requestBody)
}
