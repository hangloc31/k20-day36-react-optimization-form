import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const registerSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email không được để trống")
      .email("Email không đúng định dạng"),
    password: z
      .string()
      .min(1, "Mật khẩu không được để trống")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự"),
    confirmPassword: z.string().min(1, "Vui lòng nhập lại mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Mật khẩu nhập lại không khớp",
  });

const onSubmit = async (data) => {
  // Giả lập chờ 2 giây gửi API
  await new Promise((resolve) => setTimeout(resolve, 2000));
  alert("Đăng ký thành công!");
};

const inputClass = (hasError) =>
  `w-full rounded-xl border bg-slate-950/70 px-3.5 py-2.5 text-sm text-slate-100 placeholder:text-slate-500 focus:border-emerald-500/60 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none ${
    hasError ? "border-red-500/60" : "border-slate-700"
  }`;

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto w-full max-w-md space-y-5 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-xl backdrop-blur sm:p-8"
    >
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-100">Đăng ký tài khoản</h2>
        <p className="mt-1 text-sm text-slate-500">
          Nhập thông tin để tạo tài khoản mới
        </p>
      </div>

      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          {...register("email")}
          className={inputClass(errors.email)}
        />
        {errors.email && (
          <p style={{ color: "red" }} className="mt-1 text-sm">
            {errors.email.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="password"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Mật khẩu
        </label>
        <input
          id="password"
          type="password"
          placeholder="Ít nhất 8 ký tự"
          {...register("password")}
          className={inputClass(errors.password)}
        />
        {errors.password && (
          <p style={{ color: "red" }} className="mt-1 text-sm">
            {errors.password.message}
          </p>
        )}
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="mb-1.5 block text-sm font-medium text-slate-200"
        >
          Nhập lại mật khẩu
        </label>
        <input
          id="confirmPassword"
          type="password"
          placeholder="Nhập lại mật khẩu"
          {...register("confirmPassword")}
          className={inputClass(errors.confirmPassword)}
        />
        {errors.confirmPassword && (
          <p style={{ color: "red" }} className="mt-1 text-sm">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 py-2.5 text-sm font-bold text-slate-950 transition-opacity hover:opacity-90 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Đang xử lý..." : "Đăng ký"}
      </button>
    </form>
  );
};

export default RegisterForm;
export { registerSchema };
