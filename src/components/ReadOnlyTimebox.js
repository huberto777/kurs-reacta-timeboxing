import React from "react";

function ReadOnlyTimebox({ title, totalTimeInMinutes }) {
    return (
        <div className="Timebox">
            <h3>{title} - {totalTimeInMinutes} min.</h3>
        </div>
    )
}

export default ReadOnlyTimebox;