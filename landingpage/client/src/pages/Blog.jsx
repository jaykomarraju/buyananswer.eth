// Our Voice
// Company Blog

import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { db } from "../services/Firebase";

import background from "../assets/background11.jpg";
import background2 from "../assets/background12.jpg";
import background3 from "../assets/background15.jpg";
import LandingFooter from "../components/LandingFooter";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   height: 100vh;
  width: 100vw;

  @media (max-width: 768px) {
    flex-direction: column;
    width: 100vw;
    // height: 100vh;
    // overflow: scroll;

    // background-attachment: fixed;
  }
`;

const BlogPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // width: 100%;
  width: 100vw;
  min-height: 100vh;
  background-image: url(${background});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  padding: 50px;

  @media (max-width: 768px) {
    width: 100vw;
    min-height: 100vh;
    background-attachment: fixed;
    overflow: scroll;
  }
`;

const TopWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(${background2});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  padding: 50px;
  //   margin-top: 20px;
  // margin-bottom: 100px;
  padding-top: 100px;
  // background: rgba(255, 255, 255, 0.9);

  @media (max-width: 768px) {
    width: 100vw;
    height: 30vh;
    margin: 0px;
    background-attachment: scroll;
  }
`;

const Title = styled.h1`
  font-size: 60px;
  width: 70%;
  font-weight: 700;
  color: #159a1f;
  // line-height: 0.1;
  margin-bottom: 0px;

  @media (max-width: 768px) {
    font-size: 40px;
    // width: 80%;
    // margin-top: 85px;
    // margin-left: 10%;
  }
`;

const SubTitle = styled.h2`
  font-size: 30px;
  margin-top: 5px;
  width: 70%;
  font-weight: 400;
  color: #000;
  // line-height: 0.1;

  @media (max-width: 768px) {
    font-size: 20px;
    // width: 80%;
    // margin-top: 85px;
    // margin-left: 10%;
  }
`;

const BottomWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: auto;

  @media (max-width: 768px) {
    width: 95%;
    margin: auto;
  }
`;

const BlogPost = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  margin-top: 20px;
  margin-bottom: 150px;
  border: 1.5px solid #fff;
  border-radius: 10px;
  padding: 50px;

  @media (max-width: 768px) {
    width: 60%;
    margin: 20px auto 40px auto;
  }
`;

const BlogTitle = styled.h1`
  font-size: 40px;
  width: 100%;
  font-weight: 700;
  color: #fff;
  margin-bottom: 0px;
  // line-height: 0.1;

  @media (max-width: 768px) {
    font-size: 30px;
    // width: 80%;
    // margin-top: 85px;
    // margin-left: 10%;
  }
`;

const BlogSubTitle = styled.h2`
  font-size: 20px;
  width: 100%;
  margin-top: 15px;
  color: #159a1f;
  // line-height: 0.1;

  @media (max-width: 768px) {
    font-size: 20px;
    // width: 80%;
    // margin-top: 85px;
    // margin-left: 10%;
  }
`;

const BlogText = styled.p`
  font-size: 20px;

  color: #fff;
  // line-height: 0.1;

  @media (max-width: 768px) {
    font-size: 20px;
    // width: 80%;
    margin-top: 30px;
    // margin-left: 10%;
  }
`;

const BlogDate = styled.p`
  font-size: 20px;
  width: 100%;
  margin-top: 15px;
  color: #fff;
  // line-height: 0.1;

  @media (max-width: 768px) {
    font-size: 20px;
    // width: 80%;
    // margin-top: 85px;
    // margin-left: 10%;
  }
`;

const BlogMenu = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
  list-style: none;
  // padding:20px;
  border: 1.5px solid #fff;
  border-radius: 10px;
  padding: 50px;
  margin-top: 40px;
  margin-bottom: 40px;

  @media (max-width: 768px) {
    width: 60%;
    margin: 60px auto 20px auto;
  }
`;

const BlogMenuItem = styled.li`
  font-size: 1em;
  width: 100%;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 15px;
  color: #fff;
  align-items: center;
  cursor: pointer;
  // line-height: 0.1;

  @media (max-width: 768px) {
    font-size: 20px;
  }

  &:hover {
    // color: #000;
    font-weight: 600;
  }
`;

const BlogWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100vw;
  margin-top: 0px;
  background-image: url(${background3});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
`;

const BlogMenuTitle = styled.div`
  text-transform: uppercase;
  flex: 5;
  padding-right: 15px;
`;

const BlogMenuDate = styled.div`
  flex: 1;
  font-size: 15px;
`;

const Blog = () => {
  const [blogs, setBlogs] = useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      const data = await db.collection("blog").get();
      setBlogs(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  // convert timestamp to date and display date in Mon DD, YYYY format
  const convertDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const scrollToTarget = (target) => {
    const targetE = document.getElementById(target);
    targetE.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Container>
      <TopWrapper>
        <Title>Our Voice</Title>
        <SubTitle>Company Blog</SubTitle>
      </TopWrapper>
      <BottomWrapper>
        <BlogWrapper>
          <BlogMenu>
            {blogs
              .slice(0)
              .reverse()
              .map((blog) => (
                <BlogMenuItem
                  onClick={(e) => {
                    scrollToTarget(blog.id);
                  }}
                >
                  {/* Each blog post will be a link to blogpost element on this page with the id of the blog post */}

                  <BlogMenuTitle>{blog.title}</BlogMenuTitle>
                  {/* <BlogMenuDate>
                    // {convertDate(blog.timestamp.seconds)}
                  </BlogMenuDate> */}
                </BlogMenuItem>
              ))}
          </BlogMenu>
        </BlogWrapper>
        {/* <BlogPost>
          <BlogTitle>Blog Post 1</BlogTitle>
          <BlogSubTitle>Subtitle</BlogSubTitle>
          <BlogText>
            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sed
            euismod nunc non nunc aliquet, nec aliquet nisl aliquet. Sed euismod
            nunc non nunc aliquet, nec aliquet nisl aliquet. Sed euismod nunc
            non nunc aliquet, nec aliquet nisl aliquet. Sed euismod nunc non
            nunc aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec
          </BlogText>
        </BlogPost>
        <BlogPost>
          <BlogTitle>Blog Post 2</BlogTitle>
          <BlogSubTitle>Subtitle 2</BlogSubTitle>
          <BlogText>
            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Sed
            euismod nunc non nunc aliquet, nec aliquet nisl aliquet. Sed euismod
            nunc non nunc aliquet, nec aliquet nisl aliquet. Sed euismod nunc
            non nunc aliquet, nec aliquet nisl aliquet. Sed euismod nunc non
            nunc aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec aliquet nisl aliquet. Sed euismod nunc non nunc
            aliquet, nec
          </BlogText>
        </BlogPost> */}
        <BlogPostWrapper>
          {blogs
            .slice(0)
            .reverse()
            .map((blog) => (
              <BlogPost id={blog.id} key={blog.id}>
                <BlogTitle>{blog.title}</BlogTitle>
                <BlogSubTitle>{blog.subheading}</BlogSubTitle>
                <BlogDate>{convertDate(blog.timestamp.seconds)}</BlogDate>
                <BlogText>
                  {/* {blog.body} */}
                  {/* split the body text into paragraphs at \n */}

                  {blog.body
                    .replace(/\\n/g, "\n")
                    .split("\n")
                    .map((paragraph) => (
                      <p>
                        {paragraph}
                        <br />
                      </p>
                    ))}
                </BlogText>
              </BlogPost>
            ))}
        </BlogPostWrapper>
      </BottomWrapper>

    <LandingFooter/>
    </Container>
  );
};

export default Blog;
