import React, { useState, useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import Select from "react-select";
import LoadingComponent from "../Alert/LoadingComponent";
import ErrorMsg from "../Alert/ErrorMsg";
import SuccessMsg from "../Alert/SuccessMsg";
import {fetchCategoriesAction, createCategoryAction} from "../../redux/slices/categories/categorySlices.js";
import { addPostAction } from "../../redux/slices/posts/postSlices.js";
import { resetErrorAction } from "../../redux/slices/globalSlice/globalSlice.js";
const AddPost = () => {
  //fetch categories
  const dispatch = useDispatch();
 
  //! Error state
  const [errors,setErrors] = useState({});
  
  //! Category search state
  const [categorySearch, setCategorySearch] = useState("");
  const [showAddCategoryBtn, setShowAddCategoryBtn] = useState(false);

  //get data from store
  const {categories, error: categoryError, loading: categoryLoading} = useSelector((state)=> state?.categories);
   console.log("fetched categories", categories);
   
   useEffect(()=> {
    dispatch(fetchCategoriesAction());
   },[dispatch])
  

  //?Dummy values
  const options =  categories?.allCategories?.map((category)=> {
        return {
          value: category?._id,
          label: category?.name,
        }
      })
   
  console.log("options:", options);
  //!Get post from Store
  const {error, loading, success} = useSelector((state)=> state?.posts);


  const [formData, setFormData] = useState({
    title: "",
    image: null,
    category: null,
    content: "",
  });

  //1. Validate form
  const validateForm = (data) => {
    let errors = {};
    if(!data.title) errors.title = "Title is required";
    if(!data.image) errors.image = "Image is required";
    if(!data.category) errors.category = "Category is required";
    if(!data.content) errors.content = "Content is required";
    return errors;
  };

  //2. HandleBlur
  const handleBlur = (e) => {
    const {name} = e.target;
    const formErrors = validateForm(formData);
    setErrors({...errors,[name]: formErrors[name]

    });

  }

  const handleFileChange = (e) => {
    
    setFormData({...formData, image: e.target.files[0]});
  };

  const handleSelectChange = (selectedOption) => {
    console.log("handleSelectChange called with:", selectedOption);
    setFormData({...formData,category: selectedOption.value});
    setCategorySearch("");
    setShowAddCategoryBtn(false);
  };

  const handleCategorySearchChange = (inputValue, actionMeta) => {
    if (actionMeta?.action && actionMeta.action !== "input-change") {
      return inputValue;
    }

    console.log("handleCategorySearchChange called with:", inputValue);
    setCategorySearch(inputValue);
    // Clear any previous errors when user starts searching again
    if(categoryError) {
      dispatch(resetErrorAction());
    }
    // Check if search term matches any existing category
    const matchFound = categories?.allCategories?.some(
      (cat) => cat?.name?.toLowerCase() === inputValue?.toLowerCase()
    );
    console.log("matchFound:", matchFound, "inputValue.trim():", inputValue.trim());
    // Show button only if search term is not empty and no match found
    const shouldShow = inputValue.trim() !== "" && !matchFound;
    console.log("shouldShow button:", shouldShow);
    setShowAddCategoryBtn(shouldShow);
  };

  const handleAddNewCategory = async () => {
    console.log("handleAddNewCategory called");
    console.log("categorySearch input:", categorySearch);
    
    if(categorySearch.trim()) {
      console.log("Creating new category:", categorySearch);
      const result = await dispatch(createCategoryAction(categorySearch.trim()));
      console.log("Create result:", result);
      console.log("Result payload:", result.payload);
      
      if(result.payload?.category) {
        console.log("Category created, refetching...");
        setFormData((prev) => ({
          ...prev,
          category: result.payload.category._id,
        }));
        await dispatch(fetchCategoriesAction());
        setCategorySearch("");
        setShowAddCategoryBtn(false);
        dispatch(resetErrorAction());
      }
    } else {
      console.log("Category search is empty");
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    console.log(formData);
    e.preventDefault();
    const errors = validateForm(formData);
    setErrors(errors);
    if(Object.keys(errors).length === 0) {
      dispatch(addPostAction(formData));
      e.preventDefault();
      
      setFormData({
        title: "",
        image: null,
        category: null,
        content: "",
      });
    }
  }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full lg:w-1/2">
        <div className="flex flex-col items-center p-10 xl:px-24 xl:pb-12 bg-white lg:max-w-xl lg:ml-auto rounded-4xl shadow-2xl">
          <h2 className="mb-4 text-2xl md:text-3xl text-coolGray-900 font-bold text-center">
            Add New Post
          </h2>
          {error && <ErrorMsg message={error?.message} />}
          {success && <SuccessMsg message="Post Created Successfully!"/>}
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
              onBlur={handleBlur}
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
              onBlur={handleBlur}
            />
            {/* error here */}
            { errors?.image && <p className="text-red-500">{errors.image}</p>}

          </label>
          {/* category here */}
          <div className="mb-4 flex flex-col w-full">
                        <label><span className="mb-1 text-coolGray-800 font-medium">Category</span></label>
                        <div className="relative">
                            <Select
                                options={options}
                                name="category"
                                onChange={handleSelectChange}
                                onInputChange={handleCategorySearchChange}
                                inputValue={categorySearch}
                                onBlur={handleBlur}
                                noOptionsMessage={({ inputValue }) => {
                                    const value = (inputValue || "").trim();
                                    const matchFound = options?.some(
                                      (opt) => opt?.label?.toLowerCase() === value?.toLowerCase()
                                    );

                                    if (!value || matchFound) {
                                      return "No categories found";
                                    }

                                    return (
                                      <div className="p-2">
                                        <p className="mb-2 text-sm text-gray-500">
                                          No category found for "{value}".
                                        </p>
                                        <button
                                          type="button"
                                          onMouseDown={(e) => e.preventDefault()}
                                          onClick={handleAddNewCategory}
                                          disabled={categoryLoading}
                                          className="w-full rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white hover:bg-blue-600"
                                        >
                                          {categoryLoading ? "Creating..." : `+ Add "${value}" as new category`}
                                        </button>
                                      </div>
                                    );
                                }}
                            />
                        </div>
                        {showAddCategoryBtn && categoryError && <ErrorMsg message={categoryError?.message} />}
                        {/* error here */}
                        {errors?.category && (
                            <p className="text-red-500 mt-1">{errors.category}</p>
                        )}
                    </div>

          
          <label className="mb-4 flex flex-col w-full">
            <span className="mb-1 text-coolGray-800 font-medium">Content</span>
           
            <textarea
              className="py-3 px-3 leading-5 w-full text-coolGray-400 font-normal border border-coolGray-200 outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 rounded-lg shadow-sm"
              placeholder="Write your post content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              onBlur = {handleBlur}
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

export default AddPost;