import fetch from "isomorphic-unfetch";
import Header from "../../components/Header";

function PostTitle({ title }) {
  return <h1 className="mt-4">{title}</h1>;
}

function PostAuthor({ author }) {
  return (
    <p className="lead">
      by <a href="#">{author}</a>
    </p>
  );
}

function PostTime({ time }) {
  return <p>Posted on {new Date(time).toLocaleDateString()}</p>;
}

function PostContent({ content }) {
  return <p className="lead">{content}</p>;
}

const Post = ({ post }) => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <PostTitle title={post.title} />
            <PostAuthor author={post.author} />
            <PostTime time={post.date} />
            <PostContent content={post.body} />
          </div>
        </div>
      </div>
    </div>
  );
};

Post.getInitialProps = async function(context) {
  const { id } = context.query;
  const res = await fetch(`http://localhost:3000/api/posts/${id}`);
  const post = await res.json();

  return { post };
};

export default Post;
