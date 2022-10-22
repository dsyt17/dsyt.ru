import React from "react";
import ReactMarcdown from "react-markdown";
import styles from "./FullPost.module.scss";

import { Post } from "../../components/Post";
import { useParams } from "react-router-dom";
import axios from "../../axios";
import { getDateAndTime } from "../../utils/dateTime";

const FullPost = () => {
  // тут храним пост
  const [post, setPost] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);

  // вытаскиваем id из параметра
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setPost(res.data);
        setIsLoading(false);
      })
      .catch((e) => console.log(e));
    // eslint-disable-next-line
  }, []);

  if (isLoading) {
    return <Post isLoading={true} isFullPost />;
  }

  return (
    <div className={styles.root}>
      <Post
        _id={post._id}
        title={post.title}
        imageUrl={post.imageUrl}
        user={post.user}
        createdAt={getDateAndTime(post.createdAt)}
        viewsCount={post.viewsCount}
        tags={post.tags}
        isFullPost
      >
        <ReactMarcdown children={post.text} />
      </Post>
    </div>
  );
};

export default FullPost;
