import React from "react";
import Link from "next/link";
import useSWR from "swr";
import Header from "../client/components/Header";
import { getPosts } from "../client/apis/cms";

const DateText = ({ date }) => {
  return <span>{new Date(date).toLocaleDateString()}</span>;
};

function Post({ post }) {
  return (
    <div className="card">
      <div className="card-body">
        <h2 className="card-title">{post.title}</h2>
        <p className="card-text">{post.body}</p>
        <Link href={`/posts/${post._id}`}>
          <a className="btn btn-primary">Read More &rarr;</a>
        </Link>
      </div>
      <div className="card-footer text-muted">
        Posted on <DateText date={post.date} /> by <a href="#">{post.author}</a>
      </div>
    </div>
  );
}

const Posts = ({ posts }) => {
  return posts.map(item => (
    <div className="mb-4" key={item._id}>
      <Post post={item} />
    </div>
  ));
};

export default function Index() {
  const { data = [] } = useSWR("fetch-post", getPosts);

  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <h1 className="my-4">Posts</h1>
            <Posts posts={data} />
          </div>
        </div>
      </div>
    </div>
  );
}
