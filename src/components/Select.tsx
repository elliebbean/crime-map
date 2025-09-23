import clsx from "clsx";

type SelectProps = React.ComponentProps<"select">;

export default function Select({ className, ...props }: SelectProps) {
  return (
    <select
      className={clsx(
        "bg-gray-50 border border-gray-400 text-gray-900 text-sm rounded-lg p-2 dark:bg-gray-700 dark:border-gray-500 dark:text-white outline-none focus-visible:ring-2 focus-visible:ring-blue-500 hover:border-blue-400 hover:dark:border-blue-500",
        className
      )}
      {...props}
    />
  );
}
