// Team Performance Chart
const ctx1 = document.getElementById("teamChart");

new Chart(ctx1, {
  type: "bar",
  data: {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Team 1",
        data: [60, 75, 80, 90, 70, 85],
        backgroundColor: "#4f46e5",
      },
      {
        label: "Team 2",
        data: [55, 65, 70, 78, 66, 72],
        backgroundColor: "#16a34a",
      },
      {
        label: "Team 3",
        data: [45, 60, 68, 74, 59, 65],
        backgroundColor: "#f59e0b",
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

// New Members Chart
const ctx2 = document.getElementById("barChart");

new Chart(ctx2, {
  type: "bar",
  data: {
    labels: ["A", "B", "C", "D", "E", "F"],
    datasets: [
      {
        label: "Members",
        data: [150, 220, 180, 300, 240, 280],
        backgroundColor: "#6366f1"
      }
    ]
  },
  options: {
    responsive: true,
    maintainAspectRatio: false
  }
});

 const toggle = document.getElementById('toggle');
  const dot = toggle.nextElementSibling; // selects the div.dot

  toggle.addEventListener('change', () => {
    if (toggle.checked) {
      dot.classList.add('translate-x-7', 'bg-indigo-600'); // move dot & change color
      document.documentElement.classList.add('dark'); // enable dark mode
    } else {
      dot.classList.remove('translate-x-7', 'bg-indigo-600');
      document.documentElement.classList.remove('dark'); // disable dark mode
    }
  });