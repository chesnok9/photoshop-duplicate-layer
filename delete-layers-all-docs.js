var baseGroupName = 'Base'
var assetsGroupName = 'Assets'

var docs = app.documents;

if( docs.length > 0 ){
  for(var i = 0; i < docs.length; i++) {
    app.activeDocument = docs[i]
    deleteToAll();
  }
  alert('Delete layers for all documents completed');
}

function deleteToAll() {
  curDoc = app.activeDocument;

  if (curDoc && curDoc.layers) {
    for (var i = curDoc.layers.length - 1; i >= 0; i--) {
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
}
