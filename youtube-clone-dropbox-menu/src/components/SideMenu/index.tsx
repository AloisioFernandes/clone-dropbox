import React, { useEffect, useState } from 'react'

import { Container } from './styles'

const scrollThreshold = 300

declare global {
  interface Window {
    toggleActiveMenu: (() => void) | undefined //definindo função toggleActiveMenu para window
  }
}

const SideMenu: React.FC = ({ children }) => {
  const [scrollY, setScrollY] = useState(0)
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrollY(window.scrollY)
      setIsActive(false)
    }

    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const classes = [
    isActive ? 'open' : '',
    scrollY <= scrollThreshold ? 'scrollOpen' : ''
  ]
  const className = classes.join(' ').trim()

  function toggleActiveMenu() {
    setIsActive(prev => !prev) //inverte boolean true <--> false
  }

  window.toggleActiveMenu = toggleActiveMenu // define uma variável de window com valor toggleActiveMenu para que essa função seja usada em outros elementos

  return <Container className={className}>{children}</Container>
}

export default SideMenu