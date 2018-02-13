import React, { Component } from "react";

import PropTypes from "prop-types";

import { connect } from "react-redux";

// decorators
import calendarInfo from "../../hoc/calendarInfo";
import events from "../../hoc/events";

import HourEvent from "./hourevent.js";

import "./index.css";

class Day extends Component {
  static propTypes = {
    events: PropTypes.array,
    space: PropTypes.object,
    getHours: PropTypes.func,
    filterDate: PropTypes.func,
    filterTime: PropTypes.func,
    setEventsSizes: PropTypes.func,
    setEventsPositions: PropTypes.func
  };

  modifiedTimeEvents(events) {
    const { setEventsSizes, filterTime } = this.props;
    const timeEvents = filterTime(events);
    return setEventsSizes(timeEvents);
  }

  getAllDayEvents(events) {
    const { groups, filterAllDay } = this.props;
    return filterAllDay(events).map(event => {
      const group = groups.find(group => group._id === event.group);
      return { ...event, group };
    });
  }

  render() {
    const {
      space,
      filterDate,
      events,
      getHours,
      setEventsPositions,
      selectedEvent
    } = this.props;

    const filteredEvents = filterDate({ date: space, events });
    const modifiedEvents = this.modifiedTimeEvents(filteredEvents);
    const hours = getHours(modifiedEvents);

    return (
      <div className="body__day day" id="day">
        <div className="day__scroll-container">
          <div className="day__scrollbar">
            <ul className="day__list" data-dnd>
              {hours.map(hour => {
                const events = setEventsPositions(hour.events);
                const nextHour = hour.time.clone().add(1, "hours");
                const hover =
                  selectedEvent &&
                  selectedEvent.timeBegin.isBefore(nextHour) &&
                  selectedEvent.timeEnd.isAfter(hour.time);
                const hourClasses =
                  "day__hour day-hour " + (hover ? "day-hour_hover" : "");

                return (
                  <li
                    className={hourClasses}
                    key={hour.time.format("HHmm")}
                    data-key={hour.time.format("HHmm")}
                  >
                    <div className="day-hour__time">
                      {hour.time.format("h:00 A")}
                    </div>
                    <div
                      className="day-hour__body"
                      data-dd="true"
                      data-time={hour.time.format("HH:mm")}
                    >
                      {events.map((event, ndx) => (
                        <HourEvent
                          {...event}
                          key={ndx}
                          selected={
                            selectedEvent && selectedEvent._id === event._id
                          }
                        />
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    events: state.events,
    space: state.space.main,
    selectedEvent: state.selected
  }),
  null
)(calendarInfo(events(Day)));
