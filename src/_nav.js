import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBasket,
  cilBell,
  cilBusAlt,
  cilCalculator,
  cilCart,
  cilChartPie,
  cilCircle,
  cilCursor,
  cilDescription,
  cilDrop,
  cilNotes,
  cilPencil,
  cilPlus,
  cilPrint,
  cilPuzzle,
  cilSpeedometer,
  cilStar,
  cilStorage,
  cilUser,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
      //text: 'NEW',
    },
  },
  {
    component: CNavTitle,
    name: 'product management',
  },

  {
    component: CNavItem,
    name: 'Add product',
    to: '/addProduct',
    icon: <CIcon icon={cilPlus} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Stock',
    to: '/stock',
    icon: <CIcon icon={cilBasket} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'sells',
    to: '/sells',
    icon: <CIcon icon={cilCart} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'pending product',
    to: '/pendingProduct',
    icon: <CIcon icon={cilBusAlt} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'general nomenclature',
  },
  {
    component: CNavItem,
    name: 'Categories',
    to: '/categories',
    icon: <CIcon icon={cilNotes} customClassName="nav-icon" />,
  },
 
  
]

export default _nav
