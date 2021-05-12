//reads mobile status detected in header.php
//var isMobile = CONFIG.isMobile || false;
var isMobile = "";

//undetects high resolution mobile devices
var width = jQuery(window).width();
if (width >= 768) {
    isMobile = false;
    jQuery('.select_num_col').find('.quickpic_text').css('display','block');
    //jQuery('.select_num_col').find('.quickpic_delete').css('position','relative').css('top','-19px').css('right','-150px');
}

//hide assets from mobile in desktop
if (isMobile == false) {
  jQuery('a.quickpic_close').css('visibility','hidden');
}


//if (sessionStorage.desktop) // desktop storage
//    isMobile = false;
//else if (localStorage.mobile) // mobile storage
//    isMobile = true;

// alternative
//var mobile = ['iphone','ipad','android','blackberry','nokia','opera mini','windows mobile','windows phone','iemobile'];
//for (var i in mobile) if (navigator.userAgent.toLowerCase().indexOf(mobile[i].toLowerCase()) > 0) isMobile = true;
//
function setMobileLayout() {
    if (isMobile) {
        //clear all button hide
        jQuery('.clearall_btn').hide();
        //hide more lines
        jQuery('.addlines').addClass('hidden-mobile');
        //display quickpic permanently
        jQuery('.quickpic').addClass('quickpic-mobile');
        //extra space at header
        jQuery('.all_num_part').addClass('wrapper-global-mobile');
        //extra space at header
        jQuery('.select_num_part').addClass('wrapper-mobile');
        //hide remove over state
        jQuery('.select_num_col').addClass('wrapper-mobile');
        //hide main num
        jQuery('.lt_numbers_wrapper').addClass('wrapper-mobile');
        //lock edits
        jQuery('.lt_numbers_wrapper').addClass('edit-lock');
        //hide extra num
        jQuery('.select_num_part_wrapper').addClass('wrapper-mobile');
        //extra lock
        jQuery('.select_num_part_wrapper').addClass('edit-lock');
        //hide close button
        jQuery('.close-btn').hide();
        //ball are width set according to ball number
        ballNum = jQuery('#m1').val();
        if (ballNum >= 6) {
            jQuery('.all_num_part.wrapper-global-mobile').css('width','210px');
        }



        jQuery('.box_det .col3 .comman').removeClass('left');
        //jQuery('input[type=radio].css-checkbox + label.css-label, input[type=radio].css-checkbox + label.css-label.clr').trigger("click").html('How many draws?');

        //console.log(specialBallText);
        //jQuery('.select_num_part_wrapper').find('.select_num_part_wrapper ').prepend(specialBallText);

        if (typeof qs["group-tab"] !== "string") {
            jQuery('.addLines-holder').removeClass('hidden');
            //jQuery('.box_det').prepend('<div class="addLines-holder col3"><span class="addline-single">Add more lines <span class="addLinesPlus">+</span></span></div>')
            //jQuery('.addLines-holder').append('<span class="addline-single">Add more lines <span class="addLinesPlus">+</span></span>')
        }

        /*jQuery(document).ready(function ($) {
            //if (NYlotto)
            var lottery = jQuery("#otherdata").val().split("|");
            if (lottery[1] == 'NewYorkLotto') {
                setTimeout(function(){
                    debugger;
                    var numberofSelected = jQuery(".select_num_col").length - 1;
                    var temp = numberofSelected % 2;
                    if (temp > 0) {
                        jQuery(".select_num_col:nth-of-type(5)").find(".quickpic_delete").trigger("click");
                    }
                }, 400);
            }
        });*/
	}
}
function addEmptyLineMobile(){
    //debugger;
    var total_lines = parseInt(jQuery("#totallines").val()) + 1;
    jQuery("#totallines").val(total_lines);

    var template = jQuery('#removecardrow');
    template.clone()
        .removeClass('hide')
        .attr('id', "row_" + total_lines)
        .insertBefore(template)
        .addClass("cardline");

    jQuery('#row_' + total_lines).find('.select_num_col:nth-of-type(5)').remove();
    jQuery('#row_' + total_lines).find('.select_num_col:nth-of-type(4)').remove();
    jQuery('#row_' + total_lines).find('.select_num_col:nth-of-type(3)').remove();
    jQuery('#row_' + total_lines).find('.select_num_col:nth-of-type(2)').remove();

    addLineNumber();
}

