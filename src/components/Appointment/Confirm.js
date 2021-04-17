import React from "react";
import "components/Button.scss";

export default function Confirm (props) {

    function confirm() {
        props.onConfirm(props.id)
    }

    return (
    <main className="appointment__card appointment__card--confirm">
        <h1 className="text--semi-bold">{props.message}</h1>
        <section className="appointment__actions">
            <button onClick={props.onCancel} danger>Cancel</button>
            <button onClick={confirm} danger>Confirm</button>
        </section>
    </main>
    );
};