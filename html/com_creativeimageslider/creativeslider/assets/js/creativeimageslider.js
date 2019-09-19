(function($) {


$(window).load(function() {
	
	//claculate proper width
	function cis_calculate_width() {
		$('.cis_images_holder').each(function() {
			var $wrapper = $(this);
			var total_w = 0;
			$wrapper.find('.cis_row_item').each(function() {
				$(this).find('img').css('width','auto');
				var w = parseInt($(this).find('img').width());
				// $(this).find('img').width(w);
				var m_r = isNaN(parseFloat($(this).css('margin-right'))) ? 0 : parseFloat($(this).css('margin-right'));
				var m_l = isNaN(parseFloat($(this).css('margin-left'))) ? 0 : parseFloat($(this).css('margin-left'));
				total_w += w + m_r*1 + m_l*1;
			});
			total_w = total_w + 1*1;
			var half_width = parseInt(total_w / 2);
			$wrapper.width(total_w);
			$wrapper.attr("half_width",half_width);
		});
	};
	
	setTimeout(function() {
		cis_calculate_width();
	},800);		
	setTimeout(function() {
		cis_calculate_width();
	},1200);	

	//resize
	$(window).resize(function() {
	  cis_calculate_width();
	});
	
	$(".cis_row_item img").each(function() {
		$this = $(this);
		var $cis_overlay = $(this).next('.cis_row_item_overlay');
		if($(this).attr('cis_loaded') == 'loaded')
			return;

		var cis_overlay_animation_type = $this.parents('.cis_main_wrapper').attr("cis_overlay_animation_type");
		var cis_overlay_type = $this.parents('.cis_main_wrapper').attr("cis_overlay_type");

		var $cis_overlay = $(this).next('.cis_row_item_overlay');
		$cis_overlay.css({'visibility' : 'hidden','display' : 'block'});
		var h = $cis_overlay.height();

		if(cis_overlay_animation_type == 0) { // slide
			if(cis_overlay_type == 0) { // overlay is bottom fixed
				var cis_hidden_margin = -1*h;
				$cis_overlay.css({'visibility' : 'visible','display' : 'block','margin-bottom' : cis_hidden_margin}).attr('h',h);
			}
			else {
				$cis_overlay.css({'visibility' : 'visible','display' : 'block','top' : '100%'}).attr('h',h);
			}
		}
		else if(cis_overlay_animation_type == 1) {// always keep visible
			$cis_overlay.css({'visibility' : 'visible','display' : 'block','opacity' : '0'});
			$cis_overlay.addClass('cis_transition_default')
			setTimeout(function() {
				$cis_overlay.addClass("cis_opacity_visible");
			},1620);
		} 		
		else if(cis_overlay_animation_type == 2) {// fade
			$cis_overlay.css({'visibility' : 'visible','display' : 'block','opacity' : '0'});
		}
		else if(cis_overlay_animation_type == 4) {// hidden
			$cis_overlay.addClass('cis_display_none').css({'visibility' : 'hidden','display' : 'none'});
		}
		else if(cis_overlay_animation_type == 3) {// follow mouse
			if(cis_overlay_type == 0) { // overlay is bottom fixed
				var cis_hidden_margin = -1*h;
				$cis_overlay.css({'visibility' : 'visible','display' : 'block','margin-bottom' : cis_hidden_margin});
			}
			else {
				$cis_overlay.css({'visibility' : 'visible','display' : 'block','top' : '100%'}).attr('h',h);
			}
		} 
	});
	
	$(".cis_row_item img").each(function() {
		if($(this).attr('cis_loaded') == 'loaded')
			return;
		cis_make_pr($(this));
	});
	
	function cis_make_pr($el) {
		if($el.attr('cis_loaded') == 'loaded')
			return;

		//get slider data
		var slider_data = $el.parents('.cis_main_wrapper ').find('.cis_options_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_item_appear_effect_type = parseInt(slider_data_array[2]);

		var $cis_row_item = $el.parents('.cis_row_item');
		$cis_wrapper = $cis_row_item.parents(".cis_main_wrapper");
		var item_width = $el.width();
		$el.parents('.cis_row_item').find('.cis_row_item_loader').animate({
			width: item_width
		},400,'swing',function() {
			var $loader = $el.parents('.cis_row_item').find('.cis_row_item_loader');
			var $item_inner = $el.parents('.cis_row_item_inner');

			if(cis_item_appear_effect_type == 0) {
				$loader.fadeOut(200,function() {
					$item_inner.hide().removeClass('cis_row_hidden_element').fadeIn(200);
				});
			}
			else if (cis_item_appear_effect_type == 1) {
				var st = $loader.attr("style");
				$cis_row_item.attr("style",st);
				$item_inner.removeClass('cis_row_hidden_element');

				$item_inner.addClass("cis_flipcard_no_transition").addClass("cis_flipcard_side_2").addClass("cis_flipcard_side").removeClass("cis_flipcard_no_transition");
				$loader.addClass("cis_flipcard_side_1").addClass("cis_flipcard_side");
				// $item_inner.find('img').addClass('cis_transition_none');
				$item_inner.find('.cis_row_item_overlay').addClass('cis_visibility_hidden');


				var flip_direction = Math.floor((Math.random() * 10) + 1) > 5 ? 1 : 2;
				var cis_flip_dir_class = $loader.hasClass("cis_row_item_loader_color2") ? 'cis_flip_h_' + flip_direction : 'cis_flip_v_' + flip_direction;
				$cis_row_item.addClass("cis_flipcard").addClass(cis_flip_dir_class);

				cis_show_flipped_item_wo($cis_row_item);
			}
		});
	};

	function cis_show_flipped_item_wo($item) {
		setTimeout(function() {
			$item.addClass("cis_fliped");
		},20);

		setTimeout(function() {
			$item
				.addClass('cis_transition_none')
				.removeClass("cis_fliped")
				.removeClass("cis_flipcard")
				.removeClass("cis_flip_h_1")
				.removeClass("cis_flip_h_2")
				.removeClass("cis_flip_v_1")
				.removeClass("cis_flip_v_2")
				.removeClass("cis_transition_none");
			$item.find('.cis_row_item_loader').hide()
				.removeClass("cis_flipcard_side")
				.removeClass("cis_flipcard_side_1")
				.removeClass("cis_flipcard_side_2");
			$item.find('.cis_row_item_inner')
				.addClass('cis_transition_none')
				.removeClass("cis_flipcard_side")
				.removeClass("cis_flipcard_side_1")
				.removeClass("cis_flipcard_side_2")
				.removeClass("cis_transition_none");
			$item.find('.cis_row_item_overlay')
				.removeClass('cis_visibility_hidden');
		},820);
	};
	
});

$(document).ready(function() {

	// detect touch device
	var cis_is_touch_devise = false;
	if( 'ontouchstart' in window ) {
		cis_is_touch_devise = true;
	}

	// get animation type
	var cis_animation_type = 'css3'; // javascript or css3
	function cis_get_animation_type() {
		//get slider data
		var slider_data = $('.cis_main_wrapper ').find('.cis_options_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_animation_type_index = parseInt(slider_data_array[0]);
		cis_animation_type = cis_animation_type_index == 1 ? 'javascript' : 'css3';
	}
	cis_get_animation_type();

	//creative popup///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	/*
	//add popup html
	*/
	function cis_add_creative_popup_html() {
		var cis_base = $(".cis_main_wrapper").attr("cis_base");
		var popup_loader_loading_class = 'cis_popup_wrapper_loader';
		// var loader_popup_html = '<div class="cis_popup_wrapper '+ popup_loader_loading_class +'" cis_popup_autoplay="2"><div class="cis_popup_autoplay_bar_holder"><div class="cis_popup_autoplay_bar_wrapper"><div class="cis_popup_autoplay_bar"></div></div></div><div class="cis_popup_item_holder"><img src="" class="cis_popup_left_arrow" /><img src="" class="cis_popup_right_arrow" /><div class="cis_popup_item_order_info"></div><img src="' + cis_base + '/components/com_creativeimageslider/assets/images/play.png" class="cis_popup_autoplay_play" /><img src="' + cis_base + '/components/com_creativeimageslider/assets/images/pause.png" class="cis_popup_autoplay_pause cis_popup_topright_icon_hidden"/><img src="' + cis_base + '/components/com_creativeimageslider/assets/images/close.png" class="cis_popup_close" /></div><div class="cis_popup_bottom_holder"></div></div>';
/*		var loader_popup_html = '<div class="cis_popup_wrapper '+ popup_loader_loading_class +'" cis_popup_autoplay="2"><div class="cis_popup_autoplay_bar_holder"><div class="cis_popup_autoplay_bar_wrapper"><div class="cis_popup_autoplay_bar"></div></div></div><div class="cis_popup_item_holder"><img src="" class="cis_popup_left_arrow" /><img src="" class="cis_popup_right_arrow" /><div class="cis_popup_item_order_info"></div><img src="' + cis_base + '/components/com_creativeimageslider/assets/images/play.png" class="cis_popup_autoplay_play" /><img src="' + cis_base + '/components/com_creativeimageslider/assets/images/pause.png" class="cis_popup_autoplay_pause cis_popup_topright_icon_hidden"/><img src="' + cis_base + '/components/com_creativeimageslider/assets/images/close.png" class="cis_popup_close" /><div style="height: auto;font-weight: normal;text-shadow: rgb(0, 0, 0) 0px 3px 3px;padding: 4px 10px 5px 8px;line-height: 15px;color: rgb(255, 255, 255);font-style: italic;font-size: 10px;position: absolute;display: block;z-index: 10;bottom: 5px;right: 0px;background: rgba(0, 0, 0, 0.39);border: solid 1px rgba(68, 65, 65, 0.59);border-top-left-radius: 6px;border-bottom-left-radius: 6px;border-right: 0;box-shadow: 1px 1px 3px 1px rgba(5, 0, 0, 0.6);-webkit-box-shadow: 1px 1px 3px 1px rgba(5, 0, 0, 0.6);-moz-box-shadow: 1px 1px 3px 1px rgba(5, 0, 0, 0.6);opacity: 0.7;">By <a href="http://creative-solutions.net/joomla/creative-image-slider" target="_blank" style="font-weight: bold;color: rgb(72, 108, 253);">Creative Image Slider</a></div></div><div class="cis_popup_bottom_holder"></div></div>';
		$('body').append(loader_popup_html);*/
	};
	cis_add_creative_popup_html();

	/*
	//add overlay html
	*/
	function cis_add_creative_overlay_html() {
		var overlay_html = '<div class="cis_main_overlay"></div>';
		$('body').append(overlay_html);
	};
	cis_add_creative_overlay_html();

	/*
	//popup event function
	*/
	setTimeout(function() {
		$(".cis_main_wrapper").each(function() {
			cis_set_overlay_functions($(this));
		});
	},1200);

	function cis_set_overlay_functions($wrapper) {

		// set overlay functions
		var cis_popup_event = parseInt($wrapper.attr("cis_popup_event"));
		var cis_link_event = parseInt($wrapper.attr("link_open_event"));

		var event_type = cis_is_touch_devise ? 'vclick' : 'click';

		if(cis_popup_event == 0 || cis_link_event == 0) {//icons enabled /////////////////////////////////////////////////////////////////////

			if(cis_popup_event == 0) {
				$wrapper.on(event_type, '.cis_zoom_icon', function(e) {
					e.preventDefault();

					//show overlay
					cis_show_creative_overlay();

					//show popup
					var $loader = $(this).parents('.cis_row_item').find('.cis_row_item_inner');
					cis_animate_creative_popup($loader);
				});	
			}
			if(cis_link_event == 0) {
				$wrapper.on(event_type, '.cis_link_icon', function(e) {
					// console.log('click on link icon');
					var cis_click_target = parseInt($(this).parents('.cis_row_item_overlay').attr("cis_click_target"));
					var cis_click_url = $(this).parents('.cis_row_item_overlay').attr("cis_click_url");

					if(cis_click_target == 1)
						window.open(cis_click_url);
					else
						window.location.href = cis_click_url;
				});	
			}
		};

		if(cis_popup_event == 1) {// open popup on click of overlay + button
			// set cursos pointer css to overlay
			$wrapper.find('.cis_row_item_overlay').addClass('cis_cursor_zoom');
			// click functon
			$wrapper.on(event_type, '.cis_row_item_overlay', function(e) {
				if($(e.target).hasClass('creative_btn')) {
					if(cis_link_event != 2) {
						e.preventDefault();
					}
					return;
				}
				//show overlay
				cis_show_creative_overlay();

				//show popup
				var $loader = $(this).parents('.cis_row_item').find('.cis_row_item_inner');
				cis_animate_creative_popup($loader);
			});
			if(cis_link_event != 2) {
				$wrapper.on('click','.creative_btn', function(e) {
					e.preventDefault();
				});
			}
		}
		if(cis_popup_event == 2) {//open popup onclick of button
			$wrapper.on(event_type,'.creative_btn', function(e) {
				e.preventDefault();

				//show overlay
				cis_show_creative_overlay();

				//show popup
				var $loader = $(this).parents('.cis_row_item').find('.cis_row_item_inner');
				cis_animate_creative_popup($loader);
			});
		}

		if(cis_link_event == 1) { // open link onclick of overlay
			$wrapper.find('.cis_row_item_overlay').addClass('cis_cursor_pointer');
			$wrapper.on(event_type, '.cis_row_item_overlay', function(e) {
				if($(e.target).hasClass('creative_btn')) {
					if(cis_popup_event == 2) {
						e.preventDefault();
					}
					return;
				}
				// set cursos pointer css to overlay

				var cis_click_target = parseInt($(this).attr("cis_click_target"));
				var cis_click_url = $(this).attr("cis_click_url");

				if(cis_click_target == 1)
					window.open(cis_click_url);
				else
					window.location.href = cis_click_url;
			});	
		}
		if(cis_link_event == 2) {
			// do nothing. the link will be opened through html
		}


		// render overlay elements
		$wrapper.find(".cis_row_item_overlay").each(function() {
			var $cis_item = $(this).parents(".cis_row_item");

			cis_render_overlay_items($cis_item, cis_popup_event, cis_link_event);
			setTimeout(function() {
				cis_render_overlay_items($cis_item, cis_popup_event, cis_link_event);
			},2500);

			if(cis_popup_event == 0 || cis_link_event == 0) {//open popup onclick of button
				cis_make_item_icons($cis_item, cis_popup_event, cis_link_event, true);
				setTimeout(function() {
					cis_make_item_icons($cis_item, cis_popup_event, cis_link_event, false);
				},2500);
			};
		});

	};

	function cis_render_overlay_items($cis_item, cis_popup_event, link_open_event) {
		var $cis_item_inner = $cis_item.find('.cis_row_item_inner');
		var item_h = parseInt($cis_item_inner.height());

		var item_w = parseInt($cis_item_inner.width());

		var slider_data = $cis_item.parents('.cis_main_wrapper ').find('.cis_options_data').html();
		var slider_data_array = slider_data.split(',');
		var icon_w = parseInt(slider_data_array[5]);

		var icons_position = parseInt(slider_data_array[10]);
		var overlay_items_vertical_offset = parseInt(slider_data_array[11]);
		var overlay_items_middle_offset = parseInt(slider_data_array[12]);
		var caption_visible = parseInt(slider_data_array[13]);
		var cis_overlay_type = parseInt(slider_data_array[3]);

		// render caption and button
		if(cis_overlay_type == 1) {
			// render caption
			if(caption_visible == 1) {
				$cis_item.find('.cis_txt_inner').addClass('cis_h_padding_set'); // add horizontal padding
				var cis_caption_height = parseInt($cis_item.find('.cis_txt_inner').height());
				var total_items_height = cis_caption_height;

				// check if icon(s) visible
				var icon_visible = ((cis_popup_event == 0 || link_open_event == 0) && icons_position == 1) ? 1 : 0;
				if(icon_visible == 1) {
					total_items_height = total_items_height + icon_w*1 + overlay_items_vertical_offset*1;
				}

				// check if button visible
				var button_visible = (cis_popup_event == 2 || link_open_event == 2) ? 1 : 0;
				if(button_visible == 1) {
					var cis_button_height = parseInt($cis_item.find('.cis_btn_wrapper').height());
					total_items_height = total_items_height + cis_button_height*1 + overlay_items_vertical_offset*1;
				}

				//calculate top position
				var top_offset = ((item_h - total_items_height) / 2) + 1*overlay_items_middle_offset;
				
				if(icon_visible == 1)
					top_offset = top_offset + 1*icon_w + 1*overlay_items_vertical_offset;

				// set css
				$cis_item.find('.cis_row_item_txt_wrapper').css('top',top_offset);

			}
			// render button
			var button_visible = (cis_popup_event == 2 || link_open_event == 2) ? 1 : 0;
			if(button_visible == 1) {
				var cis_button_height = parseInt($cis_item.find('.cis_btn_wrapper').height());
				var total_items_height = cis_button_height;

				// check if icon(s) visible
				var icon_visible = ((cis_popup_event == 0 || link_open_event == 0) && icons_position == 1) ? 1 : 0;
				if(icon_visible == 1) {
					total_items_height = total_items_height + icon_w*1 + overlay_items_vertical_offset*1;
				}

				if(caption_visible == 1) {
					var cis_caption_height = parseInt($cis_item.find('.cis_row_item_txt_wrapper').height());
					total_items_height = total_items_height + cis_caption_height*1 + overlay_items_vertical_offset*1;
				}

				//calculate top position
				var top_offset = ((item_h - total_items_height) / 2) + 1*overlay_items_middle_offset;
				if(icon_visible == 1)
					top_offset = top_offset + 1*icon_w + 1*overlay_items_vertical_offset;
				if(caption_visible == 1)
					top_offset = top_offset + 1*cis_caption_height + 1*overlay_items_vertical_offset;

				// set css
				$cis_item.find('.cis_btn_wrapper').css('top',top_offset);
			}
		}
		// end render caption and button
	}

	function cis_make_item_icons($cis_item, cis_popup_event, link_open_event, add_html) {
		var $cis_item_inner = $cis_item.find('.cis_row_item_inner');
		var item_h = parseInt($cis_item_inner.height());
		var item_w = parseInt($cis_item_inner.width());

		var slider_data = $cis_item.parents('.cis_main_wrapper ').find('.cis_options_data').html();
		var slider_data_array = slider_data.split(',');
		var icon_w = parseInt(slider_data_array[5]);
		var icons_margin = parseInt(slider_data_array[6]);
		var right_offset = parseInt(slider_data_array[7]);
		var top_offset = right_offset;
		var icons_position = parseInt(slider_data_array[10]) == 0 ? 'top' : 'center';
		var icon_color = parseInt(slider_data_array[9]) == 0 ? 'black' : 'white';
		var icon_animation = parseInt(slider_data_array[8]);

		var overlay_items_vertical_offset = parseInt(slider_data_array[11]);
		var overlay_items_middle_offset = parseInt(slider_data_array[12]);
		var caption_visible = parseInt(slider_data_array[13]);
		var cis_overlay_type = parseInt(slider_data_array[3]);

		if(cis_popup_event == 0) {
			var top_position = (item_h - icon_w) / 2;

			if(icons_position == 'center') {

				var total_items_height = icon_w;
				if(cis_overlay_type == 1) {

					if(caption_visible == 1) {
						var cis_caption_height = parseInt($cis_item.find('.cis_row_item_txt_wrapper').height());
						total_items_height = total_items_height + cis_caption_height*1 + overlay_items_vertical_offset*1;
					}

					var button_visible = (cis_popup_event == 2 || link_open_event == 2) ? 1 : 0;
					if(button_visible == 1) {
						var cis_button_height = parseInt($cis_item.find('.cis_btn_wrapper').height());
						total_items_height = total_items_height + cis_button_height*1 + overlay_items_vertical_offset*1;
					}
				}

				var right_position = link_open_event == 0 ? (item_w + 1 * icons_margin) / 2 : (item_w - icon_w) / 2;
				var top_position = (item_h - total_items_height) / 2 + 1*overlay_items_middle_offset;

			}
			else {
				var right_position = link_open_event == 0 ?  icon_w + icons_margin + right_offset : right_offset;
				var top_position = top_offset;
			}

			if(add_html) {	
				// check if icon has animation
				if(icon_animation != 4)
					var zoom_icon_html = '<div class="cis_zoom_icon cis_zoom_icon_hidden cis_icon_effect_'+ icon_animation + ' cis_icon_' + icon_color + '" title="Zoom"><div class="cis_zoom_icon_inner "></div></div>';
				else
					var zoom_icon_html = '<div class="cis_zoom_icon cis_icon_' + icon_color + '" title="Zoom"><div class="cis_zoom_icon_inner "></div></div>';

				if(cis_overlay_type == 0)
					$cis_item_inner.append(zoom_icon_html);
				else
					$cis_item_inner.find('.cis_row_item_overlay ').append(zoom_icon_html);
			}

			var $cis_zoom_icon = $cis_item_inner.find('.cis_zoom_icon');
			$cis_zoom_icon.css({
				'width' : icon_w,
				'height' : icon_w,
				'top' : top_position,
				'right' : right_position
			});

		}		
		if(link_open_event == 0) {
			var top_position = (item_h - icon_w) / 2;

			if(icons_position == 'center') {
				var total_items_height = icon_w;
				if(cis_overlay_type == 1) {

					if(caption_visible == 1) {
						var cis_caption_height = parseInt($cis_item.find('.cis_row_item_txt_wrapper').height());
						total_items_height = total_items_height + cis_caption_height*1 + overlay_items_vertical_offset*1;
					}

					var button_visible = (cis_popup_event == 2 || link_open_event == 2) ? 1 : 0;
					if(button_visible == 1) {
						var cis_button_height = parseInt($cis_item.find('.cis_btn_wrapper').height());
						total_items_height = total_items_height + cis_button_height*1 + overlay_items_vertical_offset*1;
					}
				}

				var right_position = cis_popup_event == 0 ? (item_w - 2 * icon_w  - icons_margin) / 2 : (item_w - icon_w) / 2;
				var top_position = (item_h - total_items_height) / 2 + 1*overlay_items_middle_offset;
			}
			else {
				var right_position = cis_popup_event == 0 ? right_offset : right_offset;
				var top_position = top_offset;
			}

			if(add_html) {	
				if(icon_animation != 4)
					var link_icon_html = '<div class="cis_link_icon cis_link_icon_hidden cis_icon_effect_'+ icon_animation + ' cis_icon_' + icon_color + '" title="Open Link"></div>';
				else
					var link_icon_html = '<div class="cis_link_icon cis_icon_' + icon_color + '" title="Open Link"></div>';

				if(cis_overlay_type == 0)
					$cis_item_inner.append(link_icon_html);
				else
					$cis_item_inner.find('.cis_row_item_overlay').append(link_icon_html);
			}

			var $cis_link_icon = $cis_item_inner.find('.cis_link_icon');
			$cis_link_icon.css({
				'width' : icon_w,
				'height' : icon_w,
				'top' : top_position,
				'right' : right_position
			});
		}
	};

	function cis_set_zoom_events() {
		$('.cis_images_row').on('mouseenter', '.cis_zoom_icon', function() {
			$(this).addClass('cis_zoom_icon_active');
		});		
		$('.cis_images_row').on('mouseleave', '.cis_zoom_icon', function() {
			$(this).removeClass('cis_zoom_icon_active');
		});
	};

	function cis_set_link_events() {
		$('.cis_images_row').on('mouseenter', '.cis_link_icon', function() {
			$(this).addClass('cis_link_icon_active');
		});		
		$('.cis_images_row').on('mouseleave', '.cis_link_icon', function() {
			$(this).removeClass('cis_link_icon_active');
		});
	};
	setTimeout(function() {
		cis_set_zoom_events();
		cis_set_link_events();
	},1500);

	function cis_show_item_icons($cis_row_item) {
		var cis_item_id = $cis_row_item.attr("item_id");
		$wrapper = $cis_row_item.parents('.cis_main_wrapper');

		var cis_popup_event = parseInt($wrapper.attr("cis_popup_event"));
		var cis_link_event = parseInt($wrapper.attr("link_open_event"));

		setTimeout(function() {
			if(cis_popup_event == 0) {
				$wrapper.find('.cis_zoom_icon').addClass('cis_zoom_icon_hidden');
				$wrapper.find('.cis_item_' + cis_item_id).find('.cis_zoom_icon').removeClass('cis_zoom_icon_hidden');
			}
			if(cis_link_event == 0) {
				$wrapper.find('.cis_link_icon').addClass('cis_link_icon_hidden');
				$wrapper.find('.cis_item_' + cis_item_id).find('.cis_link_icon').removeClass('cis_link_icon_hidden');
			}
		},1);
	};

	/*
	//make items ordering
	*/
	function cis_make_creative_items_orders() {
		$('.cis_main_wrapper').each(function(){
			var curr_order = 0;
			$(this).find('.cis_row_item').each(function() {
				$(this).attr("cis_item_order",curr_order)
				curr_order ++;
			})
		})
	};
	cis_make_creative_items_orders();

	/*
	//overlay functions
	*/
	function cis_show_creative_overlay() {
		var windowWidth = $(document).width(); //retrieve current window width
		var windowHeight = $(document).height(); //retrieve current window height
		$('.cis_main_overlay').css({'width':windowWidth,'height':windowHeight}).stop().fadeTo(400,0.8);
	};
	function cis_resize_creative_overlay() {
		var windowWidth = $(document).width(); //retrieve current window width
		var windowHeight = $(document).height(); //retrieve current window height
		$('.cis_main_overlay').css({'width':windowWidth,'height':windowHeight});
	};
	function cis_hide_creative_overlay() {
		$('.cis_main_overlay').stop().fadeOut(400,function() {
			$(this).css({'width':'100%','height':'100%'});
			//reset popup html

			$('.cis_popup_item').remove();
			$('.cis_popup_bottom_holder').removeAttr("style").removeAttr("h").html('');
			$('.cis_popup_wrapper').removeClass('cis_popup_in_progress');
		});
	};

	/*
	//function to create popup paths
	*/
	var cis_popup_paths = new Array();
	$('.cis_main_wrapper').each(function() {
		var cis_slider_id = $(this).attr("cis_slider_id");
		cis_popup_paths[cis_slider_id] = new Array();
		var item_order = 0;
		$(this).find('.cis_row_item').each(function() {
			$this = $(this);
			var item_popup_path = $(this).attr("cis_popup_link");

			if(item_popup_path != '') {
				item_order ++;
				cis_popup_paths[cis_slider_id][item_order] = item_popup_path;
				$this.attr("cis_popup_order", item_order).addClass('cis_has_popup');
			}
		});
		$(this).attr("cis_popup_items_count",item_order);
	});


	/*
	//function to animate popup
	*/
	function cis_animate_creative_popup($loader) {
		//get popup image
		var slider_id = $loader.parents('.cis_main_wrapper').attr("cis_slider_id");
		var slider_id_unique = $loader.parents('.cis_main_wrapper').attr("roll");
		var item_order = $loader.parents('.cis_row_item').attr("cis_popup_order");
		var item_id = $loader.parents('.cis_row_item').attr("item_id");
		var cis_popup_link = cis_popup_paths[slider_id][item_order];

		//get data
		var slider_data =$loader.parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_use_back_img = parseInt(slider_data_array[2]);


		var $cis_popup = $('.cis_popup_wrapper');
		$cis_popup.addClass('cis_popup_in_progress');
		$cis_popup.attr("slider_id", slider_id_unique);
		$cis_popup.addClass('cis_vissible');

		//show or hide overlay bg image
		if(cis_popup_use_back_img == 0)
			$('.cis_main_overlay').addClass('cis_main_overlay_without_bg');
		else
			$('.cis_main_overlay').removeClass('cis_main_overlay_without_bg');


		var popup_loader_animate_timeout1 = 10;
		setTimeout(function() {
			//get loader sizes, coordinates
			var w = parseInt($loader.css('width'));	
			var h = parseInt($loader.css('height'));

			//get body borders
			var body_border_top = parseInt($('body').css('border-top-width'));
			var body_border_left = parseInt($('body').css('border-left-width'));

			//get offsets
			var offset_top = $loader.offset().top;
			var offset_left = $loader.offset().left;

			var offset_top_final = offset_top;
			var offset_left_final = offset_left;

			//scroll positions
			var vScrollPosition = $(document).scrollTop(); //retrieve the document scroll ToP position
			var hScrollPosition = $(document).scrollLeft(); //retrieve the document scroll Left position

			//show popup
			
			$cis_popup
			.hide()
			.attr("start_data", w + ',' + h + ',' + offset_top_final + ',' + offset_left_final + ',' + vScrollPosition + ',' + hScrollPosition)
			.css({
				'width': w,
				'height': h,
				'top': offset_top,
				'left': offset_left_final
			})
			.fadeIn(400, function() {
				cis_show_image(item_id);
			});
		},popup_loader_animate_timeout1);
	};

	//function to back the popup to start position
	function cis_reset_creative_popup() {
		var $cis_popup = $('.cis_popup_wrapper');
		var slider_id = $cis_popup.attr("slider_id");

		//hide arrows 
		cis_popup_hide_arrows();
		//hide image order data
		cis_popup_hide_item_order();
		//hide popup autoplay bar
		cis_popup_hide_autoplay_bar();
		//hide tpright arrows
		cis_popup_hide_topright_icons();

		//check if popup is ready
		if($cis_popup.hasClass('cis_popup_in_progress'))
			return;

		//set popup ready!
		$cis_popup.addClass('cis_popup_in_progress');

		var $cis_popup_item = $cis_popup.find('.cis_popup_item');
		var $cis_popup_bottom = $cis_popup.find('.cis_popup_bottom_holder');

		$cis_popup.removeClass("cis_vissible");

		var start_data = $cis_popup.attr("start_data");
		var start_data_array = start_data.split(",");
		var bottom_h = parseInt($cis_popup.find('.cis_popup_bottom_holder').attr("h"));

		var cis_popup_animate_back_timeout = 0;
		setTimeout(function() {

			//hide item
			$cis_popup_item.fadeOut(400);

			$('.cis_main_overlay').stop().fadeTo(400,0.8);

			//animate main popup
			$cis_popup.stop().animate({
				'height':'-=' + bottom_h
			},
			{
				duration: 400, 
				queue: false, 
				easing: 'swing',
				complete: function() {
					setTimeout(function() {
						$("body").stop().animate({
							scrollTop: start_data_array[4]
						},400);

						$cis_popup
						.removeClass("cis_popup_wrapper_loader_shaddow")
						.animate({
							'width': start_data_array[0],
							'height': start_data_array[1],
							'top': start_data_array[2],
							'left': start_data_array[3]
						},400,'swing', function() {
							$cis_popup.fadeOut(400);
							cis_hide_creative_overlay();

							// trigger mouseleave, to continue auto-play(if exists).
							$('.cis_wrapper_' + slider_id).trigger("mouseleave");
						});
					},100);
				}
			});

			//animate popup bottom
			$cis_popup_bottom.stop().animate({
				'height':'0'
			},
			{
				duration: 400, 
				queue: false, 
				easing: 'swing', 
				complete: function() {
					$(this).hide();
				}
			});
		},cis_popup_animate_back_timeout);
		
	};


	function cis_show_image(item_id) {
		$loader = $("#cis_item_" + item_id).find('.cis_row_item_inner');

		var $cis_popup = $('.cis_popup_wrapper');
		$cis_popup.addClass('cis_vissible');
		$cis_popup.attr("item_id", item_id);

		//get popup image
		var slider_id = $loader.parents('.cis_main_wrapper').attr("cis_slider_id");
		var item_order = $loader.parents('.cis_row_item').attr("cis_popup_order");
		var items_count = $loader.parents('.cis_main_wrapper').attr("cis_popup_items_count");
		var cis_popup_link = cis_popup_paths[slider_id][item_order];

		//get data
		var slider_data =$loader.parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_max_size = parseInt(slider_data_array[0]);
		var cis_popup_item_min_width = parseInt(slider_data_array[1]);

		// set item order info
		var cis_popup_item_order_text = item_order + ' of ' + items_count;
		$('.cis_popup_item_order_info').html(cis_popup_item_order_text)

		var cis_title = $("#cis_item_" + item_id).find('.cis_row_item_overlay_txt').html();
		var cis_desc = $("#cis_item_" + item_id).find('.cis_popup_caption').html();
		
		// if url is empty, reset popup
		if(cis_popup_link == '' || cis_popup_link == undefined) {
			$cis_popup.removeClass('cis_popup_in_progress')
			cis_reset_creative_popup();
		};

		//load image
		var $popup_img = $("<img />", { src:cis_popup_link,class:'cis_popup_item'});
		$popup_img
		.error(function() { 
			alert("Error loading image");
			console.log("Error loading image. Url: " + cis_popup_link);
			$cis_popup.removeClass('cis_popup_in_progress')
			cis_reset_creative_popup();
		})
		.load(function() {

			$popup_img.addClass('cis_hidden').appendTo("body");

			var img_width = parseInt($popup_img.width());
			var img_height = parseInt($popup_img.height());
			var img_ratio = img_height / img_width;
			var img_width_final = img_width;
			var img_height_final = img_height;

			$popup_img.attr("w",img_width);
			$popup_img.attr("h",img_height);

			var $popup_img_final = $popup_img;
			$popup_img.remove();
			$popup_img_final.removeClass('cis_hidden');

			$cis_popup.append($popup_img_final);

			var windowWidth = parseInt($(window).width()); //retrieve current window width
			var windowHeight = parseInt($(window).height()); //retrieve current window height
			var vScrollPosition = parseInt($(document).scrollTop()); //retrieve the document scroll ToP position
			var hScrollPosition = parseInt($(document).scrollLeft()); //retrieve the document scroll Left position

			// set limits
			var cis_max_percent_w = cis_popup_max_size;
			var cis_max_percent_h = cis_popup_max_size;

			// calculate max sizes
			var max_allowed_w = parseInt(windowWidth * cis_max_percent_w / 100);
			var max_allowed_h = parseInt(windowHeight * cis_max_percent_h / 100);

			//if image height greater than max allowed size, make corrections!
			if(img_height > max_allowed_h) {
				var img_height_check = max_allowed_h;
				var img_width_check = max_allowed_h / img_ratio;

				//check if calculated with in allowed range
				if(img_width_check > max_allowed_w) {
					img_width_check = max_allowed_w;
					img_height_check = max_allowed_w * img_ratio;
				}

				//set values
				img_width_final = img_width_check;
				img_height_final = img_height_check;

			}	
			else if(img_width > max_allowed_w) {
				var img_width_check = max_allowed_w;
				var img_height_check = max_allowed_w * img_ratio;

				//check if calculated with in allowed range
				if(img_height_check > max_allowed_h) {
					img_height_check = max_allowed_h;
					img_width_check = max_allowed_h / img_ratio;
				}

				//set values
				img_width_final = img_width_check;
				img_height_final = img_height_check;
			}

			// get autoplay bar
			var $autoplay_bar_holder = $('.cis_popup_autoplay_bar_holder');
			var $autoplay_bar_holder = $('.cis_popup_autoplay_bar');
			var autolplay_bar_h = parseInt($autoplay_bar_holder.attr("h"));

			//get bottom
			var bottom_htm = '<div class="cis_popup_bottom_inner_wrapper cis_hidden"><div class="cis_popup_bottom_inner">';
			bottom_htm += '<div class="cis_popup_bottom_title">' + cis_title + '</div>';
			if(cis_desc != '')
				bottom_htm += '<div class="cis_popup_bottom_desc">' + cis_desc + '</div>';
			bottom_htm += '<div class="cis_popup_bottom_line"></div></div></div>';

			//get bottom height
			var bottom_htm_dummy = bottom_htm;
			$cis_popup.append(bottom_htm_dummy);
			$(".cis_popup_bottom_inner_wrapper").width(img_width_final);
			var bottom_height = $(".cis_popup_bottom_inner_wrapper").height();

			// check if total width in allowed range
			if(img_height_final + 1*bottom_height > max_allowed_h) {
				img_height_final = max_allowed_h - bottom_height;
				img_height_final = img_height_final > img_height ? img_height : img_height_final;
				img_width_final = img_height_final / img_ratio;

				//check min size
				var cis_min_width = cis_popup_item_min_width;
				if(img_width_final < cis_min_width) {
					img_width_final = cis_min_width;
					img_height_final = img_width_final * img_ratio;
				}
			}

			//calculate buttom height again
			$cis_popup.append(bottom_htm_dummy);
			$(".cis_popup_bottom_inner_wrapper").width(img_width_final);
			bottom_height = $(".cis_popup_bottom_inner_wrapper").height();

			$(".cis_popup_bottom_inner_wrapper").remove();
			$cis_popup.find('.cis_popup_bottom_holder').attr("h",bottom_height).hide().html(bottom_htm);
			$(".cis_popup_bottom_inner_wrapper").removeClass('cis_hidden');

			//get final offsets
			var popup_top_final = vScrollPosition + 0.3*(windowHeight - img_height_final - bottom_height);
			//if we have negative top offset, turn off scrolling behaviour, set fixed top position
			var cis_scroll_disable = false;
			if(popup_top_final < vScrollPosition) {
				popup_top_final = vScrollPosition + 12*1;
				if(!$cis_popup.hasClass('cis_popup_disable_scrolling_behaviour'))
					$cis_popup.addClass('cis_popup_disable_scrolling_behaviour')
				cis_scroll_disable = true;
			}
			else {
				$cis_popup.removeClass('cis_popup_disable_scrolling_behaviour')
			}

			var popup_left_final = hScrollPosition + 0.5 * (windowWidth - img_width_final);
			//if we have negative top offset, turn off scrolling behaviour, set fixed top position
			if(popup_left_final < hScrollPosition) {
				popup_left_final = hScrollPosition + 12*1;
				if(!$cis_popup.hasClass('cis_popup_disable_scrolling_behaviour'))
					$cis_popup.addClass('cis_popup_disable_scrolling_behaviour')
			}
			else if(!cis_scroll_disable){
				$cis_popup.removeClass('cis_popup_disable_scrolling_behaviour')
			}	

			//place image
			$popup_img_final.css({
				'width': img_width_final,
				'height': img_height_final,
				'display': 'none'
			});

			$cis_popup.find('.cis_popup_item_holder').append($popup_img_final);

			//animate popup
			$cis_popup.stop().animate({
				'width': img_width_final,
				'height': img_height_final,
				'top' : popup_top_final,
				'left' : popup_left_final
			},400, 'easeOutBack', function() {
				//show image
				$popup_img_final.stop().fadeIn(400,function() {

					$('.cis_main_overlay').stop().fadeTo(400,0.96);
					$cis_popup.addClass('cis_popup_wrapper_loader_shaddow');

					//$cis_popup.find('.cis_popup_bottom_holder').css('visibility','visible');
					//prepare bottom
					$cis_popup.stop().animate({
						'height': '+=' + bottom_height
					},400,'swing',function() {

						//set popup ready!
						$cis_popup.removeClass('cis_popup_in_progress');

						//prepare arrows
						cis_prepare_popup_arrows();

						//prepare  order info
						cis_popup_prepare_item_order_info();

						//show autoplay bar wrapper
						cis_popup_show_autoplay_bar();

						// prepare top-right icons
						cis_popup_prepare_topright_icons();

						// prepare popup autoplay
						cis_popup_prepare_autoplay();
					});

					//animate bottom inner
					$cis_popup.find('.cis_popup_bottom_holder').stop().fadeIn(400);

				});

			});

		});
	};

	function cis_resize_image() {
		var $cis_popup = $('.cis_popup_wrapper');

		//check if popup is ready
		if($cis_popup.hasClass('cis_popup_in_progress'))
			return;

		//return, if popup is not visible
		if(!$cis_popup.hasClass('cis_vissible'))
			return;

		// get item id
		var item_id = $cis_popup.attr("item_id");
		$loader = $("#cis_item_" + item_id).find('.cis_row_item_inner');

		//get data
		var slider_data =$loader.parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_max_size = parseInt(slider_data_array[0]);
		var cis_popup_item_min_width = parseInt(slider_data_array[1]);

		//get image
		var $popup_img = $('.cis_popup_item');
		$popup_img.css({'width':'100%','height':'auto'})

		// get sizes
		var img_width = parseInt($popup_img.attr("w"));
		var img_height = parseInt($popup_img.attr("h"));
		var img_ratio = img_height / img_width;
		var img_width_final = img_width;
		var img_height_final = img_height;

		var windowWidth = parseInt($(window).width()); //retrieve current window width
		var windowHeight = parseInt($(window).height()); //retrieve current window height
		var vScrollPosition = parseInt($(document).scrollTop()); //retrieve the document scroll ToP position
		var hScrollPosition = parseInt($(document).scrollLeft()); //retrieve the document scroll Left position

		// set limits
		var cis_max_percent_w = cis_popup_max_size;
		var cis_max_percent_h = cis_popup_max_size;

		// calculate max sizes
		var max_allowed_w = parseInt(windowWidth * cis_max_percent_w / 100);
		var max_allowed_h = parseInt(windowHeight * cis_max_percent_h / 100);

		//if image height greater than max allowed size, make corrections!
		if(img_height > max_allowed_h) {
			var img_height_check = max_allowed_h;
			var img_width_check = max_allowed_h / img_ratio;

			//check if calculated with in allowed range
			if(img_width_check > max_allowed_w) {
				img_width_check = max_allowed_w;
				img_height_check = max_allowed_w * img_ratio;
			}

			//set values
			img_width_final = img_width_check;
			img_height_final = img_height_check;

		}	
		else if(img_width > max_allowed_w) {
			var img_width_check = max_allowed_w;
			var img_height_check = max_allowed_w * img_ratio;

			//check if calculated with in allowed range
			if(img_height_check > max_allowed_h) {
				img_height_check = max_allowed_h;
				img_width_check = max_allowed_h / img_ratio;
			}

			//set values
			img_width_final = img_width_check;
			img_height_final = img_height_check;
		}

		var bottom_height = parseInt($(".cis_popup_bottom_holder").attr("h"));

		// check if total width in allowed range
		if(img_height_final + 1*bottom_height > max_allowed_h) {
			img_height_final = max_allowed_h - bottom_height;
			img_height_final = img_height_final > img_height ? img_height : img_height_final;
			img_width_final = img_height_final / img_ratio;

			//check min size
			var cis_min_width = cis_popup_item_min_width;
			if(img_width_final < cis_min_width) {
				img_width_final = cis_min_width;
				img_height_final = img_width_final * img_ratio;
			}
		}

		// calculate buttom height again
		var  bottom_htm_dummy = $('.cis_popup_bottom_inner_wrapper').html();
		bottom_htm_dummy = '<div class="cis_popup_bottom_inner_wrapper_dummy cis_hidden">' + bottom_htm_dummy + '</div>';

		$cis_popup.append(bottom_htm_dummy);
		$(".cis_popup_bottom_inner_wrapper_dummy").width(img_width_final);
		bottom_height = $(".cis_popup_bottom_inner_wrapper_dummy").height();

		$(".cis_popup_bottom_inner_wrapper_dummy").remove();
		$cis_popup.find('.cis_popup_bottom_holder').attr("h",bottom_height);

		//get final offsets
		var popup_top_final = vScrollPosition + 0.3*(windowHeight - img_height_final - bottom_height);
		//if we have negative top offset, turn off scrolling behaviour, set fixed top position
		var cis_scroll_disable = false;
		if(popup_top_final < vScrollPosition) {
			popup_top_final = vScrollPosition + 12*1;
			if(!$cis_popup.hasClass('cis_popup_disable_scrolling_behaviour'))
				$cis_popup.addClass('cis_popup_disable_scrolling_behaviour')
			cis_scroll_disable = true;
		}
		else {
			$cis_popup.removeClass('cis_popup_disable_scrolling_behaviour')
		}

		var popup_left_final = hScrollPosition + 0.5 * (windowWidth - img_width_final);
		//if we have negative top offset, turn off scrolling behaviour, set fixed top position
		if(popup_left_final < hScrollPosition) {
			popup_left_final = hScrollPosition + 12*1;
			if(!$cis_popup.hasClass('cis_popup_disable_scrolling_behaviour'))
				$cis_popup.addClass('cis_popup_disable_scrolling_behaviour')
		}
		else if(!cis_scroll_disable){
			$cis_popup.removeClass('cis_popup_disable_scrolling_behaviour')
		};


		//animate popup
		var total_h = img_height_final + 1*bottom_height;
		$cis_popup.stop().animate({
			'width': img_width_final,
			'height': total_h,
			'top' : popup_top_final,
			'left' : popup_left_final
		},400,'easeOutBack', function() {
			//resize arrows
			cis_resize_popup_arrows();
		});

	};

	function cis_move_image() {
		var $cis_popup = $('.cis_popup_wrapper');

		//check if popup is ready
		if($cis_popup.hasClass('cis_popup_in_progress'))
			return;

		//return, if popup is not visible
		if(!$cis_popup.hasClass('cis_vissible'))
			return;

		// return, if scrolling not enabled
		if($cis_popup.hasClass('cis_popup_disable_scrolling_behaviour'))
			return;

		var item_id = $cis_popup.attr("item_id");

		var popup_width = $cis_popup.width();
		var popup_height = $cis_popup.height();

		var windowWidth = $(window).width(); //retrieve current window width
		var windowHeight = $(window).height(); //retrieve current window height
		var vScrollPosition = $(document).scrollTop(); //retrieve the document scroll ToP position
		var hScrollPosition = $(document).scrollLeft(); //retrieve the document scroll Left position

		//get final offsets
		var popup_top_final = vScrollPosition + 0.3*(windowHeight - popup_height);
		var popup_left_final = (windowWidth - popup_width) / 2;

		//animate popup
		$cis_popup.stop(false,false).animate({
			'top' : popup_top_final,
			'left' : popup_left_final
		},400, 'swing');

	};

	$(window).scroll(function() {
		cis_move_image();
	});	

	$(window).resize(function() {
		cis_resize_creative_overlay();
	    clearTimeout($.data(this, 'cisResizeTimer'));
	    $.data(this, 'cisResizeTimer', setTimeout(function() {
	        cis_resize_image();
	    }, 200));
	});

	//keyup
	$(document).keyup(function (e) {
		var cis_keycode = e.keyCode;
	    if (cis_keycode == 37 || cis_keycode == 39 || cis_keycode == 27) {
	    	var $cis_popup = $('.cis_popup_wrapper');
	    	if($cis_popup.hasClass('cis_vissible')) {
	    		if(cis_keycode == 27) // reset popup when typr ESC button
	    			cis_reset_creative_popup();
	    		else if(cis_keycode == 39) // show next when type right button
	    			cis_popup_show_next_item();
	    		else if(cis_keycode == 37) // show prev when type left button
	    			cis_popup_show_prev_item();
	    	} 
	    }
	});

	$(".cis_main_overlay").on('click', function() {
		cis_reset_creative_popup();
	});

	//popup arrow navigation
	function cis_prepare_popup_arrows() {
		var $cis_popup = $('.cis_popup_wrapper');
		var item_id = $cis_popup.attr("item_id");

		// get slider arrows
		var $left_arrow = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_button_left');
		var $right_arrow = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_button_right');

		var $cis_popup_left_arrow = $('.cis_popup_left_arrow');
		var $cis_popup_right_arrow = $('.cis_popup_right_arrow');

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_arrow_min_height = parseInt(slider_data_array[5]);
		var cis_popup_arrow_max_height = parseInt(slider_data_array[6]);
		var cis_popup_showarrows = parseInt(slider_data_array[7]);
		var cis_popup_arrow_passive_opacity = parseInt(slider_data_array[3]) / 100;
		var cis_popup_arrow_left_offset = parseInt(slider_data_array[4]);

		//set arrow attributes
		var cis_corner_offset = cis_popup_arrow_left_offset;
		$cis_popup_left_arrow.attr({"src":$left_arrow.attr("src"),'op':cis_popup_arrow_passive_opacity,'corner_offset':cis_corner_offset});
		$cis_popup_right_arrow.attr({"src":$right_arrow.attr("src"),'op':cis_popup_arrow_passive_opacity,'corner_offset':cis_corner_offset});

		//calculate arrow height
		var cis_slider_h = parseInt($("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_row_item_inner').height());
		var cis_slider_arrow_h = parseInt($left_arrow.css("height"));
		var arrow_ratio = cis_slider_arrow_h / cis_slider_h;

		var arrow_max_h = parseInt($cis_popup_left_arrow.height());
		var arrow_container_height = parseInt($('.cis_popup_item_holder').height());

		arrow_max_h = cis_popup_arrow_max_height;
		var arrow_min_h = cis_popup_arrow_min_height;
		var arrow_h_claculated = arrow_container_height * 0.085;
		var arrow_h_final = arrow_h_claculated > arrow_max_h ? arrow_max_h : (arrow_h_claculated < arrow_min_h ? arrow_min_h : arrow_h_claculated);

		//get arrow position
		var arrow_top = 0.5 * (arrow_container_height - arrow_h_final);

		var arrow_op_pasive = cis_popup_arrow_passive_opacity;

		// set arrows css
		$cis_popup_left_arrow.css({
			'left': '-64px',
			'top': arrow_top,
			'height': arrow_h_final,
			'opacity': arrow_op_pasive
		});
		$cis_popup_right_arrow.css({
			'left': 'auto',
			'right': '-64px',
			'top': arrow_top,
			'height': arrow_h_final,
			'opacity': arrow_op_pasive
		});


		var cis_popup_show_arrows_ident = cis_popup_showarrows;

		//delete previously declired hover event
		$cis_popup.off('mouseenter.cis_popup_hover_handler');
		$cis_popup.off('mouseleave.cis_popup_hover_handler');

		// arrow showing type
		if(cis_popup_show_arrows_ident == 0) {//never show arrows
			// Do Nothing
		}
		else if(cis_popup_show_arrows_ident == 1) {//show on hover
			// show arrows
			cis_popup_show_arrows();

			// set hover functions
			$cis_popup.on('mouseenter.cis_popup_hover_handler', function() {
				cis_popup_show_arrows();
			});
			$cis_popup.on('mouseleave.cis_popup_hover_handler', function() {
				cis_popup_hide_arrows();
			});
			
		}
		else {
			cis_popup_show_arrows();
		}

	};

	// resize popup arrows
	function cis_resize_popup_arrows() {
		var $cis_popup = $('.cis_popup_wrapper');
		var item_id = $cis_popup.attr("item_id");

		// get slider arrows
		var $left_arrow = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_button_left');
		var $right_arrow = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_button_right');

		var $cis_popup_left_arrow = $('.cis_popup_left_arrow');
		var $cis_popup_right_arrow = $('.cis_popup_right_arrow');

		//calculate arrow height
		var cis_slider_h = parseInt($("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_row_item_inner').height());
		var cis_slider_arrow_h = parseInt($left_arrow.css("height"));
		var arrow_ratio = cis_slider_arrow_h / cis_slider_h;

		var arrow_max_h = parseInt($cis_popup_left_arrow.height());
		var arrow_container_height = parseInt($('.cis_popup_item_holder').height());

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_arrow_min_height = parseInt(slider_data_array[5]);
		var cis_popup_arrow_max_height = parseInt(slider_data_array[6]);
		var cis_popup_arrow_passive_opacity = parseInt(slider_data_array[3]);

		arrow_max_h = cis_popup_arrow_max_height;
		var arrow_min_h = cis_popup_arrow_min_height;
		var arrow_h_claculated = arrow_container_height * 0.085;
		var arrow_h_final = arrow_h_claculated > arrow_max_h ? arrow_max_h : (arrow_h_claculated < arrow_min_h ? arrow_min_h : arrow_h_claculated);

		//get arrow position
		var arrow_top = 0.5 * (arrow_container_height - arrow_h_final);

		var arrow_op_pasive = cis_popup_arrow_passive_opacity;

		// animate arrows
		$cis_popup_left_arrow.stop().animate({
			'top': arrow_top,
			'height': arrow_h_final
		},400,'easeOutBack');
		$cis_popup_right_arrow.stop().animate({
			'top': arrow_top,
			'height': arrow_h_final
		},400,'easeOutBack');

	};

	function cis_popup_prepare_item_order_info() {
		var $cis_popup = $('.cis_popup_wrapper');

		var item_id = $cis_popup.attr("item_id");

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_image_order_opacity = parseInt(slider_data_array[8]) / 100;
		var cis_popup_show_orderdata = parseInt(slider_data_array[10]);

		var op_pasive = cis_popup_image_order_opacity;
		$('.cis_popup_item_order_info').attr("op",op_pasive);

		var cis_popup_show_item_order_ident = cis_popup_show_orderdata;

		//delete previously declired hover function
		$cis_popup.off('mouseenter.cis_popup_show_order_hover_handler');
		$cis_popup.off('mouseleave.cis_popup_show_order_hover_handler');

		// order info showing type
		if(cis_popup_show_item_order_ident == 0) {//never show
			// Do Nothing
		}
		else if(cis_popup_show_item_order_ident == 1) {//show on hover
			// show arrows
			cis_popup_show_item_order();

			// set hover functions
			$cis_popup.on('mouseenter.cis_popup_show_order_hover_handler', function() {
				cis_popup_show_item_order();
			});
			$cis_popup.on('mouseleave.cis_popup_show_order_hover_handler', function() {
				cis_popup_hide_item_order();
			});
			
		}
		else { //always show
			cis_popup_show_item_order();
		}

	};	

	function cis_popup_prepare_topright_icons() {
		var $cis_popup = $('.cis_popup_wrapper');

		var item_id = $cis_popup.attr("item_id");

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_icons_opacity = parseInt(slider_data_array[11]) / 100;
		var cis_popup_show_icons = parseInt(slider_data_array[12]);

		var op_pasive = cis_popup_icons_opacity;
		$('.cis_popup_autoplay_play').attr("op",op_pasive);
		$('.cis_popup_autoplay_pause').attr("op",op_pasive);
		$('.cis_popup_close').attr("op",op_pasive);

		var cis_popup_show_topright_icons_ident = cis_popup_show_icons;

		//delete previously declired hover function
		$cis_popup.off('mouseenter.cis_popup_show_topright_icons_hover_handler');
		$cis_popup.off('mouseleave.cis_popup_show_topright_icons_hover_handler');

		// order info showing type
		if(cis_popup_show_topright_icons_ident == 0) {//never show
			// Do Nothing
		}
		else if(cis_popup_show_topright_icons_ident == 1) {//show on hover
			// show arrows
			cis_popup_show_topright_icons();

			// set hover functions
			$cis_popup.on('mouseenter.cis_popup_show_topright_icons_hover_handler', function() {
				cis_popup_show_topright_icons();
			});
			$cis_popup.on('mouseleave.cis_popup_show_topright_icons_hover_handler', function() {
				cis_popup_hide_topright_icons();
			});
			
		}
		else { //always show
			cis_popup_show_topright_icons();
		}

	};

	/*
	// Function to show popup top-right icons
	*/
	var cis_popup_topright_icons_timeout1 = '';
	var cis_popup_topright_icons_timeout2 = '';
	function cis_popup_show_topright_icons() {
		var $cis_popup = $('.cis_popup_wrapper');

		//if animation in progress, do not show arrows
		if($cis_popup.hasClass('cis_popup_in_progress'))
			return;

		//clear timeouts
		clearTimeout(cis_popup_topright_icons_timeout1);
		clearTimeout(cis_popup_topright_icons_timeout2);

		var op_pasive = $('.cis_popup_close').attr("op");

		cis_popup_topright_icons_timeout1 = setTimeout(function() {
			$('.cis_popup_close').removeClass('disable_click').stop(true,false).animate({
				'opacity': op_pasive
				// 'top': '12px'
			},400,'easeOutBack');
			$('.cis_popup_autoplay_play').removeClass('disable_click').stop(true,false).animate({
				'opacity': op_pasive
				// 'top': '12px'
			},400,'easeOutBack');
			$('.cis_popup_autoplay_pause').removeClass('disable_click').stop(true,false).animate({
				'opacity': op_pasive
				// 'top': '12px'
			},400,'easeOutBack');
		},100);
	};
	function cis_popup_hide_topright_icons() {
		var $cis_popup = $('.cis_popup_wrapper');

		//clear timeouts
		clearTimeout(cis_popup_topright_icons_timeout1);
		clearTimeout(cis_popup_topright_icons_timeout2);
		
		$('.cis_popup_close').stop(true,false).fadeTo(400,0,function() {
			// $(this).css('top','-30px');
		});
		$('.cis_popup_autoplay_play').stop(true,false).fadeTo(400,0,function() {
			// $(this).css('top','-30px');
		});
		$('.cis_popup_autoplay_pause').stop(true,false).fadeTo(400,0,function() {
			// $(this).css('top','-30px');
		});

	};

	/*
	// Function to show popup item order info
	*/
	var cis_popup_item_order_timeout1 = '';
	var cis_popup_item_order_timeout2 = '';
	function cis_popup_show_item_order() {
		var $cis_popup = $('.cis_popup_wrapper');
		var item_id = $cis_popup.attr("item_id");

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_image_order_opacity = parseInt(slider_data_array[8]) / 100;
		var cis_popup_image_order_top_offset = parseInt(slider_data_array[9]);

		//if animation in progress, do not show arrows
		if($cis_popup.hasClass('cis_popup_in_progress'))
			return;

		//clear timeouts
		clearTimeout(cis_popup_item_order_timeout1);
		clearTimeout(cis_popup_item_order_timeout2);

		var op_pasive = cis_popup_image_order_opacity;

		cis_popup_item_order_timeout1 = setTimeout(function() {
			$('.cis_popup_item_order_info').stop(true,false).animate({
				'opacity': op_pasive,
				'top': cis_popup_image_order_top_offset
			},400,'easeOutBack');
		},100);
	};
	function cis_popup_hide_item_order() {
		var $cis_popup = $('.cis_popup_wrapper');

		//clear timeouts
		clearTimeout(cis_popup_item_order_timeout1);
		clearTimeout(cis_popup_item_order_timeout2);
		
		$('.cis_popup_item_order_info').stop().fadeTo(400,0,function() {
			$(this).css('top','-30px');
		});
		
	};

	/*
	// Function to show/hide popup arrows
	*/
	var cis_popup_arrows_timeout1 = '';
	var cis_popup_arrows_timeout2 = '';
	function cis_popup_show_arrows() {
		var $cis_popup = $('.cis_popup_wrapper');
		var item_id = $cis_popup.attr("item_id");

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_arrow_passive_opacity = parseInt(slider_data_array[3]) / 100;
		var cis_popup_arrow_left_offset = parseInt(slider_data_array[4]);

		//if animation in progress, do not show arrows
		if($cis_popup.hasClass('cis_popup_in_progress'))
			return;

		//clear timeouts
		clearTimeout(cis_popup_arrows_timeout1);
		clearTimeout(cis_popup_arrows_timeout2);
		
		var $left_arrow = $cis_popup.find('.cis_popup_left_arrow');
		var $right_arrow = $cis_popup.find('.cis_popup_right_arrow');
		
		var corner_offset = cis_popup_arrow_left_offset;
		var op_passive = cis_popup_arrow_passive_opacity;
		
		var animation_time = 400;
		var start_offset = -64;
		var effect = 'easeOutBack';
		
		cis_popup_arrows_timeout1 = setTimeout(function() {
			$left_arrow.stop(true,false).animate({
				'left': corner_offset,
				'opacity': op_passive
			},animation_time,effect);
			
			$right_arrow.stop(true,false).animate({
				'right': corner_offset,
				'opacity': op_passive
			},animation_time,effect);
		},100);
		
	};
	function cis_popup_hide_arrows() {
		var $cis_popup = $('.cis_popup_wrapper');

		//clear timeouts
		clearTimeout(cis_popup_arrows_timeout1);
		clearTimeout(cis_popup_arrows_timeout2);
		
		var $left_arrow = $cis_popup.find('.cis_popup_left_arrow');
		var $right_arrow = $cis_popup.find('.cis_popup_right_arrow');

		$left_arrow.fadeTo(200,0.2);
		$right_arrow.fadeTo(200,0.2);
		
		var animation_time = 400;
		var start_offset = -64;
		var effect = 'easeInBack';
		
		cis_popup_arrows_timeout2 = setTimeout(function() {
			$left_arrow.stop(true,false).animate({
				'left': start_offset
			},animation_time,effect);
			
			$right_arrow.stop(true,false).animate({
				'right': start_offset
			},animation_time,effect);
		},200);
	};

	// popup top right  functions
	$('.cis_popup_close').on('click', function() {
		cis_reset_creative_popup();
	});

	$('.cis_popup_close').on('mouseenter', function() {
		if($(this).hasClass('disable_click'))
			return;

		$(this).stop(true,false).animate({
			'opacity' : 1
		},300);
	});
	$('.cis_popup_close').on('mouseleave', function() {
		if($(this).hasClass('disable_click'))
			return;

		var opacity_inactive = $(this).attr("op");
		$(this).stop(true,false).animate({
			'opacity' : opacity_inactive
		},300);
	});	

	$('.cis_popup_autoplay_play').on('mouseenter', function() {
		if($(this).hasClass('disable_click'))
			return;

		$(this).stop(true,false).animate({
			'opacity' : 1
		},300);		

	});
	$('.cis_popup_autoplay_play').on('mouseleave', function() {
		if($(this).hasClass('disable_click'))
			return;

		var opacity_inactive = $(this).attr("op");
		$(this).stop(true,false).animate({
			'opacity' : opacity_inactive
		},300);	

	});	
	$('.cis_popup_autoplay_pause').on('mouseenter', function() {
		if($(this).hasClass('disable_click'))
			return;

		$(this).stop(true,false).animate({
			'opacity' : 1
		},300);		
	
	});
	$('.cis_popup_autoplay_pause').on('mouseleave', function() {
		if($(this).hasClass('disable_click'))
			return;

		var opacity_inactive = $(this).attr("op");
		$(this).stop(true,false).animate({
			'opacity' : opacity_inactive
		},300);		

	});

	// popup item order info hover functions
	$('.cis_popup_item_order_info').on('mouseenter', function() {
		$(this).stop(true,false).animate({
			'opacity' : 1
		},300);
	});
	$('.cis_popup_item_order_info').on('mouseleave', function() {
		var opacity_inactive = $(this).attr("op");
		$(this).stop(true,false).animate({
			'opacity' : opacity_inactive
		},300);
	});

	// popup arrows hover functions
	$('.cis_popup_left_arrow').on('mouseenter', function() {
		$(this).animate({
			'opacity' : 1
		},300);
	});
	$('.cis_popup_left_arrow').on('mouseleave', function() {
		var opacity_inactive = $(this).attr("op");
		$(this).animate({
			'opacity' : opacity_inactive
		},300);
	});	
	$('.cis_popup_right_arrow').on('mouseenter', function() {
		$(this).animate({
			'opacity' : 1
		},300);
	});
	$('.cis_popup_right_arrow').on('mouseleave', function() {
		var opacity_inactive = $(this).attr("op");
		$(this).animate({
			'opacity' : opacity_inactive
		},300);
	});

	// popup autoplay functions //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	var cis_popup_autoplay_start_timeout = '';
	function cis_popup_prepare_autoplay() {
		var $cis_popup = $('.cis_popup_wrapper');
		var item_id = $cis_popup.attr("item_id");

		// show play icon
		$('.cis_popup_autoplay_pause').addClass('cis_popup_topright_icon_hidden');
		$('.cis_popup_autoplay_play').removeClass('cis_popup_topright_icon_hidden');

		//fixed bug
		$('.cis_popup_autoplay_bar').stop(true,false).css('width','0%');

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_autoplay_default = parseInt(slider_data_array[13]);

		var cis_popup_autoplay_enabled = cis_popup_autoplay_default;
		var cis_popup_autoplay_index = parseInt($cis_popup.attr("cis_popup_autoplay"));

		if((cis_popup_autoplay_index == 2 && cis_popup_autoplay_enabled == 1) || cis_popup_autoplay_index == 1 ) {
			cis_popup_autoplay_start_timeout = setTimeout(function() {
				cis_popup_make_autoplay_start();
			},1200);
		}

		// autoplay hover functionality - will be activated, if will be requested!
		// var cis_popup_autoplay_ident = 1;//if 1, turn on autoplay hover functionlaity, if 2 - no!

		//delete previously declired hover function
		// $cis_popup.off('mouseenter.cis_popup_autoplay_hover_handler');
		// $cis_popup.off('mouseleave.cis_popup_autoplay_hover_handler');

		// if(cis_popup_autoplay_ident == 1) {//show on hover
		// 	// show arrows
		// 	cis_popup_make_autoplay_start();

		// 	// set hover functions
		// 	$cis_popup.on('mouseenter.cis_popup_autoplay_hover_handler', function() {
		// 		cis_popup_make_autoplay_stop();
		// 	});
		// 	$cis_popup.on('mouseleave.cis_popup_autoplay_hover_handler', function() {
		// 		cis_popup_make_autoplay_start();
		// 	});
			
		// }
		// else { //always show
		// 	cis_popup_make_autoplay_start();
		// }
	};

	$('.cis_popup_autoplay_play').on('click', function() {
		if($(this).hasClass('disable_click'))
			return;
		cis_popup_make_autoplay_start();
	});	
	$('.cis_popup_autoplay_pause').on('click', function() {
		if($(this).hasClass('disable_click'))
			return;	
		cis_popup_make_autoplay_stop();
	});

	function cis_popup_make_autoplay_start() {
		var $cis_popup = $('.cis_popup_wrapper');

		//clear auto-play timeout
		clearTimeout(cis_popup_autoplay_start_timeout);
		// toggle icons
		$('.cis_popup_autoplay_play').addClass('cis_popup_topright_icon_hidden');
		$('.cis_popup_autoplay_pause').removeClass('cis_popup_topright_icon_hidden');

		// set autoplay turned on
		$cis_popup.attr("cis_popup_autoplay","1");

		//strat autoplay
		cis_popup_autoplay_start();
	};
	function cis_popup_make_autoplay_stop() {
		var $cis_popup_autoplay_bar = $('.cis_popup_autoplay_bar');

		var bar_curr_width = parseFloat($cis_popup_autoplay_bar.width());
		var bar_total_width = parseFloat($cis_popup_autoplay_bar.parent('div').width());
		var curr_perc = 100 * bar_curr_width / bar_total_width;

		if(curr_perc > 98) {
			return;
		}
		// toggle icons
		$('.cis_popup_autoplay_pause').addClass('cis_popup_topright_icon_hidden');
		$('.cis_popup_autoplay_play').removeClass('cis_popup_topright_icon_hidden');

		//strat autoplay
		cis_popup_autoplay_stop();
	};

	function cis_popup_autoplay_start() {
		var $cis_popup = $('.cis_popup_wrapper');
		var item_id = $cis_popup.attr("item_id");

		var $cis_popup_autoplay_bar = $('.cis_popup_autoplay_bar');

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_autoplay_time = parseInt(slider_data_array[15]);

		var animation_time = cis_popup_autoplay_time;

		var bar_curr_width = parseFloat($cis_popup_autoplay_bar.width());
		var bar_total_width = parseFloat($cis_popup_autoplay_bar.parent('div').width());
		var curr_perc = 100 * bar_curr_width / bar_total_width;

		var remained_perc = 100 - curr_perc;
		var animation_time_remained = animation_time * remained_perc / 100;

		$cis_popup_autoplay_bar.stop(true,false).animate({
			'width': '100%'
		},animation_time_remained,'linear', function() {

			$('.cis_popup_close').addClass('disable_click');
			$('.cis_popup_autoplay_pause').addClass('disable_click');
			$('.cis_popup_autoplay_play').addClass('disable_click');

			cis_popup_show_next_item();
		});

	};

	function cis_popup_autoplay_stop() {
		var $cis_popup = $('.cis_popup_wrapper');

		//clear auto-play timeout
		clearTimeout(cis_popup_autoplay_start_timeout);

		// set autoplay turned off
		$cis_popup.attr("cis_popup_autoplay","0");

		var $cis_popup_autoplay_bar = $('.cis_popup_autoplay_bar');
		var bar_curr_width = parseInt($cis_popup_autoplay_bar.width());
		var animate_back_time = bar_curr_width * 0.9;

		$cis_popup_autoplay_bar.stop(true,false).animate({
			'width':'0%'
		},animate_back_time,'linear');

	};

	// popup arrow functions ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.cis_popup_right_arrow').on('click', function() {
		cis_popup_show_next_item();
	});
	$('.cis_popup_left_arrow').on('click', function() {
		cis_popup_show_prev_item();
	});

	function cis_popup_show_next_item() {
		var $cis_popup = $('.cis_popup_wrapper');

		//check if popup is ready
		if($cis_popup.hasClass('cis_popup_in_progress'))
			return;

		var item_id = parseInt($cis_popup.attr("item_id"));
		var $original_item = $("#cis_item_" + item_id);

		//get data
		var slider_data = $("#cis_item_" + item_id).parents('.cis_main_wrapper').find('.cis_popup_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_popup_closeonend = parseInt(slider_data_array[14]);

		var slider_id = parseInt($original_item.parents('.cis_main_wrapper').attr("cis_slider_id"));
		var item_order = parseInt($original_item.attr("cis_popup_order"));
		var cis_popup_items_length = parseInt($original_item.parents('.cis_main_wrapper').attr("cis_popup_items_count"));

		// if last item, return
		if(item_order == cis_popup_items_length) {
			var cis_popup_last_item_behaviour = cis_popup_closeonend;

			if(cis_popup_last_item_behaviour == 1) {
				//close creative popup, if last item
				cis_reset_creative_popup();
			}
			else {
				// show play icon
				$('.cis_popup_autoplay_pause').addClass('cis_popup_topright_icon_hidden');
				$('.cis_popup_autoplay_play').removeClass('cis_popup_topright_icon_hidden');

				//reset bar
				$('.cis_popup_autoplay_bar').stop(true,false).animate({
					'width': '0%'
				},400,'swing');
			}
			return;
		}
		else {
			var active_item_id = parseInt($original_item.nextAll('.cis_row_item.cis_has_popup').first().attr("item_id"));

			//hide arrows 
			cis_popup_hide_arrows();
			//hide image order data
			cis_popup_hide_item_order();
			//hide popup autoplay bar
			cis_popup_hide_autoplay_bar();
			//hide tpright arrows
			cis_popup_hide_topright_icons();

			// set animation progress class
			$cis_popup.addClass('cis_popup_in_progress');

			// the hiding animation accurs in 600ms, so we will hide existing item in that time 
			var bottom_h = parseInt($cis_popup.find('.cis_popup_bottom_holder').attr("h"));

			//animate main popup
			$cis_popup.stop().animate({
				'height':'-=' + bottom_h
			},600,'swing', function() {
				$('.cis_popup_bottom_inner_wrapper').remove()
			});

			//animate bottom holder
			$('.cis_popup_bottom_holder').animate({
				'height': 0
			},600,'swing');

			$('.cis_popup_item').stop().fadeTo(600,0, function() {
				$(this).remove();

				//show new item
				cis_show_image(active_item_id);
			});
		};
	};

	function cis_popup_show_prev_item() {
		var $cis_popup = $('.cis_popup_wrapper');

		//check if popup is ready
		if($cis_popup.hasClass('cis_popup_in_progress'))
			return;

		var item_id = parseInt($cis_popup.attr("item_id"));
		var $original_item = $("#cis_item_" + item_id);

		var slider_id = parseInt($original_item.parents('.cis_main_wrapper').attr("cis_slider_id"));
		var item_order = parseInt($original_item.attr("cis_popup_order"));
		var cis_popup_items_length = parseInt($original_item.parents('.cis_main_wrapper').attr("cis_popup_items_count"));

		// if first item, return
		if(item_order == 1) {
			return;
		}
		else {
			var active_item_id = parseInt($original_item.prevAll('.cis_row_item.cis_has_popup').first().attr("item_id"));

			//hide arrows 
			cis_popup_hide_arrows();
			//hide image order data
			cis_popup_hide_item_order();
			//hide popup autoplay bar
			cis_popup_hide_autoplay_bar();
			//hide tpright arrows
			cis_popup_hide_topright_icons();

			// set animation progress class
			$cis_popup.addClass('cis_popup_in_progress');

			// the hiding animation accurs in 600ms, so we will hide existing item in that time 
			var bottom_h = parseInt($cis_popup.find('.cis_popup_bottom_holder').attr("h"));

			//animate main popup
			$cis_popup.stop().animate({
				'height':'-=' + bottom_h
			},600,'swing', function() {
				$('.cis_popup_bottom_inner_wrapper').remove()
			});

			//animate bottom holder
			$('.cis_popup_bottom_holder').animate({
				'height': 0
			},600,'swing');

			$('.cis_popup_item').stop().fadeTo(600,0, function() {
				$(this).remove();

				//show new item
				cis_show_image(active_item_id);
			});
		};
	};

	//Popup autoplay bar ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	function cis_popup_show_autoplay_bar() {
		setTimeout(function() {
			$('.cis_popup_autoplay_bar_holder').stop().animate({
				'opacity': '0.8'
			},400,'swing');
		},100);
	};

	function cis_popup_hide_autoplay_bar() {
		$('.cis_popup_autoplay_bar_holder').stop(true,false).animate({
			'opacity': '0'
		},400,'swing');
		$('.cis_popup_autoplay_bar').stop(true,false).animate({
			'width': '0%'
		},400,'swing');
	};

	//slider correction////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var cis_event_type = cis_is_touch_devise ? 'vclick' : 'mouseenter';
	$('.cis_images_holder').on(cis_event_type, '.cis_row_item', function() {
		$this = $(this);
		var cis_item_correction_enabled = $this.parents('.cis_main_wrapper').attr("item_correction_enabled");
		cis_item_correction_enabled = isNaN(cis_item_correction_enabled) ? 0 : cis_item_correction_enabled;

		if(cis_item_correction_enabled == 0)
			return;

		setTimeout(function() {
			cis_make_slider_item_correction($this);
		},10);
	});

	function cis_make_slider_item_correction($elem) {

		//check if user drags it, then retrun
		if($elem.parents('.cis_images_row').hasClass('cis_dragging'))
			return;

		var order = $elem.index();
		var items_count = parseInt($elem.parent('div').attr("items_count"));
			items_count = isNaN(items_count) ? 0 : items_count;
		var block_number = parseInt(order / items_count);
			block_number = isNaN(block_number) ? 0 : block_number;

		var is_inf_item = $elem.hasClass('cis_inf_item') ? true : false;

		var $loader = $elem.find('.cis_row_item_loader');
		var $img_holder = $loader.parents('.cis_main_wrapper').find('.cis_images_holder');
		var slider_id = $loader.parents('.cis_main_wrapper').attr("cis_slider_id");
		var item_id = $loader.parents('.cis_row_item').attr("item_id");

		// get total items width
		var items_w = parseInt($img_holder.width());
		var items_half_width = parseInt($img_holder.attr("half_width"));
		var items_width_start = parseInt($img_holder.attr("single_width"));
			items_width_start = isNaN(items_width_start) ? 0 : items_width_start;
		var total_w = parseInt($loader.parents('.cis_main_wrapper').find('.cis_images_row').width());

		//check if slider in scroll progress, then return
		if($img_holder.hasClass('cis_scrolling') || $img_holder.hasClass('cis_autoplay_back_animation') || items_w < total_w)
			return;

		var $cis_popup = $('.cis_popup_wrapper');

		var loader_width = parseInt($loader.css('width'));
		var items_m_r = parseInt($loader.parents('.cis_row_item').css('margin-right'));

		//get slider_offset
		var image_index = parseInt($loader.parents('.cis_row_item').attr("cis_item_order"));
		image_index = image_index + block_number * items_count * 1;
		// console.log('image_index ' + image_index);
		var total_items_width = 0;
		$loader.parents('.cis_main_wrapper').find('.cis_row_item').each(function(i) {
			var w = parseInt($(this).width());

			var m_r = parseInt($(this).css('margin-right'));
			total_items_width = total_items_width + 1*w + 1*m_r;
			if(i == image_index)
				return false;
		});


		// total_items_width = is_inf_item ? total_items_width + 1*items_half_width : total_items_width;
		// total_items_width = total_items_width + block_number * items_width_start;


		var current_left_offset_with_sign = cis_animation_type == 'css3' ? cis_getTransform($img_holder,'translate_x') : parseInt($img_holder.css('margin-left'));
		var current_left_offset = Math.abs(current_left_offset_with_sign);
		var wrapper_width = parseInt($loader.parents('.cis_main_wrapper').width());
		// console.log('total_items_width ' + total_items_width);
		// console.log('wrapper_width ' + wrapper_width);
		// console.log('items_m_r ' + items_m_r);
		// console.log('current_left_offset ' + current_left_offset);

		var offset1 = total_items_width - current_left_offset;
		var direction = 0;
		var item_offset_to_move = 0;
		if(offset1 >= wrapper_width) {
			var item_offset = total_items_width - current_left_offset - wrapper_width - items_m_r;
			var item_offset_to_move = item_offset < 0 ? 0 : item_offset;
		}
		else {
			if(offset1 < loader_width) {
				var item_offset_to_move = loader_width - offset1 + 1*items_m_r;
				direction = 1;
			}
		};

		// BUG FIX
		if(direction == 1 && item_offset_to_move > 0 && image_index == 0 && current_left_offset_with_sign >= 0)
			return;

		var popup_loader_animate_timeout = 400;
		if(item_offset_to_move > 0) {
			var new_l = direction == 1 ? current_left_offset_with_sign + 1*item_offset_to_move : current_left_offset_with_sign - 1*item_offset_to_move;
			// popup_loader_animate_timeout = Math.abs(item_offset_to_move) * 4;

			if(cis_animation_type == 'css3') {
				cis_clear_quee($img_holder);
				cis_make_css3_movement($img_holder, '400ms', 'cubic-bezier(0.250, 0.100, 0.250, 1.000)', new_l);
			} else {
				$img_holder.stop(true,false).animate({
					'margin-left': new_l
				},popup_loader_animate_timeout,'swing');
			}

		};
	};

	// slider autoplay///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	var cis_evenly_move_intervals = new Array();
	var cis_autoplay_start_timeouts = new Array();
	var cis_autoplay_animate_back_timeouts = new Array();
	var cis_check_autoplay_start_ready_index = 0;
	function cis_make_autoplay() {
		$(".cis_main_wrapper").each(function() {
			$wrapper = $(this);
			//get autoplay data
			var slider_data = $wrapper.find('.cis_moving_data').html();
			var slider_data_array = slider_data.split(',');
			var slider_autoplay = parseInt(slider_data_array[3]);
			var slider_autoplay_start_timeout = parseInt(slider_data_array[4]); 
			var slider_autoplay_step_timeout = parseInt(slider_data_array[5]);
			var slider_autoplay_evenly_speed = parseInt(slider_data_array[6]);
			
			if(slider_autoplay == 0) {
				return;
			}
			else {
				cis_check_autoplay_start_ready($wrapper, slider_autoplay);
			}
			
		});
	};
	setTimeout(function() {
		cis_make_autoplay();
	},1200);

	function cis_check_autoplay_start_ready($wrapper, slider_autoplay) {
		cis_check_autoplay_start_ready_index ++;
		if(cis_check_autoplay_start_ready_index > 100)
			return;

		cis_make_autoplay_start($wrapper, slider_autoplay);

	};
	function cis_make_autoplay_start($wrp, slider_autoplay) {
		var total_w = parseFloat($wrp.find('.cis_images_holder').width());

		if(total_w == 999999) {
			setTimeout(function() {
				cis_check_autoplay_start_ready($wrp, slider_autoplay);
			},250);
			return;
		}

		if(slider_autoplay == 1) {
			cis_make_evenly_autoplay($wrp);
		}
		else if(slider_autoplay == 2) {
			cis_make_steps_autoplay($wrp);
		}
	}







	
	function cis_make_steps_autoplay($wrapper) {
		var slider_id = $wrapper.attr("roll");
		
		var slider_data = $wrapper.find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var slider_autoplay_start_timeout = parseInt(slider_data_array[4]);
		var slider_autoplay_step_timeout = parseInt(slider_data_array[5]);
		var slider_autoplay_restart_timeout = parseInt(slider_data_array[7]);
		
		cis_autoplay_animate_back_timeouts[slider_id] = '';
		
		cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
			//set interval
			cis_evenly_move_intervals[slider_id] = setInterval(function() {
				cis_move_slider_by_steps($wrapper);
			},slider_autoplay_step_timeout);
		},slider_autoplay_start_timeout);
		
		$wrapper.hover(function() {
			clearTimeout(cis_autoplay_start_timeouts[slider_id]);
			clearTimeout(cis_autoplay_animate_back_timeouts[slider_id]);
			clearInterval(cis_evenly_move_intervals[slider_id]);
			$wrapper.addClass('cis_mouseentered');
		},function() {
			//check if popup vissible///////////////////////////////////
			var $cis_popup = $('.cis_popup_wrapper');
			var popup_slider_id = $cis_popup.attr("slider_id");
			if($cis_popup.hasClass('cis_vissible') && popup_slider_id == slider_id) {
				return;
			}

			cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
				//set interval
				cis_evenly_move_intervals[slider_id] = setInterval(function() {
					cis_move_slider_by_steps($wrapper);
				},slider_autoplay_step_timeout);
			},slider_autoplay_restart_timeout);
			$wrapper.removeClass('cis_mouseentered');
		});
	};
	
	function cis_move_slider_by_steps($wrapper) {
		var slider_id = $wrapper.attr("roll");
		
		var slider_data = $wrapper.find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var slider_autoplay_start_timeout = parseInt(slider_data_array[4]);
		var slider_autoplay_step_timeout = parseInt(slider_data_array[5]);
		
		$cis_images_holder = $wrapper.find('.cis_images_holder');
		var screen_w = parseFloat($cis_images_holder.parent('div').width());
		var total_w = parseFloat($cis_images_holder.width());

		var cis_move_direction = parseInt($wrapper.attr("cis_move_direction"));
		cis_move_direction = cis_move_direction == 1 ? 1 : 0;

		var curr_left = cis_animation_type == 'css3' ? cis_getTransform($cis_images_holder,'translate_x') : parseFloat($cis_images_holder.css('margin-left'));
		
		if(total_w >= screen_w) {
			if(cis_move_direction == 0)
				var result = cis_move_images_holder_left($cis_images_holder);
			else
				var result = cis_move_images_holder_right($cis_images_holder);
		}
		else {
			if(cis_move_direction == 1) {
				var curr_ = screen_w - total_w;
				if(curr_left == screen_w - total_w)
					var result = cis_move_images_holder_left($cis_images_holder);
				else
					var result = cis_move_images_holder_right($cis_images_holder);
			}
			else {
				if(curr_left == 0)
					var result = cis_move_images_holder_right($cis_images_holder);
				else
					var result = cis_move_images_holder_left($cis_images_holder);
			}
			return;
		}
		
		if(result == 'end') {
			clearTimeout(cis_autoplay_start_timeouts[slider_id]);
			clearInterval(cis_evenly_move_intervals[slider_id]);
			
			var cis_animate_back_to_start_timeout = slider_autoplay_step_timeout;
			var cis_animate_back_to_start_time = Math.abs(parseInt((total_w - screen_w) * 1.5));
			cis_animate_back_to_start_time = cis_animate_back_to_start_time < 600 ? 600 : cis_animate_back_to_start_time;
			cis_animate_back_to_start_time = cis_animate_back_to_start_time > 2000 ? 2000 : cis_animate_back_to_start_time;

			var cis_animate_back_px = (cis_move_direction == 1) ? screen_w - total_w : 0;

			var $sl = $('.cis_wrapper_' + slider_id).find('.cis_images_holder');;
			//set timeout to animate back
			cis_autoplay_animate_back_timeouts[slider_id] = setTimeout(function() {
				$sl.addClass('cis_autoplay_back_animation');
				//animate back to start
				if(cis_animation_type == 'css3') {
					cis_clear_quee($cis_images_holder);
					var cis_effect_eaceOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
					cis_animate_back_to_start_time_css3 = cis_animate_back_to_start_time + 'ms';
					cis_make_css3_movement($sl, cis_animate_back_to_start_time_css3, cis_effect_eaceOutBack, cis_animate_back_px);

					setTimeout(function() {
						var $sl = $('.cis_wrapper_' + slider_id);
						$sl.find('.cis_images_holder').removeClass('cis_autoplay_back_animation');

						//check to see that mouseenter does not happened
						if($wrapper.hasClass('cis_mouseentered'))
							return;
						
						//set new autoplay
						cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
							//set interval
							cis_evenly_move_intervals[slider_id] = setInterval(function() {
								cis_move_slider_by_steps($sl);
							},slider_autoplay_step_timeout);
						},slider_autoplay_start_timeout);
					},cis_animate_back_to_start_time);
				} else {
					$sl.stop(true,false).animate({
						'margin-left': cis_animate_back_px
					},cis_animate_back_to_start_time,'easeOutBack', function() {
						var $sl = $('.cis_wrapper_' + slider_id);
						$sl.find('.cis_images_holder').removeClass('cis_autoplay_back_animation');

						//check to see that mouseenter does not happened
						if($wrapper.hasClass('cis_mouseentered'))
							return;
						
						//set new autoplay
						cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
							//set interval
							cis_evenly_move_intervals[slider_id] = setInterval(function() {
								cis_move_slider_by_steps($sl);
							},slider_autoplay_step_timeout);
						},slider_autoplay_start_timeout);
					});
				}
			},cis_animate_back_to_start_timeout);				
		}
	};
	
	var cis_interval_time = 250;
	var cis_autoplay_inf_scroll_index = 0;
	function cis_make_evenly_autoplay($wrapper) {
		var slider_id = $wrapper.attr("roll");

		var slider_data = $wrapper.find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var slider_autoplay_start_timeout = parseInt(slider_data_array[4]);
		var slider_autoplay_restart_timeout = parseInt(slider_data_array[7]);
		
		cis_autoplay_animate_back_timeouts[slider_id] = '';

		cis_make_evenly_autoplay_restart($wrapper,slider_autoplay_start_timeout);
		
		$wrapper.hover(function() {
			cis_make_evenly_autoplay_stop($wrapper);
			$wrapper.addClass('cis_mouseentered');
		},function() {
			cis_make_evenly_autoplay_restart($wrapper,slider_autoplay_restart_timeout)
			$wrapper.removeClass('cis_mouseentered');
		});
	};

	function cis_make_evenly_autoplay_stop($wrapper) {
		var slider_id = $wrapper.attr("roll");

		clearTimeout(cis_autoplay_start_timeouts[slider_id]);
		clearTimeout(cis_autoplay_animate_back_timeouts[slider_id]);
		clearInterval(cis_evenly_move_intervals[slider_id]);

		$cis_images_holder = $wrapper.find('.cis_images_holder');

	}

	function cis_make_evenly_autoplay_restart($wrapper,slider_autoplay_restart_timeout) {
		cis_make_evenly_autoplay_stop($wrapper);
		var slider_id = $wrapper.attr("roll");

		if(slider_id == undefined || slider_id == 'undefined')
			return;

		if($wrapper.hasClass('cis_mouseentered') && slider_autoplay_restart_timeout == 0) {
			// console.log('reset autoplay');
			return;
		}

		var slider_data = $wrapper.find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var slider_autoplay_start_timeout = parseInt(slider_data_array[4]);

		// check if dragging
		var $images_row = $wrapper.find('.cis_images_row');
		var slider_scrolling = $images_row.hasClass('cis_dragging') ? true : false;
		if(slider_scrolling)
			return;

		//check if popup vissible///////////////////////////////////
		var $cis_popup = $('.cis_popup_wrapper');
		var popup_slider_id = $cis_popup.attr("slider_id");
		if($cis_popup.hasClass('cis_vissible') && popup_slider_id == slider_id) {
			return;
		}


		cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
			//set interval
			cis_evenly_move_intervals[slider_id] = setInterval(function() {
				cis_autoplay_inf_scroll_index = 0;
				cis_move_slider_evenly($wrapper);
			},cis_interval_time);
		},slider_autoplay_restart_timeout);
	}


	
	function cis_move_slider_evenly($wrapper) { // wrapper is .cis_main_wrapper
		var slider_id = $wrapper.attr("roll");

		var cis_inf_scrolling = $wrapper.attr("inf_scroll_enabled");
		cis_inf_scrolling = isNaN(cis_inf_scrolling) ? 0 : cis_inf_scrolling;
		
		//get autoplay data
		var slider_data = $wrapper.find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var slider_autoplay_start_timeout = parseInt(slider_data_array[4]);
		var slider_autoplay_evenly_speed = parseInt(slider_data_array[6]);

		$cis_images_holder = $wrapper.find('.cis_images_holder');
		var screen_w = parseFloat($cis_images_holder.parent('div').width());
		var total_w = parseFloat($cis_images_holder.width());
		var curr_left = cis_animation_type == 'css3' ? cis_getTransform($cis_images_holder,'translate_x') : parseInt($cis_images_holder.css('margin-left'));

		var cis_move_direction = parseInt($wrapper.attr("cis_move_direction"));
		var cis_move_direction_start = cis_move_direction;
		cis_move_direction = cis_move_direction == 1 ? 1 : 0;
		if(total_w >= screen_w) {
			curr_left = cis_move_direction == 1 ? curr_left + 1*slider_autoplay_evenly_speed : curr_left - 1* slider_autoplay_evenly_speed;
		}
		else {
			cis_move_direction = isNaN(cis_move_direction_start) || (cis_move_direction_start != 0 && cis_move_direction_start != 1) ? 1 : cis_move_direction;
			// curr_left = curr_left + 1 * slider_autoplay_evenly_speed;
			// console.log(cis_move_direction);
			curr_left = cis_move_direction == 1 ? curr_left + 1*slider_autoplay_evenly_speed : curr_left - 1* slider_autoplay_evenly_speed;
		}

		var cis_single_autoplay_time = 500;
		var cis_autoplay_ease_time = 600;
		var cis_animate_back_to_start_timeout = 2000;
		var cis_animate_back_to_start_time = Math.abs(parseInt((total_w - screen_w) * 1.5));
		cis_animate_back_to_start_time = cis_animate_back_to_start_time < 600 ? 600 : cis_animate_back_to_start_time;
		cis_animate_back_to_start_time = cis_animate_back_to_start_time > 2000 ? 2000 : cis_animate_back_to_start_time;
		
		var slider_data = $wrapper.find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var delta_offset = parseInt(slider_data_array[0]);
		var move_speed_time = parseInt(slider_data_array[1]); 
		var ease_effect = parseInt(slider_data_array[2]);
		var cis_effect_type = cis_animation_type == 'css3' ? 'cubic-bezier(0.250, 0.100, 0.250, 1.000)' : 'swing';
		var cis_effect_type = cis_animation_type == 'css3' ? 'linear' : 'linear';
		
		ease_effect = slider_autoplay_evenly_speed;
		
		if(total_w >= screen_w) {
			//check if end
			if((Math.abs(curr_left) + 1 * screen_w >= total_w && cis_move_direction == 0) || (curr_left >= 0 && cis_move_direction == 1)) {
				if(cis_inf_scrolling == 1) {
					if(cis_move_direction == 0)
						cis_make_infinite_scrolling_move_right($wrapper.find('.cis_images_holder'));
					else
						cis_make_infinite_scrolling_move_left($wrapper.find('.cis_images_holder'));
				}
				else {

					clearTimeout(cis_autoplay_start_timeouts[slider_id]);
					clearInterval(cis_evenly_move_intervals[slider_id]);
					
					var desired_left = (curr_left >= 0 && cis_move_direction == 1) ? 0 : screen_w - total_w;
					var cis_animate_back_px = (curr_left >= 0 && cis_move_direction == 1) ? screen_w - total_w : 0;
					
					//calculate last point speed
					var curr_left_final = cis_animation_type == 'css3' ? cis_getTransform($cis_images_holder,'translate_x') : parseInt($cis_images_holder.css('margin-left'));
					var move_speed_time_final = Math.abs(curr_left_final - desired_left) * cis_single_autoplay_time  / slider_autoplay_evenly_speed;
					

					if(cis_animation_type == 'css3') {
						cis_clear_quee($cis_images_holder);

						move_speed_time_final_css3 = move_speed_time_final + 'ms';
						cis_make_css3_movement($cis_images_holder, move_speed_time_final_css3, cis_effect_type, desired_left);

						setTimeout(function() {

							//check to see that mouseenter does not happened
							if($wrapper.hasClass('cis_mouseentered'))
								return;
		
							var $sl = $('.cis_wrapper_' + slider_id).find('.cis_images_holder');
							//set timeout to animate back
							cis_autoplay_animate_back_timeouts[slider_id] = setTimeout(function() {
								//animate back to start
								$sl.addClass('cis_autoplay_back_animation');

								var cis_effect_eaceOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
								var cis_animate_back_to_start_time_css3 = cis_animate_back_to_start_time + 'ms';
								cis_make_css3_movement($sl, cis_animate_back_to_start_time_css3, cis_effect_eaceOutBack, cis_animate_back_px);

								setTimeout(function() {
									var $sl = $('.cis_wrapper_' + slider_id);

									$sl.find('.cis_images_holder').removeClass('cis_autoplay_back_animation');
									//check to see that mouseenter does not happened
									if($wrapper.hasClass('cis_mouseentered'))
										return;
									
									//set new autoplay
									cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
										//set interval
										cis_evenly_move_intervals[slider_id] = setInterval(function() {
											cis_move_slider_evenly($sl);
										},cis_interval_time);
									},slider_autoplay_start_timeout);
								},cis_animate_back_to_start_time);
					
							},cis_animate_back_to_start_timeout);

						},move_speed_time_final);
					} else {
						$cis_images_holder.stop(true,false).animate({//swing effect
							'margin-left': desired_left
						},move_speed_time_final,cis_effect_type, function() {
		
							//check to see that mouseenter does not happened
							if($wrapper.hasClass('cis_mouseentered'))
								return;
		
							var $sl = $('.cis_wrapper_' + slider_id).find('.cis_images_holder');
							//set timeout to animate back
							cis_autoplay_animate_back_timeouts[slider_id] = setTimeout(function() {
								//animate back to start
								$sl.addClass('cis_autoplay_back_animation');
								$sl.stop(true,false).animate({
									'margin-left': cis_animate_back_px
								},cis_animate_back_to_start_time,'easeOutBack', function() {
									var $sl = $('.cis_wrapper_' + slider_id);

									$sl.find('.cis_images_holder').removeClass('cis_autoplay_back_animation');
									//check to see that mouseenter does not happened
									if($wrapper.hasClass('cis_mouseentered'))
										return;
									
									//set new autoplay
									cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
										//set interval
										cis_evenly_move_intervals[slider_id] = setInterval(function() {
											cis_move_slider_evenly($sl);
										},cis_interval_time);
									},slider_autoplay_start_timeout);
								});
							},cis_animate_back_to_start_timeout);
						});
					} // end if
				}
			}
			else {
				if(cis_animation_type == 'css3') {
					// cis_clear_quee($cis_images_holder);
					cis_single_autoplay_time_css3 = cis_single_autoplay_time + 'ms';
					cis_make_css3_movement($cis_images_holder, cis_single_autoplay_time_css3, 'linear', curr_left);

				} else {
					$cis_images_holder.stop(true,false).animate({
						'margin-left': curr_left
					},cis_single_autoplay_time,'linear');
				}
			}
		}
		else {
			//check if end
			// if(Math.abs(curr_left) + 1 * total_w >= screen_w) {
			if((Math.abs(curr_left) + 1 * total_w >= screen_w && cis_move_direction == 1) || (curr_left <= 0 && cis_move_direction == 0)) {

				//clear timeouts, intervals
				clearTimeout(cis_autoplay_start_timeouts[slider_id]);
				clearInterval(cis_evenly_move_intervals[slider_id]);

				var desired_left = (curr_left <= 0 && cis_move_direction == 0) ? 0 : screen_w - total_w;
				var cis_animate_back_px = (curr_left <= 0 && cis_move_direction == 0) ? screen_w - total_w : 0;
				
				//calculate last point speed
				var curr_left_final = cis_animation_type == 'css3' ? cis_getTransform($cis_images_holder,'translate_x') : parseInt($cis_images_holder.css('margin-left'));
				var move_speed_time_final = Math.abs(curr_left_final - desired_left) * cis_single_autoplay_time  / slider_autoplay_evenly_speed;
				

				if(cis_animation_type == 'css3') {
					cis_clear_quee($cis_images_holder);
						move_speed_time_final_css3 = move_speed_time_final + 'ms';
						cis_make_css3_movement($cis_images_holder, move_speed_time_final_css3, cis_effect_type, desired_left);

						setTimeout(function() {

							//check to see that mouseenter does not happened
							if($wrapper.hasClass('cis_mouseentered'))
								return;
		
							var $sl = $('.cis_wrapper_' + slider_id).find('.cis_images_holder');
							//set timeout to animate back
							cis_autoplay_animate_back_timeouts[slider_id] = setTimeout(function() {
								//animate back to start
								$sl.addClass('cis_autoplay_back_animation');

								var cis_effect_eaceOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
								var cis_animate_back_to_start_time_css3 = cis_animate_back_to_start_time + 'ms';
								cis_make_css3_movement($sl, cis_animate_back_to_start_time_css3, cis_effect_eaceOutBack, cis_animate_back_px);

								setTimeout(function() {
									var $sl = $('.cis_wrapper_' + slider_id);

									$sl.find('.cis_images_holder').removeClass('cis_autoplay_back_animation');
									//check to see that mouseenter does not happened
									if($wrapper.hasClass('cis_mouseentered'))
										return;
									
									//set new autoplay
									cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
										//set interval
										cis_evenly_move_intervals[slider_id] = setInterval(function() {
											cis_move_slider_evenly($sl);
										},cis_interval_time);
									},slider_autoplay_start_timeout);
								},cis_animate_back_to_start_time);
					
							},cis_animate_back_to_start_timeout);

						},move_speed_time_final);
				} else {

					$cis_images_holder.stop(true,false).animate({//swing effect
						'margin-left': desired_left
					},move_speed_time_final,'linear',function() {


						//easing animation on end
						var $sl = $('.cis_wrapper_' + slider_id).find('.cis_images_holder');
						$sl.stop().animate({
							'margin-left': desired_left
						},cis_autoplay_ease_time,'easeOutBack', function() {
							//check to see that mouseenter does not happened
							if($wrapper.hasClass('cis_mouseentered'))
								return;
							var $sl = $('.cis_wrapper_' + slider_id).find('.cis_images_holder');
							//set timeout to animate back
							cis_autoplay_animate_back_timeouts[slider_id] = setTimeout(function() {
								//animate back to start
								$sl.stop(true,false).animate({
									'margin-left': cis_animate_back_px
								},cis_animate_back_to_start_time,'easeOutBack', function() {
									//check to see that mouseenter does not happened
									if($wrapper.hasClass('cis_mouseentered'))
										return;
									
									var $sl = $('.cis_wrapper_' + slider_id);
									//set new autoplay
									cis_autoplay_start_timeouts[slider_id] = setTimeout(function() {//set timeout
										//set interval
										cis_evenly_move_intervals[slider_id] = setInterval(function() {
											cis_move_slider_evenly($sl);
										},cis_interval_time);
									},slider_autoplay_start_timeout);
								});
							},cis_animate_back_to_start_timeout);
						});
					});
				}
			}
			else {
				if(cis_animation_type == 'css3') {
					// cis_clear_quee($cis_images_holder);
					cis_single_autoplay_time_css3 = cis_single_autoplay_time + 'ms';
					cis_make_css3_movement($cis_images_holder, cis_single_autoplay_time_css3, 'linear', curr_left);

				} else {
					$cis_images_holder.stop(true,false).animate({
						'margin-left': curr_left
					},cis_single_autoplay_time,'linear');
				}
			}
		}
		
	};
	
	//arrows
	function cis_prepare_arrows() {
		$(".cis_main_wrapper").each(function() {
			var $wrapper = $(this);
			var $left_arrow = $wrapper.find('.cis_button_left');
			var $right_arrow = $wrapper.find('.cis_button_right');
			
			//get arrows data
			var arr_data = $wrapper.find('.cis_arrow_data').html();
			var arr_data_array = arr_data.split(',');
			var arrow_width = arr_data_array[0];
			var arrow_corner_offset = arr_data_array[1];
			var arrow_middle_offset = arr_data_array[2];
			var arrow_opacity = arr_data_array[3] / 100;
			var show_arrows = arr_data_array[4];
			
			//set data
			$left_arrow.attr("op",arrow_opacity);
			$left_arrow.attr("corner_offset",arrow_corner_offset);
			$right_arrow.attr("op",arrow_opacity);
			$right_arrow.attr("corner_offset",arrow_corner_offset);
			
			//set styles
			$left_arrow.css('width',arrow_width);
			$right_arrow.css('width',arrow_width);
			
			var arrow_height = parseInt ($left_arrow.height());
			var wrapper_height = parseFloat ($wrapper.height());
			var p_t = isNaN(parseFloat($wrapper.css('padding-top'))) ? 0 : parseFloat($wrapper.css('padding-top'));
			var p_b = isNaN(parseFloat($wrapper.css('padding-bottom'))) ? 0 : parseFloat($wrapper.css('padding-bottom'));
			var arrow_top_position = ((wrapper_height + 1 * p_t + 1 * p_b - arrow_height) / 2 ) + 1 * arrow_middle_offset;
			
			$left_arrow.css({
				'top': arrow_top_position,
				'left': '-64px',
				'opacity': arrow_opacity
			});
			$right_arrow.css({
				'top': arrow_top_position,
				'right': '-64px',
				'opacity': arrow_opacity
			});
			
			if(show_arrows == 0) {//never show arrows
				$left_arrow.remove();
				$right_arrow.remove();
			}
			else if(show_arrows == 1) {//show on hover
				$wrapper.hover(function() {
					cis_show_arrows($wrapper);
				}, function() {
					cis_hide_arrows($wrapper);
				})
			}
			else {
				cis_show_arrows($wrapper);
			}
		});
	};
	setTimeout(function() {
		cis_prepare_arrows();
	},1200);
	
	var cis_arrows_timeout1 = '';
	var cis_arrows_timeout2 = '';
	function cis_show_arrows($wrapper) {

		//get arrows data
		var arr_data = $wrapper.find('.cis_arrow_data').html();
		var arr_data_array = arr_data.split(',');
		var show_arrows = arr_data_array[4];

		if(show_arrows == 0)
			return;

		//clear timeouts
		clearTimeout(cis_arrows_timeout1);
		clearTimeout(cis_arrows_timeout2);
		
		var $left_arrow = $wrapper.find('.cis_button_left');
		var $right_arrow = $wrapper.find('.cis_button_right');
		
		var corner_offset = $left_arrow.attr("corner_offset");
		
		var animation_time = 400;
		var start_offset = -64;
		var effect = 'easeOutBack';
		
		cis_arrows_timeout1 = setTimeout(function() {
			$left_arrow.stop(true,false).animate({
				'left': corner_offset
			},animation_time,effect);
			
			$right_arrow.stop(true,false).animate({
				'right': corner_offset
			},animation_time,effect);
		},100);
		
	};
	function cis_hide_arrows($wrapper) {
		//clear timeouts
		clearTimeout(cis_arrows_timeout1);
		clearTimeout(cis_arrows_timeout2);
		
		var $left_arrow = $wrapper.find('.cis_button_left');
		var $right_arrow = $wrapper.find('.cis_button_right');
		
		var animation_time = 300;
		var start_offset = -64;
		var effect = 'easeInBack';
		
		cis_arrows_timeout2 = setTimeout(function() {
			$left_arrow.stop(true,false).animate({
				'left': start_offset
			},animation_time,effect);
			
			$right_arrow.stop(true,false).animate({
				'right': start_offset
			},animation_time,effect);
		},200)
	};
	
