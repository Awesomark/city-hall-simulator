const city = {
  name: "Fairview",
  population: 482000
};

const groups = [
  { id: "young", name: "Young People", share: 21, support: 54 },
  { id: "middle", name: "Middle Class", share: 34, support: 58 },
  { id: "working", name: "Working Class", share: 29, support: 51 },
  { id: "democrats", name: "Democrats", share: 46, support: 62 },
  { id: "republicans", name: "Republicans", share: 31, support: 39 },
  { id: "renters", name: "Renters", share: 42, support: 55 },
  { id: "homeowners", name: "Homeowners", share: 48, support: 52 },
  { id: "business", name: "Business Owners", share: 8, support: 47 }
];

const metrics = {
  revenue: { label: "Revenue", value: 455, type: "money" },
  expenses: { label: "Expenses", value: 438, type: "money" },
  traffic: { label: "Traffic", value: 63, type: "score", invert: true },
  safety: { label: "Safety", value: 57, type: "score" },
  housing: { label: "Housing", value: 42, type: "score" },
  infrastructure: { label: "Infrastructure", value: 49, type: "score" },
  environment: { label: "Environment", value: 51, type: "score" },
  trust: { label: "Public Trust", value: 53, type: "score" },
  approval: { label: "Approval", value: 54, type: "score" }
};

const questions = [
  {
    dept: "Transportation",
    title: "Downtown traffic is getting worse.",
    text: "Commuters want faster trips, businesses want customers to reach storefronts, and neighborhood groups are angry about overflow parking.",
    choices: [
      {
        title: "Expand bus frequency",
        text: "Put more buses on the busiest corridors and add late service.",
        metrics: { expenses: 15, traffic: -8, environment: 4, trust: 2 },
        groups: { young: 8, working: 6, democrats: 5, business: 2, republicans: -3 }
      },
      {
        title: "Raise parking meter prices",
        text: "Charge more for curb space downtown and use the revenue for street maintenance.",
        metrics: { revenue: 14, traffic: -3, infrastructure: 2, trust: -3 },
        groups: { business: -7, homeowners: -4, republicans: 3, middle: -2 }
      },
      {
        title: "Delay action",
        text: "Ask staff for another study and avoid a fight this month.",
        metrics: { traffic: 4, trust: -4 },
        groups: { middle: -3, business: -2, young: -2 }
      }
    ]
  },
  {
    dept: "Housing",
    title: "Rents are rising faster than wages.",
    text: "Tenant groups are demanding emergency action while homeowners warn that rapid construction could change neighborhood character.",
    choices: [
      {
        title: "Allow more apartments near transit",
        text: "Legalize small apartment buildings and mixed-use lots around major stops.",
        metrics: { revenue: 8, expenses: 3, housing: 9, traffic: -2, trust: 1 },
        groups: { renters: 9, young: 8, democrats: 5, homeowners: -10, republicans: -4 }
      },
      {
        title: "Fund rental assistance",
        text: "Use city funds to keep vulnerable tenants housed this year.",
        metrics: { expenses: 18, housing: 7, trust: 4 },
        groups: { renters: 10, working: 7, democrats: 6, business: -2, republicans: -6 }
      },
      {
        title: "Protect single-family zoning",
        text: "Promise no broad zoning changes and focus on preserving existing neighborhoods.",
        metrics: { housing: -6, trust: -1 },
        groups: { homeowners: 8, republicans: 6, renters: -8, young: -7, democrats: -4 }
      }
    ]
  },
  {
    dept: "Community Safety",
    title: "A late-night shooting has shaken the east side.",
    text: "Residents want action quickly, but there is disagreement over whether the city should focus on patrols or prevention.",
    choices: [
      {
        title: "Increase patrols",
        text: "Fund overtime and visible patrols in the affected district.",
        metrics: { expenses: 12, safety: 7, trust: -1 },
        groups: { homeowners: 6, middle: 4, business: 5, young: -5, democrats: -2, republicans: 7 }
      },
      {
        title: "Fund violence interruption",
        text: "Back outreach workers, victim services, and conflict mediation.",
        metrics: { expenses: 9, safety: 4, trust: 4 },
        groups: { young: 7, working: 5, democrats: 7, homeowners: -2, republicans: -5 }
      },
      {
        title: "Hold a listening session",
        text: "Meet with residents and promise a public safety plan next month.",
        metrics: { safety: -2, trust: 2 },
        groups: { democrats: 2, homeowners: -3, business: -3, republicans: -4 }
      }
    ]
  },
  {
    dept: "Budget",
    title: "The finance director warns of a deficit.",
    text: "The city can cover this year, but next year's budget will be painful unless revenue rises or spending slows.",
    choices: [
      {
        title: "Raise property taxes",
        text: "Increase the rate and protect core services.",
        metrics: { revenue: 28, trust: -5 },
        groups: { homeowners: -12, middle: -7, republicans: -9, democrats: -2, working: -3 }
      },
      {
        title: "Freeze hiring",
        text: "Hold open positions vacant in most departments.",
        metrics: { expenses: -18, safety: -2, infrastructure: -3, trust: -2 },
        groups: { republicans: 6, business: 3, democrats: -5, working: -4 }
      },
      {
        title: "Use reserves",
        text: "Avoid immediate pain and spend part of the rainy-day fund.",
        metrics: { trust: 1, infrastructure: -1 },
        groups: { middle: 2, homeowners: 2, republicans: -3 }
      }
    ]
  },
  {
    dept: "Infrastructure",
    title: "A water main break closes three blocks.",
    text: "The public works department says this is part of a larger replacement backlog that cannot be ignored much longer.",
    choices: [
      {
        title: "Launch a replacement program",
        text: "Borrow for a multi-year water and road repair package.",
        metrics: { expenses: 24, infrastructure: 10, trust: 5, traffic: 2 },
        groups: { homeowners: 6, middle: 5, business: 4, republicans: -4 }
      },
      {
        title: "Patch the break only",
        text: "Repair the immediate damage and keep the capital budget unchanged.",
        metrics: { expenses: 4, infrastructure: -3, trust: -3 },
        groups: { republicans: 3, homeowners: -4, business: -4 }
      },
      {
        title: "Apply for state grants",
        text: "Delay major work while seeking outside funding.",
        metrics: { expenses: 2, infrastructure: 1, trust: -1 },
        groups: { middle: 1, business: -2, working: -2 }
      }
    ]
  }
];

