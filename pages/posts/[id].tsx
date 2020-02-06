import React from "react";
import Header from "../../client/components/Header";
import { getPost } from "../../client/apis/cms";

const PostTitle = ({ title }) => {
  return <h1 className="mt-4">{title}</h1>;
};

const PostAuthor = ({ author }) => {
  return (
    <p className="lead">
      by <a href="#">{author}</a>
    </p>
  );
};

const PostTime = ({ time }) => {
  return <p>Posted on {new Date(time).toLocaleDateString()}</p>;
};

const PostContent = ({ content }) => {
  return <p className="lead">{content}</p>;
};

const Slugs = ({ slugs = [] }) => {
  return (
    <p className="lead">
      slugs <a href="#">{slugs.map(slug => slug.title).join(",")}</a>
    </p>
  );
};

const Post = ({ post }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <PostTitle title={post.title} />
            <PostAuthor author={post.author} />
            <Slugs slugs={post.slugs} />
            <PostTime time={post.date} />
            <PostContent content={post.body} />
          </div>
        </div>
      </div>
    </div>
  );
};

Post.getInitialProps = async context => {
  const { id } = context.query;
  const post = await getPost(id);

  return { post };
};

export default Post;
