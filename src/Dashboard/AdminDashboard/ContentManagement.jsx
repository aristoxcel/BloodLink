import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Authentication/hooks/useAxiosSecure";


function ContentManagement() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()


  useEffect(() => {
    axiosSecure.get('/blogs')
      .then(response => setBlogs(response.data))
      .catch(error => console.error('Error fetching blogs:', error));
  }, [axiosSecure]);

  const handlePublish = (id) => {
    // API call to publish blog
  };

  const handleUnpublish = (id) => {
    // API call to unpublish blog
  };

  const handleDelete = (id) => {
    // API call to delete blog
  };

  const filteredBlogs = blogs.filter(blog => filter === 'all' || blog.status === filter);


  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Content Management</h1>
        <button
          className="bg-[#c4052b] text-white px-4 py-2 rounded"
          onClick={() => navigate('/dashboard/add-blog')}
        >
          Add Blog
        </button>
      </div>

      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 rounded border"
        >
          <option value="all">All</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.map(blog => (
          <div key={blog._id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <p>{blog.content}</p>
            <div className="mt-4 flex justify-between items-center">
              {blog.status === 'draft' ? (
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handlePublish(blog._id)}>Publish</button>
              ) : (
                <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => handleUnpublish(blog._id)}>Unpublish</button>
              )}
              <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentManagement