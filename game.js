const city = {
  name: "Fairview",
  population: 482000
};

const groups = [
  { id: "young", name: "Young People", share: 21, base: 52 },
  { id: "middle", name: "Middle Class", share: 34, base: 56 },
  { id: "working", name: "Working Class", share: 29, base: 51 },
  { id: "renters", name: "Renters", share: 42, base: 55 },
  { id: "homeowners", name: "Homeowners", share: 48, base: 53 },
  { id: "business", name: "Business Owners", share: 8, base: 48 },
  { id: "progressives", name: "Progressives", share: 37, base: 59 },
  { id: "conservatives", name: "Conservatives", share: 33, base: 42 }
];

const metricDefs = {
  revenue: { label: "Revenue", base: 455, type: "money" },
  expenses: { label: "Expenses", base: 438, type: "money" },
  traffic: { label: "Traffic", base: 62, type: "score", invert: true },
  crime: { label: "Crime", base: 46, type: "score", invert: true },
  housing: { label: "Housing Affordability", base: 43, type: "score" },
  infrastructure: { label: "Infrastructure", base: 49, type: "score" },
  environment: { label: "Environment", base: 51, type: "score" },
  inequality: { label: "Inequality", base: 58, type: "score", invert: true },
  trust: { label: "Public Trust", base: 53, type: "score" },
  approval: { label: "Approval", base: 54, type: "score" }
};

const categories = [
  {
    id: "transportation",
    name: "Transport",
    policies: [
      {
        id: "bus_service",
        name: "Bus Service Funding",
        description: "Frequency, route coverage, shelters, and driver staffing.",
        level: 2,
        metrics: { expenses: 6, traffic: -4, environment: 2, trust: 1 },
        groups: { young: 3, working: 3, renters: 3, homeowners: -1, conservatives: -2 }
      },
      {
        id: "parking_fees",
        name: "Parking Fees",
        description: "Meter prices, garage rates, and permit costs.",
        level: 1,
        metrics: { revenue: 5, traffic: -1, trust: -1 },
        groups: { business: -3, homeowners: -2, conservatives: 1, progressives: 1 }
      },
      {
        id: "bike_lanes",
        name: "Protected Bike Lanes",
        description: "Dedicated lanes and traffic calming on major corridors.",
        level: 1,
        metrics: { expenses: 3, traffic: -2, environment: 3 },
        groups: { young: 4, progressives: 3, homeowners: -2, business: -1, conservatives: -2 }
      }
    ]
  },
  {
    id: "housing",
    name: "Housing",
    policies: [
      {
        id: "upzoning",
        name: "Neighborhood Upzoning",
        description: "Legalize more apartments, duplexes, and mixed-use blocks.",
        level: 1,
        metrics: { revenue: 4, housing: 5, traffic: 1, inequality: -2 },
        groups: { renters: 5, young: 4, progressives: 3, homeowners: -5, conservatives: -3 }
      },
      {
        id: "public_housing",
        name: "Public Housing Program",
        description: "City-built mixed-income housing near transit and services.",
        level: 0,
        metrics: { expenses: 8, housing: 5, inequality: -4, trust: 1 },
        groups: { renters: 5, working: 4, progressives: 5, homeowners: -3, conservatives: -5 }
      },
      {
        id: "rental_inspections",
        name: "Rental Inspections",
        description: "Code enforcement and fines for unsafe rental properties.",
        level: 1,
        metrics: { revenue: 1, expenses: 2, housing: 2, trust: 1 },
        groups: { renters: 4, working: 2, business: -1, conservatives: -1 }
      }
    ]
  },
  {
    id: "safety",
    name: "Safety",
    policies: [
      {
        id: "police_patrols",
        name: "Police Patrol Budget",
        description: "Staffing, overtime, patrol coverage, and precinct resources.",
        level: 2,
        metrics: { expenses: 7, crime: -4, trust: -1 },
        groups: { homeowners: 4, middle: 3, business: 3, conservatives: 4, young: -3, progressives: -4 }
      },
      {
        id: "violence_prevention",
        name: "Violence Prevention",
        description: "Outreach teams, youth programs, victim support, and mediation.",
        level: 1,
        metrics: { expenses: 4, crime: -2, inequality: -1, trust: 2 },
        groups: { young: 4, working: 3, progressives: 4, conservatives: -3 }
      },
      {
        id: "civilian_review",
        name: "Civilian Review Board",
        description: "Independent police misconduct review and public reporting.",
        level: 0,
        metrics: { expenses: 2, trust: 3 },
        groups: { young: 4, progressives: 5, conservatives: -4, homeowners: -1 }
      }
    ]
  },
  {
    id: "taxes",
    name: "Taxes",
    policies: [
      {
        id: "property_tax",
        name: "Property Tax Rate",
        description: "The city's main local tax on land and buildings.",
        level: 1,
        metrics: { revenue: 13, trust: -2 },
        groups: { homeowners: -6, middle: -3, conservatives: -5, progressives: -1 }
      },
      {
        id: "business_tax",
        name: "Business Tax",
        description: "Local taxes and license fees on commercial activity.",
        level: 1,
        metrics: { revenue: 8, trust: -1 },
        groups: { business: -7, conservatives: -3, progressives: 2, working: -1 }
      },
      {
        id: "vacancy_tax",
        name: "Vacancy Tax",
        description: "Penalties for empty storefronts and vacant residential units.",
        level: 0,
        metrics: { revenue: 4, housing: 2, trust: 1 },
        groups: { renters: 3, young: 2, business: -3, homeowners: -2, progressives: 3 }
      }
    ]
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    policies: [
      {
        id: "road_repair",
        name: "Road Repair",
        description: "Potholes, bridges, paving, signs, and traffic signals.",
        level: 1,
        metrics: { expenses: 7, traffic: -2, infrastructure: 4, trust: 1 },
        groups: { middle: 3, homeowners: 3, business: 2, conservatives: -1 }
      },
      {
        id: "water_mains",
        name: "Water Main Replacement",
        description: "Long-term replacement of aging underground water systems.",
        level: 1,
        metrics: { expenses: 8, infrastructure: 5, trust: 2 },
        groups: { homeowners: 3, middle: 2, business: 1, conservatives: -2 }
      },
      {
        id: "parks",
        name: "Parks And Recreation",
        description: "Parks, rec centers, pools, trails, and public spaces.",
        level: 1,
        metrics: { expenses: 4, environment: 2, inequality: -1, trust: 2 },
        groups: { young: 3, working: 2, progressives: 3, conservatives: -1 }
      }
    ]
  }
];

