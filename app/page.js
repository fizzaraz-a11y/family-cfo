"use client";

import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Home() {
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const [authError, setAuthError] = useState("");
      const [authLoading, setAuthLoading] = useState(true);
    useEffect(() => {
          const loadUser = async () => {
                  const { data: { user } } = await supabase.auth.getUser();
                  setUser(user);
                  setAuthLoading(false);
                };
          loadUser();
          const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
                  setUser(session?.user ?? null);
                });
          return () => subscription.unsubscribe();
        }, []);
    const handleLogin = async (e) => {
          e.preventDefault();
          setAuthError("");
          const { error } = await supabase.auth.signInWithPassword({
                  email,
                  password,
                });
          if (error) {
                  setAuthError(error.message);
                }
        };
    if (authLoading) {
          return <div>Loading Family CFO...</div>;
        }
    if (!user) {
          return (
                  <main style={{ padding: "40px", maxWidth: "400px", margin: "0 auto" }}>
          <h1>Welcome to Family CFO</h1>
        <p>Sign in to access your family financial dashboard.</p>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "6px" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
          </div>

          <div style={{ marginBottom: "16px" }}>
            <label
              htmlFor="password"
              style={{ display: "block", marginBottom: "6px" }}
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            />
          </div>

          {authError && (
            <p style={{ color: "crimson", marginBottom: "16px" }}>
              {authError}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "12px",
              border: "0",
              borderRadius: "8px",
              background: "#28312b",
              color: "white",
              cursor: "pointer",
            }}
          >
            Sign in
          </button>
        </form>
      </main>
    );
  }
  
  const stats = [
    { label: "Monthly Income", value: "PKR 250,000", icon: "↗" },
    { label: "Monthly Expenses", value: "PKR 142,500", icon: "↘" },
    { label: "Available", value: "PKR 107,500", icon: "◆" },
    { label: "Savings Goal", value: "PKR 500,000", icon: "◎" },
  ];

  const tabs = ["Overview", "Budget", "Bills", "Savings", "Family"];

  return (
    <main className="page">
      <aside className="sidebar">
        <div className="logo">
          <div className="logoMark">C</div>
          <div>
            <strong>Family CFO</strong>
            <span>Financial command center</span>
          </div>
        </div>

        <nav>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={activeTab === tab ? "navItem active" : "navItem"}
              onClick={() => setActiveTab(tab)}
            >
              <span>
                {tab === "Overview" && "⌂"}
                {tab === "Budget" && "◫"}
                {tab === "Bills" && "▤"}
                {tab === "Savings" && "◎"}
                {tab === "Family" && "♧"}
              </span>
              {tab}
            </button>
          ))}
        </nav>

        <div className="sidebarBottom">
          <div className="familyCard">
            <span className="familyIcon">F</span>
            <div>
              <strong>My Family</strong>
              <small>4 members</small>
            </div>
          </div>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <div>
            <p className="eyebrow">SUNDAY, SEPTEMBER 27, 2026</p>
            <h1>Good evening, Family.</h1>
            <p className="subtitle">
              Here's how your household is doing financially.
            </p>
          </div>

          <button className="profile">F</button>
        </header>

        <section className="hero">
          <div>
            <p className="eyebrow light">THIS MONTH</p>
            <h2>PKR 107,500</h2>
            <p>available after your planned expenses</p>
          </div>

          <div className="heroGoal">
            <span>Savings progress</span>
            <strong>64%</strong>
            <div className="progress">
              <div style={{ width: "64%" }} />
            </div>
          </div>
        </section>

        <section className="stats">
          {stats.map((stat) => (
            <div className="statCard" key={stat.label}>
              <div className="statIcon">{stat.icon}</div>
              <div>
                <p>{stat.label}</p>
                <strong>{stat.value}</strong>
              </div>
            </div>
          ))}
        </section>

        <section className="grid">
          <div className="panel spending">
            <div className="panelHeader">
              <div>
                <p className="eyebrow">SPENDING</p>
                <h3>Where your money goes</h3>
              </div>
              <button className="smallButton">This month⌄</button>
            </div>

            <div className="spendingBody">
              <div className="donut">
                <div>
                  <strong>142.5k</strong>
                  <span>spent</span>
                </div>
              </div>

              <div className="legend">
                <div>
                  <span className="dot housing" />
                  <span>Housing</span>
                  <strong>35%</strong>
                </div>
                <div>
                  <span className="dot food" />
                  <span>Food</span>
                  <strong>24%</strong>
                </div>
                <div>
                  <span className="dot bills" />
                  <span>Bills</span>
                  <strong>18%</strong>
                </div>
                <div>
                  <span className="dot other" />
                  <span>Other</span>
                  <strong>23%</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="panel bills">
            <div className="panelHeader">
              <div>
                <p className="eyebrow">UPCOMING</p>
                <h3>Next bills</h3>
              </div>
              <button className="linkButton">View all →</button>
            </div>

            <div className="bill">
              <div className="billIcon">⌂</div>
              <div>
                <strong>Home Rent</strong>
                <span>Due Oct 1</span>
              </div>
              <b>PKR 45,000</b>
            </div>

            <div className="bill">
              <div className="billIcon">⚡</div>
              <div>
                <strong>Electricity</strong>
                <span>Due Oct 5</span>
              </div>
              <b>PKR 12,800</b>
            </div>

            <div className="bill">
              <div className="billIcon">⌁</div>
              <div>
                <strong>Internet</strong>
                <span>Due Oct 8</span>
              </div>
              <b>PKR 4,500</b>
            </div>
          </div>
        </section>

        <section className="insight">
          <div className="spark">✦</div>
          <div>
            <p className="eyebrow">FAMILY CFO INSIGHT</p>
            <h3>You are spending within your planned budget.</h3>
            <p>
              Your household has PKR 107,500 available after planned expenses.
              Keep your current pace to stay on track with your savings goal.
            </p>
          </div>
          <button>View analysis →</button>
        </section>
      </section>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;
          background: #f6f4ef;
          color: #25231f;
          display: flex;
          font-family: Arial, Helvetica, sans-serif;
        }

        .sidebar {
          width: 250px;
          background: #1f2521;
          color: #fff;
          padding: 28px 18px;
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .logo {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 10px 38px;
        }

        .logoMark {
          width: 38px;
          height: 38px;
          border: 1px solid #d7d0bd;
          border-radius: 12px;
          display: grid;
          place-items: center;
          color: #d7d0bd;
          font-size: 20px;
        }

        .logo strong,
        .logo span {
          display: block;
        }

        .logo strong {
          font-size: 15px;
        }

        .logo span {
          color: #a8ada7;
          font-size: 10px;
          margin-top: 3px;
        }

        nav {
          display: grid;
          gap: 7px;
        }

        .navItem {
          border: 0;
          background: transparent;
          color: #aeb3ae;
          padding: 13px 14px;
          border-radius: 10px;
          text-align: left;
          cursor: pointer;
          font-size: 14px;
          display: flex;
          gap: 13px;
          align-items: center;
        }

        .navItem span {
          width: 20px;
          text-align: center;
        }

        .navItem.active,
        .navItem:hover {
          background: #303832;
          color: #fff;
        }

        .sidebarBottom {
          margin-top: auto;
        }

        .familyCard {
          background: #303832;
          border-radius: 13px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .familyIcon {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #d7d0bd;
          color: #273029;
          display: grid;
          place-items: center;
          font-weight: bold;
        }

        .familyCard strong,
        .familyCard small {
          display: block;
        }

        .familyCard small {
          color: #9da39d;
          margin-top: 3px;
        }

        .content {
          width: 100%;
          max-width: 1500px;
          padding: 46px 6%;
        }

        .topbar {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .eyebrow {
          color: #85877f;
          font-size: 10px;
          letter-spacing: 1.7px;
          margin: 0 0 8px;
          font-weight: bold;
        }

        h1,
        h2,
        h3,
        p {
          margin-top: 0;
        }

        h1 {
          font-family: Georgia, serif;
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 400;
          margin-bottom: 8px;
        }

        .subtitle {
          color: #77766f;
          margin-bottom: 35px;
        }

        .profile {
          border: 0;
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #d7d0bd;
          font-weight: bold;
          color: #28302a;
        }

        .hero {
          background: #28312b;
          color: white;
          border-radius: 20px;
          padding: 30px 34px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 18px;
        }

        .light {
          color: #bfc5be;
        }

        .hero h2 {
          font-family: Georgia, serif;
          font-size: 42px;
          font-weight: 400;
          margin-bottom: 6px;
        }

        .hero p {
          color: #bfc5be;
          margin-bottom: 0;
        }

        .heroGoal {
          width: 260px;
        }

        .heroGoal span,
        .heroGoal strong {
          font-size: 12px;
        }

        .heroGoal strong {
          float: right;
        }

        .progress {
          height: 7px;
          background: #4b554d;
          border-radius: 20px;
          margin-top: 12px;
          overflow: hidden;
        }

        .progress div {
          height: 100%;
          background: #d7d0bd;
          border-radius: inherit;
        }

        .stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 14px;
          margin-bottom: 18px;
        }

        .statCard,
        .panel,
        .insight {
          background: #fff;
          border: 1px solid #e8e4db;
          border-radius: 17px;
        }

        .statCard {
          padding: 20px;
          display: flex;
          gap: 14px;
          align-items: center;
        }

        .statIcon {
          width: 38px;
          height: 38px;
          border-radius: 11px;
          background: #f0ede5;
          display: grid;
          place-items: center;
        }

        .statCard p {
          color: #85837c;
          font-size: 11px;
          margin-bottom: 5px;
        }

        .statCard strong {
          font-size: 17px;
        }

        .grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 18px;
        }

        .panel {
          padding: 25px;
        }

        .panelHeader {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        h3 {
          font-family: Georgia, serif;
          font-size: 21px;
          font-weight: 400;
          margin-bottom: 0;
        }

        .smallButton,
        .linkButton {
          border: 1px solid #ddd8cd;
          background: #faf9f6;
          padding: 8px 11px;
          border-radius: 8px;
          cursor: pointer;
          color: #5c5b55;
        }

        .linkButton {
          border: 0;
          background: transparent;
        }

        .spendingBody {
          display: flex;
          align-items: center;
          gap: 45px;
          padding: 25px 5px 5px;
        }

        .donut {
          width: 155px;
          height: 155px;
          border-radius: 50%;
          background: conic-gradient(
            #687469 0 35%,
            #a7a08e 35% 59%,
            #c9c3b4 59% 77%,
            #e4e0d7 77% 100%
          );
          display: grid;
          place-items: center;
        }

        .donut::after {
          content: "";
          position: absolute;
        }

        .donut > div {
          width: 105px;
          height: 105px;
          border-radius: 50%;
          background: white;
          display: grid;
          place-content: center;
          text-align: center;
        }

        .donut strong,
        .donut span {
          display: block;
        }

        .donut span {
          color: #8a8880;
          font-size: 10px;
          margin-top: 3px;
        }

        .legend {
          flex: 1;
        }

        .legend div {
          display: grid;
          grid-template-columns: 10px 1fr auto;
          align-items: center;
          gap: 9px;
          margin: 12px 0;
          font-size: 12px;
        }

        .legend strong {
          font-size: 11px;
        }

        .dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }

        .housing { background: #687469; }
        .food { background: #a7a08e; }
        .bills { background: #c9c3b4; }
        .other { background: #e4e0d7; }

        .bill {
          display: grid;
          grid-template-columns: 40px 1fr auto;
          gap: 12px;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #eeeae2;
        }

        .bill:last-child {
          border-bottom: 0;
        }

        .billIcon {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          background: #f0ede5;
          display: grid;
          place-items: center;
        }

        .bill strong,
        .bill span {
          display: block;
        }

        .bill strong {
          font-size: 13px;
        }

        .bill span {
          color: #919087;
          font-size: 10px;
          margin-top: 4px;
        }

        .bill b {
          font-size: 12px;
        }

        .insight {
          margin-top: 18px;
          padding: 23px;
          display: flex;
          align-items: center;
          gap: 17px;
          background: #eeece4;
        }

        .spark {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #28312b;
          color: #d7d0bd;
          display: grid;
          place-items: center;
          flex: 0 0 auto;
        }

        .insight h3 {
          font-size: 17px;
          margin-bottom: 5px;
        }

        .insight p:last-child {
          color: #76756e;
          font-size: 12px;
          line-height: 1.5;
          margin-bottom: 0;
        }

        .insight button {
          margin-left: auto;
          border: 0;
          background: transparent;
          font-weight: bold;
          cursor: pointer;
          white-space: nowrap;
        }

        @media (max-width: 900px) {
          .sidebar {
            width: 75px;
            padding: 22px 10px;
          }

          .logo > div:last-child,
          .navItem:not(.active)::after,
          .familyCard div {
            display: none;
          }

          .logo {
            justify-content: center;
            padding-left: 0;
            padding-right: 0;
          }

          .navItem {
            justify-content: center;
          }

          .navItem span {
            width: auto;
          }

          .content {
            padding: 30px 4%;
          }

          .stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 600px) {
          .hero {
            display: block;
          }

          .heroGoal {
            width: 100%;
            margin-top: 25px;
          }

          .stats {
            grid-template-columns: 1fr;
          }

          .spendingBody {
            gap: 20px;
          }

          .donut {
            width: 120px;
            height: 120px;
          }

          .donut > div {
            width: 82px;
            height: 82px;
          }

          .insight {
            align-items: flex-start;
          }

          .insight button {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
