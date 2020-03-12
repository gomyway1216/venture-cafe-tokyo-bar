import moment from 'moment'
import { doFetch } from '../doFetch'

export const createAdminUser = ({
  firstName,
  lastName,
  email,
  password,
  adminCreateKey,
}) => {
  const requestBody = {
    query: `
      mutation CreateAdminUser($firstName: String!, $lastName: String!, 
        $email: String!, $password: String!, $adminCreateKey: String!) {
          createAdminUser(createAdminUserInput: {
            firstName: $firstName, lastName: $lastName, 
            email: $email, password: $password, adminCreateKey: $adminCreateKey
          }) {
            id: _id
            firstName
            lastName
            email
          }
        }
      `,
    variables: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      adminCreateKey: adminCreateKey,
    },
  }

  return doFetch(requestBody)
}

export const logInAdminUser = ({ email, password }) => {
  const requestBody = {
    query: `
    mutation LogInAdminUser($email: String!, $password: String!, $date: String!) {
        logInAdminUser(logInAdminUserInput: {
          email: $email, password: $password, date: $date
        }) {
          id: _id
          userID
          token
          tokenExpiration
        }
      }
    `,
    variables: {
      email: email,
      password: password,
      date: moment().format(),
    },
  }

  return doFetch(requestBody)
}

export const createUser = ({ firstName, lastName, email }) => {
  const requestBody = {
    query: `
      mutation CreateUser($firstName: String!, $lastName: String!, 
        $email: String!, $date: String!) {
          createUser(createUserInput: {
            firstName: $firstName, lastName: $lastName, 
            email: $email, date: $date
          }) {
            id: _id
            firstName
            lastName
            email
          }
        }
      `,
    variables: {
      firstName: firstName,
      lastName: lastName,
      email: email,
      date: moment().format(),
    },
  }
  return doFetch(requestBody)
}

export const existUser = id => {
  const requestBody = {
    query: `
      query ExistUser($id: ID!) {
        existUser(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const getUser = id => {
  const requestBody = {
    query: `
      query GetUser($id: ID!) {
        getUser(id: $id) {
          id: _id
          firstName
          lastName
          email
        }
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}

export const deleteUser = id => {
  const requestBody = {
    query: `
      query DeleteUser($id: ID!) {
        deleteUser(id: $id)
      }
    `,
    variables: {
      id: id,
    },
  }
  return doFetch(requestBody)
}
