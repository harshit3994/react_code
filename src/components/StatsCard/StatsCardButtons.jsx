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
import { Row, Col } from "react-bootstrap";

export class StatsCard extends Component {
  render() {
    return (
      <div className="card card-stats">
        <div className="content">
          <Row>
            <Col xs={5}>
              <div>
                <h5>
                  <b>
                    {this.props.statsValue}
                  </b>
                </h5>
              </div>
              <div style={{ textAlign: "left", marginTop: "9px" }}>
                <h5>
                  <b>
                    {this.props.value} &deg; C
                  </b>
                </h5>
              </div>
            </Col>
            <Col xs={7}>
              <div className="numbers" style={{marginTop: '10px'}}>
                <p>
                  {this.props.statsText}
                </p>
              </div>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default StatsCard;
