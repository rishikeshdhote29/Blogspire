import { FiUpload } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
// import UserPosts from "./UserPosts";
import {userPublicProfileAction, viewProfileAction} from "../../redux/slices/users/usersSlices";

export default function PublicUserProfile() {
  // Get the id from params
  const { userId } = useParams();  // Get data from store
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userPublicProfileAction(userId));
  }, [userId, dispatch]);
  
  useEffect(()=>{
    dispatch(viewProfileAction(userId))
  },[dispatch])
console.log(userId);
  const profile = useSelector((state) => state?.users?.publicUser);
console.log(profile);

  return (
    <>
      <div className="flex h-full">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          <div className="relative z-0 flex flex-1 overflow-hidden">
            <main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
              <article>
                {/* Profile header */}
                <div>
                  <div className="relative h-32 lg:h-48">
                    <img
                      className="h-full w-full object-cover"
                      src={"https://images.unsplash.com/photo-1444628838545-ac4016a5418a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"}
                      alt="cover"
                    />
                    <button
                      className="absolute top-0 right-0 m-4 p-2 rounded-full bg-white hover:bg-gray-200"
                      aria-label="Upload cover image"
                    >
                      <FiUpload className="w-5 h-5 text-gray-800" />
                    </button>
                  </div>

                  {/* Adjusted negative margin */}
                  <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 -mt-6 sm:-mt-10">
                    <div className="sm:flex sm:items-end sm:space-x-5">
                      <div className="relative flex">
                        <img
                          className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                          src={"https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"}
                          alt="profile"
                        />
                        <button
                          className="absolute bottom-0 right-0 mb-4 mr-4 p-2 rounded-full bg-white hover:bg-gray-200"
                          aria-label="Upload profile image"
                        >
                          <FiUpload className="w-5 h-5 text-gray-800" />
                        </button>
                      </div>

                      {/* Adjusted spacing */}
                      <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
                        <div className="min-w-0 flex-1">
                          {/* Added top margin to username */}
                          <h1 className="truncate text-2xl font-bold text-gray-900 mt-3 mb-2">
                            {profile?.user?.username}
                          </h1>
                          <div className="mt-2">
                            <div className="text-sm font-medium text-gray-500">Email</div>
                            <div className="text-sm text-gray-900">
                              {profile?.user?.email}
                            </div>
                          </div>
                        </div>

                        {/* Buttons container */}
                        <div className="justify-stretch mt-4 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                          {/* Profile Views */}
                             <div
                         
                          className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <svg
                            className="-ml-0.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                            />
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                               {profile?.user?.profileViewers.length}
                        </div>
                            {/* ... button content ... */}
                          
                          
                          {/* Unblock/Block button */}
                          <button
                          type="button"
                          className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <svg
                            className="-ml-0.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M13.5 10.5V6.75a4.5 4.5 0 119 0v3.75M3.75 21.75h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H3.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                          Unblock
                        </button>
                            {/* ... button content ... */}
                            <button
                          type="button"
                          className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <svg
                            className="-ml-0.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                          Block
                        </button>

                          {/* Follow/Unfollow button */}
                         <button
                          type="button"
                          className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <svg
                            className="-ml-0.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                          Follow
                        </button>
                            {/* ... button content ... */}
                            <button
                          type="button"
                          className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                          <svg
                            className="-ml-0.5 h-5 w-5 text-gray-400"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-6 h-6"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
                            />
                          </svg>
                          UnFollow
                        </button>
                        </div>
                      </div>
                     
                    </div>
                  </div>
                </div>
              </article>
            </main>
          </div>
        </div>
      </div>
       {/* <UserPosts posts={profile?.user?.posts}/> */}
    </>
  );
}