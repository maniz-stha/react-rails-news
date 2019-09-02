import React, { Component } from 'react';

import NewsForm from './NewsForm';

class EditNews extends Component {
    render() {
        return (
            <div className="edit-news row">
                <div className="col-md-8 m-auto">
                    <h2 className="text-center">Edit News</h2>
                    <NewsForm action="edit" />
                </div>
            </div>
        )
    }
}

export default EditNews;