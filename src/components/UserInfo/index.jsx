import React from "react";
import styles from "./UserInfo.module.scss";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Link } from "react-router-dom";

export const UserInfo = ({
  avatarUrl,
  nickname,
  additionalText,
  login,
  verifed,
}) => {
  // пока так...

  return (
    <div className={styles.root}>
      <img
        className={styles.avatar}
        src={avatarUrl || "/noavatar.png"}
        alt={nickname}
      />
      <div className={styles.userDetails}>
        <span className={styles.userName}>
          <Link className={styles.link} to={`/users/${nickname}`}>
            {nickname}
          </Link>
          {verifed && <VerifiedIcon color="primary" />}
        </span>
        <span className={styles.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
