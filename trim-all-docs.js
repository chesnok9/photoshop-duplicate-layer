var saveFolder = new Folder("d:/out/trimmed");
if (!saveFolder.exists) {
  saveFolder.create()
}

var docs = app.documents;

if (docs.length > 0) {
  for (var i = 0; i < docs.length; i++) {
    app.activeDocument = docs[i];
    curDoc = app.activeDocument;
    curDoc.trim(TrimType.TRANSPARENT, true, true, true, true);
    try {
      var Path = decodeURI(curDoc.path);
    } catch (e) {
      alert(e);
    } //Let the user know about the problem

    if (!Folder(Path).exists) {
      alert(Path + " Does not exist!");
    }

    var fileName = File.decode(curDoc.name);
    var Name = decodeURI(curDoc.name).replace(/\.[^\.]+$/, "");

    var saveFile = saveFolder + "/" + Name + ".png";
    sfwPNG24(saveFile)
  }
  alert("Save images for all documents completed");
}

function sfwPNG24(saveFile) {
  var pngOpts = new PNGSaveOptions();

  // pngOpts.compression = 9;
  pngOpts.quality = 100;
  pngOpts.PNG8 = false;

  pngOpts.interlaced = false;

  app.activeDocument.saveAs(new File(saveFile), pngOpts, true, Extension.LOWERCASE);
}
