export const onSignIn = (id, token, updateAttendees) => {
  //   const { id, updateAttendees, token } = props
  //   const id = this.state.scanData
  const date = new Date().toISOString()

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
      date: date,
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
      //   console.log('attendees prev', this.state.attendees)
      // console.log('resData.data', resData.data)
      updateAttendees(resData.data.signInAttendee)
    })
    .catch(err => {
      console.log(err)
    })
}

export const updateAttendeeDrink = (
  token,
  isActive,
  id,
  drinkId,
  updateSingleAttendee,
  setLoading
) => {
  setLoading(true)
  // console.log('updateAttendeeDrink is called')
  // console.log('id', id)
  // console.log('drinkId', drinkId)
  // console.log('date', new Date().toISOString())
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
      date: new Date().toISOString(),
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
      // console.log('res', res)
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      // console.log('resData', resData)
      const currentAttendee = resData.data.updateAttendeeDrinks
      // console.log('drink updated currentAttendee', currentAttendee)
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

export const changeDrinkCount = (userId, difference) => {
  // // this.setState({ isLoading: true })
  // const updatingAttendee = this.state.attendees.find(
  //   attendee => attendee.userId === userId
  // )
  // const newCount = updatingAttendee.drinkCounter + difference
  // const requestBody = {
  //   query: `
  //       mutation UpdateDrinkCounter($userId: String!, $drinkCounter: Int!) {
  //         updateDrinkCounter(drinkCounterUpdateInput: {userId: $userId, drinkCounter: $drinkCounter}) {
  //           userId
  //           name
  //           drinkCounter
  //         }
  //       }
  //     `,
  //   variables: {
  //     userId: userId,
  //     drinkCounter: newCount,
  //   },
  // }
  // const token = this.context.token
  // fetch(`${process.env.REACT_APP_URL}graphql`, {
  //   method: 'POST',
  //   body: JSON.stringify(requestBody),
  //   headers: {
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + token,
  //   },
  // })
  //   .then(res => {
  //     if (res.status !== 200 && res.status !== 201) {
  //       throw new Error('Failed!')
  //     }
  //     return res.json()
  //   })
  //   .then(resData => {
  //     this.setState(prevState => {
  //       let updatedAttendees = [...prevState.attendees]
  //       updatedAttendees.find((o, i) => {
  //         if (o.userId === userId) {
  //           updatedAttendees[i] = {
  //             userId: userId,
  //             name: resData.data.updateDrinkCounter.name,
  //             drinkCounter: resData.data.updateDrinkCounter.drinkCounter,
  //           }
  //           return true
  //         }
  //       })
  //       return {
  //         attendees: updatedAttendees,
  //       }
  //     })
  //     this.filterList()
  //     // this.setState({ isLoading: false })
  //   })
  //   .catch(err => {
  //     console.log(err)
  //     // this.setState({ isLoading: false })
  //   })
}

// convert this method to fetch from the sign in user table
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
      // console.log('attendee is renewed', currentAttendees)
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
