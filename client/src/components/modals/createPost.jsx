import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../..";
import { observer } from "mobx-react-lite";
import { createPost, fetchPosts, deletePost } from "../../http/postsAPI";
import PostList from "../PostList/PostList";
import GreyButton from "../UI/greyButton/GreyButton";
import styles from "./Modal.module.css";
import back from "../../assets/Back.svg";
import H1Medium from "../UI/H1Medium";
import Pages from "../Pagination/Pages";

const CreatePost = observer(() => {
  const { blog } = useContext(Context);
  const menuRef = useRef(null);

  const [isModalOpen, setModalOpen] = useState(false);
  const [tittle, setTitle] = useState();
  const [discription, setDiscription] = useState();
  const [file1, setFile1] = useState();
  const [file2, setFile2] = useState();
  const [file3, setFile3] = useState();
  const [file4, setFile4] = useState();
  const [file5, setFile5] = useState();
  const [del, setDel] = useState(true);
  const addPost = () => {
    const formData = new FormData();
    formData.append("img1", file1);
    formData.append("img2", file2);
    formData.append("img3", file3);
    formData.append("img4", file4);
    formData.append("img5", file5);
    formData.append("tittle", JSON.stringify(tittle));
    formData.append("discription", JSON.stringify(discription));
    createPost(formData).then((data) => setTitle(""), setDiscription(""));
  };

  const postDelete = (id) => {
    deletePost(id).then((data) => setDel(!del));
  };
  const selectFile1 = (e) => {
    setFile1(e.target.files[0]);
  };
  const selectFile2 = (e) => {
    setFile2(e.target.files[0]);
  };
  const selectFile3 = (e) => {
    setFile3(e.target.files[0]);
  };
  const selectFile4 = (e) => {
    setFile4(e.target.files[0]);
  };
  const selectFile5 = (e) => {
    setFile5(e.target.files[0]);
  };

  useEffect(() => {
    if (isModalOpen) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      setTimeout(() => {
        document.body.classList.add(styles.noScroll);
      }, 500);
    } else {
      document.body.classList.remove(styles.noScroll);
    }
    fetchPosts(blog.page, 5).then((data) => {
      blog.setPosts(data.rows);
      blog.setTotalCount(data.count);
    });
    return () => {
      document.body.classList.remove(styles.noScroll);
    };
  }, [blog.page, del, tittle, isModalOpen]);
  return (
    <>
      <div onClick={() => setModalOpen(!isModalOpen)}>
        <GreyButton
          width={"100%"}
          height={"42px"}
          text={"Manage posts"}
          fontSize={"20px"}
          fontColor={"White"}
          bckColor={"#0d6efd"}
        />
      </div>

      <div className={`${isModalOpen ? styles.mobileWindow : styles.none}`}>
        <div className={styles.bckgrnd}>
          <div className={styles.modalWrapper} ref={menuRef}>
            <div className={styles.modalHeader}>
              <button onClick={() => setModalOpen(!isModalOpen)}>
                <img className={styles.back} src={back} />
              </button>
              <div className={styles.modalTittle}>Delete and add posts</div>
            </div>
            <div className={styles.modal}>
              <PostList postDelete={postDelete} />

              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "120px",
                }}
              >
                <Pages place={"admin-blog"} />
              </div>
              <div>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <textarea
                    className={styles.textForm}
                    value={tittle}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Write new title"
                  />

                  <textarea
                    className={styles.textForm}
                    value={discription}
                    onChange={(e) => setDiscription(e.target.value)}
                    placeholder="Write new info"
                  />
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <H1Medium text={"Add image 1"} />
                    <input
                      className={styles.custi}
                      onChange={selectFile1}
                      placeholder="Add image 1"
                      type="file"
                    />
                    <H1Medium text={"Add image 2"} />
                    <input
                      className={styles.custi}
                      onChange={selectFile2}
                      placeholder="Add image 2"
                      type="file"
                    />
                    <H1Medium text={"Add image 3"} />
                    <input
                      className={styles.custi}
                      onChange={selectFile3}
                      placeholder="Add image 3"
                      type="file"
                    />
                    <H1Medium text={"Add image 4"} />
                    <input
                      className={styles.custi}
                      onChange={selectFile4}
                      placeholder="Add image 4"
                      type="file"
                    />
                    <H1Medium text={"Add image 5"} />
                    <input
                      className={styles.custi}
                      onChange={selectFile5}
                      placeholder="Add image 5"
                      type="file"
                    />
                  </div>
                </form>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-evenly",
                  margin: "50px 0",
                }}
              >
                <div onClick={() => setModalOpen(!isModalOpen)}>
                  <GreyButton
                    width={"200px"}
                    height={"42px"}
                    fontSize={"20px"}
                    text={"Close"}
                    bckColor={"#c6c6c6"}
                  />
                </div>
                <div onClick={addPost}>
                  <GreyButton
                    width={"200px"}
                    height={"42px"}
                    fontSize={"20px"}
                    text={"Add"}
                    bckColor={"#fff500"}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default CreatePost;
