import React from "react";
import { connect } from "react-redux";
import { getAllTimeboxes, getRemainingTimeboxes } from "../reducers";

export function TimeboxesList({ timeboxes, renderTimebox }) {
    return <div className="TimeboxesList">{timeboxes.map(renderTimebox)}</div>;
}

export const AllTimeboxesList = connect(
    (state) => ({ timeboxes: getAllTimeboxes(state)})
)(TimeboxesList);


export const RemainingTimeboxesList = connect(
    (state) => ({ timeboxes: getRemainingTimeboxes(state)})
)(TimeboxesList);