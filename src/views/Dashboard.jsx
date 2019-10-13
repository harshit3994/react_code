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
import ChartistGraph from "react-chartist";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

import {
  ComposedChart,
 
  Area,
  Bar
} from "recharts";
import { Grid, Row, Col } from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar
} from "variables/Variables.jsx";
import FixedPlugin from "components/FixedPlugin/FixedPlugin";

const data = [
  {
    name: "Page A",
    Temperature: 4000,
    Humidity: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    Temperature: 3000,
    Humidity: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    Temperature: 2000,
    Humidity: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    Temperature: 2780,
    Humidity: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    Temperature: 1890,
    Humidity: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    Temperature: 2390,
    Humidity: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    Temperature: 3490,
    Humidity: 4300,
    amt: 2100
  }
];

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent1: true,
      showComponent2: false,
      resultJson: []
    };
    this._onButtonClick1 = this._onButtonClick1.bind(this);
    this._onButtonClick2 = this._onButtonClick2.bind(this);
  }

  componentDidMount() {
    
    this.getTempData();
   // this.getHumidity();
  }

  _onButtonClick1() {
    console.log("abcd");
    this.setState({
      showComponent1: true,
      showComponent2: false
    });
    this.getTempData();
  }

  _onButtonClick2() {
    console.log("ab");
    this.setState({
      showComponent2: true,
      showComponent1: false
    });
  //  this.getHumidity();
  }

  getTempData = async () => {
    console.log("in graph");
  
    const questions = [];

    // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS
    const result = await fetch(
      `http://cm1.sensegiz.com/sensegiz-api/temperature`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: "8",
          "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
        }
      }
    );
   
    const resultJson = await result.json();
    console.log(JSON.stringify(resultJson));
    
    var date = new Date();

    resultJson.records.forEach(item => {
            if (date.getDate() === new Date(item.received_on).getDate())
            { questions.push({'name': item.device_value, 'Temperature': item.device_value});
          }
     
    })

 
    this.setState({
       resultJson: questions
    });
  };
  // getHumidity = async () => {
  //   var date = new Date();
    
  //   const questions = [];
  //   console.log(date);

  //   // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS
  //   const result = await fetch(
  //     `http://cm1.sensegiz.com/sensegiz-api/humidity`,
  //     {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         uid: "8",
  //         "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
  //       }
  //     }
  //   );
  //   const resultJson = await result.json();
  //   //console.log(JSON.stringify(resultJson));

  //   resultJson.records.forEach(item => {
  //     if (date.getDate() === new Date(item.received_on).getDate())
  //     {
  //     questions.push({'name': item.device_value,'Humidity': item.device_value});
  //     }
  //   })

   
  //   this.setState({
  //      resultJson: questions
  //   });
  // };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row>
            <Col lg={3} sm={6}>
              <div onClick={this._onButtonClick1}>
                <StatsCard
                  bigIcon={<i className="fa fa-thermometer text-warning" />}
                  statsText="Temprature"
                  statsValue="24 &#176;C"
                  statsIcon={<i className="fa fa-refresh" />}
                  statsIconText="Updated now"
                />
              </div>
            </Col>
            <Col lg={3} sm={6}>
              <div onClick={this._onButtonClick2}>
                <StatsCard
                  bigIcon={<i className="pe-7s-wallet text-success" />}
                  statsText="AC"
                  statsValue="$1,345"
                  statsIcon={<i className="fa fa-calendar-o" />}
                  statsIconText="Last day"
                />
              </div>
            </Col>
            {/* <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="pe-7s-graph1 text-danger" />}
                statsText="Errors"
                statsValue="23"
                statsIcon={<i className="fa fa-clock-o" />}
                statsIconText="In the last hour"
              />
            </Col>
            <Col lg={3} sm={6}>
              <StatsCard
                bigIcon={<i className="fa fa-twitter text-info" />}
                statsText="Followers"
                statsValue="+45"
                statsIcon={<i className="fa fa-refresh" />}
                statsIconText="Updated now"
              />
            </Col> */}
          </Row>
          <Row>
            {this.state.showComponent1
              ? <Col md={12} sm={6}>
                  <Card
                    id="chartHours"
                    title="Temprature Statistics"
                    category="24 Hours performance"
                    // stats="Updated 3 minutes ago"
                    content={
                      <div className="ct-chart">
                        <div style={{ float: "right" }}>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ marginRight: "10px" }}
                          >
                            Daily
                          </button>
                          <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ marginRight: "10px" }}
                          >
                            Weekly
                          </button>
                          <button
                            type="button"
                            className="btn btn-success"
                            style={{ marginRight: "10px" }}
                          >
                            Monthly
                          </button>
                        </div>
                        <LineChart
                          width={900}
                          height={300}
                          data={this.state.resultJson}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Line
                            type="monotone"
                            dataKey="Temperature"
                            stroke="#8884d8"
                            activeDot={{ r: 8 }}
                          />
                          <Line type="monotone" dataKey="Humidity" stroke="#82ca9d" />
                        </LineChart>
                      </div>
                    }
                  />
                </Col>
              : <Col md={12} sm={6}>
                  <Card
                    title="Email Statistics"
                    category="Last Campaign Performance"
                    stats="Campaign sent 2 days ago"
                    content={
                      <div
                        id="chartPreferences"
                        className="ct-chart ct-perfect-fourth"
                      >
                        <ComposedChart
                          width={900}
                          height={400}
                          data={data}
                          margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20
                          }}
                        >
                          <CartesianGrid stroke="#f5f5f5" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Area
                            type="monotone"
                            dataKey="amt"
                            fill="#8884d8"
                            stroke="#8884d8"
                          />
                          <Bar dataKey="Temperature" barSize={20} fill="#413ea0" />
                          <Line type="monotone" dataKey="Humidity" stroke="#ff7300" />
                          {/* <Scatter dataKey="cnt" fill="red" /> */}
                        </ComposedChart>
                      </div>
                    }
                  />
                </Col>}
          </Row>

          {/* <Row>
            <Col md={6}>
              <Card
                id="chartActivity"
                title="2014 Sales"
                category="All products including Taxes"
                stats="Data information certified"
                statsIcon="fa fa-check"
                content={
                  <div className="ct-chart">
                    <ChartistGraph
                      data={dataBar}
                      type="Bar"
                      options={optionsBar}
                      responsiveOptions={responsiveBar}
                    />
                  </div>
                }
                legend={
                  <div className="legend">{this.createLegend(legendBar)}</div>
                }
              />
            </Col>

            <Col md={6}>
              <Card
                title="Tasks"
                category="Backend development"
                stats="Updated 3 minutes ago"
                statsIcon="fa fa-history"
                content={
                  <div className="table-full-width">
                    <table className="table">
                      <Tasks />
                    </table>
                  </div>
                }
              />
            </Col>
          </Row> */}
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
