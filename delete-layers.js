var baseGroupName = 'Base'
var assetsGroupName = 'Assets'

curDoc = app.activeDocument;

if (curDoc && curDoc.layers) {
  for(var i = curDoc.layers.length - 1; i >= 0 ; i--){
    if (curDoc.layers[i].name !== baseGroupName && curDoc.layers[i].name !== assetsGroupName) {
      curDoc.layers[i].remove();
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