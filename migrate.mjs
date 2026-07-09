import fs from 'fs';
import mongoose from 'mongoose';
import path from 'path';

const PostSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true }
});

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema);

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { bufferCommands: false });
    console.log('Connected to MongoDB');

    const data = fs.readFileSync(path.join(process.cwd(), '..', 'posts.json'), 'utf8');
    const posts = JSON.parse(data);

    for (const post of posts) {
      await Post.findOneAndUpdate({ id: post.id }, post, { upsert: true });
      console.log(`Migrated: ${post.title}`);
    }

    console.log('Migration complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
