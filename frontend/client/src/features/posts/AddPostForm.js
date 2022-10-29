import React from "react";

export const AddPostForm = ({ onSubmit }) => {
    return (
        <form onSubmit={onSubmit}>
            <div className="form-group">
                <label htmlFor="content">Image</label>
                <input type="file" className="form-control" id="content" name="content"/>
            </div>
            <div className="form-group">
                <label htmlFor="description">Description</label>
                <input type="text" className="form-control" id="description" name="description"/>
            </div>
            <div className="form-group">
                <button className="form-control btn btn-primary" type="submit">
                    Submit
                </button>
            </div>
        </form>
    )
}

export default AddPostForm