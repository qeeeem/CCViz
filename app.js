const { createApp, nextTick } = Vue;

const palette = ["#d7ff35", "#f5f7ef", "#9ea7a2", "#6d7671", "#3f4743", "#1d2421"];
const anomalyPalette = {
  "成本黑洞": "#ff3d7f",
  "输出喷泉": "#2fe6ff",
  "代码风暴": "#d7ff35",
  "时间异常": "#ffb000",
  "搜索侦察": "#8f7dff",
  "缓存巨兽": "#f5f7ef",
  "空白航段": "#59625d",
  "稳定航行": "#9ea7a2"
};

const rawProjects = [
  { name: "12-AI生成视频", cost: 48.4022, durationMin: 1359.2, input: 7824363, output: 75361, cacheRead: 3833811, added: 767, removed: 313, web: 0, fps: 0.47, models: ["MiniMax-M2.7", "MiniMax-M3"], story: "成本黑洞：一个项目吞掉近半总预算，但也带来超过 1000 行代码变动。" },
  { name: "远程服务器", cost: 9.3762, durationMin: 1029, input: 1154371, output: 16930, cacheRead: 1978482, added: 32, removed: 10, web: 0, fps: 0.37, models: ["MiniMax-M3", "MiniMax-M2.7"], story: "长途运输型会话：输入巨大、产出克制，像在远程环境里搬运重物。" },
  { name: "mochat-master", cost: 9.1793, durationMin: 1430.2, input: 399376, output: 26434, cacheRead: 13043168, added: 448, removed: 104, web: 0, fps: 0.48, models: ["MiniMax-M2.7"], story: "缓存巨兽：13M 缓存读取，说明上下文才是真正的主战场。" },
  { name: "9-openclaw", cost: 7.292, durationMin: 380, input: 146061, output: 133512, cacheRead: 3610967, added: 411, removed: 4, web: 2, fps: 1.35, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "高产喷泉：输出几乎追上输入，是这批会话里最会把上下文变成文本的项目。" },
  { name: "8-运营-引流方案", cost: 5.442, durationMin: 1037.8, input: 355121, output: 46935, cacheRead: 4986014, added: 967, removed: 212, web: 0, fps: 0.42, models: ["MiniMax-M3"], story: "代码风暴：1179 行变动，实际落地感最强。" },
  { name: "4-运营-auto工具", cost: 4.8205, durationMin: 111.8, input: 11926, output: 126468, cacheRead: 1166338, added: 0, removed: 0, web: 0, fps: 5.07, models: ["claude_design", "claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "文本放大器：少量输入换出大量输出，像把想法打成了操作手册。" },
  { name: "ps-hjs", cost: 3.6572, durationMin: 50.2, input: 3142, output: 135902, cacheRead: 106422, added: 0, removed: 0, web: 0, fps: 11.59, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "输出喷泉：3K 输入打出 136K 输出，文本膨胀比非常离谱。" },
  { name: "gaocuiv2", cost: 2.3001, durationMin: 34.1, input: 4292, output: 43643, cacheRead: 1376238, added: 153, removed: 4, web: 0, fps: 8.73, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "轻量快艇：花费不高、速度很快，还有实际代码增量。" },
  { name: "6-运营-企微SCRM", cost: 2.0582, durationMin: 1445.6, input: 145691, output: 28210, cacheRead: 552367, added: 0, removed: 0, web: 7, fps: 0.08, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "侦察机：7 次 Web 搜索，明显在外部信息里找路。" },
  { name: "高翠", cost: 1.426, durationMin: 21.5, input: 155017, output: 5206, cacheRead: 617798, added: 0, removed: 0, web: 0, fps: 3.28, models: ["MiniMax-M3", "MiniMax-M2.7"], story: "输入压缩机：读得多，说得少，像是在做判断和筛选。" },
  { name: "miaopin-agent-v1-main", cost: 1.3185, durationMin: 98, input: 4228, output: 25153, cacheRead: 650761, added: 251, removed: 0, web: 0, fps: 0.02, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "稳态施工：成本小，但留下了 251 行新增。" },
  { name: "miaopin-agent-v1", cost: 1.3177, durationMin: 9.4, input: 3378, output: 12911, cacheRead: 1072147, added: 0, removed: 0, web: 0, fps: 5.79, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "短促爆发：不到 10 分钟完成一次高缓存读取会话。" },
  { name: "9-xhs自动化", cost: 1.193, durationMin: 45.5, input: 23403, output: 16538, cacheRead: 537501, added: 0, removed: 0, web: 1, fps: 2.67, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "自动化侧翼：中等输入，中等输出，带一次外部搜索。" },
  { name: "AI-FZ 副本", cost: 0.9473, durationMin: 132.7, input: 68614, output: 4984, cacheRead: 959186, added: 0, removed: 0, web: 0, fps: 0.27, models: ["MiniMax-M2.7", "MiniMax-M3"], story: "深潜阅读：输入和缓存都不小，但输出很克制。" },
  { name: "mochat-master 2", cost: 0.6685, durationMin: 23.3, input: 3764, output: 11158, cacheRead: 280307, added: 0, removed: 0, web: 0, fps: 2.87, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "小型回声：同名项目的轻量版本。" },
  { name: "4-Scrapling", cost: 0.4668, durationMin: 7258.3, input: 33004, output: 4420, cacheRead: 382462, added: 51, removed: 2, web: 0, fps: 0, models: ["MiniMax-M3", "claude-opus-4-8"], story: "时间异常：121 小时记录，却只花 47 美分，像一个被拉长的后台轨迹。" },
  { name: "翡翠AI_项目包", cost: 0.4449, durationMin: 30.7, input: 534, output: 4833, cacheRead: 773973, added: 0, removed: 0, web: 0, fps: 3.15, models: ["claude-haiku-4-5-20251001", "claude-sonnet-4-6"], story: "缓存小艇：输入极少，但读取了大量上下文。" },
  { name: "5-auto", cost: 0.1251, durationMin: 25.9, input: 2807, output: 1372, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 0.33, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "低成本试航：几乎没有缓存依赖。" },
  { name: "5-运营auto", cost: 0.115, durationMin: 234.1, input: 2735, output: 90, cacheRead: 12921, added: 0, removed: 0, web: 0, fps: 0.01, models: ["claude-haiku-4-5-20251001", "claude-opus-4-8"], story: "沉默会话：读了一点，几乎不输出。" },
  { name: "EDY", cost: 0, durationMin: 29, input: 0, output: 0, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 0.03, models: [], story: "空转记录：保留在雷达边缘。" },
  { name: "6-运营简历toxlsx", cost: 0, durationMin: 16, input: 0, output: 0, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 0.45, models: [], story: "空白航段：只有时长，没有 token 足迹。" },
  { name: "7-genericagent", cost: 0, durationMin: 0.3, input: 0, output: 0, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 1.47, models: [], story: "闪现记录：几乎瞬间结束。" },
  { name: "10-课程内容爬取", cost: 0, durationMin: 1.7, input: 0, output: 0, cacheRead: 0, added: 0, removed: 0, web: 0, fps: 0.25, models: [], story: "轻微脉冲：还没形成有效工作负载。" }
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
  if (joined.includes("minimax") && joined.includes("claude")) return "Mixed";
  if (joined.includes("minimax")) return "MiniMax";
  if (joined.includes("claude")) return "Claude";
  return "Mixed";
}

function compact(n) {
  return Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 }).format(n);
}

