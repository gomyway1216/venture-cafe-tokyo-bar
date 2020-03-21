import React, { useState, createContext, useEffect } from 'react'

/**
 * @param {(...args) => Promise<any>} apiCall
 * The API call to make
 */
export const useApi = (apiCall, mapResponse = response => response) => {
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState(null)
  const [response, setResponse] = useState(null)

  const makeFetch = async (...args) => {
    try {
      setIsFetching(true)
      const res = await apiCall(...args)
      const mappedResponse = mapResponse(res)
      setResponse(mappedResponse)
      setIsFetching(false)
      return {
        response: mappedResponse,
      }
    } catch (err) {
      setIsFetching(false)
      const errorMessage = err?.message || err || 'failed fetching'
      setError(errorMessage)
      return {
        error: errorMessage,
      }
    }
  }

  return { isFetching, error, response, makeFetch }
}
