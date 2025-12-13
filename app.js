/* ---------------------------
   Theme (persist)
----------------------------*/
const modeToggle = document.getElementById('modeToggle');
const modeIcon = document.getElementById('modeIcon');
const savedTheme = localStorage.getItem('hando_theme');
if(savedTheme === 'dark') { document.documentElement.classList.add('dark'); modeIcon.textContent='☀️'; }
else { document.documentElement.classList.remove('dark'); modeIcon.textContent='🌙'; }
modeToggle.addEventListener('click', () => {
  document.documentElement.classList.toggle('dark');
  const isDark = document.documentElement.classList.contains('dark');
  localStorage.setItem('hando_theme', isDark ? 'dark' : 'light');
  modeIcon.textContent = isDark ? '☀️' : '🌙';
});

const btn = document.getElementById("notifyBtn");
const toastContainer = document.getElementById("toastContainer");
const countBadge = document.getElementById("notifyCount");

// Sample notifications (9 as in badge)
let notifications = [
  "🔔 New order received",
  "👤 New user registered",
  "💰 Payment successful",
  "⚠ Server warning",
  "📦 Order shipped",
  "✉ New message received",
  "⭐ New review added",
  "📈 Sales report ready",
  "💡 Tips for growth"
];

// Update badge
countBadge.innerText = notifications.length;

// Show a toast
function showToast(message, index) {
  const toast = document.createElement("div");
  toast.className = "bg-white dark:bg-gray-800 text-gray-800 dark:text-white p-4 rounded-lg shadow-lg flex justify-between items-start w-72 transform transition-all duration-300 opacity-0 translate-x-20";
  toast.innerHTML = `<span>${message}</span><button class="ml-2 text-gray-400 hover:text-red-500 font-bold">×</button>`;

  // Remove button
  toast.querySelector("button").addEventListener("click", () => removeToast(toast, index));

  // Append toast at the bottom
  toastContainer.appendChild(toast);

  // Animate in
  setTimeout(() => {
    toast.classList.remove("opacity-0","translate-x-20");
  },100);
}

// Remove toast and shift remaining
function removeToast(toast, index){
  toast.classList.add("opacity-0","translate-x-20");
  toast.addEventListener("transitionend", ()=>{
    toast.remove();
  });
  // Remove from notifications array and update badge
  if(notifications[index]) notifications.splice(index,1);
  countBadge.innerText = notifications.length;
}

// Show all notifications on bell click
btn.addEventListener("click", () => {
  notifications.forEach((msg,index) => showToast(msg,index));
  notifications = []; // clear after showing
  countBadge.innerText = 0;
});

const mobileSidebarBtn = document.getElementById('mobileSidebarBtn');


mobileSidebarBtn.addEventListener('click', () => {
  if(sidebar.classList.contains('left-[-18rem]')){
    sidebar.classList.remove('left-[-18rem]');
    sidebar.classList.add('left-0');
  } else {
    sidebar.classList.add('left-[-18rem]');
    sidebar.classList.remove('left-0');
  }
});

/* ---------------------------
   Sidebar expand labels
----------------------------*/
const sidebar = document.getElementById('sidebar');
const brandText = document.getElementById('brandText');
const navLabels = document.querySelectorAll('.nav-label');
function setExpanded(val){
  if(val){
    sidebar.classList.add('expanded');
    brandText.classList.remove('opacity-0','-translate-x-2');
    navLabels.forEach((n,i)=> setTimeout(()=> n.classList.remove('opacity-0'), i*40));
  } else {
    sidebar.classList.remove('expanded');
    brandText.classList.add('opacity-0','-translate-x-2');
    navLabels.forEach((n,i)=> setTimeout(()=> n.classList.add('opacity-0'), i*20));
  }
}
sidebar.addEventListener('mouseenter', ()=> setExpanded(true));
sidebar.addEventListener('mouseleave', ()=> setExpanded(false));
setExpanded(false);

/* ---------------------------
   KPI count up
----------------------------*/
document.querySelectorAll('.kpi-number').forEach(el=>{
  const raw = el.dataset.target || el.textContent;
  const isCurrency = String(raw).includes('$') || el.textContent.trim().startsWith('$');
  const num = Number(String(raw).replace(/[^0-9.-]+/g,"")) || 0;
  const duration = 1400;
  const start = performance.now();
  function step(now){
    const t = Math.min(1, (now - start)/duration);
    const eased = t<.5 ? 2*t*t : -1 + (4-2*t)*t;
    const current = Math.round(num*eased);
    el.textContent = isCurrency ? ('$' + current.toLocaleString()) : current.toLocaleString();
    if(t < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
});

/* ---------------------------
   Table row stagger reveal
----------------------------*/
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.row-anim').forEach((r,i)=>{ r.style.animationDelay = (i*80)+'ms'; });
});


