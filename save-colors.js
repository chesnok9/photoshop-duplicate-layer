var baseGroupName = 'Base'
var assetsGroupName = 'Assets'
var testLayerIndex = 1
var saveFolder = new Folder("d:/out");
var curDoc = app.activeDocument;

// Jpg options
var jpgOptions = new JPEGSaveOptions();
jpgOptions.quality = 12;
jpgOptions.embedColorProfile = true;
jpgOptions.formatOptions = FormatOptions.PROGRESSIVE;
jpgOptions.scans = 5;
jpgOptions.matte = MatteType.NONE;

// Save all layers
if (curDoc && curDoc.layers) {
  hideAllLayers();

  for(var i = curDoc.layers.length - 1; i >= 0 ; i--){
    var layerSetRef = curDoc.layers[i];
    var layerName = layerSetRef.name;

    if (layerName !== baseGroupName && layerName !== assetsGroupName) {
      layerSetRef.visible = true;
      var testLayer = layerSetRef.layers[testLayerIndex];
      testLayer.visible = false;
      // curDoc.saveAs(new File(saveFolder + '/' + fileName + '/' + fileName + '-' + layerName + '.jpg'), jpgOptions, true, Extension.LOWERCASE);
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

// Hide all layers
function hideAllLayers() {
  for(var i = curDoc.layers.length - 1; i >= 0 ; i--){
    curDoc.layers[i].visible = false;
  }
}

function saveTxt(txt)
{
  var Name = app.activeDocument.name.replace(/\.[^\.]+$/, '');
  var Ext = decodeURI(app.activeDocument.name).replace(/^.*\./,'');
  if (Ext.toLowerCase() != 'psd')
    return;

  var Path = app.activeDocument.path;
  var saveFile = File(Path + "/" + Name +".txt");

  if(saveFile.exists)
    saveFile.remove();

  saveFile.encoding = "UTF8";
  saveFile.open("e", "TEXT", "????");
  saveFile.writeln(txt);
  saveFile.close();
}
