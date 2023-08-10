import { useDispatch } from "react-redux";
import { reactionAdded } from "./postsSlice";

const reactionEmoji = {
    thumbsUp: '👍',
    wow: '😮',
    heart: '❤️',
    rocket: '🚀',
    coffee: '☕'
}

const ReactionButtons = ({ post }) => {
    const dispatch = useDispatch();

    const reactionButtons = Object.entries(reactionEmoji).map(([nama, emoji]) => {
        return (
            <button
                key={nama}
                type="button"
                className="reactionButton"
                onClick={()=>
                    dispatch(reactionAdded({ postId: post.id, reaction: nama }))
                }
            >
                {emoji} {post.reactions[nama]}
            </button>
        )
    })

    return <div>{reactionButtons}</div>
}

export default ReactionButtons