const state = {
  turn: 1,
  month: 0,
  year: 1,
  questionIndex: 0,
  log: []
};

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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function formatPopulation(value) {
  return value.toLocaleString("en-US");
}

function formatMetric(metric) {
  if (metric.type === "money") return `$${metric.value}M`;
  return `${metric.value}%`;
}

function signed(value, suffix = "") {
  if (value === 0) return `0${suffix}`;
  return `${value > 0 ? "+" : ""}${value}${suffix}`;
}

function metricClass(key, change) {
  if (change === 0) return "";
  const metric = metrics[key];
  const good = metric.invert ? change < 0 : change > 0;
  return good ? "positive" : "negative";
}

function applyChoice(choice) {
  for (const [key, change] of Object.entries(choice.metrics || {})) {
    const metric = metrics[key];
    metric.value += change;
    if (metric.type === "score") {
      metric.value = clamp(metric.value, 0, 100);
    } else {
      metric.value = Math.max(0, metric.value);
    }
  }

  for (const [groupId, change] of Object.entries(choice.groups || {})) {
    const group = groups.find((item) => item.id === groupId);
    group.support = clamp(group.support + change, 0, 100);
  }

  recalculateApproval();
  state.log.unshift(`${monthNames[state.month]} Y${state.year}: ${choice.title}`);
  state.log = state.log.slice(0, 5);
  advanceTurn();
  render();
}

