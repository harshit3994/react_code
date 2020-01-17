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
//import { Promise } from "q";

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
  energyData = [];
  constructor() {
    super();
    this.state = {
      modalIsOpen: false,
      date: new Date(),
      lastday: [],
      datas: [],
      monthly: [],
      daily: [],
      weekly: [],
      energymeter: "SS_ENERGY_METER_FF",
      reminderDate: new Date(),
      value: "Time(Hrs)",
      color:'green'
    };

    this.setWeekly = this.setWeekly.bind(this);
    this.setDaily = this.setDaily.bind(this);
    this.setMonthly = this.setMonthly.bind(this);
    this.inputDataFF = this.inputDataFF.bind(this);
    this.inputDataGF = this.inputDataGF.bind(this);
  }

  componentDidMount() {
    this._isMounted = true;
    this.getData();
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  fetchEnergyData(startdate, energymeter) {
    return new Promise((resolve, reject) => {
      fetch(
        `http://13.232.167.55:3000/v1/api/energy/${energymeter}/${startdate}/${new Date().getFullYear()}${new Date().getMonth() +
          1}30220707`,
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
          if (resultJson.data.LastEvaluatedKey) {
            this.energyData = [...this.energyData, ...resultJson.data.Items];
            resolve(
              this.fetchEnergyData(
                resultJson.data.LastEvaluatedKey.timestamp,
                this.state.energymeter
              ).then(() => {
                return this.energyData;
              })
            );
          } else {
            resolve(resultJson.data.Items);
          }
        })
        .catch(function(err) {
          console.log(err);
          reject(err);
        });
    });
  }
  // `${date.getFullYear()}${date.getMonth() + 1}${date.Date() + 1}040707`,
  //     this.state.energymeter,
  //     //`${date.getFullYear()}${date.getMonth() + 1}${date.Date() + 1}220707`
  getIndividualData = () => {
    const date = this.state.reminderDate;

    const arrDaily = {};
    //const day = 0;
    var arrdailyindividual = [];
    debugger;
    if (date.getDate() > 0 && date.getDate() <= 9) {
      var day = "0" + date.getDate();
    } else {
      day = date.getDate();
    }

    console.log(
      `http://13.232.167.55:3000/v1/api/energy/${this.state
        .energymeter}/${date.getFullYear()}${date.getMonth() +
        1}${date.getDate()}040707/${date.getFullYear()}${date.getMonth() +
        1}${day}220707`
    );
    fetch(
      `http://13.232.167.55:3000/v1/api/energy/${this.state
        .energymeter}/${date.getFullYear()}${date.getMonth() +
        1}${day}040707/${date.getFullYear()}${date.getMonth() + 1}${day}220707`,
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
        resultJson.data.Items.forEach(item => {
          const dateinIST = this.getDateinIST(item);
          const hourforsingle = dateinIST.getHours();
          if (
            dateinIST.getDate() == date.getDate() &&
            hourforsingle >= 10 &&
            hourforsingle <= 22
          ) {
            const energy = item.energy / 1000.0;
            if (arrDaily[hourforsingle]) {
              if (energy > arrDaily[hourforsingle].max) {
                arrDaily[hourforsingle].max = energy;
              } else if (energy < arrDaily[hourforsingle].min) {
                arrDaily[hourforsingle].min = energy;
              }
            } else {
              arrDaily[hourforsingle] = { min: energy, max: energy };
            }
          }
        });

        for (let i = 0; i < 31; i++) {
          if (arrDaily[i]) {
            arrdailyindividual.push({
              energy: arrDaily[i].max - arrDaily[i].min,
              name: i + "th hr"
            });
          }
        }
        console.log("arr is98987987987987987" + arrdailyindividual);
        this.setState({ datas: arrdailyindividual });
      })
      .catch(err => {
        console.log(err);
      });
  };

  getDateinIST(item) {
    var yearUTC = item.timestamp.toString().substring(0, 4);
    var monthUTC = item.timestamp.toString().substring(4, 6);
    monthUTC = (parseInt(monthUTC) - 1).toString();
    console.log(typeof monthUTC);
    var dayUTC = item.timestamp.toString().substring(6, 8);
    var hourUTC = item.timestamp.toString().substring(8, 10);
    var minUTC = item.timestamp.toString().substring(10, 12);
    var secondUTC = item.timestamp.toString().substring(12, 14);
    var dateUTC = new Date(
      yearUTC,
      monthUTC,
      dayUTC,
      hourUTC,
      minUTC,
      secondUTC
    );
    var dateUTC = dateUTC.getTime();
    var dateIST = new Date(dateUTC);
    //date shifting for IST timezone (+5 hours and 30 minutes)
    dateIST.setHours(dateIST.getHours() + 5);
    dateIST.setMinutes(dateIST.getMinutes() + 30);
    return dateIST;
  }

  getData = async () => {
    debugger;
    const arrWeekly = {},
      arrdaily = {},
      lendaily = new Array(31).fill(0),
      arrMonthly = {},
      arrDaily = {};

    const arrMonth = [
      "Jan",
      "Feb",
      "March",
      "April",
      "May",
      "June",
      "July",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"
    ];

    var arrMonthlyMod = [];
    var arrWeeklyMod = [];
    var arrdailyMod = [];
    var consumptionDaily = 0;

    this.fetchEnergyData(
      `${new Date().getFullYear()}${new Date().getMonth() + 1}01040707`,
      this.state.energymeter
    )
      .then(resultJson => {
        console.log("result is" + JSON.stringify(resultJson));

        resultJson.forEach(item => {
          const dateIST = this.getDateinIST(item);
          var month = dateIST.getMonth();

          var hour = dateIST.getHours();
          var day = dateIST.getDate();

          //  console.log(day);

          if (month === new Date().getMonth()) {
            // For weekly
            const energy = item.energy / 1000.0;
            if (new Date().getDate() - parseInt(day) < 7) {
              if (arrWeekly[day]) {
                if (energy > arrWeekly[day].max) {
                  arrWeekly[day].max = energy;
                } else if (energy < arrWeekly[day].min) {
                  arrWeekly[day].min = energy;
                }
              } else {
                arrWeekly[day] = { min: energy, max: energy };
              }
            }

            // For monthly

            if (arrMonthly[day]) {
              if (energy > arrMonthly[day].max) {
                arrMonthly[day].max = energy;
              } else if (energy < arrMonthly[day].min) {
                arrMonthly[day].min = energy;
              }
            } else {
              arrMonthly[day] = { min: energy, max: energy };
            }

            // For daily
            // if (new Date().getDate() === parseInt(day)) {
            // debugger;

            if (day == new Date().getDate() && hour >= 10 && hour <= 22) {
              const energy = item.energy / 1000.0;
              if (arrDaily[hour]) {
                if (energy > arrDaily[hour].max) {
                  arrDaily[hour].max = energy;
                } else if (energy < arrDaily[hour].min) {
                  arrDaily[hour].min = energy;
                }
              } else {
                arrDaily[hour] = { min: energy, max: energy };
              }
            }
          }
        });
        debugger;
        for (var i = 0; i <= 31; i++) {
          if (arrMonthly[i]) {
            arrMonthlyMod.push({
              energy: arrMonthly[i].max - arrMonthly[i].min,
              name: i + " " + arrMonth[new Date().getMonth()]
            });
          }
          if (arrWeekly[i]) {
            // arrWeekly[i] = arrWeekly[i] / lenweekly[i];

            arrWeeklyMod.push({
              energy: arrWeekly[i].max - arrWeekly[i].min,
              name: i + " " + arrMonth[new Date().getMonth()]
            });
          }
          if (arrDaily[i]) {
            arrdailyMod.push({
              energy: arrDaily[i].max - arrDaily[i].min,
              name: i + "th hr"
            });
            consumptionDaily =
              consumptionDaily + arrDaily[i].max - arrDaily[i].min;
          }
        }

        if (this._isMounted) {
          this.setState({
            datas: arrdailyMod
          });
        }
        this.setState({ monthly: arrMonthlyMod });
        this.setState({ daily: arrdailyMod });
        this.setState({ weekly: arrWeeklyMod });
        this.setState({
          lastday: [
            {
              name: "DATE",
              data:
                new Date().getDate() + "th " + arrMonth[new Date().getMonth()],
              color: "lightblue"
            },
            {
              name: "Total Energy",
              data: consumptionDaily.toFixed(0) + "KWH",
              color: "lightblue"
            },
            {
              name: "Run Hrs",
              data: new Date().getHours() - 10,
              color: "lightblue"
            },
            {
              name: "Consumption",
              data: (consumptionDaily / 12).toFixed(0) + "/hr",
              color: "lightblue"
            }
          ]
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  setWeekly() {
    this.setState({ datas: this.state.weekly });
    this.setState({ value: "Time(Days)" });
  }
  onChange = val => {
    console.log(val);
    this.setState(val);
    //console.log(this.state.reminderDate);
  };

  setDaily() {
    this.setState({ datas: this.state.daily });
    this.setState({ value: "Time(Hrs)" });
  }

  setMonthly() {
  
    this.setState({ datas: this.state.monthly ,color:'red '});
    this.setState({ value: "Time(Days)" });
  }
  inputDataFF = () => {
    this.setState({ energymeter: "SS_ENERGY_METER_FF" });

    this.getData();
  };
  inputDataGF = () => {
    this.setState({ energymeter: "SS_ENERGY_METER_GF" });
    this.energyData = [];
    this.getData();
  };
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
                <MenuItem onClick={this.inputDataGF}>
                  SS_ENERGY_METER_GF
                </MenuItem>
                <MenuItem onClick={this.inputDataFF}>
                  SS_ENERGY_METER_FF
                </MenuItem>
              </DropdownButton>
              <InputGroup
                style={{ position: "absolute", top: "1px", left: "154px" }}
              >
                <DateTimePicker
                  onChange={e => this.onChange({ reminderDate: e })}
                  value={this.state.reminderDate}
                />

                <Button
                  style={{ marginLeft: "10px" }}
                  color="secondary"
                  onClick={() => this.getIndividualData()}
                >
                  Submit
                </Button>
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
                          value: this.state.value,
                          position: "insideBottom",
                          offset: -2
                        }}
                      />
                      <YAxis
                        label={{
                          value: "Energy(KWH)",
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
          <Row>
            <Button
              color="success"
              onClick={this.setMonthly}
              style={{
                marginLeft: "400px",
                width: "200px",
                height: "200px",
                borderRadius: "50%",
                backgroundColor:this.state.color
              }}
            >
              <h3>Auto mode</h3>
            </Button>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default Notifications;
