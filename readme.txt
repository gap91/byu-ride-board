This is the CS 360 Fall 2015 Group Project by:

Jordan Millard
Dave Bennett
Garrett Porter

This project is a BYU ride board to benefit BYU students and Provo residents.

________________________________________________________________________
Features:

Login/Register (Group):
-Register User
-Login
-Logout

Store Trip/User Information in MongoDB (Group):
-User Table
	Name
	UserName
	Password
-Trip Table
	Destination
	Leave Date
	Return Date
	Contact Information
	Description
	Number of Seats in Vehicle

Dashboard (Dave):
-Displays all trips user has created or added to from search page
-If empty display content with link to search or create trips

Search (Jordan):
-Search Bar to enter a desired destination
-Specify Search Radius (miles)
-Optionally specify a latest leave by date
-Filter and list all trips based on search criteria
-Button to add a search result to your personal dashboard

Create Trip (Garrett):
-Input Fields (* for required):
	*Destination (returns error if google can't return valid lat/lon)
	*Leave Date
	*Return Date
	*Contact Information of choice
	Description
	Number of seats in vehicle


________________________________________________________________________
Future Enhancements:

Dashboard
-Edit Trip
-Profile Picture
-Password Recovery
-Use Passport(or other tool) to login with Facebook
-User messaging service (With disclaimer/warning)
-Appx Trip Times

Create
-Post Passenger Trip (Trip request)
-Specify trip origin (instead of all based at BYU)

Search
-Link in results to open in separate page
-Maps with search results

Universal Improvement
-Show a map with the destination route wherever trips are displayed
-Adds to help support the site OR Paypal donation box in dashboard
