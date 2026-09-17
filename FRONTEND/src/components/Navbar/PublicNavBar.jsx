
import {Fragment, useState} from "react";
import { Disclosure } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/20/solid";
import {NavLink, useNavigate} from "react-router-dom";

import {useDispatch,useSelector} from "react-redux";
import {SearchPostsAction} from "../../redux/slices/posts/postSlices.js";
export default function PublicNavbar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "inline-flex items-center border-b-2 border-indigo-500 px-1 pt-1 text-sm font-medium text-gray-900"
      : "inline-flex items-center border-b-2 border-transparent px-1 pt-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700";
  const[keyword,setKeyword ] = useState()
const {posts,loading,error} = useSelector((state)=>state?.posts);
  const dispatch = useDispatch();
  const handleChange=(e)=>{
    setKeyword(e.target.value);
  }
  const navigate = useNavigate();
  const handleSearch = (e) => {
  e.preventDefault();

  dispatch(SearchPostsAction(keyword));
 if(!loading){
  
   navigate("/search");
 }
 
 
}
  return (
    <Disclosure as="nav" className="bg-white shadow">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>

                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="block h-8 w-auto lg:hidden"
                    src="/logo.png"
                    alt="Blogspire"
                  />
                  <img
                    className="hidden h-8 w-auto lg:block"
                    src="/logo.png"
                    alt="Blogspire"
                  />
                </div>

                <div className="hidden md:ml-6 md:flex md:space-x-8">
                  <NavLink to="/" className={navLinkClass}>
                    Home
                  </NavLink>
                  <NavLink to="/posts" className={navLinkClass}>
                    Posts
                  </NavLink>
                  <NavLink to="/login" className={navLinkClass}>
                    Login
                  </NavLink>
                  <NavLink to="/register" className={navLinkClass}>
                    Register
                  </NavLink>
                </div>
              </div>
             < div className=" hidden md:flex  mt-2 items-center ">
               <div className="flex-shrink-0 rounded-md border shadow-2xl">
                 <form onSubmit={handleSearch}>
               <div className="flex">
                    <input
                    onChange={handleChange}
                    className="block w-full rounded-l-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    type="text"
                    placeholder="Search..."
                  />
                   <button className={"rounded-r-md border border-indigo-600 px-3 py-2 bg-indigo-600 text-white text-sm font-medium"} type="submit">Search</button>
               </div>
                 </form>
              </div>
             </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <NavLink
                    to="/add-post"
                    className="ml-2 relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    Add New Post
                  </NavLink>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pt-2 pb-3">
              <Disclosure.Button
                as={NavLink}
                to="/"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
              >
                Home
              </Disclosure.Button>
              <div className="px-4 pb-3 sm:px-6">
              <form onSubmit={handleSearch}>
                <div className="flex w-full">
                  <input
                    onChange={handleChange}
                    className="block w-full rounded-l-md border-0 py-2 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                    type="text"
                    placeholder="Search..."
                  />
                  <button
                    className="rounded-r-md border border-indigo-600 px-3 py-2 bg-indigo-600 text-white text-sm font-medium"
                    type="submit"
                  >
                    Search
                  </button>
                </div>
              </form>
            </div>
              <Disclosure.Button
                as={NavLink}
                to="/posts"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Posts
              </Disclosure.Button>
              <Disclosure.Button
                as={NavLink}
                to="/login"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Login
              </Disclosure.Button>
              <Disclosure.Button
                as={NavLink}
                to="/register"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Register
              </Disclosure.Button>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
