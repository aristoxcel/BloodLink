import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../Authentication/hooks/useAxiosSecure";
import LoadingSpinner from "../../Components/LoadingSpinner";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import useRole from "../../Authentication/hooks/useRole";


function ContentManagement() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure()
  const [role] = useRole()
  // const [loading, setLoading]= useState(false)

  const {data, refetch, isLoading}=useQuery({
    queryKey:['publish'],
    queryFn: async()=>{
      const res = await axiosSecure.get('/blogs')
      
      return setBlogs(res.data)
    }
  })


  const handlePublish = async(id) => {
    // API call to publish blog
    try {
      const res = await axiosSecure.put(`/blogs/${id}`, { status: 'publish' });

      if (res.data.modifiedCount > 0) refetch();
    } catch (error) {
      console.error('Error publishing blog:', error);
    }
  };

  const handleUnpublish =async (id) => {
    // API call to unpublish blog
    try {
      const res = await axiosSecure.put(`/blogs/${id}`, { status: 'draft' });

      if (res.data.modifiedCount > 0) refetch();
    } catch (error) {
      console.error('Error unpublishing blog:', error);
    }
  };

  const handleDelete = (id) => {
    // API call to delete blog
    axiosSecure.delete(`/blogs/${id}`)
    .then(res => {
      if (res.data.deletedCount > 0) {
          refetch();
          Swal.fire({
              title: "Deleted!",
              text: "Your Blog is deleted.",
              icon: "success"
          });
      }
  })
  };

  const filteredBlogs = blogs.filter(blog => filter === 'all' || blog.status === filter);
if(isLoading) return <LoadingSpinner/>

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
          <option value="publish">Published</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.map(blog => (
          <div key={blog._id} className="bg-white p-4 rounded shadow">
            <img src={blog.thumbnail} alt="" className="h-72"/>
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content.slice(0,500) }}></div>
            {
              role === "admin" && 
              <>
              <div className="mt-4 flex justify-between items-center">
              {blog.status === 'draft' ? (
                <button className="bg-green-500 text-white px-4 py-2 rounded" onClick={() => handlePublish(blog._id)}>Publish</button>
              ) : (
                <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={() => handleUnpublish(blog._id)}>Unpublish</button>
              )}
              <button className="bg-[#c4052b] text-white px-4 py-2 rounded" onClick={() => handleDelete(blog._id)}>Delete</button>
            </div>
              </>
            }
          </div>
        ))}
      </div>
    </div>
  )
}

export default ContentManagement