import { Link } from "react-router";
import { ArrowRight, ListFilter, UserPlus } from "lucide-react";

const exercises = [
  {
    to: "/bai-1",
    icon: ListFilter,
    accent: "from-emerald-400 to-cyan-400",
    title: "Bài 1 · Tối ưu bộ lọc 1.000 sản phẩm",
    description:
      "Tìm kiếm, lọc theo danh mục và sắp xếp giá trên 1.000 sản phẩm với useMemo — tăng count thoải mái mà danh sách không lọc lại.",
    tags: ["useMemo", "useState", "1.000 items"],
  },
  {
    to: "/bai-2",
    icon: UserPlus,
    accent: "from-violet-400 to-fuchsia-400",
    title: "Bài 2 · Form Đăng Ký Tài Khoản",
    description:
      "RegisterForm với validate từng field, báo lỗi thân thiện và xử lý submit — thực hành form trong React.",
    tags: ["useState", "validation", "form"],
  },
];

const HomePage = () => {
  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgb(51_65_85/0.15)_1px,transparent_1px),linear-gradient(to_bottom,rgb(51_65_85/0.15)_1px,transparent_1px)] [background-size:44px_44px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-1/2 h-96 w-[42rem] -translate-x-1/2 rounded-full bg-emerald-500/20 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -bottom-40 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col items-center px-6 py-20">
        <div className="flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-300">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          K20 · Day 36
        </div>

        <h1 className="mt-8 text-center text-5xl font-bold tracking-tight sm:text-6xl">
          React Optimization{" "}
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Practice
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-center text-lg text-slate-400">
          Tối ưu render với useMemo và thực hành form validation. Chọn một bài
          tập bên dưới để bắt đầu.
        </p>

        <section className="mt-14 grid w-full gap-5 sm:grid-cols-2">
          {exercises.map((exercise) => {
            const Icon = exercise.icon;

            return (
              <Link
                key={exercise.to}
                to={exercise.to}
                className="group relative rounded-2xl border border-slate-800 bg-slate-900/60 p-6 backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-[0_0_32px_-8px] hover:shadow-emerald-500/25"
              >
                <div className="flex items-center gap-4">
                  <span
                    className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${exercise.accent} text-slate-950`}
                  >
                    <Icon size={24} aria-hidden="true" />
                  </span>
                  <h2 className="text-lg font-semibold text-slate-100 transition-colors group-hover:text-emerald-400">
                    {exercise.title}
                  </h2>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-slate-400">
                  {exercise.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {exercise.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-300 ring-1 ring-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-400">
                  Vào bài
                  <ArrowRight
                    size={16}
                    aria-hidden="true"
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            );
          })}
        </section>

        <footer className="mt-auto pt-16 text-sm text-slate-500">
          React 19 · Vite · Tailwind CSS 4 · lucide-react · react-router
        </footer>
      </div>
    </main>
  );
};

export default HomePage;