//mousewheel**************************************************************
	$(".cis_main_wrapper").each(function() {
		$wrapper = $(this);

		var cis_mouse_scroll_enabled = $wrapper.attr("mouse_scroll_enabled");
		cis_mouse_scroll_enabled = isNaN(cis_mouse_scroll_enabled) ? 0 : cis_mouse_scroll_enabled;

		if(cis_mouse_scroll_enabled == 1) {
			$wrapper.find('.cis_images_row').mousewheel(function(objEvent, intDelta) {
				if($(this).hasClass('cis_scrolling_vertical'))
					return;
				if(intDelta > 0)
					cis_move_images_holder_left($(this).find('.cis_images_holder'));
				else 
					cis_move_images_holder_right($(this).find('.cis_images_holder'));
			});
		}
	});
	
	//function to move left

	var cis_clear_timeout = '';
	var cis_switch_move_direction = false;
	var cis_css3_back_timeout;
	var cis_drag_speed = 0;
	
	function cis_move_images_holder_left($wrapper) { //wrapper is cis_images_holder


		$wrapper.parents('.cis_main_wrapper').attr("cis_move_direction","0");

		var cis_inf_scrolling = $wrapper.parents('.cis_main_wrapper').attr("inf_scroll_enabled");
		cis_inf_scrolling = isNaN(cis_inf_scrolling) ? 0 : cis_inf_scrolling;

		var $images_row = $wrapper.parents('.cis_images_row');
		var is_slider_dragging = $images_row.hasClass('cis_dragging') ? true : false;

		var cis_effect_type = cis_animation_type == 'css3' ? (is_slider_dragging ? 'cubic-bezier(0.250, 0.460, 0.450, 0.940)' : 'cubic-bezier(0.250, 0.100, 0.250, 1.000)') :  'swing';

		//get slider data
		var slider_data = $wrapper.parents('.cis_main_wrapper ').find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var delta_offset = 0;
		var items_to_move_count = parseInt(slider_data_array[0]);
		var move_speed_time = 600; 
		var ease_effect = parseInt(slider_data_array[2]);
		
		var screen_w = parseInt($wrapper.parent('div').width());
		var total_w = parseInt($wrapper.width());
		var curr_left = cis_animation_type == 'css3' ? cis_getTransform($wrapper,'translate_x') : parseInt($wrapper.css('margin-left'));

		// console.log('curr_left is ' + curr_left);

		//  MOVE BY STEPS ******************************************************************
		// If Movement Type set to Images Count, re-calculate it.
		if(total_w >= screen_w) {

			// var items_to_move_count = 1;
			var first_item_order;
			var total_items_width = 0;
			$wrapper.find('.cis_row_item').each(function(i) {
				var w = parseInt($(this).width());
				var m_r = parseInt($(this).css('margin-right'));

				if(total_items_width >= Math.abs(curr_left)) {
					first_item_order = i;
					return false;
				}
				total_items_width = total_items_width + 1*w + 1*m_r;
			});

			var offset_size = total_items_width - Math.abs(curr_left);
			items_to_move_count = offset_size > 100 ? items_to_move_count - 1*1 : items_to_move_count; // if we have offset, count  it as one item

			var total_move_size = offset_size;
			var items_max_order = first_item_order + 1*items_to_move_count;
			// cis_drag_speed = 0;

			// console.log('cis_drag_speed ' + cis_drag_speed);
			$wrapper.find('.cis_row_item').each(function(i) {
				if(i < first_item_order) {
					return true;
				}
				var w = parseInt($(this).width());
				var m_r = parseInt($(this).css('margin-right'));
				if(
					(
						(i < items_max_order && !is_slider_dragging) ||
						(total_move_size < cis_drag_speed && is_slider_dragging)
					)
					&& 
						(total_move_size + 1*w + 1*m_r <= screen_w) 
					) 
				{
					total_move_size = total_move_size + 1*w + 1*m_r;
				}
				else {
					if(w > screen_w) {
						total_move_size = total_move_size + (1*w - screen_w);
					}
					return false;
				}
			});

			delta_offset = total_move_size;

			// console.log('delta_offset ' + delta_offset);

			move_speed_time = total_move_size;
			if(move_speed_time > 1000)
				move_speed_time = 1000;
			if(move_speed_time < 600)
				move_speed_time = 600;

			// END  MOVE BY STEPS ******************************************************************
		}

		curr_left -= delta_offset;

		// clear timeout
		clearTimeout(cis_css3_back_timeout);
		clearTimeout(cis_clear_timeout);
		$('.cis_images_holder').addClass('cis_scrolling');
		cis_clear_timeout = setTimeout(function() {
			$('.cis_images_holder').removeClass('cis_scrolling');

			if(is_slider_dragging)
				$images_row.removeClass('cis_dragging');
		},move_speed_time);

		//check if end
		if(Math.abs(curr_left) + 1 * screen_w >= total_w) {

			// check if infinite scrolling enabled
			if(cis_inf_scrolling == 1 && total_w >= screen_w) {
				if(total_w != 999999 && $wrapper.attr("inf_enabled") == 1) {
					cis_make_infinite_scrolling_move_right($wrapper);
					cis_move_images_holder_left($wrapper);
				}
			}
			else {
				var desired_left = screen_w - total_w;
				var desired_left_1 = (total_w < screen_w) ? desired_left + ease_effect * 1 : desired_left - ease_effect * 1; 
				
				if(total_w < screen_w && !cis_switch_move_direction) {
					cis_switch_move_direction = true;
					cis_move_images_holder_right($wrapper);
					cis_switch_move_direction = false;
					return;
				}

				//calculate last point speed
				var curr_left_final = cis_animation_type == 'css3' ? cis_getTransform($wrapper,'translate_x') : parseInt($wrapper.css('margin-left'));
				var move_speed_time_final = Math.abs(curr_left_final - desired_left_1);

				if(move_speed_time_final > 1000)
					move_speed_time_final = 1000;
				if(move_speed_time_final < 150)
					move_speed_time_final = 150;

				if(cis_animation_type == 'css3') {
					cis_clear_quee($wrapper);
					move_speed_time_final_css3 = move_speed_time_final + 'ms';
					cis_make_css3_movement($wrapper, move_speed_time_final_css3, cis_effect_type, desired_left_1);
					cis_css3_back_timeout = setTimeout(function() {
						cis_clear_quee($wrapper);
						// var effect = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'; //easeOutBack
						var cis_effect_type = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'; //easeOutBack like effect
						cis_make_css3_movement($wrapper, '600ms', cis_effect_type, desired_left);
					},move_speed_time_final);
				} else {
					$wrapper.stop(true,false).animate({
						'margin-left': desired_left_1
					},move_speed_time_final,cis_effect_type,function() {
						$(this).stop().animate({
							'margin-left': desired_left
						},600,'easeOutBack');
					});
				}
				
				return 'end';
			}

		}
		else {
			if(cis_animation_type == 'css3') {
				cis_clear_quee($wrapper);
				move_speed_time = move_speed_time + 'ms';
				cis_make_css3_movement($wrapper, move_speed_time, cis_effect_type, curr_left);
			} else {
				$wrapper.stop(true,false).animate({
					'margin-left': curr_left
				},move_speed_time,cis_effect_type);
			}
		}

		// hide overlays
		$wrapper.find('.cis_row_item').addClass('reset_enabled');
		cis_hide_overlays($wrapper.parents('.cis_main_wrapper'));
		$wrapper.parents('.cis_main_wrapper').find('.cis_row_item').removeClass('cis_item_mouseentered');
		// end hide overlays
	};

	function cis_move_images_holder_right($wrapper) {  //wrapper is cis_images_holder


		$wrapper.parents('.cis_main_wrapper').attr("cis_move_direction","1");
		var cis_inf_scrolling = $wrapper.parents('.cis_main_wrapper').attr("inf_scroll_enabled");
		cis_inf_scrolling = isNaN(cis_inf_scrolling) ? 0 : cis_inf_scrolling;

		var $images_row = $wrapper.parents('.cis_images_row');
		var is_slider_dragging = $images_row.hasClass('cis_dragging') ? true : false;

		var cis_effect_type = cis_animation_type == 'css3' ? (is_slider_dragging ? 'cubic-bezier(0.250, 0.460, 0.450, 0.940)' : 'cubic-bezier(0.250, 0.100, 0.250, 1.000)') :  'swing';
		

		//get slider data
		var slider_data = $wrapper.parents('.cis_main_wrapper ').find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var delta_offset = 0;
		var items_to_move_count = parseInt(slider_data_array[0]);

		var move_speed_time = 600; 
		var ease_effect = parseInt(slider_data_array[2]);
		
		var screen_w = parseInt($wrapper.parent('div').width());
		var total_w = parseInt($wrapper.width());
		var curr_left = cis_animation_type == 'css3' ? cis_getTransform($wrapper,'translate_x') : parseInt($wrapper.css('margin-left'));

		//  MOVE BY STEPS ******************************************************************
		// If Movement Type set to Images Count, re-calculate it.
		if(total_w >= screen_w) {
			// var items_to_move_count = 10;
			var first_item_order;
			var last_item_w;
			var total_items_width = 0;
			$wrapper.find('.cis_row_item').each(function(i) {
				var w = parseInt($(this).width());
				var m_r = parseInt($(this).css('margin-right'));

				total_items_width = total_items_width + 1*w + 1*m_r;

				if(total_items_width > Math.abs(curr_left)) {
					first_item_order = i;
					last_item_w = w + 1*m_r;
					return false;
				}
			});
			var offset_size = total_items_width - Math.abs(curr_left);
			offset_size = offset_size != 0 ? last_item_w - offset_size : offset_size;

			items_to_move_count = offset_size > 100 ? items_to_move_count - 1*1 : items_to_move_count; // if we have offset, count  it as one item

			var total_move_size = offset_size;

			var items_min_order = first_item_order - 1*items_to_move_count;
				items_min_order = items_min_order < 0 ? 0 : items_min_order;
			var m_r;
			var items_sizes_array = new Array();
				items_sizes_array.length = 0;

			$wrapper.find('.cis_row_item').each(function(i) {
				if(i < items_min_order)
					return true;
				if(i >= first_item_order)
					return false;

				var w = parseInt($(this).width());
				m_r = parseInt($(this).css('margin-right'));
				items_sizes_array.push(w);
			});
			items_sizes_array.reverse();

			for (var tt = 0; tt < items_sizes_array.length; tt ++) {
				// var 
				if(total_move_size <= screen_w && (!is_slider_dragging || (is_slider_dragging && total_move_size < cis_drag_speed))) {
					var w = items_sizes_array[tt];
					total_move_size = total_move_size + 1*w + 1*m_r;
				}
			}

			delta_offset = total_move_size;

			move_speed_time = total_move_size;
			if(move_speed_time > 1000)
				move_speed_time = 1000;
			if(move_speed_time < 600)
				move_speed_time = 600;
			// END  MOVE BY STEPS ******************************************************************
		}

		curr_left = parseInt(curr_left + 1*delta_offset);

		// clear timeout
		clearTimeout(cis_css3_back_timeout);
		clearTimeout(cis_clear_timeout);
		$('.cis_images_holder').addClass('cis_scrolling');
		cis_clear_timeout = setTimeout(function() {
			$('.cis_images_holder').removeClass('cis_scrolling');

			if(is_slider_dragging)
				$images_row.removeClass('cis_dragging');
		},move_speed_time);

		//check if start
		if(curr_left >= 0) {
			// check if infinite scrolling enabled
			if(cis_inf_scrolling == 1 && total_w >= screen_w) {
				if(total_w != 999999 && $wrapper.attr("inf_enabled") == 1) {
					cis_make_infinite_scrolling_move_left($wrapper);
					cis_move_images_holder_right($wrapper);
				}
			}
			else {
				var desired_left = 0;
				var desired_left_1 = (total_w < screen_w) ? desired_left - ease_effect * 1 : desired_left + ease_effect * 1;
				
				if(total_w < screen_w && !cis_switch_move_direction) {
					cis_switch_move_direction = true;
					var r = cis_move_images_holder_left($wrapper);
					cis_switch_move_direction = false;
					return r;
				}
				
				//calculate last point speed
				var curr_left_final = cis_animation_type == 'css3' ? cis_getTransform($wrapper,'translate_x') : parseInt($wrapper.css('margin-left'));
				var move_speed_time_final = Math.abs(curr_left_final - desired_left_1);


				if(move_speed_time_final > 1000)
					move_speed_time_final = 1000;
				if(move_speed_time_final < 150)
					move_speed_time_final = 150;

				if(cis_animation_type == 'css3') {
					
					cis_clear_quee($wrapper);
					move_speed_time_final_css3 = move_speed_time_final + 'ms';
					cis_make_css3_movement($wrapper, move_speed_time_final_css3, cis_effect_type, desired_left_1);
					cis_css3_back_timeout = setTimeout(function() {
						cis_clear_quee($wrapper);
						// var effect = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'; //easeOutBack
						var cis_effect_type = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)'; //easeOutBack like effect
						cis_make_css3_movement($wrapper, '400ms', cis_effect_type, desired_left);
					},move_speed_time_final);
				} else {
					$wrapper.stop(true,false).animate({
						'margin-left': desired_left_1
					},move_speed_time_final,cis_effect_type,function() {
						$(this).stop().animate({
							'margin-left': desired_left
						},600,'easeOutBack');
					});
				}
				
				return 'end';
			}
		}
		else {


			if(cis_animation_type == 'css3') {
				cis_clear_quee($wrapper);
				move_speed_time = move_speed_time + 'ms';
				cis_make_css3_movement($wrapper, move_speed_time, cis_effect_type, curr_left);
			} else {
				$wrapper.stop(true,false).animate({
					'margin-left': curr_left
				},move_speed_time,cis_effect_type);
			}
		}


		// hide overlays
		$wrapper.find('.cis_row_item').addClass('reset_enabled');
		cis_hide_overlays($wrapper.parents('.cis_main_wrapper'));
		$wrapper.parents('.cis_main_wrapper').find('.cis_row_item').removeClass('cis_item_mouseentered');
		// end hide overlays
	};

