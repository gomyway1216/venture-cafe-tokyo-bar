import React, { useState, Component } from 'react'
import { TextField, Button } from '@material-ui/core/'
import { withStyles, fade, StylesProvider } from '@material-ui/core/styles'
import AuthContext from '../context/auth-context'
import Spinner from '../components/Spinner/Spinner'
import AttendeeList from '../components/Attendees/AttendeeList'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
// import './attendees.module.css'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import styles from './attendees.module.css'

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },

  searchField: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    margin: 'auto',
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
})

class Attendees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isLoading: false,
      attendees: [],
      filteredAttendees: [],
      filterValue: '',
    }
  }

  isActive = true

  static contextType = AuthContext

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  onRegister = () => {
    const userId = this.state.name.concat(' id')
    const name = this.state.name
    const drinkCounter = 0
    const date = new Date().toISOString()

    if (name.trim() !== '') {
      const requestBody = {
        query: `
          mutation CheckInAttendee($userId: String!, $name: String!, $drinkCounter: Int!, $date: String!){
            checkInAttendee(attendeeInput: {userId: $userId, name: $name, drinkCounter: $drinkCounter, date: $date}) {
              userId
              name
              drinkCounter
            }
          }
        `,
        variables: {
          userId: userId,
          name: name,
          drinkCounter: drinkCounter,
          date: date,
        },
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
          this.setState(prevState => {
            const updatedAttendees = [...prevState.attendees]
            updatedAttendees.push({
              userId: resData.data.checkInAttendee.userId,
              name: resData.data.checkInAttendee.name,
              drinkCounter: resData.data.checkInAttendee.drinkCounter,
            })
            return { attendees: updatedAttendees }
          })
        })
        .catch(err => {
          console.log(err)
        })
    }
  }

  fetchAttendees() {
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

  decreaseCount = event => {
    //  isLoading: if I use this, the loading ring shows up, and it might not be good.
    // Maybe I can show a smaller one next to plus button to indicates the loading states
    // hit the graphQL endpoint

    this.changeDrinkCount(event.currentTarget.id, -1)
  }

  increaseCount = event => {
    this.changeDrinkCount(event.currentTarget.id, 1)
  }

  changeDrinkCount = (userId, difference) => {
    // this.setState({ isLoading: true })
    const updatingAttendee = this.state.attendees.find(
      attendee => attendee.userId === userId
    )
    const newCount = updatingAttendee.drinkCounter + difference

    const requestBody = {
      query: `
          mutation UpdateDrinkCounter($userId: String!, $drinkCounter: Int!) {
            updateDrinkCounter(drinkCounterUpdateInput: {userId: $userId, drinkCounter: $drinkCounter}) {
              userId
              name
              drinkCounter
            }
          }
        `,
      variables: {
        userId: userId,
        drinkCounter: newCount,
      },
    }

    const token = this.context.token

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
        this.setState(prevState => {
          let updatedAttendees = [...prevState.attendees]
          updatedAttendees.find((o, i) => {
            if (o.userId === userId) {
              updatedAttendees[i] = {
                userId: userId,
                name: resData.data.updateDrinkCounter.name,
                drinkCounter: resData.data.updateDrinkCounter.drinkCounter,
              }
              return true
            }
          })
          return {
            attendees: updatedAttendees,
          }
        })
        this.filterList()
        // this.setState({ isLoading: false })
      })
      .catch(err => {
        console.log(err)
        // this.setState({ isLoading: false })
      })
  }

  filterList = () => {
    // console.log('filter value', this.state.filterValue)
    let currentList = []
    // variable that holds the filtered list before putting into state
    let newList = []

    // if the search bar is not empty
    if (this.state.filterValue !== '') {
      currentList = this.state.attendees

      newList = currentList.filter(item => {
        const name = item.name.toLowerCase()
        const filter = this.state.filterValue.toLowerCase()
        return name.includes(filter)
      })
    } else {
      newList = this.state.attendees
    }
    this.setState({
      filteredAttendees: newList,
    })
  }

  handleSearchBarChange = event => {
    // since setState is async, we need to use callback to call the function.
    this.setState({ filterValue: event.target.value }, () => {
      this.filterList()
    })
    // console.log('filter event', event.target.value)
    // console.log('filter value', this.state.filterValue)
    // variable that holds the original list
  }

  componentDidMount() {
    this.fetchAttendees()
  }

  componentWillUnmount() {
    this.isActive = false
  }

  render() {
    const { classes } = this.props
    // this.filterList()
    return (
      <div className={styles.attendeesContainer}>
        <Paper component="form" className={classes.searchField}>
          <InputBase
            className={classes.input}
            placeholder="Search Names"
            inputProps={{ 'aria-label': 'search names' }}
            onChange={this.handleSearchBarChange}
            value={this.state.filterValue}
          />
          <IconButton
            type="submit"
            className={classes.iconButton}
            aria-label="search"
          >
            <SearchIcon />
          </IconButton>
        </Paper>
        {/* it is for adding new users. */}
        {/* <div>
          <form noValidate autoComplete="off">
            <TextField
              required
              id="standard-required"
              label="Required"
              value={this.state.name}
              onChange={this.onNameChange}
            />
          </form>
          <Button variant="contained" color="primary" onClick={this.onRegister}>
            Register
          </Button>
        </div> */}

        <div className={styles.attendeeList}>
          {this.state.isLoading || !this.state.attendees ? (
            <Spinner />
          ) : (
            <div>
              <div className={styles.description}>
                <div className={styles.descriptionTitle}>Name</div>
                <div className={styles.descriptionTitle}>Count</div>
                <div className={styles.descriptionTitle}>Change</div>
              </div>
              <AttendeeList
                attendees={this.state.filteredAttendees}
                increaseCount={this.increaseCount}
                decreaseCount={this.decreaseCount}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(Attendees)
