var assetsGroupName = 'Assets'
var baseGroupName = 'Base'
var testLayerIndex = 1
var baseLayerIndex = 2
var curveLayerIndex = 3
var colors = [
  {title: 'White', r: 230, g: 236, b: 255, input: [9, 242], gamma: 0.73, output: [92, 251]},
  {title: 'Pale pink', r: 254, g: 201, b: 221, input: [6, 255], gamma: 0.67, output: [0, 255]}, // updated
  {title: 'Pink', r: 252, g: 114, b: 165, input: [0, 254], gamma: 0.41, output: [0, 245]}, // updated
  {title: 'Red', r: 198, g: 33, b: 33, input: [0, 255], gamma: 0.81, output: [22, 117]},
  {title: 'Dark red', r: 201, g: 0, b: 0, input: [0, 255], gamma: 0.76, output: [4, 104]}, // updated
  {title: 'Beige', r: 235, g: 213, b: 193, input: [0, 255], gamma: 0.81, output: [80, 250]},
  {title: 'Pale violet', r: 215, g: 207, b: 255, input: [0, 255], gamma: 0.80, output: [52, 231]},
  {title: 'Violet', r: 163, g: 75, b: 180, input: [0, 255], gamma: 0.81, output: [8, 190]}, // updated
  {title: 'Grey melange', r: 173, g: 182, b: 205, input: [0, 255], gamma: 0.81, output: [0, 225]},
  {title: 'Orange', r: 255, g: 119, b: 0, input: [0, 255], gamma: 0.81, output: [0, 247]}, // updated
  {title: 'Mango', r: 255, g: 217, b: 58, input: [0, 255], gamma: 0.76, output: [79, 255]}, // update
  {title: 'Lemon', r: 247, g: 244, b: 109, input: [0, 240], gamma: 0.78, output: [81, 254]},
  {title: 'Pistachio', r: 164, g: 188, b: 153, input: [0, 255], gamma: 0.81, output: [8, 216]},
  {title: 'Salad', r: 131, g: 213, b: 112, input: [11, 255], gamma: 0.91, output: [0, 216]},
  {title: 'Green', r: 5, g: 182, b: 121, input: [0, 255], gamma: 0.81, output: [13, 150]},
  {title: 'Emerald', r: 1, g: 103, b: 78, input: [7, 255], gamma: 1.06, output: [0, 119]},
  {title: 'Light blue', r: 205, g: 234, b: 246, input: [0, 229], gamma: 2.57, output: [0, 234]},
  {title: 'Blue', r: 0, g: 138, b: 228, input: [0, 255], gamma: 0.81, output: [12, 131]},
  {title: 'Ultramarine', r: 28, g: 88, b: 203, input: [1, 255], gamma: 0.76, output: [0, 102]},
  {title: 'Navy blue', r: 36, g: 48, b: 81, input: [37, 255], gamma: 0.66, output: [0, 66]},
  {title: 'Black', r: 24, g: 24, b: 29, input: [27, 255], gamma: 0.81, output: [0, 164]},
  {title: 'Mustard', r: 225, g: 173, b: 1, input: [0, 255], gamma: 0.81, output: [8, 241]},
  {title: 'Khaki', r: 72, g: 69, b: 42, input: [0, 255], gamma: 0.81, output: [0, 124]},  // update
  {title: 'Terracotta', r: 227, g: 109, b: 87, input: [0, 255], gamma: 0.78, output: [0, 178]},
  {title: 'Olive', r: 135, g: 141, b: 56, input: [0, 255], gamma: 0.71, output: [0, 166]},
  {title: 'Dusty rose', r: 244, g: 165, b: 190, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Fuchsia', r: 171, g: 52, b: 117, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Dark violet', r: 66, g: 28, b: 82, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Pale blue', r: 129, g: 212, b: 250, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Light Green', r: 211, g: 248, b: 211, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Light Pink', r: 255, g: 230, b: 238, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Bluestone', r: 96, g: 133, b: 164, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Chocolate', r: 58, g: 30, b: 8, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Cappuccino', r: 161, g: 128, b: 114, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Graphite', r: 75, g: 78, b: 83, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Turquoise', r: 35, g: 211, b: 211, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Maroon', r: 124, g: 0, b: 62, input: [2, 255], gamma: 0.81, output: [0, 238]},
  {title: 'Milk', r: 253, g: 255, b: 245, input: [2, 255], gamma: 0.81, output: [0, 238]},
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
    desc4.getputDouble(cTID('Rd  '), color.r); // Red value
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
