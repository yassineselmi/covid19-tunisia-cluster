import React from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import _ from 'lodash'

import { state, city, abroad, p2p } from '../../images'
import {
  addStates,
  removeStates,
  addCities,
  removeCities,
  addTravel,
  removeTravel,
} from '../../util/filters'
import { updateGraph, selectFilter } from '../Redux/actions'

const filters = [
  {
    name: 'P2P',
    icon: p2p,
    add: graph => {
      return graph
    },
    remove: graph => {
      return graph
    },
  },
  { name: 'Gouvernorat', icon: state, add: addStates, remove: removeStates },
  // { name: 'Ville', icon: city, add: addCities, remove: removeCities },
  { name: 'Provenance', icon: abroad, add: addTravel, remove: removeTravel },
]

const HeaderContainer = styled.div`
  padding-top: 55px;
  background-color: #34495e;
  grid-template-rows: 80% 20%;

  display: grid;
  overflow: auto;
  font-family: 'Lato', sans-serif;
  color: #fff;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    padding-top: 0;
  }
`

const FilterMenuContainer = styled.div`
  display: grid;
  grid-template-rows: 10% 10% 10% 70%;
  overflow: auto;
  font-family: 'Lato', sans-serif;
  color: #fff;
  font-weight: bold;

  @media screen and (max-width: 768px) {
    grid-template-rows: 1fr;
    grid-template-columns: 33% 33% 33%;
  }
`


const FilterCategory = ({ filter, onClick, selected }) => {
  const FilterContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: '20vh';
    user-select: none;
    background-color: ${props => (props.selected ? '#2c3e50' : '#34495e')};
    transition: all 0.2s ease-out;
    cursor: pointer;
    &:hover {
      background-color: #2c3e50;
    }
  `
  const FilterName = styled.div`
    text-transform: uppercase;
    font-size: 11px;
  `

  const FilterIcon = styled.img`
    width: 20px;
  `

  return (
    <FilterContainer onClick={onClick} selected={selected}>
      <FilterIcon src={filter.icon} />
      <FilterName>{filter.name}</FilterName>
    </FilterContainer>
  )
}


/* MenuItems */

const MenuItemsContainer = styled.div`
  display: grid;
  grid-template-rows: 50% 50%;
  overflow: auto;
  font-family: 'Lato', sans-serif;
  color: #fff;
  font-weight: bold;
  font-size: 12px;

  @media screen and (max-width: 768px) {
    display: none
  }
`

const MenuItemContainer = ({menu_name, link, target}) => {
  const MenuContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    height: '20vh';
    user-select: none;
    background-color: '#34495e';
    transition: all 0.2s ease-out;
    cursor: pointer;
    &:hover {
      background-color: #2c3e50;
    }
    
    a {
     text-decoration: None; 
     color: #fff
    }
  `


  return (
      <MenuContainer>
        <a href={link} target={target}>{menu_name}  &#8599;</a>
      </MenuContainer>
  )

}

const FilterPanel = ({
  graph,
  patients,
  updateGraph,
  selectFilter,
  filter,
}) => {
  // const [selected, selectCategory] = React.useState('P2P')

  const changeGraph = name => {
    // console.log('Changegraph', graph, patients.byId)
    let currentFilter = _.find(filters, function(o) {
      return o.name === filter
    })
    let choosenFilter = _.find(filters, function(o) {
      return o.name === name
    })

    let newGraph = currentFilter.remove(graph, patients.byId)

    selectFilter(name)
    newGraph = choosenFilter.add(newGraph, patients.byId)
    console.log(newGraph)
    updateGraph(newGraph)
  }
  const FilterHeader = styled.div`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;

    @media screen and (max-width: 768px) {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `
  return (
    <HeaderContainer>
      <FilterMenuContainer>
        {filters.map(filterItem => (
          <FilterCategory
            filter={filterItem}
            onClick={() => changeGraph(filterItem.name)}
            selected={filter === filterItem.name ? true : false}
          />
        ))}
      </FilterMenuContainer>
      <MenuItemsContainer>
        <MenuItemContainer menu_name={"Signaler un cas"} link={'https://forms.gle/QxWe5zsfj1JfRyjM7'} target={'_blank'} />
      </MenuItemsContainer>
    </HeaderContainer>
  )
}

const mapStateToProps = state => {
  const { patients, graph, filter } = state
  return { graph, patients, filter }
}

export default connect(mapStateToProps, { updateGraph, selectFilter })(
  FilterPanel
)
