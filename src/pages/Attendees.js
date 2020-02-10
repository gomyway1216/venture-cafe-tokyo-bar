import React, { useState, Component } from 'react'
import { TextField, Button } from '@material-ui/core/'
import { withStyles, fade, StylesProvider } from '@material-ui/core/styles'
import AuthContext from '../context/auth-context'
import Spinner from '../components/Spinner/Spinner'
import AttendeeList from '../components/Attendees/AttendeeList'
import InputBase from '@material-ui/core/InputBase'
import SearchIcon from '@material-ui/icons/Search'
import Paper from '@material-ui/core/Paper'
import IconButton from '@material-ui/core/IconButton'
import styles from './attendees.module.css'
import QrReader from 'react-qr-reader'
import { getCurrentDrinkList, getDrinkList } from '../api/drink'
import DrinkList from '../components/Drinks/DrinkList'
import {
  onSignIn,
  changeDrinkCount,
  fetchSignedInAttendees,
  updateAttendeeDrink,
} from '../api/attendee'
import Dialog from '../components/Dialog/Dialog'
import Modal from './Modal'
import DataHandling from '../components/DataHandling/DataHandling'

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
      scanData: '',
      drinks: [],
      currentDrinks: [],
    }
  }

  isActive = true

  static contextType = AuthContext

  handleScan = async data => {
    if (data) {
      this.setState({ scanData: data })
      // check if the current user exist in the frontend, otherwise do api call
      console.log('this.state.attendee', this.state.attendees)
      console.log('scanning data', data)
      if (!this.state.attendees.find(element => element.attendeeId === data)) {
        await onSignIn(data, this.context.token, this.updateAttendees)
      }
      // set the scanned QR code to be the filter value to search.
      this.setState({ filterValue: data }, () => {
        this.filterList()
      })
    }
  }

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  // add the attendee by QR code if the attendee doesn't exist in the list of people shown
  updateAttendees = data => {
    // to prevent adding two same attendees.
    // backend code returns the same currentAttendee if the signed in attendee
    // already existed in db. So, this part of the code should also handle that
    if (
      this.state.attendees.find(
        element => element.attendeeId === data.attendeeId
      )
    ) {
      console.log('same name already existed line 102')
      this.forceUpdate()
      return
    }

    this.setState(
      prevState => {
        const updatedAttendees = [...prevState.attendees]
        updatedAttendees.push({
          id: data._id,
          attendeeId: data.attendeeId,
          firstName: data.firstName,
          lastName: data.lastName,
          drinks: data.drinks,
        })
        return { attendees: updatedAttendees }
      },
      () => this.filterList()
    )
  }

  decreaseCount = event => {
    //  isLoading: if I use this, the loading ring shows up, and it might not be good.
    // Maybe I can show a smaller one next to plus button to indicates the loading states
    // hit the graphQL endpoint

    changeDrinkCount(event.currentTarget.id, -1)
  }

  increaseCount = event => {
    changeDrinkCount(event.currentTarget.id, 1)
  }

  // when a attendee choose a drink
  selectDrink = (id, drinkId) => {
    // do the api call here.
    updateAttendeeDrink(
      this.context.token,
      this.isActive,
      id,
      drinkId,
      this.updateSingleAttendee,
      this.setLoading
    )
  }

  // update the drink of single attendee
  updateSingleAttendee = async data => {
    await this.setState(
      prevState => {
        let updatedAttendees = [...prevState.attendees]
        updatedAttendees.find((o, i) => {
          if (o.attendeeId === data.attendeeId) {
            updatedAttendees[i] = {
              id: data.id,
              attendeeId: data.attendeeId,
              firstName: data.firstName,
              lastName: data.lastName,
              drinks: data.drinks,
            }
            return true
          }
        })
        return {
          attendees: updatedAttendees,
        }
      },
      () => {
        this.filterList()
        // also update the entire drink count
        getCurrentDrinkList(
          this.context.token,
          this.setCurrentDrinks,
          this.setLoading
        )
      }
    )
  }

  filterList = () => {
    let currentList = []
    // variable that holds the filtered list before putting into state
    let newList = []

    // if the search bar is not empty
    if (this.state.filterValue !== '') {
      currentList = this.state.attendees
      console.log('this.state.attendees in filtered list', currentList)
      newList = currentList.filter(item => {
        const firstName = item.firstName.toLowerCase()
        const lastName = item.lastName.toLowerCase()
        const filter = this.state.filterValue
        return (
          item.attendeeId.includes(filter) ||
          firstName.includes(filter.toLowerCase()) ||
          lastName.includes(filter.toLowerCase())
        )
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
  }

  setDrinks = drinks => {
    this.setState({ drinks: drinks })
  }

  setCurrentDrinks = currentDrinks => {
    // here it needs to traverse all the current Attendee to get the drink count
    this.setState({ currentDrinks: currentDrinks })
  }

  setAttendees = attendees => {
    this.setState({ attendees: attendees })
  }

  setFilteredAttendees = attendees => {
    this.setState({ filteredAttendees: attendees })
  }

  setLoading = loading => {
    this.setState({ isLoading: loading })
  }

  setFilterValueEmpty = () => {
    this.setState({ filterValue: '' })
  }

  componentDidMount() {
    fetchSignedInAttendees(
      this.context.token,
      this.isActive,
      this.setAttendees,
      this.setFilteredAttendees,
      this.setLoading
    )
    getDrinkList(this.context.token, this.setDrinks, this.setLoading)
    getCurrentDrinkList(
      this.context.token,
      this.setCurrentDrinks,
      this.setLoading
    )
  }

  componentWillUnmount() {
    this.isActive = false
  }

  render() {
    const { classes } = this.props
    return (
      <div className={styles.attendeesContainer}>
        <div className={styles.topContainers}>
          <QrReader
            delay={300}
            // onError={handleError}
            onScan={this.handleScan}
            style={{ width: '30%' }}
            className={styles.qRReaderComponent}
          />
          <div className={styles.topRight}>
            <div className={styles.drinkList}>
              {this.state.isLoading || !this.state.currentDrinks ? (
                <Spinner />
              ) : (
                <DrinkList drinks={this.state.currentDrinks} />
              )}
            </div>
            <DataHandling
              setAttendees={this.setAttendees}
              setFilteredAttendees={this.setFilteredAttendees}
              isActive={this.isActive}
              setLoading={this.setLoading}
              setCurrentDrinks={this.setCurrentDrinks}
              setFilterValueEmpty={this.setFilterValueEmpty}
            />
          </div>
        </div>
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

        <div className={styles.attendeeList}>
          {this.state.isLoading || !this.state.attendees ? (
            <Spinner />
          ) : (
            <div>
              <AttendeeList
                attendees={this.state.filteredAttendees}
                selectDrink={this.selectDrink}
                drinks={this.state.drinks}
              />
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withStyles(useStyles, { withTheme: true })(Attendees)
