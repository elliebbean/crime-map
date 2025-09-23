import clsx from "clsx";

interface ButtonProps extends React.ComponentProps<"button"> {
  variant?: "accent" | "regular";
}

export default function Button({ variant = "regular", className, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(
        "cursor-pointer border text-gray-900 text-sm font-semibold rounded-lg p-2 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500",
        className,
        {
          "bg-blue-300 border-blue-400 dark:bg-blue-800 dark:border-blue-600 hover:bg-blue-200 hover:dark:bg-blue-700":
            variant === "accent",
          "bg-gray-50 border-gray-400 dark:bg-gray-700 dark:border-gray-500 hover:bg-gray-200 hover:dark:bg-gray-600":
            variant === "regular",
        }
      )}
      {...props}
    />
  );
}
