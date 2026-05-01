const categories = [
  {
    id: "transportation",
    name: "Transportation",
    policies: [
      {
        id: "bus_frequency",
        name: "Frequent Bus Network",
        description: "Adds high-frequency service on core routes and reduces commute frustration.",
        income: 2,
        expenses: 18,
        approval: 7,
        pressures: { commuters: 12, homeowners: -3, business: 4, youth: 5 }
      },
      {
        id: "parking_meter",
        name: "Dynamic Parking Meters",
        description: "Raises curb prices in busy districts and turns parking into steady revenue.",
        income: 16,
        expenses: 2,
        approval: -5,
        pressures: { commuters: -8, homeowners: -4, business: -3, fiscal: 9 }
      },
      {
        id: "bike_lanes",
        name: "Protected Bike Grid",
        description: "Builds safer corridors for short trips while reallocating some street space.",
        income: 0,
        expenses: 8,
        approval: 3,
        pressures: { commuters: 5, homeowners: -2, youth: 9, business: -2 }
      }
    ]
  },
  {
    id: "safety",
    name: "Community Safety",
    policies: [
      {
        id: "foot_patrols",
        name: "Downtown Foot Patrols",
        description: "Moves officers onto visible walking beats in commercial and nightlife areas.",
        income: 0,
        expenses: 14,
        approval: 4,
        pressures: { business: 9, homeowners: 5, youth: -4, commuters: 2 }
      },
      {
        id: "violence_interruption",
        name: "Violence Interruption Teams",
        description: "Funds outreach teams to mediate conflicts before they become emergencies.",
        income: 0,
        expenses: 10,
        approval: 6,
        pressures: { youth: 8, commuters: 2, fiscal: -4, homeowners: 1 }
      },
      {
        id: "civilian_review",
        name: "Civilian Review Board",
        description: "Creates independent review for misconduct complaints and use-of-force cases.",
        income: 0,
        expenses: 4,
        approval: 2,
        pressures: { youth: 7, fiscal: -2, homeowners: -3, business: -1 }
      }
    ]
  },
  {
    id: "taxes",
    name: "Taxes",
    policies: [
      {
        id: "property_tax",
        name: "Property Tax Increase",
        description: "Raises recurring revenue while putting pressure on homeowners and landlords.",
        income: 34,
        expenses: 0,
        approval: -9,
        pressures: { fiscal: 10, homeowners: -16, business: -4, commuters: -2 }
      },
      {
        id: "business_incentives",
        name: "Small Business Credits",
        description: "Cuts selected taxes for local shops to support hiring and storefront survival.",
        income: -14,
        expenses: 3,
        approval: 4,
        pressures: { business: 15, fiscal: -9, homeowners: 1, commuters: 2 }
      },
      {
        id: "vacancy_tax",
        name: "Vacant Property Tax",
        description: "Charges owners who keep commercial or residential buildings empty.",
        income: 13,
        expenses: 2,
        approval: 5,
        pressures: { homeowners: -5, business: -3, youth: 8, fiscal: 8 }
      }
    ]
  },
  {
    id: "infrastructure",
    name: "Infrastructure",
    policies: [
      {
        id: "road_repair",
        name: "Road Repair Surge",
        description: "Accelerates resurfacing, bridge inspections, and pothole response.",
        income: 0,
        expenses: 22,
        approval: 8,
        pressures: { commuters: 10, business: 5, homeowners: 4, fiscal: -7 }
      },
      {
        id: "water_upgrade",
        name: "Water Main Replacement",
        description: "Replaces aging pipes and reduces the risk of emergency shutdowns.",
        income: 0,
        expenses: 20,
        approval: 5,
        pressures: { homeowners: 6, business: 3, fiscal: -8, youth: 1 }
      },
      {
        id: "smart_permits",
        name: "Online Permit Office",
        description: "Speeds up construction and licensing by modernizing city paperwork.",
        income: 6,
        expenses: 7,
        approval: 4,
        pressures: { business: 11, fiscal: 1, homeowners: -1, commuters: 1 }
      }
    ]
  },
  {
    id: "housing",
    name: "Housing",
    policies: [
      {
        id: "public_housing",
        name: "Public Housing Fund",
        description: "Builds mixed-income city-owned homes near transit and services.",
        income: 0,
        expenses: 24,
        approval: 6,
        pressures: { youth: 12, homeowners: -8, fiscal: -9, commuters: 4 }
      },
      {
        id: "upzoning",
        name: "Gentle Upzoning",
        description: "Allows duplexes, small apartments, and corner stores in more neighborhoods.",
        income: 8,
        expenses: 3,
        approval: 1,
        pressures: { youth: 10, homeowners: -12, business: 5, fiscal: 4 }
      },
      {
        id: "rental_inspection",
        name: "Rental Inspection Unit",
        description: "Inspects neglected rentals and fines repeat code violators.",
        income: 5,
        expenses: 6,
        approval: 3,
        pressures: { youth: 8, homeowners: -4, fiscal: 2, business: -2 }
      }
    ]
  }
];

const base = {
  income: 455,
  expenses: 438,
  approval: 54,
  pressures: {
    commuters: 52,
    homeowners: 50,
    business: 51,
    youth: 48,
    fiscal: 55
  }
};

