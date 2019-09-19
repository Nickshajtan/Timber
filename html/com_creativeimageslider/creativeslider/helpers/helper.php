<?php
/**
 * Joomla! component creativeimageslider
 *
 * @version $Id: default.php 2012-04-05 14:30:25 svn $
 * @author Creative-Solutions.net
 * @package Creative Image Slider
 * @subpackage com_creativeimageslider
 * @license GNU/GPL
 *
 */

// no direct access
defined('_JEXEC') or die('Restircted access');;

class CreativeimagesliderHelper
{
	//function to add scripts/styles
	private function add_scripts() {
		//add scripts, styles
		$document = JFactory::getDocument();
		
		$version = '3.0.0';
		
		$cssFile = JURI::base(true).'../../../../../../components/com_creativeimageslider/assets/css/main.css?version='.$version;
		$document->addStyleSheet($cssFile, 'text/css', null, array());
		
		$cssFile = JURI::base(true).'../../../../../../components/com_creativeimageslider/assets/css/creative_buttons.css';
		$document->addStyleSheet($cssFile, 'text/css', null, array());
		
		$cssFile = JURI::base(true).'../../../../../../components/com_creativeimageslider/assets/css/creativecss-ui.css';
		$document->addStyleSheet($cssFile, 'text/css', null, array());
		
		$jsFile = JURI::base(true).'../../../../../../components/com_creativeimageslider/assets/js/creativelib.js';
		$document->addScript($jsFile);
		
		$jsFile = JURI::base(true).'../../../../../../components/com_creativeimageslider/assets/js/creativelib-ui.js';
		$document->addScript($jsFile);

		// mobile lib		
		$jsFile = JURI::base(true).'../../../../../../components/com_creativeimageslider/assets/js/jquery.mobile.custom.js';
		$document->addScript($jsFile);
		
		$jsFile = JURI::base(true).'../../../../../../components/com_creativeimageslider/assets/js/mousewheel.js';
		$document->addScript($jsFile);
		
		$jsFile = JURI::base(true).'../assets/js/creativeimageslider.js?version='.$version;
		$document->addScript($jsFile);
	}
	
	private function cis_hex2rgb($hex) {
		$hex = str_replace("#", "", $hex);
	
		if(strlen($hex) == 3) {
			$r = hexdec(substr($hex,0,1).substr($hex,0,1));
			$g = hexdec(substr($hex,1,1).substr($hex,1,1));
			$b = hexdec(substr($hex,2,1).substr($hex,2,1));
		} else {
			$r = hexdec(substr($hex,0,2));
			$g = hexdec(substr($hex,2,2));
			$b = hexdec(substr($hex,4,2));
		}
		$rgb = array($r, $g, $b);
		return implode(",", $rgb); // returns the rgb values separated by commas
		//return $rgb; // returns an array with the rgb values
	}
	
