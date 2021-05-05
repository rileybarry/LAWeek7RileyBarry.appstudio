customerDelete.onshow = function() {
  query = "SELECT * FROM customer"
  req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)

  if (req.status == 200) { //transit trip worked. 
    results = JSON.parse(req.responseText)
    
    if (results.length == 0)
      lblDelete.value = "There are no customers in the database."
    else {
      let message = ""
      for (i = 0; i < results.length; i++)
        message = message + results[i][1] + "\n"
      txtaDelete.value = message
    } // end else

  } else // the transit didn't work - bad wifi? server turned off?
    lblDelete.value = "Error code: " + req.status
}

btnDelete.onclick = function() {
  let cusName = inptDelete.value
  for (i = 0; i < results.length; i++) {
    if (cusName == results[i][1]) {
      query = "DELETE FROM customer WHERE name= '" + cusName + "'"
      req = Ajax("https://ormond.creighton.edu/courses/375/ajax-connection.php", "POST", "host=ormond.creighton.edu&user=" + netID + "&pass=" + pw + "&database=" + netID + "&query=" + query)
      if (req.status == 200)
        lblDelete.value = `You have successfully deleted the customer named ${cusName}`
      else
        lblDelete.value = "Error code: " + req.status  
    }
  }
}