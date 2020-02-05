import { Formik, Field } from "formik";
import fetch from "isomorphic-unfetch";
import Header from "../components/Header";

const CreatePost = () => {
  return (
    <div>
      <Header />
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card my-4">
              <h5 className="card-header">Create a Post:</h5>
              <div className="card-body">
                <Formik
                  initialValues={{ title: "", author: "", body: "" }}
                  onSubmit={async (values, { setSubmitting }) => {
                    await fetch("http://localhost:3000/api/posts", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(values)
                    }).then(r => {
                      console.log("done");
                      setSubmitting(false);
                      return r.json();
                    });
                  }}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting
                    /* and other goodies */
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <Field
                          type="text"
                          className="form-control"
                          id="title"
                          name="title"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="author">Author</label>
                        <Field
                          type="text"
                          name="author"
                          className="form-control"
                          id="author"
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="body">Body</label>
                        <Field
                          as="textarea"
                          id="body"
                          className="form-control"
                          name="body"
                          rows="5"
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
