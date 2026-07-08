import jobsData from "../data/jobs.json";

export const jobs = jobsData;

export const jobTypes = [...new Set(jobs.map((job) => job.jobType))].sort();

export const experienceLevels = [
    "Entry Level",
    "Mid Level",
    "Senior Level",
];

export const categories = [...new Set(jobs.map((job) => job.category))].sort();

export const locations = [...new Set(jobs.map((job) => job.location))].sort();

export const salaryRanges = [
    {
        label: "Any salary",
        min: 0,
        max: Infinity,
    },
    {
        label: "Under $60k",
        min: 0,
        max: 60000,
    },
    {
        label: "$60k – $100k",
        min: 60000,
        max: 100000,
    },
    {
        label: "$100k – $140k",
        min: 100000,
        max: 140000,
    },
    {
        label: "$140k+",
        min: 140000,
        max: Infinity,
    },
];

export const defaultFilters = {
    keyword: "",
    location: "",
    jobTypes: [],
    experienceLevels: [],
    categories: [],
    salaryRangeIndex: 0,
};

export function filterJobs(list, filters) {
    const keyword = filters.keyword.trim().toLowerCase();
    const loc = filters.location.trim().toLowerCase();

    const range =
        salaryRanges[filters.salaryRangeIndex] || salaryRanges[0];

    return list.filter((job) => {
        const matchesKeyword =
            !keyword ||
            job.title.toLowerCase().includes(keyword) ||
            job.company.toLowerCase().includes(keyword) ||
            job.skills.some((skill) =>
                skill.toLowerCase().includes(keyword)
            );

        const matchesLocation =
            !loc || job.location.toLowerCase().includes(loc);

        const matchesType =
            filters.jobTypes.length === 0 ||
            filters.jobTypes.includes(job.jobType);

        const matchesExperience =
            filters.experienceLevels.length === 0 ||
            filters.experienceLevels.includes(job.experienceLevel);

        const matchesCategory =
            filters.categories.length === 0 ||
            filters.categories.includes(job.category);

        const matchesSalary =
            job.salaryMax >= range.min &&
            job.salaryMin <= range.max;

        return (
            matchesKeyword &&
            matchesLocation &&
            matchesType &&
            matchesExperience &&
            matchesCategory &&
            matchesSalary
        );
    });
}

export const sortOptions = [
    {
        value: "latest",
        label: "Latest Jobs",
    },
    {
        value: "salary-desc",
        label: "Salary: High to Low",
    },
    {
        value: "salary-asc",
        label: "Salary: Low to High",
    },
    {
        value: "company",
        label: "Company Name (A–Z)",
    },
];

export function sortJobs(list, sort) {
    const sorted = [...list];

    switch (sort) {
        case "salary-desc":
            sorted.sort((a, b) => b.salaryMax - a.salaryMax);
            break;

        case "salary-asc":
            sorted.sort((a, b) => a.salaryMin - b.salaryMin);
            break;

        case "company":
            sorted.sort((a, b) =>
                a.company.localeCompare(b.company)
            );
            break;

        default:
            sorted.sort(
                (a, b) =>
                    new Date(b.postedDate).getTime() -
                    new Date(a.postedDate).getTime()
            );
    }

    return sorted;
}

export function formatPostedDate(isoDate) {
    const posted = new Date(isoDate);
    const now = new Date();

    const diffDays = Math.max(
        0,
        Math.floor(
            (now.getTime() - posted.getTime()) /
            (1000 * 60 * 60 * 24)
        )
    );

    if (diffDays === 0) return "Today";

    if (diffDays === 1) return "1 day ago";

    if (diffDays < 7) return `${diffDays} days ago`;

    const weeks = Math.floor(diffDays / 7);

    return weeks === 1
        ? "1 week ago"
        : `${weeks} weeks ago`;
}

const logoPalette = [
    "linear-gradient(135deg, #0b5ed7, #3d8bfd)",
    "linear-gradient(135deg, #084298, #0b5ed7)",
    "linear-gradient(135deg, #1e3a8a, #2563eb)",
    "linear-gradient(135deg, #0ea5e9, #2563eb)",
    "linear-gradient(135deg, #123a8c, #3b82f6)",
    "linear-gradient(135deg, #0d1b3e, #1d4ed8)",
];

export function logoBackground(company) {
    let hash = 0;

    for (let i = 0; i < company.length; i++) {
        hash =
            (hash * 31 + company.charCodeAt(i)) % 100000;
    }

    return logoPalette[hash % logoPalette.length];
}