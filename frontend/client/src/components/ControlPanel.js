import React from 'react'
import AddPostContainer from 'features/posts/AddPostContainer'

const ControlPanel = () => {
    const triggerText = 'ADD POST'
    const onSubmit = (event) => {
        event.preventDefaul(event)


    }

    return (
      <AddPostContainer
          triggerText={triggerText}
          onSubmit={onSubmit}
      />
    )
}

export default ControlPanel