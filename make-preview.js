var assetsGroupName = 'Assets'
var baseGroupName = 'Base'
var testLayerIndex = 1
var baseLayerIndex = 2
var curveLayerIndex = 3
var shadowLayerIndex = 4
var bgLayerIndex = 5
var saveFolder = new Folder("d:/out");
var colors = [
  {title: 'Grey melange', r: 173, g: 182, b: 205, input: [0, 255], gamma: 0.92, output: [0, 226]},
]

curDoc = app.activeDocument;
curDoc.selection.deselect();

// Delete all layers
if (curDoc && curDoc.layers) {
  for(var i = curDoc.layers.length - 1; i >= 0 ; i--){
    if (curDoc.layers[i].name !== baseGroupName && curDoc.layers[i].name !== assetsGroupName) {
      curDoc.layers[i].remove();
    }
  }
}

curDoc.activeChannels = curDoc.componentChannels;
var baseLayerSet = curDoc && curDoc.layers[baseGroupName];

if (baseLayerSet) {
  for(var i = 0; i < colors.length; i++){
    var layerSetRef = baseLayerSet.duplicate(curDoc,ElementPlacement.PLACEATBEGINNING);

    layerSetRef.name = colors[i].title

    var colorLayer = layerSetRef.layers[baseLayerIndex];
    var testLayer = layerSetRef.layers[testLayerIndex];
    var curveLayer = layerSetRef.artLayers[curveLayerIndex];
    var shadowLayer = layerSetRef.artLayers[shadowLayerIndex];
    var bgLayer = layerSetRef.artLayers[bgLayerIndex];

    bgLayer.visible = false

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

    // Set Drop Shadow
    curDoc.activeLayer = shadowLayer
    // Set Distance: 46, Spread: 24, Size: 180
    set(416.666667, true, true, true, 0, 0, 0, 10, true, 120, 46, 24, 180, 0, false, "Linear", true, 90);
    // set(416.666667, true, true, true, 0, 0, 0, 10, true, 120, 17, 15, 35, 0, false, "Linear", true, 90);
    // set(416.666667, true, true, true, 0, 0, 0, 10, true, 90, 20, 5, 50, 5, false, "Linear", true, -90);
  }
}

// Create folder if not exist
var fileName = File.decode(curDoc.name);
var n = fileName.lastIndexOf(".");

const index = findNthOccurence(fileName, 2, '_')

if (index > -1) {
  fileName = fileName.substr(0, index);
} else if (n > 0) fileName = fileName.substr(0, n);

var f = new Folder(saveFolder + '/preview/');
if ( ! f.exists ) {
  f.create()
}

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
      SavePNG(saveFolder + '/preview/' + fileName + '.png');
      testLayer.visible = true;
      // layerSetRef.visible = false;
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

function set(scale, enabled, present, showInDialog, red, Grn, blue, opacity, useGlobalAngle, localLightingAngle,
             distance, chokeMatte, blur, noise, AntA, name2, layerConceals, globalLightingAngle) {
  var c2t = function (s) {
    return app.charIDToTypeID(s);
  };

  var s2t = function (s) {
    return app.stringIDToTypeID(s);
  };

  var descriptor = new ActionDescriptor();
  var descriptor2 = new ActionDescriptor();
  var descriptor3 = new ActionDescriptor();
  var descriptor4 = new ActionDescriptor();
  var descriptor5 = new ActionDescriptor();
  var reference = new ActionReference();

  reference.putProperty( s2t( "property" ), s2t( "layerEffects" ));
  reference.putEnumerated( s2t( "layer" ), s2t( "ordinal" ), s2t( "targetEnum" ));
  descriptor.putReference( c2t( "null" ), reference );
  // descriptor2.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), scale );
  descriptor3.putBoolean( s2t( "enabled" ), enabled );
  descriptor3.putBoolean( s2t( "present" ), present );
  descriptor3.putBoolean( s2t( "showInDialog" ), showInDialog );
  descriptor3.putEnumerated( s2t( "mode" ), s2t( "blendMode" ), s2t( "normal" ));
  descriptor4.putDouble( s2t( "red" ), red );
  descriptor4.putDouble( c2t( "Grn " ), Grn );
  descriptor4.putDouble( s2t( "blue" ), blue );
  descriptor3.putObject( s2t( "color" ), s2t( "RGBColor" ), descriptor4 );
  descriptor3.putUnitDouble( s2t( "opacity" ), s2t( "percentUnit" ), opacity );
  descriptor3.putBoolean( s2t( "useGlobalAngle" ), useGlobalAngle );
  descriptor3.putUnitDouble( s2t( "localLightingAngle" ), s2t( "angleUnit" ), localLightingAngle );
  descriptor3.putUnitDouble( s2t( "distance" ), s2t( "pixelsUnit" ), distance );
  descriptor3.putUnitDouble( s2t( "chokeMatte" ), s2t( "pixelsUnit" ), chokeMatte );
  descriptor3.putUnitDouble( s2t( "blur" ), s2t( "pixelsUnit" ), blur );
  descriptor3.putUnitDouble( s2t( "noise" ), s2t( "percentUnit" ), noise );
  descriptor3.putBoolean( c2t( "AntA" ), AntA );
  descriptor5.putString( s2t( "name" ), name2 );
  descriptor3.putObject( c2t( "TrnS" ), c2t( "ShpC" ), descriptor5 );
  descriptor3.putBoolean( s2t( "layerConceals" ), layerConceals );
  descriptor2.putObject( s2t( "dropShadow" ), s2t( "dropShadow" ), descriptor3 );
  descriptor2.putUnitDouble( s2t( "globalLightingAngle" ), s2t( "angleUnit" ), globalLightingAngle );
  descriptor.putObject( s2t( "to" ), s2t( "layerEffects" ), descriptor2 );
  executeAction( s2t( "set" ), descriptor, DialogModes.NO );
}

function SavePNG(saveFile){
  var pngOpts = new ExportOptionsSaveForWeb;
  pngOpts.format = SaveDocumentType.PNG
  pngOpts.PNG8 = false;
  pngOpts.transparency = true;
  pngOpts.interlaced = false;
  pngOpts.quality = 100;
  activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,pngOpts);
}

// Hide all layers
function hideAllLayers() {
  for(var i = curDoc.layers.length - 1; i >= 0 ; i--){
    curDoc.layers[i].visible = false;
  }
}

function findNthOccurence (string, nth, needle) {
  var index = 0;
  for (var i = 0; i < nth; i += 1) {
    if (index !== -1) index = string.indexOf(needle, index + 1);
  }
  return index;
}