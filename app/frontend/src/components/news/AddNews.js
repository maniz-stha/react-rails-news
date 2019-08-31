import React, { Component } from 'react';

import NewsForm from './NewsForm';

class AddNews extends Component {
    render() {
        return (
            <div className="register row">
                <div className="col-md-8 m-auto">
                    <h2 className="text-center">Add News</h2>
                    <NewsForm />
                </div>
            </div>
        )
    }
}

export default AddNews;