import { useState } from 'react'
import styled from 'styled-components'
import DayPicker from 'react-day-picker'

import { connect } from 'react-redux'
import { updateGraph, selectFilter } from './Redux/actions'
import { rowsToGraph } from '../util/parse'
import { isBrowser } from 'react-device-detect'

const Container = styled.div`
  position: absolute;
  z-index: 1000;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const DatePickerButton = styled.button`
  width: 200px;
  height: 30px;
  font-size: 14px;
  cursor: pointer;
  background: #fff;
  border-radius: 5px;
  border: 1px solid #e7e7e7;
`
const MONTHS = [
  'Janvier',
  'Février',
  'Mars',
  'Avril',
  'Mai',
  'Juin',
  'Juillet',
  'Août',
  'Septembre',
  'Octobre',
  'Novembre',
  'Décembre',
];
const WEEKDAYS_LONG = [
  'Dimanche',
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
];
const WEEKDAYS_SHORT = ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'];


function DatePicker({ updateGraph, selectFilter }) {
  const [selectedDay, changeSelectedDay] = useState(new Date());
  const [isDayPickerVisible, changeDayPickerVisibility] = useState(false);

  const toggleDayPickerVisibility = () => changeDayPickerVisibility(!isDayPickerVisible);

  function handleDayClick(date) {
    toggleDayPickerVisibility();

    function formatDate(date) {
      var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

      if (month.length < 2) month = '0' + month
      if (day.length < 2) day = '0' + day

      return [year, month, day].join('-')
    }

    const newDate = formatDate(date)

    if (formatDate(selectedDay) !== newDate) {
      console.log(newDate)
      changeSelectedDay(date)

      const apiURL =
        '/api/patients/date/' +
        newDate

      fetch(apiURL, {
        cors: 'no-cors',
        method: 'GET',
        redirect: 'follow',
      })
        .then(resp => resp.json())
        .then(res => {
          console.log(res)
          updateGraph(rowsToGraph(res.data.rawPatientData))
          selectFilter('P2P')
        })
    }
  }

  const renderDayPicker = () => isDayPickerVisible ? (
    <DayPicker
      selectedDays={selectedDay}
      locale="fr"
      months={MONTHS}
      weekdaysLong={WEEKDAYS_LONG}
      weekdaysShort={WEEKDAYS_SHORT}
      onDayClick={day => handleDayClick(day)}
      disabledDays={[
        {
          before: new Date(2020, 3, 2),
          after: new Date(),
        },
      ]}
    />
  ) : null

  return (
    <Container>
      {isBrowser ? (
        <>
          {renderDayPicker()}
          <DatePickerButton
            onClick={toggleDayPickerVisibility}
          >
            <span>{selectedDay.toLocaleDateString("fr-FR")}</span>
          </DatePickerButton>
        </>
      ) : null}
    </Container>
  )
}

export default connect(null, { updateGraph, selectFilter })(DatePicker)
