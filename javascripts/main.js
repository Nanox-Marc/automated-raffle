var input = document.getElementById('input')
const winnerList = [];
const generatedNumbers = new Set();
var clickCount = 0;

$(document).ready( function () {

  $('#winnersTbl').DataTable( {
      dom: 'Bfrtip',
      buttons: [
           'csv'
      ],

  "ordering": true,
  "searching": true,
  "language": {
      "info": "Showing _START_ to _END_ of _TOTAL_ Winners",
  },
  
  "lengthChange": false,
  "lengthMenu": [[10, 10], [10, 10]],
  
  } );

} );

input.addEventListener('change', () => {
  readXlsxFile(input.files[0]).then((rows) => {
    const excelFileName = input.files.item(0).name;
    const employeeCount = (rows.length)-1;
    document.getElementById("displayFileName").innerHTML = "SOURCE FILE: " + excelFileName;
    document.getElementById("input").classList.add("hide");
    document.getElementById("employeeSize").innerHTML = employeeCount;
  })
})

document.getElementById('random-button').addEventListener('click', () => {
  try {

    readXlsxFile(input.files[0]).then(function(rows) {

      // Total Count of Employee
      const employeeCount = (rows.length)-1;
  
      // List of current winners
      
  
      //random pick for the lucky winner. This is the X Axis.
      let randomNumber;
      if(generatedNumbers.size != employeeCount) {
        do {
              // Generate a random number between 1 and 100
              randomNumber = Math.floor(Math.random() * employeeCount) + 1;
          } while (generatedNumbers.has(randomNumber));
  
          // Add the new number to the set
          generatedNumbers.add(randomNumber);
  
          //setting the excel index. This is the Y Axis
          const indexEmployeeId = 1;
          const indexFirstName = 2;
          const indexLastName = 3;
          const indexDivision = 4;
          const indexDepartment = 5;
  
          //getting the winner's details. 
          const winnerEmployeeID = rows[randomNumber][indexEmployeeId];
          const winnerFirstName = rows[randomNumber][indexFirstName];
          const winnerLastName = rows[randomNumber][indexLastName];
          const winnerFullName = winnerFirstName + " " + winnerLastName;
          const winnerDivision = rows[randomNumber][indexDivision];
          const winnerDepartment = rows[randomNumber][indexDepartment];
          const WinnerPriceItem = document.getElementById("raffleItem").value;
  
  
          if (!winnerList.includes(winnerEmployeeID)) {
  
            // Append the user to the winnerList if the user's ID doesn't exist on the list
            winnerList.push(winnerEmployeeID);
            console.log(winnerList);
  
            document.getElementById("dmWinner").innerHTML = winnerFullName;
            document.getElementById("dmDepartment").innerHTML = winnerDepartment;
            document.getElementById("dmIdNumber").innerHTML = winnerEmployeeID;
            document.getElementById("dmPrize").innerHTML = WinnerPriceItem;
  
            $(document).ready( function () {
              $('#staticBackdrop').modal('show');
            } );
            
          } else {
            // Nothing will happend. If the picked employee is already on the winner list nothing will be append on the winnerList Array. 
          }
  
      } else {
        $(document).ready( function () {
          $('#duplicateModal').modal('show');
        } );
      }  
  
    })

  } catch(error) {
    $(document).ready( function () {
      $('#noFileModal').modal('show');
    } );
  }
});

// Deciding if the winner is present or not
$("#btnClaim").click(function(){
  var saveTableEmployeeId = document.getElementById("dmIdNumber").innerHTML;
  var saveTableFullName = document.getElementById("dmWinner").innerHTML;
  var saveTableDepartment = document.getElementById("dmDepartment").innerHTML;
  var saveTablePrizeItem = document.getElementById("dmPrize").innerHTML;

  var WinnerTable = document.getElementById("winnersTbl");
  var row = WinnerTable.insertRow(1);
  clickCount = clickCount+1;
  function addNewRow() {
   table.row
       .add([
           clickCount,
           saveTableEmployeeId,
           saveTableFullName,
           saveTableDepartment,
           saveTablePrizeItem
       ])
       .draw(false);               
 }
 const table = new DataTable('#winnersTbl');
 addNewRow();
});
