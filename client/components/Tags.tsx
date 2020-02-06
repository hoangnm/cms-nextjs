import React from "react";
import ReactTags from "react-tag-autocomplete";

const Tags = ({ tags, suggestions, onDelete, onAddition }) => {
  return (
    <div>
      <ReactTags
        tags={tags}
        suggestions={suggestions}
        onDelete={onDelete}
        onAddition={onAddition}
        allowNew
        placeholderText=""
      />
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

export default Tags;