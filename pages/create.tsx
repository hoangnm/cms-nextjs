import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Formik, Field, useField } from "formik";
import fetch from "isomorphic-unfetch";
import ReactTags from "react-tag-autocomplete";
import Header from "../components/Header";

const TagsField = ({ name }) => {
  const [suggestions, setSuggestions] = useState([]);
  const fetchSlugs = async () => {
    const res = await fetch("http://localhost:3000/api/slugs");
    const result = await res.json();
    const slugs = result.map(item => ({ id: item._id, name: item.title }));
    setSuggestions(slugs);
  };
  const createTag = async title => {
    const result = await fetch("http://localhost:3000/api/slugs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ title })
    });
    return result.json();
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
      const createdTag = await createTag(tag.name);
      const tag = { id: createdTag.id, name: createdTag.title };
      setSuggestions([...suggestions, tag]);
      const tags = [...value, tag];
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
      <ReactTags
        tags={value}
        suggestions={suggestions}
        onDelete={handleDelete}
        onAddition={handleAddition}
        allowNew
        placeholderText=""
      />
      {meta.touched && meta.error && <div className="error">{meta.error}</div>}
      <style jsx global>
        {`
          .react-tags {
            position: relative;
            padding: 6px 0 0 6px;
            border: 1px solid #d1d1d1;
            border-radius: 1px;

            font-size: 1em;
            line-height: 1.2;

            cursor: text;
          }
          .react-tags.is-focused {
            border-color: #b1b1b1;
          }
          .react-tags__selected {
            display: inline;
          }

          .react-tags__selected-tag {
            display: inline-block;
            box-sizing: border-box;
            margin: 0 6px 6px 0;
            padding: 6px 8px;
            border: 1px solid #d1d1d1;
            border-radius: 2px;
            background: #f1f1f1;

            /* match the font styles */
            font-size: inherit;
            line-height: inherit;
          }
          .react-tags__selected-tag:after {
            content: "x";
            color: #aaa;
            margin-left: 8px;
          }

          .react-tags__selected-tag:hover,
          .react-tags__selected-tag:focus {
            border-color: #b1b1b1;
          }
          .react-tags__search {
            display: inline-block;

            /* match tag layout */
            padding: 7px 2px;
            margin-bottom: 6px;

            /* prevent autoresize overflowing the container */
            max-width: 100%;
          }
          .react-tags__search input {
            /* prevent autoresize overflowing the container */
            max-width: 100%;

            /* remove styles and layout from this element */
            margin: 0;
            padding: 0;
            border: 0;
            outline: none;

            /* match the font styles */
            font-size: inherit;
            line-height: inherit;
          }

          .react-tags__search input::-ms-clear {
            display: none;
          }

          .react-tags__suggestions {
            position: absolute;
            top: 100%;
            left: 0;
            width: 100%;
          }
          .react-tags__suggestions ul {
            margin: 4px -1px;
            padding: 0;
            list-style: none;
            background: white;
            border: 1px solid #d1d1d1;
            border-radius: 2px;
            box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
          }

          .react-tags__suggestions li {
            border-bottom: 1px solid #ddd;
            padding: 6px 8px;
          }

          .react-tags__suggestions li mark {
            text-decoration: underline;
            background: none;
            font-weight: 600;
          }

          .react-tags__suggestions li:hover {
            cursor: pointer;
            background: #eee;
          }

          .react-tags__suggestions li.is-active {
            background: #b7cfe0;
          }

          .react-tags__suggestions li.is-disabled {
            opacity: 0.5;
            cursor: auto;
          }
        `}
      </style>
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
                    const body = {
                      ...values,
                      slugs: values.slugs.map(slug => slug.id)
                    };
                    await fetch("http://localhost:3000/api/posts", {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json"
                      },
                      body: JSON.stringify(body)
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
