import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingSpinner from "../Components/LoadingSpinner";


function BlogDetail() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/blogs/${id}`)
      .then(response => {
        setBlog(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching blog details');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <LoadingSpinner/>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-md rounded-lg p-6">
        <img src={blog.thumbnail} alt={blog.title} className="w-full h-64 object-cover mb-4 rounded-lg" />
        <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
        <div className="prose">
          {blog.content}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail