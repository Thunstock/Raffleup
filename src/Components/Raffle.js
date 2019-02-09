import React, { Component } from "react";
import axios from "axios";
import Roulette from "./Roulette";
import Search from "./Search";
import queryString from "query-string";
import Spinner from "./Spinner";
import ReactGA from "react-ga";

class Raffle extends Component {
  state = {
    urlName: "",
    eventId: "",
    groups: [],
    events: [],
    attendanceList: [],
    sizeRoulette: 7,
    statusMessage: "",
    startIndex: 0,
    endIndex: 7,
    timer: null,
    duration: null,
    runningTime: 0,
    indexWinner: null,
    winner: null,
    endGame: false,
    roulette: [],
    loading: false,
    showList: false
  };

  handleChangeName = e => {
    this.setState({ [e.target.id]: e.target.value }, this.getEventsByGroup);
    this.resetGame();
  };

  handleChangeEventId = e => {
    this.setState({ [e.target.id]: e.target.value }, this.getAttendanceList);
    this.resetGame();
  };

  resetGame = () => {
    this.stopRoulette();
    const attendanceList = [];
    this.setState({ attendanceList });

    const roulette = [];
    this.setState({ roulette });

    const winner = null;
    this.setState({ winner });

    const indexWinner = null;
    this.setState({ indexWinner });

    const endIndex = this.state.sizeRoulette;
    this.setState({ endIndex });

    const startIndex = 0;
    this.setState({ startIndex });

    const statusMessage = "";
    this.setState({ statusMessage });
  };

  componentDidMount = () => {
    const { access_token } = queryString.parse(this.props.location.hash);

    localStorage.setItem("access_token", access_token);

    this.getGroups(access_token);

    if (process.env.REACT_APP_GA_TRACKING_ID) {
      ReactGA.pageview("/raffle");
    }
  };