// Infinite scrolling /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	function cis_make_infinite_scrolling_move_right($wrapper) { // wrapper is cis_images_holder

			var $img_holder = $wrapper;

			var m_l = cis_animation_type == 'css3' ? cis_getTransform($wrapper,'translate_x') : parseInt($wrapper.css('margin-left'));
			var half_w = parseInt($wrapper.attr('half_width'));
			var single_w = parseInt($wrapper.attr('single_width'));
			var repeats_count = parseInt($wrapper.attr('repeats_count'));
			var new_m_l = m_l + 1*half_w;

			var final_m_l = m_l + repeats_count * single_w *  1;
			final_m_l = final_m_l > 0 ? final_m_l - 1*single_w : final_m_l;

			if(cis_animation_type == 'css3') {
				cis_clear_quee($wrapper);
				cis_make_css3_movement($wrapper, '0ms', 'none', final_m_l);
			} else {
				$wrapper.stop(true,true).css('margin-left',final_m_l);
			}
			// cis_set_overlay_functions($wrapper.parents('.cis_main_wrapper'));

			// make correction on cur_l_start
			var cur_l_start = $img_holder.attr("cur_l_start");
			var cur_l_start_new = cur_l_start*1 + 1*Math.abs(m_l - final_m_l);
			$img_holder.attr("cur_l_start",cur_l_start_new);

			return repeats_count * single_w *  1;
	};
	function cis_make_infinite_scrolling_move_left($wrapper) {

			var $img_holder = $wrapper;

			var m_l = cis_animation_type == 'css3' ? cis_getTransform($wrapper,'translate_x') : parseInt($wrapper.css('margin-left'));

			var half_w = parseInt($wrapper.attr('half_width'));
			var single_w = parseInt($wrapper.attr('single_width'));
			var repeats_count = parseInt($wrapper.attr('repeats_count'));
			var new_m_l = m_l - 1*half_w;

			var final_m_l = m_l - repeats_count * single_w *  1;
			final_m_l = final_m_l > 0 ? final_m_l - 1*single_w : final_m_l;

			if(cis_animation_type == 'css3') {
				// console.log('final_m_l ' + final_m_l);
				cis_clear_quee($wrapper);
				cis_make_css3_movement($wrapper, '0ms', 'none', final_m_l);
			} else {
				$wrapper.stop(true,true).css('margin-left',final_m_l);
			}
			// cis_set_overlay_functions($wrapper.parents('.cis_main_wrapper'));

			// make correction on cur_l_start
			var cur_l_start = $img_holder.attr("cur_l_start");
			var cur_l_start_new = cur_l_start*1 - 1*Math.abs(m_l - final_m_l);
			$img_holder.attr("cur_l_start",cur_l_start_new);

			return repeats_count * single_w *  1;
	};

	function cis_make_infinite_scrolling($wrapper) {
			// var $img_holder = $wrapper.find('.cis_images_holder');
			var $img_holder = $wrapper;
			var q = $img_holder.width();
			var cis_overlay_animation_type = parseInt($wrapper.parents('.cis_main_wrapper').attr("cis_overlay_animation_type"));

			$img_holder.attr("inf_enabled",1);
			var $images_holder_dummy = $img_holder.clone();

			var items_count = 0;
			$images_holder_dummy.find('.cis_row_item').each(function(index, el) {
				$this = $(this);

				$this
					.removeClass("cis_fliped")
					.removeClass("cis_flipcard")
					.removeClass("cis_flip_h_1")
					.removeClass("cis_flip_h_2")
					.removeClass("cis_flip_v_1")
					.removeClass("cis_flip_v_2");
				$this.find('.cis_row_item_loader').hide()
					.removeClass("cis_flipcard_side")
					.removeClass("cis_flipcard_side_1")
					.removeClass("cis_flipcard_side_2");
				$this.find('.cis_row_item_inner')
					.removeClass("cis_flipcard_side")
					.removeClass("cis_flipcard_side_1")
					.removeClass("cis_flipcard_side_2");

				$this.find('.cis_row_item_overlay')
					.removeClass("cis_visibility_hidden");

				//remove loader
				$this.find('.cis_row_item_loader').css('display','none');

				// modify id
				var cur_id = $this.attr("id");
				cur_id = cur_id + '_inf';
				$this.attr("id",cur_id);

				// reset overlay styles
				// var inf_overlay_style = 'visibility: visible; display: block; height: 0px;';
				// $this.find('.cis_row_item_overlay').attr("style",inf_overlay_style);

				if(cis_overlay_animation_type == 1) { // if overlay visible
					$this.find('.cis_row_item_overlay').addClass('cis_opacity_visible');
				}

				// remove class
				$this.find('.cis_row_item_inner').removeClass('cis_row_hidden_element').attr('style','display: block');

				// add infinite class
				$this.addClass('cis_inf_item');

				items_count ++;
			});

			var $images_holder_dummy_modified = $images_holder_dummy.html();

			var $images_holder_dummy_modified_final = $images_holder_dummy_modified + $images_holder_dummy_modified + $images_holder_dummy_modified;

			var wrapper_w = parseInt($img_holder.css('width'));

			var wrapper_new_w = wrapper_w * 4;
			var repeats_count = 3;
			$img_holder.attr("half_width",wrapper_w * 2).css('width',wrapper_new_w).attr("single_width",wrapper_w).attr("items_count",items_count).attr("repeats_count",repeats_count);
			$img_holder.append($images_holder_dummy_modified_final);
	};

	setTimeout(function() {
		$('.cis_main_wrapper').each(function() {
			$wrapper = $(this);
			var cis_inf_scrolling = $wrapper.attr("inf_scroll_enabled");
			cis_inf_scrolling = isNaN(cis_inf_scrolling) ? 0 : cis_inf_scrolling;

			$this = $(this);
			$wrapper = $this.find('.cis_images_holder');
			if(cis_inf_scrolling == 1) {
				cis_check_inf_sroller($wrapper);
			}
		});
	},1200);

	var cis_check_inf_sroller_index = 0;
	function cis_check_inf_sroller($wrapper) {
		cis_check_inf_sroller_index ++;
		// console.log('cis_check_inf_sroller_index ' + cis_check_inf_sroller_index);
		if(cis_check_inf_sroller_index > 100)
			return;

		cis_make_inf_func($wrapper);

	};
	function cis_make_inf_func($wrp) {
		var screen_w = parseFloat($wrp.parent('div').width());
		var total_w = parseFloat($wrp.width());

		if(total_w == 999999) {
			setTimeout(function() {
				cis_check_inf_sroller($wrp);
			},250);
			return;
		}
		if(total_w >= screen_w) {
			cis_make_infinite_scrolling($wrp);
		}
	}

	
