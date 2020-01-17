
import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import NotificationSystem from "react-notification-system";

import AdminNavbar from "components/Navbars/AdminNavbar";
import Footer from "components/Footer/Footer";
import Sidebar from "components/Sidebar/Sidebar";
import FixedPlugin from "components/FixedPlugin/FixedPlugin.jsx";

import { style } from "variables/Variables.jsx";

import routes from "routes.js";

import image from "assets/img/sidebar-2.jpg";

class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      _notificationSystem: null,
      image: image,
      color: "black",
      hasImage: true,
      fixedClasses: "dropdown show-dropdown open",
      array: [
        {
          name: "Cash-Counter",
          coin_id: "01",
          style: "fa fa-bar-chart text-warning"
        },
        {
          name: "BIBA SOFT",
          coin_id: "02",
          style: "fa fa-ravelry text-warning"
        },
        {
          name: "TRIAL ROOM",
          coin_id: "03",
          style: "fa fa-linode text-warning"
        },
        {
          name: "COLOR BAR",
          coin_id: "04",
          style: "fa fa-database text-warning"
        },
        { name: "CLINIQUE", coin_id: "05", style: "fa fa-film text-warning" },
        {
          name: "CASIO",
          coin_id: "06",
          style: "fa fa-stack-exchange text-warning"
        },
        {
          name: "SUN GLASS",
          coin_id: "07",
          style: "fa fa-exchange text-warning"
        },
        {
          name: "FRAGRANCES",
          coin_id: "08",
          style: "fa fa-exchange text-warning"
        },
        {
          name: "LADIES FOOTWEAR",
          coin_id: "09",
          style: "fa fa-thermometer text-warning"
        },
        {
          name: "LADIES BAGS",
          coin_id: "0A",
          style: "fa fa-film text-warning"
        },
        {
          name: "ELECTRICAL PANEL",
          coin_id: "0B",
          style: "fa fa-heartbeat text-warning"
        },
        {
          name: "UCB BOYS",
          coin_id: "0C",
          style: "fa fa-stack-exchange text-warning"
        },
        {
          name: "TINY GIRL",
          coin_id: "0D",
          style: "fa fa-linode text-warning"
        },
        {
          name: "TOY ZONE",
          coin_id: "0E",
          style: "fa fa-exchange text-warning"
        },
        { name: "LEVIS", coin_id: "0F", style: "fa fa-bar-chart text-warning" },
        {
          name: "PERSONAL SHOPPERS",
          coin_id: "10",
          style: "fa fa-heartbeat text-warning"
        },
        {
          name: "ESCALATOR",
          coin_id: "11",
          style: "fa fa-linode text-warning"
        },
        {
          name: "RAYMONDS",
          coin_id: "12 ",
          style: "fa fa-linode text-warning"
        },
        {
          name: "PARK AVENUE",
          coin_id: "13",
          style: "fa fa-bar-chart text-warning"
        },
        {
          name: "ALLEN SOLLY",
          coin_id: "14",
          style: "fa fa-heartbeat text-warning"
        },
        {
          name: "VH SPORTS",
          coin_id: "15",
          style: "fa fa-linode text-warning"
        },
        {
          name: "VIP Carlton",
          coin_id: "16",
          style: "fa fa-linode text-warning"
        },
        {
          name: "Men's Accessories",
          coin_id: "17",
          style: "fa fa-linode text-warning"
        },
        {
          name: "Killer Jeans",
          coin_id: "18",
          style: "fa fa-linode text-warning"
        },
        {
          name: "Maintainence Room",
          coin_id: "19",
          style: "fa fa-linode text-warning"
        },
        {
          name: "Jack & Jones",
          coin_id: "1A",
          style: "fa fa-linode text-warning"
        },
        {
          name: "Men's Footwear",
          coin_id: "1B",
          style: "fa fa-linode text-warning"
        }
      ]
    };
  }
  handleNotificationClick = position => {
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    this.state._notificationSystem.addNotification({
      title: <span data-notify="icon" className="pe-7s-gift" />,
      message: (
        <div>
          Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
          every web developer.
        </div>
      ),
      level: level,
      position: position,
      autoDismiss: 15
    });
  };
  getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === "/admin") {
        return (
          <Route
            path={prop.layout + prop.path}
            render={props => (
              <prop.component
                {...props}
                name = {this.state.array}
                handleClick={this.handleNotificationClick}
              />
            )}
            key={key}
          />
        );
      } else {
        return null;
      }
    });
  };
  getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        this.props.location.pathname.indexOf(
          routes[i].layout + routes[i].path
        ) !== -1
      ) {
        return routes[i].name;
      }
    }
    return "Brand";
  };
  handleImageClick = image => {
    this.setState({ image: image });
  };
  handleColorClick = color => {
    this.setState({ color: color });
  };
  handleHasImage = hasImage => {
    this.setState({ hasImage: hasImage });
  };
  handleFixedClick = () => {
    if (this.state.fixedClasses === "dropdown") {
      this.setState({ fixedClasses: "dropdown show-dropdown open" });
    } else {
      this.setState({ fixedClasses: "dropdown" });
    }
  };
  componentDidMount() {
    this.getTempData();
    this.setState({ _notificationSystem: this.refs.notificationSystem });
    var _notificationSystem = this.refs.notificationSystem;
    var color = Math.floor(Math.random() * 4 + 1);
    var level;
    switch (color) {
      case 1:
        level = "success";
        break;
      case 2:
        level = "warning";
        break;
      case 3:
        level = "error";
        break;
      case 4:
        level = "info";
        break;
      default:
        break;
    }
    // _notificationSystem.addNotification({
    //   title: <span data-notify="icon" className="pe-7s-gift" />,
    //   message: (
    //     <div>
    //       Welcome to <b>Light Bootstrap Dashboard</b> - a beautiful freebie for
    //       every web developer.
    //     </div>
    //   ),
    //   level: level,
    //   position: "tr",
    //   autoDismiss: 15
    // });
  }
  componentDidUpdate(e) {
    if (
      window.innerWidth < 993 &&
      e.history.location.pathname !== e.location.pathname &&
      document.documentElement.className.indexOf("nav-open") !== -1
    ) {
      document.documentElement.classList.toggle("nav-open");
    }
    if (e.history.action === "PUSH") {
      document.documentElement.scrollTop = 0;
      document.scrollingElement.scrollTop = 0;
      this.refs.mainPanel.scrollTop = 0;
    }
  }

  // router.get('/energy', em.energy);
  // router.get('/energy/:meterID', em.enerygyByMeter);
  // router.get('/energy/:meterID/:startDate/:endDate');

  getTempData = () => {
    //return new Promise((resolve, reject) => {
    var date = new Date();
    let arr = {};
    let stateArr = [];
    let l = {};
    let device_idmod = "";
    let sum = 0,
      len = 0;

    //console.log(this.props.location.state);
    //console.log(this.props.history.location.state.device_id);
    // DOING GET API REQUEST TO FETCH THE TEMP  STATISTICS

    fetch(`http://cm1.sensegiz.com/sensegiz-api/temperature/546C0E9FCC79`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        uid: "8",
        "Api-Key": "175748dfd70bc49b190aacf3a5ce0d86"
      }
    })
      .then(res => res.json())
      .then(resultJson => {
        //console.log('resultJson'+JSON.stringify(resultJson));

        resultJson.records.forEach(item => {
          if (arr[item.device_id]) {
            arr[item.device_id] =
              arr[item.device_id] + Math.round(item.device_value);
          } else {
            arr[item.device_id] = Math.round(item.device_value);
          }
          if (l[item.device_id]) {
            //console.log("device_id"+item.device_id)
            l[item.device_id]++;
          } else {
            l[item.device_id] = 1;
          }
        });
      }).then(() =>{
    //create array dynamically
    //console.log("arr" + JSON.stringify(arr));
        for (var key in arr) {
         
          if (arr.hasOwnProperty(key)) {
            switch (key) {
              case "01":
                console.log("in one");
                stateArr.push({
                  name: "Cash-Counter",
                  coin_id: "01",
                  style: "fa fa-bar-chart text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1505'
                });
                break;
              case "02":
                  console.log("in 02");
                stateArr.push({
                  name: "BIBA SOFT",
                  coin_id: "02",
                  style: "fa fa-ravelry text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "03":
                  console.log("in 03");
                stateArr.push({
                  name: "TRIAL ROOM",
                  coin_id: "03",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1504'
                });
                break;
              case "04":
                  console.log("in 04");
                stateArr.push({
                  name: "COLOR BAR",
                  coin_id: "04",
                  style: "fa fa-database text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "05":
                  console.log("in 05");
                stateArr.push({
                  name: "CLINIQUE",
                  coin_id: "05",
                  style: "fa fa-film text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1502'
                });
                break;
              case "06":
                  console.log("in 06");
                stateArr.push({
                  name: "CASIO",
                  coin_id: "06",
                  style: "fa fa-stack-exchange text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "07":
                  console.log("in 07");
                stateArr.push({
                  name: "SUN GLASS",
                  coin_id: "07",
                  style: "fa fa-exchange text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "08":
                  console.log("in 08");
                stateArr.push({
                  name: "FRAGRANCES",
                  coin_id: "08",
                  style: "fa fa-exchange text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "09":
                  console.log("in 09");
                stateArr.push({
                  name: "LADIES FOOTWEAR",
                  coin_id: "09",
                  style: "fa fa-thermometer text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1503'
                });
                break;
              case "0A":
                  console.log("in 0a");
                stateArr.push({
                  name: "LADIES BAGS",
                  coin_id: "0A",
                  style: "fa fa-film text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "0B":
                  console.log("in 0b");
                stateArr.push({
                  name: "ELECTRICAL PANEL",
                  coin_id: "0B",
                  style: "fa fa-heartbeat text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
            
              case "0D":
                  console.log("in 0d");
                stateArr.push({
                  name: "TINY GIRL",
                  coin_id: "0D",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "0E":
                  console.log("in 0e");
                stateArr.push({
                  name: "TOY ZONE",
                  coin_id: "0E",
                  style: "fa fa-exchange text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "0F":
                  console.log("in 0f");
                stateArr.push({
                  name: "LEVIS",
                  coin_id: "0F",
                  style: "fa fa-bar-chart text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1514'
                });
                break;
              case "10":
                  console.log("in 10");
                stateArr.push({
                  name: "PERSONAL SHOPPERS",
                  coin_id: "10",
                  style: "fa fa-heartbeat text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
                case "11":
                    console.log("in 11");
                  stateArr.push({
                    name: "Escalator",
                    coin_id: "11",
                    style: "fa fa-heartbeat text-warning",
                    data: Math.round(arr[key] / l[key]) - 1
                  });
                  break;
              case "12":
                  console.log("in 12");
                stateArr.push({
                  name: "RAYMONDS",
                  coin_id: "12 ",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1511'
                });
                break;
              case "13":
                  console.log("in 13");
                stateArr.push({
                  name: "PARK AVENUE",
                  coin_id: "13",
                  style: "fa fa-bar-chart text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "14":
                  console.log("in 14");
                stateArr.push({
                  name: "ALLEN SOLLY",
                  coin_id: "14",
                  style: "fa fa-heartbeat text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1512'
                });
                break;
              case "15":
                  console.log("in 15");
                stateArr.push({
                  name: "VH SPORTS",
                  coin_id: "15 ",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
         
              case "16":
                  console.log("in 16");
                stateArr.push({
                  name: "VIP Carlton",
                  coin_id: "16",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "17":
                  console.log("in 17");
                stateArr.push({
                  name: "Men's Accessories",
                  coin_id: "17",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
              case "18":
                  console.log("in 18");
                stateArr.push({
                  name: "Killer Jeans",
                  coin_id: "18",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1516'
                });
                break;
              case "19":
                  console.log("in 19");
                stateArr.push({
                  name: "Maintainence Room",
                  coin_id: "19",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1,
                  button_id: '1515'
                });
                break;
              case "1A":
                  console.log("in 1A");
                stateArr.push({
                  name: "Jack & Jones",
                  coin_id: "1A",
                  style: "fa fa-linode text-warning",
                  data: Math.round(arr[key] / l[key]) - 1
                });
                break;
                case "1B":
                    console.log("in 1B");
                  stateArr.push({
                    name: "Men's Footwear",
                    coin_id: "1B",
                    style: "fa fa-linode text-warning",
                    data: Math.round(arr[key] / l[key]) - 1
                  });
                  break;
               
            }
          }
          len++;
        }
      //console.log("statearr"+JSON.stringify(stateArr));

        this.setState({ array: stateArr });
     
      })
    

     
  };
  render() {
    return (
      <div className="wrapper">
        {/* <NotificationSystem ref="notificationSystem" style={style} /> */}
        <Sidebar {...this.props} routes={routes} image={this.state.image}
        color={this.state.color}
        hasImage={this.state.hasImage}/>
        <div id="main-panel" className="main-panel" ref="mainPanel">
          <AdminNavbar
            {...this.props}
            brandText={this.getBrandText(this.props.location.pathname)}
          />
          <Switch>{this.getRoutes(routes)}</Switch>
          {/* <Footer /> */}
          {/* <FixedPlugin
            handleImageClick={this.handleImageClick}
            handleColorClick={this.handleColorClick}
            handleHasImage={this.handleHasImage}
            bgColor={this.state["color"]}
            bgImage={this.state["image"]}
            mini={this.state["mini"]}
            handleFixedClick={this.handleFixedClick}
            fixedClasses={this.state.fixedClasses}
          /> */}
        </div>
      </div>
    );
  }
}

export default Admin;
