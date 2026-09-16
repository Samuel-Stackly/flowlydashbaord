import { useState } from "react";
import { AlertTriangle, TrendingUp, ArrowRight, Send } from "lucide-react";
import { Insight } from "../types";

export default function AIInsightsPanel({ insights }: { insights: Insight[] }) {
  const [message, setMessage] = useState("");

  return (
    <div className="glass-card panel" style={{ display: "flex", flexDirection: "column" }}>
      <div className="panel-head">
        <h3>AI Insights Panel</h3>
      </div>

      <div className="insight-cards">
        {insights.map((insight) => (
          <div key={insight._id} className={`insight-card ${insight.type}`}>
            <div className={`insight-title ${insight.type}`}>
              {insight.type === "risk" ? <AlertTriangle size={13} /> : <TrendingUp size={13} />}
              {insight.title}
            </div>
            <div className="insight-body">{insight.body}</div>
            <div className="insight-action">
              {insight.actionLabel} <ArrowRight size={12} />
            </div>
          </div>
        ))}
      </div>

      <div className="ai-chat-input">
        <input
          placeholder="Chat with AI..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="ai-chat-send" onClick={() => setMessage("")}>
          <Send size={13} />
        </button>
      </div>
    </div>
  );
}
