const { createApp, nextTick } = Vue;

const palette = ["#c9ff3d", "#ff6b57", "#39d5ff", "#ffd166", "#8ef0a4", "#f28cff"];

const rawProjects = [
  { name: "12-AI生成视频", cost: 48.4022, durationMin: 1359.2, input: 7824363, output: 75361, cacheRead: 3833811, added: 767, removed: 313, web: 0, fps: 0.47, models: ["MiniMax-M2.7", "MiniMax-M3"] },
  { name: "远程服务器", cost: 9.3762, durationMin: 1029, input: 1154371, output: 16930, cacheRead: 1978482, added: 32, removed: 10, web: 0, fps: 0.37, models: ["MiniMax-M3", "MiniMax-M2.7"] },
  { name: "mochat-master", cost: 9.1793, durationMin: 1430.2, input: 399376, output: 26434, cacheRead: 13043168, added: 448, removed: 104, web: 0, fps: 0.48, models: ["MiniMax-M2.7"] },
  { name: "9-openclaw", cost: 7.292, durationMin: 380, input: 146061, output: 133512, cacheRead: 3610967, added: 411, removed: 4, web: 2, fps: 1.35, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "8-运营-引流方案", cost: 5.442, durationMin: 1037.8, input: 355121, output: 46935, cacheRead: 4986014, added: 967, removed: 212, web: 0, fps: 0.42, models: ["MiniMax-M3"] },
  { name: "4-运营-auto工具", cost: 4.8205, durationMin: 111.8, input: 11926, output: 126468, cacheRead: 1166338, added: 0, removed: 0, web: 0, fps: 5.07, models: ["claude_design", "claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "ps-hjs", cost: 3.6572, durationMin: 50.2, input: 3142, output: 135902, cacheRead: 106422, added: 0, removed: 0, web: 0, fps: 11.59, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "gaocuiv2", cost: 2.3001, durationMin: 34.1, input: 4292, output: 43643, cacheRead: 1376238, added: 153, removed: 4, web: 0, fps: 8.73, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "6-运营-企微SCRM", cost: 2.0582, durationMin: 1445.6, input: 145691, output: 28210, cacheRead: 552367, added: 0, removed: 0, web: 7, fps: 0.08, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "高翠", cost: 1.426, durationMin: 21.5, input: 155017, output: 5206, cacheRead: 617798, added: 0, removed: 0, web: 0, fps: 3.28, models: ["MiniMax-M3", "MiniMax-M2.7"] },
  { name: "miaopin-agent-v1-main", cost: 1.3185, durationMin: 98, input: 4228, output: 25153, cacheRead: 650761, added: 251, removed: 0, web: 0, fps: 0.02, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "miaopin-agent-v1", cost: 1.3177, durationMin: 9.4, input: 3378, output: 12911, cacheRead: 1072147, added: 0, removed: 0, web: 0, fps: 5.79, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "9-xhs自动化", cost: 1.193, durationMin: 45.5, input: 23403, output: 16538, cacheRead: 537501, added: 0, removed: 0, web: 1, fps: 2.67, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "AI-FZ 副本", cost: 0.9473, durationMin: 132.7, input: 68614, output: 4984, cacheRead: 959186, added: 0, removed: 0, web: 0, fps: 0.27, models: ["MiniMax-M2.7", "MiniMax-M3"] },
  { name: "mochat-master 2", cost: 0.6685, durationMin: 23.3, input: 3764, output: 11158, cacheRead: 280307, added: 0, removed: 0, web: 0, fps: 2.87, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "4-Scrapling", cost: 0.4668, durationMin: 7258.3, input: 33004, output: 4420, cacheRead: 382462, added: 51, removed: 2, web: 0, fps: 0, models: ["MiniMax-M3", "claude-opus-4-8"] },
  { name: "翡翠AI_项目包", cost: 0.4449, durationMin: 30.7, input: 534, output: 4833, cacheRead: 773973, added: 0, removed: 0, web: 0, fps: 3.15, models: ["claude-haiku-4-5-20251001", "claude-sonnet-4-6"] },
  { name: "5-auto", cost: 0.1251, durationMin: 25.9, input: 2807, output: 1372, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 0.33, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "5-运营auto", cost: 0.115, durationMin: 234.1, input: 2735, output: 90, cacheRead: 12921, added: 0, removed: 0, web: 0, fps: 0.01, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"] },
  { name: "EDY", cost: 0, durationMin: 29, input: 0, output: 0, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 0.03, models: [] },
  { name: "6-运营简历toxlsx", cost: 0, durationMin: 16, input: 0, output: 0, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 0.45, models: [] },
  { name: "7-genericagent", cost: 0, durationMin: 0.3, input: 0, output: 0, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 1.47, models: [] },
  { name: "10-课程内容爬取", cost: 0, durationMin: 1.7, input: 0, output: 0, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 0.25, models: [] }
];

const topTips = [
  { name: "shift-tab", count: 147 },
  { name: "drag-and-drop-images", count: 146 },
  { name: "double-esc-code-restore", count: 146 },
  { name: "continue", count: 146 },
  { name: "subagent-fanout-nudge", count: 146 },
  { name: "loop-command-nudge", count: 146 },
  { name: "install-github-app", count: 145 },
  { name: "permissions", count: 145 }
];

function familyOf(models) {
  if (!models.length) return "idle";
  const joined = models.join(" ").toLowerCase();
  if (joined.includes("minimax")) return "MiniMax";
  if (joined.includes("claude")) return "Claude";
  return "Mixed";
}

function compact(n) {
  return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

function formatMinutes(minutes) {
  if (minutes > 60) return `${(minutes / 60).toFixed(1)}h`;
  return `${minutes.toFixed(0)}m`;
}

const projects = rawProjects.map((project, index) => ({
  ...project,
  color: palette[index % palette.length],
  churn: project.added + project.removed,
  family: familyOf(project.models)
}));

createApp({
  data() {
    return {
      selectedMetric: "cost",
      query: "",
      charts: {},
      orbitMetrics: [
        { key: "cost", label: "成本" },
        { key: "output", label: "输出" },
        { key: "durationMin", label: "耗时" }
      ]
    };
  },
  computed: {
    activeProjects() {
      return projects.filter((project) => project.cost || project.input || project.output || project.durationMin);
    },
    filteredProjects() {
      const q = this.query.trim().toLowerCase();
      if (!q) return this.activeProjects;
      return this.activeProjects.filter((project) => project.name.toLowerCase().includes(q));
    },
    totalCost() {
      return this.activeProjects.reduce((sum, project) => sum + project.cost, 0);
    },
    totalInput() {
      return this.activeProjects.reduce((sum, project) => sum + project.input, 0);
    },
    totalOutput() {
      return this.activeProjects.reduce((sum, project) => sum + project.output, 0);
    },
    totalCacheRead() {
      return this.activeProjects.reduce((sum, project) => sum + project.cacheRead, 0);
    },
    totalChurn() {
      return this.activeProjects.reduce((sum, project) => sum + project.churn, 0);
    },
    videoCostShare() {
      const video = this.activeProjects.find((project) => project.name === "12-AI生成视频");
      return Math.round((video.cost / this.totalCost) * 100);
    },
    cacheMultiplier() {
      return (this.totalCacheRead / Math.max(this.totalInput, 1)).toFixed(1);
    },
    headlineStats() {
      return [
        { label: "项目会话", value: this.activeProjects.length, note: "从 projects 段提取", icon: "folder-kanban", class: "tone-acid" },
        { label: "总成本", value: `$${this.totalCost.toFixed(2)}`, note: "最近会话合计", icon: "badge-dollar-sign", class: "tone-coral" },
        { label: "输入/输出", value: `${compact(this.totalInput)} / ${compact(this.totalOutput)}`, note: "tokens", icon: "activity", class: "tone-cyan" },
        { label: "代码变动", value: compact(this.totalChurn), note: "added + removed", icon: "git-compare-arrows", class: "tone-gold" }
      ];
    },
    topTips() {
      const max = Math.max(...topTips.map((tip) => tip.count));
      return topTips.map((tip) => ({ ...tip, percent: Math.round((tip.count / max) * 100) }));
    },
    modelMix() {
      const colors = { MiniMax: "#ff6b57", Claude: "#39d5ff", Mixed: "#ffd166", idle: "#87908d" };
      const counts = this.activeProjects.reduce((acc, project) => {
        acc[project.family] = (acc[project.family] || 0) + 1;
        return acc;
      }, {});
      return Object.entries(counts).map(([name, count]) => ({ name, count, color: colors[name] }));
    }
  },
  watch: {
    selectedMetric() {
      this.renderOrbitChart();
    }
  },
  mounted() {
    nextTick(() => {
      this.initCharts();
      window.addEventListener("resize", this.resizeCharts);
      if (window.lucide) window.lucide.createIcons();
    });
  },
  beforeUnmount() {
    window.removeEventListener("resize", this.resizeCharts);
  },
  methods: {
    formatCompact: compact,
    initCharts() {
      this.charts.orbit = echarts.init(document.getElementById("orbitChart"));
      this.charts.scatter = echarts.init(document.getElementById("scatterChart"));
      this.charts.churn = echarts.init(document.getElementById("churnChart"));
      this.charts.model = echarts.init(document.getElementById("modelChart"));
      this.renderOrbitChart();
      this.renderScatterChart();
      this.renderChurnChart();
      this.renderModelChart();
    },
    resizeCharts() {
      Object.values(this.charts).forEach((chart) => chart.resize());
    },
    axisStyle() {
      return {
        axisLine: { lineStyle: { color: "rgba(255,255,255,.22)" } },
        axisLabel: { color: "#94a3a1" },
        splitLine: { lineStyle: { color: "rgba(255,255,255,.08)" } }
      };
    },
    renderOrbitChart() {
      const meta = {
        cost: { label: "成本", suffix: "$" },
        output: { label: "输出 token", suffix: "" },
        durationMin: { label: "耗时", suffix: "m" }
      }[this.selectedMetric];
      const data = [...this.activeProjects]
        .sort((a, b) => b[this.selectedMetric] - a[this.selectedMetric])
        .slice(0, 10);
      this.charts.orbit.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "#11161a",
          borderColor: "rgba(255,255,255,.12)",
          textStyle: { color: "#f3f7f5" },
          formatter: (params) => {
            const p = params[0];
            const project = data[p.dataIndex];
            return `${project.name}<br/>${meta.label}: ${this.selectedMetric === "durationMin" ? formatMinutes(project.durationMin) : compact(project[this.selectedMetric])}${meta.suffix === "$" ? " USD" : ""}<br/>缓存: ${compact(project.cacheRead)} tokens`;
          }
        },
        grid: { left: 116, right: 24, top: 12, bottom: 26 },
        xAxis: { type: "value", ...this.axisStyle() },
        yAxis: {
          type: "category",
          data: data.map((project) => project.name).reverse(),
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { color: "#dfe9e5", width: 104, overflow: "truncate" }
        },
        series: [{
          type: "bar",
          data: data.map((project) => ({ value: project[this.selectedMetric], itemStyle: { color: project.color } })).reverse(),
          barWidth: 16,
          showBackground: true,
          backgroundStyle: { color: "rgba(255,255,255,.06)", borderRadius: 8 },
          itemStyle: { borderRadius: 8 }
        }]
      });
    },
    renderScatterChart() {
      const data = this.activeProjects.filter((project) => project.cost || project.output).map((project) => [
        project.cost,
        project.output,
        Math.max(8, Math.min(44, project.input / 180000)),
        project.name,
        project.family,
        project.color
      ]);
      this.charts.scatter.setOption({
        tooltip: {
          backgroundColor: "#11161a",
          borderColor: "rgba(255,255,255,.12)",
          textStyle: { color: "#f3f7f5" },
          formatter: (p) => `${p.data[3]}<br/>成本: $${p.data[0].toFixed(2)}<br/>输出: ${compact(p.data[1])}<br/>阵营: ${p.data[4]}`
        },
        grid: { left: 52, right: 18, top: 22, bottom: 42 },
        xAxis: { name: "cost", type: "value", ...this.axisStyle() },
        yAxis: { name: "output", type: "value", ...this.axisStyle() },
        series: [{
          type: "scatter",
          symbolSize: (row) => row[2],
          data,
          itemStyle: { color: (p) => p.data[5], opacity: 0.86 },
          emphasis: { scale: true }
        }]
      });
    },
    renderChurnChart() {
      const data = [...this.activeProjects].sort((a, b) => b.churn - a.churn).slice(0, 8);
      this.charts.churn.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "#11161a",
          borderColor: "rgba(255,255,255,.12)",
          textStyle: { color: "#f3f7f5" }
        },
        legend: { top: 0, textStyle: { color: "#94a3a1" } },
        grid: { left: 46, right: 14, top: 42, bottom: 86 },
        xAxis: {
          type: "category",
          data: data.map((project) => project.name),
          axisLabel: { color: "#94a3a1", rotate: 35, width: 72, overflow: "truncate" },
          axisLine: { lineStyle: { color: "rgba(255,255,255,.22)" } },
          axisTick: { show: false }
        },
        yAxis: { type: "value", ...this.axisStyle() },
        series: [
          { name: "added", type: "bar", stack: "churn", data: data.map((project) => project.added), itemStyle: { color: "#c9ff3d", borderRadius: [5, 5, 0, 0] } },
          { name: "removed", type: "bar", stack: "churn", data: data.map((project) => project.removed), itemStyle: { color: "#ff6b57", borderRadius: [5, 5, 0, 0] } }
        ]
      });
    },
    renderModelChart() {
      this.charts.model.setOption({
        tooltip: {
          backgroundColor: "#11161a",
          borderColor: "rgba(255,255,255,.12)",
          textStyle: { color: "#f3f7f5" }
        },
        series: [{
          type: "pie",
          radius: ["56%", "78%"],
          avoidLabelOverlap: true,
          label: { color: "#dfe9e5", formatter: "{b}" },
          labelLine: { lineStyle: { color: "rgba(255,255,255,.32)" } },
          data: this.modelMix.map((row) => ({ name: row.name, value: row.count, itemStyle: { color: row.color } }))
        }]
      });
    }
  }
}).mount("#app");
