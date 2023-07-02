// Thinzar Hnin Yu
// DIT/FT/1B/03
// 2201014

Download the file P2201014_CA2_DIT1B03.zip and unzip the folder.

Open MySQL Workbench.
Click on Administration, and then click on Users and Priviledges under Management.
Click on "Add Account" and add "bed_dvd_root" as the Login Name. Add "pa$$woRD123" as the Password. Type the password again for Confirm Password.
Under Administrative Roles, select all priviledges for the user. Click on "Apply" to add the user and apply the priviledges to the user. 
Create a new schema by clicking on the cylindrical + icon and name it "bed_dvd_db".
Select the bed_dvd_db. Click on File >> Open SQL Script, and choose "sakila_bed" from the folder that was unzipped.
If "Unknown File Encoding" pops up, click on "OK".
Run the SQL Script by clicking on the icon similar to a lightning icon at the top. 
Refresh the schemas by clicking on the "Refresh" icon beside "Schemas" to check that the new tables have been created.
MySQL Workbench is now all set up!

Open Visual Studio Code.
From File >> Open Folder, choose the folder that was unzipped to open in Visual Studio Code.
Right click on Client >> Open in Integrated Terminal.
Right click on Server >> Open in Integrated Terminal. 
Inside the terminal, you can run the server by using either "node server.js" or "npm run start-dev" as Nodemon is already installed in this project.
By using "node server.js", in the cases of errors or changes in the codes, the server has to be restarted. To do this, end the server using CTRL + C if needed, and run the server again using the same command, "node server.js".
Nodemon eliminates the need to restart the server repeatedly, and provides more convenience. Once the "npm run start-dev" command is run, the server will be restarted automatically everytime there is a change in the code, and the file has been saved. To end the server, similar to above, we can use CTRL + C.
Visual Studio Code is now all set up!

Open Google Chrome or local browser in laptop/desktop. 
Go to http://localhost:8082/ to start the web server.

The project is now good-to-go to be tested for the Endpoints.

There is a document named Additional_API.docx where additional Endpoints are documented to be tested.