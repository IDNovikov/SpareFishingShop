import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../..";
import { fetchPosts } from "../../http/postsAPI";
import Pages from "../../components/Pagination/Pages";
import PostList from "../../components/PostList/PostList";
import styles from "./Blog.module.css";
import H1Medium from "../../components/UI/H1Medium";

const Blog = observer(() => {
  const { blog } = useContext(Context);



  useEffect(() => {
    fetchPosts(blog.page, 5).then((data) => {
      blog.setPosts(data.rows);
      blog.setTotalCount(data.count);
    });
  }, [blog.page]);

  return (
    <div style={{ backgroundColor: "#F5F5F5" }}>
      <div style={{ marginLeft: "10%", paddingTop: "30px" }}>
        <H1Medium
          align={"left"}
          text={"Blog about spearfishing in Limassol"}
          size={"24px"}
        />
      </div>

      <div style={styles.conteiner}>
        <PostList />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "120px",
          }}
        >
          <Pages />
        </div>
      </div>
    </div>
  );
});

export default Blog;
