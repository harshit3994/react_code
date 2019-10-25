import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import { StatsCard } from "components/StatsCard/StatsCardSubset";
import { router } from "react-router-dom";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showComponent1: true,
      showComponent2: false
    };
    this.routeChange = this.routeChange.bind(this);
  }

  



  routeChange(device_id) {
    // console.log(device_id);
    this.props.history.push("/admin/dashboard", {
      device_id: device_id
    });
  }

  render() {
    return (
      <div
        className="content"
        style={{
          backgroundImage:
            "url(" +
            "https://images.pexels.com/photos/34153/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=350" +
            ")",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat"
        }}
      >
        <Grid fluid>
          <Row>
            {this.props.name.map((item, id) =>
              <Col lg={3} sm={6} key={id}>
                <div onClick={() => this.routeChange(item.coin_id)}>
                  <StatsCard
                    bigIcon={<i className={item.style} />}
                    statsText={item.name}
                    statsValue={item.data}
                    statsIcon={<i className="fa fa-refresh" />}
                    statsIconText="Updated now"
                  />
                </div>
              </Col>
            )}
          </Row>
        </Grid>
      </div>
    );
  }
}

export default UserProfile;
