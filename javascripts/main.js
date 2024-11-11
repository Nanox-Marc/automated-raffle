var input = document.getElementById('input')
const winnerList = [];
const generatedNumbers = new Set();
var clickCount = 0;
let drumRollActive = false;
let raffleNumberOnly = false;
let developerMode = false;
let fullscreenMode = false;
let drumBtnLabel = "";
let raffleNumBtnLabel = "";
let devBtnLabel = "";
let fullscreenLabel = "";
let theme = "theme-silver";
var drumRollWinner = document.getElementById("winnerAudio"); 

// Setting Timer On or Off (Drum Rolls)
$("#drumRollBtn").click(function(){
  drumRollActive = !drumRollActive;

  if(drumRollActive == true) {
    drumBtnLabel = "ON"
    $('#drumRollBtn').removeClass('btn-outline-dark');
    $('#drumRollBtn').addClass('btn-dark');
  } else {
    drumBtnLabel = "OFF"
    $('#drumRollBtn').removeClass('btn-dark');
    $('#drumRollBtn').addClass('btn-outline-dark');
  }
  document.getElementById("drumRollBtn").innerHTML = drumBtnLabel;
});

// Display Raffle No. Only
$("#raffleNumBtn").click(function(){
  raffleNumberOnly = !raffleNumberOnly;

  if(raffleNumberOnly == true) {
    raffleNumBtnLabel = "ON"
    $('#raffleNumBtn').removeClass('btn-outline-dark');
    $('#raffleNumBtn').addClass('btn-dark');
    $('#displayRaffleNoOnly').modal('show');
  } else {
    raffleNumBtnLabel = "OFF"
    $('#raffleNumBtn').removeClass('btn-dark');
    $('#raffleNumBtn').addClass('btn-outline-dark');
  }
  document.getElementById("raffleNumBtn").innerHTML = raffleNumBtnLabel;
});

$("#devModeBtn").click(function(){
  developerMode = !developerMode;

  if(developerMode == true) {
    devBtnLabel = "ON"
    $('#devModeBtn').removeClass('btn-outline-dark');
    $('#devModeBtn').addClass('btn-dark');
    alert("DEVELOPER MODE IS ACTIVATED \n \nRandom computer generated number will be shown on the screen before revealing of the winner. \n \nPURPOSE: To counter check and confirm if the random computer generated number is matched on the excel row number of the winner.");
  } else {
    devBtnLabel = "OFF"
    $('#devModeBtn').removeClass('btn-dark');
    $('#devModeBtn').addClass('btn-outline-dark');
  }
  document.getElementById("devModeBtn").innerHTML = devBtnLabel;
});

$("#themeBtn").click(function(event){
  event.stopPropagation();

  if(theme == "theme-silver") {
    theme = "theme-gold";
    $('#appBody').removeClass('theme-silver');
    $('#appBody').addClass('theme-gold');

    $('#themeBtn').removeClass('btn-theme-silver');
    $('#themeBtn').addClass('btn-theme-gold');

    $('#displayWinnerBody').removeClass('display-theme-silver');
    $('#displayWinnerBody').addClass('display-theme-gold');
  } 
  else if(theme == "theme-gold") {
    theme = "theme-green";
    $('#appBody').removeClass('theme-gold');
    $('#appBody').addClass('theme-green');

    $('#themeBtn').removeClass('btn-theme-gold');
    $('#themeBtn').addClass('btn-theme-green');

    $('#displayWinnerBody').removeClass('display-theme-gold');
    $('#displayWinnerBody').addClass('display-theme-green');
  }
  else if(theme == "theme-green") {
    theme = "theme-red";
    $('#appBody').removeClass('theme-green');
    $('#appBody').addClass('theme-red');

    $('#themeBtn').removeClass('btn-theme-green');
    $('#themeBtn').addClass('btn-theme-red');

    $('#displayWinnerBody').removeClass('display-theme-green');
    $('#displayWinnerBody').addClass('display-theme-red');
  }
  else if(theme == "theme-red") {
    theme = "theme-yellow";
    $('#appBody').removeClass('theme-red');
    $('#appBody').addClass('theme-yellow');

    $('#themeBtn').removeClass('btn-theme-red');
    $('#themeBtn').addClass('btn-theme-yellow');

    $('#displayWinnerBody').removeClass('display-theme-red');
    $('#displayWinnerBody').addClass('display-theme-yellow');

    $('#random-button').addClass('btn-gold-only');
  }
  else if(theme == "theme-yellow") {
    theme = "theme-purple";
    $('#appBody').removeClass('theme-yellow');
    $('#appBody').addClass('theme-purple');

    $('#themeBtn').removeClass('btn-theme-yellow');
    $('#themeBtn').addClass('btn-theme-purple');

    $('#displayWinnerBody').removeClass('display-theme-yellow');
    $('#displayWinnerBody').addClass('display-theme-purple');

    $('#random-button').removeClass('btn-gold-only');
  }

  else if(theme == "theme-purple") {
    theme = "theme-neon";
    $('#appBody').removeClass('theme-purple');
    $('#appBody').addClass('theme-neon');

    $('#themeBtn').removeClass('btn-theme-purple');
    $('#themeBtn').addClass('btn-theme-neon');

    $('#displayWinnerBody').removeClass('display-theme-purple');
    $('#displayWinnerBody').addClass('display-theme-neon');
  }

  else if(theme == "theme-neon") {
    theme = "theme-street";
    $('#appBody').removeClass('theme-neon');
    $('#appBody').addClass('theme-street');

    $('#themeBtn').removeClass('btn-theme-neon');
    $('#themeBtn').addClass('btn-theme-street');

    $('#displayWinnerBody').removeClass('display-theme-neon');
    $('#displayWinnerBody').addClass('display-theme-street');
  }

  else if(theme == "theme-street") {
    theme = "theme-silver";
    $('#appBody').removeClass('theme-street');
    $('#appBody').addClass('theme-silver');

    $('#themeBtn').removeClass('btn-theme-street');
    $('#themeBtn').addClass('btn-theme-silver');

    $('#displayWinnerBody').removeClass('display-theme-street');
    $('#displayWinnerBody').addClass('display-theme-silver');
  }

});