	private function get_data() {
		$db = JFactory::getDBO();
		
		$query = 'SELECT '.
				'sp.id slider_id, ' .
				'sp.id_template, ' .
				'sp.width, ' .
				'sp.height, ' .
				'sp.itemsoffset, ' .
				'sp.margintop, ' .
				'sp.marginbottom, ' .
				'sp.paddingtop, ' .
				'sp.paddingbottom, ' .
				'sp.showarrows, ' .
				'sp.bgcolor, ' .
				'sp.showreadmore, ' .
				'sp.readmoretext, ' .
				'sp.readmorestyle, ' .
				'sp.readmoresize, ' .
				'sp.readmoreicon, ' .
				'sp.readmorealign, ' .
				'sp.readmoremargin, ' .
				'sp.captionalign, ' .
				'sp.captionmargin, ' .
				'sp.overlaycolor, ' .
				'sp.overlayopacity, ' .
				'sp.textcolor, ' .
				'sp.overlayfontsize, ' .
				'sp.textshadowcolor, ' .
				'sp.textshadowsize, ' .
				'sp.arrow_template, ' .
				'sp.arrow_width, ' .
				'sp.arrow_left_offset, ' .
				'sp.arrow_center_offset, ' .
				'sp.arrow_passive_opacity, ' .
				'sp.move_step, ' .
				'sp.move_time, ' .
				'sp.move_ease, ' .
				'sp.autoplay, ' .
				'sp.autoplay_start_timeout, ' .
				'sp.autoplay_hover_timeout, ' .
				'sp.autoplay_step_timeout, ' .
				'sp.autoplay_evenly_speed, ' .

				'sp.overlayanimationtype, ' .
				'sp.popup_max_size, ' .
				'sp.popup_item_min_width, ' .
				'sp.popup_use_back_img, ' .
				'sp.popup_arrow_passive_opacity, ' .
				'sp.popup_arrow_left_offset, ' .
				'sp.popup_arrow_min_height, ' .
				'sp.popup_arrow_max_height, ' .
				'sp.popup_showarrows, ' .
				'sp.popup_image_order_opacity, ' .
				'sp.popup_image_order_top_offset, ' .
				'sp.popup_show_orderdata, ' .
				'sp.popup_icons_opacity, ' .
				'sp.popup_show_icons, ' .
				'sp.popup_autoplay_default, ' .
				'sp.popup_closeonend, ' .
				'sp.popup_autoplay_time, ' .
				'sp.popup_open_event, ' .
				'sp.link_open_event, ' .
				
				// 3.0 options
				'sp.cis_touch_enabled, ' .
				'sp.cis_inf_scroll_enabled, ' .
				'sp.cis_mouse_scroll_enabled, ' .
				'sp.cis_item_correction_enabled, ' .
				'sp.cis_animation_type, ' .
				'sp.cis_item_hover_effect, ' .
				'sp.cis_items_appearance_effect, ' .
				'sp.cis_overlay_type, ' .
				'sp.cis_touch_type, ' .
				'sp.cis_font_family, ' .
				'sp.cis_font_effect, ' .
				'sp.icons_size, ' .
				'sp.icons_margin, ' .
				'sp.icons_offset, ' .
				'sp.icons_animation, ' .
				'sp.icons_color, ' .
				'sp.icons_valign, ' .
				'sp.cis_button_font_family, ' .
				'sp.ov_items_offset, ' .
				'sp.ov_items_m_offset, ' .
				'sp.custom_css, ' .
				'sp.custom_js, ' .

				'sa.id img_id, ' .
				'sa.name img_name, ' .
				'sa.img_name img_path, ' .
				'sa.img_url img_url_path ,' .
				'sa.caption ,' .
				'sa.showarrows item_showarrows, ' .
				'sa.showreadmore item_showreadmore, ' .
				'sa.readmoretext item_readmoretext, ' .
				'sa.readmorestyle item_readmorestyle, ' .
				'sa.readmoresize item_readmoresize, ' .
				'sa.readmoreicon item_readmoreicon, ' .
				'sa.readmorealign item_readmorealign, ' .
				'sa.readmoremargin item_readmoremargin, ' .
				'sa.captionalign item_captionalign, ' .
				'sa.captionmargin item_captionmargin, ' .
				'sa.overlaycolor item_overlaycolor, ' .
				'sa.overlayopacity item_overlayopacity, ' .
				'sa.textcolor item_textcolor, ' .
				'sa.overlayfontsize item_overlayfontsize, ' .
				'sa.textshadowcolor item_textshadowcolor, ' .
				'sa.textshadowsize item_textshadowsize, ' .
				'sa.overlayusedefault, ' .
				'sa.buttonusedefault, ' .
				'sa.redirect_url, ' .
				'sa.redirect_itemid, ' .
				'sa.redirect_target, ' .

				'sa.popup_img_name, ' .
				'sa.popup_img_url, ' .
				'sa.popup_open_event item_popup_open_event ' .

				'FROM '.
				'`#__cis_sliders` sp '.
				'JOIN '.
				'`#__cis_images` sa ON sa.id_slider = sp.id '.
				'AND sa.published = \'1\' '.
				'LEFT JOIN '.
				'`#__cis_templates` st ON st.id = sp.id_template '.
				'WHERE sp.published = \'1\' '.
				'AND sp.id = '.$this->slider_id.' '.
				'ORDER BY sp.ordering,sp.id,sa.ordering,sa.id';
		$db->setQuery( $query );
		$this->_data = $db->loadObjectList();
	}
	
