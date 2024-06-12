import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../Authentication/hooks/useAxiosSecure";
import JoditEditor from 'jodit-react';
import { TbFidgetSpinner } from "react-icons/tb";
import useAxiosPublic from "../Authentication/hooks/useAxiosPublic";


const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
// const image_hosting_key = d9517916345f9c439c21191c892aec3e;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;


function AddBlog() {
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure()
    const axiosPublic = useAxiosPublic()
    const [title, setTitle] = useState('');
    const [thumbnail, setThumbnail] = useState(null);
    const [content, setContent] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true)
      let thumbnailUrl = '';
  
      if (thumbnail) {
        const formData = new FormData();
        formData.append('image', thumbnail);
        const response = await axiosPublic.post(image_hosting_api, formData);
        thumbnailUrl = response.data.data.display_url;
      }
  
      const newBlog = {
        title,
        thumbnail: thumbnailUrl,
        content,
        status: 'draft',
      };
      axiosSecure.post('/blogs', newBlog)
      .then(() => {
        setLoading(false)
        navigate('/dashboard/content-management')
      })
      .catch(error => console.error('Error creating blog:', error));
  };
  return (
    <div className="container mx-auto p-4 pt-14">
    <h1 className="text-2xl font-bold mb-4">Add New Blog</h1>
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6">
      <div className="mb-4">
        <label className="block text-gray-700">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Thumbnail Image</label>
        <input
          type="file"
          onChange={(e) => setThumbnail(e.target.files[0])}
          className="w-full px-4 py-2 border rounded"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Content</label>
        <JoditEditor
          value={content}
          onChange={newContent => setContent(newContent)}
        />
      </div>
      <button type="submit" className="bg-[#c4052b] text-white px-4 py-2 rounded">
      {loading ? (
                <TbFidgetSpinner className='animate-spin m-auto' />
              ) : (
                'Create'
              )}
      </button>
    </form>
  </div>
  )
}

export default AddBlog