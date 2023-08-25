import mongoose from 'mongoose';

// Schema define the structure of the document
const Schema = mongoose.Schema;
const blogSchema = new Schema(
  {
    title: { type: String, required: true },
    snippet: { type: String, required: true },
    body: { type: String, required: true },
  },
  { timestamps: true },
);

// Model surrounds schema and provide an interface to communicate with db document type
const Blog = mongoose.model('Blog', blogSchema);

export default Blog;
