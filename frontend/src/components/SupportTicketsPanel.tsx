import { SupportTicket } from "../types";

export default function SupportTicketsPanel({ tickets }: { tickets: SupportTicket[] }) {
  const total = tickets.reduce((sum, t) => sum + t.count, 0);

  return (
    <div className="glass-card panel">
      <div className="panel-head">
        <h3>Support Tickets</h3>
      </div>
      <div style={{ fontSize: 11.5, color: "var(--ink-faint)", marginBottom: 16 }}>
        {total} tickets this month
      </div>

      {tickets.map((t) => (
        <div className="ticket-row" key={t._id}>
          <span className="ticket-dot" style={{ background: t.color }} />
          <span className="ticket-label">{t.status}</span>
          <span className="ticket-count">{t.count}</span>
        </div>
      ))}
    </div>
  );
}
