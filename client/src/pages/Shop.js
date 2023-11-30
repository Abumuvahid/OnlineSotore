import React, { useContext, useEffect } from 'react'
import { Container } from 'react-bootstrap'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import TypeBar from '../components/TypeBar'
import Brandbar from '../components/Brandbar'
import DeviceList from '../components/DeviceList'
import { Context } from '../index';
import { fetchBrands, fetchDevices, fetchTypes } from '../components/http/deviceApi'
import { observer } from 'mobx-react-lite'
import Pages from '../components/Pages'

const Shop = observer( () => {
  const {device} = useContext(Context)

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
    fetchDevices(null, null, 1, 2).then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
    })
}, [])

// Меняет страцницы в пагинации
  useEffect(() => {
    fetchDevices(device.selectedType.id, device.selectedBrand.id, device.page, 2).then(data => {
        device.setDevices(data.rows)
        device.setTotalCount(data.count)
    })
}, [device.page, device.selectedType, device.selectedBrand])

 
  return (
    <Container>

    <Row className="mt-2"> 
      <Col md={3}>
        <TypeBar />
      </Col>
      <Col md={9}>

      <Brandbar/>
      <DeviceList/>
      </Col>
     <Pages />
    </Row>
   
    </Container>
  )
})

export default Shop