const state = {
  activeCategory: categories[0].id,
  year: 1,
  quarter: 1,
  news: ["Election won. The new administration takes office."]
};

const tabs = document.querySelector("#tabs");
const policyList = document.querySelector("#policyList");
const advanceTurn = document.querySelector("#advanceTurn");

function allPolicies() {
  return categories.flatMap((category) => category.policies);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function signed(value, suffix = "") {
  if (value === 0) return `0${suffix}`;
  return `${value > 0 ? "+" : ""}${value}${suffix}`;
}

function money(value) {
  const prefix = value < 0 ? "-$" : "$";
  return `${prefix}${Math.abs(value)}M`;
}

function calculate() {
  const metrics = {};
  for (const [key, def] of Object.entries(metricDefs)) {
    metrics[key] = def.base;
  }

  const groupSupport = {};
  for (const group of groups) {
    groupSupport[group.id] = group.base;
  }

  for (const policy of allPolicies()) {
    for (const [key, effect] of Object.entries(policy.metrics)) {
      metrics[key] += effect * policy.level;
    }
    for (const [key, effect] of Object.entries(policy.groups)) {
      groupSupport[key] += effect * policy.level;
    }
  }

  const balance = metrics.revenue - metrics.expenses;
  const serviceMood = Math.round((metrics.housing + metrics.infrastructure + metrics.trust - metrics.traffic - metrics.crime - metrics.inequality) / 36);
  const fiscalMood = Math.round(balance / 30);

  for (const group of groups) {
    groupSupport[group.id] = clamp(groupSupport[group.id] + serviceMood + fiscalMood, 0, 100);
  }

  const weighted = groups.reduce((sum, group) => sum + groupSupport[group.id] * group.share, 0);
  const shares = groups.reduce((sum, group) => sum + group.share, 0);
  metrics.approval = clamp(Math.round(weighted / shares), 0, 100);

  for (const [key, def] of Object.entries(metricDefs)) {
    if (def.type === "score") metrics[key] = clamp(metrics[key], 0, 100);
    if (def.type === "money") metrics[key] = Math.max(0, metrics[key]);
  }

  return { metrics, groupSupport, balance };
}

function formatMetric(key, value) {
  const def = metricDefs[key];
  if (def.type === "money") return money(value);
  return `${value}%`;
}

function valueClass(key, value) {
  const def = metricDefs[key];
  if (def.type === "money") return "";
  if (value >= 65) return def.invert ? "negative" : "positive";
  if (value <= 40) return def.invert ? "positive" : "negative";
  return "";
}

function effectClass(key, change) {
  if (change === 0) return "";
  const def = metricDefs[key];
  const good = def.invert ? change < 0 : change > 0;
  return good ? "positive" : "negative";
}

function renderGroups(groupSupport) {
  const groupList = document.querySelector("#groupList");
  groupList.innerHTML = "";

  for (const group of groups) {
    const support = groupSupport[group.id];
    const row = document.createElement("div");
    row.className = "group";
    row.innerHTML = `
      <strong>${group.name}</strong>
      <span class="group-meta">${support}% / ${group.share}%</span>
      <div class="bar"><span style="--value: ${support}%"></span></div>
    `;
    groupList.append(row);
  }
}

function renderMetrics(metrics, balance) {
  const metricsGrid = document.querySelector("#metricsGrid");
  metricsGrid.innerHTML = "";

  for (const [key, def] of Object.entries(metricDefs)) {
    const row = document.createElement("div");
    row.className = "metric";
    row.innerHTML = `
      <span>${def.label}</span>
      <strong class="${valueClass(key, metrics[key])}">${formatMetric(key, metrics[key])}</strong>
    `;
    metricsGrid.append(row);
  }

  document.querySelector("#balanceMetric").textContent = money(balance);
  document.querySelector("#balanceMetric").className = balance >= 0 ? "positive" : "negative";
  document.querySelector("#approvalSummary").textContent = `Approval ${metrics.approval}%`;
}

function renderTabs() {
  tabs.innerHTML = "";
  for (const category of categories) {
    const button = document.createElement("button");
    button.className = "tab";
    button.type = "button";
    button.textContent = category.name;
    button.setAttribute("aria-selected", String(category.id === state.activeCategory));
    button.addEventListener("click", () => {
      state.activeCategory = category.id;
      render();
    });
    tabs.append(button);
  }
}

function renderPolicies() {
  const category = categories.find((item) => item.id === state.activeCategory);
  policyList.innerHTML = "";

  for (const policy of category.policies) {
    const row = document.createElement("article");
    row.className = "policy";
    row.innerHTML = `
      <div class="policy-head">
        <h3>${policy.name}</h3>
        <span class="policy-level">Level ${policy.level}</span>
      </div>
      <p>${policy.description}</p>
      <div class="policy-scale">
        <span>Low</span>
        <input type="range" min="0" max="4" step="1" value="${policy.level}" aria-label="${policy.name}">
        <span>High</span>
      </div>
      <div class="policy-effects">${renderPolicyEffects(policy)}</div>
    `;

    row.querySelector("input").addEventListener("input", (event) => {
      policy.level = Number(event.target.value);
      render();
    });

    policyList.append(row);
  }
}

function renderPolicyEffects(policy) {
  const metricBits = Object.entries(policy.metrics).slice(0, 4).map(([key, effect]) => {
    const suffix = metricDefs[key].type === "money" ? "M" : "%";
    return `<span>${metricDefs[key].label}: <strong class="${effectClass(key, effect)}">${signed(effect, suffix)}/lvl</strong></span>`;
  });
  return metricBits.join("");
}

function renderEffects() {
  const effectsList = document.querySelector("#effectsList");
  const active = allPolicies().filter((policy) => policy.level > 0);
  document.querySelector("#policyCount").textContent = `${active.length} active`;

  if (active.length === 0) {
    effectsList.innerHTML = `<div class="effect-row"><span>No active policies</span><strong>0</strong></div>`;
    return;
  }

  effectsList.innerHTML = active.slice(0, 8).map((policy) => {
    const budget = ((policy.metrics.revenue || 0) - (policy.metrics.expenses || 0)) * policy.level;
    return `
      <div class="effect-row">
        <span>${policy.name}</span>
        <strong class="${budget >= 0 ? "positive" : "negative"}">${signed(budget, "M")}</strong>
      </div>
    `;
  }).join("");
}

function renderNews() {
  document.querySelector("#newsLog").innerHTML = state.news.map((item) => `<p><span>${item}</span></p>`).join("");
}

function advance() {
  const { metrics, balance } = calculate();
  const tone = metrics.approval >= 60 ? "popular" : metrics.approval < 45 ? "under pressure" : "contested";
  state.news.unshift(`Y${state.year} Q${state.quarter}: Administration ${tone}; balance ${money(balance)}.`);
  state.news = state.news.slice(0, 5);

  state.quarter += 1;
  if (state.quarter > 4) {
    state.quarter = 1;
    state.year += 1;
  }
  render();
}

function renderDate() {
  document.querySelector("#termLabel").textContent = `Year ${state.year}`;
  document.querySelector("#quarterLabel").textContent = `Q${state.quarter}`;
}

function render() {
  const result = calculate();
  document.querySelector("#cityName").textContent = city.name;
  document.querySelector("#populationMetric").textContent = city.population.toLocaleString("en-US");
  renderDate();
  renderGroups(result.groupSupport);
  renderMetrics(result.metrics, result.balance);
  renderTabs();
  renderPolicies();
  renderEffects();
  renderNews();
}

advanceTurn.addEventListener("click", advance);
render();
