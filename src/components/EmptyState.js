export default function EmptyState({
    title = "No jobs found",
    message = "We couldn't find any jobs matching your search. Try adjusting your filters or keywords.",
    actionLabel,
    onAction,
}) {
    return (
        <div className="text-center py-5 my-4 jc-page">
            <div
                className="jc-icon-circle mx-auto mb-3"
                style={{ width: "72px", height: "72px", fontSize: "1.8rem" }}
            >
                <i className="bi bi-search"></i>
            </div>

            <h4 className="fw-bold">{title}</h4>

            <p
                className="text-secondary mx-auto"
                style={{ maxWidth: "420px" }}
            >
                {message}
            </p>

            {actionLabel && onAction && (
                <button
                    className="btn btn-outline-primary rounded-pill px-4"
                    onClick={onAction}
                >
                    <i className="bi bi-arrow-counterclockwise me-2"></i>
                    {actionLabel}
                </button>
            )}
        </div>
    );
}