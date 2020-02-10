import React from "react";
import "../styles.css";
import { Formik, Field, Form } from "formik";
import BasicFormSchema from "./BasicFormSchema";
import store from "../store/ActivityStore";

const AddActivity = () => {
  const getMinutes = (startTime, endTime) => {
    let startDate = new Date("2020-01-01 " + startTime);
    let endDate = new Date("2020-01-01 " + endTime);

    return Number(
      (endDate.getHours() - startDate.getHours()) * 60 +
        endDate.getMinutes() -
        startDate.getMinutes()
    );
  };

  return (
    <div className="container">
      <Formik
        initialValues={{
          start: "",
          end: "",
          distance: "",
          type: ""
        }}
        validationSchema={BasicFormSchema}
        onSubmit={values => {
          store.add(
            new Date().toJSON().slice(0, 10),
            values.type,
            Number(values.distance),
            getMinutes(values.start, values.end),
            Math.round(
              (values.distance / (getMinutes(values.start, values.end) / 60)) *
                100
            ) / 100
          );
        }}
        render={({ errors, touched }) => (
          <Form className="form-container">
            <div>Add new activity : </div>

            <Field
              name="start"
              placeholder="Start time"
              type="text"
              className="input"
            />
            {errors.start && touched.start && (
              <div className="field-error">{errors.start}</div>
            )}

            <Field
              name="end"
              placeholder="End time"
              type="text"
              className="input"
            />
            {errors.end && touched.end && (
              <div className="field-error">{errors.end}</div>
            )}

            <Field
              name="distance"
              placeholder="Distance"
              type="text"
              className="input"
            />
            {errors.distance && touched.distance && (
              <div className="field-error">{errors.distance}</div>
            )}

            <Field name="type" as="select" className="select">
              <option value="">Select actyvity type</option>
              <option value="Run">Run</option>
              <option value="Ride">Ride</option>
            </Field>

            {errors.type && touched.type && (
              <div className="field-error">{errors.type}</div>
            )}

            <button type="submit" className="button">
              Save
            </button>
          </Form>
        )}
      />
    </div>
  );
};

export default AddActivity;