  getGroups = access_token => {
    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.meetup.com/self/groups?access_token=${access_token}&sign=true&photo-host=public&page=20`
      )
      .then(response => {
        this.setState({ groups: response.data });
      })
      .catch(error => {
        let statusMessage = "An error has ocurred";
        this.setState({ statusMessage });
      });
  };

  getEventsByGroup = () => {
    let loading = true;
    this.setState({ loading });

    if (this.state.urlName) {
      const access_token = localStorage.getItem("access_token");

      const getPastEvents = () => {
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.meetup.com/${
            this.state.urlName
          }/events?access_token=${access_token}&sign=true&photo-host=public&page=5&desc=true&status=past`
        );
      };

      const getUpcomingEvent = () => {
        return axios.get(
          `https://cors-anywhere.herokuapp.com/https://api.meetup.com/${
            this.state.urlName
          }/events?access_token=${access_token}&sign=true&photo-host=public&page=1&desc=false&status=upcoming`
        );
      };

      axios
        .all([getUpcomingEvent(), getPastEvents()])
        .then(response => {
          const events = [...response[0].data, ...response[1].data];

          this.setState({ events });

          loading = false;
          this.setState({ loading });
        })
        .catch(error => {
          const statusMessage = "An error has ocurred";
          this.setState({ statusMessage });
        });
    } else {
      this.setState({
        events: []
      });
    }
  };

  getAttendanceList = () => {
    let loading = true;
    this.setState({ loading });

    const access_token = localStorage.getItem("access_token");

    axios
      .get(
        `https://cors-anywhere.herokuapp.com/https://api.meetup.com/${
          this.state.urlName
        }/events/${
          this.state.eventId
        }/rsvps?access_token=${access_token}&sign=true&photo-host=public&page=20`
      )

      .then(response => {
        this.setState({
          attendanceList: response.data.filter(
            assistent => assistent.member.id !== 0 && assistent.member.photo
          )
        });
        /*Set roulette size  */

        if (this.state.attendanceList.length <= 3) {
          const statusMessage = "The event must have at least 4 participants";
          this.setState({ statusMessage });
        } else if (this.state.attendanceList.length < 7) {
          const sizeRoulette = 3;
          this.setState({ sizeRoulette });

          const endIndex = 3;
          this.setState({ endIndex });

          this.resetRoulette();
          const statusMessage = "";
          this.setState({ statusMessage });
        } else if (this.state.attendanceList.length >= 7) {
          const sizeRoulette = 7;
          this.setState({ sizeRoulette });

          const endIndex = 7;
          this.setState({ endIndex });
          this.resetRoulette();

          const statusMessage = "";
          this.setState({ statusMessage });
        }

        loading = false;
        this.setState({ loading });
      })
      .catch(error => {
        const statusMessage = "An error has ocurred";
        this.setState({ statusMessage });

        loading = false;
        this.setState({ loading });
      });
  };

  resetRoulette = () => {
    const startIndex = 0;
    this.setState({ startIndex });
    const endIndex = this.state.sizeRoulette;
    this.setState({ endIndex });

    const roulette = this.state.attendanceList.slice(startIndex, endIndex);
    this.setState({ roulette });

    const indexWinner = null;
    this.setState({ indexWinner });
  };

  startRoulette = () => {
    this.resetRoulette();

    const duration = this.randomNumber(110000, 120000);
    this.setState({ duration });

    const endGame = false;
    this.setState({ endGame });

    const winner = null;
    this.setState({ winner });

    this.getWinner();

    let timer = setInterval(this.spin, 500);
    this.setState({ timer });
  };

  stopRoulette = () => {
    clearInterval(this.state.timer);
    const endGame = true;
    this.setState({ endGame });
    const runningTime = 0;
    this.setState({ runningTime });
    const duration = null;
    this.setState({ duration });
  };

  randomNumber = (min, max) => {
    return parseInt(Math.random() * (max - min) + min);
  };

  spin = () => {
    const { attendanceList, startIndex, endIndex, sizeRoulette } = this.state;

    if (!this.state.endGame) {
      /* Calculate the startIndex and endIndex of the attendanceList for the roulette */
      if (
        startIndex < attendanceList.length - 1 &&
        endIndex < attendanceList.length - 1
      ) {
        const startIndex = this.state.startIndex + 1;
        const endIndex = this.state.endIndex + 1;

        this.setState({ startIndex });
        this.setState({ endIndex });
      } else if (startIndex === attendanceList.length - 1) {
        const startIndex = 0;
        const endIndex = this.state.endIndex + 1;

        this.setState({ startIndex });
        this.setState({ endIndex });
      } else if (endIndex === attendanceList.length - 1) {
        const endIndex = 0;
        const startIndex = this.state.startIndex + 1;

        this.setState({ startIndex });
        this.setState({ endIndex });
      }

      /* Set the roulette */
      if (startIndex < endIndex) {
        const roulette = attendanceList.slice(startIndex, endIndex);
        this.setState({ roulette });
      } else {
        const roulette = attendanceList
          .slice(startIndex)
          .concat(attendanceList.slice(0, endIndex));
        this.setState({ roulette });
      }

      this.animation();

      /* Find the winner */
      const animationDuration =
        Math.round((attendanceList.length * 200) / 1000) * 1000;
      if (this.state.runningTime > animationDuration) {
        if (
          this.state.roulette[Math.floor(sizeRoulette / 2)].member.id ===
          this.state.attendanceList[this.state.indexWinner].member.id
        ) {
          const winner = this.state.attendanceList[this.state.indexWinner];
          this.stopRoulette();
          this.setState({ winner });
        }
      }
    }
  };

  getWinner = () => {
    const indexWinner = Math.floor(
      Math.random() * Math.floor(this.state.attendanceList.length - 1)
    );

    this.setState({ indexWinner });
  };

  animation = () => {
    const { attendanceList } = this.state;

    const requestId = window.requestAnimationFrame(this.spin);
    const animationDuration =
      Math.round((attendanceList.length * 200) / 1000) * 1000;

    const runningTime = this.state.runningTime + 500;
    this.setState({ runningTime });

    if (this.state.runningTime > animationDuration) {
      window.cancelAnimationFrame(requestId);
    }
    if (this.state.runningTime === animationDuration) {
      this.startSuspense();
    }
  };

  startSuspense = () => {
    const { attendanceList, indexWinner, sizeRoulette } = this.state;
    let suspense = 10;
    let indexInitSuspense = null;

    if (attendanceList.length < suspense) {
      suspense = attendanceList.length - 1;
    }

    /* Calculate the startIndex to start suspense time */
    if (indexWinner <= suspense) {
      indexInitSuspense = attendanceList.length - 1 - (suspense - indexWinner);
    } else {
      indexInitSuspense = indexWinner - suspense;
    }

    const startIndex = indexInitSuspense;
    this.setState({ startIndex });

    /* Calculate the endIndex to start suspense time */

    if (indexInitSuspense + sizeRoulette < attendanceList.length) {
      const endIndex = indexInitSuspense + sizeRoulette;
      this.setState({ endIndex });
    } else {
      const endIndex = indexInitSuspense + sizeRoulette - attendanceList.length;
      this.setState({ endIndex });
    }
  };

  render() {
    return (
      <div>
        <div className="raffle">
          <Search
            handleChangeName={this.handleChangeName}
            handleChangeEventId={this.handleChangeEventId}
            urlName={this.state.urlName}
            eventId={this.state.eventId}
            events={this.state.events}
            groups={this.state.groups}
          />

          <br />

          {this.state.statusMessage && <p>{this.state.statusMessage}</p>}
          {this.state.loading ? <Spinner /> : null}

          {this.state.roulette && this.state.roulette.length > 0 && (
            <div className="wrapper">
              <Roulette roulette={this.state.roulette} />
              <button
                type="button"
                className="btn  start"
                onClick={this.startRoulette}
              >
                START
              </button>
              {this.state.winner && (
                <div className="winner">
                  <h2>The winner is </h2>
                  <h2>{this.state.winner.member.name.toUpperCase()}</h2>
                </div>
              )}

              {/* <button className=".btn-secondary">SEE LIST</button>
              <AttendanceList attendanceList={this.state.attendanceList} /> */}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Raffle;
