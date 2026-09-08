export const patients = [
  { id: "SV-1001", name: "Sarah Miller", age: 67, hr: 104, spo2: 87, temp: 37.1, status: "Critical", battery: 72, signal: 92 },
  { id: "SV-1002", name: "John Carter", age: 58, hr: 76, spo2: 98, temp: 36.7, status: "Stable", battery: 84, signal: 97 },
  { id: "SV-1003", name: "Alice Wong", age: 74, hr: 92, spo2: 95, temp: 37.4, status: "Warning", battery: 61, signal: 89 },
  { id: "SV-1004", name: "Daniel Harris", age: 63, hr: 81, spo2: 97, temp: 36.8, status: "Stable", battery: 91, signal: 95 },
  { id: "SV-1005", name: "Mary Collins", age: 71, hr: 138, spo2: 90, temp: 38.2, status: "Critical", battery: 46, signal: 87 }
];

export const alerts = [
  { patient: "Sarah Miller", type: "Low SpO₂", value: "87%", time: "2 min ago", level: "Critical" },
  { patient: "Mary Collins", type: "High heart rate", value: "138 BPM", time: "8 min ago", level: "Critical" },
  { patient: "Alice Wong", type: "Raised temperature", value: "37.4 °C", time: "17 min ago", level: "Warning" }
];
