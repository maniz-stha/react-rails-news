import React, { Component } from 'react'

export default class CommentItem extends Component {
    render() {
        const { comment } = this.props;
        return (
            <div className="comment-item">
                <ul className="list-group">
                    <li className="list-group-item mb-2">{comment.comment}</li>
                </ul>
            </div>
        )
    }
}
