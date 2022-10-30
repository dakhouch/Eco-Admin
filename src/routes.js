import React from 'react'



const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Pending_product=React.lazy(()=> import('./views/pending_product/Pending_product'))
const Stock=React.lazy(()=>import('./views/stock/Stock'));
const Sells=React.lazy(()=>import('./views/sells/Sells'));
const Categories=React.lazy(()=>import('./views/categories/Categories'))
const Add_product=React.lazy(()=>import('./views/add_product/Add_product'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  {path: '/pendingProduct', name: 'Pending_product', element: Pending_product},
  {path: '/stock',name:'Stock',element:Stock},
  {path:'/sells',name:'Sells',element:Sells},
  {path:'/categories',name:'Catrgories',element:Categories},
  {path:'/addProduct',name:'Add_product',element:Add_product},
]

export default routes
