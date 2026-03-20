import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {Link} from "react-router-dom";
import {userProfileAction} from "../../redux/slices/users/usersSlices.js";
const ProfileViewer = () => {
  const profileViewers = useSelector(
    (state) => state?.users?.profile?.user?.profileViewers
  ) || [];
const dispatch=useDispatch();
  useEffect(() => {
  
    dispatch(userProfileAction());
  }, [dispatch]);
  
  console.log("Followers:", profileViewers);
  if (profileViewers.length === 0) {
    return <p className={"flex flex-col items-center justify-center"} >No followers</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
        <h1 className={"mt-5"}>Your  Profile Viewers</h1>
      
      <ul className="mt-5 flex flex-col gap-0.5 min-w-60">
        {profileViewers.map((follower, index) => (
          <li
            key={index}
            className="flex border items-center cursor-pointer py-1.5 px-2.5 rounded-md align-middle transition-all duration-300 ease-in aria-disabled:opacity-50 aria-disabled:pointer-events-none bg-transparent text-slate-600 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 focus:bg-slate-200 focus:text-slate-800 dark:focus:text-white data-[selected=true]:bg-slate-200 data-[selected=true]:text-black dark:data-[selected=true]:text-white dark:bg-opacity-70"
          >
            <span className="grid place-items-center shrink-0 me-2.5"on >
              <img
                src={follower.profilePicture || "https://via.placeholder.com/50"}
                alt={follower.name || "profile-picture"}
                className="inline-block object-cover object-center w-11 h-11 rounded-full"
              />
            </span>
            
            
            <div>
                <Link to={`/users/public-profile/${follower._id}`}    > <p className="font-sans antialiased text-base text-blue-600 dark:text-sky-400 font-semibold">
                {follower.name}
              </p></Link>
             
              <small className="font-sans antialiased text-sm text-slate-600">
                {follower.title || "Title not available"}
              </small>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfileViewer;