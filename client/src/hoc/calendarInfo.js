import React from "react";
import moment from "moment";

const calendarInfo = Component => {
  return class CalendarInfoComponent extends React.Component {

    getHours(events) {
      const hours = [];
      const nextDay = moment(0, "HH").add(1, "days");

      let currentTime = moment(0, "HH");
      let nextTime = currentTime.clone().add(1, "hours");

      while (currentTime.isBefore(nextDay)) {
        const currentEvents = events.filter(
          event =>
            event.timeBegin.isSameOrAfter(currentTime) &&
            event.timeBegin.isBefore(nextTime)
        );

        hours.push({
          time: currentTime,
          events: currentEvents
        });

        currentTime = nextTime.clone();
        nextTime.add(1, "hours");
      }

      return hours;
    }

    render() {
      const { getHours } = this;

      return <Component {...this.props} getHours={getHours} />;
    }
  };
};

export default calendarInfo;
