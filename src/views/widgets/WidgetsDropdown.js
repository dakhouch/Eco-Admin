import React from 'react'
import {
  CRow,
  CCol,
  CWidgetStatsD,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {va,income,spent,product} from 'src/assets/brand/dashboard-icons' 


const WidgetsDropdown = (props) => {
  return (
    <CRow>
      <CCol sm={6} lg={3}>
      <CWidgetStatsD
      className="mb-3 w1"
      icon={<CIcon className="my-4 text-white" icon={product} height={52} />}
      values={[
        { title: 'products', value:props.products },
      ]}
    />
      </CCol>
      <CCol sm={6} lg={3}>
      <CWidgetStatsD
      className="mb-3 w2"
      icon={<CIcon className="my-4 text-white" icon={spent} height={52} />}
      values={[
        { title: 'spent', value:props.spents+" DH" },
      ]}
    />
      </CCol>
      <CCol sm={6} lg={3}>
      <CWidgetStatsD
      className="mb-3 w3"
      icon={<CIcon className="my-4 text-white" icon={income} height={52} />}
      values={[
        { title: 'income', value:props.incomes+" DH" },
      ]}
    />
      </CCol>
      <CCol sm={6} lg={3}>
      <CWidgetStatsD
      className="mb-3 w4"
      icon={<CIcon className="my-4 text-white" icon={va} height={52} />}
      values={[
        { title: 'value added', value: props.vadded+" DH" },
      ]}
    />
      </CCol>
    </CRow>
  )
}

export default WidgetsDropdown
