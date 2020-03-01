import React, { Component } from 'react'
import AuthContext from '../context/auth-context'
import { getDrinkList } from '../api/drink'
import Attendees from './Attendees'
import { AttendeeProvider } from '../providers/AttendeeProvider'
import { CurrentDrinkProvider } from '../providers/CurrentDrinkProvider'
import { DrinkProvider } from '../providers/DrinkProvider'

const AttendeeContainer2 = () => {}

class AttendeeContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      setLoadingDrinkList: false,
      drinks: [],
    }
  }

  isActive = true

  static contextType = AuthContext

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

  setLoading = loading => {
    this.setState({ isLoading: loading })
  }

  setLoadingSignedInAttendees = loading => {
    this.setState({ isLoadingSignedInAttendees: loading })
  }

  setLoadingDrinkList = loading => {
    this.setState({ isLoadingDrinkList: loading })
  }

  async componentDidMount() {
    getDrinkList(this.context.token, this.setDrinks, this.setLoadingDrinkList)
  }

  componentWillUnmount() {
    this.isActive = false
  }

  render() {
    return (
      <AttendeeProvider>
        <DrinkProvider>
          <Attendees
            drinks={this.state.drinks}
            setAttendees={this.setAttendees}
            isActive={this.isActive}
            // setLoading={this.setLoading}
            setCurrentDrinks={this.setCurrentDrinks}
          />
        </DrinkProvider>
      </AttendeeProvider>
    )
  }
}

export default AttendeeContainer