function formatMinutes(minutes) {
  if (minutes > 1440) return `${(minutes / 60).toFixed(0)}h`;
  if (minutes > 60) return `${(minutes / 60).toFixed(1)}h`;
  return `${Math.max(minutes, 0).toFixed(0)}m`;
}

function badgeFor(project) {
  if (project.name === "12-AI生成视频") return "成本黑洞";
  if (project.web >= 5) return "搜索侦察";
  if (project.durationMin > 3000) return "时间异常";
  if (project.output > 120000 && project.input < 20000) return "输出喷泉";
  if (project.churn > 700) return "代码风暴";
  if (project.cacheRead > 5000000) return "缓存巨兽";
  if (project.cost === 0) return "空白航段";
  return "稳定航行";
}

const projects = rawProjects.map((project, index) => {
  const enriched = {
    ...project,
    churn: project.added + project.removed,
    family: familyOf(project.models)
  };
  const badge = badgeFor(enriched);
  return { ...enriched, badge, color: anomalyPalette[badge] || palette[index % palette.length] };
});

createApp({
  data() {
    return {
      selectedMetric: "cost",
      query: "",
      selectedProject: projects[0],
      charts: {},
      resizeTimer: null,
      orbitMetrics: [
        { key: "cost", label: "成本" },
        { key: "output", label: "输出" },
        { key: "durationMin", label: "耗时" },
        { key: "cacheRead", label: "缓存" }
      ]
    };
  },
  computed: {
    projects() {
      return projects;
    },
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
      return Math.round((projects[0].cost / this.totalCost) * 100);
    },
    cacheMultiplier() {
      return (this.totalCacheRead / Math.max(this.totalInput, 1)).toFixed(1);
    },
    headlineStats() {
      return [
        { label: "项目会话", value: this.activeProjects.length, note: "23 条脱敏航迹", icon: "folder-kanban", class: "tone-acid" },
        { label: "总成本", value: `$${this.totalCost.toFixed(2)}`, note: `最大单项占 ${this.videoCostShare}%`, icon: "badge-dollar-sign", class: "tone-coral" },
        { label: "输入/输出", value: `${compact(this.totalInput)} / ${compact(this.totalOutput)}`, note: "tokens", icon: "activity", class: "tone-cyan" },
        { label: "代码变动", value: compact(this.totalChurn), note: "added + removed", icon: "git-compare-arrows", class: "tone-gold" }
      ];
    },
    tickerItems() {
      return [
        `COST BLACK HOLE // AI 生成视频 = $${projects[0].cost.toFixed(2)} / 总成本 ${this.videoCostShare}%`,
        `TIME GHOST // 4-Scrapling ${formatMinutes(projects.find((p) => p.name === "4-Scrapling").durationMin)}，成本 <$0.50`,
        `TEXT FOUNTAIN // ps-hjs 输出膨胀 ${(projects.find((p) => p.name === "ps-hjs").output / projects.find((p) => p.name === "ps-hjs").input).toFixed(1)}x`,
        `RECON TRACE // 企微 SCRM 发起 ${projects.find((p) => p.name === "6-运营-企微SCRM").web} 次 Web 搜索`,
        `CACHE MASS // ${compact(this.totalCacheRead)} cache read = 输入的 ${this.cacheMultiplier}x`
      ];
    },
    tickerLoop() {
      return [...this.tickerItems, ...this.tickerItems];
    },
    anomalyCards() {
      const byName = (name) => projects.find((project) => project.name === name);
      return [
        { kicker: "BLACK HOLE", title: "成本黑洞", body: `AI 生成视频单次会话吞掉 ${this.videoCostShare}% 总成本。`, icon: "circle-dollar-sign", tone: "hot", project: byName("12-AI生成视频") },
        { kicker: "TIME WARP", title: "121 小时幽灵航段", body: "4-Scrapling 时长极长，但成本只有 $0.47。", icon: "timer-reset", tone: "cold", project: byName("4-Scrapling") },
        { kicker: "TEXT FOUNTAIN", title: "43 倍输出喷泉", body: "ps-hjs 用 3.1K 输入换出 135.9K 输出。", icon: "waves", tone: "blue", project: byName("ps-hjs") },
        { kicker: "CODE STORM", title: "1179 行代码风暴", body: "8-运营-引流方案是最强落地型会话。", icon: "zap", tone: "green", project: byName("8-运营-引流方案") }
      ];
    },
    topTips() {
      const max = Math.max(...topTips.map((tip) => tip.count));
      return topTips.map((tip) => ({ ...tip, percent: Math.round((tip.count / max) * 100) }));
    },
    modelMix() {
      const colors = { MiniMax: "#ff3d7f", Claude: "#2fe6ff", Mixed: "#d7ff35", idle: "#87908d" };
      const counts = this.activeProjects.reduce((acc, project) => {
        acc[project.family] = (acc[project.family] || 0) + 1;
        return acc;
      }, {});
      return Object.entries(counts).map(([name, count]) => ({ name, count, color: colors[name] }));
    },
    radarPoints() {
      const nonIdle = this.activeProjects.filter((project) => project.cost || project.input || project.output);
      const maxCost = Math.max(...nonIdle.map((project) => project.cost));
      const maxOutput = Math.max(...nonIdle.map((project) => project.output));
      return nonIdle.slice(0, 16).map((project, index) => {
        const angle = (index / 16) * Math.PI * 2 - Math.PI / 2;
        const intensity = 0.26 + (project.cost / maxCost) * 0.35 + (project.output / maxOutput) * 0.18;
        return {
          project,
          x: 50 + Math.cos(angle) * intensity * 50,
          y: 50 + Math.sin(angle) * intensity * 50
        };
      });
    }
  },
  watch: {
    selectedMetric() {
      this.renderOrbitChart();
    },
    selectedProject() {
      this.renderRadarChart();
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
    formatDuration: formatMinutes,
    selectProject(project) {
      this.selectedProject = project;
      this.renderRadarChart();
    },
    initCharts() {
      this.charts.orbit = echarts.init(document.getElementById("orbitChart"));
      this.charts.scatter = echarts.init(document.getElementById("scatterChart"));
      this.charts.churn = echarts.init(document.getElementById("churnChart"));
      this.charts.model = echarts.init(document.getElementById("modelChart"));
      this.charts.radar = echarts.init(document.getElementById("radarChart"));
      this.renderOrbitChart();
      this.renderScatterChart();
      this.renderChurnChart();
      this.renderModelChart();
      this.renderRadarChart();
    },
    resizeCharts() {
      window.clearTimeout(this.resizeTimer);
      this.resizeTimer = window.setTimeout(() => {
        Object.values(this.charts).forEach((chart) => {
          try {
            chart.resize();
          } catch {
            // ECharts can throw during rapid viewport changes while animated series are settling.
          }
        });
      }, 120);
    },
    axisStyle() {
      return {
        nameTextStyle: { color: "#aab3ad", fontWeight: 700 },
        axisLine: { lineStyle: { color: "rgba(245,247,239,.28)" } },
        axisLabel: { color: "#aab3ad", fontFamily: "Inter, sans-serif" },
        splitLine: { lineStyle: { color: "rgba(245,247,239,.09)", type: "dashed" } }
      };
    },
    renderOrbitChart() {
      const meta = {
        cost: { label: "成本", formatter: (v) => `$${Number(v).toFixed(2)}` },
        output: { label: "输出 token", formatter: compact },
        durationMin: { label: "耗时", formatter: formatMinutes },
        cacheRead: { label: "缓存读取", formatter: compact }
      }[this.selectedMetric];
      const data = [...this.activeProjects]
        .sort((a, b) => b[this.selectedMetric] - a[this.selectedMetric])
        .slice(0, 10);
      this.charts.orbit.setOption({
        animationDuration: 900,
        tooltip: {
          trigger: "axis",
          backgroundColor: "#0b1114",
          borderColor: "rgba(201,255,61,.35)",
          textStyle: { color: "#f3f7f5" },
          formatter: (params) => {
            const p = params[0];
            const project = data[data.length - 1 - p.dataIndex];
            return `${project.name}<br/>${meta.label}: ${meta.formatter(project[this.selectedMetric])}<br/>标签: ${project.badge}<br/>缓存: ${compact(project.cacheRead)}`;
          }
        },
        grid: { left: 128, right: 22, top: 14, bottom: 24 },
        xAxis: { type: "value", ...this.axisStyle() },
        yAxis: {
          type: "category",
          data: data.map((project) => project.name).reverse(),
          axisTick: { show: false },
          axisLine: { show: false },
          axisLabel: { color: "#e8f3ef", width: 116, overflow: "truncate" }
        },
        series: [{
          type: "bar",
          data: data.map((project) => ({
            value: project[this.selectedMetric],
            itemStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 1,
                y2: 0,
                colorStops: [
                  { offset: 0, color: project.color },
                  { offset: 1, color: "#f5f7ef" }
                ]
              }
            }
          })).reverse(),
          barWidth: 15,
          showBackground: true,
          backgroundStyle: { color: "rgba(245,247,239,.055)", borderRadius: 3 },
          itemStyle: { borderRadius: 3 }
        }]
      });
    },
    renderScatterChart() {
      const data = this.activeProjects.filter((project) => project.cost || project.output).map((project) => [
        project.cost,
        project.output,
        Math.max(9, Math.min(44, Math.sqrt(project.input) / 65)),
        project.name,
        project.badge,
        project.color,
        project.input,
        project.churn
      ]);
      const anomalyNames = new Set(["12-AI生成视频", "ps-hjs", "8-运营-引流方案", "4-Scrapling", "6-运营-企微SCRM"]);
      const anomalyData = data.filter((row) => anomalyNames.has(row[3]));
      this.charts.scatter.setOption({
        animationDuration: 700,
        tooltip: {
          backgroundColor: "#0b1114",
          borderColor: "rgba(215,255,53,.42)",
          textStyle: { color: "#f3f7f5" },
          formatter: (p) => `${p.data[3]}<br/>成本: $${p.data[0].toFixed(2)}<br/>输出: ${compact(p.data[1])}<br/>输入: ${compact(p.data[6])}<br/>${p.data[4]}`
        },
        grid: { left: 58, right: 24, top: 34, bottom: 48 },
        xAxis: { name: "cost USD", type: "value", min: 0, max: 52, ...this.axisStyle() },
        yAxis: { name: "output tokens", type: "value", min: 0, max: 150000, ...this.axisStyle() },
        series: [
          {
            name: "项目",
            type: "scatter",
            z: 3,
            symbol: "circle",
            symbolSize: (row) => row[2],
            data,
            itemStyle: {
              color: (p) => p.data[5],
              opacity: 0.84,
              borderColor: "#050705",
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: (p) => p.data[5]
            },
            emphasis: {
              scale: 1.2,
              label: {
                show: true,
                formatter: (p) => p.data[3],
                color: "#f5f7ef",
                position: "top",
                fontWeight: 800
              }
            }
          },
          {
            name: "异常",
            type: "effectScatter",
            z: 5,
            symbolSize: (row) => row[2] + 7,
            rippleEffect: { brushType: "stroke", scale: 2.4, period: 3.2 },
            data: anomalyData,
            itemStyle: {
              color: (p) => p.data[5],
              opacity: 1,
              borderColor: "#f5f7ef",
              borderWidth: 1
            },
            label: {
              show: true,
              formatter: (p) => p.data[4],
              position: "top",
              color: "#f5f7ef",
              fontSize: 11,
              fontWeight: 850,
              backgroundColor: "rgba(5,7,5,.78)",
              borderColor: "rgba(245,247,239,.2)",
              borderWidth: 1,
              borderRadius: 3,
              padding: [3, 6]
            }
          }
        ]
      }, true);
    },
    renderChurnChart() {
      const data = [...this.activeProjects].sort((a, b) => b.churn - a.churn).slice(0, 8);
      this.charts.churn.setOption({
        animationDuration: 900,
        tooltip: {
          trigger: "axis",
          backgroundColor: "#0b1114",
          borderColor: "rgba(255,255,255,.14)",
          textStyle: { color: "#f3f7f5" }
        },
        legend: { top: 0, textStyle: { color: "#9fb0ad" } },
        grid: { left: 46, right: 14, top: 42, bottom: 86 },
        xAxis: {
          type: "category",
          data: data.map((project) => project.name),
          axisLabel: { color: "#9fb0ad", rotate: 35, width: 72, overflow: "truncate" },
          axisLine: { lineStyle: { color: "rgba(255,255,255,.22)" } },
          axisTick: { show: false }
        },
        yAxis: { type: "value", ...this.axisStyle() },
        series: [
          { name: "added", type: "bar", stack: "churn", data: data.map((project) => project.added), itemStyle: { color: "#d7ff35", borderRadius: [3, 3, 0, 0] } },
          { name: "removed", type: "bar", stack: "churn", data: data.map((project) => project.removed), itemStyle: { color: "#ff3d7f", borderRadius: [3, 3, 0, 0] } }
        ]
      });
    },
    renderModelChart() {
      this.charts.model.setOption({
        tooltip: {
          backgroundColor: "#0b1114",
          borderColor: "rgba(255,255,255,.14)",
          textStyle: { color: "#f3f7f5" }
        },
        series: [{
          type: "pie",
          radius: ["54%", "78%"],
          padAngle: 3,
          avoidLabelOverlap: true,
          label: { color: "#e8f3ef", formatter: "{b}" },
          labelLine: { lineStyle: { color: "rgba(255,255,255,.32)" } },
          data: this.modelMix.map((row) => ({ name: row.name, value: row.count, itemStyle: { color: row.color } }))
        }]
      });
    },
    renderRadarChart() {
      if (!this.charts.radar) return;
      const p = this.selectedProject;
      const max = {
        cost: Math.max(...this.activeProjects.map((project) => project.cost)),
        output: Math.max(...this.activeProjects.map((project) => project.output)),
        durationMin: Math.max(...this.activeProjects.map((project) => project.durationMin)),
        cacheRead: Math.max(...this.activeProjects.map((project) => project.cacheRead)),
        churn: Math.max(...this.activeProjects.map((project) => project.churn))
      };
      const value = [
        (p.cost / max.cost) * 100,
        (p.output / max.output) * 100,
        (p.durationMin / max.durationMin) * 100,
        (p.cacheRead / max.cacheRead) * 100,
        (p.churn / max.churn) * 100
      ];
      this.charts.radar.setOption({
        animationDuration: 700,
        radar: {
          radius: "68%",
          splitNumber: 4,
          axisName: { color: "#dfe9e5", fontSize: 12 },
          splitLine: { lineStyle: { color: "rgba(255,255,255,.1)" } },
          splitArea: { areaStyle: { color: ["rgba(255,255,255,.02)", "rgba(255,255,255,.05)"] } },
          axisLine: { lineStyle: { color: "rgba(255,255,255,.14)" } },
          indicator: [
            { name: "成本", max: 100 },
            { name: "输出", max: 100 },
            { name: "耗时", max: 100 },
            { name: "缓存", max: 100 },
            { name: "变动", max: 100 }
          ]
        },
        series: [{
          type: "radar",
          data: [{
            value,
            name: p.name,
            areaStyle: { color: `${p.color}38` },
            lineStyle: { color: p.color, width: 3 },
            itemStyle: { color: p.color }
          }]
        }]
      });
    }
  }
}).mount("#app");
