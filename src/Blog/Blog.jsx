import { useState } from "react";
import { Link  } from "react-router-dom";
import useAxiosPublic from "../Authentication/hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../Components/LoadingSpinner";


function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all');
  const axiosPublic = useAxiosPublic()
  // const [loading, setLoading]= useState(false)

  const {data, refetch, isLoading}=useQuery({
    queryKey:['publish'],
    queryFn: async()=>{
      const res = await axiosPublic.get('/blogs')
      
      return setBlogs(res.data)
    }
  })

  // useEffect(() => {
  //   setLoading(true)
  //   axiosSecure.get('/blogs')
  //     .then(response => {
  //       setLoading(false)
  //       setBlogs(response.data)})
  //     .catch(error => console.error('Error fetching blogs:', error));
  // }, [axiosSecure]);

//   const handlePublish = async(id) => {
//     // API call to publish blog
//     try {
//       const res = await axiosSecure.put(`/blogs/${id}`, { status: 'publish' });
//       console.log(res.data);
//       if (res.data.modifiedCount > 0) refetch();
//     } catch (error) {
//       console.error('Error publishing blog:', error);
//     }
//   };

//   const handleUnpublish =async (id) => {
//     // API call to unpublish blog
//     try {
//       const res = await axiosSecure.put(`/blogs/${id}`, { status: 'draft' });
//       console.log(res.data);
//       if (res.data.modifiedCount > 0) refetch();
//     } catch (error) {
//       console.error('Error unpublishing blog:', error);
//     }
//   };



  const filteredBlogs = blogs.filter(blog => blog.status === 'publish');
if(isLoading) return <LoadingSpinner/>

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-center items-center my-5 md:my-7 lg:my-10">
        <h1 className="text-3xl md:text-5xl font-bold ">Blogs</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBlogs.map(blog => (
          <div key={blog._id} className="bg-white p-4 rounded shadow">
            <img src={blog.thumbnail} alt="" className="h-72"/>
            <h2 className="text-xl font-bold">{blog.title}</h2>
            <div className="prose" dangerouslySetInnerHTML={{ __html: blog.content.slice(0,350) }}></div>
            <div className="mt-4 flex justify-between items-center">
              <Link to={`/blogDetail/${blog._id}`}><button className="bg-[#c4052b] text-white px-4 py-2 rounded" >Read More..</button></Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Blog