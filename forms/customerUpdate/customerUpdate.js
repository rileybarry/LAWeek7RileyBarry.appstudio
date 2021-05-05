customerUpdate.onshow = function() {
  query = "SELECT * FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)

  if (req.status == 200) { //transit trip worked. 
    results = JSON.parse(req.responseText)
    
    if (results.length == 0)
      console.log("There are no customers in the database.")
    else {
      let message = ""
      for (i = 0; i < results.length; i++)
        message = message + results[i][1] + "\n"
      txtaUpdate.value = message
    } // end else

  } else // the transit didn't work - bad wifi? server turned off?
    console.log("Error code: " + req.status)
}

btnUpdate.onclick=function(){
  let newName = inptNew.value
  let checkName = inptOld.value
  
  query = "SELECT name FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
  resultsName = JSON.parse(req.responseText)
  
  if (req.status == 200) { //everything worked.
    for (i = 0; i < resultsName.length; i ++) {
      if (checkName == resultsName[i]) {
        console.log('this name exists')
        
        query = "UPDATE customer SET name =" + '"' + newName + '"' + " WHERE name = " + '"' + checkName + '"'
        req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
        
        if (req.status == 200) {
          console.log('Name updated')
          location.reload()
        } else
          console.log('Name not updated')
      } else
        console.log('name does not exist')
    }
  } else {
    console.log('failure')
  }
}