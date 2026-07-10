import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: [true, 'Please provide a title for this post.'],
  },
  date: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  isPrivate: {
    type: Boolean,
    default: false,
  }
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