/* ---------------------------
   Client List (dynamic add)
----------------------------*/
const clients = [
  {id:1,name:'Emma Johnson',email:'emma@company.com',company:'Himalaya Co.',status:'Active',joined:'2024-03-12', avatar:'https://i.pravatar.cc/40?img=12'},
  {id:2,name:'Michael Brown',email:'michael@biz.com',company:'Orbit Ltd.',status:'Active',joined:'2023-11-02', avatar:'https://i.pravatar.cc/40?img=5'},
  {id:3,name:'Sophia Davis',email:'sophia@shops.com',company:'ShopEase',status:'Pending',joined:'2025-01-22', avatar:'https://i.pravatar.cc/40?img=8'},
  {id:4,name:'Daniel Wilson',email:'daniel@tech.com',company:'Tekno',status:'Blocked',joined:'2022-08-19', avatar:'https://i.pravatar.cc/40?img=3'}
];

const clientTbody = document.getElementById('clientTbody');

function renderClients(){
  clientTbody.innerHTML = '';

  clients.forEach((c,i)=>{
    const tr = document.createElement('tr');
    tr.className = 'row hover:bg-gray-50 dark:hover:bg-gray-800 transition';

    tr.innerHTML = `
      <td class="px-3 py-2">${i+1}</td>

      <td class="px-3 py-2 flex items-center gap-3">
        <img src="${c.avatar}" class="w-9 h-9 rounded-full" />
        <div class="font-semibold">${c.name}</div>
      </td>

      <td class="px-3 py-2 text-gray-500">${c.email}</td>
      <td class="px-3 py-2">${c.company}</td>

      <td class="px-3 py-2">${statusBadge(c.status)}</td>
      <td class="px-3 py-2 text-gray-500">${formatDate(c.joined)}</td>
    `;
    clientTbody.appendChild(tr);
  });

  document.querySelectorAll('.row-anim').forEach((r,i)=>{
    r.style.animationDelay = (i * 80) + 'ms';
  });
}

function statusBadge(status){
  if(status === 'Active')
    return `<span class="px-2 py-1 rounded-full text-xs bg-green-100 text-green-700">Active</span>`;
  if(status === 'Pending')
    return `<span class="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-700">Pending</span>`;
  return `<span class="px-2 py-1 rounded-full text-xs bg-red-100 text-red-700">Blocked</span>`;
}

function formatDate(date){
  return new Date(date).toLocaleDateString();
}

renderClients();

