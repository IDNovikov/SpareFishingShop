import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOnePost } from "../../http/postsAPI";
import H2Medium from "../../components/UI/H2regular";
import { formatDate } from "../../hooks/formatDate";
import { formatText } from "../../hooks/formatText";
import H1Medium from "../../components/UI/H1Medium";
import styles from "./PostPage.module.css";
import ItemSlider from "../../components/UI/ItemSlider/ItemSlider";
import ArrowBack from "../../components/UI/ArrowBack";
import { useNavigate } from "react-router-dom";

const PostPage = () => {
  const [post, setPost] = useState({ info: [] });
  const [images, setImages] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchOnePost(id).then((data) => {
      setPost(data);
      let string = data.img;
      let str = string.replace(/[\"\[\]\\\\s]/g, "");
      let array = str.split(",");
      setImages(array);
    });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.slider}>
        {images[0] != "" ? (
          <>
            <ItemSlider images={images} />{" "}
            <div className={styles.arrow} style={{ position: "absolute" }}>
              <ArrowBack
                width={"30px"}
                height={"30px"}
                func={() => navigate(-1)}
              />
            </div>
          </>
        ) : (
          <div className={styles.arrow} style={{ position: "block" }}>
            <ArrowBack
              width={"30px"}
              height={"30px"}
              func={() => navigate(-1)}
            />
          </div>
        )}
      </div>
      <H2Medium
        align={"left"}
        size={"16px"}
        text={`${formatDate(post.createdAt)}`}
      />
      {post.tittle != "undefined" && (
        <H1Medium
          align={"left"}
          text={`${formatText(post.tittle)}`}
          size={"24px"}
          color={"#2D2D2D"}
        />
      )}
      {post.discription != "undefined" && (
        <H2Medium
          align={"left"}
          size={"16px"}
          text={`${formatText(post.discription)}`}
        />
      )}
    </div>
  );
};

export default PostPage;
