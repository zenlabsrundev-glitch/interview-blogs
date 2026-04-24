"use client";

import { useEffect, useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { PostCard } from "@/components/PostCard";
import { SkeletonLoader } from "@/components/SkeletonLoader";
import { Button } from "@/components/ui/button";
import { type Post, type PostResult } from "@/types/post";

interface PostsFeedProps {
  initialPosts: Post[];
}

interface Filters {
  company: string;
  role: string;
  result: "" | PostResult;
}

export function PostsFeed({ initialPosts }: PostsFeedProps) {
  const [filters, setFilters] = useState<Filters>({
    company: "",
    role: "",
    result: "",
  });
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialPosts.length > 0);

  useEffect(() => {
    const timeout = setTimeout(async () => {
      setLoading(true);
      const params = new URLSearchParams({
        page: "1",
        company: filters.company,
        role: filters.role,
        result: filters.result,
      });
      const response = await fetch(`/api/posts?${params.toString()}`);
      const payload = await response.json();
      setPosts(payload.posts ?? []);
      setHasMore(payload.hasMore ?? false);
      setPage(1);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters.company, filters.role, filters.result]);

  const loadMore = async () => {
    setLoading(true);
    const params = new URLSearchParams({
      page: String(page + 1),
      company: filters.company,
      role: filters.role,
      result: filters.result,
    });
    const response = await fetch(`/api/posts?${params.toString()}`);
    const payload = await response.json();
    const nextPosts = payload.posts ?? [];
    setPosts((prev) => [...prev, ...nextPosts]);
    setPage((prev) => prev + 1);
    setHasMore(payload.hasMore ?? false);
    setLoading(false);
  };

  return (
    <section>
      <FilterBar filters={filters} onChange={setFilters} />

      {posts.length === 0 && !loading ? (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-white/60 p-10 text-center text-zinc-600">
          No posts yet. Be the first to share your placement journey.
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
          {loading &&
            Array.from({ length: 2 }).map((_, index) => (
              <SkeletonLoader key={`loader-${index}`} />
            ))}
        </div>
      )}

      {hasMore && posts.length > 0 && (
        <div className="mt-6 flex justify-center">
          <Button onClick={loadMore} disabled={loading}>
            {loading ? "Loading..." : "Load More"}
          </Button>
        </div>
      )}
    </section>
  );
}
