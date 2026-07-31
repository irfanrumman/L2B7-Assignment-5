type Props = {
  currentPage: number;
  totalPages: number;
};

export default function PropertyPagination({
  currentPage,
  totalPages,
}: Props) {
  return (
    <div className="mt-12 flex items-center justify-center gap-2">
      <button
        disabled={currentPage === 1}
        className="rounded-lg border px-3 py-2 disabled:opacity-50"
      >
        Previous
      </button>

      {Array.from({ length: totalPages }).map((_, index) => (
        <button
          key={index}
          className={`rounded-lg px-3 py-2 ${
            currentPage === index + 1
              ? "bg-primary text-white"
              : "border"
          }`}
        >
          {index + 1}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        className="rounded-lg border px-3 py-2 disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}