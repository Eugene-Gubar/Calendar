import React, { Component } from "react";
import "./DayForm.css";

import moment from "moment";

import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import PropTypes from "prop-types";

const validate = values => {
  const errors = {};
  const dateBegin = moment(values.dateBegin);
  const dateEnd = moment(values.dateEnd);
  const timeBegin = moment(values.timeBegin, "HH:mm");
  const timeEnd = moment(values.timeEnd, "HH:mm");

  if (!values.title) errors.title = "Required";
  else if (values.title.length > 50)
    errors.title = "Must be 50 characters or less";

  if (values.description && values.description.length > 200)
    errors.description = "Must be 200 characters or less";

  if (!values.dateBegin) errors.dateBegin = "Required";
  if (!values.dateEnd) errors.dateEnd = "Required";
  if (dateEnd.isBefore(dateBegin))
    errors.dateEnd = "Value must not be less than begin date";

  if (timeEnd.isBefore(timeBegin))
    errors.timeEnd = "Value must not be less than begin time";

  return errors;
};

const inputText = ({
  input,
  label,
  type,
  required,
  meta: { touched, error, active }
}) => {
  const req = required ? <span className="event-window__required">*</span> : "";

  return (
    <label className="event-window__text-label">
      {label}
      {req}
      <input
        className="event-window__text"
        {...input}
        placeholder={label}
        type={type}
      />
      {!active &&
        touched &&
        (error && <span className="message message_error">{error}</span>)}
    </label>
  );
};

const textarea = ({
  input,
  label,
  required,
  meta: { touched, error, active }
}) => (
  <label className="event-window__text-label">
    {label}
    <textarea className="event-window__text" {...input} placeholder={label} />
    {!active &&
      touched &&
      (error && <span className="message message_error">{error}</span>)}
  </label>
);

const inputDate = ({
  input,
  label,
  type,
  required,
  meta: { touched, error, active }
}) => {
  if (typeof input.value === "object")
    input.value = moment(input.value).format("YYYY-MM-D");
  const req = required ? <span className="event-window__required">*</span> : "";

  return (
    <div className="event-window__date">
      <div className="event-window__date-container">
        <label className="event-window__date-label">
          {label}
          {req}
        </label>
        <input className="event-window__date-input" {...input} type={type} />
      </div>
      {!active &&
        touched &&
        (error && <span className="message message_error">{error}</span>)}
    </div>
  );
};

const inputTime = ({
  input,
  label,
  type,
  disabled,
  required,
  meta: { touched, error, active }
}) => {
  if (typeof input.value === "object")
    input.value = input.value.format("HH:mm");
  const req = required ? <span className="event-window__required">*</span> : "";

  return (
    <div className="event-window__time">
      <div className="event-window__time-container">
        <label className="event-window__time-label">
          {label}
          {req}
        </label>
        <input
          className="event-window__time-input"
          {...input}
          type={type}
          disabled={disabled}
        />
      </div>
      {!active &&
        touched &&
        (error && <span className="message message_error">{error}</span>)}
    </div>
  );
};

class DayForm extends Component {
  static propTypes = {};

  deleteEvent = () => {
    const { removeEvent, initialValues } = this.props;
    removeEvent(initialValues._id);
  };

  render() {
    return (
      <div className="add-event">
        <form action="" />
      </div>
    );

    const {
      handleSubmit,
      eventWindowHide,
      eventDay,
      addGroup,
      addEvent,
      updateEvent,
      groups,
      initialValues
    } = this.props;
    const { dateBegin, dateEnd, timeBegin, timeEnd } = eventDay.data;
    const id = initialValues._id;
    const submit = id ? updateEvent : addEvent;

    const deleteBtn = (
      <button
        className="event-window__button"
        type="button"
        onClick={this.deleteEvent}
      >
        Delete
      </button>
    );

    return (
      <div
        className={"event-window " + (eventDay.showed ? "opened" : "")}
        id="event-window"
      >
        <div className="event-window__popup">
          <div className="event-window__head">
            <h2 className="event-window__title">
              {id ? "Update" : "Add"} event
            </h2>
            <span className="event-window__close" onClick={eventWindowHide}>
              x
            </span>
          </div>
          <form
            className="event-window__form"
            onSubmit={handleSubmit(submit.bind(this))}
          >
            <Field
              component={inputText}
              type="text"
              name="title"
              label="Event title"
              required={true}
            />
            <Field
              component={textarea}
              name="description"
              label="Event description"
              required={false}
            />
            <h3 className="event-window__subtitle">Dates</h3>
            <div className="event-window__dates">
              <Field
                component={inputDate}
                type="date"
                name="dateBegin"
                label="Begin:"
                value={dateBegin}
                required={true}
                novalidate
              />
              <Field
                component={inputDate}
                type="date"
                name="dateEnd"
                label="End:"
                value={dateEnd}
                required={true}
                novalidate
              />
            </div>
            <h3 className="event-window__subtitle">Time</h3>
            <div className="event-window__period">
              <Field
                component={inputTime}
                type="time"
                name="timeBegin"
                label="Begin:"
                novalidate
              />
              <Field
                component={inputTime}
                type="time"
                name="timeEnd"
                label="End:"
                novalidate
              />
            </div>
            <div className="event-window__control">
              <button className="event-window__button" type="submit">
                submit
              </button>
              {id ? deleteBtn : ""}
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default connect(state => {
  return {
    initialValues: { ...state.eventDay.data }
  };
}, null)(
  reduxForm({
    form: "event",
    enableReinitialize: true,
    keepDirtyOnReinitialize: true,
    validate
  })(DayForm)
);