	public function render_html()
	{
		//add scripts
		if($this->type != 'plugin')
			$this->add_scripts();
		
		//get data
		$this->get_data();
		
		$module_id = $this->module_id;
		
		$cis_options = array();
		
		for ($i=0, $n=count( $this->_data ); $i < $n; $i++) {
			$cis_options[$this->_data[$i]->slider_id][] = $this->_data[$i];
		}
		
		if(sizeof($cis_options) > 0) {
			reset($cis_options);
			$first_key = key($cis_options);
		
			$cis_options_value = $cis_options[$first_key][0];
		
			$cis_width = $cis_options_value->width;
			$cis_item_height = (int) $cis_options_value->height;
			$cis_id_template = (int) $cis_options_value->id_template;
			$cis_margintop = (int) $cis_options_value->margintop;
			$cis_marginbottom = (int) $cis_options_value->marginbottom;
			$cis_paddingtop = (int) $cis_options_value->paddingtop;
			$cis_paddingbottom = (int) $cis_options_value->paddingbottom;
			$cis_itemsoffset = (int) $cis_options_value->itemsoffset;
			$cis_showarrows = (int) $cis_options_value->showarrows;
			$cis_bgcolor =  $cis_options_value->bgcolor;
			$cis_showreadmore = (int) $cis_options_value->showreadmore;
			$cis_readmoretext =  $cis_options_value->readmoretext;
			$cis_readmorestyle =  $cis_options_value->readmorestyle;
			$cis_readmoresize =  $cis_options_value->readmoresize;
			$cis_readmoreicon =  $cis_options_value->readmoreicon;
			$cis_readmorealign =  (int) $cis_options_value->readmorealign;
			$cis_readmoremargin =  $cis_options_value->readmoremargin;
			$cis_overlaycolor =  $cis_options_value->overlaycolor;
			$cis_overlayopacity = (int) $cis_options_value->overlayopacity;
			$cis_textcolor = $cis_options_value->textcolor;
			$cis_overlayfontsize = (int) $cis_options_value->overlayfontsize;
			$cis_textshadowcolor =  $cis_options_value->textshadowcolor;
			$cis_textshadowsize = (int) $cis_options_value->textshadowsize;
			$cis_captionalign = (int) $cis_options_value->captionalign;
			$cis_captionmargin = $cis_options_value->captionmargin;
			
			$cis_arrow_template = $cis_options_value->arrow_template;
			$cis_arrow_width = $cis_options_value->arrow_width;
			$cis_arrow_left_offset = $cis_options_value->arrow_left_offset;
			$cis_arrow_center_offset = $cis_options_value->arrow_center_offset;
			$cis_arrow_passive_opacity = $cis_options_value->arrow_passive_opacity;
			
			$cis_move_step = $cis_options_value->move_step;
			$cis_move_time = $cis_options_value->move_time;
			$cis_move_ease = $cis_options_value->move_ease;
			$cis_autoplay = $cis_options_value->autoplay;
			$cis_autoplay_start_timeout = $cis_options_value->autoplay_start_timeout;
			$cis_autoplay_hover_timeout = $cis_options_value->autoplay_hover_timeout;
			$cis_autoplay_step_timeout = $cis_options_value->autoplay_step_timeout;
			$cis_autoplay_evenly_speed = $cis_options_value->autoplay_evenly_speed;

			$cis_overlayanimationtype = (int) $cis_options_value->overlayanimationtype;

			// this section is used for js in cis_popup_data element
			$cis_popup_max_size = (int) $cis_options_value->popup_max_size;
			$cis_popup_item_min_width = (int) $cis_options_value->popup_item_min_width;
			$cis_popup_use_back_img = (int) $cis_options_value->popup_use_back_img;
			$cis_popup_arrow_passive_opacity = (int) $cis_options_value->popup_arrow_passive_opacity;//3
			$cis_popup_arrow_left_offset = (int) $cis_options_value->popup_arrow_left_offset;
			$cis_popup_arrow_min_height= (int) $cis_options_value->popup_arrow_min_height;
			$cis_popup_arrow_max_height = (int) $cis_options_value->popup_arrow_max_height;
			$cis_popup_showarrows = (int) $cis_options_value->popup_showarrows;//7
			$cis_popup_image_order_opacity = (int) $cis_options_value->popup_image_order_opacity;
			$cis_popup_image_order_top_offset = (int) $cis_options_value->popup_image_order_top_offset;
			$cis_popup_show_orderdata= (int) $cis_options_value->popup_show_orderdata;
			$cis_popup_icons_opacity = (int) $cis_options_value->popup_icons_opacity;
			$cis_popup_show_icons = (int) $cis_options_value->popup_show_icons;//12
			$cis_popup_autoplay_default = (int) $cis_options_value->popup_autoplay_default;
			$cis_popup_closeonend = (int) $cis_options_value->popup_closeonend;
			$cis_popup_autoplay_time = (int) $cis_options_value->popup_autoplay_time;
			
			// 3.0 options
			$cis_link_open_event = (int) $cis_options_value->link_open_event;
			$cis_popup_open_event = (int) $cis_options_value->popup_open_event;

			// freelimit
			$cis_touch_enabled = 0;//(int) $cis_options_value->cis_touch_enabled; // 0 - disabled, 1 - enabled, 2 - only on touch devices 
			$cis_inf_scroll_enabled = 0;//(int) $cis_options_value->cis_inf_scroll_enabled;
			$cis_mouse_scroll_enabled = 0;//(int) $cis_options_value->cis_mouse_scroll_enabled;
			$cis_item_correction_enabled = (int) $cis_options_value->cis_item_correction_enabled;

			// options to add in html
			$cis_animation_type = (int) $cis_options_value->cis_animation_type;
			$cis_item_hover_effect = (int) $cis_options_value->cis_item_hover_effect;
			$cis_items_appearance_effect = (int) $cis_options_value->cis_items_appearance_effect;
			$cis_overlay_type = (int) $cis_options_value->cis_overlay_type;
			$cis_touch_type = (int) $cis_options_value->cis_touch_type;

			$cis_icons_size = (int) $cis_options_value->icons_size;
			$cis_icons_margin = (int) $cis_options_value->icons_margin;
			$cis_icons_offset = (int) $cis_options_value->icons_offset;
			$cis_icons_animation = (int) $cis_options_value->icons_animation;
			$cis_icons_color = (int) $cis_options_value->icons_color;
			$cis_icons_valign = (int) $cis_options_value->icons_valign;

			$cis_font_family = $cis_options_value->cis_font_family;
			$cis_button_font_family = $cis_options_value->cis_button_font_family;
			$cis_font_effect = '';//$cis_options_value->cis_font_effect; freelimit

			$cis_ov_items_offset = $cis_options_value->ov_items_offset;
			$cis_ov_items_m_offset = $cis_options_value->ov_items_m_offset;
			$cis_custom_css = '';//$cis_options_value->custom_css; freelimit
			$cis_custom_js = '';//$cis_options_value->custom_js; freelimit

			$cache_dir = __DIR__ . '/../../../cache/com_creativeimageslider/';
			$cached_img_dir = JURI::base(true) . '/cache/com_creativeimageslider/';
			$uploaded_img_dir = JURI::base(true) . '/';


			// add google font freelimit
			// $cis_googlefont = 'cis-googlewebfont-';
			// $cis_google_fonts = '';
			// if (strpos($cis_font_family,$cis_googlefont) !== false) {
			// 	$cis_google_fonts = str_replace($cis_googlefont, '', $cis_font_family);
			// 	$cis_font_family = str_replace($cis_googlefont, '', $cis_font_family);
			// }
			// if (strpos($cis_button_font_family,$cis_googlefont) !== false) {
			// 	$cis_google_fonts = $cis_google_fonts . '|' . str_replace($cis_googlefont, '', $cis_button_font_family);
			// 	$cis_button_font_family = str_replace($cis_googlefont, '', $cis_button_font_family);
			// }
			// $cis_google_fonts = trim($cis_google_fonts,'|');

			// if($cis_google_fonts != '') {
			// 	$cis_google_font_link = 'http://fonts.googleapis.com/css?family='.$cis_google_fonts;
			// 	$cis_google_fonts_css_link = '<link rel="stylesheet" type="text/css" href="'.$cis_google_font_link.'">';
			// }
			// else {
			// 	$cis_google_fonts_css_link  = '';
			// }
		
			$cis_google_fonts_css_link = '';

			ob_start();

			$id_slider = $this->slider_id;

			$cis_overlay_event = $cis_popup_open_event;
			
			//start render html
			$cis_class_suffix = $this->class_suffix == '' ? '' : ' '  . $this->class_suffix;
			echo '<div id="cis_slider_'.$id_slider.'" cis_overlay_animation_type="'.$cis_overlayanimationtype.'" cis_overlay_type="'.$cis_overlay_type.'" inf_scroll_enabled="'.$cis_inf_scroll_enabled.'" mouse_scroll_enabled="'.$cis_mouse_scroll_enabled.'" touch_enabled="'.$cis_touch_enabled.'" item_correction_enabled="'.$cis_item_correction_enabled.'" cis_popup_event="'.$cis_overlay_event.'" link_open_event="'.$cis_link_open_event.'" roll="'.$module_id.'_'.$id_slider.'" cis_slider_id="'.$id_slider.'" class="cis_main_wrapper'.$cis_class_suffix.' cis_wrapper_'.$module_id.'_'.$id_slider.'" cis_base="'.JURI::base(true).'">';
			echo '<div class="cis_images_row">';
			
			//buttons
			$img_src1 = JURI::base(true) .'/components/com_creativeimageslider/assets/images/arrows/cis_button_left'.$cis_arrow_template.'.png';
			$img_src2 = JURI::base(true) .'/components/com_creativeimageslider/assets/images/arrows/cis_button_right'.$cis_arrow_template.'.png';
			echo '<img class="cis_button_left" src="'.$img_src1.'" />';
			echo '<img class="cis_button_right" src="'.$img_src2.'" />';
			echo '<div class="cis_arrow_data" style="display: none !important;">'.$cis_arrow_width.','.$cis_arrow_left_offset.','.$cis_arrow_center_offset.','.$cis_arrow_passive_opacity.','.$cis_showarrows.'</div>';
			echo '<div class="cis_moving_data" style="display: none !important;">'.$cis_move_step.','.$cis_move_time.','.$cis_move_ease.','.$cis_autoplay.','.$cis_autoplay_start_timeout.','.$cis_autoplay_step_timeout.','.$cis_autoplay_evenly_speed.','.$cis_autoplay_hover_timeout.'</div>';
			echo '<div class="cis_popup_data" style="display: none !important;">'.$cis_popup_max_size.','.$cis_popup_item_min_width.','.$cis_popup_use_back_img.','.$cis_popup_arrow_passive_opacity.','.$cis_popup_arrow_left_offset.','.$cis_popup_arrow_min_height.','.$cis_popup_arrow_max_height.','.$cis_popup_showarrows.','.$cis_popup_image_order_opacity.','.$cis_popup_image_order_top_offset.','.$cis_popup_show_orderdata.','.$cis_popup_icons_opacity.','.$cis_popup_show_icons.','.$cis_popup_autoplay_default.','.$cis_popup_closeonend.','.$cis_popup_autoplay_time.'</div>';

			echo '<div class="cis_options_data" style="display: none !important;">'
				.$cis_animation_type.','.$cis_item_hover_effect.','.$cis_items_appearance_effect.','.$cis_overlay_type.','.$cis_touch_type.','
				.$cis_icons_size.','.$cis_icons_margin.','.$cis_icons_offset.','.$cis_icons_animation.','.$cis_icons_color.','.$cis_icons_valign.','.$cis_ov_items_offset.','.$cis_ov_items_m_offset.','.$cis_showreadmore.'</div>';

			echo '<div class="cis_images_holder" style="height: '.$cis_item_height.'px !important;">';
		
			$items_css = '';
			$loader_color_class = 'cis_row_item_loader_color1';
			foreach( $cis_options[$first_key] as $cis_index => $image_info) {
				//get image
				$img_path = $image_info->img_path != '' ? $image_info->img_path : $image_info->img_url_path;
				if($image_info->img_path != '') {
					//check to see if cached file exists
					$img_parts = explode('/',$image_info->img_path);
					$filename = $img_parts[sizeof($img_parts) - 1];
					preg_match('/^(.*)\.([a-z]{3,4}$)/i',$filename,$matches);
					$img_path_cache = $matches[1] . '-tmb-h' . $cis_item_height . '.' . $matches[2];
					$img_fullpath_cache = $cache_dir . $img_path_cache;
					if(file_exists($img_fullpath_cache)) {
						$img_path = $cached_img_dir . $img_path_cache;
					}
					else {
						$img_path = $uploaded_img_dir . $image_info->img_path;
					}
				}

				//get popup image
				$popup_img_src = '';
				if( ($image_info->item_popup_open_event != 2 && $image_info->item_popup_open_event != 3)  && !($image_info->item_popup_open_event == 4 && ($cis_popup_open_event == 2 && $cis_popup_open_event == 3)) ) {//check if popup enabled
					//if we have uploaded popup image
					if($image_info->popup_img_name != '') {
						$popup_img_src = $uploaded_img_dir . $image_info->popup_img_name;
					}
					elseif($image_info->popup_img_url != '') {
						$popup_img_src = $image_info->popup_img_url;
					}
					else {
						$popup_img_src = ($image_info->img_path != '') ? $uploaded_img_dir . $image_info->img_path : $image_info->img_url_path;
					}
				}

				// loading calc
				$loader_height = 40;
				$loader_margin = (int)(($cis_item_height + 4*1 - $loader_height) / 2);
					
				echo '<div class="cis_row_item cis_item_'.$image_info->img_id.'" id="cis_item_'.$image_info->img_id.'" cis_popup_link="'.$popup_img_src.'" item_id="'.$image_info->img_id.'">';

				// set caption
				echo '<div class="cis_popup_caption" style="display: none !important;">'.$image_info->caption.'</div>';
				$loader_color_class = $loader_color_class == 'cis_row_item_loader_color1' ? 'cis_row_item_loader_color2' : 'cis_row_item_loader_color1';
					// <div class="bubblingG" style="margin-top: .$loader_margin.px;"><span id="bubblingG_1"></span><span id="bubblingG_2"></span><span id="bubblingG_3"></span></div>
				echo '<div class="cis_row_item_loader '.$loader_color_class.'" style="height: '.$cis_item_height.'px !important;"></div>';
				echo '<div class="cis_row_item_inner cis_row_hidden_element">';
				//image
				echo '<img src="'.$img_path.'" style="height: '.$cis_item_height.'px !important;" alt="'.$image_info->img_name.'" title="'.$image_info->img_name.'" class="cis_img_item"  />';

				//get click url
				$click_url = $image_info->redirect_url != '' ? JRoute::_($image_info->redirect_url, false) : JRoute::_('index.php?Itemid='.$image_info->redirect_itemid);

				//is button visible
				$cis_button_visible = (($image_info->buttonusedefault == 0 && $cis_showreadmore == 1) || ($image_info->buttonusedefault == 1 && $image_info->item_showreadmore == 1)) ? 1 : 0;
		
				// get overlay event type
				// $cis_overlay_event = $image_info->item_popup_open_event == 4 ? $cis_popup_open_event : $image_info->item_popup_open_event;
				

				//overlay
				$cis_row_item_overlay_class = $cis_overlay_type == 1 ? 'cis_height_100_perc' : '';
				echo '<div class="cis_row_item_overlay '.$cis_row_item_overlay_class.'" cis_popup_event="'.$cis_overlay_event.'" link_open_event="'.$cis_link_open_event.'"  cis_click_url="'.$click_url.'" cis_click_target="'.$image_info->redirect_target.'" cis_button_visible="'.$cis_button_visible.'">';
				
				//name
				if($cis_showreadmore == 1) {

					// add ful lsize class
					$cis_row_item_txt_wrapper_class = $cis_overlay_type == 1 ? 'cis_position_absolute cis_align_center' : '';
					$cis_row_item_overlay_txt_class = $cis_overlay_type == 1 ? 'cis_margin_0' : '';

					echo '<div class="cis_row_item_txt_wrapper '.$cis_row_item_txt_wrapper_class.'"><div class="cis_row_item_overlay_txt '.$cis_row_item_overlay_txt_class.'"><div class="cis_txt_inner '.$cis_font_effect.'">'.$image_info->img_name.'</div></div></div>';
				}
					
				//button
				// if(($image_info->buttonusedefault == 0 && $cis_showreadmore == 1) || ($image_info->buttonusedefault == 1 && $image_info->item_showreadmore == 1)) {
				if($cis_popup_open_event == 2 || $cis_link_open_event == 2) {
					
					//click target
					$click_target = $image_info->redirect_target == 0 ? '' : ' target="_blank"';
		
					//read more text
					$item_readmoretext = $cis_readmoretext;
		
					//button styles
					$button_style = 'creative_btn-' . $cis_readmorestyle;
					$button_size = 'creative_btn-' . $cis_readmoresize;
					$button_icon_color = $cis_readmorestyle == 'gray' ? 'white' : 'white';
					$button_icon_html = $cis_readmoreicon == 'none' ? '' : '<i class="creative_icon-'.$button_icon_color.' creative_icon-'.$cis_readmoreicon.'"></i> ';
	
					// add ful lsize class
					$cis_btn_wrapper_class = $cis_overlay_type == 1 ? 'cis_position_absolute cis_align_center' : '';
					$cis_creative_btn_class = $cis_overlay_type == 1 ? 'cis_margin_0' : '';

					echo '<div class="cis_btn_wrapper '.$cis_btn_wrapper_class.'"><a href="'.$click_url.'" class="creative_btn '.$button_style.' '.$button_size.' '.$cis_creative_btn_class.'"'.$click_target.'>'.$button_icon_html . $item_readmoretext.'</a></div>';
		
				}
				echo '</div>';
				echo '</div>';
				echo '</div>';
			}
				
			echo '</div>';
			echo '</div>';
			echo '</div>';
			
			//print css
			$cis_overlaycolor_rgb = $this->cis_hex2rgb($cis_overlaycolor);
			$cis_overlayopacity = $cis_overlayopacity / 100;
			$cis_overlaycolor_rgba = 'rgba('.$cis_overlaycolor_rgb.','.$cis_overlayopacity.')';
			
			//get txt text shadow;
			if($cis_textshadowsize == 0)
				$cis_textshadow_rule = 'text-shadow: none;';
			elseif($cis_textshadowsize == 1)
			$cis_textshadow_rule = 'text-shadow: -1px 2px 0px '.$cis_textshadowcolor.';';
			elseif($cis_textshadowsize == 2)
			$cis_textshadow_rule = 'text-shadow: -1px 2px 2px '.$cis_textshadowcolor.';';
			elseif($cis_textshadowsize == 3)
			$cis_textshadow_rule = 'text-shadow: -1px 2px 4px '.$cis_textshadowcolor.';';
			
			$cis_css = '';
			$cis_css .= '#cis_slider_'.$id_slider.'.cis_main_wrapper {';
			$cis_css .= 'width: '.$cis_width.'!important;';
			$cis_css .= 'margin: '.$cis_margintop.'px auto '.$cis_marginbottom.'px;';
			$cis_css .= 'padding: '.$cis_paddingtop.'px 0px '.$cis_paddingbottom.'px 0px;';
			$cis_css .= 'background-color: '.$cis_bgcolor.';';
			$cis_css .= '}';
			$cis_css .= '#cis_slider_'.$id_slider.' .cis_row_item_overlay {';
			$cis_css .= 'background-color: '.$cis_overlaycolor.';';
			$cis_css .= 'background-color: '.$cis_overlaycolor_rgba.';';
			$cis_ta = $cis_readmorealign == 2 ? 'center' : 'left';
			$cis_css .= 'text-align: '.$cis_ta.';';
			$cis_css .= '}';
			$cis_css .= '#cis_slider_'.$id_slider.' .cis_row_item {';
			$cis_css .= 'margin-right: '.$cis_itemsoffset.'px;';
			$cis_css .= '}';
			$cis_css .= '#cis_slider_'.$id_slider.' .cis_row_item_overlay_txt {';
			$cis_css .= $cis_textshadow_rule;
			$cis_css .= 'font-size: '.$cis_overlayfontsize.'px;';
			$cis_css .= 'color: '.$cis_textcolor.';';
			$cis_css .= 'margin: '.$cis_captionmargin.';';
			$cis_text_align = $cis_captionalign == 0 ? 'left' : ($cis_captionalign == 1 ? 'right' : 'center');
			$cis_css .= 'text-align: '.$cis_text_align.';';
			$cis_css .= '}';
			$cis_css .= '#cis_slider_'.$id_slider.' .creative_btn {';
			$cis_css .= 'margin: '.$cis_readmoremargin.';';
			$cis_float = $cis_readmorealign == 0 ? 'left' : ($cis_readmorealign == 1 ? 'right' : 'none');
			$cis_css .= 'float: '.$cis_float.';';
			$cis_css .= '}';

			// 3.0 updates
			$cis_css .= '#cis_slider_'.$id_slider.' .cis_row_item_txt_wrapper {';
			$cis_css .= 'font-family: '.$cis_font_family.';';
			$cis_css .= '}';
			$cis_css .= '#cis_slider_'.$id_slider.' .cis_btn_wrapper {';
			$cis_css .= 'font-family: '.$cis_button_font_family.';';
			$cis_css .= '}';

			// cusstom css
			$cis_custom_css = str_replace('SLIDER_ID', $id_slider, $cis_custom_css);
			echo '<style>'.$cis_css.$items_css.$cis_custom_css.'</style>';
			// custom js
			if($cis_custom_js != '') {
				$cis_custom_js = str_replace('SLIDER_ID', $id_slider, $cis_custom_js);
				echo '<script type="text/javascript">(function($) {$(document).ready(function() {'.$cis_custom_js.'})})(creativeJ);</script>';
			}

			echo $cis_google_fonts_css_link;
		}
		else
			echo 'Creative Image Slider: There is nothing to show!';
		
		return $render_html1 = ob_get_clean();
	}
}