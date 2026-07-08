export default function PaginationBar({
    currentPage,
    totalPages,
    onPageChange,
}) {
    if (totalPages <= 1) return null;

    const pages = Array.from(
        { length: totalPages },
        (_, i) => i + 1
    );

    const goTo = (page) => {
        if (
            page < 1 ||
            page > totalPages ||
            page === currentPage
        ) {
            return;
        }

        onPageChange(page);
    };

    return (
        <nav aria-label="Job pages" className="mt-4">
            <ul className="pagination justify-content-center mb-0">
                <li
                    className={`page-item ${currentPage === 1 ? "disabled" : ""
                        }`}
                >
                    <button
                        type="button"
                        className="page-link"
                        onClick={() => goTo(currentPage - 1)}
                        aria-label="Previous page"
                    >
                        <i className="bi bi-chevron-left"></i>
                    </button>
                </li>

                {pages.map((page) => (
                    <li
                        key={page}
                        className={`page-item ${page === currentPage ? "active" : ""
                            }`}
                    >
                        <button
                            type="button"
                            className="page-link"
                            onClick={() => goTo(page)}
                        >
                            {page}
                        </button>
                    </li>
                ))}

                <li
                    className={`page-item ${currentPage === totalPages ? "disabled" : ""
                        }`}
                >
                    <button
                        type="button"
                        className="page-link"
                        onClick={() => goTo(currentPage + 1)}
                        aria-label="Next page"
                    >
                        <i className="bi bi-chevron-right"></i>
                    </button>
                </li>
            </ul>
        </nav>
    );
}