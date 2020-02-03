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
              count {
                createdAt
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
      if (res.status != 200 && res.status != 201) {
        throw new Error('Failed!')
      }
      return res.json()
    })
    .then(resData => {
      const drinks = resData.data.drinks
      console.log('drinks', drinks)
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
