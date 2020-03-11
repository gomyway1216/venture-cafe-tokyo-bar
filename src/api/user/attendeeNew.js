import moment from 'moment'
import { doFetch } from './doFetch'

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
      query GetAttendee($id: String!) {
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
        mutation CheckInUser($id: String!, $date: String!) {
          checkInUser(checkInUserInput: {
            _id: $id, date: $date
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
      query ResetAttendeeDrinkList($id: String!) {
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
        mutation UpdateAttendeeDrinkList($id: String!, $availableDrinkID: String!, $date: String!) {
          updateAttendeeDrinkList(updateAttendeeDrinkListInput: {
            _id: $id, availableDrinkID: $availableDrinkID, date: $date
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
      mutation DeleteAttendee($id: String!) {
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
