export const getCurrentDrinkList = (token, setCurrentDrinks, setLoading) => {
  setLoading(true)
  // console.log('getDrinkList is called')
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
      // if (isActive) {
      //   setLoading(false)
      // }
      setLoading(false)
    })
}

export const getDrinkList = (token, setDrinks, setLoading) => {
  setLoading(true)
  // console.log('getDrinkList is called')
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
      // console.log('drinks', drinks)
      setDrinks(drinks)
    })
    .catch(err => {
      console.log(err)
      // if (isActive) {
      //   setLoading(false)
      // }
      setLoading(false)
    })
}

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
      // const currentDrinks = resData.data.deleteAllCurrentDrinks
      // console.log('this is currentDrinks', currentDrinks)
      // setCurrentDrinks(currentDrinks)
      await getCurrentDrinkList(token, setCurrentDrinks, setLoading)
      setLoading(false)
    })
    .catch(err => {
      console.log(err)
      setLoading(false)
    })
}

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
