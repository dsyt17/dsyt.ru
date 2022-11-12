import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/slices/posts";
import { Post } from "../../components/Post";
import styles from "./Posts.module.scss";
import { useEffect, useState } from "react";
import useDocumentTitle from "../../hooks/setDocumentTitle";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.posts);
  const userData = useSelector((state) => state.auth.data);
  const isPostLoading = posts.status === "loading";
  const [myPosts, setMyPosts] = useState(false);

  useEffect(() => {
    dispatch(fetchPosts());
    // eslint-disable-next-line
  }, []);

  useDocumentTitle("Posts");

  const myposts = () =>
    myPosts === true ? setMyPosts(false) : setMyPosts(true);

  // НЕОБХОДИМО ИЗБАВИТЬСЯ ОТ ЭТОГО КРИНЖА ВНИЗУ!!!
  return (
    <div className={styles.root}>
      <div className={`${styles.buttons} ${!userData && styles.hide}`}>
        <Link className={styles.button} onClick={myposts}>
          {myPosts === true ? "All Posts" : "My Posts"}
        </Link>
        <Link className={styles.button} to={`/newpost`}>
          New Post
        </Link>
      </div>
      {!myPosts
        ? (isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                _id={obj._id}
                title={obj.title}
                imageUrl={obj.imageUrl}
                user={obj.user}
                createdAt={new Date(obj.createdAt).toLocaleDateString()}
                viewsCount={obj.viewsCount}
                commentsCount={3}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )
        : posts.items.map(
            (obj, index) =>
              obj.user._id === userData._id && (
                <Post
                  key={index}
                  _id={obj._id}
                  title={obj.title}
                  imageUrl={obj.imageUrl}
                  user={obj.user}
                  createdAt={new Date(obj.createdAt).toLocaleDateString()}
                  viewsCount={obj.viewsCount}
                  commentsCount={3}
                  tags={obj.tags}
                  isEditable={userData?._id === obj.user._id}
                />
              )
          )}
    </div>
  );
};

export default Posts;
