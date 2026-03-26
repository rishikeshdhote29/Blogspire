import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {sendVerificationEmailAction, userProfileAction} from "../../redux/slices/users/usersSlices.js";
import {Link} from "react-router-dom";

function VerifiedBadge() {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			aria-label="Verified account"
			className="shrink-0"
		>
			<circle cx="12" cy="12" r="10" fill="#1DA1F2"/>
			<path
				d="M9 12l2 2l4-4"
				stroke="white"
				strokeWidth="2"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}


export default function UserProfile() {
	const dispatch = useDispatch();
	const userState = useSelector((state) => state?.users);
	const user = userState?.profile?.user;
	const [isSendingVerification, setIsSendingVerification] = useState(false);
	
	useEffect(() => {
		
		dispatch(userProfileAction());
	}, [dispatch]);
	
	const handleVerify = async () => {
		try {
			setIsSendingVerification(true);
			await dispatch(sendVerificationEmailAction()).unwrap();
		} catch (error) {
			console.error("Failed to send verification email", error);
		} finally {
			setIsSendingVerification(false);
		}
	};
	const displayProfile = {
		fields: {
			UserName: user?.username || "not available",
			Phone: user?.phone || "not available",
			Email: user?.email || "not available",
			Title: user?.title || "not available",
			Location: user?.location || "not available",
			accountLevel: user?.accountLevel || "not available",
			gender: user?.gender || "not available", Birthday: user?.dob
				? new Date(user.dob).toLocaleDateString("en-IN", {
					day: "numeric",
					month: "long",
					year: "numeric",
				})
				: "not available",
			
		},
	};
	
	
	return (
		<>
			<div className="flex h-full">
				<div className="flex min-w-0 flex-1 flex-col overflow-hidden">
					<div className="relative z-0 flex flex-1 overflow-hidden">
						<main className="relative z-0 flex-1 overflow-y-auto focus:outline-none xl:order-last">
							<article>
								{/* Profile header */}
								<div>
									<div className="relative">
										<img
											className="h-32 w-full object-cover lg:h-48"
											src={
												user?.coverImage ||
												"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200"
											}
											alt=""
										/>
									</div>
									
									<div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
										<div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
											<div className="relative flex">
												<img
													className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
													src={user?.profilePicture}
													alt=""
												/>
											</div>
											
											<div
												className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
												<div className="mt-6 min-w-0 flex-1 sm:hidden 2xl:block">
													<h1 className="flex items-center gap-2 truncate text-2xl font-bold text-gray-900">
														<span className="truncate">{user?.name}</span>
														{user?.isVerified ? (
															<VerifiedBadge/>
														) : (
															<button
																onClick={handleVerify}
																disabled={isSendingVerification}
																className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
															>
																{isSendingVerification ? "Sending..." : "Unverified"}
															</button>
														)}
													</h1>
												
												
												</div>
											
											</div>
											<div
												className="justify-stretch mt-6 flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
												{/* Profile Views */}
												<Link
													to={"/user/profile-viewers"}
													className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												>
													<svg
														className="-ml-0.5 h-5 w-5 text-gray-400"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														aria-hidden="true"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
														/>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
														/>
													</svg>
													{user?.profileViewers.length || 0} Viewers
												</Link>
												
												{/* follow */}
												<Link
													
													to="/user/followers"
													className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												>
													<svg
														className="-ml-0.5 h-5 w-5 text-gray-400"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														aria-hidden="true"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
														/>
													</svg>
													Followers
												</Link>
												{/* following*/}
												<Link
													to="/user/following"
													
													className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												>
													<svg
														className="-ml-0.5 h-5 w-5 text-gray-400"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														aria-hidden="true"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M22 10.5h-6m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
														/>
													</svg>
													Following
												</Link>
												{/* Blocked user*/}
												<Link
													to="/user/blocked-users"
													
													className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														strokeWidth="1.5"
														stroke="currentColor"
														className="w-6 h-6"
													>
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
														/>
													</svg>
													Blocked users
												</Link>
											</div>
										</div>
										<div className="mt-6 hidden min-w-0 flex-1 sm:block 2xl:hidden">
											<h1 className="flex items-center gap-2 truncate text-2xl font-bold text-gray-900">
												<span className="truncate">{user?.name}</span>
												{user?.isVerified ? (
													<VerifiedBadge/>
												) : (
													<button
														onClick={handleVerify}
														disabled={isSendingVerification}
														className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
													>
														{isSendingVerification ? "Sending..." : "Unverified"}
													</button>
												)}
											</h1>
										</div>
									</div>
								</div>
								
								<div className="mt-6 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
									<dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
										{Object.entries(displayProfile.fields).map(([field, value]) => (
											<div className="sm:col-span-1" key={field}>
												<dt className="text-sm font-medium text-gray-500">
													{field}
												</dt>
												<dd className="mt-1 text-sm text-gray-900">{value}</dd>
											</div>
										))}
									</dl>
									<div className="mt-8">
										<div className="flex space-x-6">
											<h2 className="text-sm font-medium text-gray-500">
												About
											</h2>
										</div>
										<div className="mt-5 text-sm text-gray-700">
											<div dangerouslySetInnerHTML={{__html: user?.bio}}/>
										</div>
									</div>
								</div>
							</article>
						
						</main>
					</div>
				</div>
			</div>
		</>
	);
}