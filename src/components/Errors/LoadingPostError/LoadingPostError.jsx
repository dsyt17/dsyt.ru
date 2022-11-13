import React from "react";
import styles from "./LoadingPostError.module.scss";

const LoadingPostError = () => {
  return (
    <div className={styles.root}>
      <img
        className={styles.dino}
        src="/users_assets/loadError.png"
        alt="dino"
      />
      <h1>Sorry, we can't upload posts(</h1>
      <p>Maybe it will work out later...</p>
    </div>
  );
};

export default LoadingPostError;
