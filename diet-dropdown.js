/// <reference path="../../JavaScripts/jquery-1.5-vsdoc.js" />
// dietDropdown jQuery

(function ($) {
  $.fn.dietDropdown = function (options) {

    // TODO define some options
    var settings = $.extend({
      'oddeven': false
    }, options);

    // ie 7 unsupported for now
    if ($.browser.msie && parseInt($.browser.version, 10) == 7) {
      return;
    }

    return this.each(function () {
      var elementHeight = $(this).outerHeight();
      var elementWidth = $(this).outerWidth() || 0;
      var selectElem = $(this);
      var selectItems = selectElem.children() || " ";
      var selectText;
      var selectValue;
      var selectedItem = $(this).find('option:selected') || " ";

      if (typeof (selectedItem) === undefined) {
        selectedItem = $(this)[0];
      }

      if ((typeof (selectedItem) != undefined) && (selectedItem.length > 0)) {
        selectText = selectedItem[0].text;
      }
      else return;

      if (!selectItems) return;

      // create our dropdown replacement

      selectElem.wrap('<span id="diet-dropdown-value" style="width: ' + elementWidth + 'px;" ><em>' + selectText + '</em> </span>')
                .parents('span')
                .addClass(function () {
                  var className = selectElem.attr('class');
                  selectElem.attr('class', ' ');
                  return className;
                })
                .attr('value', selectedItem.val())
                .append('<ul class="diet-dropdown-list" style="width: ' + (elementWidth + 2) + 'px;"></ul>');

      // populate the dropdown

      var dropdownList = $(this).parents('span').find('ul:first');

      for (var i = 0; i < selectItems.length; i++) {
        dropdownList.append('<li val="' + selectItems[i].value + '" >' + selectItems[i].text + '</li>');
      };

      if (settings.oddeven) {
        $(dropdownList).find('li:odd').addClass('diet-dropdown-odd');
      }

      selectElem.addClass('select-hidden');

      // bind events
      
      $(selectElem).parents('label').click(function () { return false; });

      $(this).parents('span').unbind('click').click(function () {
        $('.diet-dropdown-list').slideUp(100);
        if ($(dropdownList, this).is(':visible')) return;

        $(dropdownList, this).slideToggle(100);

        return false;
      });

      $(dropdownList, 'li').click(function (ev) {
        selectText = $(ev.target).text();
        selectValue = $(ev.target).attr('val');
        dropdownList.parents('span')
                    .attr('val', selectValue)
                    .find('em')
                    .text(selectText)
                    .append(selectElem);
        var currentSelect = $(this).parent().find('select');
        $(currentSelect + 'option:selected').removeAttr('selected');
        $(currentSelect + 'option[value="' + selectValue + '"]').attr('selected', 'selected');

        $(currentSelect).trigger('onchange');
        $(this).slideUp(100);
        return false;
      });

      $(dropdownList).mouseleave(function () {
        if ($(this).is(':visible')) { $(this).delay(100).slideUp(); }
      });

      $(dropdownList).parent().mouseleave(function () {
        if ($(dropdownList, this).is(':visible')) { $(dropdownList, this).delay(100).slideUp(); }
      });

      $(this).parents('span').hover(function () { $(this).addClass('border-hov'); }, function () { $(this).removeClass('border-hov'); });

    });
  };
})(jQuery);