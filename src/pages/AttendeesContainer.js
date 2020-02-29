import React, { Component } from 'react'
import AuthContext from '../context/auth-context'
import { getCurrentDrinkList, getDrinkList } from '../api/drink'
import {
  onSignIn,
  fetchSignedInAttendees,
  updateAttendeeDrink,
} from '../api/attendee'
import Attendees from './Attendees'
import { AttendeeProvider } from '../providers/AttendeeProvider'
import { CurrentDrinkProvider } from '../providers/CurrentDrinkProvider'
import { DrinkProvider } from '../providers/DrinkProvider'

class AttendeeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errorLoadingSignedInAttendees: null,
      isLoading: false,
      isLoadingSignedInAttendees: false,
      isLoadingCurrentDrinkList: false,
      isLoadingDrinkList: false,
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

  // handleScan = async data => {
  //   if (data) {
  //     // check if the current user exist in the frontend, otherwise do api call
  //     if (!attendees.find(element => element.attendeeId === data)) {
  //       await onSignIn(data)
  //       updateAttendees()
  //     }
  // }

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

  // // when a attendee choose a drink
  // selectDrink = (id, drinkId) => {
  //   // do the api call here.
  //   updateAttendeeDrink(
  //     this.context.token,
  //     this.isActive,
  //     id,
  //     drinkId,
  //     this.updateSingleAttendee,
  //     this.setLoading
  //   )
  // }

  // update the drink of single attendee
  updateSingleAttendee = data => {
    this.setState(
      prevState => {
        let updatedAttendees = [...prevState.attendees]
        updatedAttendees.find((attendee, index) => {
          if (attendee.attendeeId === data.attendeeId) {
            updatedAttendees[index] = {
              id: data.id,
              attendeeId: data.attendeeId,
              firstName: data.firstName,
              lastName: data.lastName,
              drinks: data.drinks,
            }
            return true
          }
          return false
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

  filterList = filterValue => {
    let currentList = []
    // variable that holds the filtered list before putting into state
    let newList = []

    // if the search bar is not empty
    if (this.state.filterValue !== '') {
      currentList = this.state.attendees
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

  setLoadingSignedInAttendees = loading => {
    this.setState({ isLoadingSignedInAttendees: loading })
  }

  setLoadingDrinkList = loading => {
    this.setState({ isLoadingDrinkList: loading })
  }

  setLoadingCurrentDrinkList = loading => {
    this.setState({ isLoadingCurrentDrinkList: loading })
  }

  setFilterValueEmpty = () => {
    this.setState({ filterValue: '' })
  }

  handleError = err => {
    console.error(err)
  }

  async componentDidMount() {
    const currentAttendees = await fetchSignedInAttendees(
      this.context.token,
      this.isActive,
      this.setLoadingSignedInAttendees
    )

    if (this.isActive) {
      this.setAttendees(currentAttendees)
      this.setFilteredAttendees(currentAttendees)
      this.setLoadingSignedInAttendees(false)
    }
    getDrinkList(this.context.token, this.setDrinks, this.setLoadingDrinkList)
    getCurrentDrinkList(
      this.context.token,
      this.setCurrentDrinks,
      this.setLoadingCurrentDrinkList
    )
  }

  componentWillUnmount() {
    this.isActive = false
  }

  render() {
    const {
      isLoadingSignedInAttendees,
      isLoadingCurrentDrinkList,
      isLoadingDrinkList,
      attendees,
      filteredAttendees,
      filterValue,
      scanData,
      drinks,
      currentDrinks,
    } = this.state

    const isLoading =
      isLoadingSignedInAttendees ||
      isLoadingCurrentDrinkList ||
      isLoadingDrinkList

    return (
      <AttendeeProvider>
        <Attendees
          attendees={attendees}
          currentDrinks={currentDrinks}
          drinks={drinks}
          filterValue={filterValue}
          filteredAttendees={filteredAttendees}
          handleSearchBarChange={this.handleSearchBarChange}
          // handleError={this.handleError}
          // handleScan={this.handleScan}
          isActive={this.isActive}
          isLoading={isLoading}
          scanData={scanData}
          // selectDrink={this.selectDrink}
          setAttendees={this.setAttendees}
          setCurrentDrinks={this.setCurrentDrinks}
          setFilteredAttendees={this.setFilteredAttendees}
          setFilterValueEmpty={this.setFilterValueEmpty}
          setLoading={this.setLoading}
        />
      </AttendeeProvider>
    )
  }
}

export default AttendeeContainer
