import axios from "axios";
import React, { Component } from "react";
import Cookies from "universal-cookie/es6";
import values from "../../../values";
import { aboutcontext } from "../../context/context";
import Add from "../../Elements/Add/Add";
import Name from "../../Elements/Name/Name";
import Title from "../../Elements/TItle/Title";
import "./About.scss";

const cookies = new Cookies();
const URL = `${values.BASE_URL}/dashboard/home`;
const serviceUrl = `${values.BASE_URL}/dashboard/service`;
const reviewUrl = `${values.BASE_URL}/dashboard/review`;

export default class About extends Component {
  state = {
    cookie: cookies.get(values.COOKIE_NAME),
    name: "",
    description: "",
    age: "",
    nationality: "",
    language: "",
    address: "",
    freelance: "",

    // service  data
    services: [],

    // review data
    reviews: [],
  };

  componentDidMount() {
    const { cookie } = this.state;
    // get about content
    axios
      .get(URL, {
        headers: {
          cookies: cookie,
        },
      })
      .then((d) => {
        const data = d.data.result[0];
        this.setState({
          name: data.name,
          description: data.description,
          age: data.age,
          nationality: data.nationality,
          language: data.language,
          address: data.address,
          freelance: data.freelance,
        });
      })
      .catch((e) => console.log(e));

    // get servise data
    axios
      .get(serviceUrl, {
        headers: {
          cookies: cookie,
        },
      })
      .then((d) => {
        this.setState({ services: d.data.result });
      })
      .catch((e) => {
        alert(e.response.data.error);
      });

    // get Review data
    axios
      .get(reviewUrl, {
        headers: {
          cookies: cookie,
        },
      })
      .then((d) => {
        this.setState({ reviews: d.data.result });
      })
      .catch((e) => {
        alert(e.response.data.errors);
      });
  }

  inputChangeHandler = (e) => {
    if (e.target.name === "name") {
      this.setState({ name: e.target.value });
    } else if (e.target.name === "description") {
      this.setState({ description: e.target.value });
    } else if (e.target.name === "age") {
      this.setState({ age: e.target.value });
    } else if (e.target.name === "nationality") {
      this.setState({ nationality: e.target.value });
    } else if (e.target.name === "language") {
      this.setState({ language: e.target.value });
    } else if (e.target.name === "address") {
      this.setState({ address: e.target.value });
    } else if (e.target.name === "freelance") {
      this.setState({ freelance: e.target.value });
    }
  };

  render() {
    const {
      name,
      description,
      age,
      nationality,
      language,
      address,
      freelance,
      services,
      reviews,
    } = this.state;
    const revServices = services.reverse();
    const data = {
      name,
      description,
      age,
      nationality,
      language,
      address,
      freelance,
    };
    return (
      <div className="about">
        <div className="container">
          <Title name="About Me" />
          <aboutcontext.Provider
            value={{
              data,
              service: "",
            }}
          >
            <Name single="about" name={name} />
          </aboutcontext.Provider>

          <Title name="Services" />
          <Add name="Add Service" single="service" />

          {revServices.map((service) => (
            <aboutcontext.Provider key={service._id} value={{ service }}>
              <Name
                single="service"
                useDelete="yes"
                name={service.title}
                data={service}
              />
            </aboutcontext.Provider>
          ))}

          {/* Review Item */}
          <Title name="Reviews" />
          <Add name="Add Review" single="review" />

          {reviews.reverse().map((review) => (
            <aboutcontext.Provider key={review._id} value={{ review }}>
              <Name single="review" useDelete="yes" name={review.name} />
            </aboutcontext.Provider>
          ))}
        </div>
      </div>
    );
  }
}
