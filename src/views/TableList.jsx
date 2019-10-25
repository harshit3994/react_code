/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import BootstrapSwitchButton from "bootstrap-switch-button-react";

import Card from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCardButtons.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class TableList extends Component {
  constructor(props) {
    console.log(props);
    super(props);
    this.state = {
      isUserAdmin: false
    };
  }

  patchreq(id,check)
  {
    console.log('in patch')
    fetch(`http://13.232.167.55:3000/v1/api/ac/BOMB/${id}`, {
      method: "PATCH",
      body: JSON.stringify({status:check}),
      headers: {
        "Content-Type": "application/json",
        uid: "8",
        "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
      }
    })
      .then(res => res.json())
      .then(resultJson => {
console.log("done")


      })
  }
  render() {
    console.log("props" + JSON.stringify(this.props.name));
    return (
      <div className="content" style={{ backgroundColor: "#534848" }}>
        <Grid fluid>
          <Row>
            <Col md={6}>
              {this.props.name.map((item, id) => {
                console.log(item.coin_id);
                if (
                  item.coin_id === "0C" ||
                  item.coin_id === "05" ||
                  item.coin_id === "09" ||
                  item.coin_id === "03" ||
                  item.coin_id === "01" 
                 
                ) {
                  return (
                    <StatsCard
                      bigIcon={<i className="fa fa-thermometer text-warning" />}
                      statsText={
                        <BootstrapSwitchButton
                          checked={false}
                          width={70}
                          onChange={checked => {
                            // do some logic with item
                            if(checked)
                            {
                            this.patchreq(item.button_id,'1');
                            }else{
                              this.patchreq(item.button_id,'0');
                            }
                           
                            //this.setState({ isUserAdmin: checked });
                          }}
                        />
                      }
                      statsValue={item.name}
                      value={item.data}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Updated now"
                    />
                  );
                }
              })}
            </Col>

            <Col md={6}>
              {this.props.name.map((item, id) => {
               if (
                item.coin_id === "12" ||
                item.coin_id === "14" ||
                item.coin_id === "0F" ||
                item.coin_id === "19" ||
                item.coin_id === "18"
               
              ) {
                  return (
                    <StatsCard
                      bigIcon={<i className="fa fa-thermometer text-warning" />}
                      statsText={
                        <BootstrapSwitchButton
                          checked={true}
                          onstyle="success"
                          width={70}
                        />
                      }
                      statsValue={item.name}
                      value={item.data}
                      statsIcon={<i className="fa fa-refresh" />}
                      statsIconText="Updated now"
                    />
                  );
                }
              })}
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
