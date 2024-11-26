import React from "react";
import { useNavigate } from "react-router-dom";
import { POST_ROUTE } from "../../utils/consts";
import styles from "./PostItem.module.css";
import H1Medium from "../UI/H1Medium";
import H2Medium from "../UI/H2regular";
import { formatText } from "../../hooks/formatText";
import { formatDate } from "../../hooks/formatDate";
import { formatDbImg } from "../../hooks/formatDbImg";

const PostItem = ({ post, postDelete }) => {
  const navigate = useNavigate();
  let num = 150;
  if (postDelete) {
    num = 30;
  }

  return (
    <div
      className={`${!postDelete ? styles.main : styles.mainModal}`}
      onClick={() => navigate(POST_ROUTE + "/" + post.id)}
    >
      <H2Medium
        align={"left"}
        size={"16px"}
        text={`${formatDate(post.createdAt)}`}
      />
      {post.tittle != "undefined" && (
        <H1Medium
          align={"left"}
          text={`${formatText(post.tittle, num)}`}
          size={"24px"}
          color={"#2D2D2D"}
        />
      )}

      {post.discription != "undefined" && (
        <H2Medium
          align={"left"}
          size={"16px"}
          text={`${formatText(post.discription, num)}`}
        />
      )}

      {formatDbImg(post.img)[0] && (
        <img
          className={styles.image}
          src={process.env.REACT_APP_API_URL + formatDbImg(post.img)[0]}
        />
      )}
    </div>
  );
};

export default PostItem;
