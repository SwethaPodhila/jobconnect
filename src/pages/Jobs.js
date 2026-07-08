import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import EmptyState from "../components/EmptyState";
import FilterSidebar from "../components/FilterSidebar";
import JobCard from "../components/JobCard";
import LoadingSpinner from "../components/LoadingSpinner";
import PaginationBar from "../components/PaginationBar";
import { useBookmarks } from "../hooks/useBookmarks";

import {
    defaultFilters,
    filterJobs,
    jobs,
    sortJobs,
    sortOptions,
} from "../utils/jobHelpers";

const JOBS_PER_PAGE = 6;

function Jobs() {
    const [searchParams] = useSearchParams();
    const { isBookmarked, toggleBookmark } = useBookmarks();

    const [loading, setLoading] = useState(true);

    const [filters, setFilters] = useState({
        ...defaultFilters,
        keyword: searchParams.get("q") || "",
        location: searchParams.get("location") || "",
        categories: searchParams.get("category")
            ? [searchParams.get("category")]
            : [],
    });

    const [sort, setSort] = useState("latest");
    const [page, setPage] = useState(1);

    // Loading animation
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    // Update filters when URL changes
    useEffect(() => {
        setFilters((prev) => ({
            ...prev,
            keyword: searchParams.get("q") || "",
            location: searchParams.get("location") || prev.location,
            categories: searchParams.get("category")
                ? [searchParams.get("category")]
                : prev.categories,
        }));
    }, [searchParams]);

    const filteredJobs = useMemo(() => {
        return sortJobs(filterJobs(jobs, filters), sort);
    }, [filters, sort]);

    useEffect(() => {
        setPage(1);
    }, [filters, sort]);

    const totalPages = Math.ceil(filteredJobs.length / JOBS_PER_PAGE);

    const pageJobs = filteredJobs.slice(
        (page - 1) * JOBS_PER_PAGE,
        page * JOBS_PER_PAGE
    );

    const handlePageChange = (nextPage) => {
        setPage(nextPage);

        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="jc-page">
            <section className="jc-hero py-5">
                <div className="container text-center py-2">
                    <h1 className="fw-bold display-6 mb-2">Browse Jobs</h1>

                    <p className="mb-0" style={{ color: "#c7d7f5" }}>
                        {jobs.length} opportunities waiting for you
                    </p>
                </div>
            </section>

            <div className="container py-5">
                <div className="row g-4">
                    <aside className="col-12 col-lg-3">
                        <FilterSidebar
                            filters={filters}
                            onChange={setFilters}
                        />
                    </aside>

                    <div className="col-12 col-lg-9">
                        {/* Search & Sort */}
                        <div className="card jc-filter-card bg-white p-3 mb-4">
                            <div className="row g-2 align-items-center">
                                <div className="col-12 col-md-7">
                                    <div className="input-group">
                                        <span className="input-group-text bg-white">
                                            <i className="bi bi-search text-primary"></i>
                                        </span>

                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Search by title, company, or skills..."
                                            value={filters.keyword}
                                            onChange={(e) =>
                                                setFilters({
                                                    ...filters,
                                                    keyword: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </div>

                                <div className="col-12 col-md-5">
                                    <select
                                        className="form-select"
                                        value={sort}
                                        onChange={(e) => setSort(e.target.value)}
                                    >
                                        {sortOptions.map((option) => (
                                            <option
                                                key={option.value}
                                                value={option.value}
                                            >
                                                Sort: {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        {loading ? (
                            <LoadingSpinner />
                        ) : filteredJobs.length === 0 ? (
                            <EmptyState
                                actionLabel="Clear all filters"
                                onAction={() => setFilters(defaultFilters)}
                            />
                        ) : (
                            <>
                                <p className="jc-meta mb-3">
                                    Showing <strong>{pageJobs.length}</strong> of{" "}
                                    <strong>{filteredJobs.length}</strong> jobs
                                </p>

                                <div className="row g-4">
                                    {pageJobs.map((job) => (
                                        <div
                                            className="col-12 col-md-6"
                                            key={job.id}
                                        >
                                            <JobCard
                                                job={job}
                                                isBookmarked={isBookmarked(job.id)}
                                                onToggleBookmark={toggleBookmark}
                                            />
                                        </div>
                                    ))}
                                </div>

                                <PaginationBar
                                    currentPage={page}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Jobs;