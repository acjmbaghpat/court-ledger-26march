const form = document.getElementById("form");
const table = document.getElementById("data");

let records = JSON.parse(localStorage.getItem("courtData")) || [];

function showData(){
  table.innerHTML = "";
  records.forEach((r,index)=>{
    table.innerHTML += `
      <tr>
        <td>${r.party}</td>
        <td>${r.section}</td>
        <td>${r.ps}</td>
        <td>${r.receive}</td>
        <td>${r.next}</td>
      </tr>`;
  });
}

showData();

form.onsubmit = function(e){
  e.preventDefault();

  records.push({
    party: party.value,
    section: section.value,
    ps: ps.value,
    receive: receive.value,
    next: next.value
  });

  localStorage.setItem("courtData", JSON.stringify(records));
  form.reset();
  showData();
};
document.getElementById("search").oninput = function(){
  const q = this.value.toLowerCase();
  const filtered = records.filter(r =>
    r.party.toLowerCase().includes(q) ||
    r.section.toLowerCase().includes(q)
  );
  showFiltered(filtered);
};

function showFiltered(list){
  table.innerHTML = "";
  list.forEach(r=>{
    table.innerHTML += `
      <tr>
        <td>${r.party}</td>
        <td>${r.section}</td>
        <td>${r.ps}</td>
        <td>${r.receive}</td>
        <td>${r.next}</td>
      </tr>`;
  });
}
function showData(){
  table.innerHTML = "";
  records.forEach((r,index)=>{
    table.innerHTML += `
      <tr>
        <td>${r.party}</td>
        <td>${r.section}</td>
        <td>${r.ps}</td>
        <td>${r.receive}</td>
        <td>${r.next}</td>
        <td>
          <button onclick="deleteRow(${index})">Delete</button>
        </td>
      </tr>`;
  });
}
function deleteRow(i){
  if(confirm("Delete this record?")){
    records.splice(i,1);
    localStorage.setItem("courtData", JSON.stringify(records));
    showData();
  }
}
function todayReceive(){
  const today = new Date().toISOString().slice(0,10);
  const list = records.filter(r => r.receive === today);
  showFiltered(list);
}
function downloadExcel(){
  let csv = "Party,Section,PS,Receive,Next\n";
  records.forEach(r=>{
    csv += `${r.party},${r.section},${r.ps},${r.receive},${r.next}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "court_ledger.csv";
  a.click();
}
