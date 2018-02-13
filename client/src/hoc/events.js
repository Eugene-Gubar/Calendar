import React from "react";

// import { DAYS_IN_WEEK, DAY, TODAY } from "../constants/calendar.js";

const events = Component => {
  return class EventsComponent extends React.Component {
    filterYear = ({ events, space }) => {
      return events.filter(event => {
        return (
          event.dateBegin.year() === space.year() ||
          event.dateEnd.year() === space.year()
        );
      });
    };

    filterWeek = ({ events, weekBegin }) => {
      const weekEnd = weekBegin.clone().add(6, "days");
      return events.filter(event => {
        return (
          (event.dateBegin.isSameOrAfter(weekBegin) &&
            event.dateBegin.isSameOrBefore(weekEnd)) ||
          (event.dateEnd.isSameOrAfter(weekBegin) &&
            event.dateEnd.isSameOrBefore(weekEnd)) ||
          (event.dateBegin.isSameOrBefore(weekBegin) &&
            event.dateEnd.isSameOrAfter(weekEnd))
        );
      });
    };

    filterDay = ({ events, date }) => {
      return events.filter(
        event =>
          !event.allDay && event.duration === 0 && event.dateBegin.isSame(date)
      );
    };

    filterDate = ({ events, date }) => {
      return events.filter(
        event =>
          event.dateBegin.isSame(date) ||
          (event.dateBegin.isSameOrBefore(date) &&
            event.dateEnd.isSameOrAfter(date))
      );
    };

    filterDays = events => {
      return events.filter(event => event.duration > 0 || event.allDay);
    };

    filterAllDay = events => {
      return events.filter(event => event.allDay);
    };

    filterTime = events => {
      return events.filter(event => event.timeBegin && event.timeEnd);
    };

    sortDateDuration = (a, b) => {
      return a.dateBegin - b.dateBegin || b.duration - a.duration;
    };

    sortTimeBeginEnd = (a, b) => {
      return a.timeBegin - b.timeBegin || b.timeEnd - a.timeEnd;
    };

    setEventsSizes = events => {
      const { sortTimeBeginEnd } = this;
      let groups = [];
      return events.sort(sortTimeBeginEnd).reduce((result, item, ndx, arr) => {
        const event = { ...item };
        if (ndx === 0) {
          groups.push(event.timeEnd);
          event.horizontal = 0;
          result.push(event);
          return result;
        }

        const find = groups.find((groupTime, groupNdx, groupArr) => {
          if (event.timeBegin.isSameOrAfter(groupTime)) {
            event.horizontal = groupNdx;
            if (groupNdx === 0) {
              const find = groupArr.find(val => {
                return event.timeBegin.isBefore(val);
              });
              if (!find) {
                result.push(event);
                result.map(resEvent => {
                  if (!resEvent.horizontalSize)
                    resEvent.horizontalSize = groupArr.length;
                  return resEvent;
                });
                groups = [event.timeEnd];
                return true;
              }
            }
            groupArr[groupNdx] = Math.max(groupArr[groupNdx], event.timeEnd);
            result.push(event);
            if (ndx === arr.length - 1) {
              result.map(resEvent => {
                if (!resEvent.horizontalSize)
                  resEvent.horizontalSize = groupArr.length;
                return resEvent;
              });
            }
            return true;
          }
          if (groupNdx === groupArr.length - 1) {
            event.horizontal = groupNdx + 1;
            groupArr.push(event.timeEnd);
            result.push(event);
            if (ndx === arr.length - 1) {
              result.map(resEvent => {
                if (!resEvent.horizontalSize)
                  resEvent.horizontalSize = groupArr.length;
                return resEvent;
              });
            }
            return true;
          }
        });

        return result;
      }, []);
    };

    setEventsPositions(events) {
      const minutes = 60;
      const seconds = 60;
      const milliseconds = 1000;
      const percentages = 100;

      return events.map(event => {
        const result = { ...event };
        result.timeDifference = event.timeEnd - event.timeBegin;
        result.height =
          result.timeDifference /
          milliseconds /
          seconds /
          minutes *
          percentages;
        result.top = event.timeBegin.minutes() / minutes * percentages;
        result.position = event.horizontal;
        result.horizontalSize = event.horizontalSize || 1;
        result.onePiece = percentages / result.horizontalSize;
        result.width =
          result.position !== result.horizontalSize - 1
            ? result.onePiece * 1.5
            : result.onePiece;
        result.left = result.onePiece * result.position;
        result.zIndex = result.position + 1;
        result.color = event.group && event.group.length && event.group.color;

        return result;
      });
    }

    render() {
      const {
        setEventsSizes,
        filterDays,
        filterDate,
        filterTime,
        sortTimeBeginEnd,
        setEventsPositions
      } = this;

      return (
        <Component
          {...this.props}
          filterTime={filterTime}
          filterDate={filterDate}
          sortTimeBeginEnd={sortTimeBeginEnd}
          setEventsSizes={setEventsSizes}
          setEventsPositions={setEventsPositions}
        />
      );
    }
  };
};

export default events;
