//  This file contain code for rendering Image.

//Function to populate cards Dynamically. 
const populateCard = function(employeeName, employeeTitle, employeeEmail, employeeNumber, paramKey, paramValue) {
    var managecard = `
    <div class="col-sm" style="padding-top: 10px; padding-left: 10px;">
        <div class="card" style="width: 18rem;">
            <div class="card-body" style="width: 18rem; background-color: blue; color: white;">
                <h5 class="card-title">${employeeName}</h5>
                <p class="card-text">${employeeTitle}</p>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${employeeNumber}</li>
                <li class="list-group-item">Email: <a href="mailto:${employeeEmail}" class="card-link">${employeeEmail}</a></li> `;

    if (paramKey == "Tel") {
        managecard = managecard + `
                    <li class="list-group-item">${paramKey}: <a href="tel:${paramValue}" class="card-link">${paramValue}</a></li> `;
    } else if (paramKey == "Github") {
        managecard = managecard + `
                    <li class="list-group-item">${paramKey}: <a href="https://github.com/${paramValue}/" class="card-link">${paramValue}</a></li> `;
    } else {
        managecard = managecard + `
                    <li class="list-group-item">${paramKey}: ${paramValue}</li> 
                    `;
    }
    managecard = managecard + `
            </ul>
        </div>
    </div>
    `;
    return managecard;
};

//Function to populate Columns dynamically with in rows. 
const populateColumn = function(manager, startIndex, EndIndex, size) {
    var message = "";

    for (var i = startIndex; i <= EndIndex; i++) {

        if (manager[i].getRole() == "Manager") {
            var paramKey = "Tel";
            var paramValue = manager[i].getOfficeNumber();
        } else if (manager[i].getRole() == "Engineer") {
            var paramKey = "Github";
            var paramValue = manager[i].getGithubDetails();
        } else if (manager[i].getRole() == "Intern") {
            var paramKey = "School Detail";
            var paramValue = manager[i].getSchoolDetail();
        } else {
            var paramKey = "";
            var paramValue = "";
        }
        message = message + `
            ${populateCard(manager[i].getName(),manager[i].getRole(),manager[i].getEmail(),manager[i].getId(),paramKey, paramValue)}
        `;
    }
    return message;
};

//Function to populate rows within Main Body and populate Manager at the top of the page. 
const populateManagerData = function(manager) {
    var managerrow = "";

    if (manager.length > 0) {
        var paramKey = "Tel";
        var paramValue = manager[0].getOfficeNumber();

        managerrow = managerrow + `
            <div class="row" style="padding-top: 10px;" >
                <div class="col-sm">
                    
                </div>
                
                     ${populateCard(manager[0].getName(),manager[0].getRole(),manager[0].getEmail(),manager[0].getId(),paramKey, paramValue)}
               
                <div class="col-sm ">
                    
                </div>
            </div>
        `;
    }
    if (manager.length > 1) {
        if (((manager.length - 1) % 3) == 0) {
            var NoOfRows = (manager.length - 1) / 3;
        } else {
            var NoOfRows = ((manager.length - 1) / 3) + 1;
        }

        var i = 1;
        var managerLength = manager.length - 1;
        for (var k = 0; k < NoOfRows; k++) {
            var size = 0;
            if (managerLength > 3) {
                size = 3;
            } else if (managerLength < 3) {
                size = managerLength;
            }
            managerLength = managerLength - size;

            if (size <= 0) {
                return managerrow;
            }

            managerrow = managerrow + `
            <div class="row" style="padding-top: 10px;"> `;

            if (size == 2) {
                managerrow = managerrow + `
                    <div class="col-sm">
                        
                    </div>
                    `;
            }

            if (size == 1) {
                managerrow = managerrow + `
                    <div class="col-sm" style="padding-left: 5px;">
                        
                    </div>
                    <div class="col-sm" style="padding-left: 5px;">
                        
                    </div>
                    `;
            }

            managerrow = managerrow + `
            ${populateColumn(manager, i, (i + (size-1)),size)}
            `;

            if (size == 2) {
                managerrow = managerrow + `
                        <div class="col-sm" style="padding-left: 5px;">
                            
                        </div>
                        `;
            }

            if (size == 1) {
                managerrow = managerrow + `
                        <div class="col-sm" style="padding-left: 5px;">
                            
                        </div>
                        <div class="col-sm" style="padding-left: 5px;">
                            
                        </div>
                        `;
            }
            managerrow = managerrow + `
            </div>
            `;
            i = i + size;
        }
    }
    return managerrow;
};


//Main Function to generate HTML. 
module.exports = (managerData) => {
    return `
  <!DOCTYPE html>
  <html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Portfolio Demo</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css">
    <link href="https://fonts.googleapis.com/css?family=Public+Sans:300i,300,500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <header>
      <div class="container flex-row justify-space-between align-center py-3">
        <h1 class="page-title text-center py-2 px-3" style="background-color: red; color: white;">My Team</h1>
      </div>
    </header>
    <main>
        <div class="container">
            ${populateManagerData(managerData)}
       </div>
    </main> 

    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
  </body>
  </body>
  </html>
  `;
}