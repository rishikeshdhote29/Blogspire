import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import {fetchCategoriesAction} from "../../redux/slices/categories/categorySlices.js";
import { updatePostAction } from "../../redux/slices/posts/postSlices"; 
const UpdatePost = () => {
  //fetch categories
  const {postId} = useParams();
  const dispatch = useDispatch();

  //! Get the post id from params


const nav = useNavigate();

 
  //! Error state
  const [errors,setErrors] = useState({});

  //get data from store
  const {categories} = useSelector((state)=> state?.categories);
   console.log("fetched categories", categories);
   useEffect(()=> {
    dispatch(fetchCategoriesAction());
   },[dispatch])
  



  const options =   categories?.allCategories?.map((category)=> {
        return {
          value: category?._id,
          label: category?.name,
        }
      }) 
  

  //!Get post from Store
  const {post, error, loading, success} = useSelector((state)=> state?.posts);

  useEffect(()=> {
    dispatch(fetchCategoriesAction());
  }, [dispatch]);

  // Redirect on successful post update
  useEffect(()=> {
    if(success) {
      nav("/posts");
    }
     
  },[success,nav]);
   
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  

  const handleFileChange = (e) => {
    console.log("target", e.target.files[0]);
    setFormData({...formData, image: e.target.files[0]});
  };

  const handleSelectChange = (selectedOption) => {
    setFormData({...formData,category: selectedOption.value});
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    dispatch(updatePostAction({...formData,postId}));
    
      
    setFormData({
      title: "",
      image: null,
      category: null,
      content: "",
    });
  };

    


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Update Post
          </h2>
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Post Updated  Successfully!"/>}
          <h3 className="mb-7 text-base md:text-lg text-coolGray-500 font-medium text-center">
            Share your thoughts and ideas with the community
          </h3>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Title</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="text"
              placeholder="Enter the post title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              // onBlur={handleBlur}
            />
            {/* error here */}
            {errors?.title && <p className="text-red-500">{errors.title}</p>}
          </label>
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Image</span>
            <input
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              type="file"
              name="image"
              onChange={handleFileChange}
              // onBlur={handleBlur}
            />
            {/* error here */}
            { errors?.image && <p className="text-red-500">{errors.image}</p>}

          </label>
          {/* category here */}
          <label className="mb-4 flex flex-col w-full">
                        <span className="mb-1 text-coolGray-800 font-medium">Category</span>
                        <Select
                            options={options}
                            name="category"
                            onChange={handleSelectChange}
                            // onBlur={handleBlur}
                        />
                        {/* error here */}
                        {errors?.category && (
                            <p className="text-red-500 ">{errors.category}</p>
                        )}
                    </label>

          
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
           
            <textarea
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              // onBlur = {handleBlur}
            />
             {errors?.content && <p className="text-red-500">{errors.content}</p>}
          </label>
          {/* button */}
          { loading ? (
            <LoadingComponent/>
          ): (
            <button
            className="mb-4 inline-block py-3 px-7 w-full leading-6 text-green-50 font-medium text-center bg-green-500 hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-md"
            type="submit"
          >
            Post
          </button>
          )}
         
        </div>
      </form>
    </div>
  );
};

export default UpdatePost;