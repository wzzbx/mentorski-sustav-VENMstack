# mentorski_sustav

# Node install
  
  https://nodejs.org/en/ -> instalirajte node

# MongoDB install
  
  https://www.mongodb.org -> instalirajte mongodb ver 3.0.x kasnije verzije su pravile određene probleme. Nakon instalacije potrebno    je kreirati direktorij ( C:\data\db ) Pronaci direktorij u koji ste instalirali MongoDB te pokrenuti mongod servis Naredbe za import   kolekcija u bazu ( kolekcije cete pronaci u mongodb_import )

    # mongoimport --db mSustav --collection users --file users.json
    # mongoimport --db mSustav --collection predmets --file predmets.json
  
https://docs.mongodb.org/manual/reference/program/mongoimport/

# Instalacija ( biti u direktoriju gdje se nalazi repositorij e.g ( c:\mSustav ) )

    npm install 
    cd public
    npm install 

    Za pokretanje potreba su dva terminala svaki za svoj server

    # 1 terminal e.g ( c:\mSustav )
    node server.js
    # 2 terminal e.g ( c:\mSustav\public )
    npm run dev
    Nakon toga potrebno je otici na http://localhost:8000

    username: mentor@oss.hr , mentor1@oss.hr  , red@oss.hr
    password: 123   // isti password za sve korisnike
