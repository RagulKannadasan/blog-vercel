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
    required: true,
  },
  content: {
    type: String,
    required: true,
  }
});

export default mongoose.models.Post || mongoose.model('Post', PostSchema);
