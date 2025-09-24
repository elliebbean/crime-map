import clsx from "clsx";

type InputProps = React.ComponentProps<"input">;

export default function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={clsx(
        "bg-gray-50 border border-gray-400 text-gray-900 text-lg sm:text-sm rounded-lg p-2 dark:bg-gray-700 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-400 hover:dark:border-blue-500",
        className
      )}
      {...props}
    />
  );
}
