import { useEffect, useState } from "react";
import axios from "axios";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

function App() {
  const [stats, setStats] = useState(null);
const [features, setFeatures] = useState(["", "", "", "", ""]);
const [latestResult, setLatestResult] = useState(null);
  const fetchStats = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/stats");
      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };
const runPrediction = async () => {
  try {

    const payload = {
      features: [
        Number(features[0] || 0),
        Number(features[1] || 0),
        Number(features[2] || 0),
        Number(features[3] || 0),
        Number(features[4] || 0)
      ]
    };

    const res = await axios.post(
      "http://127.0.0.1:8000/shadow-predict",
      payload
    );

    setLatestResult(res.data);

    fetchStats();

  } catch (err) {
    console.log(err);
  }
};

const generateRandom = () => {

  const randomValues = Array.from(
    { length: 5 },
    () => Math.floor(Math.random() * 100)
  );

  setFeatures(randomValues);
};
  useEffect(() => {
    fetchStats();

    const interval = setInterval(fetchStats, 2000);

    return () => clearInterval(interval);
  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const chartData = stats.recent_comparisons.map((item, index) => ({
    request: index + 1,
    value: item.agreed ? 0 : 100,
  }));

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      {/* HERO SECTION */}

      <div className="mb-10">
        <h1 className="text-6xl font-extrabold text-blue-500">
          ShadowDeploy
        </h1>

        <p className="text-slate-400 text-lg mt-3">
          Real-Time Shadow Deployment Monitoring Platform
        </p>

        <p className="text-slate-500 mt-2">
          Compare Production and Candidate Models Without Affecting Users
        </p>
      </div>
<div className="bg-slate-900 rounded-2xl p-6 mb-8">

  <h2 className="text-2xl font-bold mb-2">
  Banking Transaction Simulator
</h2>

<p className="text-slate-400 mb-5">
  Compare Production and Candidate Fraud Detection Models
</p>

  <div className="grid grid-cols-5 gap-3">

  <input
    type="number"
    value={features[0]}
    placeholder="Transaction Amount (₹)"
    onChange={(e) => {
      const updated = [...features];
      updated[0] = e.target.value;
      setFeatures(updated);
    }}
    className="bg-slate-800 rounded-lg p-3 outline-none border border-slate-700"
  />

  <input
    type="number"
    value={features[1]}
    placeholder="Account Age (Months)"
    onChange={(e) => {
      const updated = [...features];
      updated[1] = e.target.value;
      setFeatures(updated);
    }}
    className="bg-slate-800 rounded-lg p-3 outline-none border border-slate-700"
  />

  <input
    type="number"
    value={features[2]}
    placeholder="Failed Login Attempts"
    onChange={(e) => {
      const updated = [...features];
      updated[2] = e.target.value;
      setFeatures(updated);
    }}
    className="bg-slate-800 rounded-lg p-3 outline-none border border-slate-700"
  />

  <input
    type="number"
    value={features[3]}
    placeholder="Location Risk Score (0-100)"
    onChange={(e) => {
      const updated = [...features];
      updated[3] = e.target.value;
      setFeatures(updated);
    }}
    className="bg-slate-800 rounded-lg p-3 outline-none border border-slate-700"
  />

  <input
    type="number"
    value={features[4]}
    placeholder="Device Trust Score (0-100)"
    onChange={(e) => {
      const updated = [...features];
      updated[4] = e.target.value;
      setFeatures(updated);
    }}
    className="bg-slate-800 rounded-lg p-3 outline-none border border-slate-700"
  />

</div>

  <div className="flex gap-3 mt-5">

    <button
      onClick={generateRandom}
      className="bg-slate-700 px-5 py-3 rounded-xl font-bold"
    >
      Random Data
    </button>

    <button
      onClick={runPrediction}
      className="bg-blue-500 px-5 py-3 rounded-xl font-bold hover:bg-blue-600"
    >
      Run Prediction
    </button>

  </div>

</div>
{latestResult && (

<div className="bg-slate-900 rounded-2xl p-6 mb-8">

  <h2 className="text-2xl font-bold mb-5">
    Latest Prediction
  </h2>

  <div className="grid grid-cols-3 gap-6">

    <div>
      <p className="text-slate-400">
        Production Model
      </p>

      <p className="text-4xl font-bold mt-2">
       {
  latestResult.shown_to_user.prediction === 1
    ? "🚨 FRAUD"
    : "✅ SAFE"
} 
      </p>
    </div>

    <div>
      <p className="text-slate-400">
        Candidate Model
      </p>

      <p className="text-4xl font-bold mt-2">
        {
  latestResult.shadow_model.prediction === 1
    ? "🚨 FRAUD"
    : "✅ SAFE"
}
      </p>
    </div>

    <div>
      <p className="text-slate-400">
        Agreement
      </p>

      <p className="text-3xl font-bold mt-2">
        {latestResult.agreed
          ? "✅ AGREED"
          : "❌ DISAGREED"}
      </p>
    </div>

  </div>

</div>

)}
      {/* STATS CARDS */}

      <div className="grid grid-cols-4 gap-4 mb-8">

        <div className="bg-slate-900 border border-slate-800 hover:border-blue-500 transition rounded-2xl p-5">
          <p className="text-slate-400">Total Requests</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.total_requests}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 hover:border-blue-500 transition rounded-2xl p-5">
          <p className="text-slate-400">Disagreements</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.disagreements}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 hover:border-blue-500 transition rounded-2xl p-5">
          <p className="text-slate-400">Rate %</p>
          <h2 className="text-4xl font-bold mt-2">
            {stats.disagreement_rate.toFixed(1)}
          </h2>
        </div>

        <div className="bg-slate-900 border border-slate-800 hover:border-blue-500 transition rounded-2xl p-5">
          <p className="text-slate-400">V2 Status</p>

          <span
            className={`inline-block mt-3 px-4 py-2 rounded-full font-bold ${
              stats.v2_status === "FLAGGED"
                ? "bg-red-500/20 text-red-400"
                : "bg-green-500/20 text-green-400"
            }`}
          >
            {stats.v2_status}
          </span>
        </div>

      </div>

      {/* SERVICE HEALTH */}

      <div className="grid grid-cols-3 gap-4 mb-8">

        <div className="bg-slate-900 rounded-2xl p-5">
          <p className="text-slate-400">Router Service</p>
          <p className="text-green-400 text-xl font-bold">
            🟢 RUNNING
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5">
          <p className="text-slate-400">Model V1</p>
          <p className="text-green-400 text-xl font-bold">
            🟢 HEALTHY
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5">
          <p className="text-slate-400">Model V2</p>
          <p className="text-green-400 text-xl font-bold">
            🟢 HEALTHY
          </p>
        </div>

      </div>

      {/* CHART + ACTIVITY */}

      <div className="grid grid-cols-2 gap-6 mb-8">

        <div className="bg-slate-900 rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-4">
            Disagreement Trend
          </h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={chartData}>
              <XAxis dataKey="request" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#3b82f6"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-slate-900 rounded-2xl p-5">
          <h2 className="text-xl font-bold mb-4">
            Recent Activity
          </h2>

          <div className="space-y-3">

            {stats.recent_comparisons
              .slice()
              .reverse()
              .slice(0, 5)
              .map((item) => (

              <div
                key={item.request_id}
                className="border border-slate-800 rounded-xl p-3"
              >
                <p className="text-red-400">
                  Disagreement detected
                </p>

                <p className="text-sm text-slate-400">
                  Request {item.request_id}
                </p>
              </div>

            ))}

          </div>
        </div>

      </div>

      {/* ARCHITECTURE */}

      <div className="bg-slate-900 rounded-2xl p-6 mb-8">

        <h2 className="text-xl font-bold mb-6">
          System Architecture
        </h2>

        <div className="text-center">

          <div className="inline-block bg-blue-500 px-6 py-3 rounded-xl font-bold">
            Router :8000
          </div>

          <div className="flex justify-center gap-20 mt-8">

            <div className="bg-slate-800 px-6 py-3 rounded-xl">
              Model V1 :8001
            </div>

            <div className="bg-slate-800 px-6 py-3 rounded-xl">
              Model V2 :8002
            </div>

          </div>

          <p className="mt-6 text-slate-400">
            Production Model vs Candidate Model Comparison
          </p>

        </div>

      </div>

      {/* TABLE */}

      <div className="bg-slate-900 rounded-2xl p-5">

        <h2 className="text-xl font-bold mb-4">
          Recent Comparisons
        </h2>

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-800 text-slate-400">
              <th className="text-left p-3">Request ID</th>
              <th className="text-left p-3">V1</th>
              <th className="text-left p-3">V2</th>
              <th className="text-left p-3">Status</th>
            </tr>

          </thead>

          <tbody>

            {stats.recent_comparisons
              .slice()
              .reverse()
              .map((item) => (

              <tr
                key={item.request_id}
                className="border-b border-slate-800"
              >
                <td className="p-3">{item.request_id}</td>
                <td className="p-3">{item.v1_prediction}</td>
                <td className="p-3">{item.v2_prediction}</td>

                <td className="p-3">
                  {item.agreed ? (
                    <span className="text-green-400">
                      ✅ AGREED
                    </span>
                  ) : (
                    <span className="text-red-400">
                      ❌ DISAGREED
                    </span>
                  )}
                </td>
              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* FOOTER */}

      <div className="mt-10 text-center text-slate-500">
        ShadowDeploy v1.0 • Built with React, FastAPI and Machine Learning
      </div>

    </div>
  );
}

export default App;