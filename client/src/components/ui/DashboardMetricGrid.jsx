function DashboardMetricGrid({ metrics }) {
  if (!metrics?.length) return null;
  return (
    <section
      aria-label="Workspace overview"
      className="collective-metrics"
    >
      {metrics.map((metric, index) => (
        <article
          key={metric.label}
          className="collective-metric"
        >
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-text-secondary">
              {metric.label}
            </p>
            <span className="text-[10px] text-text-muted">0{index + 1}</span>
          </div>
          <p
            className={`my-4 break-words font-display font-medium leading-tight tracking-tight ${String(metric.value).length > 10 ? 'text-xl' : 'text-3xl'}`}
          >
            {metric.value}
          </p>
          <p className="flex items-center gap-2 text-[11px] text-text-secondary">
            <span className="h-1 w-4 rounded-full bg-primary/50" />
            {metric.caption}
          </p>
        </article>
      ))}
    </section>
  );
}
export default DashboardMetricGrid;
