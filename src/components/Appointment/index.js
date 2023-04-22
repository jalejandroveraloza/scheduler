import React from "react";
import classNames from "classnames"

import "components/Appointment/styles.scss"

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import useVisualMode from "../../hooks/useVisualMode";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

export default function Appointment(props){

  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const CONFIRM = "CONFIRM";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);

    //in Application.js, we used return axios which will return a promise, so we need to use .then() here,  .then uses an anonymous callback function
    props.bookInterview(props.id,interview).then(()=>{

      transition(SHOW);
    }
    );
  }


  function remove(){

    props.cancelInterview(props.id)
    .then(() => transition(EMPTY))

  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
      <Show
      interview={props.interview}
      onDelete={()=>transition(CONFIRM)}
      />
      )}
      {mode === CREATE && (
        <Form
        interviewer={props.interviewer}
        interviewers={props.interviewers}
        onCancel={() => back(EMPTY)}
        bookInterview={props.bookInterview} 
        onSave={save}/>
     )}
     {mode === SAVING && (
       <Status />
      )}
      {mode === CONFIRM && (
        <Confirm
        onConfirm={remove}
        onCancel={back}
        message="Are you sure you would like to delete?"
        />

      )}
    </article>
  )
}