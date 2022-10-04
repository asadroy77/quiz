import React, { useState } from "react";
import { Addquiz } from "../Addquiz/Addquiz";
import { Form } from "react-bootstrap";
import Subject from "./subject";

const MultiForm = () => {
  
  const [type ,setType] = useState({});

  const [step, setStep] = useState(1);

  const nextStep = () => {
    if (step < 2) {
      setStep(step + 1);
    } else if (step === 2) {
      console.log("done");
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  
  return (
    <div className="bg-dark vh-100">
      <div className="container d-flex justify-content-center align-items-center">
        <div className="card p-3 w-50 mt-5">
          {
            {
              1:<Subject  type={type} setType={setType} />,
              2: <Addquiz type={type} setType={setType}/>
            }[step]
          }
          <div className="d-flex justify-content-around px-5 mt-5">
            {step > 1 ? (
              <button className="btn btn-warning" onClick={prevStep}>
                Back
              </button>
            ) : null}
            <button className="btn btn-warning" onClick={nextStep}>
              {step === 2 ? "End" : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiForm;