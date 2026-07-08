import { Link } from "react-router-dom";
import { useState } from "react";
import JobBadge from "./JobBadge";
import { formatPostedDate, logoBackground } from "../utils/jobHelpers";

export default function JobCard({
    job,
    isBookmarked,
    onToggleBookmark,
}) {
    const [shared, setShared] = useState(false);

    const handleShare = async () => {
        const url = `${window.location.origin}/jobs/${job.id}`;

        try {
            if (navigator.share) {
                await navigator.share({
                    title: `${job.title} at ${job.company}`,
                    url,
                });
            } else {
                await navigator.clipboard.writeText(url);
                setShared(true);

                setTimeout(() => {
                    setShared(false);
                }, 2000);
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card jc-card h-100">
            <div className="card-body d-flex flex-column p-4">
                <div className="d-flex justify-content-between align-items-start mb-3 gap-2">
                    <div className="d-flex align-items-center gap-3 min-w-0">
                        <span
                            className="jc-company-logo"
                            style={{
                                background: logoBackground(job.company),
                            }}
                        >
                            {job.companyLogo}
                        </span>

                        <div className="min-w-0 flex-grow-1">
                            <h5
                                className="card-title mb-1 fw-bold"
                                style={{
                                    fontSize: "1.25rem",
                                    lineHeight: "1.2",
                                    minHeight: "38px"
                                }}
                            >
                                <Link
                                    to={`/jobs/${job.id}`}
                                    className="jc-hover-link text-decoration-none"
                                >
                                    {job.title}
                                </Link>
                            </h5>

                            <p className="jc-meta mb-0 text-truncate">
                                {job.company}
                            </p>
                        </div>
                    </div>

                    <div className="d-flex gap-1 flex-shrink-0">
                        <button
                            type="button"
                            className={`btn btn-sm ${isBookmarked ? "btn-primary" : "btn-light"
                                } rounded-circle`}
                            style={{
                                width: "36px",
                                height: "36px",
                            }}
                            aria-label={
                                isBookmarked
                                    ? "Remove bookmark"
                                    : "Bookmark job"
                            }
                            title={
                                isBookmarked
                                    ? "Remove bookmark"
                                    : "Bookmark job"
                            }
                            onClick={() => onToggleBookmark(job.id)}
                        >
                            <i
                                className={`bi ${isBookmarked
                                    ? "bi-bookmark-fill"
                                    : "bi-bookmark"
                                    }`}
                            ></i>
                        </button>

                        <button
                            type="button"
                            className="btn btn-sm btn-light rounded-circle"
                            style={{
                                width: "36px",
                                height: "36px",
                            }}
                            aria-label="Share job"
                            title={shared ? "Link copied!" : "Share job"}
                            onClick={handleShare}
                        >
                            <i
                                className={`bi ${shared ? "bi-check-lg" : "bi-share"
                                    }`}
                            ></i>
                        </button>
                    </div>
                </div>

                <div className="d-flex flex-wrap gap-2 mb-3">
                    <JobBadge jobType={job.jobType} />

                    <span className="badge jc-badge bg-light text-secondary">
                        {job.category}
                    </span>
                </div>

                <ul className="list-unstyled d-flex flex-column gap-2 jc-meta mb-3">
                    <li>
                        <i className="bi bi-geo-alt me-2 text-primary"></i>
                        {job.location}
                    </li>

                    <li>
                        <i className="bi bi-cash-stack me-2 text-primary"></i>
                        {job.salary} / year
                    </li>

                    <li>
                        <i className="bi bi-briefcase me-2 text-primary"></i>
                        {job.experience} · {job.experienceLevel}
                    </li>
                </ul>

                <div className="mt-auto d-flex align-items-center justify-content-between pt-3 border-top">
                    <span className="jc-meta">
                        <i className="bi bi-clock me-1"></i>
                        {formatPostedDate(job.postedDate)}
                    </span>

                    <div className="d-flex gap-2">
                        <Link
                            to={`/jobs/${job.id}`}
                            className="btn btn-outline-primary btn-sm rounded-pill px-3"
                        >
                            View Details
                        </Link>

                        <Link
                            to={`/jobs/${job.id}`}
                            className="btn btn-primary btn-sm rounded-pill px-3"
                        >
                            Apply
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}