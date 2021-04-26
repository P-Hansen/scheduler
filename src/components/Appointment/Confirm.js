import React from "react";
import "components/Button.scss";
import Button from "components/Button"

export default function Confirm (props) {

    function confirm() {
        props.onConfirm(props.id)
    }

    return (
    <main className="appointment__card appointment__card--confirm">
        <h1 className="text--semi-bold">{props.message}</h1>
        <section className="appointment__actions">
            <Button onClick={props.onCancel} danger>Cancel</Button>
            <Button onClick={confirm} danger>Confirm</Button>
        </section>
    </main>
    );
};