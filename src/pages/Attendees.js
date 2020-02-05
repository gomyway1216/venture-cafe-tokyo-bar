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
import QrReader from 'react-qr-reader'
import { getCurrentDrinkList, getDrinkList } from '../api/drink'
import DrinkList from '../components/Drinks/DrinkList'
import {
  onSignIn,
  changeDrinkCount,
  fetchSignedInAttendees,
  updateAttendeeDrink,
} from '../api/attendee'

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
    // console.log('attendees in constructor', this.state.attendees)
  }

  isActive = true

  static contextType = AuthContext

  handleScan = data => {
    if (data) {
      this.setState({ scanData: data })
      // check if the current user exist in the frontend, otherwise do api call
      if (!this.state.attendees.find(element => element.attendeeId === data)) {
        onSignIn(data, this.context.token, this.updateAttendees)
      }
      // console.log('this is attendee2', this.state.attendees)
      // set the scanned QR code to be the filter value to search.
      this.setState({ filterValue: data }, () => {
        this.filterList()
      })
    }
  }

  // handleSearchBarChange = event => {
  //   // since setState is async, we need to use callback to call the function.
  //   this.setState({ filterValue: event.target.value }, () => {
  //     this.filterList()
  //   })
  //   // console.log('filter event', event.target.value)
  //   // console.log('filter value', this.state.filterValue)
  //   // variable that holds the original list
  // }

  onNameChange = event => {
    this.setState({ name: event.target.value })
  }

  // add the attendee by QR code if the attendee doesn't exist in the list of people shown
  updateAttendees = data => {
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
      }
      // () => console.log('attendees prev', this.state.attendees)
    )
  }

  // updateDrinks = data => {
  //   this.setState(
  //     prevState => {

  //     }
  //   )
  // }

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

    // // also update the entire drink count
    // getCurrentDrinkList(
    //   this.context.token,
    //   this.setCurrentDrinks,
    //   this.setLoading
    // )
  }

  // update the drink of single attendee
  updateSingleAttendee = async data => {
    // console.log('updateSingleAttendee is called')
    // console.log('this is API data', data)
    await this.setState(
      prevState => {
        let updatedAttendees = [...prevState.attendees]
        updatedAttendees.find((o, i) => {
          if (o.attendeeId === data.attendeeId) {
            // console.log('this is O', o)
            // console.log('this is data', data)
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
    // console.log('filter value', this.state.filterValue)
    let currentList = []
    // variable that holds the filtered list before putting into state
    let newList = []

    // if the search bar is not empty
    if (this.state.filterValue !== '') {
      currentList = this.state.attendees
      console.log('currentList', currentList)
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
    // console.log('filter event', event.target.value)
    // console.log('filter value', this.state.filterValue)
    // variable that holds the original list
  }

  setDrinks = drinks => {
    this.setState({ drinks: drinks })
  }

  setCurrentDrinks = currentDrinks => {
    // here it needs to traverse all the current Attendee to get the drink count
    console.log('setCurrentDrinks is called and new value', currentDrinks)
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
    // console.log('this.state.currentDrinks', this.state.currentDrinks)
    // this.filterList()
    return (
      <div className={styles.attendeesContainer}>
        <div className={styles.topContainers}>
          <QrReader
            delay={300}
            // onError={handleError}
            onScan={this.handleScan}
            style={{ width: '50%' }}
            className={styles.qRReaderComponent}
          />
          <div>
            <div className={styles.drinkList}>
              {this.state.isLoading || !this.state.currentDrinks ? (
                <Spinner />
              ) : (
                <DrinkList drinks={this.state.currentDrinks} />
              )}
            </div>
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
              <div className={styles.description}>
                <div className={styles.descriptionTitle}>Name</div>
                <div className={styles.descriptionTitle}>Count</div>
                <div className={styles.descriptionTitle}>Change</div>
              </div>
              <AttendeeList
                attendees={this.state.filteredAttendees}
                // increaseCount={this.increaseCount}
                // decreaseCount={this.decreaseCount}
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
