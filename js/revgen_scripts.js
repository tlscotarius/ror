var logDetails = 0;

$(document).ready(function(){

	// Submit the form via the genrev button
	$("#revgenform").submit(function(){
		var log = "";
		
		// Generate the revenue log
		log = generateRevenueLog();
		
		// Display message
		$("#output").val(log);

		alert ("Copy the contents of the Revenue Output box and paste it into the Roll20 chat.");
		
		return false;// Return false so that the the form is not cleared out
	});

	// Submit the form via the genrev button
	$("#genrev").click(function(){
	  logDetails = 0;
	  $("#revgenform").validate();
	  $("#revgenform").submit();
	});	
	
	// Submit the form via the genrevdetails button
	$("#genrevdetails").click(function(){
	  logDetails = 1;
	  $("#revgenform").validate();
	  $("#revgenform").submit();
	});	
	  
	function generateRevenueLog()
	{	
		// Get values of input controls
		var factionName 	 = $("#factionname").val();
		var numSenators      = parseInt($("#numsenators").val());
		var factionLeaderSet = 0;
		var numKnights       = parseInt($("#numknights").val());
		var concTF1          = 0;
		var concTF2          = 0;
		var concTF3          = 0;
		var concTF4          = 0;
		var concTF5          = 0;
		var concTF6          = 0;
		var concAG           = 0;
		var concSG           = 0;
		var concHF           = 0;
		var concMin          = 0;
		//var concArm          = 0;
		//var concSB           = 0;
		var concLC           = 0;
		var droughtAG        = 0;
		var droughtSG        = 0;
		var droughtLevel     = 0;
		var pontifexMaximus  = 0;
		var templeDonations  = 0;
		var templeLog 		 = "";
		
		// Set values for Faction Leader checkbox
		if ($('#factionleader').is(":checked")) {factionLeaderSet = 1;}
		
		// Set values for Concessions
		if ($("#concessiontf1").is(":checked")) {concTF1 = 2;}
		if ($("#concessiontf2").is(":checked")) {concTF2 = 2;}
		if ($("#concessiontf3").is(":checked")) {concTF3 = 2;}
		if ($("#concessiontf4").is(":checked")) {concTF4 = 2;}
		if ($("#concessiontf5").is(":checked")) {concTF5 = 2;}
		if ($("#concessiontf6").is(":checked")) {concTF6 = 2;}
		if ($("#concessionaeg").is(":checked")) {concAG = 5;}
		if ($("#concessionscg").is(":checked")) {concSG = 4;}
		if ($("#concessionhaf").is(":checked")) {concHF = 3;}
		if ($("#concessionmin").is(":checked")) {concMin = 3;}

		//if ($("#concessionarm").is(":checked")) {concArm = 0;}
		//if ($("#concessionshp").is(":checked")) {concSB = 0;}

		// Set values for drought-related variables
		if ($("#droughtaeg").is(":checked")) {droughtAG = 1;}
		if ($("#droughtscg").is(":checked")) {droughtSG = 1;}
		droughtLevel = parseInt($("#droughtlevel").val());
		if (concAG > 1 && droughtAG == 1 && droughtLevel > 0) {concAG += concAG * droughtLevel;}
		if (concSG > 1 && droughtSG == 1 && droughtLevel > 0) {concSG += concSG * droughtLevel;}
		
		//alert ("Aegyptian Drought = " + droughtAG + ", Sicilian Drought = " + droughtSG + ", Drought Level = " + droughtLevel + "\n" +
		//		"concAG = " + concAG + ", concSG = " + concSG);
		
		// Set values for Pontifex Maximus checkbox
		if ($('#pontifexmaximus').is(":checked")) {pontifexMaximus = 1;}

		// Set values for selected provinces
		// Province rray elements: 0 = province selected, 1 = spoils checkbox, 2 = improved checkbox, 3 = name
		prov1 = setProvinceValues(1);
		prov2 = setProvinceValues(2);
		prov3 = setProvinceValues(3);
		prov4 = setProvinceValues(4);
		prov5 = setProvinceValues(5);
		prov6 = setProvinceValues(6);

		// Calculate the amount of revenue generated
		var revFaction = 0;
		var revState = 0;
		var log = "";
		
		if (factionLeaderSet) // If faction leader set, then add 2 to faction revenue. Already added one for the Senator who is faction leader.
		{ 
			numSenators += 2; 
		}
		revFaction += numSenators;
		revFaction += numKnights;
		
		revFaction += concTF1 + concTF2 + concTF3 + concTF4 + concTF5 + concTF6 +		
						concAG  + concSG  + concHF  + concMin + concLC;
						
		if (pontifexMaximus) // If Pontifex Maximus set, then roll 1d6 for temple donations
		{ 
			result = RollDice(1, 1, 0);
			templeDonations = parseInt(result[0]);
			revFaction += templeDonations;
			templeLog = result[1];
		}
		
		// Generate provincial revenue
		if (prov1[3] != "Undefined"){prov1Rev = getProvinceRevenue(prov1);revFaction += prov1Rev[0];revState += prov1Rev[1];/*log += prov1Rev[2];*/}
		if (prov2[3] != "Undefined"){prov2Rev = getProvinceRevenue(prov2);revFaction += prov2Rev[0];revState += prov2Rev[1];/*log += prov2Rev[2];*/}
		if (prov3[3] != "Undefined"){prov3Rev = getProvinceRevenue(prov3);revFaction += prov3Rev[0];revState += prov3Rev[1];/*log += prov3Rev[2];*/}
		if (prov4[3] != "Undefined"){prov4Rev = getProvinceRevenue(prov4);revFaction += prov4Rev[0];revState += prov4Rev[1];/*log += prov4Rev[2];*/}
		if (prov5[3] != "Undefined"){prov5Rev = getProvinceRevenue(prov5);revFaction += prov5Rev[0];revState += prov5Rev[1];/*log += prov5Rev[2];*/}
		if (prov6[3] != "Undefined"){prov6Rev = getProvinceRevenue(prov6);revFaction += prov6Rev[0];revState += prov6Rev[1];/*log += prov6Rev[2];*/}


		// Build log
/* -- Before Roll20 formatting
		log = "--- Faction of " + factionName + "---\n\n";
		
		log += factionName + " Summary:\n";
		log += factionName + " Revenue = " + revFaction + "\n";
		log += "State Revenue = " + revState + "\n\n";
		
		log += factionName + " Details:\n";
		log += "Senators = " + numSenators + "\n";
		log += "Knights = " + numKnights + "\n";	
		log += "Concessions = " + (concTF1 + concTF2 + concTF3 + concTF4 + concTF5 + concTF6 +		
									concAG  + concSG  + concHF  + concMin + concLC) + "\n";
		if (prov1[3] != "Undefined"){log += prov1Rev[2];}
		if (prov2[3] != "Undefined"){log += prov2Rev[2];}
		if (prov3[3] != "Undefined"){log += prov3Rev[2];}
		if (prov4[3] != "Undefined"){log += prov4Rev[2];}
		if (prov5[3] != "Undefined"){log += prov5Rev[2];}
		if (prov6[3] != "Undefined"){log += prov6Rev[2];}
		
		log += "\nState Details:\n";
		if (prov1[3] != "Undefined"){log += prov1Rev[3];}
		if (prov2[3] != "Undefined"){log += prov2Rev[3];}
		if (prov3[3] != "Undefined"){log += prov3Rev[3];}
		if (prov4[3] != "Undefined"){log += prov4Rev[3];}
		if (prov5[3] != "Undefined"){log += prov5Rev[3];}
		if (prov6[3] != "Undefined"){log += prov6Rev[3];}
*/
	
		log += "&{template:default}{{name=Faction of " + factionName + " Summary}}";
		log += "{{Faction Revenue=" + revFaction + "}}";
		log += "{{State Revenue=" + revState + "}}";
		
		log += "\n&{template:default}{{name=Faction of " + factionName + " Details}}";
		log += "{{------ Faction ------}}";
		log += "{{Senators=" + numSenators + "}}";
		log += "{{Knights=" + numKnights + "}}";	
		log += "{{Concessions=" + (concTF1 + concTF2 + concTF3 + concTF4 + concTF5 + concTF6 +		
									concAG  + concSG  + concHF  + concMin + concLC) + "}}";
		if (concAG > 1 && droughtAG == 1 && droughtLevel > 0) {log += "{{Holder of Aegyptian Grain loses " + droughtLevel + " Popularity!}}"}
		if (concSG > 1 && droughtSG == 1 && droughtLevel > 0) {log += "{{Holder of Sicilian Grain loses " + droughtLevel + " Popularity!}}"}
									
		if (pontifexMaximus) // If Pontifex Maximus set, then output result for Temple Donations
		{ 
			log += "{{Temple Donations=" + templeDonations + "  " + templeLog + "}}";
		}
									
		if (prov1[3] != "Undefined"){log += prov1Rev[2];}
		if (prov2[3] != "Undefined"){log += prov2Rev[2];}
		if (prov3[3] != "Undefined"){log += prov3Rev[2];}
		if (prov4[3] != "Undefined"){log += prov4Rev[2];}
		if (prov5[3] != "Undefined"){log += prov5Rev[2];}
		if (prov6[3] != "Undefined"){log += prov6Rev[2];}
		
		if (prov1[3] != "Undefined" || prov2[3] != "Undefined" || prov3[3] != "Undefined" || 
				prov4[3] != "Undefined" || prov5[3] != "Undefined" || prov6[3] != "Undefined") {log += "{{------ State ------}}";}
		if (prov1[3] != "Undefined"){log += prov1Rev[3];}
		if (prov2[3] != "Undefined"){log += prov2Rev[3];}
		if (prov3[3] != "Undefined"){log += prov3Rev[3];}
		if (prov4[3] != "Undefined"){log += prov4Rev[3];}
		if (prov5[3] != "Undefined"){log += prov5Rev[3];}
		if (prov6[3] != "Undefined"){log += prov6Rev[3];}
		
		log = log.replace("  }}", "}}");
		
		// Copy the revenue log to the clipboard
		//document.execCommand("copy");
		
		// Display message
		//$("#output").val(log);
		//alert ("Copy the contents of the output box and paste it into the Roll20 chat.");	  
		
		return log;
	}


	function setProvinceValues(province_id) {
		// Elements: 0 = index, 1 = spoils checkbox, 2 = improved checkbox, 3 = name
		//				 4 = unimproved spoils Dice,  5 = unimproved spoils multiplier,  6 = unimproved spoils adder
		//				 7 = unimproved spoils Dice,  8 = unimproved spoils multiplier,  9 = unimproved spoils adder
		//				10 = unimproved local taxes
		//				11 = improved spoils Dice, 12 = improved spoils multiplier, 13 = improved spoils adder
		//				14 = improved spoils Dice, 15 = improved spoils multiplier, 16 = improved spoils adder
		//				20 = improved local taxes	
		var index = 0;
		var spoils = 0;
		var improved = 0;
		var name = "Undefined";
		var unimprovedSpoilsDice = 0;
		var unimprovedSpoilsMult = 1;
		var unimprovedSpoilsAdd = 0;
		var unimprovedStateDice = 0;
		var unimprovedStateMult = 0;
		var unimprovedStateAdd = 0;
		var unimprovedTaxes = 0;
		var improvedSpoilsDice = 0;
		var improvedSpoilsMult = 1;
		var improvedSpoilsAdd = 0;
		var improvedStateDice = 0;
		var improvedStateMult = 0;
		var improvedStateAdd = 0;
		var improvedTaxes = 0;	
		
		// Set index
		index = $('#province' + province_id).val();
		
		// Set spoils
		if ($('#province' + province_id + '_spoils').is(":checked")) {spoils = 1;} 
		
		// Set improved
		if ($('#province' + province_id + '_improved').is(":checked")) {improved = 1;}

		// Set name and other properties
		switch(index) {
			case "01": name = "Aegyptus";			unimprovedSpoilsDice = 0;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = 0;
													unimprovedStateDice = 0;unimprovedStateMult = 1;unimprovedStateAdd = 0;
													unimprovedTaxes = 0;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 7;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 3;
													improvedTaxes = 60;
													break;										
			case "02": name = "Africa";				unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -1;
													unimprovedStateDice = 2;unimprovedStateMult = 1;unimprovedStateAdd = -4;
													unimprovedTaxes = 20;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 3;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 1;
													improvedTaxes = 30;
													break;
			case "03": name = "Asia";				unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = 2;
													unimprovedStateDice = 2;unimprovedStateMult = 1;unimprovedStateAdd = -3;
													unimprovedTaxes = 35;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 6;
													improvedStateDice = 2;improvedStateMult = 1;improvedStateAdd = 3;
													improvedTaxes = 50;
													break;
			case "04": name = "Bithynia";			unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -4;
													unimprovedStateDice = 1;unimprovedStateMult = 1;unimprovedStateAdd = -2;
													unimprovedTaxes = 10;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 2;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 2;
													improvedTaxes = 30;
													break;
			case "05": name = "Cilicia et Cyprus";	unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -4;
													unimprovedStateDice = 1;unimprovedStateMult = -1;unimprovedStateAdd = 0;
													unimprovedTaxes = 10;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 0;
													improvedStateDice = 1;improvedStateMult = -1;improvedStateAdd = 3;
													improvedTaxes = 20;
													break;
			case "06": name = "Creta et Cyrenaica";	unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -1;
													unimprovedStateDice = 1;unimprovedStateMult = 1;unimprovedStateAdd = -2;
													unimprovedTaxes = 15;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 1;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 2;
													improvedTaxes = 20;
													break;
			case "07": name = "Gallia Cisalpina";	unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -1;
													unimprovedStateDice = 1;unimprovedStateMult = 1;unimprovedStateAdd = -1;
													unimprovedTaxes = 15;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 3;
													improvedStateDice = 2;improvedStateMult = 1;improvedStateAdd = -1;
													improvedTaxes = 20;
													break;
			case "08": name = "Gallia Narbonensis";	unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -3;
													unimprovedStateDice = 1;unimprovedStateMult = 1;unimprovedStateAdd = -3;
													unimprovedTaxes = 10;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 1;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 1;
													improvedTaxes = 20;
													break;
			case "09": name = "Gallia Transalpina";	unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -4;
													unimprovedStateDice = 1;unimprovedStateMult = 1;unimprovedStateAdd = -5;
													unimprovedTaxes = 10;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 0;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 1;
													improvedTaxes = 20;
													break;
			case "10": name = "Hispania Citerior";	unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -2;
													unimprovedStateDice = 1;unimprovedStateMult = -1;unimprovedStateAdd = 1;
													unimprovedTaxes = 10;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 2;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 1;
													improvedTaxes = 15;
													break;
			case "11": name = "Hispania Ulterior";	unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -3;
													unimprovedStateDice = 1;unimprovedStateMult = -1;unimprovedStateAdd = -1;
													unimprovedTaxes = 10;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 1;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = -1;
													improvedTaxes = 20;
													break;
			case "12": name = "Illyricum";			unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -3;
													unimprovedStateDice = 1;unimprovedStateMult = -1;unimprovedStateAdd = -1;
													unimprovedTaxes = 5;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 0;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 0;
													improvedTaxes = 15;
													break;
			case "13": name = "Macedonia";			unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = 1;
													unimprovedStateDice = 2;unimprovedStateMult = 1;unimprovedStateAdd = -2;
													unimprovedTaxes = 30;
													improvedSpoilsDice = 2;improvedSpoilsMult = 1;improvedSpoilsAdd = -1;
													improvedStateDice = 2;improvedStateMult = 1;improvedStateAdd = 2;
													improvedTaxes = 40;
													break;
			case "14": name = "Sardinia et Corsica";unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -5;
													unimprovedStateDice = 1;unimprovedStateMult = -1;unimprovedStateAdd = -1;
													unimprovedTaxes = 5;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = -1;
													improvedStateDice = 1;improvedStateMult = -1;improvedStateAdd = 1;
													improvedTaxes = 10;
													break;
			case "15": name = "Sicilia";			unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = 0;
													unimprovedStateDice = 2;unimprovedStateMult = 1;unimprovedStateAdd = -2;
													unimprovedTaxes = 30;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 4;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 2;
													improvedTaxes = 40;
													break;
			case "16": name = "Syria";				unimprovedSpoilsDice = 1;unimprovedSpoilsMult = 1;unimprovedSpoilsAdd = -1;
													unimprovedStateDice = 1;unimprovedStateMult = 1;unimprovedStateAdd = 0;
													unimprovedTaxes = 20;
													improvedSpoilsDice = 1;improvedSpoilsMult = 1;improvedSpoilsAdd = 3;
													improvedStateDice = 1;improvedStateMult = 1;improvedStateAdd = 0;
													improvedTaxes = 30;
													break;
		}

		//alert ("province_id = " + province_id + ", Index = " + index + ", Spoils = " + spoils + ", Improved = " + improved + ", Name = " + name);
		return [index, spoils, improved, name, 
					unimprovedSpoilsDice, unimprovedSpoilsMult, unimprovedSpoilsAdd, 
					unimprovedStateDice, unimprovedStateMult, unimprovedStateAdd, 
					unimprovedTaxes, 
					improvedSpoilsDice, improvedSpoilsMult, improvedSpoilsAdd, 
					improvedStateDice, improvedStateMult, improvedStateAdd, 
					improvedTaxes];

	}


	function getProvinceRevenue(province) {
		// Elements: 0 = index, 1 = spoils checkbox, 2 = improved checkbox, 3 = name
		//				 4 = unimproved spoils Dice,  5 = unimproved spoils multiplier,  6 = unimproved spoils adder
		//				 7 = unimproved spoils Dice,  8 = unimproved spoils multiplier,  9 = unimproved spoils adder
		//				10 = unimproved local taxes
		//				11 = improved spoils Dice, 12 = improved spoils multiplier, 13 = improved spoils adder
		//				14 = improved spoils Dice, 15 = improved spoils multiplier, 16 = improved spoils adder
		//				17 = improved local taxes	

		var revFaction = 0;	// Stores the faction revenue
		var revState = 0;	// Stores the state revenue
		var logFaction = "";// Stores the faction details log
		var logState = "";	// Stores the state details log
		var resultLog = ""; // Stores the log value of a dice roll (e.g. "(1d6+3 --> 4+3)" )
		
	/*
		for (i = 0; i < province.length; i++) {
			alert(province[i])
		}
	*/

		// Verify a province has been selected
		if (province[3] != "Undefined")
		{
		
			// Check to see if spoils are being taken.  If so, then generate faction revenue.
			if (province[1] == 1)
			{
				// Check to see if the province is improved or not
				if (province[2] == 1)
				{
					// Province is improved
					result = RollDice(province[11], province[12], province[13]);
					revFaction = parseInt(result[0]);
					resultLog = result[1];
				}
				else
				{
					// Province not improved
					result = RollDice(province[4], province[5], province[6]);
					revFaction = parseInt(result[0]);
					resultLog = result[1];
				}
				
				// Apply negative revenue to State rather than faction.
				if (revFaction < 0)
				{
					revState += revFaction;
					revFaction = 0;
				}
				
				logFaction += "{{Mark governor of " + province[3] + " as corrupt.}}";
			}
			//logFaction += province[3] + " spoils = " + revFaction + "  " + resultLog + "\n"; // Before Roll20 formatting
			logFaction += "{{" + province[3] + " spoils=" + revFaction + resultLog + "}}";
			
			//if (revState < 0) {logFaction += " " + revState + " to state!\n";}
		
			// If province is not improved, then roll for improvement
			if (province[2] == 0)
			{
				var improveMod = 0;
				var improveResult = 0;
				if (province[1] == 0)
				{
					// Spoils not being taken
					improvMod = 1;
				}
				result = RollDice(1, 1, improveMod);
				improveResult = parseInt(result[0]);
				
				if (improveResult >= 5)
				{
					// Province was improved
					//logFaction += province[3] + " was improved!\n";							// Before Roll20 formatting
					//logFaction += "Governor of " + province[3] + " gains +3 influence.\n";	// Before Roll20 formatting
					//logFaction += "Remember to mark " + province[3] + " as improved.\n";		// Before Roll20 formatting
					logFaction += "{{" + province[3] + " was improved!}}";
					logFaction += "{{Governor of " + province[3] + " gains +3 influence.}}";
					logFaction += "{{Mark " + province[3] + " as improved.}}";
					
					// Update improve value for the province so that the State income is adjusted
					province[2] = 1;
				}
			}
			
			// Generate State spoils
			if (province[2] == 1)						
			{
				// Province is already improved
				result = RollDice(province[14], province[15], province[16]);
				revState += parseInt(result[0]);
				resultLog = result[1];
				//logFaction += province[3] + " local taxes = " + province[17] + "\n";	// Before Roll20 formatting
				logFaction += "{{" + province[3] + " local taxes=" + province[17] + "}}";
			}
			else										
			{
				// Province is not improved
				result = RollDice(province[7], province[8], province[9]);
				revState += parseInt(result[0]);
				resultLog = result[1];
				//logFaction += province[3] + " local taxes = " + province[10] + "\n";			// Before Roll20 formatting
				logFaction += "{{" + province[3] + " local taxes=" + province[10] + "}}";
			}
			//logState += province[3] + " state revenue = " + revState + "  " + resultLog + "\n";	// Before Roll20 formatting
			logState += "{{" + province[3] + " state revenue=" + revState + resultLog + "}}";
		}

		return [revFaction, revState, logFaction, logState];
	}


	function RollDice(diceNum, diceMult, diceAdd)
	{
		var returnValue = 0;
		var diceCurrValue = 0
		var diceValue = 0;
		var log = "";
		var diceLog = "";
		//var diceDetails = 0;
		
		// Roll the dice
		for (i = 0; i < diceNum; i++) {
			diceCurrValue = Math.floor(Math.random() * 6) + 1;
			diceLog += diceCurrValue + "+";
			diceValue += diceCurrValue;
		}
		
		// Remove trailing "+" from diceLog
		diceLog = diceLog.substr(0, diceLog.length - 1);

		if (diceNum > 1) {diceLog = "[" + diceLog + "]";}	// If multiple dice were rolled, then wrap diceLog in square brackets
		
		// Mutliply the dice roll by the multiplier (to account for negative dice) and add modifier
		returnValue = (diceValue * diceMult) + diceAdd;
		
		// Build log
		log = "  (";
		if (diceMult < 0) {log += "-";}			// Add leading negavie sign for a negative multiplier
		log += diceNum + "d6";
		if (diceAdd > 0) {log += "+";}			// Add positive sign for a positive adder
		if (diceAdd != 0) {log += diceAdd;}		// Adder is zero, so don't include + or -
		//log += " &#8594; ";					// Add arrow
		log += "=";
		if (diceMult < 0) {log += "-";}			// Add leading negavie sign for a negative multiplier
		log += diceLog;
		if (diceAdd > 0) {log += "+";}			// Add positive sign for a positive adder
		if (diceAdd != 0) {log += diceAdd;}		// Adder is zero, so don't include + or -
		log += ")";

	/*
		alert("Dice Roll:  diceNum = " + diceNum + ", diceMult = " + diceMult + ", diceAdd = " + diceAdd + "\n" +
				"Value rolled = " + diceValue + "\n" +
				"Final result = " + returnValue
			);
	*/

		// Clear dice log if the dicedetails checkbox is not set
		//if (!$("#dicedetails").is(":checked")) {log = "";}
		if (logDetails != 1) {log = "";}

		return [returnValue, log];
	}


	function CopyToClipboard() 
	{
	  /* Get the text field */
	  var copyText = document.getElementById("myInput");

	  /* Select the text field */
	  copyText.select();
	  copyText.setSelectionRange(0, 99999); /* For mobile devices */

	  /* Copy the text inside the text field */
	  document.execCommand("copy");

	  /* Alert the copied text */
	  alert("Copied the text: " + copyText.value);
	}

});
