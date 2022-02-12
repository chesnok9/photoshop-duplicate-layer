var assetsGroupName = 'Assets'
var baseGroupName = 'Base'
var testLayerIndex = 1
var baseLayerIndex = 2
var curveLayerIndex = 3
var colors = [
  {title: 'White', r: 230, g: 236, b: 255, input: [23, 255], gamma: 2.55, output: [0, 255]},
  {title: 'Pale pink', r: 254, g: 201, b: 221, input: [20, 255], gamma: 1.20, output: [43, 253]}, // updated
  {title: 'Pink', r: 252, g: 114, b: 165, input: [0, 254], gamma: 0.46, output: [0, 245]}, // updated
  {title: 'Red', r: 198, g: 33, b: 33, input: [40, 255], gamma: 0.55, output: [11, 120]},
  {title: 'Dark red', r: 139, g: 0, b: 0, input: [0, 255], gamma: 0.61, output: [4, 59]}, // updated
  {title: 'Beige', r: 235, g: 213, b: 193, input: [9, 255], gamma: 1.02, output: [40, 255]},
  {title: 'Pale violet', r: 215, g: 207, b: 255, input: [9, 255], gamma: 1.10, output: [22, 255]},
  {title: 'Violet', r: 163, g: 75, b: 180, input: [0, 255], gamma: 0.58, output: [8, 156]}, // updated
  {title: 'Grey melange', r: 173, g: 182, b: 205, input: [0, 255], gamma: 0.92, output: [0, 226]},
  {title: 'Orange', r: 255, g: 119, b: 0, input: [0, 255], gamma: 0.82, output: [0, 187]}, // updated
  {title: 'Mango', r: 255, g: 217, b: 58, input: [0, 255], gamma: 0.76, output: [77, 250]}, // update
  {title: 'Lemon', r: 247, g: 244, b: 109, input: [0, 255], gamma: 1.45, output: [48, 255]},
  {title: 'Pistachio', r: 164, g: 188, b: 153, input: [0, 255], gamma: 0.81, output: [8, 225]},
  {title: 'Salad', r: 131, g: 213, b: 112, input: [17, 255], gamma: 1.13, output: [0, 212]},
  {title: 'Green', r: 5, g: 182, b: 121, input: [0, 255], gamma: 0.89, output: [0, 153]},
  {title: 'Emerald', r: 1, g: 103, b: 78, input: [7, 255], gamma: 1.11, output: [0, 84]},
  {title: 'Light blue', r: 205, g: 234, b: 246, input: [0, 229], gamma: 2.57, output: [0, 234]},
  {title: 'Blue', r: 0, g: 138, b: 228, input: [0, 255], gamma: 0.81, output: [12, 134]},
  {title: 'Ultramarine', r: 28, g: 88, b: 203, input: [1, 255], gamma: 0.76, output: [0, 107]},
  {title: 'Navy blue', r: 36, g: 48, b: 81, input: [37, 255], gamma: 0.66, output: [0, 69]},
  {title: 'Black', r: 24, g: 24, b: 29, input: [27, 255], gamma: 0.81, output: [0, 50]},
  {title: 'Mustard', r: 225, g: 173, b: 1, input: [0, 255], gamma: 0.84, output: [8, 215]},
  {title: 'Khaki', r: 72, g: 69, b: 42, input: [0, 255], gamma: 0.81, output: [0, 85]},  // update
  {title: 'Terracotta', r: 227, g: 109, b: 87, input: [0, 255], gamma: 0.78, output: [0, 183]},
  {title: 'Olive', r: 135, g: 141, b: 56, input: [0, 255], gamma: 0.71, output: [0, 170]},
  {title: 'Dusty rose', r: 244, g: 165, b: 190, input: [2, 255], gamma: 0.81, output: [0, 243]},
  {title: 'Fuchsia', r: 171, g: 52, b: 117, input: [2, 255], gamma: 0.81, output: [0, 121]},
  {title: 'Dark violet', r: 66, g: 28, b: 82, input: [2, 255], gamma: 0.53, output: [15, 59]},
  {title: 'Pale blue', r: 129, g: 212, b: 250, input: [2, 255], gamma: 0.81, output: [0, 243]},
  {title: 'Light Green', r: 211, g: 248, b: 211, input: [12, 255], gamma: 1.37, output: [82, 255]},
  {title: 'Light Pink', r: 255, g: 230, b: 238, input: [2, 249], gamma: 0.80, output: [137, 255]},
  {title: 'Bluestone', r: 96, g: 133, b: 164, input: [2, 255], gamma: 0.81, output: [0, 157]},
  {title: 'Chocolate', r: 58, g: 30, b: 8, input: [5, 255], gamma: 0.55, output: [0, 53]},
  {title: 'Cappuccino', r: 161, g: 128, b: 114, input: [2, 255], gamma: 0.81, output: [0, 173]},
  {title: 'Graphite', r: 75, g: 78, b: 83, input: [15, 255], gamma: 0.61, output: [0, 110]},
  {title: 'Turquoise', r: 35, g: 211, b: 211, input: [2, 255], gamma: 0.81, output: [0, 202]},
  {title: 'Maroon', r: 124, g: 0, b: 62, input: [2, 255], gamma: 0.63, output: [0, 62]},
  {title: 'Milk', r: 253, g: 255, b: 245, input: [2, 238], gamma: 1.39, output: [106, 255]},
  {title: 'Grey', r: 190, g: 190, b: 190, input: [2, 255], gamma: 0.81, output: [0, 238]},
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
    var curveLayer = layerSetRef.artLayers[curveLayerIndex];

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

    if (curveLayer) {
      // Update levels for layer
      curDoc.activeLayer = curveLayer
      setLevelAdj(
        colors[i].input[0],
        colors[i].input[1],
        colors[i].gamma,
        colors[i].output[0],
        colors[i].output[1]
      )
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

function setLevelAdj(inBlack, inWhite, gamma, outBlack, outWhite) {

  var d, d1, d2, l, l1, l2, r, r1, s2t;

  if (outBlack == null) {

    outBlack = 0;

  }

  if (outWhite == null) {

    outWhite = 255;

  }

  s2t = function(s) {

    return app.stringIDToTypeID(s);

  };

  d = new ActionDescriptor();

  r = new ActionReference();

  r.putEnumerated(s2t('adjustmentLayer'), s2t('ordinal'), s2t('targetEnum'));

  d.putReference(s2t('target'), r);

  d1 = new ActionDescriptor();

  d1.putEnumerated(s2t('presetKind'), s2t('presetKindType'), s2t('presetKindCustom'));

  l = new ActionList();

  d2 = new ActionDescriptor();

  r1 = new ActionReference();

  r1.putEnumerated(s2t('channel'), s2t('channel'), s2t('composite'));

  d2.putReference(s2t('channel'), r1);

  l1 = new ActionList();

  l1.putInteger(inBlack);

  l1.putInteger(inWhite);

  d2.putList(s2t('input'), l1);

  d2.putDouble(s2t('gamma'), gamma);

  l2 = new ActionList();

  l2.putInteger(outBlack);

  l2.putInteger(outWhite);

  d2.putList(s2t('output'), l2);

  l.putObject(s2t('levelsAdjustment'), d2);

  d1.putList(s2t('adjustment'), l);

  d.putObject(s2t('to'), s2t('levels'), d1);

  return executeAction(s2t('set'), d, DialogModes.NO);

};
