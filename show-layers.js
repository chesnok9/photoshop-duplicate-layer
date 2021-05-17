curDoc = app.activeDocument;

for(var i = 0; i < curDoc.layers.length - 1; i++){
  curDoc.layers[i].visible = true;
}
