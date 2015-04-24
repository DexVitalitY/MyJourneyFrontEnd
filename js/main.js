var newJourney = [];
(function () {
  // Check that the browser supports the FileReader API.
  if (!window.FileReader) {
    document.write('<strong>Sorry, your web browser does not support the FileReader API.</strong>');
    return;
  }

  var handleFile = function (event) {
    var files, reader;

    files = event.target.files;
    reader = new FileReader();

    reader.onload = function (event) {
      var exif, tags, tableBody, name, row;

      try {
        exif = new ExifReader();

        // Parse the Exif tags.
        exif.load(event.target.result);
        // Or, with jDataView you would use this:
        //exif.loadView(new jDataView(event.target.result));

        // The MakerNote tag can be really large. Remove it to lower memory usage.
        exif.deleteTag('MakerNote');

        // Output the tags on the page.
        tags = exif.getAllTags();
        myTags = [];
        myTags.push(exif.getTagDescription("GPSLatitude"));
        myTags.push(exif.getTagDescription("GPSLongitude"));

        console.log(myTags);

        console.log($('input[type=file]')[0]["files"]);

        tableBody = document.getElementById('exif-table-body');
        for (name in tags) {
          if (tags.hasOwnProperty(name)) {
            row = document.createElement('tr');
            row.innerHTML = '<td>' + name + '</td><td>' + tags[name].description + '</td>';
            tableBody.appendChild(row);
          }
        }
      } catch (error) {
        alert(error);
      }
    };
    // We only need the start of the file for the Exif info.
    reader.readAsArrayBuffer(files[0].slice(0, 128 * 1024));
  };

  var handleF = function(file) {

    var reader = new FileReader();

    reader.onload = function (event) {
      var exif, tags, tableBody, name, row;

            try {
              exif = new ExifReader();

              // Parse the Exif tags.
              exif.load(event.target.result);
              // Or, with jDataView you would use this:
              //exif.loadView(new jDataView(event.target.result));

              // The MakerNote tag can be really large. Remove it to lower memory usage.
              exif.deleteTag('MakerNote');

              // Output the tags on the page.
              myTags = [];
              myTags.push(exif.getTagDescription("GPSLatitude"));
              myTags.push(exif.getTagDescription("GPSLongitude"));

              console.log(myTags);
              newJourney.push(myTags);

            } catch (error) {
              alert(error);
            }
    };

    reader.readAsArrayBuffer(file.slice(0, 128 * 1024));
  }

  console.log($('input[type=file]'));
  $(document).on('change', 'input[type=file]', function(event) {
    var files = event.target.files;
    for (i=0; i < files.length ; i++) {
      var file = files[i];
      handleF(file);
    }
  });

}());
