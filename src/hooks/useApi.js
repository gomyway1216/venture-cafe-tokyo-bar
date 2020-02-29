import React, { useState, createContext, useEffect } from 'react'

/**
 * @param {(...args) => Promise<any>} apiCall
 * The API call to make
 */
export const useApi = apiCall => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  const makeFetch = async (...args) => {
    try {
      setIsFetching(true)
      const res = await apiCall(...args)
      setResponse(res)
      setIsFetching(false)
    } catch (err) {
      setIsFetching(false)
      setError(err)
    }
  }

  return { isFetching, error, response, makeFetch }
}
