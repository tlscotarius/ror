var showDetails = 0;

$(document).ready(function(){

	// Submit the form via the genrev button
	$("#revgenform").submit(function(){
		var log = "";
		
		// Generate the revenue log
		log = GenerateRevenueLog(showDetails);

		// Display message
		$("#output").val(log);

		alert ("Copy the contents of the Revenue Output box and paste it into the Roll20 chat.");
		
		return false;// Return false so that the the form is not cleared out
	});

	// Submit the form via the genrev button
	$("#genrev").click(function(){
		showDetails = 0;
	  $("#revgenform").validate();
	  $("#revgenform").submit();
	});	
	
	// Submit the form via the genrevdetails button
	$("#genrevdetails").click(function(){
		showDetails = 1;
	  $("#revgenform").validate();
	  $("#revgenform").submit();
	});	
	

	// Hide or show Pontifex Maximus label and control
	$(document).ready(function(){
		$('input[type="checkbox"]').click(function(){
			if($("#rule201").prop('checked') == true){
				document.getElementById("pontifexmaximuslabel").style.display = "block";
				document.getElementById("pontifexmaximus").style.display = "block";
			}
			else if($(this).prop('checked') == false){
				//alert("False");
				//$($(this).data('pontifexmaximuslabel')).show();
				document.getElementById("pontifexmaximuslabel").style.display = "none";
				document.getElementById("pontifexmaximus").style.display = "none";
			}
		});
	});

  
	function GenerateRevenueLog(showDetails)
	{	
		// State variables
		//var numLegions 		= 0;
		//var numFleets 		= 0;
		//var numLandBill1	= 0;
		//var numLandBill2	= 0;
		//var numLandBill3	= 0;
		//var numActiveWars	= 0;
		//var rule201			= 0;
		//var rule202			= 0;
		var stateRevenue	= 100;
		//var stateLogSum		= "";
		var stateLogDetail	= "";
		var stateLogRemind  = "";
		var factLogSum		= "";
		var factLogDetail	= "";
		var factLogRemind	= "";

		// Calculate State Revenue
		var stateLegionCost = parseInt($("#numlegions").val()) * 2;
		var stateFleetCost = parseInt($("#numfleets").val()) * 2;
		var stateLBCost = (parseInt($("#lbtype1").val()) * 20) + (parseInt($("#lbtype2").val()) * 5) + (parseInt($("#lbtype3").val()) * 10);
		var stateActWarCost = parseInt($("#numactwars").val()) * 20;
		stateLogDetail += "{{Annual Revenue=100}}";
		if (stateLegionCost != 0) {stateLogDetail += "{{Legions=-" + stateLegionCost + "}}";}
		if (stateFleetCost != 0) {stateLogDetail += "{{Fleets=-" + stateFleetCost + "}}";}
		if (stateLBCost != 0) {stateLogDetail += "{{Land Bills=-" + stateLBCost + "}}";}
		if (stateActWarCost != 0) {stateLogDetail += "{{Active Wars=-" + stateActWarCost + "}}";}
		stateRevenue = stateRevenue - stateLegionCost - stateFleetCost - stateLBCost - stateActWarCost;

		// Set Land Bill 1 back to zero
		if (parseInt($("#lbtype1").val()) > 0) 
		{
			$("#lbtype1").val('00').change();
			stateLogRemind += "{{Remove Type 1 Land Bill marker}}";
		}

		// Calculate revenue for Factions
		factionA = GenerateFactionRevenue("A");factLogSum += factionA[0];factLogDetail += factionA[1];factLogRemind += factionA[2];stateRevenue += factionA[3];
		factionB = GenerateFactionRevenue("B");factLogSum += factionB[0];factLogDetail += factionB[1];factLogRemind += factionB[2];stateRevenue += factionB[3];
		factionC = GenerateFactionRevenue("C");factLogSum += factionC[0];factLogDetail += factionC[1];factLogRemind += factionC[2];stateRevenue += factionC[3];
		factionD = GenerateFactionRevenue("D");factLogSum += factionD[0];factLogDetail += factionD[1];factLogRemind += factionD[2];stateRevenue += factionD[3];
		factionE = GenerateFactionRevenue("E");factLogSum += factionE[0];factLogDetail += factionE[1];factLogRemind += factionE[2];stateRevenue += factionE[3];
		factionF = GenerateFactionRevenue("F");factLogSum += factionF[0];factLogDetail += factionF[1];factLogRemind += factionF[2];stateRevenue += factionF[3];
		
		// Calculuate revenue for State
		provRev = GetProvinceStateRevenue("provaeg", "Aegyptus",            0,  1,  0, 1,  1,  3);stateRevenue += provRev[0];stateLogDetail += provRev[1];																				
		provRev = GetProvinceStateRevenue("provafr", "Africa",              2,  1, -4, 1,  1,  1);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provasi", "Asia",                2,  1, -3, 2,  1,  3);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provbit", "Bithynia",            1,  1, -2, 1,  1,  2);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provcec", "Cilicia et Cyprus",   1, -1,  0, 1, -1,  3);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provcrc", "Creta et Cyrenaica",  1,  1, -2, 1,  1,  2);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provgci", "Gallia Cisalpina",    1,  1, -1, 2,  1, -1);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provgna", "Gallia Narbonensis",  1,  1, -3, 1,  1,  1);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provgtr", "Gallia Transalpina",  1,  1, -5, 1,  1,  1);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provhci", "Hispania Citerior",   1, -1,  1, 1,  1,  1);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provhul", "Hispania Ulterior",   1, -1, -1, 1,  1, -1);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provill", "Illyricum",           1, -1, -1, 1,  1,  0);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provmac", "Macedonia",           2,  1, -2, 2,  1,  2);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provsec", "Sardinia et Corsica", 1, -1, -1, 1, -1,  1);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provsic", "Sicilia",             2,  1, -2, 1,  1,  2);stateRevenue += provRev[0];stateLogDetail += provRev[1];
		provRev = GetProvinceStateRevenue("provsyr", "Syria",               1,  1,  0, 1,  1,  0);stateRevenue += provRev[0];stateLogDetail += provRev[1];
				
		factLogSum = "&{template:default}" + "{{name=Revenue Summary}}" + "{{State=" + stateRevenue + "}}" + factLogSum + "\n";
		if (stateLogDetail != ""){stateLogDetail = "&{template:default}" + "{{name=State Details}}" + stateLogDetail + "\n";}
		if (stateLogRemind != ""){stateLogRemind = "&{template:default}" + "{{name=State Reminders}}" + stateLogRemind + "\n";}

		// Build final output
		var d = new Date();
		var outputLog = "";
		outputLog += "&{template:default}" + "{{name=" + d.toString() + "}}\n";
		outputLog += factLogSum;
		if (showDetails) {outputLog += factLogDetail;}
		outputLog += factLogRemind;
		if (showDetails) {outputLog += stateLogDetail;}
		outputLog += stateLogRemind;

		return(outputLog);

	}

	function GenerateFactionRevenue(factionID)
	{
		var factRevenue		= 0;
		var factLogSum		= "";
		var factLogDetail	= "";
		var factLogRemind	= "";
		var provDetail 		= "";
		var provRemind 		= "";
		var stateRevenue	= 0;

		if ($("#factionactive" + factionID).is(":checked")) 
		{
			// Get control values
			var factName	  = $("#factionname" + factionID).val();
			var numSenators	  = parseInt($("#numsenators" + factionID).val());
			var numKnights    = parseInt($("#numknights" + factionID).val());
			var factLeaderSet = $("#factionleader" + factionID).is(":checked");
				
			var revSenators = 0;
			revSenators += numSenators;
			if (factLeaderSet) {revSenators += 2;}	// The third talent for Faction Leader is accounted for in the number of Senators
			factRevenue += revSenators;
			
			var revKnights = numKnights;
			factRevenue += revKnights;
					
			var revConcessions = 0;
			if ($("#conctf1").val() == factionID) {revConcessions += 2;}	// Tax Farmer #1
			if ($("#conctf2").val() == factionID) {revConcessions += 2;}	// Tax Farmer #2
			if ($("#conctf3").val() == factionID) {revConcessions += 2;}	// Tax Farmer #3
			if ($("#conctf4").val() == factionID) {revConcessions += 2;}	// Tax Farmer #4
			if ($("#conctf5").val() == factionID) {revConcessions += 2;}	// Tax Farmer #5
			if ($("#conctf6").val() == factionID) {revConcessions += 2;}	// Tax Farmer #6
			if ($("#conchf").val() == factionID) {revConcessions += 3;}	// Harbor Fees
			if ($("#concmin").val() == factionID) {revConcessions += 3;}	// Mining
			if ($("#conclc").val() == factionID) {revConcessions += 3;}	// Land Commissioner
			
			var droughtLevel = parseInt($("#droughtlevel").val());// Get drought level
			var droughtMult = 1;// Drought multiplier
			
			// Aegyptian Grain
			if ($("#concaeg").val() == factionID) 
			{
				if ($("#droughtaeg").is(":checked")) // If Faction is taking drought graft
				{
					droughtMult = droughtLevel + 1;// Set drought multiplier equal to drought level + 1 
				}
				revConcessions += 5 * droughtMult;
			}
			
			// Sicilian Grain
			if ($("#concscg").val() == factionID) 
			{
				if ($("#droughtscg").is(":checked")) // If Faction is taking drought graft
				{
					droughtMult = droughtLevel + 1;// Set drought multiplier equal to drought level + 1 
				}
				revConcessions += 4 * droughtMult;
			}
			
			factRevenue += revConcessions;
			
			// Temple Donations
			var revTempleDonations = 0;
			var revTempleLog = "";
			if ($("#rule201").is(":checked") && $("#pontifexmaximus").val() == factionID) {
				result = RollDice(1, 1, 0);
				revTempleDonations += parseInt(result[0]);
				resultLog = result[1];

				revTempleLog += "{{Temple Donations=" + revTempleDonations + resultLog + "}}";
			}
			factRevenue += revTempleDonations;

			// Generate Provincial Income
			result = GetProvinceFactionRevenue(factionID, "provaeg", "Aegyptus",            0, 0,  0, 1, 1,  7,  0, 60);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];		
			result = GetProvinceFactionRevenue(factionID, "provafr", "Africa",              1, 1, -1, 1, 1,  3, 20, 30);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provasi", "Asia",                1, 1,  2, 1, 1,  6, 35, 50);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provbit", "Bithynia",            1, 1, -4, 1, 1,  2, 10, 30);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provcec", "Cilicia et Cyprus",   1, 1, -4, 1, 1,  0, 10, 20);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provcrc", "Creta et Cyrenaica",  1, 1, -1, 1, 1,  1, 15, 20);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provgci", "Gallia Cisalpina",    1, 1, -1, 1, 1,  3, 15, 20);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provgna", "Gallia Narbonensis",  1, 1, -3, 1, 1,  1, 10, 20);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provgtr", "Gallia Transalpina",  1, 1, -4, 1, 1,  0, 10, 20);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provhci", "Hispania Citerior",   1, 1, -2, 1, 1,  2, 10, 15);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provhul", "Hispania Ulterior",   1, 1, -3, 1, 1,  1, 10, 20);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provill", "Illyricum",           1, 1, -3, 1, 1,  0,  5, 15);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provmac", "Macedonia",           1, 1,  1, 2, 1, -1, 30, 40);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provsec", "Sardinia et Corsica", 1, 1, -5, 1, 1, -1,  5, 10);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provsic", "Sicilia",             1, 1,  0, 1, 1,  4, 30, 40);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];
			result = GetProvinceFactionRevenue(factionID, "provsyr", "Syria",               1, 1, -1, 1, 1,  3, 20, 30);factRevenue += result[0];provDetail += result[1];provRemind += result[2];stateRevenue += result[3];

			// Build logs
			factLogSum = "{{" + factName + "=" + factRevenue + "}}";

			if (provRemind != "")
			{
				factLogRemind = "&{template:default}" + 
									"{{name=" + factName + " Reminders}}" +
									provRemind + "\n";
			}

			factLogDetail = "&{template:default}" + 
							"{{name=" + factName + " Details}}" +
							"{{Senators=" + revSenators + "}}" +
							"{{Knights=" + revKnights + "}}" +
							"{{Concessions=" + revConcessions + "}}" + 
							revTempleLog +
							provDetail + "\n";
							
				
		}

		return [factLogSum, factLogDetail, factLogRemind, stateRevenue];
	}
	

	function GetProvinceStateRevenue(provID, provName,
											stateUnimpSpoilsDice, stateUnimpSpoilsMult, stateUnimpSpoilsAdd,
											stateImpSpoilsDice, stateImpSpoilsMult, stateImpSpoilsAdd)
	{
		var stateRevenue = 0;
		var stateDetail  = "";
		var resultLog 	 = "";

		// If a governor is assigned to the province
		if ($("#" + provID).val() != "")
		{
			// Generate State spoils
			if ($("#" + provID + "_improved").is(":checked"))						
			{
				// Province is already improved
				result = RollDice(stateImpSpoilsDice, stateImpSpoilsMult, stateImpSpoilsAdd);
				stateRevenue += parseInt(result[0]);
				resultLog = result[1];
			}
			else										
			{
				// Province is not improved
				result = RollDice(stateUnimpSpoilsDice, stateUnimpSpoilsMult, stateUnimpSpoilsAdd);
				stateRevenue += parseInt(result[0]);
				resultLog = result[1];
			}

			stateDetail += "{{" + provName + "=" + stateRevenue + resultLog + "}}";
		}
	
		return [stateRevenue, stateDetail];
	}
	
	function GetProvinceFactionRevenue(factionID, provID, provName,
											provUnimpSpoilsDice, provUnimpSpoilsMult, provUnimpSpoilsAdd,
											provImpSpoilsDice, provImpSpoilsMult, provImpSpoilsAdd,
											provUnimpTaxes, provImpTaxes) 
	{
		var factRevenue   = 0;
		var factLogDetail = "";
		var factLogRemind = "";
		var stateRevenue  = 0;
		var resultLog 	  = ""; // Stores the log value of a dice roll (e.g. "(1d6+3=4+3)" )
	
		// Verify a province's governor is in current faction
		if ($("#" + provID).val() == factionID) 
		{
			// If spoils being taken
			if ($("#" + provID + "_spoils").is(":checked"))
			{
				// If province is improved
				if ($("#" + provID + "_improved").is(":checked"))
				{
					// Province is improved
					result = RollDice(provImpSpoilsDice, provImpSpoilsMult, provImpSpoilsAdd);
					factRevenue = parseInt(result[0]);
					resultLog = result[1];
				}
				else
				{
					// Province is not improved
					result = RollDice(provUnimpSpoilsDice, provUnimpSpoilsMult, provUnimpSpoilsAdd);
					factRevenue = parseInt(result[0]);
					resultLog = result[1];					
				}

				// Apply negative revenue to State rather than faction
				if (factRevenue < 0)
				{
					stateRevenue += factRevenue;
					factRevenue = 0;
				}

				factLogDetail += "{{" + provName + "=" + factRevenue + " " + resultLog + "}}"
				factLogRemind += "{{Governor of " + provName + " is corrupt}}";
			}
			
			// If province is not improved, then roll for improvement
			if (!$("#" + provID + "_improved").is(":checked"))
			{
				var improveMod = 0;
				var improveResult = 0;
				if (!$("#" + provID + "_spoils").is(":checked"))
				{
					// Spoils not being taken
					improveMod = 1;
				}
				result = RollDice(1, 1, improveMod);
				improveResult = parseInt(result[0]);
				
				if (improveResult >= 5)
				{
					// Province was improved
					factLogRemind += "{{" + provName + " was improved!}}";
					factLogRemind += "{{Governor of " + provName + " gains +3 influence}}";
					factLogRemind += "{{Mark " + provName + " as improved}}";
					
					// Update improve value for the province so that the State income is adjusted
					$("#" + provID + "_improved").attr('checked', 'checked');
				}
			}

			// If Provincial Wars rule is being used, then include reminder for local taxes
			if ($("#rule202").is(":checked"))
			{
				if ($("#" + provID + "_improved").is(":checked"))
				{
					// Province is improved
					factLogRemind += "{{Spend Local Taxes (" + provImpTaxes + ") for " + provName + "}}";
				}
				else
				{
					// Province is not improved
					factLogRemind += "{{Spend Local Taxes (" + provUnimpTaxes + ") for " + provName + "}}";
				}
			}
		}
		
		return [factRevenue, factLogDetail, factLogRemind, stateRevenue];
	}
	

	function RollDice(diceNum, diceMult, diceAdd)
	{
		var returnValue = 0;
		var diceCurrValue = 0
		var diceValue = 0;
		var log = "";
		var diceLog = "";
		
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
		log += " &#8594; ";						// Add arrow
		if (diceMult < 0) {log += "-";}			// Add leading negavie sign for a negative multiplier
		log += diceLog;
		if (diceAdd > 0) {log += "+";}			// Add positive sign for a positive adder
		if (diceAdd != 0) {log += diceAdd;}		// Adder is zero, so don't include + or -
		log += ")";

		// Clear dice log if the dicedetails checkbox is not set
		//if (logDetails != 1) {log = "";}

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
