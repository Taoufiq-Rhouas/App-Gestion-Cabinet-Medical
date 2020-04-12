const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;


const readJsonclient = fs.readFileSync('./data/client.json');

const readJsonVisit=fs.readFileSync('./data/visitemedicale.json');

const readJson4=fs.readFileSync('./data/compte.json');

let listVisit=JSON.parse(readJsonVisit);

let dataclient = JSON.parse(readJsonclient);

let data4=JSON.parse(readJson4);

app.set('views', './views'); // specify the views directory
app.set('view engine', 'ejs'); // register the template engine
app.use(express.static(__dirname + '/'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/views'));



//lhma9 bda 
// var localnameval = '';
// app.get('/accueil/:name', (req, res) => {
	app.get('/accueil', (req, res) => {
	// var {name}= req.params;
	// localnameval = ''+name;
	// Console.log(localStorage);
	// res.render('accueil', { dataclient,name });
	res.render('accueil', { dataclient });
});

app.get('/', (req, res) => {
	res.render('index2');
});


// lhma9 sala



//lhma9 bda
// *********************************************************************************************************************
// add compte
// var walo = "abdo";
app.get('/inscription1', (req, res) => {
	res.render('inscription');
});
var conturemail = 0;
app.post('/addCompte', (req, res) => {
	const { name,lname,role,email,password} = req.body;
	for (let i = 0; i < data4.length; i++) {
		if (email === data4[i].email) {
			conturemail = 1;
		}
	}
	if(conturemail == 1){
		res.redirect('inscription1/'+ req.body.email);
		app.get('/inscription1/:email', (req, res) => {
			var {email}= req.params;
			res.render('inscription', { email });
		});
	}
	else if(conturemail==0){
		data4.push({ ID: data4.length + 1, name: name, lname: lname,role:role,email:email,password:password });
	
		fs.writeFileSync('./data/compte.json', JSON.stringify(data4, null, 4));
		// res.redirect('accueil');
		// res.redirect('accueil/'+ req.body.name);
		res.redirect('accueil');
		//this local storage
	}
	// data4.push({ ID: data4.length + 1, name: name, lname: lname,role:role,email:email,password:password });
	
	// fs.writeFileSync('./data/compte.json', JSON.stringify(data4, null, 4));
	// // res.redirect('accueil');
	// res.redirect('accueil/'+ req.body.name);
	// resp.redirect('/addVisiteMedicale/'+ req.body.visitem+"/" + req.body.ID);
});
// localStorage.setItem("sifet",sifet);
// localStorage.setItem("na",name);




app.get('/login2faux', (req, res) => {
	res.render('login2');
});
var name ="";
var conturlogin = 0;
app.post('/login2', (req, res) => {
	const { email,password} = req.body;
	for (let i = 0; i < data4.length; i++) {
		if (email === data4[i].email && password === data4[i].password) {
			conturlogin = 1;
			name = data4[i].email
		}
	}
	if(conturlogin == 1 && name.length>0){
		// res.redirect('accueil/'+ name);
		res.redirect('accueil');
		// res.redirect('accueil/'+ req.body.name);

		// res.redirect('inscription1/'+ req.body.email);
		// app.get('/inscription1/:email', (req, res) => {
		// 	var {email}= req.params;
		// 	res.render('inscription', { email });
		// });
	}
	else if(conturemail==0 && name.length==0){
		res.redirect('login2faux/'+ req.body.email);
		app.get('/login2faux/:email', (req, res) => {
			var {email}= req.params;
			res.render('login2', { email });
		});
		// res.redirect('inscription1/'+ req.body.email);
		// app.get('/inscription1/:email', (req, res) => {
		// 	var {email}= req.params;
		// 	res.render('inscription', { email });
		// });
		// data4.push({ ID: data4.length + 1, name: name, lname: lname,role:role,email:email,password:password });
	
		// fs.writeFileSync('./data/compte.json', JSON.stringify(data4, null, 4));
		// res.redirect('accueil');
		// res.redirect('accueil/'+ req.body.name);
	}
	// data4.push({ ID: data4.length + 1, name: name, lname: lname,role:role,email:email,password:password });
	
	// fs.writeFileSync('./data/compte.json', JSON.stringify(data4, null, 4));
	// // res.redirect('accueil');
	// res.redirect('accueil/'+ req.body.name);
	// resp.redirect('/addVisiteMedicale/'+ req.body.visitem+"/" + req.body.ID);
});




// *********************************************************************************************************************
//lhma9 sala



//lhma9 bda
// *********************************************************************************************************************

// add client
app.get('/addclient', (req, res) => {
	res.render('addclient');
});

app.post('/addclient', (req, res) => {
	const { fname, lname,cin} = req.body;

	dataclient.push({ ID: dataclient.length + 1+'-'+cin, fname: fname, lname: lname,cin:cin });
	fs.writeFileSync('./data/client.json', JSON.stringify(dataclient, null, 4));
	// res.redirect('accueil/'+localnameval);
	res.redirect('accueil');
});


app.get('/editclient/:id', (req, res) => {
	const { id } = req.params;
	let datclientaId;

	for (let i = 0; i < dataclient.length; i++) {
		if (id === dataclient[i].ID) {
			datclientaId = i;
		}
	}

	res.render('editclient', { dataclient: dataclient[datclientaId] });
});

app.post('/editclient/:id', (req, res) => {
	const { id } = req.params;
	const { fname, lname,cin } = req.body;

	let datclientaId;
	for (let i = 0; i < dataclient.length; i++) {
		if (id === dataclient[i].ID) {
			datclientaId = i;
		}
	}

	dataclient[datclientaId].fname = fname;
	dataclient[datclientaId].lname = lname;
	dataclient[datclientaId].cin = cin;
	// data[dataId].desc = desc;
	// data[dataId].departements = departements;

	fs.writeFileSync('./data/client.json', JSON.stringify(dataclient, null, 4));
	// res.redirect('/accueil/'+localnameval);
	res.redirect('/accueil');  
});

app.get('/deleteclient/:id', (req, res) => {
	const { id } = req.params;

	const newDataclient = [];
	for (let i = 0; i < dataclient.length; i++) {
		if (id !== dataclient[i].ID) {
			newDataclient.push(dataclient[i]);
		}
	}
 
	dataclient = newDataclient;
	fs.writeFileSync('./data/client.json', JSON.stringify(dataclient, null, 4));
	// res.redirect('/accueil/'+localnameval);
	res.redirect('/accueil');
});

// *********************************************************************************************************************
//lhma9 sala


//ha lhma9 num:3 bda

//departement
app.get('/visitemedicale/:cin/:ID',(req,resp)=>{
	var {cin}= req.params;
	var {ID}=req.params;
	for(var j=0;j<dataclient.length;j++){
	 if(dataclient[j].ID==ID && dataclient[j].cin==cin){
		resp.render('visitemedicale',{listVisit,error:"Ajouter visitemedicale",visitem:cin,ID});
	  }
	}
});
/// ADD DEPARTEMENT
app.post('/addVisiteMedicale',function(req,resp){
	if(req.body.DateInscription==="" || req.body.EffetsSecondaires==="" || req.body.TensionArterielle==="" || req.body.FrequenceCardiaque==="" || req.body.TemperatureCorporelle==="" || req.body.PoidsCorporel==="" || req.body.DiagnosticMedecin==="" || req.body.Mdicamentes==="" || req.body.ID_Client===""){
		resp.redirect('/visitemedicale/'+ req.body.visitem+"/" + req.body.ID);
	}
	else{
	for(var i in dataclient){
		if(dataclient[i].ID==req.body.ID){
			listVisit.push({
				"ID":listVisit.length+1,
				"DateInscription":req.body.DateInscription,
				"EffetsSecondaires":req.body.EffetsSecondaires,
				"TensionArterielle":req.body.TensionArterielle,
				"FrequenceCardiaque":req.body.FrequenceCardiaque,
				"TemperatureCorporelle":req.body.TemperatureCorporelle,
				"PoidsCorporel":req.body.PoidsCorporel,
				"DiagnosticMedecin":req.body.DiagnosticMedecin,
				"Mdicamentes":req.body.Mdicamentes,
			   	"ID_Client":req.body.ID
			});
			fs.writeFile('data/visitemedicale.json',JSON.stringify(listVisit,null,5),(err)=>{
				console.log(err);
			});
			// resp.redirect('/addVisiteMedicale/'+ req.body.visitem+"/" + req.body.ID);visitemedicale
			// resp.redirect('/addVisiteMedicale/');
			resp.redirect('/visitemedicale/'+ req.body.visitem+"/" + req.body.ID);
	}
}

}
});


// cc hahna hahna bda

app.get('/editvisitmidical/:cin/:ID/:idv',(req,res)=>{
	var {cin}= req.params;
	var {ID}=req.params;
	var {idv}=req.params;
	let listVisitID;
	for (let i = 0; i < listVisit.length; i++) {
		if (Number(idv) === listVisit[i].ID) {
			listVisitID = i;
		}
	}
	// for(var j=0;j<dataclient.length;j++){
	//  if(dataclient[j].ID==ID && dataclient[j].cin==cin){
		res.render('editvisitmidical',{listVisit: listVisit[listVisitID],cin,ID});
	//   }
	// }
});


app.post('/editvisitmidical/:cin/:ID/:idv', (req, res) => {
	const { cin } = req.params;
	const { ID } = req.params;
	const { idv } = req.params;
	const { DateInscription, EffetsSecondaires,TensionArterielle,FrequenceCardiaque,TemperatureCorporelle,PoidsCorporel,DiagnosticMedecin,Mdicamentes } = req.body;

	// let datclientaId;
	// for (let i = 0; i < dataclient.length; i++) {
	// 	if (Number(id) === dataclient[i].ID) {
	// 		datclientaId = i;
	// 	}
	// }

	let listVisitID;
	for (let i = 0; i < listVisit.length; i++) {
		if (Number(idv) === listVisit[i].ID) {
			listVisitID = i;
		}
	}

	// dataclient[datclientaId].fname = fname;
	listVisit[listVisitID].DateInscription = DateInscription;
	listVisit[listVisitID].EffetsSecondaires = EffetsSecondaires;
	listVisit[listVisitID].TensionArterielle = TensionArterielle;//
	listVisit[listVisitID].FrequenceCardiaque = FrequenceCardiaque;//
	listVisit[listVisitID].TemperatureCorporelle = TemperatureCorporelle;//
	listVisit[listVisitID].PoidsCorporel = PoidsCorporel;//
	listVisit[listVisitID].DiagnosticMedecin = DiagnosticMedecin;//
	listVisit[listVisitID].Mdicamentes = Mdicamentes;//
	// data[dataId].desc = desc;
	// data[dataId].departements = departements;

	// fs.writeFileSync('./data/client.json', JSON.stringify(dataclient, null, 4));
	// res.redirect('/accueil/'+localnameval);
	// res.redirect('/accueil');
	
	fs.writeFileSync('./data/visitemedicale.json', JSON.stringify(listVisit, null, 4));
	// res.redirect('/visitemedicale',{listVisit,error:"Ajouter visitemedicale",visitem:cin,ID});  
	for(var j=0;j<dataclient.length;j++){
		if(dataclient[j].ID==ID && dataclient[j].cin==cin){
		   res.render('visitemedicale',{listVisit,error:"Ajouter visitemedicale",visitem:cin,ID});
		 }
	   }
	// res.render('visitemedicale',{listVisit: listVisit[listVisitID],visitem:cin,ID});
});



app.get('/deletevisitmidical/:cin/:ID/:idv', (req, res) => {
	const { cin } = req.params;
	const { ID } = req.params;
	const { idv } = req.params;

	const newDatavizit = [];
	for (let i = 0; i < listVisit.length; i++) {
		if (Number(idv) !== listVisit[i].ID) {
			newDatavizit.push(listVisit[i]);
		}
	}
 
	listVisit = newDatavizit;
	fs.writeFileSync('./data/visitemedicale.json', JSON.stringify(listVisit, null, 4));
	// res.redirect('/accueil/'+localnameval);
	res.redirect('/visitemedicale/'+cin+'/'+ID);
});



// cc hahna hahna sala

// ha lhma9 num:3 sala


app.listen(port, () => console.log(`Cabinet Medical listening on port ${port}!`));
