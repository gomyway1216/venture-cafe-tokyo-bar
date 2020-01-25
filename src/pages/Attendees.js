import React, { useState, Component } from 'react'
import { TextField, Button } from '@material-ui/core/'
import { withStyles } from '@material-ui/core/styles'
import AuthContext from '../context/auth-context'
import Spinner from '../components/Spinner/Spinner'
import AttendeeList from '../components/Attendees/AttendeeList'

const useStyles = theme => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: 200,
    },
  },
})

class Attendees extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      isLoading: false,
      attendees: [],
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

    console.log('userId', userId)
    console.log('name', name)
    console.log('drinkCounter', drinkCounter)
    console.log('date', date)

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
          this.setState({ attendees: attendees, isLoading: false })
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

    // attendees
    // array[array.findIndex(x => x.name == 'string 1')]
    // let arr = [
    //     { name:"string 1", value:"this", other: "that" },
    //     { name:"string 2", value:"this", other: "that" }
    // ];

    // let obj = arr.find((o, i) => {
    //     if (o.name === 'string 1') {
    //         arr[i] = { name: 'new string', value: 'this', other: 'that' };
    //         return true; // stop searching
    //     }
    // });

    // console.log(arr);
    // console.log('target', event.target)
    console.log('minus is clicked')
    this.changeDrinkCount(event.currentTarget.id, -1)
  }

  increaseCount = event => {
    this.changeDrinkCount(event.currentTarget.id, 1)
  }

  changeDrinkCount = (userId, difference) => {
    console.log('this is userId', userId)
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
          console.log('updatedAttendees', updatedAttendees)
          return { attendees: updatedAttendees }
        })
        console.log('updated attendees', this.state.attendees)
        // this.setState({ isLoading: false })
      })
      .catch(err => {
        console.log(err)
        // this.setState({ isLoading: false })
      })
  }

  componentDidMount() {
    this.fetchAttendees()
  }

  componentWillUnmount() {
    this.isActive = false
  }

  render() {
    const { classes } = this.props
    console.log('attendees', this.state.attendees)
    return (
      <div>
        <div>
          <form className={classes.root} noValidate autoComplete="off">
            <div>Hello</div>
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
        </div>

        <div>
          {this.state.isLoading || !this.state.attendees ? (
            <Spinner />
          ) : (
            <AttendeeList
              attendees={this.state.attendees}
              increaseCount={this.increaseCount}
              decreaseCount={this.decreaseCount}
            />
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(Attendees)
