import React from "react";
import * as type from "../types/Comment";

export interface CommentProps {
    comment: type.Comment
}

const PostComment: React.FC<CommentProps> = ({comment}: CommentProps) => {
    return (
        <div>
            <p>{comment.content}</p>
        </div>
    )
}

export default PostComment;
