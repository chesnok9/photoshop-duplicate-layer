// based on code by michael l hale;
// 2013, use it at your own risk;
if (app.documents.length > 0) {
    var ref = new ActionReference();
    ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
    var layerDesc = executeActionGet(ref);
    var effectsDesc = layerDesc.getObjectValue(stringIDToTypeID('layerEffects'));
    // checkDesc2 (effectsDesc);
    var dropShadow = effectsDesc.getObjectValue(stringIDToTypeID('dropShadow'));
    checkDesc2 (dropShadow);

    // Set Drop Shadow
    // set(416.666667, true, true, true, 0, 0, 0, 10, true, 90, 20, 5, 50, 5, false, "Linear", true, -90);
};
//////
// by michael l hale;
function checkDesc (theDesc) {
    var c = theDesc.count;
    var str = '';
    for(var i=0;i<c;i++){ //enumerate descriptor's keys
        str = str + 'Key '+i+' = '+typeIDToStringID(theDesc.getKey(i))+': '+theDesc.getType(theDesc.getKey(i))+'\n';
    };
    alert("desc\n\n"+str);
};
////// based on code by michael l hale //////
function checkDesc2 (theDesc) {
    var c = theDesc.count;
    var str = '';
    for(var i=0;i<c;i++){ //enumerate descriptor's keys
        str = str + 'Key '+i+' = '+typeIDToStringID(theDesc.getKey(i))+': '+theDesc.getType(theDesc.getKey(i))+'\n'+getValues (theDesc, i)+'\n';
    };
    alert("desc\n\n"+str);
};
////// check //////
function getValues (theDesc, theNumber) {
    switch (theDesc.getType(theDesc.getKey(theNumber))) {
        case DescValueType.BOOLEANTYPE:
            return theDesc.getBoolean(theDesc.getKey(theNumber));
            break;
        case DescValueType.CLASSTYPE:
            return theDesc.getClass(theDesc.getKey(theNumber));
            break;
        case DescValueType.DOUBLETYPE:
            return theDesc.getDouble(theDesc.getKey(theNumber));
            break;
        case DescValueType.ENUMERATEDTYPE:
            return (typeIDToStringID(theDesc.getEnumerationValue(theDesc.getKey(theNumber)))+"_"+typeIDToStringID(theDesc.getEnumerationType(theDesc.getKey(theNumber))));
            break;
        case DescValueType.INTEGERTYPE:
            return theDesc.getInteger(theDesc.getKey(theNumber));
            break;
        case DescValueType.LISTTYPE:
            return theDesc.getList(theDesc.getKey(theNumber));
            break;
        case DescValueType.OBJECTTYPE:
            return (theDesc.getObjectValue(theDesc.getKey(theNumber))+"_"+typeIDToStringID(theDesc.getObjectType(theDesc.getKey(theNumber))));
            break;
        case DescValueType.REFERENCETYPE:
            return theDesc.getReference(theDesc.getKey(theNumber));
            break;
        case DescValueType.STRINGTYPE:
            return theDesc.getString(theDesc.getKey(theNumber));
            break;
        case DescValueType.UNITDOUBLE:
            return (theDesc.getUnitDoubleValue(theDesc.getKey(theNumber))+"_"+typeIDToStringID(theDesc.getUnitDoubleType(theDesc.getKey(theNumber))));
            break;
        default:
            break;
    };
};

function set(scale, enabled, present, showInDialog, red, Grn, blue, opacity, useGlobalAngle, localLightingAngle, distance, chokeMatte, blur, noise, AntA, name2, layerConceals, globalLightingAngle) {
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
    descriptor2.putUnitDouble( s2t( "scale" ), s2t( "percentUnit" ), scale );
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