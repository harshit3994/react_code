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

import { ComposedChart, Area, Bar } from "recharts";
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
    // var promise1 = this.getTempData();
    // var promise2 = this.getHumidity();
    // Promise.all([promise1, promise2])
    //   .then(result => {
    //     console.log((result));
    //     // var finalRes = [];
    //     // result.forEach(function(item) {
    //     //     item.forEach(function(val) {
    //     //       var obj = {
    //     //         "name" : val.name,
    //     //         "temperature" : val.temperature,  
    //     //       }
    //     //     });
    //     // });
    //   })
    //   .catch(val => {
    //     console.log(val);
    //   });
   this.getTempData();
     this.getHumidity();
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
    this.getHumidity();
  }
  getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  getTempData = () => {
    //return new Promise((resolve, reject) => {
      var date = new Date();
      const questions = [];

      // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS
      fetch(`http://cm1.sensegiz.com/sensegiz-api/temperature`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: "8",
          "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
        }
      })
        .then(res => res.json())
        .then(resultJson => {
          resultJson.records.forEach(item => {
            if (date.getDate() === new Date(item.received_on).getDate()) {
              console.log("##3");
              questions.push({
                name: item.received_on,
                Temperature: item.device_value,
                Humidity:  item.device_value - this.getRandomInt(10)
              });
              
            }
            
          });
          
          this.setState({resultJson:questions});
          //resolve(questions);
        })
        .catch(val => {
         // reject(val);
        });
   // });
  };
  getHumidity = () => {
   // return new Promise((resolve, reject) => {
      var date = new Date();

      const questions = [];

      // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS
      fetch(`http://cm1.sensegiz.com/sensegiz-api/humidity`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: "8",
          "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
        }
      })
        .then(res => res.json())
        .then(resultJson => {
          resultJson.records.forEach(item => {
            if (date.getMonth() === new Date(item.received_on).getMonth()) {
              questions.push({
                name: item.received_on,
                Humidity: item.device_value

              });
            }
          });
         // resolve(questions);
        })
        .catch(val => {
         // reject(val);
       // });
    });
  };

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
                  statsValue="24 °C"
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
                          <Line
                            type="monotone"
                            dataKey="Humidity"
                            stroke="#82ca9d"
                          />
                        </LineChart>
                      </div>
                    }
                  />
                </Col>
              : <Col md={12} sm={6}>
                  <Card
                    title="Email Statistics"
                    category="Last Campaign Performance"
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
                          <Bar
                            dataKey="Temperature"
                            barSize={20}
                            fill="#413ea0"
                          />
                          <Line
                            type="monotone"
                            dataKey="Humidity"
                            stroke="#ff7300"
                          />
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