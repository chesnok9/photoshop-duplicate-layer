var baseGroupName = 'Base'
var assetsGroupName = 'Assets'
var testLayerIndex = 1
var saveFolder = new Folder("d:/out");

var docs = app.documents;

if( docs.length > 0 ){
  for(var i = 0; i < docs.length; i++) {
    app.activeDocument = docs[i]
    saveToAll();
  }
  alert('Save images for all documents completed');
}

function saveToAll() {
  curDoc = app.activeDocument;

  // Jpg options
  var jpgOptions = new JPEGSaveOptions();
  jpgOptions.quality = 12;
  jpgOptions.embedColorProfile = true;
  jpgOptions.formatOptions = FormatOptions.PROGRESSIVE;
  jpgOptions.scans = 5;
  jpgOptions.matte = MatteType.NONE;

  // Create folder if not exist
  var fileName = File.decode(curDoc.name);
  var n = fileName.lastIndexOf(".");

  if (n > 0) fileName = fileName.substr(0, n);

  var f = new Folder(saveFolder + '/' + fileName + '/');
  if (!f.exists) {
    f.create()
  }

  // Save all layers
  if (curDoc && curDoc.layers) {
    hideAllLayers();

    for (var i = curDoc.layers.length - 1; i >= 0; i--) {
      var layerSetRef = curDoc.layers[i];
      var layerName = layerSetRef.name;

      if (layerName !== baseGroupName && layerName !== assetsGroupName) {
        layerSetRef.visible = true;
        var testLayer = layerSetRef.layers[testLayerIndex];
        testLayer.visible = false;
        curDoc.saveAs(new File(saveFolder + '/' + fileName + '/' + fileName + '-' + layerName + '.jpg'), jpgOptions, true, Extension.LOWERCASE);
        testLayer.visible = true;
        layerSetRef.visible = false;
      }
    }
  }

  // Show base layer
  var baseLayerSet = curDoc && curDoc.layers[baseGroupName];

  if (baseLayerSet) {
    baseLayerSet.visible = true;
  }

  // collapse all layer sets
  app.runMenuItem(stringIDToTypeID('collapseAllGroupsEvent'));
}

// Hide all layers
function hideAllLayers() {
  for(var i = curDoc.layers.length - 1; i >= 0 ; i--){
    curDoc.layers[i].visible = false;
  }
}
