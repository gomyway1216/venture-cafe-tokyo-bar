import { useEffect, useState } from 'react'

// using custom hooks to fetch data
// to get the list of drinks for each day for Data List page
export const useDailyDrinksList = token => {
  const [state, setState] = useState({ data: null, loading: true })

  useEffect(() => {
    setState(state => ({ data: state.data, loading: true }))

    const requestBody = {
      query: `
                query {
                    dailyDrinksList {
                        id: _id
                        date
                        drinks {
                            date
                            drink {
                                id: _id
                                name
                                drinkType {
                                    id: _id
                                    name
                                }
                            }
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
        setState({ data: resData.data.dailyDrinksList, loading: false })
      })
      .catch(err => {
        console.log(err)
      })
  }, [setState])

  return state
}
