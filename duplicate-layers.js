var assetsGroupName = 'Assets'
var baseGroupName = 'Base'
var testLayerIndex = 1
var baseLayerIndex = 2
var colors = [
  {title: 'White', r: 230, g: 236, b: 255},
  {title: 'Pale pink', r: 255, g: 192, b: 244},
  {title: 'Pink', r: 255, g: 164, b: 233},
  {title: 'Red', r: 218, g: 48, b: 44},
  {title: 'Dark red', r: 201, g: 33, b: 42},
  {title: 'Beige', r: 235, g: 213, b: 193},
  {title: 'Pale violet', r: 215, g: 207, b: 255},
  {title: 'Violet', r: 211, g: 116, b: 204},
  {title: 'Grey', r: 173, g: 182, b: 205},
  {title: 'Orange', r: 254, g: 188, b: 97},
  {title: 'Mango', r: 242, g: 228, b: 137},
  {title: 'Lemon', r: 247, g: 244, b: 109},
  {title: 'Pale green', r: 143, g: 195, b: 150},
  {title: 'Salad', r: 131, g: 213, b: 112},
  {title: 'Green', r: 5, g: 182, b: 121},
  {title: 'Emerald', r: 0, g: 147, b: 137},
  {title: 'Light blue', r: 205, g: 234, b: 246},
  {title: 'Blue', r: 0, g: 138, b: 228},
  {title: 'Ultramarine', r: 28, g: 88, b: 203},
  {title: 'Navy blue', r: 36, g: 48, b: 81},
  {title: 'Black', r: 24, g: 24, b: 29},
  {title: 'Mustard', r: 224, g: 196, b: 93},
  {title: 'Khaki', r: 107, g: 101, b: 75},
  {title: 'Terracotta', r: 227, g: 109, b: 87},
  {title: 'Olive', r: 135, g: 141, b: 56},
  {title: 'Dusty rose', r: 244, g: 165, b: 190},
]

curDoc = app.activeDocument;
curDoc.selection.deselect();

curDoc.activeChannels = curDoc.componentChannels;
var baseLayerSet = curDoc && curDoc.layers[baseGroupName];

if (baseLayerSet) {
  for(var i = 0; i < colors.length; i++){
    var layerSetRef = baseLayerSet.duplicate(curDoc,ElementPlacement.PLACEATBEGINNING);

    layerSetRef.name = colors[i].title

    var colorLayer = layerSetRef.layers[baseLayerIndex];
    var testLayer = layerSetRef.layers[testLayerIndex];

    var colorRef = new SolidColor
    colorRef.rgb.red = colors[i].r
    colorRef.rgb.green = colors[i].g
    colorRef.rgb.blue = colors[i].b

    if (colorLayer) {
      curDoc.activeLayer = colorLayer

      curDoc.selection.deselect();
      curDoc.selection.selectAll
      curDoc.selection.fill(colorRef)
    }

    if (testLayer) {
      curDoc.activeLayer = testLayer
      // Convert Layer to Smart Object
      app.runMenuItem(stringIDToTypeID('newPlacedLayer'));
      colorBlend(colors[i]);
    }
  }
}

// collapse all layer sets
app.runMenuItem(stringIDToTypeID('collapseAllGroupsEvent'));

// xtools action to javascript from xbytor - add color overlay effect/style
function cTID(s) {
  return app.charIDToTypeID(s);
};
function sTID(s) {
  return app.stringIDToTypeID(s);
};

function colorBlend(color) {
  function step1(enabled, withDialog) {
    if (enabled != undefined && !enabled)
      return;
    var dialogMode = (withDialog ? DialogModes.ALL : DialogModes.NO);
    var desc1 = new ActionDescriptor();
    var ref1 = new ActionReference();
    ref1.putProperty(cTID('Prpr'), cTID('Lefx'));
    ref1.putEnumerated(cTID('Lyr '), cTID('Ordn'), cTID('Trgt'));
    desc1.putReference(cTID('null'), ref1);
    var desc2 = new ActionDescriptor();
    desc2.putUnitDouble(cTID('Scl '), cTID('#Prc'), 100);
    var desc3 = new ActionDescriptor();
    desc3.putBoolean(cTID('enab'), true);
    desc3.putBoolean(sTID("present"), true);
    desc3.putBoolean(sTID("showInDialog"), true);
    desc3.putEnumerated(cTID('Md  '), cTID('BlnM'), cTID('Nrml'));
    var desc4 = new ActionDescriptor();
    desc4.putDouble(cTID('Rd  '), color.r); // Red value
    desc4.putDouble(cTID('Grn '), color.g); // Green value
    desc4.putDouble(cTID('Bl  '), color.b); // Blue value
    desc3.putObject(cTID('Clr '), sTID("RGBColor"), desc4);
    desc3.putUnitDouble(cTID('Opct'), cTID('#Prc'), 100);
    desc2.putObject(cTID('SoFi'), cTID('SoFi'), desc3);
    desc1.putObject(cTID('T   '), cTID('Lefx'), desc2);
    executeAction(cTID('setd'), desc1, dialogMode);
  };

  step1();
};
