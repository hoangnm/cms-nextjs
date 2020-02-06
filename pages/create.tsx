import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Formik, Field, useField } from "formik";
import Header from "../components/Header";
import Tags from "../components/Tags";
import { createPost, createSlug, getSlugs } from "../apis/cms";

const TagsField = ({ name }) => {
  const [suggestions, setSuggestions] = useState([]);
  const fetchSlugs = async () => {
    const slugs = await getSlugs();
    setSuggestions(slugs);
  };
  const [field, meta, helpers] = useField(name);
  const { value } = meta;
  const { setValue } = helpers;
  const handleDelete = i => {
    const tags = value.slice(0);
    tags.splice(i, 1);
    setValue(tags);
  };
  const handleAddition = async tag => {
    if (!tag.id) {
      const createdTag = await createSlug(tag.name);
      setSuggestions([...suggestions, createdTag]);
      const tags = [...value, createdTag];
      setValue(tags);
    } else {
      const tags = [...value, tag];
      setValue(tags);
    }
  };

  useEffect(() => {
    fetchSlugs();
  }, []);

  return (
    <div>
      <Tags
        tags={value}
        suggestions={suggestions}
        onDelete={handleDelete}
        onAddition={handleAddition}
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
    </div>
  );
};

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
                  initialValues={{ title: "", author: "", body: "", slugs: [] }}
                  onSubmit={async (values, { setSubmitting }) => {
                    await createPost(values);
                    setSubmitting(false);
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
                      <div className="form-group">
                        <label>
                          Slugs (input at least two characters, press tab to
                          create a new slug)
                        </label>
                        <TagsField name="slugs" />
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
