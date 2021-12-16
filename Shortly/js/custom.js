
jQuery(document).ready(function () {

  function copyToClipboard(text) {
    var sampleTextarea = document.createElement("textarea");
    document.body.appendChild(sampleTextarea);
    sampleTextarea.value = text; //save text 
    sampleTextarea.select(); //select text
    document.execCommand("copy");
    document.body.removeChild(sampleTextarea);
  }

  jQuery("#Searchlink").on('focus keydown', function () {
    jQuery("#Searchlink").css('border-color', 'transparent').css('color', '#555');
    jQuery("#error").html('').hide();
    if (jQuery("#Searchlink").val() == 'Shorten a link here') {
      jQuery("#Searchlink").val('');
    }
  });
  jQuery("#getlink").on('click', function (e) {
    e.preventDefault();
    if (jQuery.trim((jQuery("#Searchlink").val())) == '' || jQuery.trim((jQuery("#Searchlink").val())) == 'Shorten a link here') {
      jQuery("#Searchlink").css('border-color', '#ff0000').css('color', '#ff0000');
      jQuery("#error").show().html('Please add a link');
      jQuery("#Searchlink").val('Shorten a link here');
    }
    else {

      var Searchlink = jQuery("#Searchlink").val(),
        ajax_url = 'https://api.shrtco.de/v2/shorten';

      // Send the data using post
      var ajaxpost = $.post(ajax_url, { url: Searchlink });

      // Put the results in a div
      ajaxpost.done(function (data) {
        $("#success").show();
        $("#success").empty();
        $("#success").append('<div class="row"><div class="list_item"><div class="row"><div class="col-lg-7 col-sm-12 col-md-12 full_link">' + data.result.full_short_link + '&nbsp;</div><div class="col-lg-3 col-sm-12 col-md-12"><div id="short_link" class="short_link">' + data.result.short_link + '</div></div><div class="col-lg-2 col-sm-12 col-md-12 btncol"><input id="btnshort_link" type="button" value="Copy" data-control="short_link" class="copybtn" /></div></div></div></div>');
        $("#success").append('<div class="row"><div class="list_item"><div class="row"><div class="col-lg-7 col-sm-12 col-md-12 full_link">' + data.result.full_short_link2 + '&nbsp;</div><div class="col-lg-3 col-sm-12 col-md-12"><div id="short_link2" class="short_link">' + data.result.short_link2 + '</div></div><div class="col-lg-2 col-sm-12 col-md-12 btncol"><input id="btnshort_link2" type="button" value="Copy" data-control="short_link2" class="copybtn" /></div></div></div></div>');
        $("#success").append('<div class="row"><div class="list_item"><div class="row"><div class="col-lg-7 col-sm-12 col-md-12 full_link">' + data.result.full_short_link3 + '&nbsp;</div><div class="col-lg-3 col-sm-12 col-md-12"><div id="short_link3" class="short_link">' + data.result.short_link3 + '</div></div><div class="col-lg-2 col-sm-12 col-md-12 btncol"><input id="btnshort_link3" type="button" value="Copy" data-control="short_link3" class="copybtn" /></div></div></div></div>');
        jQuery(".copybtn").on('click', function () {
          copyToClipboard(jQuery('#' + jQuery(this).data('control')).html());
          jQuery(this).val('Copied!');
        });
      });

    }

  });

});
