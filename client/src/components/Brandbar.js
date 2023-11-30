import { observer } from "mobx-react-lite";
import React, { useContext } from "react";
import { Context } from "..";
import { Container } from "react-bootstrap";
import { Row, Card } from "react-bootstrap";

const Brandbar = observer(() => {
  const { device } = useContext(Context);
  return (
    <Container>
      <Row style={{ flexWrap: "nowrap", width: "20%", textAlign: "center" }}>
      {device.brands.map(brand =>
                <Card
                    style={{cursor:'pointer'}}
                    key={brand.id}
                    className="p-3"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                >
                    {brand.name}
                </Card>
            )}    
      </Row>
    </Container>
  );
});

export default Brandbar;


