const badgeStyles = {
    "Full-time": "bg-primary-subtle text-primary",
    "Part-time": "bg-warning-subtle text-warning-emphasis",
    Contract: "bg-info-subtle text-info-emphasis",
    Remote: "bg-success-subtle text-success-emphasis",
    Internship: "bg-secondary-subtle text-secondary-emphasis",
};

export default function JobBadge({ jobType }) {
    const style = badgeStyles[jobType] || "bg-light text-dark";

    return (
        <span className={`badge jc-badge ${style}`}>
            {jobType}
        </span>
    );
}