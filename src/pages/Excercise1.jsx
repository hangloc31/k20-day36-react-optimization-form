import { Link } from "react-router";
import { ArrowLeft, ListFilter, Zap } from "lucide-react";
import ProductFilter from "../components/ProductFilter";

// Khởi tạo sẵn 1.000 sản phẩm mẫu
const PRODUCTS = Array.from({ length: 1000 }, (_, index) => {
  const categories = ["Điện thoại", "Laptop", "Thời trang", "Gia dụng", "Sách"];

  return {
    id: index + 1,
    name: `Sản phẩm ${index + 1}`,
    category: categories[index % categories.length],
    price: (index % 50) * 20 + 100, // Giá từ 100 đến 1080 (k)
    rating: (index % 5) + 1, // Rating từ 1 đến 5 sao
  };
});

const Excercise1 = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgb(51_65_85/0.12)_1px,transparent_1px),linear-gradient(to_bottom,rgb(51_65_85/0.12)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-80 w-[40rem] -translate-x-1/2 rounded-full bg-emerald-500/15 blur-3xl"
      />

      <div className="relative mx-auto w-full max-w-7xl px-6 py-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur transition-colors hover:border-emerald-500/50 hover:text-emerald-300"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Về trang chủ
        </Link>

        <header className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold tracking-wide text-emerald-300 uppercase">
              <ListFilter size={14} aria-hidden="true" />
              Bài 1 · useMemo
            </div>
            <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Tối ưu bộ lọc{" "}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                1.000 sản phẩm
              </span>
            </h1>
            <p className="mt-3 text-slate-400">
              Tìm kiếm theo tên, lọc theo danh mục, sắp xếp theo giá. Logic
              lọc/sắp xếp được bọc trong <code className="text-emerald-300">useMemo</code> nên
              các state không liên quan (như count) không làm tính toán lại.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { value: "1.000", label: "Sản phẩm" },
              { value: "5", label: "Danh mục" },
              { value: "useMemo", label: "Tối ưu", icon: true },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-800 bg-slate-900/60 px-5 py-4 text-center backdrop-blur"
              >
                <p className="flex items-center justify-center gap-1.5 text-xl font-bold text-slate-100">
                  {stat.icon && (
                    <Zap
                      size={16}
                      aria-hidden="true"
                      className="text-emerald-400"
                    />
                  )}
                  {stat.value}
                </p>
                <p className="mt-1 text-xs text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>
        </header>

        <div className="mt-8">
          <ProductFilter products={PRODUCTS} />
        </div>
      </div>
    </main>
  );
};

export default Excercise1;
