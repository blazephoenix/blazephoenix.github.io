import React from "react"
import { Link } from "gatsby"

export default (props) => (
    <div>
        <Link to="/">Home</Link>
        <h1>{props.headerText}</h1>
    </div>
)