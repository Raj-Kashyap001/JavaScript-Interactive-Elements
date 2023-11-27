const data = localStorage.getItem("mydata");

const blob = new Blob([data], { type: "application/json" });

const url = URL.createObjectURL(blob);

const link = document.createElement("a");

link.href = url;

link.download = "data.json";

link.click();

URL.revokeObjectURL(url);
