import { useSelector } from "react-redux";
import { selectUserById } from "./usersSlice";
import { Link, useParams } from "react-router-dom";
import { selectPostsByUserId } from "../posts/postsSlice";

const UserPage = () => {
    const { userId } = useParams();
    const user = useSelector(state => selectUserById(state, Number(userId)));

    const postsForUser = useSelector(state => selectPostsByUserId(state, Number(userId)));

    const postTitles = postsForUser.map(post => (
        <li key={post.id}>
            <Link to={`/post/${post.id}`}>{post.title}</Link>
        </li>
    ))

    return (
        <section>
            <h2>{user?.name}</h2>
            <ul>{postTitles}</ul>
        </section>
    )
}

export default UserPage;