const groupLabels = {
  commuters: "Commuters",
  homeowners: "Homeowners",
  business: "Business Owners",
  youth: "Young Residents",
  fiscal: "Budget Hawks"
};

const state = {
  activeCategory: categories[0].id,
  enabled: new Set(["smart_permits"]),
  month: 0,
  year: 1
};

const tabs = document.querySelector("#tabs");
const policyList = document.querySelector("#policyList");
const advanceTurn = document.querySelector("#advanceTurn");

const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function allPolicies() {
  return categories.flatMap((category) => category.policies);
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function calculateCity() {
  const totals = {
    income: base.income,
    expenses: base.expenses,
    approval: base.approval,
    pressures: { ...base.pressures }
  };

  for (const policy of allPolicies()) {
    if (!state.enabled.has(policy.id)) continue;
    totals.income += policy.income;
    totals.expenses += policy.expenses;
    totals.approval += policy.approval;

    for (const [group, change] of Object.entries(policy.pressures)) {
      totals.pressures[group] = clamp(totals.pressures[group] + change, 0, 100);
    }
  }

  const balance = totals.income - totals.expenses;
  totals.approval = clamp(
    totals.approval + Math.round(balance / 18) + approvalFromGroups(totals.pressures),
    0,
    100
  );
  totals.balance = balance;

  return totals;
}

function approvalFromGroups(pressures) {
  const values = Object.values(pressures);
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  return Math.round((average - 50) / 4);
}

function money(value) {
  const prefix = value < 0 ? "-$" : "$";
  return `${prefix}${Math.abs(value)}M`;
}

function signedMoney(value) {
  if (value === 0) return "$0M / yr";
  return `${value > 0 ? "+" : "-"}$${Math.abs(value)}M / yr`;
}

function signedPercent(value) {
  if (value === 0) return "0";
  return value > 0 ? `+${value}` : `${value}`;
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

    const toggle = document.createElement("button");
    toggle.className = "toggle";
    toggle.type = "button";
    toggle.textContent = state.enabled.has(policy.id) ? "Enabled" : "Disabled";
    toggle.setAttribute("aria-pressed", String(state.enabled.has(policy.id)));
    toggle.addEventListener("click", () => {
      if (state.enabled.has(policy.id)) {
        state.enabled.delete(policy.id);
      } else {
        state.enabled.add(policy.id);
      }
      render();
    });

    const copy = document.createElement("div");
    copy.innerHTML = `
      <h3>${policy.name}</h3>
      <p>${policy.description}</p>
    `;

    const meta = document.createElement("div");
    meta.className = "policy-meta";
    meta.innerHTML = `
      <span>Income <strong class="${policy.income >= 0 ? "positive" : "negative"}">${signedMoney(policy.income)}</strong></span>
      <span>Expense <strong class="${policy.expenses > 0 ? "negative" : "positive"}">${signedMoney(policy.expenses)}</strong></span>
      <span>Approval <strong class="${policy.approval >= 0 ? "positive" : "negative"}">${signedPercent(policy.approval)}</strong></span>
    `;

    row.append(toggle, copy, meta);
    policyList.append(row);
  }
}

function renderMetrics() {
  const totals = calculateCity();
  const incomeDelta = totals.income - base.income;
  const expensesDelta = totals.expenses - base.expenses;

  document.querySelector("#incomeMetric").textContent = money(totals.income);
  document.querySelector("#expensesMetric").textContent = money(totals.expenses);
  document.querySelector("#approvalMetric").textContent = `${totals.approval}%`;
  document.querySelector("#balanceMetric").textContent = money(totals.balance);
  document.querySelector("#incomeDelta").textContent = signedMoney(incomeDelta);
  document.querySelector("#expensesDelta").textContent = signedMoney(expensesDelta);
  document.querySelector("#monthLabel").textContent = monthNames[state.month];
  document.querySelector("#termLabel").textContent = `Year ${state.year}`;

  const balanceMetric = document.querySelector("#balanceMetric");
  balanceMetric.className = totals.balance >= 0 ? "positive" : "negative";

  const mood = document.querySelector("#approvalMood");
  if (totals.approval >= 65) {
    mood.textContent = "Popular";
    mood.className = "positive";
  } else if (totals.approval >= 45) {
    mood.textContent = "Contested";
    mood.className = "warning";
  } else {
    mood.textContent = "At Risk";
    mood.className = "negative";
  }

  renderPressures(totals.pressures);
}

function renderPressures(pressures) {
  const pressureList = document.querySelector("#pressureList");
  pressureList.innerHTML = "";

  for (const [group, value] of Object.entries(pressures)) {
    const row = document.createElement("div");
    row.className = "pressure";
    row.innerHTML = `
      <span>${groupLabels[group]}</span>
      <strong>${value}%</strong>
      <div class="bar"><span style="--value: ${value}%"></span></div>
    `;
    pressureList.append(row);
  }
}

function advanceMonth() {
  state.month += 1;
  if (state.month > 11) {
    state.month = 0;
    state.year += 1;
  }

  const totals = calculateCity();
  if (totals.balance < -20) {
    base.approval = clamp(base.approval - 1, 0, 100);
  } else if (totals.balance > 20) {
    base.approval = clamp(base.approval + 1, 0, 100);
  }

  render();
}

function render() {
  renderTabs();
  renderPolicies();
  renderMetrics();
}

advanceTurn.addEventListener("click", advanceMonth);
render();
