type AlertType = "info" | "warning" | "error" | "success";

const colorVariants: Record<AlertType, string> = {
  info: "bg-blue-100 text-blue-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
  success: "bg-green-100 text-green-700",
};

export default function Alert({
  children,
  type = "error",
  title = "Error",
}: {
  children: React.ReactNode;
  type?: AlertType;
  title?: string;
}) {
  return (
    <div
      className={`${colorVariants[type]} mb-4 rounded-lg px-6 py-2 text-sm`}
      role="alert"
    >
      <span className="font-bold">{title}!</span> {children}
    </div>
  );
}