jQuery(document).ready(function ($) {
    if (isMobile) {
        setTimeout(function(){
            //results table hide
            // jQuery('#myTable thead').hide();
            jQuery('#myTable').addClass('mobile-lotto-table');
            // jQuery('#myTable tr td:nth-child(1),#myTable tr td:nth-child(3),#myTable tr td:nth-child(4)').hide();
            jQuery('#myTable tr td:nth-child(2)').css('width','30%');
            // jQuery('#myTable tr td:nth-child(5)').css('width','60%');
            jQuery('#myTable.tablesorter').css('min-width','250px');
        }, 500);

        // click on close button
        jQuery(document).on("click", ".quickpic_close", function () {
            $(this).parent().parent('.select_num_col').addClass('wrapper-mobile');
            $(this).parent().parent('.select_num_col').find('.all_num_part').addClass('wrapper-global-mobile');
            $(this).parent().parent('.select_num_col').find('.lt_numbers_wrapper').addClass('wrapper-mobile');
            $(this).parent().parent('.select_num_col').find('.lt_numbers_wrapper').addClass('edit-lock');
            $(this).parent().parent('.select_num_col').find('.select_num_part_wrapper').addClass('wrapper-mobile');
            $(this).parent().parent('.select_num_col').find('.select_num_part_wrapper').addClass('edit-lock');
            $(this).parent().parent('.select_num_col').find('.quickpic-mobile').show();
            $(this).parent().parent().find('.select_num_part').addClass('wrapper-mobile');
            $(this).parent().parent().find('.select_num_part').removeClass('expanded');
            $(this).parent().parent().find('.all_num_part').removeClass('expanded');
            $(this).parent().hide();
            $(this).parent().parent().find('.quickpic_text').hide();
            $(this).parent().parent().find('.quickpic_delete').removeClass('quickpic_delete-expanded').html('');
            $(this).parent().parent().find('.quickpic_delete').html('<img src="/wp-content/themes/lotto_theme/images/delete.png"/>');
            $(this).parent().parent().find('h3').removeClass('expanded');
            $(this).parent().parent().find('.select_num_col_part').removeClass('expanded');
            $(this).parent().parent().find('.select_num_part_wrapper h5').hide();
        });

        // click on regular numbers
		jQuery(document).on("click", ".all_num_part", function () {
            $(this).addClass('expanded');
            $(this).children('.lt_numbers_wrapper').removeClass('wrapper-mobile');
            $(this).parent().children('.select_num_part').children('.select_num_part_wrapper').removeClass('wrapper-mobile');
            $(this).parent().parent('.select_num_col').removeClass('wrapper-mobile');
            $(this).parent().parent().children('.close-btn').show();
            $(this).parent().find('.select_num_part').removeClass('wrapper-mobile');
            $(this).parent().find('.quickpic_text').show();
            $(this).parent().find('.quickpic_delete').addClass('quickpic_delete-expanded').html('');
            $(this).parent().find('.quickpic_delete img').addClass('hidden');
            $(this).parent().find('.select_num_part').addClass('expanded');
            $(this).parent().find('h3').addClass('expanded');
            $(this).parent().addClass('expanded');
            $(this).parent().find('.select_num_part_wrapper h5').show();
        });
		jQuery(document).on("click", ".select_num_col_part", function () {
			$(this).find('.all_num_part').addClass('expanded');
            $(this).find('.all_num_part').children('.lt_numbers_wrapper').removeClass('wrapper-mobile');
            $(this).find('.all_num_part').parent().children('.select_num_part').children('.select_num_part_wrapper').removeClass('wrapper-mobile');
            $(this).find('.all_num_part').parent().parent('.select_num_col').removeClass('wrapper-mobile');
            $(this).find('.all_num_part').parent().parent().children('.close-btn').show();
            $(this).find('.all_num_part').parent().find('.select_num_part').removeClass('wrapper-mobile');
            $(this).find('.all_num_part').parent().find('.quickpic_text').show();
            $(this).find('.all_num_part').parent().find('.quickpic_delete').addClass('quickpic_delete-expanded').html('');
            $(this).find('.all_num_part').parent().find('.quickpic_delete img').addClass('hidden');
            $(this).find('.all_num_part').parent().find('.select_num_part').addClass('expanded');
            $(this).find('.all_num_part').parent().find('h3').addClass('expanded');
            $(this).find('.all_num_part').parent().addClass('expanded');
            $(this).find('.all_num_part').parent().find('.select_num_part_wrapper h5').show();
		});

        // click on extra numbers
        /*jQuery(document).on("click", ".select_num_part", function () {
            $(this).children('.lt_numbers_wrapper').removeClass('wrapper-mobile');
            $(this).parent().children('.select_num_part').children('.select_num_part_wrapper').removeClass('wrapper-mobile');
            $(this).parent().parent('.select_num_col').removeClass('wrapper-mobile');
        });*/
        jQuery(document).on("click", ".select_num_part", function () {
            $(this).parent().find('.all_num_part').addClass('expanded');
            $(this).parent().find('.all_num_part').children('.lt_numbers_wrapper').removeClass('wrapper-mobile');
            $(this).parent().find('.all_num_part').parent().children('.select_num_part').children('.select_num_part_wrapper').removeClass('wrapper-mobile');
            $(this).parent().find('.all_num_part').parent().parent('.select_num_col').removeClass('wrapper-mobile');
            $(this).parent().find('.all_num_part').parent().parent().children('.close-btn').show();
            $(this).parent().find('.all_num_part').parent().find('.select_num_part').removeClass('wrapper-mobile');
            $(this).parent().find('.all_num_part').parent().find('.quickpic_text').show();
            $(this).parent().find('.all_num_part').parent().find('.quickpic_delete').addClass('quickpic_delete-expanded').html('Clear all');
            $(this).parent().find('.all_num_part').parent().find('.quickpic_delete img').addClass('hidden');
            $(this).parent().find('.all_num_part').parent().find('.select_num_part').addClass('expanded');
            $(this).parent().find('.all_num_part').parent().find('h3').addClass('expanded');
            $(this).parent().find('.all_num_part').parent().addClass('expanded');
            $(this).parent().find('.all_num_part').parent().find('.select_num_part_wrapper h5').show();
        });
    }
});
function addLineNumber(){
    //debugger;
    jQuery('.select_num_col_part h3').each(function ( index, value) {
        $(value).html("LINE " + (index * 1 + 1));
    });
}
jQuery(document).ready(function (){
    if (isMobile) {
        //addLineNumber();
        setMobileLayout();
    }
});
