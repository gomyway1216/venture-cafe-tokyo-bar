import React, { useState } from 'react'
import styles from './settings.module.css'
import RegisteredDrinkSelect from '../components/Settings/RegisteredDrinkSelect'
import AvailableDrinkSelect from '../components/Settings/AvailableDrinkSelect'
import DrinkTypeSelect from '../components/Settings/DrinkTypeSelect'
import { Divider, Button } from '@material-ui/core'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'

export const Settings = props => {
  const [showAdvancedSetting, setAdvancedSetting] = useState(false)
  return (
    <div className={styles.root}>
      <AvailableDrinkSelect eventID={props.match.params.eventID} />
      <Divider />
      <div className={styles.settingButton}>
        <Button onClick={() => setAdvancedSetting(!showAdvancedSetting)}>
          Advanced Settings
        </Button>
        {showAdvancedSetting ? <ExpandLess /> : <ExpandMore />}
      </div>
      {showAdvancedSetting && (
        <div className={styles.setAdvancedSettings}>
          <RegisteredDrinkSelect />
          <DrinkTypeSelect />
        </div>
      )}
    </div>
  )
}

export default Settings
