// get the current drink list to display
// essentially, this tells what drinks does the specific day have
// this method might need refactoring
export const getCurrentDrinkList = (token, setCurrentDrinks, setLoading) => {
  setLoading(true)
  const requestBody = {
    query: `
      query {
        currentDrinks {
              id: _id
              drinkId
              name
              drinkType {
                id: _id
                name
              }
              count
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
      const currentDrinks = resData.data.currentDrinks
      setCurrentDrinks(currentDrinks)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
}

// get all the possible drinks saved in database
export const getDrinkList = (token, setDrinks, setLoading) => {
  setLoading(true)
  const requestBody = {
    query: `
      query {
        drinks {
              id: _id
              name
              drinkType {
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
      const drinks = resData.data.drinks
      setDrinks(drinks)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
}

// clean up the count for the drinks for the date
export const deleteAllCurrentDrinks = (token, setCurrentDrinks, setLoading) => {
  setLoading(true)

  const requestBody = {
    query: `
      mutation {
        deleteAllCurrentDrinks
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
      await getCurrentDrinkList(token, setCurrentDrinks, setLoading)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
}

// save the drink counts of the day into daily drinks table
export const saveAllCurrentDrinks = (token, setCurrentDrinks, setLoading) => {
  setLoading(true)

  // this should send the date of saving the drinks as a group
  const requestBody = {
    query: `
      mutation SaveAllCurrentDrinks($date: String!) {
        saveAllCurrentDrinks(date: $date)
      }
    `,
    variables: {
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
      if (res.status !== 200 && res.status !== 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(async resData => {
      await getCurrentDrinkList(token, setCurrentDrinks, setLoading)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
}
