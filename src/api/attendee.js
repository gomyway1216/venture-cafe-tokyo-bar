import moment from 'moment'

// when an attendee existed in db just check in,
// accessing the backend to add the attendee to current attendee
export const onSignIn = (id, token, updateAttendees) => {
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

  fetch(`${process.env.REACT_APP_URL}graphql`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      updateAttendees(resData.data.signInAttendee)
    })
    .catch(err => {
      console.log(err)
    })
}

// when attendee's drink changes, update the database each time
export const updateAttendeeDrink = (
  token,
  isActive,
  id,
  drinkId,
  updateSingleAttendee,
  setLoading
) => {
  setLoading(true)
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

  fetch(`${process.env.REACT_APP_URL}graphql`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      const currentAttendee = resData.data.updateAttendeeDrinks
      if (isActive) {
        updateSingleAttendee(currentAttendee)
        setLoading(false)
      }
    })
    .catch(err => {
      console.log(err)
      if (isActive) {
        setLoading(false)
      }
    })
}

// fetch all the currentAttendees to show the signed in attendee list
export const fetchSignedInAttendees = (
  token,
  isActive,
  setAttendees,
  setFilteredAttendees,
  setLoading
) => {
  setLoading(true)
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

  fetch(`${process.env.REACT_APP_URL}graphql`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      const currentAttendees = resData.data.currentAttendees
      if (isActive) {
        setAttendees(currentAttendees)
        setFilteredAttendees(currentAttendees)
        setLoading(false)
      }
    })
    .catch(err => {
      console.log(err)
      if (isActive) {
        setLoading(false)
      }
    })
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

  fetch(`${process.env.REACT_APP_URL}graphql`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
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
export const deleteAllCurrentAttendees = (
  token,
  isActive,
  setAttendees,
  setFilteredAttendees,
  setLoading
) => {
  setLoading(true)

  const requestBody = {
    query: `
        mutation {
            deleteAllCurrentAttendees
        }
      `,
  }

  fetch(`${process.env.REACT_APP_URL}graphql`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(async resData => {
      await fetchSignedInAttendees(
        token,
        isActive,
        setAttendees,
        setFilteredAttendees,
        setLoading
      )
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
}
