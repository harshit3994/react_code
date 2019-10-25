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
//import Button from 'react-bootstrap/Button'

import DateTimePicker from "react-datetime-picker";
import { InputGroup, InputGroupAddon, Button, Input } from "reactstrap";
import {
  Grid,
  Row,
  Col,
  Alert,
  DropdownButton,
  MenuItem
} from "react-bootstrap";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";

import Modal from "react-modal";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const data = [
  {
    name: "Page A",
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    pv: 4300,
    amt: 2100
  }
];

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"
  }
};

class Notifications extends Component {
  _isMounted = false;
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      date: new Date(),
      lastday: [],
      datas: [],
      monthly: [],
      daily: [],
      weekly: []
    };

    this.setWeekly = this.setWeekly.bind(this);
    this.setDaily = this.setDaily.bind(this);
    this.setMonthly = this.setMonthly.bind(this);
  }
  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  getData = () => {
    const arrWeekly = {},
      arrdaily = {},
      lendaily = new Array(31).fill(0),
      arrMonthly = {},
      lenmonthly = new Array(31).fill(0),
      lenweekly = new Array(31).fill(0);
    var arrMonthlyMod = [];
    var arrWeeklyMod = [];
    var arrdailyMod = [];
    var difflastday = 0;
    var counter = new Array(31).fill(0),
      counter1 = new Array(31).fill(0);
    //for (var i = 0; i < 31; i++) arrMonthlyMod.push({});

    fetch(
      `http://13.232.167.55:3000/v1/api/energy/SS_ENERGY_METER_FF/20191001100707/20191030220707`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          uid: "8",
          "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
        }
      }
    )
      .then(res => res.json())
      .then(resultJson => {
        var a, b, c, d;
        let today_date = new Date().getDate();
        resultJson.data.forEach(item => {
          //  console.log(typeof item.timestamp)
          var month = item.timestamp.toString().substring(4, 6);
          var day = item.timestamp.toString().substring(6, 8);
          if (day > 0 && day < 10) {
            day = day.substr(1);
          }

          var hour = item.timestamp.toString().substring(8, 10);
          //  console.log(day);
          if (month - 1 === new Date().getMonth()) {
            // For weekly
            if (new Date().getDate() - parseInt(day) <= 16) {
             console.log(new Date().getDate() - parseInt(day));
              if (hour == 10 || hour == 22) {
                debugger;
                if (arrWeekly[day]) {
                  arrWeekly[day][hour] = item.energy / 1000.0;
                } else {
                  arrWeekly[day] = { [hour]: item.energy / 1000.0 };
                }
              }
            }

            // For monthly
            if (hour == 10 || hour == 22) {
              if (arrMonthly[day]) {
                arrMonthly[day][hour] = item.energy / 1000.0;
              } else {
                arrMonthly[day] = { [hour]: item.energy / 1000.0 };
              }
            }
          }
        });
        console.log("arrWeekly" + JSON.stringify(arrWeekly));
        //difflastday = arrdaily[22] - arrdaily[10];
        this.setState({
          lastday: [
            { name: "Date", data: today_date, color:"lightblue"},
            { name: "Total Energy", data: "0" +'KWH',color:"lightblue"},
            { name: "Total Run Hrs", data: "12 Hrs" ,color:"lightblue"},
            { name: "Consumption", data: "0"+'/hr',color:"lightblue" }
          ]
        });

        for (var i = 0; i < 31; i++) {
          if (arrMonthly[i]) {
            //  debugger;
            //  arrMonthly[i] = arrMonthly[i] / lenmonthly[i];

            arrMonthlyMod.push({
              energy: arrMonthly[i]["22"] - arrMonthly[i]["10"],
              name: i
            });
          }
          if (arrWeekly[i]) {
            // arrWeekly[i] = arrWeekly[i] / lenweekly[i];

            arrWeeklyMod.push({
              energy: arrWeekly[i]["22"] - arrWeekly[i]["10"],
              name: i
            });
          }
          if (arrdaily[i] !== 0) {
            arrdaily[i] = arrdaily[i] / lendaily[i];

            arrdailyMod.push({ energy: arrdaily[i], name: i + "-" + (i + 1) });
          }
        }
        // console.log("data is" + JSON.stringify(resultJson.data));
        // console.log("in month" + JSON.stringify(arrMonthlyMod));
        // console.log("week" + JSON.stringify(arrdailyMod));
        // console.log(this.state.datas);

        if (this._isMounted) {
          this.setState({
            datas: arrdailyMod
          });
        }
        this.setState({ monthly: arrMonthlyMod });
        this.setState({ daily: arrdailyMod });
        this.setState({ weekly: arrWeeklyMod });
      });
  };

  setWeekly() {
    this.setState({ datas: this.state.weekly });
  }
  onChange = date => this.setState({ date });

  setDaily() {
    this.setState({ datas: this.state.daily });
  }

  setMonthly() {
    this.setState({ datas: this.state.monthly });
  }
  renderAddTaskModal = () => {
    // debugger;
    return (
      <div>
        <button onClick={this.openModal}>Open Modal</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div>I am a modal</div>
          <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form>
        </Modal>
      </div>
    );
  };

  render() {
    return (
      <div className="content">
        <Grid fluid>
          <Row style={{ marginBottom: "66px" }}>
            <Col lg={6} sm={6}>
              <DropdownButton title="Energy Meter">
                <MenuItem onClick={this.inputData}>SS_ENERGY_METER_GF</MenuItem>
                <MenuItem onClick={this.inputData}>SS_ENERGY_METER_FF</MenuItem>
              </DropdownButton>
              <InputGroup
                style={{ position: "absolute", top: "1px", left: "154px" }}
              >
                <DateTimePicker
                  onChange={this.onChange}
                  value={this.state.date}
                />

                <InputGroupAddon
                  addonType="append"
                  style={{
                    position: "absolute",
                    left: "190px",
                    top: "0px"
                  }}
                >
                  <Button color="secondary">Submit</Button>
                </InputGroupAddon>
              </InputGroup>
            </Col>

            <Col lg={6} sm={6}>
              <div style={{ float: "right" }}>
                <Button color="primary" onClick={this.setDaily}>
                  DAILY
                </Button>
                {"  "}
                <Button color="secondary" onClick={this.setWeekly}>
                  WEEKLY
                </Button>
                {"  "}
                <Button color="success" onClick={this.setMonthly}>
                  MONTHLY
                </Button>
                {"  "}
              </div>
            </Col>
          </Row>

          <Row>
            {this.state.lastday.map((item, id) =>
              <Col lg={3} sm={6} key={id}>
                <div>
                  <StatsCard
                    bigIcon={<i className={item.style} />}
                    statsText={item.name}
                    statsValue={item.data}
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText="Updated now"
                    color={item.color}
                  />
                </div>
              </Col>
            )}
          </Row>
          <Row>
            <Col lg={12} md={12} sm={6}>
              <Card
                id="chartHours"
                title="Temprature Statistics"
                // stats="Updated 3 minutes ago"
                content={
                  <div className="ct-chart">
                    <BarChart
                      width={800}
                      height={250}
                      data={this.state.datas}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="name"
                        label={{
                          value: "Time",
                          position: "insideBottom",
                          offset: -5
                        }}
                      />
                      <YAxis
                        label={{
                          value: "KWH",
                          angle: -90,
                          position: "insideLeft"
                        }}
                      />
                      <Tooltip />

                      <Bar dataKey="energy" fill="#8854d8" />
                    </BarChart>
                  </div>
                }
              />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Notifications;