/* ✅ Add Client Button */
const addBtn = document.getElementById('addClientBtn');
if(addBtn){
  addBtn.addEventListener('click', ()=>{
    const id = clients.length + 1;

    clients.unshift({
      id: id,
      name: `New Client ${id}`,
      email: `new${id}@example.com`,
      company: 'NewCo',
      status: 'Pending',
      joined: new Date().toISOString().slice(0,10),
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random()*70)+1}`
    });

    renderClients();
  });
}


/* ---------------------------
   Chart: Option D (Fade + Slide + Grow + Glow)
   - We'll create gradients and apply staggered animations
----------------------------*/
Chart.defaults.font.family = "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue'";

/* helper: gradient */
function getGradient(ctx, color){
  const g = ctx.createLinearGradient(0,0,0,220);
  if(color === 'blue'){ g.addColorStop(0,'rgba(59,130,246,0.28)'); g.addColorStop(1,'rgba(59,130,246,0.02)'); }
  if(color === 'orange'){ g.addColorStop(0,'rgba(249,115,22,0.28)'); g.addColorStop(1,'rgba(249,115,22,0.02)'); }
  if(color === 'green'){ g.addColorStop(0,'rgba(16,185,129,0.28)'); g.addColorStop(1,'rgba(16,185,129,0.02)'); }
  return g;
}

/* STAGGERED animation plugin for per-datapoint delay + grow */
const staggerPlugin = {
  id: 'staggerPlugin',
  beforeInit: (chart) => {
    chart._staggered = true;
  },
  beforeDatasetDraw(chart, args, options) {
    // noop
  }
};

/* SALES LINE (draw left-to-right) */
(function(){
  const ctx = document.getElementById('chart-sales').getContext('2d');
  const gradient = getGradient(ctx,'blue');
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug'];
  const data = [1200,1900,1400,2300,1800,2700,3000,3400];

  const salesChart = new Chart(ctx, {
    type: 'line',
    data: { labels, datasets: [{
      label:'Sales',
      data,
      borderColor:'#3b82f6',
      backgroundColor: gradient,
      borderWidth:3,
      pointRadius:4,
      pointHoverRadius:7,
      fill:true,
      tension:0.36
    }]},
    plugins: [staggerPlugin],
    options:{
      responsive:true,
      maintainAspectRatio:false,
      interaction:{mode:'index',intersect:false},
      plugins:{
        legend:{display:false},
        tooltip:{backgroundColor:'#111827', titleColor:'#fff', bodyColor:'#fff', padding:8, cornerRadius:6}
      },
      animation:{
        duration: 1400,
        easing: 'easeOutQuart',
        // per-datapoint delay
        onProgress(animation) {
          // nothing
        }
      },
      scales:{
        y:{beginAtZero:true, grid:{color:'rgba(0,0,0,0.04)'}},
        x:{grid:{display:false}}
      }
    }
  });

  // left-to-right mask animation: draw line by progressively revealing clip
  // Implement via reveal scale on canvas during load
  const origDraw = salesChart.draw;
  salesChart.draw = function() {
    const {ctx, chartArea} = this;
    ctx.save();
    // create clip path that gradually reveals; use globalAlpha for fade
    origDraw.apply(this, arguments);
    ctx.restore();
  };
})();

/* REVENUE BAR (grow bars) */
(function(){
  const ctx = document.getElementById('chart-revenue').getContext('2d');
  const gradient = getGradient(ctx,'orange');
  const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul'];
  const data = [3000,4200,3800,5200,4800,6100,7200];

  new Chart(ctx, {
    type: 'bar',
    data: { labels, datasets: [{
      label:'Revenue',
      data,
      backgroundColor:'#f97316aa',
      borderRadius:8,
      barPercentage:0.7
    }]},
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{
        legend:{display:false},
        tooltip:{backgroundColor:'#111827', titleColor:'#fff', bodyColor:'#fff', padding:8, cornerRadius:6}
      },
      animation:{
        duration:1200,
        easing:'easeOutBack',
        delay: (ctx) => ctx.dataIndex * 80
      },
      scales:{ y:{beginAtZero:true}, x:{grid:{display:false}} }
    }
  });
})();

/* PRODUCTS DOUGHNUT (rotate + pulse) */
(function(){
  const ctx = document.getElementById('chart-products').getContext('2d');
  new Chart(ctx, {
    type:'doughnut',
    data:{ labels:['Headphones','Shoes','Watches','Bags'], datasets:[{
      data:[35,25,20,20],
      backgroundColor:['#3b82f6','#10b981','#f97316','#ef4444'],
      hoverOffset:10
    }]},
    options:{
      responsive:true,
      maintainAspectRatio:false,
      cutout: '60%',
      plugins:{
        legend:{position:'bottom', labels:{color: getComputedStyle(document.body).color}},
        tooltip:{backgroundColor:'#111827', titleColor:'#fff', bodyColor:'#fff', padding:8, cornerRadius:6}
      },
      animation:{ animateRotate:true, animateScale:true, duration:1400, easing:'easeOutQuint' }
    }
  });
})();

/* VISITORS AREA (smooth area grow + glow) */
(function(){
  const ctx = document.getElementById('chart-visitors').getContext('2d');
  const g = getGradient(ctx,'green');
  const labels = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  const data = [120,240,180,300,260,380,420];

  new Chart(ctx, {
    type:'line',
    data:{ labels, datasets:[{
      label:'Visitors',
      data,
      borderColor:'#10b981',
      backgroundColor:g,
      fill:true,
      tension:0.36,
      borderWidth:2,
      pointRadius:0
    }]},
    options:{
      responsive:true,
      maintainAspectRatio:false,
      plugins:{ legend:{display:false} },
      animation:{ duration:1400, easing:'easeOutQuart' },
      scales:{ y:{ beginAtZero:true, grid:{color:'rgba(0,0,0,0.04)'}}, x:{ grid:{display:false} } }
    }
  });
})();

/* ---------------------------
   small UX: prevent large motion if user prefers reduced motion
----------------------------*/
if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  Chart.defaults.animation.duration = 0;
}

/* ---------------------------
   small helper: animate row appearance once DOM ready
----------------------------*/
document.addEventListener('DOMContentLoaded', ()=>{
  document.querySelectorAll('.row-anim').forEach((r,i)=>{
    r.style.animationDelay = (i*60)+'ms';
  });
  
});

  tailwind.config = {
    darkMode: 'class',
    theme: { extend: {
      colors: { primary: '#3b82f6', secondary: '#f97316', accent: '#10b981' },
      keyframes: {
        slideUp: { '0%': { opacity: 0, transform: 'translateY(12px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } }
      },
      animation: { slideUp: 'slideUp 520ms cubic-bezier(.2,.9,.3,1) both' }
    } }
  }

  