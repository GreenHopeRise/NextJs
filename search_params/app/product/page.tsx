"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { setTimeout } from "timers/promises";

export default function ProductPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchFromURL = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const sort = searchParams.get("sort") || "";
  const page =Number(searchParams.get("page") || 1);
  const [search, setSearch] = useState(searchFromURL);
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (search) {
        params.set("search", search);
      } else {
        params.delete("search");
      }
      params.set('page','1')
      router.replace(`/product?${params.toString()}`);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [search]);

  const handleCategory = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
            if (value) {
      params.set('category', value);
    } else {
      params.delete('category');
    }
    params.set('page','1')
    router.push(`/product?${params.toString()}`);

  };
  const handleSort = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
            if (value) {
      params.set('sort', value);
    } else {
      params.delete('sort');
    }
    params.set('page','1')
    router.push(`/product?${params.toString()}`);
  };
  const handlePage = (value: number) => {
    const svalue = String(value)
        const params = new URLSearchParams(searchParams.toString());
            if (value) {
      params.set('page', svalue);
    } else {
      params.delete('page');
    }
    router.push(`/product?${params.toString()}`);
  };
  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      <h1>Products</h1>

      {/* Search */}
      <div style={{ marginBottom: "20px" }}>
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            width: "300px",
          }}
        />
      </div>

      {/* Category */}
      <div style={{ marginBottom: "20px" }}>
        <label>Category: </label>

        <select
          value={category}
          onChange={(e) => handleCategory(e.target.value)}
        >
          <option value="">All Categories</option>

          <option value="clothing">Clothing</option>

          <option value="electronics">Electronics</option>

          <option value="shoes">Shoes</option>
        </select>
      </div>

      {/* Sort */}
      <div style={{ marginBottom: "20px" }}>
        <label>Sort: </label>

        <select value={sort} onChange={(e) => handleSort(e.target.value)}>
          <option value="">Default</option>

          <option value="price-asc">Price: Low → High</option>

          <option value="price-desc">Price: High → Low</option>

          <option value="name-asc">Name: A → Z</option>

          <option value="name-desc">Name: Z → A</option>
        </select>
      </div>

      {/* Current state */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ccc",
        }}
      >
        <h3>Current URL State</h3>

        <p>Search: {searchFromURL || "None"}</p>

        <p>Category: {category || "All"}</p>

        <p>Sort: {sort || "Default"}</p>

        <p>Page: {page}</p>
      </div>

      {/* Pagination */}
      <div>
        <button
          disabled={page === 1}
          onClick={() => handlePage(page - 1)}
        >
          Previous
        </button>

        <span
          style={{
            margin: "0 20px",
          }}
        >
          Page {page}
        </span>

        <button onClick={() => handlePage(page + 1)}>Next</button>
      </div>
    </div>
  );
}
