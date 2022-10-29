import React from "react";

const TriggerButton = ({ triggerText, showModal, buttonRef }) => {
    return (
        <button
            className="btn btn-lg btn-danger center modal-button"
            ref={buttonRef}
            onClick={showModal}
        >
            {triggerText}
        </button>
    )
}

export default TriggerButton;