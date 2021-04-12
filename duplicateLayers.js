var baseGroupName = 'Base'
var baseLayerIndex = 1
var colors = [
  {title: 'Orange', r: 255, g: 100, b: 0},
  {title: 'Olive', r: 100, g: 100, b: 0},
]

curDoc = app.activeDocument;
var baseLayerSet = curDoc && curDoc.layers[baseGroupName];

if (baseLayerSet) {
  for(var i = 0; i < colors.length; i++){
    var layerSetRef = baseLayerSet.duplicate(curDoc,ElementPlacement.PLACEATBEGINNING);

    layerSetRef.name = colors[i].title

    var colorLayer = layerSetRef.layers[baseLayerIndex];

    var colorRef = new SolidColor
    colorRef.rgb.red = colors[i].r
    colorRef.rgb.green = colors[i].g
    colorRef.rgb.blue = colors[i].b

    if (colorLayer) {
      curDoc.activeLayer = colorLayer

      curDoc.selection.selectAll
      curDoc.selection.fill(colorRef)
    }
  }
}
