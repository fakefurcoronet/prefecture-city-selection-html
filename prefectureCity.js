function getCitySelection(prefSelectionId, citySelectionId, jsonPath, initPrefVal=null, initCityVal=null) {
  // Reset the city select-box.
  $(citySelectionId + ' option:nth-child(n+2)').remove();

  // Get the prefecture code.
  let prefCode = '01';
  if (initPrefVal) {
    prefCode = ('00' + $(prefSelectionId + ' option[value="' + initPrefVal + '"]').data('pref-id')).slice(-2);
    $(prefSelectionId + ' option[value="' + initPrefVal + '"]').prop('selected', true);
  } else {
    prefCode = ('00' + $(prefSelectionId + ' option:selected').data('pref-id')).slice(-2);
  }

  // Get the city code.
  $.getJSON(jsonPath, function (data) {
    $.grep(data,
      function (obj, idx) {
        // Get the city of the prefecture.
        if (obj.groupCode.startsWith(prefCode) && obj.cityName) {
          let selected = null;
          if (initCityVal && initCityVal == obj.cityName) {
            // This city has been selected.
            selected = ' selected';
          }
          $(citySelectionId).append('<option value="' + obj.cityName + '"' + selected + '>' + obj.cityName + '</option>');
        }
      }
    );
  });
}
