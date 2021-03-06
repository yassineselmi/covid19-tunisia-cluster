import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useDebounce from '../../util/useDebounce'

const Input = styled.input`
  margin: 10px;
  background: #fff;
  font-size: 14;
  padding: 10px;
  outline: none;
  border: 1px solid #cec1c1;
  border-radius: 3px;
  width: calc(100% - 16px);
  &:focus {
    border: 1px solid #2c3e50;
  }
`

export const SearchInput = ({ searchTerm }) => {
  const [term, setTerm] = useState('')
  const debouncedTerm = useDebounce(term)

  useEffect(() => {
    if (debouncedTerm) {
      searchTerm(debouncedTerm)
    }
  }, [debouncedTerm])

  const handleTextChange = e => {
    setTerm(e.target.value)
  }

  return (
    <Input
      placeholder="Chercher un cas (par numéro)..."
      value={term}
      onChange={handleTextChange}
      aria-label="Recherche"
    />
  )
}
