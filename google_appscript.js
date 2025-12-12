// Google Apps Script - à coller dans Extensions > Apps Script

function doGet(e) {
  const action = e.parameter.action || e.queryString?.split("action=")[1]?.split("&")[0];
  return handleRequest(action, e);
}

function doPost(e) {
  const action = e.parameter.action;
  return handleRequest(action, e);
}

function handleRequest(action, e) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const pretsSheet = ss.getSheetByName("Prets");
  const histoSheet = ss.getSheetByName("Historique");
  
  try {
    let result;
    
    if (action === "load") {
      result = loadData(pretsSheet, histoSheet);
    } else if (action === "save") {
      const data = JSON.parse(e.parameter.data);
      result = saveData(pretsSheet, histoSheet, data);
    } else {
      result = { error: "Action inconnue: " + action, params: JSON.stringify(e.parameter) };
    }
    
    return ContentService
      .createTextOutput(JSON.stringify(result))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService
      .createTextOutput(JSON.stringify({ error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function loadData(pretsSheet, histoSheet) {
  const pretsData = pretsSheet.getDataRange().getValues();
  const histoData = histoSheet.getDataRange().getValues();
  
  // Ignorer les headers
  const prets = pretsData.slice(1).filter(row => row[0]).map(row => ({
    id: row[0],
    sigle: row[1],
    nbPC: row[2],
    retournes: row[3],
    heure: row[4],
    timestamp: row[5]
  }));
  
  const historique = histoData.slice(1).filter(row => row[0]).map(row => ({
    id: row[0],
    timestamp: row[1],
    sigle: row[2],
    action: row[3],
    type: row[4]
  }));
  
  return { pretsActifs: prets, historique: historique };
}

function saveData(pretsSheet, histoSheet, data) {
  // Effacer les données existantes (garder headers)
  const pretsLastRow = pretsSheet.getLastRow();
  if (pretsLastRow > 1) {
    pretsSheet.getRange(2, 1, pretsLastRow - 1, 6).clearContent();
  }
  
  const histoLastRow = histoSheet.getLastRow();
  if (histoLastRow > 1) {
    histoSheet.getRange(2, 1, histoLastRow - 1, 5).clearContent();
  }
  
  // Écrire les prêts actifs
  if (data.pretsActifs && data.pretsActifs.length > 0) {
    const pretsValues = data.pretsActifs.map(p => [
      p.id, p.sigle, p.nbPC, p.retournes, p.heure, p.timestamp
    ]);
    pretsSheet.getRange(2, 1, pretsValues.length, 6).setValues(pretsValues);
  }
  
  // Écrire l'historique
  if (data.historique && data.historique.length > 0) {
    const histoValues = data.historique.map(h => [
      h.id, h.timestamp, h.sigle, h.action, h.type
    ]);
    histoSheet.getRange(2, 1, histoValues.length, 5).setValues(histoValues);
  }
  
  return { success: true };
}
