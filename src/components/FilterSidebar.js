import {
    categories,
    defaultFilters,
    experienceLevels,
    jobTypes,
    locations,
    salaryRanges,
} from "../utils/jobHelpers";

export default function FilterSidebar({ filters, onChange }) {
    const toggleValue = (list, value) =>
        list.includes(value)
            ? list.filter((v) => v !== value)
            : [...list, value];

    const hasActiveFilters =
        filters.jobTypes.length > 0 ||
        filters.experienceLevels.length > 0 ||
        filters.categories.length > 0 ||
        filters.location !== "" ||
        filters.salaryRangeIndex !== 0;

    return (
        <div className="card jc-filter-card p-4 bg-white">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="fw-bold mb-0">
                    <i className="bi bi-funnel me-2 text-primary"></i>
                    Filters
                </h5>

                {hasActiveFilters && (
                    <button
                        type="button"
                        className="btn btn-link btn-sm text-decoration-none p-0"
                        onClick={() =>
                            onChange({
                                ...defaultFilters,
                                keyword: filters.keyword,
                            })
                        }
                    >
                        Clear all
                    </button>
                )}
            </div>

            <p className="jc-filter-title mb-2">Job Type</p>

            {jobTypes.map((type) => (
                <div className="form-check mb-1" key={type}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`type-${type}`}
                        checked={filters.jobTypes.includes(type)}
                        onChange={() =>
                            onChange({
                                ...filters,
                                jobTypes: toggleValue(filters.jobTypes, type),
                            })
                        }
                    />

                    <label
                        className="form-check-label small"
                        htmlFor={`type-${type}`}
                    >
                        {type}
                    </label>
                </div>
            ))}

            <p className="jc-filter-title mb-2 mt-4">
                Experience Level
            </p>

            {experienceLevels.map((level) => (
                <div className="form-check mb-1" key={level}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`level-${level}`}
                        checked={filters.experienceLevels.includes(level)}
                        onChange={() =>
                            onChange({
                                ...filters,
                                experienceLevels: toggleValue(
                                    filters.experienceLevels,
                                    level
                                ),
                            })
                        }
                    />

                    <label
                        className="form-check-label small"
                        htmlFor={`level-${level}`}
                    >
                        {level}
                    </label>
                </div>
            ))}

            <p className="jc-filter-title mb-2 mt-4">
                Category
            </p>

            {categories.map((category) => (
                <div className="form-check mb-1" key={category}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        id={`cat-${category}`}
                        checked={filters.categories.includes(category)}
                        onChange={() =>
                            onChange({
                                ...filters,
                                categories: toggleValue(
                                    filters.categories,
                                    category
                                ),
                            })
                        }
                    />

                    <label
                        className="form-check-label small"
                        htmlFor={`cat-${category}`}
                    >
                        {category}
                    </label>
                </div>
            ))}

            <p className="jc-filter-title mb-2 mt-4">
                Location
            </p>

            <select
                className="form-select form-select-sm"
                value={filters.location}
                onChange={(e) =>
                    onChange({
                        ...filters,
                        location: e.target.value,
                    })
                }
            >
                <option value="">All locations</option>

                {locations.map((loc) => (
                    <option key={loc} value={loc}>
                        {loc}
                    </option>
                ))}
            </select>

            <p className="jc-filter-title mb-2 mt-4">
                Salary Range
            </p>

            {salaryRanges.map((range, index) => (
                <div className="form-check mb-1" key={range.label}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name="salaryRange"
                        id={`salary-${index}`}
                        checked={filters.salaryRangeIndex === index}
                        onChange={() =>
                            onChange({
                                ...filters,
                                salaryRangeIndex: index,
                            })
                        }
                    />

                    <label
                        className="form-check-label small"
                        htmlFor={`salary-${index}`}
                    >
                        {range.label}
                    </label>
                </div>
            ))}
        </div>
    );
}