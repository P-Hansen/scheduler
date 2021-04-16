import React from "react";
import "components/Button.scss";

export default function Confirm (props) {
    return (
    <main className="appointment__card appointment__card--confirm">
        <h1 className="text--semi-bold">{props.message}</h1>
        <section className="appointment__actions">
            <button onClick={props.onCancel} danger>Cancel</button>
            <button onClick={props.onConfirm} danger>Confirm</button>
        </section>
    </main>
    );
};