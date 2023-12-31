// import { observer } from "mobx-react-lite";
// import React, { useContext } from "react";
// import { Context } from "../index";
// import ListGroup from 'react-bootstrap/ListGroup';


import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
// import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
const TyoeBar = observer(() => {
  const { device } = useContext(Context);

  return (
    <ListGroup>
            {device.types.map(type =>
                <ListGroup.Item
                    style={{cursor: 'pointer'}}
                    active={type.id === device.selectedType.id}
                    onClick={() => device.setSelectedType(type)}
                    key={type.id}
                >
                    {type.name}
                </ListGroup.Item>
            )}
        </ListGroup>



)
});

export default TyoeBar;
