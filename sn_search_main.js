/**
 * @file
 * Client-side code for the site-specific search system.
 */


jQuery(document).ready(
    function() {

    cache_select_options();
    restrict_form_options();

    jQuery( '#block-sn-search-main-search select.form-select' ).change( restrict_form_options );

    }
    );


function on_form_option_selection( event ) {

  restrict_form_options();
}

function cache_select_options() {

  // For each select box in the main search form
  jQuery( '#block-sn-search-main-search select.form-select' )
    .each( function() {

        var options = [];

        // For each option in the current select box
        jQuery( this ).find( 'option' ).each( function() {
          options.push( { value : this.value, text : this.text } );
          }
          )

        // Cache the options for the current select box
        jQuery( this ).data( 'options', options );
        }
        );
}

function restrict_form_options() {

  var is_disable_later_selects = false;


  // Get continent ID
  var continent_value = jQuery(
      '#block-sn-search-main-search #edit-continents option:selected').val();
  var continent_id;
  if ( continent_value ) {
    continent_id = get_term_ids_from_option_value( continent_value ).id;
  }
  else {
    continent_id = null;
  }


  // Restrict country options based on continent setting.
  var country_select = jQuery('#block-sn-search-main-search #edit-countries');

  if ( ! continent_id ) {
    country_select.attr( 'disabled', 'disabled' );
    is_disable_later_selects = false;
  }
  else {
    country_select.removeAttr( 'disabled' );

    var country_value = country_select.find( 'option:selected' ).val();
    if ( country_value ) {
      country_value = get_term_ids_from_option_value( country_value );
    }

    var is_remake_country_options = 
      ! country_value  ||  country_value.parent_id != continent_id ;

    if ( is_remake_country_options ) {
      set_options_from_parent_id( country_select, continent_id );
    }
  }

  // Restrict region options based on country setting.
  // Restrict destination options based on region setting.
}

function set_options_from_parent_id( select, required_parent_id ) {

  select.empty();

  var options = select.data( 'options' );

  jQuery( options ).each( function() {
      console.debug( this );

      if ( this.value ) {
      var option_parent_id =
      get_term_ids_from_option_value( this.value ).parent_id;

      console.debug( 'required' + required_parent_id );
      console.debug( 'actual' + option_parent_id );

      if ( option_parent_id == required_parent_id ) {
      select.append(
        jQuery( '<option>' ).val( this.value ).text( this.text )
        );
      }
      }
      else {
      select.append(
        jQuery( '<option>' ).val( this.value ).text( this.text )
        );
      }
  }
  );
}



/**
 * Get taxonomy term IDs from a select-box option value.
 *
 * Select-box option values are in the format:
 *     parent_term_id/term_id
 *
 * @param value
 *   A string containing the select box value.
 *
 * @return
 *  The term IDs extracted from value
 */
function get_term_ids_from_option_value( value ) {
  var pattern = new RegExp( '^([0-9])+/([0-9]+)$' );
  var matches = pattern.exec( value );
  if ( matches.length > 2 ) {
    return { id : matches[2], parent_id : matches[1] };
  }
  else {
    return NULL;
  }
}

function hide_invalid_select_options() {
  //var continent_id = get_continent_tid();
  //jQuery('#-sn-search-refine-form #edit-countries option')
  //  .each( function( idx, option ) {
  //      if ( option ) {
  //      console.debug( 'idx...' );
  //      console.debug( idx );
  //      console.debug( 'option...' );
  //      console.debug( option );
  //      console.debug( 'this...' );
  //      console.debug( this );
  //      var ids = get_term_ids_from_option_value( option.value );
  //      if ( ids.parent_tid != continent_id ) {
  //      jQuery( option ).addClass( '.ui-helper-hidden' );
  //      }
  //      }
  //      }
  //      );
}
/**
 * Version 1
 * Added exposed region filter to AJAX view and manipulated it through JS.
 *
 * Didn't work because the exposed region filter clashed with the
 * contextual region filter. A node would have to have had two regions.
 *
 *
function set_option_selection( region_id, do_select ) {
  var view_option_path =
    '#views-exposed-form-search-hotels-page select[name="field_region_tid[]"] option[value="' + region_id + '"]';

  jQuery( view_option_path ).selected( do_select );
}

function submit_ajax_form() {
  jQuery('#views-exposed-form-search-hotels-page .form-submit').click();
}


jQuery(document).ready( function() {

    // The view loads with no regions selected in the region filter.
    // Set the same selections as the search-form region checkboxes.
    var checked_boxes =
    jQuery('#-sn-search-refine-form input.form-checkbox:checked');

    checked_boxes.each( function( x, cb ) {
      var region_id = cb.value;
      set_option_selection( region_id, true );
      } );

    // Add a click event to the search-form checkboxes so that
    // they change selected regions in the view and reload it.
    jQuery('#-sn-search-refine-form input.form-checkbox').click(
      function( event ) {
      var region_id = event.target.value;
      var is_selected = event.target.checked;
      set_option_selection( region_id, is_selected );
      submit_ajax_form();
      } );
    } );
*/
