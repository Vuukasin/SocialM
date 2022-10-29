import React from "react";
import PostModal from "./PostModal";
import { useEffect, useState, useRef } from "react";
import TriggerButton from "./TriggerButton";


export const AddPostContainer = ({ triggerText, onSubmit }) => {
    const [isShown, setIsShown] = useState(false)
    // const closeButton = useRef()
    // const TriggerButton = useRef()
    // const modal = useRef()
    const closeButtonRef = useRef()
    const triggerButtonRef = useRef()
    const modalRef = useRef()

    const showModal = () => {
        setIsShown(true)
    }

    const closeModal = () => {
        setIsShown(false)
    }

    useEffect(() => {
        if (isShown) {
            closeButtonRef.current.focus()
            toggleScrollLock()
        } else {
            triggerButtonRef.current.focus()
            toggleScrollLock()
        }
    }, [isShown])

    const onKeyDown = (event) => {
        if (event.keyCode === 27) {
            closeModal()
        }
    }

    const onClickOutside = (event) => {
        if (modalRef.current && modalRef.current.contains(event.target)) return;
        closeModal()
    }

    const toggleScrollLock = () => {
        document.querySelector('html').classList.toggle('scroll-lock')
    }

    return (
        <React.Fragment>
            <TriggerButton
                showModal={showModal}
                buttonRef={triggerButtonRef}
                triggerText={triggerText}
            />
            {isShown ? (
                <PostModal
                    onSubmit={onSubmit}
                    modalRef={modalRef}
                    buttonRef={closeButtonRef}
                    closeModal={closeModal}
                    onKeyDown={onKeyDown}
                    onClickOutside={onClickOutside}
                />
            ) : null}
        </React.Fragment>
    )
}


export default AddPostContainer

// export class AddPostContainer extends Component {
//     state = { isShown: false };
//     showModal = () => {
//       this.setState({ isShown: true }, () => {
//         this.closeButton.focus();
//       });
//       this.toggleScrollLock();
//     };
//     closeModal = () => {
//       this.setState({ isShown: false });
//       this.TriggerButton.focus();
//       this.toggleScrollLock();
//     };
//     onKeyDown = (event) => {
//       if (event.keyCode === 27) {
//         this.closeModal();
//       }
//     };
//     onClickOutside = (event) => {
//       if (this.modal && this.modal.contains(event.target)) return;
//       this.closeModal();
//     };
  
//     toggleScrollLock = () => {
//       document.querySelector('html').classList.toggle('scroll-lock');
//     };
//     render() {
//       return (
//         <React.Fragment>
//           <TriggerButton
//             showModal={this.showModal}
//             buttonRef={(n) => (this.TriggerButton = n)}
//             triggerText={this.props.triggerText}
//           />
//           {this.state.isShown ? (
//             <PostModal
//               onSubmit={this.props.onSubmit}
//               modalRef={(n) => (this.modal = n)}
//               buttonRef={(n) => (this.closeButton = n)}
//               closeModal={this.closeModal}
//               onKeyDown={this.onKeyDown}
//               onClickOutside={this.onClickOutside}
//             />
//           ) : null}
//         </React.Fragment>
//       );
//     }
//   }
  
//   export default AddPostContainer;