$("#fullScreenMode").click(function(){
  fullscreenMode = !fullscreenMode;

  if(fullscreenMode == true) {
    fullscreenLabel = "ON";
    fullScreen();
    $('#fullScreenMode').removeClass('btn-outline-dark');
    $('#fullScreenMode').addClass('btn-dark');
  } else {
    fullscreenLabel = "OFF";
    exitFullScreen();
    $('#fullScreenMode').removeClass('btn-dark');
    $('#fullScreenMode').addClass('btn-outline-dark');
  }
  document.getElementById("fullScreenMode").innerHTML = fullscreenLabel;
});

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
    document.getElementById("uploadExcelFileHere").classList.add("hide");
    document.getElementById("employeeSize").innerHTML = employeeCount;

    $(document).ready( function () {
      $('#excelFormat').modal('hide');
    } );

    // fullscreenMode = true;
    // fullscreenLabel = "ON";
    fullScreen();
    // $('#fullScreenMode').removeClass('btn-outline-dark');
    // $('#fullScreenMode').addClass('btn-dark');
    // document.getElementById("fullScreenMode").innerHTML = fullscreenLabel;
  })
})

document.getElementById('random-button').addEventListener('click', () => {
  try {

    readXlsxFile(input.files[0]).then(function(rows) {

      // Total Count of Employee
      const employeeCount = (rows.length)-1;
      const hasInputRaffle = document.getElementById("raffleItem").value;
      const trimHasInputRaffle = hasInputRaffle.trim();

      // Function to generate random integer between the specified min and max values.
      // function getRandomInt(min, max) {
      //   const crypto = window.crypto || window.msCrypto;
      //   const array = new Uint32Array(1);
      //   crypto.getRandomValues(array);
      //   return min + (array[0] % (max - min + 1));
      // }

      if(trimHasInputRaffle != "") {
          //random pick for the lucky winner. This is the X Axis.
          let randomNumber;
          if(generatedNumbers.size != employeeCount) {
            do {
                  // Generate a random number between 1 and maximum possible
                  randomNumber = getRandomInt(1, employeeCount);
                  // randomNumber = Math.floor(Math.random() * employeeCount) + 1;
              } while (generatedNumbers.has(randomNumber));
      
              if(developerMode){
                alert("DEV MODE IS ON  \nRandom Generated Number: "+randomNumber);
                console.log("Random Generated Number: "+randomNumber);
              }
              
              // Add the new number to the set
              generatedNumbers.add(randomNumber);
      
              //setting the excel index. This is the Y Axis
              const indexEmployeeId = 1;
              const indexFirstName = 2;
              const indexRaflleNumber = 7;
              const indexLastName = 4;
              const indexDivision = 6;
              const indexDepartment = 5;
      
              //getting the winner's details. 
              const winnerEmployeeID = rows[randomNumber][indexEmployeeId];
              const winnerFirstName = rows[randomNumber][indexFirstName];
              const winnerLastName = rows[randomNumber][indexLastName];
              let winnerFullName = winnerFirstName + " " + winnerLastName;
              const winnerDivision = rows[randomNumber][indexDivision];
              const winnerDepartment = rows[randomNumber][indexDepartment];
              const WinnerPriceItem = document.getElementById("raffleItem").value;

              if(raffleNumberOnly) {
                winnerFullName = rows[randomNumber][indexRaflleNumber];
                $('#nameOrRaffleNo').addClass('raffleNumberOnly');
                $('#dmWinner').addClass('raffle-number');
              } else {
                $('#nameOrRaffleNo').removeClass('raffleNumberOnly');
                $('#dmWinner').removeClass('raffle-number');
              }
      
      
              if (!winnerList.includes(winnerEmployeeID)) {
      
                // Append the user to the winnerList if the user's ID doesn't exist on the list
                winnerList.push(winnerEmployeeID);
                console.log(winnerList);
      
                document.getElementById("dmWinner").innerHTML = winnerFullName;
                document.getElementById("dmDepartment").innerHTML = winnerDepartment;
                document.getElementById("dmIdNumber").innerHTML = winnerEmployeeID;
                document.getElementById("dmPrize").innerHTML = WinnerPriceItem;
      
                if(drumRollActive) {
                  drumRollWinner.play();

                  $(document).ready( function () {
                    $('#drumRollModal').modal('show');
                  } );

                  setTimeout(()=> {
                    $(document).ready( function () {
                      $('#drumRollModal').modal('hide');
                      $('#staticBackdrop').modal('show');
                    } );
                  } ,5200);

                } else {
                  $(document).ready( function () {
                    $('#staticBackdrop').modal('show');
                  } );
                }
                
                
              } else {
                // Nothing will happend. If the picked employee is already on the winner list nothing will be append on the winnerList Array. 
              }
      
          } else {
            $(document).ready( function () {
              $('#duplicateModal').modal('show');
            } );
          }
      } else {
        $(document).ready( function () {
          $('#noRaffleItem').modal('show');
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

$("#faqTryRan").click(function(){
    const tryMin = parseInt(document.getElementById("faqMinVal").value);
    const tryMax = parseInt(document.getElementById("faqMaxVal").value);

    if(tryMax <= 9999999999 && tryMax > tryMin) {
      const tryResult = getRandomInt(tryMin, tryMax);
      document.getElementById("faqRanResult").innerHTML = tryResult;
    } else if(tryMax < tryMin) {
      alert("Hmmmm, looks like your Minimum number is greater than or equal to the Maximum number.");
    } else if(tryMax == tryMin) {
      alert("Hmmmmmm looks like you have inputed the same number for the minimum and maximum.");
    } else {
      alert("Please limit your maximum number to below 9,999,999,999");
    }
});

$("#faqTryProb").click(function(){
  const tryEmpEnt = parseInt(document.getElementById("faqEmpEnt").value);
  const tryTotEnt = parseInt(document.getElementById("faqTotEnt").value);

  if(tryEmpEnt < tryTotEnt) {
    const tryProbResult = (tryEmpEnt/tryTotEnt)*100;
    if (tryProbResult !== Math.floor(tryProbResult)) {
      document.getElementById("faqProbResult").innerHTML = tryProbResult.toFixed(4);
    } else {
      document.getElementById("faqProbResult").innerHTML = tryProbResult;
    }  
  } else {
    alert("Hmmmm, looks like your Raffle Entry is greater than or equal to the Total Entry.");
  }
  
  
});

function getRandomInt(min, max) {
  const crypto = window.crypto || window.msCrypto;
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return min + (array[0] % (max - min + 1));
}

function fullScreen() {
  if (document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen();
  } else if (document.documentElement.mozRequestFullScreen) { // Firefox
    document.documentElement.mozRequestFullScreen();
  } else if (document.documentElement.webkitRequestFullscreen) { // Chrome, Safari and Opera
    document.documentElement.webkitRequestFullscreen();
  } else if (document.documentElement.msRequestFullscreen) { // IE/Edge
    document.documentElement.msRequestFullscreen();
  }
};

function exitFullScreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.mozCancelFullScreen) { // Firefox
    document.mozCancelFullScreen();
  } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { // IE/Edge
    document.msExitFullscreen();
  }
};

function checkFullscreen() {

  if (window.innerHeight == screen.height) {
    fullscreenLabel = "ON";
    fullscreenMode = true;
    $('#fullScreenMode').removeClass('btn-outline-dark');
    $('#fullScreenMode').addClass('btn-dark');
  } else {
    fullscreenLabel = "OFF";
    fullscreenMode = false;
    $('#fullScreenMode').removeClass('btn-dark');
    $('#fullScreenMode').addClass('btn-outline-dark');
  }

  document.getElementById("fullScreenMode").innerHTML = fullscreenLabel;
}



// window.addEventListener('resize', checkFullscreen);
