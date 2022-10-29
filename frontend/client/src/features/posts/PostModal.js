import React from "react";
import ReactDOM from "react-dom";
import AddPostForm from "./AddPostForm";
import FocusTrap from 'focus-trap-react'
import { GrClose } from 'react-icons/gr'

const PostModal = ({
    onClickOutside,
    onKeyDown,
    modalRef,
    buttonRef,
    closeModal,
    onSubmit
}) => {
    return ReactDOM.createPortal(
        <FocusTrap>
            <aside
                tag="aside"
                role="dialog"
                tabIndex="-1"
                aria-modal="true"
                className="modal-cover"
                onClick={onClickOutside}
                onKeyDown={onKeyDown}
            >
                <div className="modal-area" ref={modalRef}>
                    <button
                        ref={buttonRef}
                        aria-label="Close Modal"
                        aria-labelledby="close-modal"
                        className="_modal-close"
                        onClick={closeModal}
                    >
                        <GrClose />
                    </button>
                    <div className="modal-body">
                        <AddPostForm onSubmit={onSubmit}/>
                    </div>
                </div>
            </aside>
        </FocusTrap>,
        document.body
    )
}

export default PostModal