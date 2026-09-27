import { memo, useMemo, useState } from "react";
import {
  MousePointerClick,
  Package,
  RotateCcw,
  Search,
  SearchX,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";

const CATEGORIES = ["Tất cả", "Điện thoại", "Laptop", "Thời trang", "Gia dụng", "Sách"];

const CATEGORY_STYLES = {
  "Điện thoại": "bg-sky-500/10 text-sky-300 ring-sky-500/30",
  Laptop: "bg-violet-500/10 text-violet-300 ring-violet-500/30",
  "Thời trang": "bg-pink-500/10 text-pink-300 ring-pink-500/30",
  "Gia dụng": "bg-amber-500/10 text-amber-300 ring-amber-500/30",
  Sách: "bg-emerald-500/10 text-emerald-300 ring-emerald-500/30",
};

const Rating = ({ value }) => {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${value} trên 5 sao`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={14}
          aria-hidden="true"
          className={
            i < value
              ? "fill-amber-400 text-amber-400"
              : "fill-slate-800 text-slate-700"
          }
        />
      ))}
    </span>
  );
};

const ProductCard = memo(({ product }) => {
  return (
    <article className="group rounded-2xl border border-slate-800 bg-slate-900/60 p-4 backdrop-blur transition-all duration-200 hover:-translate-y-0.5 hover:border-emerald-500/40 hover:shadow-[0_0_24px_-8px] hover:shadow-emerald-500/20">
      <div className="flex items-start justify-between gap-2">
        <span
          className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ring-1 ${
            CATEGORY_STYLES[product.category] ??
            "bg-slate-800 text-slate-300 ring-slate-700"
          }`}
        >
          {product.category}
        </span>
        <span className="text-[11px] text-slate-600">#{product.id}</span>
      </div>
      <h3 className="mt-3 font-semibold text-slate-100 transition-colors group-hover:text-emerald-300">
        {product.name}
      </h3>
      <div className="mt-3 flex items-center justify-between gap-2">
        <p className="text-lg font-bold text-emerald-400">{product.price}k</p>
        <Rating value={product.rating} />
      </div>
    </article>
  );
});

ProductCard.displayName = "ProductCard";

const ProductFilter = ({ products }) => {
  const [count, setCount] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("default");

  const filteredProducts = useMemo(() => {
    console.log("ĐANG LỌC VÀ SẮP XẾP LẠI DANH SÁCH...");

    const normalizedKeyword = keyword.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchKeyword = product.name.toLowerCase().includes(normalizedKeyword);
      const matchCategory = category === "Tất cả" || product.category === category;
      return matchCategory && matchKeyword;
    });

    if (sortBy === "priceAsc") {
      return [...result].sort((a, b) => a.price - b.price);
    }

    if (sortBy === "priceDesc") {
      return [...result].sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, keyword, category, sortBy]);

  const handleReset = () => {
    setKeyword("");
    setCategory("Tất cả");
    setSortBy("default");
  };

  const isFiltered = keyword !== "" || category !== "Tất cả" || sortBy !== "default";

  return (
    <div className="space-y-6">
      {/* Toolbar lọc */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-semibold tracking-wide text-slate-200 uppercase">
            <SlidersHorizontal size={16} aria-hidden="true" className="text-emerald-400" />
            Bộ lọc và sắp xếp
          </h2>
          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
            >
              <RotateCcw size={13} aria-hidden="true" />
              Đặt lại
            </button>
          )}
        </div>

        <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_200px_200px]">
          <label className="relative block">
            <Search
              size={17}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm... (VD: Sản phẩm 12)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/70 py-2.5 pr-10 pl-10 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
            />
            {keyword && (
              <button
                type="button"
                onClick={() => setKeyword("")}
                aria-label="Xóa tìm kiếm"
                className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-0.5 text-slate-500 transition-colors hover:text-slate-200"
              >
                <X size={15} aria-hidden="true" />
              </button>
            )}
          </label>

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            aria-label="Lọc theo danh mục"
            className="w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-200 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="bg-slate-900">
                {c === "Tất cả" ? "Tất cả danh mục" : c}
              </option>
            ))}
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            aria-label="Sắp xếp theo giá"
            className="w-full cursor-pointer rounded-xl border border-slate-700 bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-200 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none"
          >
            <option value="default" className="bg-slate-900">
              Sắp xếp: Mặc định
            </option>
            <option value="priceAsc" className="bg-slate-900">
              Giá tăng dần
            </option>
            <option value="priceDesc" className="bg-slate-900">
              Giá giảm dần
            </option>
          </select>
        </div>

        {/* Demo re-render */}
        <div className="mt-4 flex flex-col gap-3 rounded-xl border border-dashed border-slate-700/80 bg-slate-950/50 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-2 text-xs text-slate-400">
            <MousePointerClick size={15} aria-hidden="true" className="shrink-0 text-cyan-400" />
            Bấm tăng count — danh sách <span className="font-semibold text-slate-200">không</span> lọc
            lại (mở console để kiểm chứng useMemo).
          </p>
          <div className="flex items-center gap-2.5">
            <span className="rounded-lg bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-200 ring-1 ring-slate-700">
              Count: {count}
            </span>
            <button
              type="button"
              onClick={() => setCount((c) => c + 1)}
              className="rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-400 px-3.5 py-1.5 text-xs font-bold text-slate-950 transition-opacity hover:opacity-90 active:scale-95"
            >
              Tăng count
            </button>
          </div>
        </div>
      </section>

      {/* Kết quả */}
      <section>
        <div className="flex items-center justify-between gap-3">
          <h2 className="flex items-center gap-2 text-sm font-medium text-slate-300">
            <Package size={16} aria-hidden="true" className="text-emerald-400" />
            Tìm thấy{" "}
            <span className="font-bold text-emerald-300">{filteredProducts.length}</span>
            <span className="text-slate-500">/ {products.length} sản phẩm</span>
          </h2>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-16 text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-slate-500">
              <SearchX size={26} aria-hidden="true" />
            </span>
            <p className="mt-4 font-semibold text-slate-200">Không tìm thấy sản phẩm phù hợp</p>
            <p className="mt-1 max-w-sm text-sm text-slate-500">
              Thử từ khóa khác hoặc bấm “Đặt lại” để xem toàn bộ danh sách.
            </p>
            <button
              type="button"
              onClick={handleReset}
              className="mt-5 inline-flex items-center gap-1.5 rounded-xl border border-slate-700 bg-slate-800/60 px-4 py-2 text-sm font-medium text-slate-200 transition-colors hover:border-emerald-500/40 hover:text-emerald-300"
            >
              <RotateCcw size={14} aria-hidden="true" />
              Đặt lại bộ lọc
            </button>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ProductFilter;
