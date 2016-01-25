module.exports = {
		"defaults": {
			"players" : {
				"colors": ["red", "yellow", "green", "blue"],
				"numDice": 12,
				"numMarkers": 10,
			},
			
			"casinos" : {
				"colors": ["aqua", "brown", "gold", "purple", "silver"],
				"numTiles": 9
			},
			"board" : {
				"scoringTrack" : [0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 14, 16, 18, 20, 23, 26, 29, 32, 36, 40, 44, 49, 54, 60, 66, 73, 81, 90],
				"lots" : {
					"A1" : "nostrip_corner_low",
					"A2" : "nostrip_edge_low",
					"A3" : "strip_corner_low",
					"A4" : "nostrip_corner_high",
					"A5" : "nostrip_edge_high",
					"A6" : "strip_corner_high",
					"B1" : "strip_corner_low",
					"B2" : "nostrip_edge_low",
					"B3" : "nostrip_corner_low",
					"B4" : "strip_corner_high",
					"B5" : "nostrip_edge_high",
					"B6" : "nostrip_corner_high",
					"C1" : "nostrip_corner_high",
					"C2" : "nostrip_edge_high",
					"C3" : "strip_corner_high",
					"C4" : "nostrip_edge_low",
					"C5" : "center",
					"C6" : "strip_edge_high",
					"C7" : "nostrip_edge_low",
					"C8" : "center",
					"C9" : "strip_edge_high",
					"C10" : "nostrip_corner_low",
					"C11" : "nostrip_edge_low",
					"C12" : "strip_corner_low",
					"D1" : "strip_corner_high",
					"D2" : "nostrip_edge_high",
					"D3" : "nostrip_corner_high",
					"D4" : "strip_edge_high",
					"D5" : "center",
					"D6" : "nostrip_edge_low",
					"D7" : "strip_corner_low",
					"D8" : "nostrip_edge_low",
					"D9" : "nostrip_corner_low",
					"E1" : "nostrip_corner_low",
					"E2" : "nostrip_edge_low",
					"E3" : "strip_corner_low",
					"E4" : "nostrip_corner_high",
					"E5" : "nostrip_edge_high",
					"E6" : "strip_corner_high",
					"F1" : "strip_corner_high",
					"F2" : "nostrip_edge_high",
					"F3" : "nostrip_corner_high",
					"F4" : "strip_edge_high",
					"F5" : "center",
					"F6" : "nostrip_edge_low",
					"F7" : "strip_corner_low",
					"F8" : "nostrip_edge_low",
					"F9" : "nostrip_corner_low",
				},
				"lotTypes" : {
					"strip_corner_high": {
						"buildCost" : 20,
						"dieValue" : 6,
						"startingAmount" : 4
					},
					"strip_corner_low": {
						"buildCost" : 15,
						"dieValue" : 5,
						"startingAmount" : 5
					},
					"strip_edge_high": {
						"buildCost" : 12,
						"dieValue" : 4,
						"startingAmount" : 6
					},
					"nostrip_corner_high": {
						"buildCost" : 12,
						"dieValue" : 4,
						"startingAmount" : 6
					},
					"nostrip_corner_low": {
						"buildCost" : 9,
						"dieValue" : 3,
						"startingAmount" : 7
					},
					"nostrip_edge_high": {
						"buildCost" : 9,
						"dieValue" : 3,
						"startingAmount" : 7
					},
					"nostrip_edge_low": {
						"buildCost" : 6,
						"dieValue" : 2,
						"startingAmount" : 8
					},
					"center": {
						"buildCost" : 8,
						"dieValue" : 1,
						"startingAmount" : 9
					}
				},
				"lotRegions" : [
					{"id" : "A", "numLots" : 6},
					{"id" : "B", "numLots" : 6},
					{"id" : "C", "numLots" : 12},
					{"id" : "D", "numLots" : 9},
					{"id" : "E", "numLots" : 6},
					{"id" : "F", "numLots" : 9}
				]
			},
			"cards" : {
				"numStripCards" : 3,
				"endOfGameMark" : 0.75,
				"descriptions" : {
					"aqua" : "Pay aqua casinos",
					"brown" : "Pay brown casinos",
					"gold" : "Pay gold casinos",
					"purple" : "Pay purple casinos",
					"silver" : "Pay silver casinos",
					"strip" : "Pay casinos on the strip"
				}
			},
			"actions" : [
				{
					"name" : "build",
					"displayName" : "Build",
					"description" : "Place 1 tile & 1 of your dice on 1 of your lots",
					"cost" : "Marked on your lot on board",
					"cardDescription" : "`on ${data.lotId} for $${data.buildCost} million`"
				},
				{
					"name" : "sprawl",
					"displayName" : "Sprawl",
					"description" : "Place 1 tile & 1 of your dice on an unowned lot by casino",
					"cost" : "2x cost on unowned lot (casino boss only)",
					"cardDescription" : "`on ${data.lotId} for $${2 * data.buildCost} million`"
				},
				{
					"name" : "remodel",
					"displayName" : "Remodel",
					"description" : "Change color of all tiles in casino",
					"cost" : "$5 per tile in casino (casino boss only)",
					"cardDescription" : "${casino} for $${amount}"
				},
				{
					"name" : "reorganize",
					"displayName" : "Reorg",
					"description" : "Reroll all dice in any casino you have a die in (max any die 1x/turn)",
					"cost" : "$1 x total pips on dice in casino",
					"cardDescription" : "${casino} for $${amount}"
				},
				{
					"name" : "gamble",
					"displayName" : "Gamble",
					"description" : "Wager at 1 opponent's casino (boss may lay off half of wager)",
					"cost" : "Up to $5 per tile in casino (1x per turn)",
					"cardDescription" : "${gamble} at ${casino} for $${amount}"
				},
				{
					"name" : "endturn",
					"displayName" : "End Turn",
					"description" : "",
					"cost" : "",
					"cardDescription" : ""
				}
			],
			"state" : {
				"activePlayer" : "red",
				"endOfGame" : false,
				"ownedLots" : {},
				"casinos" : [],
				"scores" : [
				    {
						'color': 'red',
						'score': 0,
						'cash': 0
					},
					{
						'color': 'yellow',
						'score': 0,
						'cash': 0
					},
					{
						'color': 'green',
						'score': 0,
						'cash': 0
					},
					{
						'color': 'blue',
						'score': 0,
						'cash': 0
					}
				  ]
			},
			"avatars" : [
				{
					"name" : "Liberace",
					"image" : ""
				},
				{
					"name" : "Frank Sinatra",
					"image" : ""
				},
				{
					"name" : "Celine Dion",
					"image" : ""
				},
				{
					"name" : "Elvis Presley",
					"image" : ""
				},
				{
					"name" : "Siegfried & Roy",
					"image" : ""
				},
				{
					"name" : "Penn & Teller",
					"image" : ""
				},
				{
					"name" : "Dean Martin",
					"image" : ""
				},
				{
					"name" : "Sammy Davis Jr",
					"image" : ""
				},
				{
					"name" : "Prince",
					"image" : ""
				},
				{
					"name" : "Lola Falana",
					"image" : ""
				},
				{
					"name" : "Cher",
					"image" : ""
				},
				{
					"name" : "Donny & Marie",
					"image" : ""
				}
			],
		}
	}
