interface StatsTableProps {
  headers: string[];
  rows: string[][];
}

export default function StatsTable({ headers, rows }: StatsTableProps) {
  return (
    <table className="w-full text-left rtl:text-right">
      <thead className="bg-gray-200 text-gray-800 dark:bg-gray-600 dark:text-gray-200">
        <tr>
          {headers.map((header, index) => (
            <th key={index} className={`px-2 py-1 ${index == 0 ? "w-full" : ""}`}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="text-sm">
        {rows.map((row, index) => (
          <tr
            key={index}
            className="odd:bg-white odd:dark:bg-gray-700 even:bg-gray-50 even:dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700"
          >
            {row.map((content, index) => (
              <td key={index} className="px-2 py-1">
                {content}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
