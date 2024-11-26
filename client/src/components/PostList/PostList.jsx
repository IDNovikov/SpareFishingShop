import React, { useContext } from "react";
import { Context } from "../..";
import PostItem from "../PostItem/PostItem";
import { observer } from "mobx-react-lite";
import GreyButton from "../UI/greyButton/GreyButton";
import styles from "./List.module.css";

const PostList = observer((props) => {
  const { blog } = useContext(Context);

  return (
    <div className={`${props.postDelete && styles.main}`}>
      {blog.posts.map((post) => (
        <div className={`${props.postDelete && styles.item}`}>
          <PostItem key={post.id} post={post} postDelete={props.postDelete} />
          {props.postDelete && (
            <div onClick={() => props.postDelete(post.id)}>
              <GreyButton
                height={"42px"}
                width={"110px"}
                text={"Delete"}
                fontSize={"14px"}
                fontColor={"Black"}
                bckColor={"#ec3a3a"}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
});

export default PostList;
