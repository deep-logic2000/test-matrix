import React, { FC, useState, useEffect, useCallback } from "react";

import "./InputForm.css";

export interface FormElements extends HTMLFormControlsCollection {
  columnsQuantity: HTMLInputElement;
  rowsQuantity: HTMLInputElement;
  tooltipsQuantity: HTMLInputElement;
}

interface SignInFormElement extends HTMLFormElement {
  readonly elements: FormElements;
}

export interface IInputData {
  columnsQuantity: string;
  rowsQuantity: string;
  tooltipsQuantity: string;
}

export interface IInputForm {
  handleFormSubmit: (data: IInputData) => void;
}

export const InputForm: FC<IInputForm> = (props) => {
  const { handleFormSubmit } = props;
  const [values, setValues] = useState({
    columnsQuantity: "",
    rowsQuantity: "",
    tooltipsQuantity: "",
  });

  const [errors, setErrors] = useState({
    columnsQuantity: "",
    rowsQuantity: "",
    tooltipsQuantity: "",
  });

  const [touched, setTouched] = useState({
    columnsQuantity: false,
    rowsQuantity: false,
    tooltipsQuantity: false,
  });

  const isDirty =
    !!errors.columnsQuantity ||
    !!errors.rowsQuantity ||
    !!errors.tooltipsQuantity;

  const handleChange = (name: string, value: string) => {
    setValues((current) => ({ ...current, [name]: value }));
  };

  const validateName = useCallback((value: string, name: string) => {
    if (isNaN(Number(value)) || Number(value) <= 0 || Number(value) >= 101) {
      setErrors((current) => ({
        ...current,
        [name]: "Only numbers 0-100 are allowed",
      }));
    } else if (value.length > 3) {
      setErrors((current) => ({
        ...current,
        [name]: "Only numbers 0-100 are allowed",
      }));
    } else {
      setErrors((current) => ({ ...current, [name]: "" }));
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<SignInFormElement>) => {
    e.preventDefault();
    const dataInput = {
      columnsQuantity: values.columnsQuantity,
      rowsQuantity: values.rowsQuantity,
      tooltipsQuantity: values.tooltipsQuantity,
    };
    handleFormSubmit(dataInput);
  };

  const resetTable = () => {
    setTouched({
      columnsQuantity: false,
      rowsQuantity: false,
      tooltipsQuantity: false,
    });
    setValues({
      columnsQuantity: "",
      rowsQuantity: "",
      tooltipsQuantity: "",
    });
  };

  useEffect(() => {
    if (touched.columnsQuantity) {
      validateName(values.columnsQuantity, "columnsQuantity");
    }
    if (touched.rowsQuantity) {
      validateName(values.rowsQuantity, "rowsQuantity");
    }
    if (touched.tooltipsQuantity) {
      validateName(values.tooltipsQuantity, "tooltipsQuantity");
    }
  }, [
    values.columnsQuantity,
    touched.rowsQuantity,
    values.tooltipsQuantity,
    touched.tooltipsQuantity,
    validateName,
    touched.columnsQuantity,
    values.rowsQuantity,
  ]);

  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Enter values</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <div className="input-line">
              <label className="inputs-label" htmlFor="columnsQuantity">
                Enter number of columns
              </label>
              <input
                id="columnsQuantity"
                name="columnsQuantity"
                type="text"
                value={values.columnsQuantity}
                onChange={({ target }) => {
                  handleChange(target.name, target.value);
                  if (touched.columnsQuantity) {
                    validateName(target.value, "columnsQuantity");
                  }
                }}
                onBlur={({ target }) => {
                  if (!touched.columnsQuantity) {
                    setTouched((current) => ({
                      ...current,
                      columnsQuantity: true,
                    }));
                    validateName(target.value, "columnsQuantity");
                  }
                }}
                maxLength={3}
              />
            </div>
            <p className="error-text">
              {errors.columnsQuantity && errors.columnsQuantity}
            </p>
            <div className="input-line">
              <label className="inputs-label" htmlFor="rowsQuantity">
                Enter number of rows
              </label>
              <input
                id="rowsQuantity"
                name="rowsQuantity"
                type="text"
                value={values.rowsQuantity}
                onChange={({ target }) => {
                  handleChange(target.name, target.value);
                }}
                onBlur={({ target }) => {
                  if (!touched.rowsQuantity) {
                    setTouched((current) => ({
                      ...current,
                      rowsQuantity: true,
                    }));
                    validateName(target.value, "rowsQuantity");
                  }
                }}
                maxLength={3}
              />
            </div>
            <p className="error-text">
              {errors.rowsQuantity && errors.rowsQuantity}
            </p>
            <div className="input-line">
              <label className="inputs-label" htmlFor="tooltipsQuantity">
                Enter number of tooltips
              </label>
              <input
                id="tooltipsQuantity"
                name="tooltipsQuantity"
                type="text"
                value={values.tooltipsQuantity}
                onChange={({ target }) => {
                  handleChange(target.name, target.value);
                }}
                onBlur={({ target }) => {
                  if (!touched.tooltipsQuantity) {
                    setTouched((current) => ({
                      ...current,
                      tooltipsQuantity: true,
                    }));
                    validateName(target.value, "tooltipsQuantity");
                  }
                }}
                maxLength={2}
              />
            </div>
            <p className="error-text">
              {errors.tooltipsQuantity && errors.tooltipsQuantity}
            </p>
          </div>
          <div>
            <button
              type="submit"
              disabled={isDirty}
              className="button button-submit">
              Submit
            </button>
            <button
              type="submit"
              disabled={isDirty}
              className="button button-reset"
              onClick={resetTable}>
              Reset
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InputForm;
