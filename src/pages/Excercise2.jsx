import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import RegisterForm from "../components/RegisterForm";

const Excercise2 = () => {
  return (
    <div className="flex min-h-screen flex-col items-center bg-slate-950 p-4">
      <div className="w-full max-w-md self-start sm:self-center">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 text-sm font-medium text-slate-300 backdrop-blur transition-colors hover:border-emerald-500/50 hover:text-emerald-300"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          Về trang chủ
        </Link>
      </div>
      <div className="flex w-full flex-1 items-center justify-center py-8">
        <RegisterForm />
      </div>
    </div>
  );
};

export default Excercise2;
