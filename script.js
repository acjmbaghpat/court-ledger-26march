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
