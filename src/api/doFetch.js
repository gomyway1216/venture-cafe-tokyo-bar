export const doFetch = requestBody => {
  const loginInfo = JSON.parse(localStorage.getItem('loginInfo'))
  if (!loginInfo || !loginInfo.token) {
    window.location = '/auth'
  }

  const { token } = loginInfo

  return fetch(`${process.env.REACT_APP_URL}graphql`, {
    method: 'POST',
    body: JSON.stringify(requestBody),
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    },
  }).then(async res => {
    if (res.status !== 200 && res.status !== 201) {
      const resBody = await res.json()
      const errorMessage = resBody?.errors?.[0]?.message || 'Failed fetching'
      if (errorMessage === 'Unauthenticated!') {
        localStorage.removeItem('loginInfo')
        window.location = '/auth'
      } else {
        throw new Error(errorMessage)
      }
    }

    return res.json()
  })
}