function recalculateApproval() {
  const weightedSupport = groups.reduce((sum, group) => {
    return sum + group.support * group.share;
  }, 0);
  const totalShare = groups.reduce((sum, group) => sum + group.share, 0);
  const budgetPressure = metrics.revenue.value - metrics.expenses.value;
  const fiscalMood = Math.round(budgetPressure / 25);
  metrics.approval.value = clamp(Math.round(weightedSupport / totalShare) + fiscalMood, 0, 100);
}

function advanceTurn() {
  state.turn += 1;
  state.month += 1;
  if (state.month > 11) {
    state.month = 0;
    state.year += 1;
  }
  state.questionIndex = (state.questionIndex + 1) % questions.length;
}

function renderGroups() {
  const groupList = document.querySelector("#groupList");
  groupList.innerHTML = "";

  for (const group of groups) {
    const row = document.createElement("div");
    row.className = "group-row";
    row.innerHTML = `
      <strong>${group.name}</strong>
      <span class="group-meta">${group.support}% / ${group.share}%</span>
      <div class="bar"><span style="--value: ${group.support}%"></span></div>
    `;
    groupList.append(row);
  }
}

function renderMetrics() {
  const metricsGrid = document.querySelector("#metricsGrid");
  metricsGrid.innerHTML = "";

  for (const [key, metric] of Object.entries(metrics)) {
    const row = document.createElement("div");
    row.className = "metric-row";
    row.innerHTML = `
      <span>${metric.label}</span>
      <strong class="${key === "approval" && metric.value < 45 ? "negative" : ""}">${formatMetric(metric)}</strong>
    `;
    metricsGrid.append(row);
  }
}

function renderQuestion() {
  const question = questions[state.questionIndex];
  document.querySelector("#questionDept").textContent = question.dept;
  document.querySelector("#questionTitle").textContent = question.title;
  document.querySelector("#questionText").textContent = question.text;
  document.querySelector("#questionImpact").textContent = "Decision Required";

  const choiceList = document.querySelector("#choiceList");
  choiceList.innerHTML = "";

  for (const choice of question.choices) {
    const button = document.createElement("button");
    button.className = "choice";
    button.type = "button";
    button.addEventListener("click", () => applyChoice(choice));

    const copy = document.createElement("div");
    copy.innerHTML = `
      <strong>${choice.title}</strong>
      <span>${choice.text}</span>
    `;

    const effects = document.createElement("div");
    effects.className = "effect-list";
    effects.innerHTML = renderEffects(choice);
    button.append(copy, effects);
    choiceList.append(button);
  }
}

function renderEffects(choice) {
  const metricEffects = Object.entries(choice.metrics || {}).map(([key, change]) => {
    const metric = metrics[key];
    const suffix = metric.type === "money" ? "M" : "%";
    const value = metric.type === "money" ? signed(change, suffix) : signed(change, suffix);
    return `<span class="effect-line"><span>${metric.label}</span><strong class="${metricClass(key, change)}">${value}</strong></span>`;
  });

  const groupEffects = Object.entries(choice.groups || {}).slice(0, 3).map(([groupId, change]) => {
    const group = groups.find((item) => item.id === groupId);
    return `<span class="effect-line"><span>${group.name}</span><strong class="${change > 0 ? "positive" : "negative"}">${signed(change, "%")}</strong></span>`;
  });

  return [...metricEffects, ...groupEffects].join("");
}

function renderLog() {
  const eventLog = document.querySelector("#eventLog");
  if (state.log.length === 0) {
    eventLog.innerHTML = "<p>No decisions yet.</p>";
    return;
  }
  eventLog.innerHTML = state.log.map((item) => `<p>${item}</p>`).join("");
}

function renderDate() {
  document.querySelector("#turnLabel").textContent = `Turn ${state.turn}`;
  document.querySelector("#termLabel").textContent = `Year ${state.year}`;
  document.querySelector("#monthLabel").textContent = monthNames[state.month];
}

function render() {
  document.querySelector("#cityName").textContent = city.name;
  document.querySelector("#populationMetric").textContent = formatPopulation(city.population);
  renderDate();
  renderGroups();
  renderMetrics();
  renderQuestion();
  renderLog();
}

recalculateApproval();
render();
