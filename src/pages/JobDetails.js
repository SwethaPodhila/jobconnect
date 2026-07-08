import { Link, useParams } from "react-router-dom";
import { useState } from "react";

import JobBadge from "../components/JobBadge";
import { useBookmarks } from "../hooks/useBookmarks";

import {
    formatPostedDate,
    jobs,
    logoBackground,
} from "../utils/jobHelpers";

function JobNotFound() {
    return (
        <div className="container py-5 my-5 text-center jc-page">
            <h1 className="display-5 fw-bold text-primary">Job not found</h1>

            <p className="text-secondary">
                This job may have been filled or removed. Browse our latest openings
                instead.
            </p>

            <Link
                to="/jobs"
                className="btn btn-primary rounded-pill px-4 mt-2"
            >
                Browse Jobs
            </Link>
        </div>
    );
}

function DetailSection({ title, items }) {
    return (
        <div className="mb-4">
            <h5 className="fw-bold mb-3">{title}</h5>

            <ul className="list-unstyled d-flex flex-column gap-2">
                {items.map((item, index) => (
                    <li key={index} className="d-flex gap-2">
                        <i className="bi bi-check-circle-fill text-primary mt-1"></i>
                        <span className="text-secondary">{item}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function JobDetails() {
    const { jobId } = useParams();
    console.log(jobId)

    const job = jobs.find((j) => String(j.id) === jobId);

    const { isBookmarked, toggleBookmark } = useBookmarks();

    const [applied, setApplied] = useState(false);
    const [shared, setShared] = useState(false);

    if (!job) {
        return <JobNotFound />;
    }

    const handleShare = async () => {
        const url = window.location.href;

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
        <div className="jc-page">
            <section className="jc-hero py-4">
                <div className="container">
                    <Link
                        to="/jobs"
                        className="btn btn-sm rounded-pill jc-chip border-0 mb-3"
                    >
                        <i className="bi bi-arrow-left me-2"></i>
                        Back to Jobs
                    </Link>

                    <div className="d-flex flex-wrap align-items-center gap-3">
                        <span
                            className="jc-company-logo lg"
                            style={{
                                background: logoBackground(job.company),
                            }}
                        >
                            {job.companyLogo}
                        </span>

                        <div className="min-w-0">
                            <h1 className="h3 fw-bold mb-1 text-white">
                                {job.title}
                            </h1>

                            <p
                                className="mb-2"
                                style={{ color: "#c7d7f5" }}
                            >
                                {job.company} · {job.location}
                            </p>

                            <div className="d-flex flex-wrap gap-2">
                                <JobBadge jobType={job.jobType} />

                                <span className="badge jc-badge bg-light text-secondary">
                                    {job.category}
                                </span>

                                <span className="badge jc-badge jc-chip border-0">
                                    <i className="bi bi-clock me-1"></i>
                                    Posted {formatPostedDate(job.postedDate)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="container py-5">
                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div className="card jc-card p-4 p-md-5">
                            {applied && (
                                <div
                                    className="alert alert-success d-flex align-items-center gap-2"
                                    role="alert"
                                >
                                    <i className="bi bi-check-circle-fill"></i>

                                    <div>
                                        Your application for{" "}
                                        <strong>{job.title}</strong> has been submitted!
                                    </div>
                                </div>
                            )}

                            <h5 className="fw-bold mb-3">
                                Job Description
                            </h5>

                            <p className="text-secondary mb-4">
                                {job.description}
                            </p>

                            <DetailSection
                                title="Responsibilities"
                                items={job.responsibilities}
                            />

                            <DetailSection
                                title="Requirements & Qualifications"
                                items={job.requirements}
                            />

                            <div className="mb-4">
                                <h5 className="fw-bold mb-3">
                                    Required Skills
                                </h5>

                                <div className="d-flex flex-wrap gap-2">
                                    {job.skills.map((skill, index) => (
                                        <span
                                            key={index}
                                            className="jc-skill-badge"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <DetailSection
                                title="Benefits"
                                items={job.benefits}
                            />

                            <div>
                                <h5 className="fw-bold mb-3">
                                    About {job.company}
                                </h5>

                                <p className="text-secondary mb-0">
                                    {job.companyOverview}
                                </p>
                            </div>
                        </div>
                    </div>

                    <aside className="col-12 col-lg-4">
                        <div
                            className="card jc-card p-4 mb-4 position-sticky"
                            style={{ top: "96px" }}
                        >
                            <h5 className="fw-bold mb-3">
                                Job Overview
                            </h5>

                            <ul className="list-unstyled d-flex flex-column gap-3 mb-4">
                                <li className="d-flex gap-3">
                                    <i className="bi bi-cash-stack text-primary fs-5"></i>

                                    <div>
                                        <div className="jc-meta">Salary</div>
                                        <strong>{job.salary} / year</strong>
                                    </div>
                                </li>

                                <li className="d-flex gap-3">
                                    <i className="bi bi-briefcase text-primary fs-5"></i>

                                    <div>
                                        <div className="jc-meta">Experience</div>
                                        <strong>
                                            {job.experience} · {job.experienceLevel}
                                        </strong>
                                    </div>
                                </li>

                                <li className="d-flex gap-3">
                                    <i className="bi bi-geo-alt text-primary fs-5"></i>

                                    <div>
                                        <div className="jc-meta">Location</div>
                                        <strong>{job.location}</strong>
                                    </div>
                                </li>

                                <li className="d-flex gap-3">
                                    <i className="bi bi-tag text-primary fs-5"></i>

                                    <div>
                                        <div className="jc-meta">Category</div>
                                        <strong>{job.category}</strong>
                                    </div>
                                </li>
                            </ul>

                            <div className="d-grid gap-2">
                                <button
                                    type="button"
                                    className={`btn btn-lg rounded-pill fw-semibold ${applied
                                        ? "btn-success"
                                        : "btn-primary"
                                        }`}
                                    onClick={() => setApplied(true)}
                                    disabled={applied}
                                >
                                    {applied ? (
                                        <>
                                            <i className="bi bi-check-lg me-2"></i>
                                            Applied
                                        </>
                                    ) : (
                                        "Apply Now"
                                    )}
                                </button>

                                <div className="d-flex gap-2">
                                    <button
                                        type="button"
                                        className={`btn flex-fill rounded-pill ${isBookmarked(job.id)
                                            ? "btn-primary"
                                            : "btn-outline-primary"
                                            }`}
                                        onClick={() =>
                                            toggleBookmark(job.id)
                                        }
                                    >
                                        <i
                                            className={`bi ${isBookmarked(job.id)
                                                ? "bi-bookmark-fill"
                                                : "bi-bookmark"
                                                } me-2`}
                                        ></i>

                                        {isBookmarked(job.id)
                                            ? "Saved"
                                            : "Save"}
                                    </button>

                                    <button
                                        type="button"
                                        className="btn btn-outline-primary flex-fill rounded-pill"
                                        onClick={handleShare}
                                    >
                                        <i
                                            className={`bi ${shared
                                                ? "bi-check-lg"
                                                : "bi-share"
                                                } me-2`}
                                        ></i>

                                        {shared ? "Copied!" : "Share"}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
}

export default JobDetails;