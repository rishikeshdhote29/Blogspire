import React from "react";
import { Link } from "react-router-dom";
import PublicPosts from "../Posts/PublicPosts";

const Homepage = () => {
  const features = [
    {
      title: "Write Faster",
      description: "Draft and publish blog posts quickly with a clean workflow.",
    },
    {
      title: "Grow Audience",
      description: "Reach more readers with public posts and rich profile pages.",
    },
    {
      title: "Stay Organized",
      description: "Use categories, comments, and profile tools in one place.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-white text-slate-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-100">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-0 h-64 w-64 rounded-full bg-emerald-100 blur-3xl opacity-60" />
          <div className="absolute -right-16 top-24 h-72 w-72 rounded-full bg-indigo-100 blur-3xl opacity-60" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 py-20 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-emerald-700">
                Blogspire Platform
              </span>

              <h1 className="mt-5 text-4xl font-extrabold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
                Share ideas, build your voice, and grow your tech audience.
              </h1>

              <p className="mt-6 max-w-xl text-lg text-slate-600 md:text-xl">
                Publish posts, engage with readers, and showcase your profile in one modern blogging experience.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/register"
                  className="rounded-lg bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                >
                  Get Started
                </Link>
                <Link
                  to="/login"
                  className="rounded-lg border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                >
                  Sign In
                </Link>
                <Link
                  to="/public-posts"
                  className="rounded-lg border border-indigo-200 bg-indigo-50 px-5 py-3 text-sm font-semibold text-indigo-700 transition hover:bg-indigo-100"
                >
                  Explore Posts
                </Link>
              </div>

              <div className="mt-8 grid max-w-md grid-cols-3 gap-3 text-center">
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-xl font-bold text-slate-900">10K+</p>
                  <p className="text-xs text-slate-500">Readers</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-xl font-bold text-slate-900">2K+</p>
                  <p className="text-xs text-slate-500">Articles</p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-white p-3">
                  <p className="text-xl font-bold text-slate-900">500+</p>
                  <p className="text-xs text-slate-500">Authors</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-bold text-slate-900">Why Blogspire?</h2>
              <p className="mt-2 text-sm text-slate-600">
                Everything you need to write and manage content with a smooth, creator-friendly interface.
              </p>
              <div className="mt-6 space-y-4">
                {features.map((item) => (
                  <div key={item.title} className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                    <h3 className="font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Strip */}
      <section className="border-b border-slate-100 bg-white">
        <div className="mx-auto grid max-w-7xl gap-4 px-6 py-8 text-sm text-slate-600 sm:grid-cols-3">
          <p className="rounded-lg bg-slate-50 px-4 py-3">Write and publish with category-based structure.</p>
          <p className="rounded-lg bg-slate-50 px-4 py-3">Engage your readers with comments, likes, and claps.</p>
          <p className="rounded-lg bg-slate-50 px-4 py-3">Show your journey using richer profile and cover images.</p>
        </div>
      </section>

      {/* Recent Posts */}
      <PublicPosts />
    </div>
  );
};

export default Homepage;