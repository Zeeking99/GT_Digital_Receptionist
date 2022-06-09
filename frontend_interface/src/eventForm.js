import React, { useState } from "react";
import { Input } from "@chatui/core";

function eventForm()
{
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

    return (
        <div>
        <h3>Event Name</h3>
        <Input value={value1} onChange={val => setValue1(val)} placeholder="Name..." />

        {console.log("I am here")}
        <h3>Description</h3>
        <Input rows={3} value={value2} onChange={val => setValue2(val)} placeholder="Description..." />

        <h3>Date</h3>
        <Input autoSize value={value3} onChange={val => setValue3(val)} placeholder="Date..." />

        <h3>Duration</h3>
        <Input maxLength={20} value={value4} onChange={val => setValue4(val)} placeholder="Duration..." />
        </div>
    )
}