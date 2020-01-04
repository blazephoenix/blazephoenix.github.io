import React from "react"
import { Link } from "gatsby"
import Header from "../components/header"

export default () => (
<div style={{ color: `purple`}}>
    <Header headerText="Woops"/>
    <h1>404!</h1>
    <p>That didn't work out very well for you.</p>
</div>
)