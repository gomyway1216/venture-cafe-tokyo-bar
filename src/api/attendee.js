import moment from 'moment'
import { doFetch } from './doFetch'

// when an attendee existed in db just check in,
// accessing the backend to add the attendee to current attendee
export const onSignIn = id => {
  const requestBody = {
    query: `
            mutation SignInAttendee($id: String!, $date: String!){
              signInAttendee(signInAttendeeInput: {_id: $id, date: $date}) {
                id: _id
                attendeeId
                firstName
                lastName
                drinks {
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

// when attendee's drink changes, update the database each time
export const updateAttendeeDrink = ({ id, drinkId }) => {
  const requestBody = {
    query: `
        mutation UpdateAttendeeDrinks($id: String!, $drinkId: String!, $date: String!) {
          updateAttendeeDrinks(updateAttendeeDrinksInput: {_id: $id, drinkId: $drinkId, date: $date}) {
            id: _id
            attendeeId
            firstName
            lastName
            drinks {
              id: _id
              name
            }
          }
        }
      `,
    variables: {
      id: id,
      drinkId: drinkId,
      date: moment().format(),
    },
  }

  return doFetch(requestBody)
}

// fetch all the currentAttendees to show the signed in attendee list
export const fetchSignedInAttendees = () => {
  const requestBody = {
    query: `
          query {
            currentAttendees {
              id: _id
              attendeeId
              firstName
              lastName
              drinks {
                id: _id
                name
              }
            }
          }
        `,
  }

  return doFetch(requestBody)
}

// fetch all the signed up attendees
export const fetchAttendees = () => {
  this.setState({ isLoading: true })
  const requestBody = {
    query: `
        query {
          attendees {
            userId
            name
            drinkCounter
          }
        }
      `,
  }

  doFetch(requestBody)
    .then(resData => {
      const attendees = resData.data.attendees
      if (this.isActive) {
        this.setState({
          attendees: attendees,
          filteredAttendees: attendees,
          isLoading: false,
        })
      }
    })
    .catch(err => {
      console.log(err)
      if (this.isActive) {
        this.setState({ isLoading: false })
      }
    })
}

// deleting all the signed in attendees from the signed in list
export const deleteAllCurrentAttendees = () => {
  const requestBody = {
    query: `
        mutation {
            deleteAllCurrentAttendees
        }
      `,
  }

  return doFetch(requestBody)

  // doFetch(requestBody)
  //   .then(async resData => {
  //     await fetchSignedInAttendees(
  //       token,
  //       setAttendees,
  //       setFilteredAttendees,
  //       setLoading
  //     )
  //     setLoading(false)
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     setLoading(false)
  //   })
}