// buttons ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$('.cis_button_left').click(function() {
		var $cis_wrapper = $(this).parents('.cis_images_row').find('.cis_images_holder');
		var screen_w = parseFloat($cis_wrapper.parent('div').width());
		var total_w = parseFloat($cis_wrapper.width());
		if(total_w < screen_w)
			cis_move_images_holder_left($cis_wrapper);
		else
			cis_move_images_holder_right($cis_wrapper);
	});
	$('.cis_button_right').click(function() {
		var $cis_wrapper = $(this).parents('.cis_images_row').find('.cis_images_holder');
		var screen_w = parseFloat($cis_wrapper.parent('div').width());
		var total_w = parseFloat($cis_wrapper.width());
		if(total_w < screen_w)
			cis_move_images_holder_right($cis_wrapper);
		else
			cis_move_images_holder_left($cis_wrapper);
	});
	$('.cis_button_left').hover(function() {
		$(this).stop(true,false).animate({
			'opacity' : 1
		},300);
	},function() {
		var opacity_inactive = $(this).attr("op");
		$(this).stop(true,false).animate({
			'opacity' : opacity_inactive
		},300);
	});
	$('.cis_button_right').hover(function() {
		$(this).stop(true,false).animate({
			'opacity' : 1
		},300);
	},function() {
		var opacity_inactive = $(this).attr("op");
		$(this).stop(true,false).animate({
			'opacity' : opacity_inactive
		},300);
	});
	
	//disable page scroll
	$(".cis_main_wrapper").each(function() {
		$wrapper = $(this);

		var cis_mouse_scroll_enabled = $wrapper.attr("mouse_scroll_enabled");
		cis_mouse_scroll_enabled = isNaN(cis_mouse_scroll_enabled) ? 0 : cis_mouse_scroll_enabled;

		if(cis_mouse_scroll_enabled == 1) {

			$wrapper.find('.cis_images_row').bind('mousewheel DOMMouseScroll', function(e) {
			    var scrollTo = null;

			    if (e.type == 'mousewheel') {
			        scrollTo = (e.originalEvent.wheelDelta * -1);
			    }
			    else if (e.type == 'DOMMouseScroll') {
			        scrollTo = 40 * e.originalEvent.detail;
			    }

			    if (scrollTo) {
			        e.preventDefault();
			        $(this).scrollTop(scrollTo + $(this).scrollTop());
			    }
			});
		}
	});
	
	//Items drag effect
	$('.cis_images_row').on('dragstart', 'img', function(event) { event.preventDefault(); });
	$('.cis_images_holder').on('dragstart', 'cis_row_item_overlay', function(event) { event.preventDefault(); });
	
	//Globals
	var cis_posXdragStart = 0,
		cis_currentMouseX = -1,
		cis_swipe_offset = 15,
		cis_move_interval='',
		cis_speed_interval='';
	
	$(".cis_main_wrapper").each(function() {
		var $wrapper = $(this);
		
		var cis_touch_enabled = $wrapper.attr("touch_enabled");
		cis_touch_enabled = isNaN(cis_touch_enabled) ? 0 : cis_touch_enabled;

		if( !(cis_touch_enabled == 1 || (cis_touch_enabled == 2 && cis_is_touch_devise)) )
			return;

		$wrapper.find('.cis_images_row').mousemove(function(event) {
			cis_currentMouseX = event.pageX;
	    });
		
		// Mobile support
		$wrapper.find('.cis_images_row').on({
		    'vmousemove': function(event) {
		    	// var e = event.originalEvent;
		    	// var touches_count = e.touches.length;
	    		// var touch = e.touches[0];
	    		cis_currentMouseX = event.pageX;
	    		// console.log('--- vmousemove set cis_currentMouseX to' + cis_currentMouseX + ' : interval is  ' + cis_move_interval);
		    }
		});	
		$wrapper.find('.cis_images_row').on({
		    'touchstart touchmove': function(event) {
		    	var e = event.originalEvent;
		    	var touches_count = e.touches.length;
	    		var touch = e.touches[0];
	    		cis_currentMouseX = touch.pageX;
	    		// console.log('--- touchmove set cis_currentMouseX to' + cis_currentMouseX + ' : interval is  ' + cis_move_interval);
		    }
		});		
	});

	// END Mobile support
	
	// add grab cursor
	$(".cis_main_wrapper").each(function() {
		var $wrapper = $(this);
		var cis_touch_enabled = $wrapper.attr("touch_enabled");
		cis_touch_enabled = isNaN(cis_touch_enabled) ? 0 : cis_touch_enabled;

		if( !(cis_touch_enabled == 1 || (cis_touch_enabled == 2 && cis_is_touch_devise)) )
			return;

		$wrapper.find('.cis_row_item_inner img').addClass('cis_cursor_grab');
		// add grab curosr to overlay
		$wrapper.find('.cis_row_item_overlay').addClass('cis_cursor_grab');
	});

	var 
		cis_speed_step_time = 20,
		cis_movement_dictance = new Array,
		cis_speed_x_start = new Array,
		cis_speed_timeout = '';

	var cis_speed_index = 0;
	var item_s = 0;

	$('.cis_images_row').mousedown(function(e) {

		if(cis_is_touch_devise)
			return;

		var cis_touch_enabled = $(this).parents('.cis_main_wrapper').attr("touch_enabled");
		cis_touch_enabled = isNaN(cis_touch_enabled) ? 0 : cis_touch_enabled;

		if( !(cis_touch_enabled == 1 || (cis_touch_enabled == 2 && cis_is_touch_devise)) )
			return;

		// stop slider
		var $wrapper = $(this);
		var $cis_wrapper = $wrapper.find('.cis_images_holder');
		cis_stop_touch_move($cis_wrapper);

		var cur_l = cis_animation_type == 'css3' ? cis_getTransform($cis_wrapper,'translate_x') : parseInt($cis_wrapper.css("margin-left"));
		$cis_wrapper.attr("cur_l_start",cur_l);

		// enable touch fix!
		cis_make_touch_effect_bug_fix_enabled = true;
		cis_make_drag_enabled = true;

		var slider_data = $(this).parents('.cis_main_wrapper').find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var slider_autoplay = parseInt(slider_data_array[3]);
	
		if(slider_autoplay == 1)	
			cis_make_evenly_autoplay_stop($(this).parents('.cis_main_wrapper'));

		// return on buttons
		if($(e.target).hasClass('cis_button_left') || $(e.target).hasClass('cis_button_right')){
			return;
		}

		$(this).addClass('cis_row_mouseentered');
		
		// disable drag for overlay
		 // if($(e.target).hasClass('cis_row_item_overlay_txt') || $(e.target).hasClass('creative_btn') || 
			// $(e.target).hasClass('cis_row_item_overlay') || $(e.target).hasClass('creative_icon-white')) {
			//  return;
		 // }
 		// disable drag on icons, button
		 if($(e.target).hasClass('cis_zoom_icon') || $(e.target).hasClass('cis_link_icon') || $(e.target).hasClass('creative_icon-white')) {
			 return;
		 }

		var cis_inf_scrolling = $wrapper.parents('.cis_main_wrapper').attr("inf_scroll_enabled");
		cis_inf_scrolling = isNaN(cis_inf_scrolling) ? 0 : cis_inf_scrolling;


		 $(this).find('.cis_row_item_inner img').addClass('cis_cursor_grabbing');
		 $(this).find('.cis_row_item_overlay').addClass('cis_cursor_grabbing');
		 $(this).addClass('cis_cursor_grabbing');

 		cis_posXdragStart = cis_currentMouseX;

		// reset variables
		clearInterval(cis_speed_interval);
		clearInterval(cis_move_interval);
		cis_move_interval = 'removed_interval';
		clearTimeout(cis_speed_timeout);
		cis_movement_dirrection = [];
		cis_movement_dictance = [];
		cis_movement_dictance.length = 0;
		cis_speed_index = 0;

		// make fake call
		cis_makeDrag($wrapper,false,cis_inf_scrolling);
		cis_calculate_speed($wrapper);

		var fake_int_call_count = 10;
		var fake_int_call_time = 0;
		var fake_int_call_time_ratio = 1;
		for(var qq = 0; qq < fake_int_call_count; qq ++) {
			fake_int_call_time = fake_int_call_time + 1*fake_int_call_time_ratio;
			setTimeout(function() {
				cis_calculate_speed($wrapper);
				cis_makeDrag($wrapper,false,cis_inf_scrolling);
			},fake_int_call_time);
		}

		cis_move_interval = setInterval(function() {cis_makeDrag($wrapper,false,cis_inf_scrolling);},1);
		cis_speed_interval = setInterval(function() {cis_calculate_speed($wrapper);},1);

		// cis_stop_touch_move($cis_wrapper);

		
	});


	$('.cis_images_row').mouseup(function(e) {
		// disable for buttons
		 if($(e.target).hasClass('cis_button_left') || $(e.target).hasClass('cis_button_right') ) {
			 return;
		 }

		// if(!cis_is_touch_devise)
		// 	return;

		var cis_touch_enabled = $(this).parents('.cis_main_wrapper').attr("touch_enabled");
		cis_touch_enabled = isNaN(cis_touch_enabled) ? 0 : cis_touch_enabled;

		if(cis_touch_enabled == 1 || (cis_touch_enabled == 2 && cis_is_touch_devise)) {
			$(this).removeClass('cis_cursor_grabbing');
			$(this).find('.cis_row_item_inner img').removeClass('cis_cursor_grabbing');
			$(this).find('.cis_row_item_overlay').removeClass('cis_cursor_grabbing');

			$(this).removeClass('cis_row_mouseentered');

			// console.log('mouseup and clear interval');
			cis_clear_interval();

			cis_make_touch_effect($(this));
		}

		$(this).removeClass('cis_row_mouseentered');

	});

	$('.cis_images_row').mouseleave(function(e) {

		var cis_touch_enabled = $(this).parents('.cis_main_wrapper').attr("touch_enabled");
		cis_touch_enabled = isNaN(cis_touch_enabled) ? 0 : cis_touch_enabled;

		if(cis_touch_enabled == 1 || (cis_touch_enabled == 2 && cis_is_touch_devise)) {
			$(this).removeClass('cis_cursor_grabbing');
			$(this).find('.cis_row_item_inner img').removeClass('cis_cursor_grabbing');
			$(this).find('.cis_row_item_overlay').removeClass('cis_cursor_grabbing');

			// console.log('mouseleave and clear interval');
			cis_clear_interval();

			if($(this).hasClass("cis_row_mouseentered"))
				cis_make_touch_effect($(this));
		}


		$(this).removeClass('cis_mouseentered');
		$(this).removeClass('cis_row_mouseentered');

	});

	function cis_calculate_speed() {
		cis_speed_x_start[cis_speed_index] = cis_currentMouseX;
		cis_create_speed(cis_speed_index);
		cis_speed_index ++;
	};

	function cis_create_speed(cis_index) {
		cis_speed_timeout = setTimeout(function() {
			item_s = cis_currentMouseX - cis_speed_x_start[cis_index];
			// cis_movement_dictance[cis_index] = item_s;
			cis_movement_dictance.push(item_s);
		},cis_speed_step_time);
	}
 
	var cis_make_touch_effect_bug_fix_enabled = true;
	function cis_make_touch_effect($wrapper) { // wrapper is cis_images_row
		clearInterval(cis_speed_interval);
		clearTimeout(cis_speed_timeout);

		$img_holder = $wrapper.find('.cis_images_holder');
		$images_row = $wrapper;

		var slider_data = $('.cis_main_wrapper ').find('.cis_options_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_touch_type = parseInt(slider_data_array[4]);

		var cur_l_end = cis_animation_type == 'css3' ? cis_getTransform($img_holder,'translate_x') : parseInt($img_holder.css("margin-left"));
		var cur_l_start = $img_holder.attr("cur_l_start");

		var cis_delta = cur_l_start - cur_l_end;
		cis_delta = isNaN(cis_delta) || cis_delta == 'undefined' ? 0 : cis_delta;

		if(cis_delta == 0 && cis_make_touch_effect_bug_fix_enabled) {
			setTimeout(function() {
				cis_make_touch_effect($wrapper);
			},10);
			cis_make_touch_effect_bug_fix_enabled = false;
			return;
		}

		if(!$wrapper.hasClass("cis_dragging") && cis_delta == 0)
			return;

		// setTimeout(function() {
			var cis_inf_scrolling = $wrapper.parents('.cis_main_wrapper').attr("inf_scroll_enabled");
			cis_inf_scrolling = isNaN(cis_inf_scrolling) ? 0 : cis_inf_scrolling;

			//reverse array
			var cis_movement_dictance_reversed = cis_movement_dictance.reverse();
			var cis_array_size = cis_movement_dictance_reversed.length;

			var cis_first_item_sign = 0;
			for(var i = 0; i <  cis_array_size; i++) {
				var distance_item = cis_movement_dictance_reversed[i];
				// console.log('distance_item-' + i + ' ' + distance_item);
			}

			// get first item sign
			var cis_first_item_sign = 0;
			for(var i = 0; i <  cis_array_size; i++) {
				var distance_item = cis_movement_dictance_reversed[i];
				if(distance_item > 0) {
					cis_first_item_sign = 1;
					break;	
				}
				else if(distance_item < 0) {
					cis_first_item_sign = -1;
					break;	
				}
			}

			// get final array
			var cis_movement_distances_final = new Array;
			for(var i = 0; i <  cis_array_size; i++) {
				var distance_item = cis_movement_dictance_reversed[i];

				var item_sign = 0;
				if(distance_item == 0)
					item_sign = 0;
				else {
					item_sign = distance_item > 0 ? 1 : -1;
				}

				if(item_sign == cis_first_item_sign || item_sign == 0) {
					cis_movement_distances_final.push(distance_item);
				}
				else {
					break;
				}
			}

			var cis_array_final_size = cis_movement_distances_final.length;
			
			var one_step_time = 20;
			var counts_of_algoritm = 20;
			var position_ratio = 1;
			var position_ratio_step = 0.05;
			var movement_lenth_total = 0;
			var cis_count_algoritm_final = cis_array_final_size > counts_of_algoritm ? counts_of_algoritm : cis_array_final_size;

			for(var i = 0; i <  cis_count_algoritm_final; i++) {
				var distance_item = cis_movement_distances_final[i];
				var distance_item_weight = distance_item * position_ratio;

				movement_lenth_total += distance_item_weight;
				position_ratio -= position_ratio_step;
			}

			var cis_count_touch_elements = cis_count_algoritm_final;
			cis_count_algoritm_final = cis_count_algoritm_final == 0 ? 1 : cis_count_algoritm_final;
			var movement_distance_calculated = movement_lenth_total / cis_count_algoritm_final;

			var speed = parseInt((movement_distance_calculated / one_step_time) * 1000); // speed in px/s

			// reset arrays
			cis_movement_dictance = [];
			cis_movement_distances_final = [];
			cis_speed_index = 0;

			if(speed == 0 && cis_delta == 0) {// no movement
				$images_row.removeClass("cis_dragging");
				$img_holder.removeClass("cis_scrolling");

				return;
			}

			cis_make_drag_enabled = false;
			if((Math.abs(speed) > 0 && (cis_touch_type == 0 || cis_touch_type == 1) ) || (Math.abs(cis_delta) > 0 && speed == 0 && cis_count_touch_elements == 0) ) {
				// disable drag

				var drag_sign = $img_holder.parents('.cis_main_wrapper').attr("drag_sign");
				cis_drag_speed = speed != 0 ? Math.abs(speed) * 0.2 : Math.abs(cis_delta);

				// if cis_touch_type is 0, set to move by one
				cis_drag_speed = cis_touch_type == 0 ? 0 : cis_drag_speed; 

				// console.log('cis_drag_speed ' + cis_drag_speed);
				// console.log('drag_sign ' + drag_sign);
				$images_row.addClass("cis_dragging");
				if(drag_sign == 1) {
					cis_move_images_holder_right($img_holder);
				}
				else {
					cis_move_images_holder_left($img_holder);
				}

				var $images_row = $wrapper;
				// $images_row.removeClass("cis_dragging");

				return;
			}

			$img_holder.addClass("cis_scrolling");

			//make movement
			// set limit on max soeed
			var cis_max_speed = 10000;
			var speed_sign = speed >= 0 ? 1 : -1;
			speed = Math.abs(speed) > cis_max_speed ? speed_sign * cis_max_speed : speed;
			// console.log('make touch with speed ' + speed);
			cis_make_touch_move($img_holder, speed, cis_inf_scrolling);
			
		// },1);

	}

	var cis_remove_dragging_class_timeout,
		cis_touch_end_position_interval;
	function cis_make_touch_move($img_holder, speed, cis_inf_scrolling) {

		var distance_ratio = cis_is_touch_devise ? 0.3 : 0.3;
		var distance = speed * distance_ratio;
		var speed_time = 1500 + 0.55*Math.abs(distance);
		var cur_l = cis_animation_type == 'css3' ? cis_getTransform($img_holder,'translate_x') : parseInt($img_holder.css("margin-left"));
		var new_l = cur_l + 1 * distance;

		// get sizes
		var screen_w = parseInt($img_holder.parent('div').width());
		var total_w = parseInt($img_holder.width());
		var half_w = parseInt($img_holder.attr("half_width"));
		curr_left = cur_l;

		// check if infinite scrolling enabled, make corrections
		if(cis_inf_scrolling == 1 && total_w >= screen_w) {
			//check if end
			if(Math.abs(new_l) + 1 * screen_w >= total_w) {
				var ratio_size = cis_make_infinite_scrolling_move_right($img_holder);
				new_l = new_l + 1*ratio_size;
			}
			if(new_l > 0) {
				var ratio_size = cis_make_infinite_scrolling_move_left($img_holder);
				new_l = new_l - 1*ratio_size;
			}	
		}

		// make movement
		//  beautiful effects: easeOutQuart best, easeOutCirc, easeOutCirc, easeOutExpo, easeOutCubic N2, easeOutQuint
		if(cis_animation_type == 'css3') {
			cis_clear_quee($img_holder);
			var speed_time_css3 = speed_time + 'ms';
			var cis_effect_touchMove = 'cubic-bezier(0.165, 0.840, 0.440, 1.000)';
			cis_make_css3_movement($img_holder, speed_time_css3, cis_effect_touchMove, new_l);
		} else {
			$img_holder.stop(true,false).animate({
				'margin-left':new_l
			},speed_time,'easeOutQuart');
		}

		// set variables
		var $wrapper = $img_holder.parents('.cis_main_wrapper');
		var $images_row = $wrapper.find('.cis_images_row');
		var screen_w = parseFloat($img_holder.parent('div').width());
		var total_w = parseFloat($img_holder.width());
		var touch_animate_to_point = $images_row.attr("touch_animate_to_point");

		// // make touch end drag effect
		if(cis_inf_scrolling == 0 && (touch_animate_to_point == 1 || touch_animate_to_point == 2)) {

			$images_row.addClass("cis_dragging");

			var new_l = touch_animate_to_point == 1 ? 0 : screen_w - total_w;
			var animate_to_point_time = 600;

			if(cis_animation_type == 'css3') {
				cis_clear_quee($img_holder);
				var animate_to_point_time_css3 = animate_to_point_time + 'ms';
				var cis_effect_eaceOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
				cis_make_css3_movement($img_holder, animate_to_point_time_css3, cis_effect_eaceOutBack, new_l);
			} else {
				$img_holder.stop(true,false).animate({
					'margin-left':new_l
				},animate_to_point_time,'easeOutBack');
			}

			clearTimeout(cis_remove_dragging_class_timeout);
			cis_remove_dragging_class_timeout = setTimeout(function() {
				$images_row.removeClass("cis_dragging");
				$images_row.find('.cis_images_holder ').removeClass("cis_scrolling");
				$images_row.attr("touch_animate_to_point","0");
			},animate_to_point_time);

			return;
		}

		// set move direction
		var cis_move_direction = speed >= 0 ? 1 : 0;
		$wrapper.attr("cis_move_direction",cis_move_direction);

		// hide overlays
		$images_row.find('.cis_row_item').addClass('reset_enabled');
		cis_hide_overlays($wrapper);
		// cis_hide_arrows($wrapper);
		$wrapper.find('.cis_row_item').removeClass('cis_item_mouseentered');
		// end hide overlays

		$images_row.addClass("cis_dragging");

		//check end position condition
		if(cis_inf_scrolling == 0 && (new_l > 0 || (Math.abs(new_l) + 1 * screen_w >= total_w))) {
			
			cis_touch_calculate_end_point_speed($wrapper);

			clearInterval(cis_touch_end_position_interval);
			cis_touch_end_position_interval = setInterval(function() {
				cis_check_touch_end_point($img_holder);
			},20);

		}

		clearTimeout(cis_remove_dragging_class_timeout);
		cis_remove_dragging_class_timeout = setTimeout(function() {
			$images_row.removeClass("cis_dragging");
			$images_row.find('.cis_images_holder ').removeClass("cis_scrolling");
		},speed_time);

		//check if autoplay enabled

		// get autoplay data
		var slider_data = $wrapper.find('.cis_moving_data').html();
		var slider_data_array = slider_data.split(',');
		var slider_autoplay = parseInt(slider_data_array[3]);
		var slider_autoplay_evenly_speed = parseInt(slider_data_array[6]);
		
		if(slider_autoplay == 1 && Math.abs(distance) > 10) {

			cis_touch_start_autoplay($wrapper,slider_autoplay_evenly_speed);
		}
	};

	// check end position ***************************************************************************************************************
	function cis_check_touch_end_point($img_holder) {
		var $wrapper = $img_holder.parents('.cis_main_wrapper');
		var $images_row = $wrapper.find('.cis_images_row');
		var cur_l = cis_animation_type == 'css3' ? cis_getTransform($img_holder,'translate_x') : parseInt($img_holder.css("margin-left"));
		var screen_w = parseInt($img_holder.parent('div').width());
		var total_w = parseInt($img_holder.width());

		if(cur_l >= 0 || (Math.abs(cur_l) + 1 * screen_w >= total_w)) {
			clearInterval(cis_touch_end_position_interval);
			clearInterval(cis_end_point_speed_interval);

			var end_point_size = cis_end_point_speed == 10000 ? 250 : cis_end_point_speed;
			var end_pos_max = 750;
			end_point_size = end_point_size > end_pos_max ? end_pos_max : end_point_size;
			if(cur_l >= 0) {
				var new_l = cur_l + end_point_size * 0.15;
				var end_pos = 0;
			}
			else {
				var new_l = cur_l - end_point_size * 0.15;
				var end_pos = screen_w - total_w;
			}

			var f_time = 200 + end_point_size * 0.15;
			//good effects:  easeOutCubic
			var last_effect = cis_animation_type == 'css3' ? 'cubic-bezier(0.250, 0.460, 0.450, 0.940)' : 'easeOutQuad';

			if(cis_animation_type == 'css3') {
				cis_clear_quee($img_holder);

				f_time_css3 = f_time + 'ms';
				cis_make_css3_movement($img_holder, f_time_css3, last_effect, new_l);
				setTimeout(function() {
					var cis_effect_eaceOutBack = 'cubic-bezier(0.175, 0.885, 0.320, 1.275)';
					cis_make_css3_movement($img_holder, '600ms', cis_effect_eaceOutBack, end_pos);
				},f_time);
			} else {
				$img_holder.stop(true,false).animate({
					'margin-left' : new_l
				},f_time,last_effect, function() {
					$img_holder.stop(true,false).animate({
						'margin-left' : end_pos
					},600,'easeOutBack');
				});
			}

		}
	}

	// Calculate end point speed ***************************************************************************************************************
	var cis_end_point_speed_interval = '',
		cis_end_point_speed_step_time = 50,
		cis_end_point_ml_start = new Array,
		cis_end_point_speed_array = new Array,
		cis_end_point_speed = 10000,
		cis_speed_check_index = 0,
		cis_end_point_speed_index = 0;

	function cis_touch_calculate_end_point_speed($wrapper) {
		clearInterval(cis_end_point_speed_interval);
		cis_end_point_ml_start = [];
		cis_end_point_speed_array = [];
		cis_end_point_speed_index = 0;
		cis_speed_check_index = 0;
		cis_end_point_speed = 10000;

		cis_end_point_speed_interval = setInterval(function() {cis_end_point_calculate_speed($wrapper);},20);
	};

	function cis_end_point_calculate_speed($wrapper) {
		cis_end_point_ml_start[cis_end_point_speed_index] = cis_animation_type == 'css3' ? cis_getTransform($wrapper.find('.cis_images_holder'),'translate_x') : parseInt($wrapper.find('.cis_images_holder').css('margin-left'));
		cis_end_point_create_speed(cis_end_point_speed_index);
		cis_end_point_speed_index ++
	};
	function cis_end_point_create_speed(index) {
		cis_speed_timeout = setTimeout(function() {
			var cur_l = cis_animation_type == 'css3' ? cis_getTransform($wrapper.find('.cis_images_holder'),'translate_x') : parseInt($wrapper.find('.cis_images_holder').css('margin-left'));
			var speed_0 = Math.abs(cur_l - cis_end_point_ml_start[index]) * 1000 / cis_end_point_speed_step_time;
			cis_end_point_speed = isNaN(speed_0) ? cis_end_point_speed : speed_0;
		},cis_end_point_speed_step_time);
	}

	// Calculate autoplay speed ***************************************************************************************************************

	var cis_final_speed_interval = '',
		cis_final_speed_step_time = 50,
		cis_final_ml_start = new Array,
		cis_final_speed_array = new Array,
		cis_final_speed = 10000,
		cis_speed_check_index = 0,
		cis_final_speed_index = 0,
		cis_check_speeds_timeout = 0;

	function cis_touch_start_autoplay($wrapper,slider_autoplay_evenly_speed) {
		var slider_evenly_autoplay_step_time = 400;
		var cis_autoplay_speed = parseFloat(slider_autoplay_evenly_speed * 1000 / slider_evenly_autoplay_step_time);

		clearInterval(cis_final_speed_interval);
		cis_final_ml_start = [];
		cis_final_speed_array = [];
		cis_final_speed_index = 0;
		cis_speed_check_index = 0;
		cis_final_speed = 10000;


		cis_final_speed_interval = setInterval(function() {cis_final_calculate_speed($wrapper);},20);

		clearTimeout(cis_check_speeds_timeout);
		cis_check_speeds_timeout = setTimeout(function() {
			cis_check_speeds($wrapper,cis_autoplay_speed);
		},200);

	};

	function cis_final_calculate_speed($wrapper) {
		cis_final_ml_start[cis_final_speed_index] = cis_animation_type == 'css3' ? cis_getTransform($wrapper.find('.cis_images_holder'),'translate_x') : parseInt($wrapper.find('.cis_images_holder').css('margin-left'));
		var cis_final_create_speed = function(index) {
			cis_speed_timeout = setTimeout(function() {
				var cur_l = cis_animation_type == 'css3' ? cis_getTransform($wrapper.find('.cis_images_holder'),'translate_x') : parseInt($wrapper.find('.cis_images_holder').css('margin-left'));
				// cis_final_speed_array[index] = Math.abs(cur_l - cis_final_ml_start[index]) * 1000 / cis_final_speed_step_time;
				var speed_0 = Math.abs(cur_l - cis_final_ml_start[index]) * 1000 / cis_final_speed_step_time;
				cis_final_speed = isNaN(speed_0) ? cis_final_speed : speed_0;
				// console.log('speed is ' + cis_final_speed);
				
			},cis_final_speed_step_time);
		}
		cis_final_create_speed(cis_final_speed_index);
		cis_final_speed_index ++
	};
	
	function cis_check_speeds($wrapper,cis_autoplay_speed) {

		// cis_touch_current_speed = cis_final_speed_array[cis_final_speed_array.length - 1];
		cis_speed_check_index ++;
		if(cis_speed_check_index > 1000) {
			clearInterval(cis_final_speed_interval);
			cis_final_ml_start = [];
			cis_final_speed_array = [];
			cis_final_speed_index = 0;
			return;
		}

		if(cis_final_speed > cis_autoplay_speed * 2) {
			setTimeout(function() {
				cis_check_speeds($wrapper,cis_autoplay_speed);
			},20);
			return;
		}
		else {
			clearInterval(cis_final_speed_interval);
			cis_final_ml_start = [];
			cis_final_speed_array = [];
			cis_final_speed_index = 0;
			cis_speed_check_index = 0;

			cis_final_start_touch_autoplay($wrapper);
		}
	};

	function cis_final_start_touch_autoplay($wrapper) {
		// clearTimeout(cis_remove_dragging_class_timeout);
		$images_row = $wrapper.find('.cis_images_row');
	

		$images_row.removeClass("cis_dragging");
		$images_row.find('.cis_images_holder ').removeClass("cis_scrolling");

		cis_make_evenly_autoplay_restart($wrapper,0);
	};

// END Calculate autoplay speed ***************************************************************************************************************

	function cis_stop_touch_move($img_holder) {
		if(cis_animation_type == 'css3') {
			cis_clear_quee($img_holder);
		} else {
			$img_holder.stop(true,false);
		}
		$img_holder.removeClass("cis_scrolling");
	};

	var cis_hide_overlays_enabled = true;
	var cis_make_drag_enabled = true;
	function cis_makeDrag($wrapper, is_mobile, cis_inf_scrolling) { // wrapper is cis_images_row

		if(!cis_make_drag_enabled)
			return;
		/* Act on the event */
		// console.log('cis_posXdragStart ' + cis_posXdragStart);
		// console.log('cis_currentMouseX ' + cis_currentMouseX);

		var delta = cis_posXdragStart - cis_currentMouseX;

		var drag_sign = $wrapper.parents('.cis_main_wrapper').attr("drag_sign");
		if(Math.abs(delta) > 0) {
			drag_sign = delta > 0 ? 0 : 1;
			$wrapper.parents('.cis_main_wrapper').attr("drag_sign",drag_sign);
		}
		// console.log('delta is ' + delta);

		if(delta != 0)
			$wrapper.addClass("cis_dragging");

		var drag_direction = delta < 0 ? 'right' : 'left';

		var $img_holder = $wrapper.find('.cis_images_holder');
		var cur_l = cis_animation_type == 'css3' ? cis_getTransform($img_holder,'translate_x') : parseInt($img_holder.css("margin-left"));
		var screen_w = parseFloat($img_holder.parent('div').width());
		var total_w = parseFloat($img_holder.width());
		var new_l = cur_l - delta*1;

		//last position drag stoping effect
		if( cis_inf_scrolling == 0 && (cur_l > 0 || (cur_l < 0 && (Math.abs(cur_l) + 1 * screen_w >= total_w))) ) {  // start/end positions
			var st_anim_time = is_mobile ? 70 : 1;

			// make slow drag!
			if(cis_animation_type == 'css3') {
				var new_l_calc = cur_l - delta*0.25;
				cis_make_css3_movement($img_holder, '0ms', 'none', new_l_calc);
			}
			else {
				st_anim_time = 1;
				$img_holder.stop(true,false).animate({
					'margin-left' : new_l
				},st_anim_time,'linear');
			}
		}
		else {
			if(cis_animation_type == 'css3') {
				st_anim_time_css3 = st_anim_time + 'ms';
				cis_make_css3_movement($img_holder, '0ms', 'none', new_l);
			}
			else {
				$img_holder.css('margin-left',new_l);
			}
		}

		if(cis_inf_scrolling == 0) {
			if(cur_l > 0)
				$wrapper.attr("touch_animate_to_point","1");
			else if(cur_l < 0 && (Math.abs(cur_l) + 1 * screen_w >= total_w))
				$wrapper.attr("touch_animate_to_point","2");
			else
				$wrapper.attr("touch_animate_to_point","0");
		}


		// get sizes
		var screen_w = parseFloat($img_holder.parent('div').width());
		var total_w = parseFloat($img_holder.width());
		curr_left = cur_l;

		// check if infinite scrolling enabled
		if(cis_inf_scrolling == 1 && total_w >= screen_w) {

			if(total_w != 999999 && $wrapper.find(".cis_images_holder").attr("inf_enabled") == 1) {
				if(Math.abs(curr_left) + 1 * screen_w >= total_w) {
					cis_make_infinite_scrolling_move_right($img_holder);
					// console.log('cis_make_infinite_scrolling 1');
				}
				if(new_l > 0) {
					cis_make_infinite_scrolling_move_left($img_holder);
					// console.log('cis_make_infinite_scrolling 2');
				}
			}		
		}

		//set new cordinates
		cis_posXdragStart = cis_currentMouseX;

	};

	//clear interval
	function cis_clear_interval() {
		// console.log('*********************clearing interval');;
		clearInterval(cis_move_interval);
		cis_move_interval = 'removed_interval';
		clearInterval(cis_speed_interval);
	};

//hover animation /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$(".cis_row_item img").load(function() {
		var $this = $(this);
		$this.attr('cis_loaded','loaded');

		var cis_overlay_animation_type = $this.parents('.cis_main_wrapper').attr("cis_overlay_animation_type");
		var cis_overlay_type = $this.parents('.cis_main_wrapper').attr("cis_overlay_type");

		var $cis_overlay = $(this).next('.cis_row_item_overlay');
		$cis_item = $this.parents('.cis_row_item');
		$cis_overlay.css({'visibility' : 'hidden','display' : 'block'});
		var h = $cis_overlay.height();

		if(cis_overlay_animation_type == 0) { // slide
			if(cis_overlay_type == 0) { // overlay is bottom fixed
				var cis_hidden_margin = -1*h;
				$cis_overlay.css({'visibility' : 'visible','display' : 'block','margin-bottom' : cis_hidden_margin}).attr('h',h);
			}
			else {
				$cis_overlay.css({'visibility' : 'visible','display' : 'block','top' : '100%'}).attr('h',h);
			}
		}
		else if(cis_overlay_animation_type == 1) {// always keep visible
			$cis_overlay.css({'visibility' : 'visible','display' : 'block','opacity' : '0'});
			$cis_overlay.addClass('cis_transition_default')
			setTimeout(function() {
				$cis_overlay.addClass("cis_opacity_visible");
			},1620);
		} 		
		else if(cis_overlay_animation_type == 2) {// fade
			$cis_overlay.css({'visibility' : 'visible','display' : 'block','opacity' : '0'});
		}
		else if(cis_overlay_animation_type == 4) {// hidden
			$cis_overlay.addClass('cis_display_none').css({'visibility' : 'hidden','display' : 'none'});
		}
		else if(cis_overlay_animation_type == 3) {// follow mouse
			if(cis_overlay_type == 0) { // overlay is bottom fixed
				var cis_hidden_margin = -1*h;
				$cis_overlay.css({'visibility' : 'visible','display' : 'block','margin-bottom' : cis_hidden_margin});
			}
			else {
				$cis_overlay.css({'visibility' : 'visible','display' : 'block','top' : '100%'}).attr('h',h);
			}
		} 

		$this.addClass('cis_loaded');
		setTimeout(function() {
			cis_make_proccess($this);
			// cis_render_overlay_items($cis_item);
		},400);
	});
	
	function cis_make_proccess($el) {
		//get slider data
		var slider_data = $el.parents('.cis_main_wrapper ').find('.cis_options_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_item_appear_effect_type = parseInt(slider_data_array[2]);

		var $cis_row_item = $el.parents('.cis_row_item');
		$cis_wrapper = $cis_row_item.parents(".cis_main_wrapper");
		var item_width = $el.width();
		$cis_row_item.find('.cis_row_item_loader').animate({
			width: item_width
		},400,'swing',function() {
			var $loader = $el.parents('.cis_row_item').find('.cis_row_item_loader');
			var $item_inner = $el.parents('.cis_row_item_inner');
			if(cis_item_appear_effect_type == 0) {
				$loader.fadeOut(200,function() {
					$item_inner.hide().removeClass('cis_row_hidden_element').fadeIn(200);
				});
			}
			else if (cis_item_appear_effect_type == 1) {
				var st = $loader.attr("style");
				$cis_row_item.attr("style",st);
				$item_inner.removeClass('cis_row_hidden_element');
				// $item_inner.find('img').addClass('cis_transition_none');
				$item_inner.find('.cis_row_item_overlay').addClass('cis_visibility_hidden');

				$item_inner.addClass("cis_flipcard_no_transition").addClass("cis_flipcard_side_2").addClass("cis_flipcard_side").removeClass("cis_flipcard_no_transition");
				$loader.addClass("cis_flipcard_side_1").addClass("cis_flipcard_side");

				var flip_direction = Math.floor((Math.random() * 10) + 1) > 5 ? 1 : 2;
				var cis_flip_dir_class = $loader.hasClass("cis_row_item_loader_color2") ? 'cis_flip_h_' + flip_direction : 'cis_flip_v_' + flip_direction;
				$cis_row_item.addClass("cis_flipcard").addClass(cis_flip_dir_class);

				cis_show_flipped_item($cis_row_item);
			}
		});
	};

	function cis_show_flipped_item($item) {
		setTimeout(function() {
			$item.addClass("cis_fliped");
		},20);

		setTimeout(function() {
			$item
				.addClass('cis_transition_none')
				.removeClass("cis_fliped")
				.removeClass("cis_flipcard")
				.removeClass("cis_flip_h_1")
				.removeClass("cis_flip_h_2")
				.removeClass("cis_flip_v_1")
				.removeClass("cis_flip_v_2")
				.removeClass("cis_transition_none");
			$item.find('.cis_row_item_loader').hide()
				.removeClass("cis_flipcard_side")
				.removeClass("cis_flipcard_side_1")
				.removeClass("cis_flipcard_side_2");
			$item.find('.cis_row_item_inner')
				.addClass('cis_transition_none')
				.removeClass("cis_flipcard_side")
				.removeClass("cis_flipcard_side_1")
				.removeClass("cis_flipcard_side_2")
				.removeClass("cis_transition_none");
			$item.find('.cis_row_item_overlay')
				.removeClass('cis_visibility_hidden');
		},820);
	};
	
	function cis_getRandomArbitary (min, max) {
	    return Math.random() * (max - min) + min;
	};
	
	function cis_calculate_loaders_width() {
		$('.cis_images_holder').each(function() {
			var $wrapper = $(this);
			var wrapper_width = $wrapper.parents('.cis_images_row').width();
			var items_height = $wrapper.find('.cis_row_item_loader').height();
			
			var loader_prepared_width = items_height * 1.5;
			var loader_ratio_sign = Math.random() < 0.5 ? 1 : -1;
			$wrapper.find('.cis_row_item_loader').each(function() {
				var loader_width_calculated = loader_prepared_width + loader_ratio_sign * cis_getRandomArbitary(25,50);
				$(this).width(loader_width_calculated);
				loader_ratio_sign = loader_ratio_sign == 1 ? -1 : 1;
			});
		});
	};
	cis_calculate_loaders_width();

	var cis_show_icons_enabled = true;
	$('.cis_main_wrapper').each(function() {
		var $this = $(this);

		var cis_touch_enabled = $(this).attr("touch_enabled");
		cis_touch_enabled = isNaN(cis_touch_enabled) ? 0 : cis_touch_enabled;

		if(cis_touch_enabled != 0) {
			cis_disable_selection_on_wrapper($this);
		}

		var cis_overlay_animation_type = parseInt($(this).attr("cis_overlay_animation_type"));
		var cis_overlay_type = parseInt($(this).attr("cis_overlay_type"));

		// $this.on('mouseleave','.cis_button_left',function() {
		// 	cis_show_icons_enabled = false;
		// });
		// $this.on('mouseleave','.cis_button_right',function() {
		// 	cis_show_icons_enabled = false;
		// });

		//get slider data
		var slider_data = $this.find('.cis_options_data').html();
		var slider_data_array = slider_data.split(',');
		var cis_image_effect_index = parseInt(slider_data_array[1]);
		var icon_animation = parseInt(slider_data_array[8]);

		// item incons functions ////////////////////////////////////////////////////////////////////////////////////////////////////////////
		if(icon_animation != 4) { // 4 is no icon animation
			if(!cis_is_touch_devise) {
				$this.on('mouseenter', '.cis_row_item', function() {
					// console.log('enter');
					if($(this).parents('.cis_images_row').hasClass("cis_dragging") || $(this).parents('.cis_images_holder').hasClass("cis_scrolling"))
						return;
					cis_show_icons_enabled = true;

					cis_show_item_icons($(this));
				});
			}
			else {
				$this.on('vclick', '.cis_row_item', function() {
					if($(this).parents('.cis_images_row').hasClass("cis_dragging") || $(this).parents('.cis_images_holder').hasClass("cis_scrolling"))
						return;
					cis_show_item_icons($(this));
				});
			}
		}
		$this.on('mouseleave', function() {
			// console.log('mouseleave');
			if(icon_animation != 4) {
				cis_show_icons_enabled = true;
				$('.cis_zoom_icon').addClass('cis_zoom_icon_hidden');
				$('.cis_link_icon').addClass('cis_link_icon_hidden');
			}

			// reset overlays
			if(cis_overlay_animation_type == 0 || cis_overlay_animation_type == 2 || cis_overlay_animation_type == 3) { // slide - 0, fade - 2, folow mouse - 3
				if(cis_overlay_animation_type == 0) {
					var cis_anim_class = cis_overlay_type == 0 ? 'cis_margin_bottom_reseted' : 'cis_top_reseted';
				}
				else if(cis_overlay_animation_type == 2) { // fade
					var cis_anim_class = 'cis_opacity_visible';
				}		
				else if(cis_overlay_animation_type == 3) { // follow mouse
					if(cis_overlay_type == 0) { 
						var cis_anim_class = 'cis_margin_bottom_reseted';
					}
				}

				$this.find(".cis_row_item_overlay").removeClass(cis_anim_class);
			}
		});

		// overlay animations functions ////////////////////////////////////////////////////////////////////////////////////////
		
		if(cis_overlay_animation_type == 0 || cis_overlay_animation_type == 2 || cis_overlay_animation_type == 3) { // slide - 0, fade - 2, folow mouse-3,
			// get event type
			var cis_effect_event_type = cis_is_touch_devise ? 'vclick' : 'mouseenter';
			
			// add animation rule
			var cis_transition_class = 'cis_transition_default';
			$this.find(".cis_row_item_overlay").addClass(cis_transition_class);
			

			// get animation last point class
			if(cis_overlay_animation_type == 0) {
				var cis_anim_class = cis_overlay_type == 0 ? 'cis_margin_bottom_reseted' : 'cis_top_reseted';
			}
			else if(cis_overlay_animation_type == 2) { // fade
				var cis_anim_class = 'cis_opacity_visible';
			}
			else if(cis_overlay_animation_type == 3) { // follow mouse
				if(cis_overlay_type == 0) {
					var cis_anim_class = 'cis_margin_bottom_reseted';
				}
			}

			$this.on(cis_effect_event_type, '.cis_row_item', function(e) {
				// return if scrolling or grabbing
				if($(this).parents('.cis_images_row').hasClass("cis_dragging") || $(this).parents('.cis_images_holder').hasClass("cis_scrolling"))
					return;

				var cis_item_id = $(this).attr("item_id");
				$wrapper = $this;


				if(cis_overlay_animation_type == 3 && cis_overlay_type == 1) { // follow mouse algoritm

					var cis_pageX =  parseInt(e.pageX);
					var cis_pageY =  parseInt(e.pageY);
					var element_pageX = parseInt($(this).offset().left);
					var element_pageY = parseInt($(this).offset().top);
					var element_w = parseInt($(this).width());
					var element_h = parseInt($(this).height());

					var deltaX = Math.abs(element_pageX - cis_pageX);
					var deltaX_1 = element_w - deltaX;
					var deltaY = Math.abs(element_pageY - cis_pageY);
					var deltaY_1 = element_h - deltaY;

					var x_sign = 1;
					var x_val = deltaX_1;
					if(deltaX < deltaX_1) {
						x_sign = 3;
						x_val = deltaX;
					}

					var y_sign = 0;
					var y_val = deltaY;
					if(deltaY_1 < deltaY) {
						y_sign = 2;
						y_val = deltaY_1;
					}
					if(x_val < y_val) 
						var cis_mouse_dir = x_sign;
					else
						var cis_mouse_dir = y_sign;

					// not using $(this), but class, to apply on infinite items as well.
					var $cis_overlay = $wrapper.find('.cis_item_' + cis_item_id).find('.cis_row_item_overlay');

					// remove transition
					$cis_overlay.removeClass(cis_transition_class);

					// remove old position
					$cis_overlay
						.removeClass('cis_follow_mouse_0')
						.removeClass('cis_follow_mouse_1')
						.removeClass('cis_follow_mouse_2')
						.removeClass('cis_follow_mouse_3')
						.removeClass('cis_follow_mouse_reset');

					// set initial position
					var f_mouse_dir_class = 'cis_follow_mouse_' + cis_mouse_dir;
					$cis_overlay.addClass(f_mouse_dir_class)

					// add transition
					setTimeout(function() {
						$cis_overlay.addClass(cis_transition_class);
						$cis_overlay.removeClass(f_mouse_dir_class).addClass('cis_follow_mouse_reset');
					},1);
				}
				else {
					$this.find('.cis_row_item_overlay').removeClass(cis_anim_class);
					// $(this).find('.cis_row_item_overlay').addClass(cis_anim_class);
					$wrapper.find('.cis_item_' + cis_item_id).find('.cis_row_item_overlay').addClass(cis_anim_class);
				}
			});

			//  mouseleave for follow mouse animation
			if(cis_overlay_animation_type == 3 && cis_overlay_type == 1) {
				var cis_effectleave_event_type = cis_is_touch_devise ? 'vmouseout' : 'mouseleave';

				$this.on(cis_effectleave_event_type, '.cis_row_item', function(e) {
					// return if scrolling or grabbing
					if($(this).parents('.cis_images_row').hasClass("cis_dragging") || $(this).parents('.cis_images_holder').hasClass("cis_scrolling"))
						return;

					var cis_item_id = $(this).attr("item_id");
					$wrapper = $this;

					var cis_pageX =  parseInt(e.pageX);
					var cis_pageY =  parseInt(e.pageY);
					var element_pageX = parseInt($(this).offset().left);
					var element_pageY = parseInt($(this).offset().top);
					var element_w = parseInt($(this).width());
					var element_h = parseInt($(this).height());

					var deltaX = Math.abs(element_pageX - cis_pageX);
					var deltaX_1 = element_w - deltaX;
					var deltaY = Math.abs(element_pageY - cis_pageY);
					var deltaY_1 = element_h - deltaY;

					var x_sign = 1;
					var x_val = deltaX_1;
					if(deltaX < deltaX_1) {
						x_sign = 3;
						x_val = deltaX;
					}

					var y_sign = 0;
					var y_val = deltaY;
					if(deltaY_1 < deltaY) {
						y_sign = 2;
						y_val = deltaY_1;
					}
					if(x_val < y_val) 
						var cis_mouse_dir = x_sign;
					else
						var cis_mouse_dir = y_sign;

					// var $cis_overlay = $(this).find('.cis_row_item_overlay');
					var $cis_overlay = $wrapper.find('.cis_item_' + cis_item_id).find('.cis_row_item_overlay');

					// remove transition
					$cis_overlay.removeClass(cis_transition_class);
	
					// set initial position
					var f_mouse_dir_class = 'cis_follow_mouse_' + cis_mouse_dir;

					// add transition
					setTimeout(function() {
						$cis_overlay.addClass(cis_transition_class);
						$cis_overlay.removeClass('cis_follow_mouse_reset').addClass(f_mouse_dir_class);
					},1);
				});
			}
		}

		// image hover effects /////////////////////////////////////////////////////////////////////////////////////////

		var cis_effect_event_type_1 = cis_is_touch_devise ? 'vclick' : 'mouseenter';
		var cis_effect_event_type_2 = cis_is_touch_devise ? 'vmouseout' : 'mouseleave';

		var cis_effect_type_classname = 'cis_effect_none';
		if(cis_image_effect_index == 1)
			cis_effect_type_classname = 'cis_effect_zoom';
		else if(cis_image_effect_index == 2)
			cis_effect_type_classname = 'cis_effect_rotate';


		if(cis_effect_type_classname != 'cis_effect_none') { 
			$this.find(".cis_row_item img").addClass("cis_transition_default");
			
			// $(this).addClass('cis_transition_default');
			$this.on(cis_effect_event_type_1, '.cis_row_item', function() {
				var cis_item_id = $(this).attr("item_id");
				$wrapper = $this;

				if($(this).parents('.cis_images_row').hasClass("cis_dragging") || $(this).parents('.cis_images_holder').hasClass("cis_scrolling"))
					return;

				$(this).find('img').addClass(cis_effect_type_classname);
				$wrapper.find('.cis_item_' + cis_item_id).find('img').addClass(cis_effect_type_classname);
			});
			$this.on(cis_effect_event_type_2, '.cis_row_item', function() {
				var cis_item_id = $(this).attr("item_id");
				$wrapper = $this;

				if($(this).parents('.cis_images_row').hasClass("cis_dragging") || $(this).parents('.cis_images_holder').hasClass("cis_scrolling"))
					return;
				$wrapper.find('.cis_item_' + cis_item_id).find('img').removeClass(cis_effect_type_classname);
			});
		}

	});

	function cis_hide_overlays($wrapper) {
		var $this = $wrapper;
		var cis_overlay_animation_type = parseInt($wrapper.attr("cis_overlay_animation_type"));
		var cis_overlay_type = parseInt($wrapper.attr("cis_overlay_type"));

		$('.cis_zoom_icon').addClass('cis_zoom_icon_hidden');
		$('.cis_link_icon').addClass('cis_link_icon_hidden');

		// reset overlays
		if(cis_overlay_animation_type == 0 || cis_overlay_animation_type == 2) { // slide - 0, fade - 2, folow mouse-3
			if(cis_overlay_animation_type == 0) {
				var cis_anim_class = cis_overlay_type == 0 ? 'cis_margin_bottom_reseted' : 'cis_top_reseted';
			}
			else if(cis_overlay_animation_type == 2) { // fade
				var cis_anim_class = 'cis_opacity_visible';
			}

			$this.find(".cis_row_item_overlay").removeClass(cis_anim_class);
		}
		else if (cis_overlay_animation_type == 3) { // follow mouse
			if(cis_overlay_type == 0)
				$this.find(".cis_row_item_overlay").removeClass('cis_margin_bottom_reseted');
			else
				$this.find(".cis_row_item_overlay").addClass('cis_follow_mouse_2').removeClass('cis_follow_mouse_reset');
		}

		// remove image hover effect
		$wrapper.find('.cis_row_item img').removeClass('cis_effect_zoom').removeClass('cis_effect_rotate');
	};

	/*mobile********************************************************************************************/

	$('.cis_main_wrapper').each(function() {
		var $wrapper = $(this);

		var cis_touch_enabled = $wrapper.attr("touch_enabled");
		cis_touch_enabled = isNaN(cis_touch_enabled) ? 0 : cis_touch_enabled;

		if( !(cis_is_touch_devise && (cis_touch_enabled == 1 || cis_touch_enabled == 2)) )
			return;

		$wrapper.find(".cis_images_row").on({
		    'touchstart': function(event) { 
		    	// event.preventDefault();
		    	var e = event.originalEvent;
		    	var touches_count = e.touches.length;
		    	if(touches_count != 1)
		    		return;

	    		var touch = e.touches[0];

				cis_make_evenly_autoplay_stop($(this).parents('.cis_main_wrapper'));

				// // return on buttons
				if($(touch.target).hasClass('cis_button_left') || $(touch.target).hasClass('cis_button_right')){
					return;
				}

				// stop slider
				var $wrapper = $(this);
				var $cis_wrapper = $wrapper.find('.cis_images_holder');
				cis_stop_touch_move($cis_wrapper);

				var cur_l = cis_animation_type == 'css3' ? cis_getTransform($cis_wrapper,'translate_x') : parseInt($cis_wrapper.css("margin-left"));
				$cis_wrapper.attr("cur_l_start",cur_l);

				// enable touch fix!
				cis_make_touch_effect_bug_fix_enabled = true;
				cis_make_drag_enabled = true;

				$(this).addClass('cis_row_mouseentered');
				
				// //disable drag for overlay
				 // if($(touch.target).hasClass('cis_row_item_overlay_txt') || $(touch.target).hasClass('creative_btn') || 
					// $(touch.target).hasClass('cis_row_item_overlay') || $(touch.target).hasClass('creative_icon-white')) {
					//  return;
				 // }

	 			var cis_inf_scrolling = $wrapper.parents('.cis_main_wrapper').attr("inf_scroll_enabled");
				cis_inf_scrolling = isNaN(cis_inf_scrolling) ? 0 : cis_inf_scrolling;
				
		 		cis_posXdragStart = cis_currentMouseX;
		 		// console.log('--- set cis_posXdragStart to ' + cis_posXdragStart);
				var $cis_wrapper = $wrapper.find('.cis_images_holder');

				clearInterval(cis_speed_interval);
				clearInterval(cis_move_interval);
				cis_move_interval = 'removed_interval';
				clearTimeout(cis_speed_timeout);
				cis_movement_dirrection = [];
				cis_movement_dictance = [];
				cis_speed_index = 0;

				// make fake call
				cis_makeDrag($wrapper,false,cis_inf_scrolling);
				cis_calculate_speed($wrapper);

				var fake_int_call_count = 10;
				var fake_int_call_time = 0;
				var fake_int_call_time_ratio = 1;
				for(var qq = 0; qq < fake_int_call_count; qq ++) {
					fake_int_call_time = fake_int_call_time + 1*fake_int_call_time_ratio;
					setTimeout(function() {
						cis_calculate_speed($wrapper);
						cis_makeDrag($wrapper,false,cis_inf_scrolling);
					},fake_int_call_time);
				}


				cis_move_interval = setInterval(function() {cis_makeDrag($wrapper,true,cis_inf_scrolling);},5);
				cis_speed_interval = setInterval(function() {cis_calculate_speed($wrapper);},20);
		    	// console.log('touchstart move inbterval is ' + cis_move_interval);

		    }
		});

		$wrapper.find(".cis_images_row").on({
		    'touchend': function(event) {
		    	// console.log('touchend');
		        var e = event.originalEvent;
		        if($(this).hasClass('cis_row_mouseentered'))
		    		cis_make_touchleave($(this));
		    }
		});

		// var cis_touchleave_detector = true;
		// $wrapper.on({
		//     'touchstart': function(event) { 
		//     	cis_touchleave_detector = true;
		//     }
		// });
		// $wrapper.on({
		//     'touchmove': function(event) { 
		//     	if(!cis_touchleave_detector)
		//     		return;

		//         var e = event.originalEvent;
		//     	var touches_count = e.touches.length;
		//     	if(touches_count != 1)
		//     		return;

		// 		var touch = e.touches[0];
		// 		var cis_touched_element = $(document.elementFromPoint(touch.pageX, touch.pageY));
		// 		if(! cis_touched_element.parents('.cis_main_wrapper').length) {
		// 			cis_touchleave_detector = false;
		// 			cis_make_touchleave($(this).find('.cis_images_row'));
		// 		} 

		//     }
		// });
	});

	function cis_make_touchleave($wrapper) {
		$wrapper.removeClass('cis_row_mouseentered');
		cis_clear_interval();

		cis_make_touch_effect($wrapper);


		// $wrapper.removeClass("cis_dragging");
	}

/*END mobile********************************************************************************************/

// CSS3 MOVE FUNCTIONS ///////////////////////////////////////////////////////////////////////////////

	function cis_getTransform(obj,prop) {
        var matrix = obj.css("-webkit-transform") ||
        obj.css("-moz-transform")    ||
        obj.css("-ms-transform")     ||
        obj.css("-o-transform")      ||
        obj.css("transform");

        if(matrix !== 'none') {
            var values = matrix.split('(')[1].split(')')[0].split(',');
            // var a = values[0];
            // var b = values[1];
            // var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
            if(prop == 'translate_x')
            	var transformX = values[4];
            else
            	var transformX = 0;
        } else { var transformX = 0; }
     	return parseInt(transformX);
    };

	function cis_clear_quee($wrapper){
		var left_ind = cis_getTransform($wrapper,'translate_x');
		$wrapper.css({
			'-webkit-transition': 'none',
			'-moz-transition': 'none',
			'-o-transition': 'none',
			'-ms-transition': 'none',
			'transition': 'none',

			'-webkit-transform' : 'translate(' + left_ind + 'px,0px)',
			'-moz-transform' : 'translate(' + left_ind + 'px,0px)',
			'-ms-transform' : 'translate(' + left_ind + 'px,0px)',
			'-o-transform' : 'translate(' + left_ind + 'px,0px)',
			'transform' : 'translate(' + left_ind + 'px,0px)'
		});
	};
	var cis_make_css3_movement_enabled = true;
	function cis_make_css3_movement($wrapper, time, ease_effect, distance) {
		if(!cis_make_css3_movement_enabled)
			return;

		// console.log('cis_make_css3_movement ' + distance);
		if(ease_effect == 'none') {
			$wrapper.css({
				'-webkit-transition': 'none',
				'-moz-transition': 'none',
				'-o-transition': 'none',
				'-ms-transition': 'none',
				'transition': 'none',


				'-webkit-transform' : 'translate(' + distance + 'px,0px)',
				'-moz-transform' : 'translate(' + distance + 'px,0px)',
				'-ms-transform' : 'translate(' + distance + 'px,0px)',
				'-o-transform' : 'translate(' + distance + 'px,0px)',
				'transform' : 'translate(' + distance + 'px,0px)'
			});
		} else {
			// console.log('make move ' + distance);
			$wrapper.css({
				'-webkit-transition': '-webkit-transform '+ time +' '+ ease_effect + '',
				'-moz-transition': '-moz-transform '+ time +' '+ ease_effect + '',
				'-o-transition': '-o-transform '+ time +' '+ ease_effect + '',
				'-ms-transition': '-ms-transform '+ time +' '+ ease_effect + '',
				'transition': 'transform '+ time +' '+ ease_effect + '',

				'-webkit-transform' : 'translate(' + distance + 'px,0px)',
				'-moz-transform' : 'translate(' + distance + 'px,0px)',
				'-ms-transform' : 'translate(' + distance + 'px,0px)',
				'-o-transform' : 'translate(' + distance + 'px,0px)',
				'transform' : 'translate(' + distance + 'px,0px)'
			});
		}
	};
// END CSS3 MOVE FUNCTIONS ///////////////////////////////////////////////////////////////////////////////

// romove title attributes ///////////////////////////////////////////////////////////////////////////////
setTimeout(function() {
	$('.cis_img_item').attr("title","");
},3000);
// Disable selection ///////////////////////////////////////////////////////////////////////////////

function cis_disable_selection_on_wrapper($wrapper) {
	cis_disable_selection($wrapper);
	cis_disable_selection($wrapper.find('div'));
	cis_disable_selection($wrapper.find('img'));
}

function cis_disable_selection($elem) {
	$elem.attr('unselectable', 'on')
         .css('user-select', 'none')
         .on('selectstart', false);
}


//make back
function cis_make_backlinks() {
	$('.cis_main_wrapper').each(function() {
		var cis_back_htm = '<div style="/*display: block !important;z-index: -1;font-weight: normal;padding: 3px 10px 3px 8px;line-height: 20px;background-color: #000;color: #fff;position: absolute;right: 0px;font-style: italic;font-size: 12px;border-bottom-left-radius: 4px;border-bottom-right-radius: 4px;bottom: 0px;opacity: 0;background-image: linear-gradient(to bottom,#000000,#383838) !important;text-shadow: 0 3px 3px #000000;border: 1px solid rgb(0, 0, 0);border-top: 0;*/"><!--By <a style="font-weight: bold;color: rgb(72, 108, 253);" href="http://creative-solutions.net/joomla/creative-image-slider" target="_blank">Creative Image Slider</a>--></div>';
		$(this).append(cis_back_htm);
		var $back = $(this).children('div').last();
		var h = parseInt($back.height()) + 7*1;
		$back.attr('h',h);

		$(this).hover(function() {
			cis_show_back_canvas($back);
		},function() {
			cis_hide_back_canvas($back);
		})
	});
};
setTimeout(function() {
	cis_make_backlinks();
},1200);
function cis_show_back_canvas($back) {
	var h = -1* parseInt($back.attr('h'));
	$back.stop(true,false).animate({
		'bottom': h,
		'opacity': '0.95'
	},'swing');
};	
function cis_hide_back_canvas($back) {
	$back.stop(true,false).animate({
		'bottom': '0',
		'opacity': '0'
	},'swing');
};
	
})
})(creativeJ);

